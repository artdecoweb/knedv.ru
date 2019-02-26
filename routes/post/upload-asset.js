import { handleImage } from '../../src/lib'

/**
 * @type {import('koa').Middleware}
 */
const uploadAsset = async (ctx) => {
  const { file: {
    mimetype, path, filename,
  } = {} } = ctx.req
  const { cdnImage } = await handleImage(ctx.cdn, ctx.storage, path, filename, mimetype, { folder: 'upload', resize: 1000 })
  ctx.body = {
    success: true,
    file: cdnImage,
  }
}

export default uploadAsset

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', r,
]