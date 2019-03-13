import { ExiftoolProcess } from 'node-exiftool'
import exiftool from 'dist-exiftool'
import { Parse, getBoundary } from 'parse-multipart'
import { MongoClient } from 'mongodb'
import { createBlobServiceWithSas } from 'azure-storage'
import { write } from '@wrote/wrote'
import { stringify } from 'querystring'

export default async function (context, req) {
  const { st, se, sp, sv, sr, sig, container, storage, name } = req.query
  const token = stringify({ st, se, sp, sv, sr, sig })

  if (req.method == 'GET') {
    if (req.body) req.body = req.body.slice(0, 100)
    if (req.rawBody) req.rawBody = req.rawBody.slice(0, 100)
    const body = JSON.stringify(req, null, 2)
    return body
  } else if (req.method == 'POST') {
    const { 'content-type': contentType } = context.req.headers
    if (!contentType.startsWith('multipart/form-data')) {
      throw new Error('Not multipart')
    }
    const boundary = getBoundary(contentType)
    if (!boundary) {
      throw new Error('No boundary')
    }
    const parts = Parse(req.body, boundary)
    //  { body: JSON.stringify({
    //   parts,
    //   boundary,
    //   data: req.rawBody.slice(0, 100),
    // }, null, 2), type: 'application/json' }
    const [part] = parts
    if (!part) throw new Error('File not found')
    const path = await write('upload.data', part)
    const ep = new ExiftoolProcess(exiftool)
    await ep.open()
    const { data: [metadata], error } = await exiftool.readMetadata(path, ['ImageWidth', 'ImageHeight', 'Model', 'DateTimeOriginal', 'Orientation#'])
    const { Model, DateTimeOriginal, ImageWidth, ImageHeight, Orientation }  = metadata
    if (error) throw error
    const width = Orientation >= 5 ? ImageWidth : ImageHeight
    const height = Orientation >= 5 ? ImageHeight : ImageWidth

    // add metadata
    const exifdata = {
      all: '',
      'Orientation#': Orientation,
      CopyrightOwnerName: `knedv.ru`,
      CopyrightYear: new Date().getFullYear(),
      Creator: 'Корпорация Недвижимости 21 Век',
      Comment: '+7 (495) 749-29-15',
    }
    await exiftool.writeMetadata(path, exifdata, ['overwrite_original'])
    await ep.close()

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

    const blobService = await createBlobServiceWithSas(`https://${storage}.blob.core.windows.net`, token)

    let client
    try {
      client = new MongoClient(process.env.MONGO_URL)
      const res = process.env.MONGO_URL.replace('/')
      const dbName = res[res.length - 1]
      await client.connect()
      const db = client.db(dbName)
      const collection = db.collection('uploads')
      const insertRes = await collection.insertOne({ a : 1 })
    } finally {
      await client.close()
    }

    return { body }
  }
}