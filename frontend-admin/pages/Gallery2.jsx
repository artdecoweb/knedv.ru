import { Component } from 'preact'
import { Col, Row, ErrorAlert, Success } from '../../frontend/components/Bootstrap'
import { loadData } from '../Components/LoadData'
import { LoadingIndicator } from '../Components'
// import 'preact/devtools/'
import { Gallery } from '../Components/PhotoUploader'
import Form, { FormGroup } from '@depack/form'
import SpecialForm from '../Components/SpecialForm'

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
      <GalleryForm submitFinish={async () => {
        await this.load()
      }} path="/admin-data?photos" galleryId={_id}
      confirmText="Сохранить Галерею"
      />
    </Col>)
  }
}

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

class GalleryForm extends SpecialForm {
  render({ galleryId, confirmText }) {
    const { formLoading } = this.state
    return (
      <Form onSubmit={this.submit.bind(this)}>
        <input name="galleryId" value={galleryId} type="hidden" />
        <FormGroup label="Загрузка Изображений" help="Выберите несколько изображений, и загрузите их.">
          <Gallery />
        </FormGroup>
        <button type="submit" className="btn btn-success" disabled={formLoading}>{formLoading ? 'Загрузка...' : confirmText}</button>
        <ErrorAlert error={this.state.error} />
        <Success success={this.state.success} message="Галерея сохранена!" />
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