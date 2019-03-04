import { Schema } from 'mongoose'

const Img = {
  image: String,
  imageLocation: String,
  imageContainer: String,
  cdnImage: String,
}
const CDNImage = new Schema(Img)

export const _Category = {
  title: String,
  seo: String,
  description: String,
  image: String,
  imageLocation: String,
  imageContainer: String,
  cdnImage: String,
  article: String,
}
export const _Object = {
  title: String,
  seo: String,
  description: String,
  /** The price of the object. */
  price: String,
  image: String,
  imageLocation: String,
  imageContainer: String,
  cdnImage: String,
  category: String,
  article: String,
}
export const _Page = {
  seo: String,
  article: String,
  title: String,
  description: String,
}
export const _Special = {
  seo: String,
  article: String,
  title: String,
  description: String,
  href: String,
  price: String,
  show_on_main: String,
  ...Img,
}
export const _Gallery = {
  seo: String,
  article: String,
  title: String,
  description: String,
  href: String,
  show_on_main: String,
  ...Img,
}
export const _Photo = {
  seo: String,
  article: String,
  galleryId: String,
  file: String,
  description: String,
  href: String,
  show_on_main: String,
  ...Img,
}
export const _Upload = {
  model: String,
  date: Date,
  imgM: CDNImage,
  imgS: CDNImage,
  name: String,
  cdnImageS: String,
  cdnImageM: String,
}
export const Category = new Schema(_Category)
export const Object = new Schema(_Object)
export const Page = new Schema(_Page)
export const Special = new Schema(_Special)
export const Gallery = new Schema(_Gallery)
export const Photo = new Schema(_Photo)
export const Upload = new Schema(_Upload)