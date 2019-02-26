import objects from './admin-data/objects'
import categories from './admin-data/categories'
import pages from './admin-data/pages'
import specials from './admin-data/specials'

/** @type {import('koa').Middleware} */
const postData = async (ctx) => {
  const database = ctx.database
  if ('categories' in ctx.query) {
    return await categories(ctx, database)
  }
  if ('objects' in ctx.query) {
    return await objects(ctx, database)
  }
  if ('pages' in ctx.query) {
    return await pages(ctx, database)
  }
  if ('specials' in ctx.query) {
    return await specials(ctx, database)
  }
}

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', 'ajaxAdmin', r,
]

export default postData