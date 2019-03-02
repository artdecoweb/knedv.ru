/** @type {import('koa').Middleware} */
const getData = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  const { query: { id } } = ctx
  if ('categories' in ctx.query) {
    const c = await findInModel(database, 'Category', id)
    return c
  } else if ('objects' in ctx.query) {
    const catModel = database.getModel('Category')
    const categories = await catModel.find()
    const model = database.getModel('Object')
    const objects = await model.find({
      ...(id ? { _id: id }: {}),
    })
    const mo = objects.map(({ _doc }) => {
      const cat = categories.find(({ id: cid }) => _doc.category == cid)
      if (!cat) return _doc
      return { ..._doc, categorySeo: cat.seo }
    })
    return mo
  } else if ('pages' in ctx.query) {
    const p = await findInModel(database, 'Page', id)
    return p
  } else if ('specials' in ctx.query) {
    const o = await findInModel(database, 'Special', id)
    return o
  } else if ('galleries' in ctx.query) {
    const g = await findInModel(database, 'Gallery', id)
    if (!id) return g
    if (!g.length) return
    const [gg] = g
    const photos = await findPhotos(database, id)
    gg.photos = photos
    return gg
  } else {
    return { error: 'unknown path' }
  }
}

const findInModel = async (database, modelName, id) => {
  const model = database.getModel(modelName)
  const objects = await model.find({
    ...(id ? { _id: id }: {}),
  })
  return objects.map(mapDoc)
}
const findPhotos = async (database, galleryId) => {
  const model = database.getModel('Photo')
  const objects = await model.find({
    ...(galleryId ? { galleryId: galleryId }: {}),
  })
  return objects.map(mapDoc)
}

const mapDoc = ({ _doc }) => _doc

export const middleware = r => ['session', 'checkAdmin', 'ajaxAdmin', r]

export default getData