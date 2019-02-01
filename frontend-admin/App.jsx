// import { Component } from 'preact'
// import fetch from 'unfetch'
import Router from './preact-router'
import { Row, Col } from '../frontend/components/Bootstrap'
import Menu from './Menu'
import Categories from './pages/Categories'
import AddCategory from './pages/AddCategory'
import Objects from './pages/Objects'
import AddObject from './pages/AddObject'

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

const App = () =>
  <Row id="App">
    <Col className="col-md-4">
      <Menu />
    </Col>
    <Router onChange={(e) => {
      if (e.current && e.current.attributes.title) {
        document.title = e.current.attributes.title
      }
    }}>
      <Home path="/admin" title="Главная" />
      <Objects path="/admin/objects" title="Объекты Недвижимости" />
      <AddObject path="/admin/add-object/:id?" title="Добавить Объект" />
      <Categories path="/admin/categories" title="Категории Каталога" />
      <AddCategory path="/admin/add-category/:id?" title="Добавить Категорию" />
    </Router>
  </Row>

{/* <About path="/about" />
    // Advanced is an optional query
    <Search path="/search/:query/:advanced?" /> */}

export default App