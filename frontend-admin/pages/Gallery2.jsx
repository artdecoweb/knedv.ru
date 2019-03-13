import { Component } from 'preact'
import { Col, Row, ErrorAlert, Success, GrowingSpinner } from '../../frontend/components/Bootstrap'
import { loadData } from '../Components/LoadData'
import { LoadingIndicator } from '../Components'
import PhotoUploader from '../Components/PhotoUploader'
import Form, { FormGroup, SubmitButton, SubmitForm } from '@depack/form'
// import 'preact/devtools/'

/**
 * The Gallery with the photo display at the top and upload form at the bottom. When a photo is uploaded via the inner photo uploaded, the `load` method is triggered which refreshes the list.
 */
export default class Gallery2 extends Component {
  constructor() {
    super()
    this.state = { data: null, loading: true, files: [], uploadedResults: [] }
  }
  async componentDidMount() {
    await this.load()
    this.setState({ preventLoader: true }) // no more page loaders
  }
  /**
   * Loads the galleries list from the server.
   * Side-effects: sets the `error`, `data` and `loading` on the state.
   */
  async load() {
    const { id, server = 'galleries' } = this.props
    if (!id) this.setState({ loading: false, error: 'No id' })
    /** @type {Gallery} */
    const data = await loadData.bind(this)(`${server}&id=${id}`)
    if (data) this.setState({ data })
  }
  /**
   * The data
   * @returns {Gallery}
   */
  get data() {
    return this.state.data
  }
  addUploadedResults(results) {
    this.setState({ uploadedResults:
      [...this.state.uploadedResults, ...results],
    })
  }
  /**
   * @returns {Gallery}
   */
  getData() {
    return this.data || {}
  }
  render() {
    const { pageTitle = 'Галерея' } = this.props
    const { title, cdnImage, description, _id, photos } = this.getData()
    const { uploadedResults, loading, preventLoader } = this.state
    return (<Col>
      <h1>{pageTitle}</h1>

      {!preventLoader && loading && <LoadingIndicator />}
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
      {this.data && <PhotoList photos={photos} loading={loading} />}
      <hr />
      {_id && <GalleryForm
        uploadedResults={uploadedResults}
        submitFinish={async (result) => {
          // the form responds with ids of added uploads
          const { 'data': res } = await result.json()
          if (res) {
            this.addUploadedResults(res)
            await this.load()
          }
        }} path="/admin-data?photos" galleryId={_id}
        confirmText="Сохранить Галерею"
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
//     <Input required placeholder="https://www.cian.ru/sale/suburban/164631748/" name="cian" {...({ 'style': 'display:inline;' })}/>
//     <button type="submit" className="btn btn-sm btn-warning">
//       Добавить Фото
//     </button>
//   </FormGroup>
// </Form>
// }

class PhotoList extends Component {
  /**
   * @param {{photos:Array<Photo>, loading:boolean}}
   */
  render({ photos, loading }) {
    return (<Row>
      {photos.map(({ file, _id: i, width, height }) => {
        // if (width || height) console.log('w/h %s %s', width, height)
        return (<Col key={i} className="col-sm-4" style="padding:.25rem;">
          <img className="img-fluid" style="max-height: 200px;" src={file} /></Col>)
      })}
      {loading && <Col className="col-sm-4">
        <div className="h-100 w-100 d-flex align-items-center rounded PhotoLoadingPlaceholder">
          <span className="align-middle" style="padding:.5rem;">
            Запрос изображений... <br />
            <GrowingSpinner />
          </span>
        </div>
      </Col>}
    </Row>)
  }
}

/**
 * This is the form to upload pictures.
 */
class GalleryForm extends SubmitForm {
  constructor() {
    super()
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
  }
  async componentDidMount() {
    await this.load()
  }
  async load() {
    /** @type {SAS} */
    const data = await loadData.bind(this)('sas')
    if (data) this.setState({ uri: data })
  }
  render({ galleryId, confirmText, uploadedResults }) {
    const { formLoading, error, success, uri } = this.state
    return (
      <Form onSubmit={this.submit}>
        <input name="galleryId" value={galleryId} type="hidden" />
        <FormGroup label="Загрузка Изображений" help="Выберите несколько изображений и загрузите их.">
          <PhotoUploader uploadUri={uri} onPhotoUploaded={this.reset} onAdded={this.reset} onRemove={this.reset}
            uploadedResults={uploadedResults}
          />
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