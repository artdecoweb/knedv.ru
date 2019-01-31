/** @type {import('koa').Middleware} */
const data = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  if ('categories' in ctx.query) {
    const model = database.getModel('Category')
    console.log(ctx.req.body)
    await new Promise(r => setTimeout(r, 5000))
    // await model.
  }
  ctx.body = ['test']
}

export const middleware = r => ['session', 'checkAdmin', 'multerSingle', r]

export default data