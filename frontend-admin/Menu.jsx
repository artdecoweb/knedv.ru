import { Link } from './preact-router/Match'

const Menu = () =>
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
    <Link className="nav-link" href="/admin/pages">
      <i className="fas fa-font"></i> Статьи
    </Link>
    <Link className="nav-link" href="/admin/add-page" style="margin-left:2rem">
      <i className="fas fa-pen-nib"></i> Добавить Страницу
    </Link>
    <Link className="nav-link" href="/admin/special">
      <i className="fas fa-bolt"></i> Специальные Предложения
    </Link>
    <Link className="nav-link" href="/admin/offers">
      <i className="fas fa-grip-lines"></i> Акции
    </Link>
  </nav>

export default Menu