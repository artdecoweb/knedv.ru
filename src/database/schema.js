import { Schema } from 'mongoose'

export const Category = new Schema({
  title: String,
  seo: String,
  description: String,
})