/** @type {import('koa').Middleware} */
const route = (ctx) => {
  ctx.session.admin = null
  ctx.redirect('/admin')
}
export default route

export const middleware = ['session']