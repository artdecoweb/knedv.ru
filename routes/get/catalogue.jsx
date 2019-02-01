import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories, selectedCategory, items, article }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} />
      {!selectedCategory && <Col>
        <h1>Каталог Недвижимости</h1>
        <p>Запрашиваемая категория не найдена. Выберите категорию из меню слева.</p>
      </Col>}
      {selectedCategory && <Col style="padding-bottom:1rem;">
        <h1>{selectedCategory.title}</h1>
        <p>{selectedCategory.description}</p>
        <div dangerouslySetInnerHTML={{ __html: article }}/>
        <hr/>
        <Row>
          {items.map(({ title, seo, description, cdnImage }) => {
            return <Col key={title}>
              <img src={cdnImage} title={title} className="img-fluid"/>
              <h3>{title}</h3>
              <p>{description}</p>
              <a className="btn btn-outline-danger" href={seo}>Подробнее</a>
            </Col>
          })}
        </Row>
      </Col>}
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description cdnImage')
  const selectedCategory = categories.find(({ seo }) => {
    return seo == ctx.params.category
  })
  let items = [], article
  if (selectedCategory) {
    const Objects = database.getModel('Object')
    ;([{ article }] = (await Categories.find({ _id: selectedCategory.id }, 'article')))
    items = await Objects.find({ category: selectedCategory.id })
  }
  const content = <Content categories={categories} offers={[]} selectedCategory={selectedCategory} items={items} article={article}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: selectedCategory ? selectedCategory.title : 'Каталог',
    App: app,
  })
  ctx.status = selectedCategory ? 200 : 404
}
export default route

export const aliases = [`/${encodeURIComponent('каталог')}/:category/:property*`]