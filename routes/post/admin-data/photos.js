import { findInModel } from '../../get/admin-data'

/**
 * This route assigns the upload ids to a new Photograph, when saving the form that has Photo Uploader.
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
    title, galleryId, photos: uploads,
  } = ctx.req.body

  if (!Array.isArray(uploads) || !uploads.length) {
    throw new Error('Не добавлено новых файлов.')
  }

  const realUploads = await findInModel(database, 'Upload', uploads)
  const ids = await Promise.all(realUploads.map(async upload => {
    /** @type {import('../../../src/database/schema')._Photo} */
    const d = {
      name: upload.name,
      title,
      galleryId,
      upload: upload._id,
      cdnImageS: upload.cdnImageS,
      cdnImageM: upload.cdnImageM,
    }
    await database.addObject('Photo', d)
    return upload._id
  }))
  return ids
}

export default photos