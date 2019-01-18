import { c } from 'erte'
import Server from './server'

(async () => {
  const { url } = await Server({
    port: process.env.PORT,
    client_id: process.env.LINKEDIN_ID,
    client_secret: process.env.LINKEDIN_SECRET,
  })
  console.log('Started on %s', c(url, 'green'))
})()