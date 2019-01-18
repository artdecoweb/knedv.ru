/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  ctx.body = 'hello world'
}
export default route

// export const aliases = ['/']