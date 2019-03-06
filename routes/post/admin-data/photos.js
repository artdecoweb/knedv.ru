import { findInModel } from '../../get/admin-data'

/**
 * This route assigns the upload ids to a new Photograph, when saving the form that has Photo Uploader.
 * @param {import('koa').Context} ctx
 * @param {import('../../../src/database').default} database
 */
const photos = async (ctx, database) => {
  if ('delete' in ctx.query && ctx.query.id) {
    await database.deleteById('Photo', ctx.query.id)
  }
  const {
    title, galleryId, photos: uploads,
  } = ctx.req.body

  if (!Array.isArray(uploads) || !uploads.length) {
    throw new Error('Не добавлено новых файлов.')
  }

  const realUploads = await findInModel(database, 'Upload', uploads)
  const ids = await Promise.all(realUploads.map(async ({ name, _id, cdnImageS, cdnImageM, width, height }) => {
    /** @type {import('../../../src/database/schema')._Photo} */
    const d = {
      name,
      title,
      galleryId,
      upload: _id,
      cdnImageS,
      cdnImageM,
      width, height,
    }
    await database.addObject('Photo', d)
    return _id
  }))
  return ids
}

export default photos