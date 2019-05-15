import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'

const Content = ({ offers, categories, selectedCategory, items, article, admin }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu md={3} noBanner={true} categories={categories} />
      {!selectedCategory && <Col>
        <h1>Каталог Недвижимости</h1>
        <p>Запрашиваемая категория не найдена. Выберите категорию из меню слева.</p>
      </Col>}
      {selectedCategory && <Col style="padding-bottom:1rem;">
        <h1>{selectedCategory.title}</h1>
        <p>{selectedCategory.description}</p>
        <div className="ArticleContainer" dangerouslySetInnerHTML={{ __html: article }}/>
        <hr/>
        <Row>
          {items.reduce((acc, { title, seo, description, cdnImage, price, hidden }, i) => {
            if (hidden && !admin) return acc
            const third = (i + 1)%3 == 0
            const c = <Col key={seo} className="GridItem" style={hidden ? 'opacity: .5': ''}>
              <img alt={description} src={cdnImage} title={title} className="img-fluid"/>
              <h3>{title}{hidden ? ' (выключено)' : ''}</h3>
              <p>{price}</p>
              <span>
                <a className="btn btn-outline-danger" href={seo}>Подробнее</a>
              </span>
            </Col>
            if (third) return [...acc, c, <BugFix/>]
            return [...acc, c]
          }, [])}
        </Row>
      </Col>}
    </Row>
  </div>
}

const BugFix = () => {
  return (<div className="w-100" id="BugFix"></div>)
}

/** @type {import('../..').Middleware} */
const route = async (ctx) => {
  if (!ctx.path.endsWith('/')) {
    return ctx.redirect(`${ctx.path}/`)
  }
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description cdnImage')
  const selectedCategory = categories.find(({ seo }) => {
    return seo == ctx.params.category
  })
  let items = [], article
  const Objects = database.getModel('Object')
  if (selectedCategory) {
    ([{ article }] = (await Categories.find({ _id: selectedCategory.id }, 'article')))
    items = await Objects.find({ category: selectedCategory.id })
  }

  const content = <Content
    categories={categories}
    offers={[]}
    selectedCategory={selectedCategory}
    items={items}
    article={article}
    admin={ctx.session.admin}
  />

  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: selectedCategory ? selectedCategory.title : 'Каталог',
    App: app,
  })
  ctx.status = selectedCategory ? 200 : 404
}
export default route

export const aliases = [`/${encodeURIComponent('каталог')}/:category/`]