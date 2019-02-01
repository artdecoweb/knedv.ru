import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, Row, Icon } from '../../frontend/components/Bootstrap'

export default class Categories extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: [],
    }
  }
  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const res = await fetch('/admin-data?categories')
      const { error, data } = await res.json()
      this.setState({ data })
      console.log(data)
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    return <Col>
      <h1>Категории Каталога</h1>
      <p>
        В каталоге невдижимости содержатся следующие разделы:
      </p>
      {this.state.loading && <span className="echo-loader">Loading…</span>}
      {this.state.data.map(({ _id, ...item }) => {
        return <ItemRow key={_id} {...item} />
      })}
    </Col>
  }
}

const ItemRow = ({ title, image, description, seo }) => {
  return <Row>
    <Col><img src={image}/></Col>
    <Col>
      <h2>{title}</h2>
      <p>{seo}</p>
    </Col>
    <Col><p>{description}</p></Col>
    <Col><Icon icon="fas fa-pen"/></Col>
  </Row>
}

{/* <FormRow name="article" label="Статья" help="Подробная статья для раздела каталога." textarea={5} required="1"/> */}