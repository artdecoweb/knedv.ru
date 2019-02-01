/** @type {import('koa').Middleware} */
const getData = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  if ('categories' in ctx.query) {
    const model = database.getModel('Category')
    const categories = await model.find()
    return categories
  } else {
    return { error: 'unknown path' }
  }
}

export const middleware = r => ['session', 'checkAdmin', async (ctx) => {
  try {
    const data = await r(ctx)
    ctx.body = { data }
  } catch({ message: error }) {
    ctx.status = 500
    ctx.body = { error }
  }
}]

export default getData