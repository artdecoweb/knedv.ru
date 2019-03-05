import { c, b } from 'erte'
import { ExiftoolProcess } from 'node-exiftool'
import bin from 'dist-exiftool'
import { ping } from 'logarithm'
import Server from './server'
import Database from './database'

(async () => {
  const ep = new ExiftoolProcess(bin)
  const pid = await ep.open()
  console.log('Opened %s %s', c(b('exiftool', 'yellow'), 'red'), pid)
  const { MONGO_URL, STORAGE, ELASTIC_SEARCH: elastic } = process.env
  if (!MONGO_URL) {
    console.log('No Mongo connection string.')
    process.exit(1)
  }
  if (!STORAGE) {
    console.log('Azure Storage name not provided.')
    process.exit(1)
  }
  const { url, addContext } = await Server({
    port: process.env.PORT,
    client_id: process.env.APP_ID,
    client_secret: process.env.SECRET_KEY,
    storage: STORAGE,
    storageDomain: process.env.STORAGE_DOMAIN,
    cdn: process.env.CDN_ENDPOINT,
    PROD: process.env.NODE_ENV == 'production',
    frontendUrl: process.env.FRONT_END || 'https://knedv.ru',
    elastic,
    exiftool: ep,
  })
  console.log('Started on %s :: %s', c(url, 'green'), c(`${url}/admin`, 'blue'))

  // OK LETS GO

  const database = new Database()
  await database.connect(MONGO_URL)
  console.log('Connected to %s', b('Mongo', 'green'))
  addContext({ database })
  if (elastic) {
    await ping(elastic)
    console.log('Pinged %s', b(elastic, 'cyan'))
  }
})()