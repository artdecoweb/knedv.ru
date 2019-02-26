import { c } from 'erte'
import Server from './server'

(async () => {
  const { MONGO_URL, STORAGE } = process.env
  if (!MONGO_URL) {
    console.log('No Mongo connection string.')
    process.exit(1)
  }
  if (!STORAGE) {
    console.log('Azure Storage name not provided.')
    process.exit(1)
  }
  const { url } = await Server({
    port: process.env.PORT,
    client_id: process.env.APP_ID,
    client_secret: process.env.SECRET_KEY,
    database_url: MONGO_URL,
    storage: STORAGE,
    storageDomain: process.env.STORAGE_DOMAIN,
    cdn: process.env.CDN_ENDPOINT,
    PROD: process.env.NODE_ENV == 'production',
    frontendUrl: process.env.FRONT_END || 'https://knedv.ru',
    elastic: process.env.ELASTIC_SEARCH,
  })
  console.log('Started on %s', c(url, 'green'))
})()