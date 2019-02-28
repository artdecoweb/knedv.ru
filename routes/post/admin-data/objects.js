import { getSeo, handleImage } from '../../../src/lib'

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../../src/database').default} database
 */
const objects = async (ctx, database) => {
  const Obj = database.getModel('Object')
  if ('delete' in ctx.query && ctx.query.id) {
    await Obj.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  const { description, title, seo: _seo, id, category,
    article, price } = ctx.req.body
  const { file: {
    mimetype, path,
  } = {} } = ctx.req
  const seo = getSeo(_seo)
  const img = await handleImage(ctx.cdn, ctx.storage, path, seo, mimetype)
  /** @type {import('../../../src/database/schema')._Object} */
  const d = {
    description,
    title,
    seo,
    price,
    ...img,
    category,
    article,
  }
  if (id) {
    const res = await Obj.updateOne({ _id: id }, d)
    return res._doc
  } else {
    const c = new Obj(d)
    const res = await c.save()
    return res._doc
  }
}

export default objects