export {}
/**
 * @typedef {import('@goa/koa').Context & { database: Database, session: { admin: boolean } }} Context
 * @typedef {(ctx: Context, next: !Function)} Middleware
 */

/**
 * @typedef {import('./src/database').default} Database
 */