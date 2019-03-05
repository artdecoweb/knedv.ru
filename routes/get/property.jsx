import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'
import { findPhotos, findInModel } from './admin-data'

const Content = ({ offers, categories, property, photos }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      <LeftMenu categories={categories} noBanner={true} />
      {!property && <Col>
        <h1>Каталог Недвижимости</h1>
        <p>Запрашиваемый объект не найден. Выберите категорию из меню слева.</p>
      </Col>}
      {property && <Col style="padding-bottom:1rem;">
        <h1>{property.title}</h1>
        <img src={property.cdnImage} className="image-float"/>
        <p>{property.description}</p>
        <div dangerouslySetInnerHTML={{ __html: property.article }}/>
        {!!photos.length && <h2>Фотографии</h2>}
        {photos.map(({ file, fileLarge, name }) => {
          const img = <img className="mb-2 img-fluid" src={file} alt={name}/>
          if (fileLarge) {
            return <a className="PhotoLink" href={fileLarge} target="_blank" rel="noopener noreferrer">
              {img} <span className="zoomIn">Увеличить 🔍</span>
            </a>
          }
          return img
        })}
      </Col>}
    </Row>
  </div>
}

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  const Categories = database.getModel('Category')
  const categories = await Categories.find({}, 'title seo description')
  let property, photos
  const Objects = database.getModel('Object')
  if (ctx.params.property) {
    ([property] = await Objects.find({ seo: ctx.params.property }))
  }
  if (property) {
    photos = await findPhotos(database, property._id)
    await Promise.all(photos.map(async (p) => {
      const { photo, cdnImageS, cdnImageM } = p
      if (cdnImageS) {
        p.fileLarge = cdnImageM
        return p.file = cdnImageS
      }
      // try from ver 2 (dep this)
      if (!photo) return p
      const upload = await findInModel(database, 'Upload', photo)
      const [u] = upload
      if (!u || !u.cdnImageS) return p
      p.file = u.cdnImageS
      p.fileLarge = u.cdnImageM
      return p
    }))
  }
  const content = <Content categories={categories} offers={[]} property={property} photos={photos}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: property ? property.title : 'Каталог',
    App: app,
  })
  ctx.status = property ? 200 : 404
}
export default route

export const aliases = [`/${encodeURIComponent('каталог')}/:category/:property`]