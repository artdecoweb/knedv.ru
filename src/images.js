import { createBlobService } from 'azure-storage'
import sharp from 'sharp'

export const resize = async (path, size) => {
  const res = await sharp(path).rotate()
    .withoutEnlargement().resize(size)
    .jpeg({ quality: 90 }).toBuffer()
  return res
}

const mimes = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
}
export const checkExtension = (mimetype) => {
  const mime = mimes[mimetype]
  if (!mime) throw new Error('Image type not supported')
  return mime
}

const getUrl = (storage, container, blob) => {
  return [
    'https://',
    storage,
    '.blob.core.windows.net/',
    container, '/', blob,
  ].join('')
}
export const uploadFile = async ({
  contentType,
  filename,
  container,
  blob,
  storage,
}) => {
  const blobService = createBlobService()
  const res = await new Promise((r, j) => {
    blobService.createBlockBlobFromLocalFile(container, blob, filename, {
      contentSettings: {
        contentType,
      },
    }, (err) => {
      if (err) return j(err)
      r(getUrl(storage, container, blob))
    })
  })
  return res
}

export const file = async ({
  contentType,
  text,
  container,
  blob,
  storage,
}) => {
  const blobService = createBlobService()
  const res = await new Promise((r, j) => {
    blobService.createBlockBlobFromText(container, blob, text, {
      contentSettings: {
        contentType,
      },
    }, (err) => {
      if (err) return j(err)
      r(getUrl(storage, container, blob))
    })
  })
  return res
}