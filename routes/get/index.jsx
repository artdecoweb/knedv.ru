import Layout from '../../src/Layout'
import App from '../../frontend/App'

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const app = <App activeMenu="index"/>
  ctx.body = Layout({
    title: 'Корпорация Недвижимости',
    App: app,
  })
}
export default route

export const aliases = ['/']