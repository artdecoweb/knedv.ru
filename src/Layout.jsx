import render from 'preact-render-to-string'
import { TopMenuCol, Row } from './components/Bootstrap'

const Html = ({ title, App }) => <html>
  <head lang="ru">
    <title>{title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="website/App.css"/>
  </head>
  <body>
    <div className="container-fluid">
      <div className="row">
        <div className="col" style="text-align: center;">
          <img src="website/banner.gif" title="Корпорация Недвижимости 21 Век" className="img-fluid"/>
        </div>
      </div>
    </div>
    <div id="Content">
      <div className="container-fluid TopMenu">
        <Row className="d-flex justify-content-center">
          <TopMenuCol>Каталог Недвижимости</TopMenuCol>
          <TopMenuCol>О Компании</TopMenuCol>
          <TopMenuCol>Справочная</TopMenuCol>
          <TopMenuCol>Новости</TopMenuCol>
          <TopMenuCol>Партнеры</TopMenuCol>
          <TopMenuCol>Акции</TopMenuCol>
          <TopMenuCol>Контакты</TopMenuCol>
        </Row>
      </div>
      {App}
    </div>
    <script type="module" src="frontend"></script>
  </body>
</html>

const Layout = ({ App, title }) => {
  return '<!doctype html>' + render(<Html
    title={title}
    App={App}/>
  )
}

export default Layout