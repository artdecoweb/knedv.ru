import { resize, file } from '../../src/images';

const mimes = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
}
const getExtension = (mimetype) => {
  const mime = mimes[mimetype]
  if (!mime) throw new Error('Image type not supported')
  return mime
}

/**
 * @param {string} seo
 */
const getSeo = (seo) => {
  const s = seo.toLowerCase()
  const [m] = /[^a-zа-я0-9-_]/.exec(s) || []
  if (m) throw new Error(`СЕО содержит недопустимый символ: ${m}`)
  return s
}

/**
 * @param {import('koa').Context} ctx
 * @param {import('../../src/database').default} database
 */
const categories = async (ctx, database) => {
  const { description, title, seo: _seo } = ctx.req.body
  const { file: {
    mimetype, path,
  } = {} } = ctx.req
  const seo = getSeo(_seo)
  getExtension(mimetype)
  const buffer = await resize(path, 250)
  const blob = `catalog/${seo}.jpg`
  const thumb_url = await file({
    storage: ctx.storage,
    text: buffer,
    container: 'images', blob, contentType: 'image/jpeg',
  })
  /** @type {import('../../src/database/schema')._Category} */
  const d = {
    description,
    title,
    seo,
    image: thumb_url,
    imageLocation: blob,
    imageContainer: 'images',
    cdnImage: `${ctx.cdn}/${blob}`,
  }
  const Category = database.getModel('Category')
  const c = new Category(d)
  const res = await c.save()
  return res._doc
}

/** @type {import('koa').Middleware} */
const postData = async (ctx) => {
  const database = ctx.database
  if ('categories' in ctx.query) {
    return await categories(ctx, database)
  }
}

export const middleware = r => ['session', 'checkAdmin', 'multerSingle',
  async (ctx) => {
    try {
      const data = await r(ctx)
      ctx.body = { data }
    } catch({ message: error }) {
      ctx.status = 500
      ctx.body = { error }
    }
  },
]

export default postData