import shortid from 'shortid'
// import spawn from 'spawncommand'
// import { resolve } from 'path'
import { handleImage } from './lib'

export const processPhoto = async (exiftool, path, {
  cdn, storage, filename = shortid.generate(), name, blobService, log,
}) => {
  let t2, t = new Date().getTime()
  // const p = spawn('perl', [resolve(__dirname, '../exiftool/exiftool'), path, '-j'])
  // await p.promise
  // t2 = new Date().getTime()
  // if (log) log(`Spawn metadata in ${-(t - t2)}ms`)

  t = new Date().getTime()
  const { data: [metadata] } = await exiftool.readMetadata(path, ['ImageWidth', 'ImageHeight', 'Model', 'DateTimeOriginal', 'Orientation#', 'MIMEType', 'FileTypeExtension'])
  t2 = new Date().getTime()
  if (log) log(`Read metadata in ${-(t - t2)}ms`)

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

  t = new Date().getTime()
  const { buffer, ...cdnImgM } = await handleImage(cdn, storage, path, `${filename}-m`, MIMEType, { folder: 'upload', resize: 1000, blobService, filetype })
  const cdnImageM = cdnImgM.cdnImage
  t2 = new Date().getTime()
  if (log) log(`Resized to ${1000} in ${-(t - t2)}ms`)

  t = new Date().getTime()
  const { buffer: b, ...cdnImgS } = await handleImage(cdn, storage, path, `${filename}-s`, MIMEType, { folder: 'upload', resize: 500, buffer, blobService, filetype })
  const cdnImageS = cdnImgS.cdnImage
  t2 = new Date().getTime()
  if (log) log(`Resized to ${500} in ${-(t - t2)}ms`)

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