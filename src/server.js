import idio from '@idio/idio'
import initRoutes, { watchRoutes } from '@idio/router'
import mailru from '@idio/mailru'
import logarithm from 'logarithm'
import { collect } from 'catchment'

const maxage = PROD => PROD ? 1000 * 60 * 60 * 60 * 24 : 0

/**
 * Starts the server.
 * @param {ServerOptions} opts The options accepted by the server.
 * @param {number} [opts.port=5000] What port to start on. Default `5000`.
 * @param {boolean} [opts.PROD=false] Whether this is a production server. Default `false`.
 * @param {boolean} [opts.watch=true] Watch routes for changes. Default `true`.
 * @param {string} opts.database_url The MongoDB connection string.
 * @param {string} opts.client_id The Mail.ru app id for admin authentication. Add new at https://api.mail.ru/sites/my/add.
 * @param {string} opts.client_secret The Mail.ru app secrte for admin authentication.
 * @param {string} [opts.elastic] The URL of the ElasticSearch for logging the requests.
 * @param {ExiftoolProcess} [opts.exiftool] The open Exiftool process.
 */
export default async (opts) => {
  const {
    port = 5000, PROD, watch = !PROD, storage, storageDomain,
    client_id, client_secret, cdn, frontendUrl, exiftool, elastic,
  } = opts
  const { router, middleware, app, url } = await idio({
    cors: { use: true,
      origin: PROD && [frontendUrl],
      credentials: true,
    },
    compress: { use: true },
    static: [{ use: true, root: 'static', maxage: maxage() },
      { use: true, root: 'build', maxage: maxage() },
      { use: true, root: 'node_modules/trumbowyg',
        mount: '/trumbowyg', maxage: maxage() },
      { use: true, root: 'node_modules/preact/dist',
        mount: '/preact', maxage: maxage() },
    ],
    frontend: {
      use: !PROD,
      directory: ['frontend', 'frontend-admin'],
    },
    session: { keys: [process.env.SESSION_KEY] },
    bodyparser: {
      middlewareConstructor() {
        return async (ctx, next) => {
          const data = await collect(ctx.req)
          ctx.req.body = JSON.parse(data)
          await next()
        }
      },
    },
    form: { dest: 'upload' },
    logarithm: {
      middlewareConstructor() {
        const l = logarithm({
          app: 'knedv.ru',
          url: elastic,
        })
        return l
      },
      use: true,
    },
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
          const mw = middleware.form.single('image')
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
          } catch({ message: error, stack }) {
            ctx.status = 500
            ctx.body = { error, stack }
          }
        }
      },
    },
  }, { port })
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  if (watch) await watchRoutes(w)
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
  Object.assign(app.context, {
    storage, storageDomain, cdn,
    PROD: PROD || process.env.NODE_ENV == 'emulate-prod',
    exiftool,
  })
  // START FRONTEND TBH
  return { app, url, addContext(item) {
    console.log('> Adding App Context %s', Object.keys(item).join(' '))
    Object.assign(app.context, item)
  } }
}

/* documentary types/index.xml */
/**
 * @typedef {import('node-exiftool').ExiftoolProcess} ExiftoolProcess
 *
 * @typedef {Object} ServerOptions The options accepted by the server.
 * @prop {number} [port=5000] What port to start on. Default `5000`.
 * @prop {boolean} [PROD=false] Whether this is a production server. Default `false`.
 * @prop {boolean} [watch=true] Watch routes for changes. Default `true`.
 * @prop {string} database_url The MongoDB connection string.
 * @prop {string} client_id The Mail.ru app id for admin authentication. Add new at https://api.mail.ru/sites/my/add.
 * @prop {string} client_secret The Mail.ru app secrte for admin authentication.
 * @prop {string} [elastic] The URL of the ElasticSearch for logging the requests.
 * @prop {ExiftoolProcess} [exiftool] The open Exiftool process.
 */
