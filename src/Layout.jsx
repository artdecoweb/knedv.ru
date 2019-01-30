import render from 'preact-render-to-string'
import { Row, Col } from '../frontend/components/Bootstrap'

const Html = ({ title, App }) => <html>
  <head lang="ru">
    <title>{title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="website/App.css"/>
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet"/>
  </head>
  <body>
    <div className="container-fluid" style="background:#edeee8; border: 2px dashed brown;">
      <Row>
        <Col className="TopLetters">
          <span className="Corp" style="    text-shadow: 1px 1px brown;">КОРПОРАЦИЯ НЕДВИЖИМОСТИ 21 ВЕК</span>
          <span className="Phone">
            <img src="website/phone_android.svg" style="height: 2rem; margin-top: -0.25rem;"/>
            +7 (495) 749-29-15
          </span>
        </Col>
      </Row>
    </div>
    <div className="TopBanner container-fluid">
      <Row className="h-100 d-flex align-items-center">
        <Col className="col-sm-9 col-md-7 col-lg-5 align-middle mb-2">
          <h2 style="color: #fff7d8; text-shadow: 1px 1px #503c3d;">Найти Лучшее Жилье</h2>
          <input className="SearchBox w-100" placeholder="напр., новостройка или Полежаевская"></input>
        </Col>
      </Row>
    </div>
    <div id="App">
      {App}
    </div>
    <script type="module" src="frontend"></script>
  </body>
</html>
          // <span className="Phone">+7 (499) 130-30-80</span>

//
{/* <img src="" className="img-fluid rounded"/> */}
// <Col className="col-lg-6">
//           <h2>Поиск Лучшего Жилья</h2>

//         </Col>
/* <div style="z-index:999; min-height:250px;">
  <h2>Найдите лучшую квартиру для покупки или аренды</h2> <input>
  </input>
</div> */

const Layout = ({ App, title }) => {
  return '<!doctype html>' + render(<Html
    title={title}
    App={App}/>
  )
}

export default Layout