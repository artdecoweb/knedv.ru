import { Schema } from 'mongoose'

export const _Category = {
  title: String,
  seo: String,
  description: String,
  image: String,
  imageCdn: String,
}
export const Category = new Schema(_Category)