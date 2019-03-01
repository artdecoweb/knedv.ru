import Router from '@depack/router'
import { Row, Col } from '../frontend/components/Bootstrap'
import Menu from './Menu'
import Categories from './pages/Categories'
import AddCategory from './pages/AddCategory'
import Objects from './pages/Objects'
import AddObject from './pages/AddObject'
import Pages from './pages/Pages'
import AddPage from './pages/AddPage'
import Special from './pages/Special'
import Gallery from './pages/Gallery';

const Home = () => {
  return <Col>
    <h1>Добро Пожаловать!</h1>
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
      <Pages path="/admin/pages" title="Статьи" />
      <AddPage path="/admin/add-page/:id?" title="Добавить Страницу" />
      <Special path="/admin/special" title="Специальные Предложения" />

      <Gallery path="/admin/galleries" title="Галереи" />
    </Router>
  </Row>

{/* <About path="/about" />
    // Advanced is an optional query
    <Search path="/search/:query/:advanced?" /> */}

export default App