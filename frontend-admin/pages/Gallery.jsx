import { Component } from 'preact'
import { Col, Row } from '../../frontend/components/Bootstrap'
import { loadData } from '../Components/LoadData'
import { LoadingIndicator } from '../Components'
import GalleryForm from './Forms/Gallery'

export default class Gallery extends Component {
  constructor() {
    super()
    this.state = { data: [], loading: true }
  }
  async componentDidMount() {
    await this.load()
  }
  /**
   * Loads the galleries list from the server.
   * Side-effects: sets the `error`, `data` and `loading` on the state.
   */
  async load() {
    /** @type {Array<Gallery>} */
    const data = await loadData.bind(this)('galleries')
    if (data) this.setState({ data })
  }
  get data() {
    return this.state.data
  }
  render() {
    const { loading } = this.state
    return (<Col>
      <h1>Галереи</h1>

      {loading && <LoadingIndicator />}
      {!loading && !this.state.data.length && 'Не существует галерей.'}
      {this.state.data.map(({ _id, title, cdnImage, description }) => {
        return (<Row key={_id}>
          <Col className="col-sm-3">
            <img className="img-fluid" src={cdnImage} />
          </Col>
          <Col>
            <h2>{title}</h2>
            <a href={`/admin/galleries/${_id}`}>Просмотр</a>
            {description}
          </Col>
        </Row>)
      })}
      <hr/>
      <Details title="Создать Новую Галерею">
        <GalleryForm path="/admin-data?galleries" submitFinish={() => {
          this.load()
        }} successMessage="Галерея успешно создана!"
        confirmText="Добавить" />
      </Details>
    </Col>)
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