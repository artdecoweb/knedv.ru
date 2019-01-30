import AdminLayout from '../../src/AdminLayout'

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
  const app = <div>Hello Admin</div>
  ctx.body = AdminLayout({
    title: 'Главная',
    App: app,
    loggedIn: 1,
  })
}
export default route

export const middleware = r => ['session', r]