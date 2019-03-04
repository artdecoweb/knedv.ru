import { Readable } from 'stream'
import { handleImage } from '../../src/lib'

/**
 * @type {import('koa').Middleware}
 */
const uploadAsset = async (ctx) => {
  const { name } = ctx.req.body
  const { file: {
    mimetype, path, filename,
  } = {} } = ctx.req
  ctx.type = 'application/json'
  // ctx.body = new Readable({
  //   read() {},
  // })
  try {
    await fn({ ctx, path, filename, mimetype, name })
  } catch(err) {
    this.body = { error: err.message }
  }
  // .catch((err) => {
  //   ctx.body.push(JSON.stringify({ error: err.message }))
  //   ctx.body.push(null)
  // })
}

const communicate = (ctx, obj) => {
  ctx.body.push(JSON.stringify(obj))
}

const fn = async ({ ctx, path, filename, mimetype, name }) => {
  const { exiftool, database } = ctx
  const { data: [metadata] } = await exiftool.readMetadata(path)
  // communicate(ctx, { metadata })
  const { Model, DateTimeOriginal }  = metadata

  const { buffer, ...cdnImgM } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-m`, mimetype, { folder: 'upload', resize: 1000 })
  const cdnImageM = cdnImgM.cdnImage
  // communicate(ctx, { previewM: cdnImageM })

  const { buffer: b, ...cdnImgS } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-s`, mimetype, { folder: 'upload', resize: 500, buffer })
  const cdnImageS = cdnImgS.cdnImage
  // communicate(ctx, { previewS: cdnImageS })

  // save in the database

  const data = {
    name,
    model: Model,
    ...(DateTimeOriginal ? { date: getDate(DateTimeOriginal) } : {}),
    imgS: cdnImgS,
    imgM: cdnImgM,
    cdnImageS,
    cdnImageM,
  }
  const photo = await database.addObject('Upload', data)
  ctx.body = { result: cdnImageS }
  // communicate(ctx, { photo_id: 'ASSIGN THE ID HERE' })
  // ctx.body.push(null)
}

// Sudhir Bastakoti
// https://stackoverflow.com/a/43084142/1267201
const getDate = (s) => {
  const [date, time] = s.split(' ')
  const dateStr = date.replace(/:/g, "-")
  const properDateStr = dateStr + ' ' + time
  const d = new Date(properDateStr)
  return d
}

export default uploadAsset

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', r,
]