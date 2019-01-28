import { Row } from "./components/Bootstrap"

const TopMenu = ({ activeMenu }) => {
  return <div className="container-fluid TopMenu">
    <Row className="d-flex justify-content-center">
      <TopMenuCol active={activeMenu} name="index">Каталог Недвижимости</TopMenuCol>
      <TopMenuCol>О Компании</TopMenuCol>
      <TopMenuCol>Справочная</TopMenuCol>
      <TopMenuCol>Новости</TopMenuCol>
      <TopMenuCol>Партнеры</TopMenuCol>
      <TopMenuCol>Акции</TopMenuCol>
      <TopMenuCol>Контакты</TopMenuCol>
    </Row>
  </div>
}

/**
 * The Top Menu Column.
 */
const TopMenuCol = ({ children, active, name = '' }) => {
  const ac = active == name ? ' Active' : ''
  const cl = `TopMenuCol h-100 p-2 px-2 mx-1${ac}`
  return <div className={cl}>{children}</div>
}

export default TopMenu