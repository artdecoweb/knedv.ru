/** @type {import('koa').Middleware} */
const getData = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  const { query: { id } } = ctx
  if ('categories' in ctx.query) {
    const c = await findInModel(database, 'Category', id)
    return c
  } else if ('objects' in ctx.query) {
    const categories = await findInModel(database, 'Category')
    const objects = await findInModel(database, 'Object', id)
    const mo = objects.map((_doc) => {
      const cat = categories.find(({ _id: cid }) => _doc.category == cid)
      if (!cat) return _doc
      return { ..._doc, categorySeo: cat.seo }
    }).reverse()
    await Promise.all(mo.map(async (doc) => {
      const photos = await findPhotos(database, doc._id, 'id')
      doc.numberOfPhotos = photos.length
    }))
    return mo
  } else if ('pages' in ctx.query) {
    const p = await findInModel(database, 'Page', id)
    return p
  } else if ('specials' in ctx.query) {
    const o = await findInModel(database, 'Special', id)
    return o
  } else if ('galleries' in ctx.query) {
    const isAlbum = 'album' in ctx.query
    const g = await findInModel(database, isAlbum ? 'Object' : 'Gallery', id)
    if (!id) return g
    if (!g.length) return
    const [gg] = g
    const photos = await findPhotos(database, id)
    await Promise.all(photos.map(async (p) => {
      const { photo } = p
      if (!photo) return p
      const upload = await findInModel(database, 'Upload', photo)
      const [u] = upload
      if (!u || !u.cdnImageS) return p
      p.file = u.cdnImageS
      return p
    }))
    gg.photos = photos
    return gg
  } else {
    return { error: 'unknown path' }
  }
}

/**
 * Queries Mongo and returns mapped documents, i.e., the `_doc` prop.
 */
export const findInModel = async (database, modelName, id) => {
  const model = database.getModel(modelName)
  const objects = await model.find({
    ...(id ? { _id: id }: {}),
  })
  return objects.map(mapDoc)
}
export const findPhotos = async (database, galleryId, fields) => {
  const model = database.getModel('Photo')
  const objects = await model.find({
    ...(galleryId ? { galleryId: galleryId }: {}),
  }, fields)
  return objects.map(mapDoc)
}

const mapDoc = ({ _doc }) => _doc

export const middleware = r => ['session', 'checkAdmin', 'ajaxAdmin', r]

export default getData