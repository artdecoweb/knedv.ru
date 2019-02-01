import { Link } from './preact-router/match'

const Menu = ({ editorActive }) =>
  <nav className="nav flex-column">
    <Link className="nav-link" href="/admin">
      <i className="fab fa-kickstarter-k"></i> Главная
    </Link>
    <Link className="nav-link" href="/admin/objects">
      <i className="fas fa-map-marked-alt"></i> Управление Объектами
    </Link>
    <Link className="nav-link" href="/admin/add-object" style="margin-left:2rem">
      <i className="fas fa-home"></i> Новая Недвижимость
    </Link>
    <Link className="nav-link" href="/admin/categories">
      <i className="far fa-list-alt"></i> Категории Каталога
    </Link>
    <Link className="nav-link" href="/admin/add-category" style="margin-left:2rem">
      <i className="fas fa-folder-plus"></i> Добавить
    </Link>
    <Link className="nav-link" href="/admin/articles">
      <i className="fas fa-font"></i> Статьи
    </Link>
    <a className={`nav-link${editorActive ? ' active' : ''}`} href="/admin/editor" native style="margin-left:2rem;">
      <i className="fas fa-pen-nib"></i> Редактор Метериалов
    </a>
    <Link className="nav-link" href="/admin/special">
      <i className="fas fa-bolt"></i> Специальные Предложения
    </Link>
    <Link className="nav-link" href="/admin/offers">
      <i className="fas fa-grip-lines"></i> Акции
    </Link>
    <a className="nav-link" href="#">Link</a>
    <a className="nav-link" href="#">Link</a>
    <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
  </nav>

export default Menu