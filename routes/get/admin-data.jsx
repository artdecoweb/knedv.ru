/** @type {import('koa').Middleware} */
const data = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  if ('categories' in ctx.query) {
    const model = database.getModel('Category')
    const categories = await model.find()
    console.log(categories)
    ctx.body = categories
  }
  ctx.body = ['test']
}

export default data