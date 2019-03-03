import { Component } from 'preact'
import { A } from '../../frontend/components/Bootstrap'

class Photo extends Component {
  constructor() {
    super()
    this.state = {
      uploaded: false,
      progress: null,
      error: null,
      preview: null,
      result: null,
    }
  }
  componentDidMount() {
    this.getPreview(this.props.file)
  }
  getPreview(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.setState({ preview: reader.result })
    }
  }
  async upload() {
    this.setState({ error: null, progress: 0, uploaded: false })
    const formData = new FormData()
    formData.append('image', this.props.file)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload-asset', true)
    xhr.seenBytes = 0
    xhr.upload.addEventListener('progress', (e) => {
      this.updateProgress((e.loaded * 100.0 / e.total) || 100)
    })
    xhr.addEventListener('readystatechange', () => {
      if(xhr.readyState == 3) {
        const newData = xhr.response.substr(xhr.seenBytes)
        console.log(123, newData)
        xhr.seenBytes = xhr.responseText.length
        return
      }
      if (xhr.readyState == 4) {
        this.setState({ uploaded: true })
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        const t = xhr.responseText
        const { 'error': error, 'result': result } = JSON.parse(t)
        if (error) {
          this.setState({ error })
        } else if (result['file']) {
          this.setState({ result: result['file'], preview: null })
        }
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        this.setState({ error: 'XHR Error' })
      }
    })

    xhr.send(formData)
  }
  updateProgress(progress) {
    this.setState({ progress })
  }
  render ({ name, onRemove, fieldName, existing }) {
    const { progress, error, preview, uploaded, result } = this.state
    const processing = progress == 100 && !uploaded
    const s = {
      background: uploaded ? 'linear-gradient(lightgreen, #82d285)' : null,
      'border-color': uploaded ? 'green' : null,
    }
    if (processing) {
      s.background = 'linear-gradient(lightblue, blue)'
      s['border-color'] = 'blue'
    } else if (error) {
      s.background = "linear-gradient(coral, brown)"
      s['border-color'] = 'red'
    }
    const Result = existing || result
    const src = Result ? Result : preview
    return (<div style={s} className={`Image${src ? '' : ' PreviewLoading'}`} >
      <img style="padding:.5rem;" src={src} />
      <span className="ImageInfo" style="top:.5rem;left:.5rem;">{name}</span>
      <span className="ImageInfo CloseSpan" onClick={onRemove}>✕</span>
      {!existing && progress === null &&
        <BottomLeft className="Absolute">
          <A className="btn btn-light btn-sm" onClick={() => {
            this.upload()
          }}>Загрузить</A>
        </BottomLeft>
      }
      {!!progress && progress != 100 && <BottomLeft>
        <progress max={100} value={progress}/>
      </BottomLeft>}
      {processing && <BottomLeft>
        Выполняется обработка...
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </BottomLeft>}
      {this.state.error && <p className="ImageInfo PhotoError">
        Error: {this.state.error}
      </p>}
      {this.state.error && <a href="#" className="btn btn-danger btn-sm" onClick={(e) => {
        e.preventDefault()
        this.upload()
        return false
      }} style="position:absolute;right:.5rem;bottom:.5rem;">Загрузить снова</a>}
      {Result &&
        <p className="ImageInfo GalleryLink">
          <a href={Result}>Ссылка</a>
        </p>
      }
      {Result && <input type="hidden" name={fieldName} value={Result}/>}
    </div>)
  }
}

const BottomLeft = ({ children, className = 'ImageInfo' }) => {
  return (<span className={className} style="bottom:.5rem;left:.5rem;">
    {children}
  </span>)
}

/**
 * The gallery is the image upload component which drop allowed adding of files.
 */
export class Gallery extends Component {
  constructor() {
    super()
    this.state = { files: [] }
  }
  removeFile(file) {
    const files = this.state.files.filter(({ file: f }) => f !== file)
    this.setState({ files })
  }
  async addFiles(f) {
    const [...ff] = f
    const files = ff.map(file => ({ file,
      pid: Math.floor(Math.random() * 10000) }))
    this.setState({
      files: [...this.state.files, ...files],
    })
  }
  render({ fieldName = 'files[]' }) {
    const { hid, id } = this.context
    return (<div className="PhotoUploader" onDragEnter={(event) => {
      event.preventDefault()
      event.currentTarget.style.background = '#E91E63'
    }} onDragLeave={(event) => {
      event.currentTarget.style.background = ''
    }} onDrop={(event) => {
      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.style.background = ''
      const { dataTransfer: { files } } = event
      this.addFiles(files)
    }} onDragOver={(event) => {
      event.preventDefault()
      event.stopPropagation()
    }}>
      <input id={id} aria-described-by={hid} accept="image/*" onChange={(e) => {
        e.preventDefault()
        this.addFiles(e.currentTarget.files)
        e.currentTarget.value = null
      }} type="file" multiple />
      {this.state.addingFiles ? 'Идет опознование файлов...' : 'Или переместите файлы сюда...'}
      {this.state.files.map(({ file, pid }) => {
        return (<Photo key={pid} name={file.name} file={file} onRemove={() => {
          this.removeFile(file)
        }} fieldName={fieldName} />)
      })}
    </div>)
  }
}