import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import frontend from '@idio/frontend'

const PROD = process.env.NODE_ENV == 'production'
const FRONT_END = process.env.FRONT_END || 'https://knedv.ru'

export default async ({
  port, watch = !PROD,
}) => {
  const { router, middleware, app, url } = await idio({
    cors: { use: true,
      origin: PROD && [FRONT_END],
      config: { credentials: true } },
    compress: { use: true },
    static: { use: true, root: 'static', config: {
      maxage: PROD ? 1000 * 60 * 60 * 60 * 24 : 0,
    } },
    ...(!PROD ? { frontend: {
      use: true,
      middlewareConstructor: (_, conf) => frontend(conf),
    } } : {}),
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
  }, { port })
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) watchRoutes(w)
  app.use(router.routes())
  return { app, url }
}