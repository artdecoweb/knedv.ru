import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories, page }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} />
      {!page && <Col>
        <h1>Ошибка</h1>
        <p>Запрашиваемая страница не найден. Выберите категорию каталога недвижимости из меню слева, или другие страницы сайта вверху.</p>
      </Col>}
      {page && <Col style="padding-bottom:1rem;" dangerouslySetInnerHTML={{ __html: page.article }}/>}
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description')
  const Page = database.getModel('Page')
  const [page] = await Page.find({ seo: ctx.params.page })
  const content = <Content categories={categories} offers={[]} page={page}/>
  const app = <App activeMenu={page ? page.seo : ''} Content={content} />
  ctx.body = Layout({
    title: page ? page.title : 'Каталог',
    App: app,
  })
  ctx.status = page ? 200 : 404
}
export default route

export const aliases = [`/:page`]