/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  debugger
  ctx.body = 'test'
}
export default route

export const aliases = ['/t']