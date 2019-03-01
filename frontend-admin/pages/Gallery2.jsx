import { Component } from 'preact'
import { Col, Row } from '../../frontend/components/Bootstrap'
import { loadData } from '../Components/LoadData'
import { LoadingIndicator } from '../Components'
// import 'preact/devtools/'
import { Gallery } from '../Components/PhotoUploader'

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
    const d = await loadData.bind(this)(`galleries&id=${id}`)
    /** @type {Gallery} */
    const data = d[0]
    if (data) this.setState({ data })
  }
  get data() {
    return this.state.data
  }
  render() {
    const { title, cdnImage, description } = this.data || {}
    return (<Col>
      <h1>Галерея</h1>

      {this.loading && <LoadingIndicator />}
      {this.data && <Row>
        <Col className="col-sm-3">
          <img className="img-fluid" src={cdnImage} />
        </Col>
        <Col>
          <h2>{title}</h2>
          {description}
        </Col>
      </Row>
      }
      <h3>Загрузка Изображений</h3>
      <Gallery />
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