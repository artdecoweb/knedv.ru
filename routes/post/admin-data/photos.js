/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const photos = async (ctx, database) => {
  const Photo = database.getModel('Photo')
  if ('delete' in ctx.query && ctx.query.id) {
    await Photo.deleteOne({ _id: ctx.query.id })
    return ctx.query.id
  }
  const {
    title, galleryId, files,
  } = ctx.req.body

  const r = await Promise.all(files.map(async file => {
    /** @type {import('../../../src/database/schema')._Photo} */
    const d = {
      title,
      galleryId,
      file,
    }

    const c = new Photo(d)
    const res = await c.save()
    return res._doc
  }))
  return r
}

export default photos