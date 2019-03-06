// import { Readable } from 'stream'
// ctx.body = new Readable({
//   read() {},
// })
// .catch((err) => {
//   ctx.body.push(JSON.stringify({ error: err.message }))
//   ctx.body.push(null)
// })
// const communicate = (ctx, obj) => {
//   ctx.body.push(JSON.stringify(obj))
// }
// communicate(ctx, { previewM: cdnImageM })
// communicate(ctx, { previewS: cdnImageS })
// communicate(ctx, { metadata })
// communicate(ctx, { photo_id: 'ASSIGN THE ID HERE' })
// ctx.body.push(null)

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
  try {
    await fn({ ctx, path, filename, mimetype, name })
  } catch(err) {
    this.body = { error: err.message }
  }
}

const fn = async ({ ctx, path, filename, mimetype, name }) => {
  const { database } = ctx
  /** @type {ExiftoolProcess} */
  const exiftool = ctx.exiftool
  const { data: [metadata] } = await exiftool.readMetadata(path)
  const { Model, DateTimeOriginal, ImageWidth, ImageHeight, Orientation }  = metadata

  const width = Orientation >= 5 ? ImageWidth : ImageHeight
  const height = Orientation >= 5 ? ImageHeight : ImageWidth

  // add metadata
  const exifdata = {
    all: '',
    CopyrightOwnerName: `knedv.ru`,
    CopyrightYear: new Date().getFullYear(),
    Creator: 'Корпорация Недвижимости 21 Век',
    Comment: '+7 (495) 749-29-15',
  }
  await exiftool.writeMetadata(path, exifdata, ['overwrite_original'])

  const { buffer, ...cdnImgM } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-m`, mimetype, { folder: 'upload', resize: 1000 })
  const cdnImageM = cdnImgM.cdnImage

  const { buffer: b, ...cdnImgS } = await handleImage(ctx.cdn, ctx.storage, path, `${filename}-s`, mimetype, { folder: 'upload', resize: 500, buffer })
  const cdnImageS = cdnImgS.cdnImage

  const data = {
    name,
    model: Model,
    ...(DateTimeOriginal ? { date: getDate(DateTimeOriginal) } : {}),
    imgS: cdnImgS,
    imgM: cdnImgM,
    cdnImageS,
    cdnImageM,
    width,
    height,
  }
  const photo = await database.addObject('Upload', data)
  ctx.body = { file: cdnImageM, result: cdnImageS, success: 1, photoId: photo._id }
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