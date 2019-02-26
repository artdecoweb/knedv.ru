import render from '@depack/render'
import { Row, Col } from '../frontend/components/Bootstrap'

const Html = ({ title, App }) => <html>
  <head lang="ru">
    <title>{title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="/website/App.css"/>
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet"/>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
    <link rel="manifest" href="/site.webmanifest"/>
  </head>
  <body>
    <div className="container-fluid" style="background:#edeee8; border: 2px dashed brown;">
      <Row>
        <Col className="TopLetters">
          <span className="Corp" style="    text-shadow: 1px 1px brown;">КОРПОРАЦИЯ НЕДВИЖИМОСТИ 21 ВЕК</span>
          <span className="Phone">
            <img src="/website/phone_android.svg" style="height: 2rem; margin-top: -0.25rem;"/>
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

    <div id="AppContainer">
      {App}
    </div>

    <div className="container-fluid">
      <Row className="Footer mt-3">
        <Col>
          © 2019, Корпорация Недвижимости 21 Век
          <p>
            +7 (495) 749-29-15, +7 (499) 130-30-80<br/>
            г. Москва, Крымский вал, д. 3, стр. 2, подъезд 2, офис 213
          </p>
        </Col>
      </Row>
    </div>
  </body>
</html>
  {/* <script type="module" src="frontend"></script> */}

// <span className="Phone"></span>

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