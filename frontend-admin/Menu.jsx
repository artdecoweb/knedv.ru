import { Link } from '@depack/router'

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
      <i className="fas fa-bolt"></i> Спец. Предложения
    </Link>
    <Link className="nav-link" href="/admin/offers">
      <i className="fas fa-grip-lines"></i> Акции
    </Link>
    <Link className="nav-link" href="/admin/galleries/">
      <i className="fas fa-camera-retro"></i> Галереи
    </Link>
  </nav>

export default Menu

{/* <Link className="nav-link" href="/admin/photos" style="margin-left:2rem"></Link>
    <i className="fas fa-camera"></i> Фотографии */}