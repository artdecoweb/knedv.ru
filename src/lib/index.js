import { resize, file, checkExtension } from '../images'

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

/**
 * @param {string} cdn The CDN config.
 * @param {string} storage The Storage config.
 * @param {string} path The path to the uploaded file.
 * @param {string} seo The name of how to save the file.
 * @param {string} mimetype The mimetype.
 */
export const handleImage = async (cdn, storage, path, seo, mimetype, { folder = 'catalog', resize: r = 250, buffer, blobService, filetype = 'jpg', imageContainer = 'images' } = {}) => {
  if (!(path || buffer)) {
    return {}
  }
  checkExtension(mimetype)
  buffer = buffer ? await resize(buffer, r) : await resize(path, r)
  const blob = `${folder}/${seo}.${filetype}`
  const image = await file({
    storage,
    blob,
    blobService,
    text: buffer,
    container: imageContainer,
    contentType: mimetype,
  })
  const imageLocation = `${imageContainer}/${blob}`
  const cdnImage = `${cdn}/${imageLocation}`
  return { imageContainer, image, imageLocation, cdnImage, buffer }
}