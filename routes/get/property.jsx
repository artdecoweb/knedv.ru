import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Row, Col } from '../../frontend/components/Bootstrap'
import { LeftMenu } from '../../frontend/LeftMenu'
import Offer from '../../frontend/components/Offer'
import { findPhotos, findInModel } from './admin-data'

const Content = ({ offers, categories, property, photos, admin }) => {
  return <div className="container-fluid">
    {offers.map(({ text }) => <Offer>{text}</Offer>)}
    <Row>
      {!property && <Col>
        <h1 className="CatTitle">Каталог Недвижимости</h1>
        <p>Запрашиваемый объект не найден. Выберите категорию из меню справа.</p>
      </Col>}
      {property && <Col style="padding-bottom:1rem;">
        <div className="CatTitle" style="position:relative;">
          <span className="w-100 h-100" style="position:absolute;top:0;left:0;background:url('/moscow.png');background-size:contain;"/>
          <h1 style="position:relative;">
            {property.title}</h1>
        </div>
        <div className="d-flex">
          <div className="flex-shrink-0 p-2">
            <div className="PreviewContainer" style="position:relative;">
              <img className="rounded Blur w-100 h-100" src={property.cdnImage} />
              <img src={property.cdnImage} className="ActualImage m-3 rounded img-fluid" style="position:relative;"/>
            </div>
          </div>
          <div className="p-2">
            {property.description}
            {property.price && <a href="/контакты" className="btn btn-success d-block">Купить {property.price}</a>}
          </div>
        </div>
        <Admin admin={admin} id={property.id} />
        <div dangerouslySetInnerHTML={{ __html: property.article }}/>

        {!!photos.length &&
          <p className="text-center mt-3">
            <img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/0.svg?sanitize=true" />
          </p>
        }
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
      <LeftMenu categories={categories} noBanner={true} md={3} />
    </Row>
  </div>
}

// style="position: absolute; top:0; left: 0;"
// {property.article && <p className="text-center mt-3">
//   <img src="https://raw.githubusercontent.com/artdecocode/documentary/HEAD/src/section-breaks/1.svg?sanitize=true" />
// </p>}

const Admin = ({ admin, id }) => {
  if (!admin) return null
  return (<p>
    <a className="btn btn-warning"
      href={`/admin/albums/${id}`}>
      Добавить Фото
    </a>
    <a className="btn ml-2 btn-light"
      href={`/admin/add-object/${id}`}>
      Редактировать
    </a>
  </p>)
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
  const content = <Content categories={categories} offers={[]} property={property} photos={photos} admin={ctx.session.admin}/>
  const app = <App activeMenu="index" Content={content} />
  ctx.body = Layout({
    title: property ? property.title : 'Каталог',
    App: app,
  })
  ctx.status = property ? 200 : 404
}
export default route

export const aliases = [`/${encodeURIComponent('каталог')}/:category/:property`]