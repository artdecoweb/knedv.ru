import { getSeo, handleImage } from '../../../src/lib'

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const specials = async (ctx, database) => {
  const Special = database.getModel('Special')
  if ('delete' in ctx.query && ctx.query.id) {
    await Special.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  const {
    description, title, seo: _seo, id, article, price, href,
  } = ctx.req.body

  const { file: {
    mimetype, path, filename,
  } = {} } = ctx.req
  const seo = getSeo(_seo || filename)
  const img = await handleImage(ctx.cdn, ctx.storage, path, seo, mimetype, { folder: 'specials' })

  /** @type {import('../../src/database/schema')._Category} */
  const d = {
    price, href,
    description,
    title,
    seo,
    ...img,
    article,
  }
  if (id) {
    const res = await Special.updateOne({ _id: id }, d)
    return res._doc
  } else {
    const c = new Special(d)
    const res = await c.save()
    return res._doc
  }
}

export default specials