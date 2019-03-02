import { Component } from 'preact'
import { Col, Row, ErrorAlert, Success } from '../../frontend/components/Bootstrap'
import { loadData } from '../Components/LoadData'
import { LoadingIndicator } from '../Components'
import 'preact/devtools/'
import { Gallery as PhotoUpload } from '../Components/PhotoUploader'
import Form, { FormGroup, SubmitButton, SubmitForm } from '@depack/form'

export default class Gallery2 extends Component {
  constructor() {
    super()
    this.state = { data: null, loading: true, files: [] }
    // this._listener = (event) => {
    //   debugger
    //   // prevent default action (open as link for some elements)
    //   event.preventDefault()
    //   // move dragged elem to the selected drop target
    //   if ( event.target.className == 'Gallery2Area' ) {
    //     debugger
    //   }
    //   return false
    // }
  }
  async componentDidMount() {
    // document.addEventListener('drop', this._listener)
    await this.load()
  }
  componentWillUnmount() {
    // document.removeEventListener('drop', this.listener)
  }
  /**
   * Loads the galleries list from the server.
   * Side-effects: sets the `error`, `data` and `loading` on the state.
   */
  async load() {
    const id = this.props.id
    if (!id) this.setState({ loading: false, error: 'No id' })
    const data = await loadData.bind(this)(`galleries&id=${id}`)
    /** @type {Gallery} */
    if (data) this.setState({ data })
  }
  get data() {
    return this.state.data
  }
  render() {
    const { title, cdnImage, description, _id, photos } = this.data || {}
    return (<Col>
      <h1>Галерея</h1>

      {this.loading && <LoadingIndicator />}
      {this.data && <Row className="mb-3">
        <Col className="col-sm-3">
          <img className="img-fluid" src={cdnImage} />
        </Col>
        <Col>
          <h2>{title}</h2>
          {description}
        </Col>
      </Row>
      }
      {this.data && <PhotoList photos={photos} />}
      <hr />
      {_id && <GalleryForm submitFinish={async () => {
        await this.load()
      }} path="/admin-data?photos" galleryId={_id}
      confirmText="Сохранить Галерею" ref={(f) => {
        this.galleryForm = f
      }}
      />}
    </Col>)
  }
}

// {<Form onSubmit={(e) => {
//   console.log('ok', e.currentTarget[0].value)
//   // if (this.galleryForm) {
//   //   debugger
//   //   this.galleryForm.addLinks()
//   // }
//   const w = popup(e.currentTarget[0].value, 'Cian', 800, 800)
//   debugger
// }}>
//   <FormGroup label="Добавить Фото Из Циана" help="Ссылка на страницу объекта в ЦИАН">
//     <Input required={true} placeholder="https://www.cian.ru/sale/suburban/164631748/" name="cian" {...({ 'style': 'display:inline;' })}/>
//     <button type="submit" className="btn btn-sm btn-warning">
//       Добавить Фото
//     </button>
//   </FormGroup>
// </Form>
// }

class PhotoList extends Component {
  render({ photos }) {
    return (<Row>
      {photos.map(({ file, _id: i }) => {
        return (<Col key={i} className="col-sm-4">
          <img className="img-fluid" style="padding: 0.25rem; max-height: 200px;" src={file} /></Col>)
      })}
    </Row>)
  }
}

/**
 * This is the form to upload pictures.
 */
class GalleryForm extends SubmitForm {
  addLinks() {
    if (this.photoUploader) {
      this.photoUploader.externalAPI()
    }
  }
  render({ galleryId, confirmText }) {
    const { formLoading, error, success } = this.state
    return (
      <Form onSubmit={this.submit.bind(this)}>
        <input name="galleryId" value={galleryId} type="hidden" />
        <FormGroup label="Загрузка Изображений" help="Выберите несколько изображений и загрузите их.">
          <PhotoUpload ref={(r) => {
            this.photoUploader = r
          }} />
        </FormGroup>
        <SubmitButton loading={formLoading} loadingText="Загрузка..." confirmText={confirmText} />
        <ErrorAlert error={error} />
        <Success success={success} message="Галерея сохранена!" />
      </Form>)
  }
}

const Details = ({ title, children }) => {
  return (<details>
    <summary>
      <h3 style="display: inline-block;vertical-align: middle;">{title}</h3>
    </summary>
    {children}
  </details>)
}