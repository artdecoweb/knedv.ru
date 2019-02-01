import { Schema } from 'mongoose'

export const _Category = {
  title: String,
  seo: String,
  description: String,
  image: String,
  imageLocation: String,
  imageContainer: String,
  cdnImage: String,
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
}
export const Category = new Schema(_Category)
export const Obj = new Schema(_Object)