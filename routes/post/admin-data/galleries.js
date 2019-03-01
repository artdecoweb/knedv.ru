import { handleImage } from '../../../src/lib'

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const galleries = async (ctx, database) => {
  const Gallery = database.getModel('Gallery')
  if ('delete' in ctx.query && ctx.query.id) {
    await Gallery.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  /**
   * The gallery
   * @type {import('../../../src/database/schema')._Gallery}
   */
  const b = ctx.req.body
  const {
    description, title, /* comes when editing */ id,
  } = b

  const { file: {
    mimetype, path, filename,
  } = {} } = ctx.req
  const img = await handleImage(ctx.cdn, ctx.storage, path, filename, mimetype, { folder: 'galleries' })

  /** @type {import('../../../src/database/schema')._Gallery} */
  const d = {
    description,
    title,
    ...img,
  }
  if (id) {
    const res = await Gallery.updateOne({ _id: id }, d)
    return res._doc
  } else {
    const c = new Gallery(d)
    const res = await c.save()
    return res._doc
  }
}

export default galleries