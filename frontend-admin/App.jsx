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
const Categories = () => {
  return <Col>
    <h1>Категории Каталога</h1>
    Form
  </Col>
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