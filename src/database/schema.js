import { Schema } from 'mongoose'

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
export const Category = new Schema(_Category)
export const Obj = new Schema(_Object)
export const Page = new Schema(_Page)