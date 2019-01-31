import { Component } from 'preact'
import fetch from 'unfetch'
import Router from './preact-router'
import { Link } from './preact-router/match'
import { Row, Col } from '../frontend/components/Bootstrap'

const Home = () => {
  return <Col>
    <h1>Добро Пожаловать!</h1>
  </Col>
}
const Add = () => {
  return <Col>
    <h1>Добавить Объект Недвижимости</h1>
    Form
  </Col>
}

class Categories extends Component {
  constructor() {
    super()
    this.data = []
  }
  async componentDidMount() {
    this.loading = true
    try {
      const res = await fetch('/admin-data?categories')
      this.data = await res.json()
    } catch (err) {
      this.loading = false
      this.error = err
    }
  }
  async submit(e) {
    e.preventDefault()
    console.log(this.form)
    const data = new FormData(this.form)
    const res = await fetch('/admin-data?categories', {
      method: 'POST',
      body: data,
    })
    return false
  }
  render() {
    return <Col>
      <h1>Категории Каталога</h1>
      {this.loading & <span className="echo-loader">Loading…</span>}
      {this.data.map(({ title, image, description }) => {
        return <span>{title}</span>
      })}
      <hr/>
      <h2>Добавить Категорию</h2>
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group form-check">
          <input name="check" type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Col>
  }
}

const App = () =>
  <Row>
    <Col className="col-md-3">
      <nav className="nav flex-column">
        <Link className="nav-link" activeClassName="active" href="/admin">
          Главная
        </Link>
        <Link className="nav-link" activeClassName="active" href="/admin/add">
          <i className="fas fa-home"></i> Добавить Объект
        </Link>
        <Link className="nav-link" activeClassName="active" href="/admin/categories">
          <i className="far fa-list-alt"></i> Категории
        </Link>
        <Link className="nav-link" activeClassName="active" href="/admin/special">
          <i className="fas fa-bolt"></i> Специальные Предложения
        </Link>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link" href="#">Link</a>
        <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
      </nav>
    </Col>
    <Router>
      <Home path="/admin" />
      <Add path="/admin/add" />
      <Categories path="/admin/categories" />
    </Router>
  </Row>

{/* <About path="/about" />
    // Advanced is an optional query
    <Search path="/search/:query/:advanced?" /> */}

export default App