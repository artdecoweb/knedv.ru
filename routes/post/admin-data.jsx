import objects from './admin-data/objects'
import categories from './admin-data/objects'

/** @type {import('koa').Middleware} */
const postData = async (ctx) => {
  const database = ctx.database
  if ('categories' in ctx.query) {
    return await categories(ctx, database)
  }
  if ('objects' in ctx.query) {
    return await objects(ctx, database)
  }
}

export const middleware = r => [
  'session', 'checkAdmin', 'multerSingle', 'ajaxAdmin', r,
]

export default postData