import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, FormRow } from '../../frontend/components/Bootstrap'

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
    this.loading = true
    try {
      const res = await fetch('/admin-data?categories')
      const data = await res.json()
      this.setState({ data })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    return <Col>
      <h1>Категории Каталога</h1>
      {this.state.loading && <span className="echo-loader">Loading…</span>}
      {this.state.data.map(({ title, image, description }) => {
        return <span>{title}</span>
      })}
    </Col>
  }
}

{/* <FormRow name="article" label="Статья" help="Подробная статья для раздела каталога." textarea={5} required="1"/> */}