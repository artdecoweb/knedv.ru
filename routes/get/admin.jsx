import AdminLayout from '../../src/AdminLayout'
import App from '../../frontend-admin/App'

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  if (!ctx.session.admin) {
    const app = <div>
      <a href="/auth/mailru">Войти</a>
    </div>
    ctx.body = AdminLayout({
      title: 'Вход',
      App: app,
    })
    return
  }
  ctx.body = AdminLayout({
    App: <App/>,
    title: 'Главная',
    loggedIn: 1,
  })
}
export default route

export const aliases = [
  '/admin/categories',
  '/admin/add-category', '/admin/add-category/:id*',
]

export const middleware = r => ['session', r]