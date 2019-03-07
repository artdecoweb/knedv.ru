import render from '@depack/render'
import { Row, Col } from '../frontend/components/Bootstrap'

const AdminLayout = ({
  title, App, loggedIn, PROD,
}) => '<!doctype html>' + render(<html className="h-100">
  <head lang="ru">
    <title>{title}</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="/website/Admin.css"/>
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="/website/echo.css"/>
  </head>
  <body className="d-flex flex-column h-100">
    <main role="main" className="flex-shrink-0">
      <div className="container-fluid" style="background: #edeee8; border: 2px dashed #5d6b7c;">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <span className="Corp">Администрирование</span>
            <span>
              <a href="/" className="btn btn-danger">На сайт</a>
              {loggedIn && <a href="/exit" className="btn btn-secondary">Выход</a>}
            </span>
          </Col>
        </Row>
      </div>
      <div className="TopBanner container-fluid">
        <Row>
          <Col className="Banner">
            <img src="/website/stonehedge.jpg" className="img-fluid" style="text-align:center;"/>
          </Col>
        </Row>
      </div>
      <div className="container mb-3" id="AppContainer">
        {App}
      </div>
    </main>

    <footer className="footer mt-auto py-3" style="background: #efefef;">
      <div className="container">
        <span className="text-muted">© 2019, Корпорация Недвижимости 21 Век.</span>
      </div>
    </footer>

    {loggedIn &&
      <script src="/azure.js"></script>
    }
    {loggedIn && !PROD &&
      <script type="module" src="/frontend-admin/"></script>
    }
    {loggedIn && PROD &&
      <script src="/admin.js"></script>
    }
  </body>
</html>)

{/*  */}

export default AdminLayout