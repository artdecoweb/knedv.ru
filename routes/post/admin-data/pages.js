import { getSeo } from '../../../src/lib'

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const pages = async (ctx, database) => {
  const Page = database.getModel('Page')
  if ('delete' in ctx.query && ctx.query.id) {
    await Page.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  const { description, title, seo: _seo, id, article } = ctx.req.body
  const seo = getSeo(_seo)

  /** @type {import('../../src/database/schema')._Category} */
  const d = {
    description,
    title,
    seo,
    article,
  }
  if (id) {
    const res = await Page.updateOne({ _id: id }, d)
    return res._doc
  } else {
    const c = new Page(d)
    const res = await c.save()
    return res._doc
  }
}

export default pages