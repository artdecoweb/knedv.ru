// import { Component } from 'preact'
// import fetch from 'unfetch'
import Router from './preact-router'
import { Row, Col } from '../frontend/components/Bootstrap'
import Menu from './Menu'
import Categories from './pages/Categories'
import AddCategory from './pages/AddCategory';

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
    <Router>
      <Home path="/admin" />
      <Add path="/admin/add" />
      <Categories path="/admin/categories" />
      <AddCategory path="/admin/add-category" />
    </Router>
  </Row>

{/* <About path="/about" />
    // Advanced is an optional query
    <Search path="/search/:query/:advanced?" /> */}

export default App