import idio from '@idio/core'
import initRoutes, { watchRoutes } from '@idio/router'
import frontend from '@idio/frontend'
import mailru from '@idio/mailru'
import { b } from 'erte'
import Database from './database'

const PROD = process.env.NODE_ENV == 'production'
const FRONT_END = process.env.FRONT_END || 'https://knedv.ru'

export default async ({
  port, watch = !PROD, database_url, storage, storageDomain,
  client_id, client_secret, cdn,
}) => {
  const { router, middleware, app, url } = await idio({
    cors: { use: true,
      origin: PROD && [FRONT_END],
      config: { credentials: true } },
    compress: { use: true },
    static: { use: true, root: 'static', config: {
      maxage: PROD ? 1000 * 60 * 60 * 60 * 24 : 0,
    } },
    ...(!PROD ? {
      frontend: {
        use: true,
        middlewareConstructor: (_, conf) => frontend(conf),
      },
      frontendAdmin: {
        use: true,
        middlewareConstructor: (_, conf) => frontend(conf),
        config: { directory: 'frontend-admin' },
      },
    } : {}),
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {},
    multer: { config: {
      dest: 'upload',
    } },
    checkAdmin: {
      middlewareConstructor() {
        return async (ctx, next) => {
          if (!ctx.session.admin) {
            ctx.body = 'Доступ запрещен.'
          } else {
            await next()
          }
        }
      },
    },
    multerSingle: {
      middlewareConstructor() {
        return async (...args) => {
          const mw = middleware.multer.single('image')
          await mw(...args)
        }
      },
    },
    ajaxAdmin: {
      middlewareConstructor() {
        return async (ctx, next) => {
          try {
            const data = await next(ctx)
            ctx.body = { data }
          } catch({ message: error }) {
            ctx.status = 500
            ctx.body = { error }
          }
        }
      },
    },
  }, { port })
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) watchRoutes(w)
  mailru(router, {
    client_id,
    client_secret,
    session: middleware.session,
    async finish(ctx, token, user) {
      const [{ email }] = user
      if (!process.env.ADMIN_EMAIL) {
        ctx.status = 500
        ctx.body = 'Server is not configured: ADMIN_EMAIL is missing.'
        return
      }
      if (email != process.env.ADMIN_EMAIL) {
        ctx.status = 500
        ctx.body = 'Неверный e-mail. Убедитесь, что Вы входите с почтового ящика компании, а не собственного.'
        return
      }
      ctx.session.admin = 1
      ctx.redirect('/admin')
    },
  })
  app.use(router.routes())
  const database = new Database()
  await database.connect(database_url)
  Object.assign(app.context, { database, storage, storageDomain, cdn })
  console.log('Connected to %s', b('Mongo', 'green'))
  return { app, url }
}