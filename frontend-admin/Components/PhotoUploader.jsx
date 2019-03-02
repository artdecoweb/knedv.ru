import { Component } from 'preact'

class Photo extends Component {
  constructor() {
    super()
    this.state = {
      uploaded: false,
      init: true,
      progress: null,
    }
  }
  async upload() {
    const formData = new FormData()
    formData.append('image', this.props.file)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload-asset', true)
    xhr.upload.addEventListener('progress', (e) => {
      this.updateProgress((e.loaded * 100.0 / e.total) || 100)
    })
    xhr.addEventListener('readystatechange', e => {
      if (xhr.readyState == 4) {
        this.setState({ uploaded: true })
      }
      if (xhr.readyState == 4 && xhr.status == 200) {
        const t = xhr.responseText
        const tt = JSON.parse(t)
        if (tt.error) {
          this.setState({ error: tt['error'] })
        } else if (tt.file) {
          this.setState({ result: tt['file'] })
        }
      }
      else if (xhr.readyState == 4 && xhr.status != 200) {
        this.setState({ error: 'XHR Error' })
      }
    })

    xhr.send(formData)
  }
  updateProgress(progress) {
    this.setState({ progress })
  }
  render ({ preview, name, onRemove, fieldName, existing }) {
    const { progress } = this.state
    const processing = progress == 100 && !this.state.uploaded
    const s = {
      background: this.state.uploaded ? "linear-gradient(lightgreen, #82d285)" : undefined,
      'border-color': this.state.uploaded ? 'green' : undefined,
    }
    if (processing) {
      s.background = "linear-gradient(lightblue, blue)"
      s['border-color'] = 'blue'
    }
    const Result = existing || this.state.result
    const src = Result ? Result : preview
    return (<div className="Image" style={s}>
      <img style="max-height:250px; padding: 0.5rem;" className="img-fluid" src={src} />
      <span className="ImageInfo" style="top:.5rem;left:.5rem;">{name}</span>
      <span className="ImageInfo CloseSpan" onClick={onRemove}>✕</span>
      {!existing && progress === null &&
        <span className="ImageInfo" style="bottom:0.5rem;left:0.5rem;">
          <a href="#" className="btn btn-light btn-sm" onClick={(e) => {
            e.preventDefault()
            this.upload()
            return false
          }}>Загрузить</a>
        </span>
      }
      <span className="ImageInfo" style="bottom:.5rem;left:.5rem;">
        {progress && progress != 100 && <progress max={100} value={progress}></progress>}
        {processing &&
          ['Выполняется обработка...',
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>]
        }
      </span>
      {this.state.error && <p style="background: lightcoral; width: 150px;">Error: {this.state.error}</p>}
      {Result &&
        <p className="ImageInfo GalleryLink">
          <a href={Result}>Ссылка</a>
        </p>
      }
      {Result && <input type="hidden" name={fieldName} value={Result}/>}
    </div>)
  }
}

const getPreview = async (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return await new Promise(r => {
    reader.onloadend = function() {
      r(reader.result)
    }
  })
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
    const [...files] = f
    this.setState({ addingFiles: true })
    await new Promise(r => setTimeout(r, 5))
    try {
      const newFiles = await Promise.all(files.map(async file => {
        const preview = await getPreview(file)
        const rid = Math.floor(Math.random() * 10000)
        return { file, preview, rid }
      }))
      this.setState({ files: [...this.state.files, ...newFiles] })
    } finally {
      this.setState({ addingFiles: false })
    }
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
      }} type="file" multiple={true} />
      {this.state.addingFiles ? 'Идет опознование файлов...' : 'Или переместите файлы сюда...'}
      {this.state.files.map(({ file, preview, rid }) => {
        return <Photo name={file.name} key={rid} file={file} preview={preview} onRemove={() => {
          this.removeFile(file)
        }} fieldName={fieldName} />
      })}
    </div>)
  }
}