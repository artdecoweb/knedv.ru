import objects from './admin-data/objects'
import categories from './admin-data/categories'
import pages from './admin-data/pages'
import specials from './admin-data/specials'
import galleries from './admin-data/galleries'
import photos from './admin-data/photos'

const fns = {
  categories,
  objects,
  pages,
  specials,
  galleries,
  photos,
}

/** @type {import('koa').Middleware} */
const postData = async (ctx) => {
  const database = ctx.database
  const key = Object.keys(fns).find(k => {
    return k in ctx.query
  })
  const fn = fns[key]
  if (!fn) throw new Error('Unknown path.')
  const res = await fn(ctx, database)
  return res
}

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', 'ajaxAdmin', r,
]

export default postData