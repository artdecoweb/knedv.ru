import shortid from 'shortid'
import { handleImage } from './lib'

export const processPhoto = async (exiftool, path, {
  cdn, storage, filename = shortid.generate(), name, blobService,
}) => {
  const { data: [metadata] } = await exiftool.readMetadata(path, ['ImageWidth', 'ImageHeight', 'Model', 'DateTimeOriginal', 'Orientation#', 'MIMEType', 'FileTypeExtension'])

  const { Model, DateTimeOriginal, ImageWidth, ImageHeight, Orientation, MIMEType, FileTypeExtension: filetype }  = metadata

  const width = Orientation >= 5 ? ImageWidth : ImageHeight
  const height = Orientation >= 5 ? ImageHeight : ImageWidth

  // add metadata
  const exifdata = {
    all: '',
    'Orientation#': Orientation,
    CopyrightOwnerName: `knedv.ru`,
    CopyrightYear: new Date().getFullYear(),
    Creator: 'Корпорация Недвижимости 21 Век',
    Comment: '+7 (495) 749-29-15',
  }

  await exiftool.writeMetadata(path, exifdata, ['overwrite_original'])

  const { buffer, ...cdnImgM } = await handleImage(cdn, storage, path, `${filename}-m`, MIMEType, { folder: 'upload', resize: 1000, blobService, filetype })
  const cdnImageM = cdnImgM.cdnImage

  const { buffer: b, ...cdnImgS } = await handleImage(cdn, storage, path, `${filename}-s`, MIMEType, { folder: 'upload', resize: 500, buffer, blobService, filetype })
  const cdnImageS = cdnImgS.cdnImage

  const data = {
    name,
    model: Model,
    ...(DateTimeOriginal ? { date: getDate(DateTimeOriginal) } : {}),
    imgS: cdnImgS,
    imgM: cdnImgM,
    cdnImageS,
    cdnImageM,
    width,
    height,
  }

  return data
}

// Sudhir Bastakoti
// https://stackoverflow.com/a/43084142/1267201
const getDate = (s) => {
  const [date, time] = s.split(' ')
  const dateStr = date.replace(/:/g, "-")
  const properDateStr = dateStr + ' ' + time
  const d = new Date(properDateStr)
  return d
}