import AdminLayout from '../../src/AdminLayout'
import Menu from '../../frontend-admin/Menu'
import { Row, Col } from '../../frontend/components/Bootstrap'

const App = () => <div>
  <Row>
    <Col className="col-md-3">
      <Menu editorActive="1"/>
    </Col>
    <Col>
      <h1>Редактор Статей</h1>
      <div id="trumbowyg"/>
    </Col>

  </Row>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
  <script src="/node_modules/trumbowyg/dist/trumbowyg.js"></script>
  <script>
    $('#trumbowyg').trumbowyg();
  </script>
</div>

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  ctx.body = AdminLayout({
    App: <App/>,
    title: 'Редактор',
    loggedIn: 1,
    noPreact: true,
  })
}
export default route

export const middleware = r => ['session', 'checkAdmin', r]

export const aliases = ['/admin/editor']