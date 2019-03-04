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
    title, galleryId, photos: p,
  } = ctx.req.body

  if (!Array.isArray(p) || !p.length) {
    throw new Error('Не добавлено новых файлов.')
  }

  await Promise.all(p.map(async photo => {
    /** @type {import('../../../src/database/schema')._Photo} */
    const d = {
      title,
      galleryId,
      photo,
    }

    const doc = await database.addObject('Photo', d)
    return doc._id
  }))
  return p
}

export default photos