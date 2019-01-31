import { Link } from './preact-router/match'

const Menu = () =>
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
    <Link className="nav-link" activeClassName="active" href="/admin/offers">
      <i className="fas fa-grip-lines"></i> Акции
    </Link>
    <a className="nav-link" href="#">Link</a>
    <a className="nav-link" href="#">Link</a>
    <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
  </nav>

export default Menu