/** @type {import('koa').Middleware} */
const getData = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  if ('categories' in ctx.query) {
    const model = database.getModel('Category')
    const categories = await model.find({
      ...(ctx.query.id ? { _id: ctx.query.id }: {}),
    })
    return categories
  } else if ('objects' in ctx.query) {
    const catModel = database.getModel('Category')
    const categories = await catModel.find()
    const model = database.getModel('Object')
    const objects = await model.find({
      ...(ctx.query.id ? { _id: ctx.query.id }: {}),
    })
    const mo = objects.map(({ _doc }) => {
      const cat = categories.find(({ id }) => _doc.category == id)
      return { ..._doc, categorySeo: cat.seo }
    })
    return mo
  } else if ('pages' in ctx.query) {
    const model = database.getModel('Page')
    const objects = await model.find({
      ...(ctx.query.id ? { _id: ctx.query.id }: {}),
    })
    return objects.map(({ _doc }) => _doc)
  }else {
    return { error: 'unknown path' }
  }
}

export const middleware = r => ['session', 'checkAdmin', 'ajaxAdmin', r]

export default getData