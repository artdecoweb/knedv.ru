import { Row } from "./components/Bootstrap"

const TopMenu = ({ activeMenu }) => {
  return <div className="container-fluid TopMenu mb-2">
    <Row className="d-flex justify-content-center">
      <TopMenuCol active={activeMenu} name="index">Каталог Недвижимости</TopMenuCol>
      <TopMenuCol active={activeMenu} name="о-компании">О Компании</TopMenuCol>
      <TopMenuCol active={activeMenu} name="справочная">Справочная</TopMenuCol>
      <TopMenuCol active={activeMenu} name="новости">Новости</TopMenuCol>
      <TopMenuCol active={activeMenu} name="партнеры">Партнеры</TopMenuCol>
      <TopMenuCol active={activeMenu} name="акции">Акции</TopMenuCol>
      <TopMenuCol active={activeMenu} name="контакты">Контакты</TopMenuCol>
    </Row>
  </div>
}

/**
 * The Top Menu Column.
 */
const TopMenuCol = ({ children, active, name = '' }) => {
  const ac = active == name ? ' Active' : ''
  const cl = `TopMenuCol h-100 p-2 px-2 mx-1${ac}`
  return <div className={cl}>
    <a href={`/${name == 'index' ? '' : name}`}>{children}</a>
  </div>
}

export default TopMenu