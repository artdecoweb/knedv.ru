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
  ctx.body = AdminLayout({
    PROD: ctx.PROD,
    title: 'Главная',
    loggedIn: 1,
  })
}
export default route

export const aliases = [
  '/admin/categories',
  '/admin/add-category', '/admin/add-category/:id*',
  '/admin/objects', '/admin/add-category', '/admin/add-object/:id*',
  '/admin/pages', '/admin/add-page', '/admin/add-page/:id*',
  '/admin/special', '/admin/galleries', '/admin/galleries/:id*',
  '/admin/albums/:id*',
]

export const middleware = ['session']