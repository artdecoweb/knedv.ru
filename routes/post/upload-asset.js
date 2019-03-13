import rm from '@wrote/rm'
import { processPhoto } from '../../src/upload'

/**
 * @type {import('koa').Middleware}
 */
const uploadAsset = async (ctx) => {
  const { name } = ctx.query
  const { file: { mimetype, path } = {} } = ctx.req
  ctx.type = 'application/json'
  try {
    await fn({ ctx, path, mimetype, name })
  } catch({ message: error }) {
    ctx.status = 500
    ctx.body = { error }
  } finally {
    await rm(path)
  }
}

const fn = async ({ ctx, path, mimetype, name }) => {
  const { database, cdn, storage } = ctx
  /** @type {ExiftoolProcess} */
  const exiftool = ctx.exiftool

  const data = await processPhoto(exiftool, path, {
    cdn, mimetype, storage, name,
  })
  const { cdnImageS, cdnImageM } = data
  const photo = await database.addObject('Upload', data)

  ctx.body = {
    file: cdnImageM, // the file for editor upload
    result: cdnImageS, success: 1, photoId: photo._id }
}

export default uploadAsset

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', r,
]