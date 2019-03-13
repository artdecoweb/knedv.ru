import { ExiftoolProcess } from 'node-exiftool'
import exiftool from 'dist-exiftool'
import { Parse, getBoundary } from 'parse-multipart'
import { MongoClient } from 'mongodb'
import { createBlobServiceWithSas } from 'azure-storage'
import { write } from '@wrote/wrote'
import { stringify } from 'querystring'
import { processPhoto } from '../src/upload'

const { 'MONGO_URL': MONGO_URL } = process.env

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

    const [part] = parts
    if (!part) throw new Error('File not found')
    const path = `upload/data`
    await write(path, part)
    const ep = new ExiftoolProcess(exiftool)
    await ep.open()

    const blobService = await createBlobServiceWithSas(`https://${storage}.blob.core.windows.net`, token)

    const data = await processPhoto(exiftool, path, {
      storage: 'knedv',
      cdn: 'https://knedv.azureedge.net',
      name,
      blobService,
    })

    let client
    try {
      client = new MongoClient(MONGO_URL)
      const res = MONGO_URL.replace('/')
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