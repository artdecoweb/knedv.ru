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
  /** Whether the listing is paused. */
  hidden: Boolean,
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
  name: String,
  galleryId: String, // can be gallery or album
  file: String, // the s preview (dep)
  photo: String, // the id of the Upload (dep)
  upload: String, // the id of the Upload
  description: String, // ?
  cdnImageS: String,
  cdnImageM: String,
  width: Number, height: Number,
}
/**
 * Some extracted metadata (name and date) from JPEGS with locations of uploaded files in M and S sizes.
 */
export const _Upload = {
  model: String,
  date: Date,
  imgM: CDNImage,
  imgS: CDNImage,
  name: String,
  cdnImageS: String,
  cdnImageM: String,
  width: Number,
  height: Number,
}
export const Category = new Schema(_Category)
export const Object = new Schema(_Object)
export const Page = new Schema(_Page)
export const Special = new Schema(_Special)
export const Gallery = new Schema(_Gallery)
export const Photo = new Schema(_Photo)
export const Upload = new Schema(_Upload)