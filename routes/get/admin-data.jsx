/** @type {import('koa').Middleware} */
const getData = async (ctx) => {
  /** @type {import('../../src/database').default} */
  const database = ctx.database
  if ('categories' in ctx.query) {
    const c = await findInModel(database, 'Category', ctx.query.id)
    return c
  } else if ('objects' in ctx.query) {
    const catModel = database.getModel('Category')
    const categories = await catModel.find()
    const model = database.getModel('Object')
    const objects = await model.find({
      ...(ctx.query.id ? { _id: ctx.query.id }: {}),
    })
    const mo = objects.map(({ _doc }) => {
      const cat = categories.find(({ id }) => _doc.category == id)
      if (!cat) return _doc
      return { ..._doc, categorySeo: cat.seo }
    })
    return mo
  } else if ('pages' in ctx.query) {
    const p = await findInModel(database, 'Page', ctx.query.id)
    return p
  } else if ('specials' in ctx.query) {
    const o = await findInModel(database, 'Special', ctx.query.id)
    return o
  } else if ('galleries' in ctx.query) {
    const g = await findInModel(database, 'Gallery', ctx.query.id)
    return g
  } else {
    return { error: 'unknown path' }
  }
}

const findInModel = async (database, modelName, id) => {
  const model = database.getModel(modelName)
  const objects = await model.find({
    ...(id ? { _id: id }: {}),
  })
  return objects.map(({ _doc }) => _doc)
}

export const middleware = r => ['session', 'checkAdmin', 'ajaxAdmin', r]

export default getData