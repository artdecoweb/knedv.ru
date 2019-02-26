import { getSeo, handleImage } from '../../../src/lib'

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
  const { description, title, seo: _seo, id, article } = ctx.req.body
  const { file: {
    mimetype, path,
  } = {} } = ctx.req
  const seo = getSeo(_seo)
  const img = await handleImage(ctx.cdn, ctx.storage, path, seo, mimetype)

  /** @type {import('../../src/database/schema')._Category} */
  const d = {
    description,
    title,
    seo,
    ...img,
    article,
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