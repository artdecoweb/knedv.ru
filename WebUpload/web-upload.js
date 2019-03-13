import { ExiftoolProcess } from 'node-exiftool'
import exiftool from 'dist-exiftool'
import { Parse, getBoundary } from 'parse-multipart'
import { MongoClient } from 'mongodb'
import { createBlobServiceWithSas } from 'azure-storage'
import { write, rm, ensurePath } from '@wrote/wrote'
import { stringify } from 'querystring'
import { join } from 'path'
import { processPhoto } from '../src/upload'

const {
  'MONGO_URL': MONGO_URL,
  'CDN': CDN = 'https://knedv.azureedge.net',
  'STORAGE': STORAGE = 'knedv',
} = process.env

export default async function (context, req) {
  const { st, se, sp, sv, sr, sig, storage, name } = req.query
  const token = stringify({ st, se, sp, sv, sr, sig })

  if (req.method == 'GET') {
    if (req.body) req.body = req.body.slice(0, 100)
    if (req.rawBody) req.rawBody = req.rawBody.slice(0, 100)
    return req
  } else if (req.method == 'POST') {
    if (!storage) throw new Error('No storage.')
    const { 'content-type': contentType } = context.req.headers
    if (!contentType.startsWith('multipart/form-data')) {
      throw new Error('Not multipart')
    }
    const boundary = getBoundary(contentType)
    if (!boundary) {
      throw new Error('No boundary')
    }
    const parts = Parse(req.body, boundary)

    const [part] = parts
    if (!part) throw new Error('File not found')

    const ep = new ExiftoolProcess(exiftool)
    await ep.open()
    const blobService = createBlobServiceWithSas(`https://${storage}.blob.core.windows.net`, token)

    const path = join('upload', context.invocationId)
    await ensurePath(path)
    await write(path, part.data)

    let client
    try {
      const data = await processPhoto(ep, path, {
        storage: STORAGE,
        cdn: CDN,
        name,
        blobService,
        log: context.log,
      })

      client = new MongoClient(MONGO_URL, { useNewUrlParser: true })
      const res = MONGO_URL.split('/')
      const dbName = res[res.length - 1]
      await client.connect()
      const db = client.db(dbName)
      const collection = db.collection('uploads')
      const insertRes = await collection.insertOne(data)

      const [photo] = insertRes.ops
      if (!photo) throw new Error('Photo was not added')
      const d = {
        file: data.cdnImageM, // the file for editor upload
        result: data.cdnImageS, success: 1, photoId: photo._id }
      return d
    } finally {
      await Promise.all([
        ep.close(),
        client.close(),
        rm(path),
      ])
    }
  }
}