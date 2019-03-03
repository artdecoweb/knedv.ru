import { Readable } from 'stream'
import { handleImage } from '../../src/lib'

/**
 * @type {import('koa').Middleware}
 */
const uploadAsset = async (ctx) => {
  const { file: {
    mimetype, path, filename,
  } = {} } = ctx.req
  ctx.body = new Readable({
    read() {},
  })
  fn({ ctx, path, filename, mimetype })
}

const fn = async ({ ctx, path, filename, mimetype }) => {
  const { cdnImage: m, buffer } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-m`, mimetype, { folder: 'upload', resize: 1000 })
  ctx.body.push(`resized large: ${m}`)
  const { cdnImage: s } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-s`, mimetype, { folder: 'upload', resize: 500, buffer })
  ctx.body.push(`resized small: ${s}`)
  ctx.body.push(null)
}

export default uploadAsset

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', r,
]