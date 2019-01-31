import { c } from 'erte'
import Server from './server'

(async () => {
  const { MONGO_URL } = process.env
  if (!MONGO_URL) {
    console.log('No Mongo connection string.')
    process.exit(1)
  }
  const { url } = await Server({
    port: process.env.PORT,
    client_id: process.env.LINKEDIN_ID,
    client_secret: process.env.LINKEDIN_SECRET,
    database_url: MONGO_URL,
  })
  console.log('Started on %s', c(url, 'green'))
})()