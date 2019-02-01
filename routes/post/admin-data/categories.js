import { resize, file, checkExtension } from '../../../src/images'
import { getSeo } from '../../../src/lib'

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const categories = async (ctx, database) => {
  const Category = database.getModel('Category')
  if ('delete' in ctx.query && ctx.query.id) {
    await Category.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  const { description, title, seo: _seo, id } = ctx.req.body
  const { file: {
    mimetype, path,
  } = {} } = ctx.req
  const seo = getSeo(_seo)
  checkExtension(mimetype)
  const buffer = await resize(path, 250)
  const blob = `catalog/${seo}.jpg`
  const container = 'images'
  const thumb_url = await file({
    storage: ctx.storage,
    text: buffer,
    container, blob, contentType: 'image/jpeg',
  })
  const location = `${container}/${blob}`
  /** @type {import('../../src/database/schema')._Category} */
  const d = {
    description,
    title,
    seo,
    image: thumb_url,
    imageLocation: location,
    imageContainer: container,
    cdnImage: `${ctx.cdn}/${location}`,
  }
  if (id) {
    const res = await Category.updateOne({ _id: id }, d)
    return res._doc
  } else {
    const c = new Category(d)
    const res = await c.save()
    return res._doc
  }
}

export default categories