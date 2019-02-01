import { resize, file, checkExtension } from "../images";

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

export const handleImage = async (cdn, storage, path, seo, mimetype) => {
  if (!path) {
    return {}
  }
  checkExtension(mimetype)
  const buffer = await resize(path, 250)
  const blob = `catalog/${seo}.jpg`
  const imageContainer = 'images'
  const image = await file({
    storage,
    text: buffer,
    container: imageContainer,
    blob, contentType: 'image/jpeg',
  })
  const imageLocation = `${imageContainer}/${blob}`
  const cdnImage = `${cdn}/${imageLocation}`
  return { imageContainer, image, imageLocation, cdnImage }
}