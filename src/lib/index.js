/**
 * Returns the lower-case SEO string or throws an error.
 * @param {string} seo
 */
export const getSeo = (seo) => {
  const s = seo.toLowerCase()
  const [m] = /[^a-zа-я0-9-_]/.exec(s) || []
  if (m) throw new Error(`СЕО содержит недопустимый символ: "${m}"`)
  return s
}