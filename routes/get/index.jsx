import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import { SpecialBanner } from '../../frontend/SpecialBanner'
import IndexContent from '../../frontend/content/Index'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} />
      <IndexContent categories={categories} />
      <Col className="col-md-6 col-lg-3 order-1 order-lg-2 mb-3">
        <h2>
          <img src="website/flash_on.svg" style="height:2rem;"/>Спе\u00ADциаль\u00ADные пред\u00ADло\u00ADже\u00ADния!
        </h2>
        <SpecialBanner
          img="http://www.realty.ru/images/objects/original/14824100977614882.jpg"
          title="Ленинский проспект, дом 114"
          price="55 000 000 руб."
          contact="Лариса Ивановна 8(903)743-09-44"
          href="/каталог/москва-элитная/ленинский-проспект-дом-114"
        >
          Элитный квартал на Ленинском! Большая охраняемая территория. Дом во дворе зеленого, тихого, малоэтажного строительства. Красивая, удобная рекреационная входная группа.
        </SpecialBanner>
      </Col>
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description cdnImage')
  const content = <Content categories={categories} offers={[]}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: 'Корпорация Недвижимости 21 Век',
    App: app,
  })
}
export default route

export const aliases = ['/']