import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories, property }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} />
      {!property && <Col>
        <h1>Каталог Недвижимости</h1>
        <p>Запрашиваемый объект не найден. Выберите категорию из меню слева.</p>
      </Col>}
      {property && <Col style="padding-bottom:1rem;">
        <h1>{property.title}</h1>
        <img src={property.cdnImage} className="image-float"/>
        <p>{property.description}</p>
        <div dangerouslySetInnerHTML={{ __html: property.article }}/>
      </Col>}
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description')
  let property
  const Objects = database.getModel('Object')
  if (ctx.params.property) {
    ([property] = await Objects.find({ seo: ctx.params.property }))
  }
  const content = <Content categories={categories} offers={[]} property={property}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: property ? property.title : 'Каталог',
    App: app,
  })
  ctx.status = property ? 200 : 404
}
export default route

export const aliases = [`/${encodeURIComponent('каталог')}/:category/:property`]