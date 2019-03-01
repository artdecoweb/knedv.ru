import { Schema } from 'mongoose'

const Img = {
  image: String,
  imageLocation: String,
  imageContainer: String,
  cdnImage: String,
}

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
export const Category = new Schema(_Category)
export const Obj = new Schema(_Object)
export const Page = new Schema(_Page)
export const Special = new Schema(_Special)
export const Gallery = new Schema(_Gallery)