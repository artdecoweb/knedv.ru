import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import { SpecialBanner } from '../../frontend/SpecialBanner'
import IndexContent from '../../frontend/content/Index'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories, special }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} />
      <IndexContent categories={categories} />
      {special &&
        <Col className="col-md-6 col-lg-3 order-1 order-lg-2 mb-3">
          <h2>
            <img src="website/flash_on.svg" style="height:2rem;"/>Спе\u00ADциаль\u00ADные пред\u00ADло\u00ADже\u00ADния!
          </h2>
          <SpecialBanner
            img={special.cdnImage}
            title={special.title}
            price={special.price}
            href={special.href}>
            {special.description}
          </SpecialBanner>
        </Col>
      }
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description cdnImage')
  const Special = database.getModel('Special')
  const special = await Special.findOne({}, 'title description price href cdnImage')
  const content = <Content categories={categories} offers={[]} special={special}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: 'Корпорация Недвижимости 21 Век',
    App: app,
  })
}
export default route

export const aliases = ['/']