import mongoose from 'mongoose'
import { Category, Obj, Page } from './schema'

function setupModels(connection, models) {
  Object.keys(models).forEach((key) => {
    const schema = models[key]
    connection.model(key, schema)
  })
}

export default class Database {
  /**
   * Create new database instance.
   */
  constructor() {
    this._models = {
      Category,
      Object: Obj,
      Page: Page,
    }
  }
  /**
   * Connect to the database.
   * @param {string} uri the url of the database to connect to
   */
  async connect(uri) {
    await mongoose.connect(uri)
    setupModels(mongoose.connection, this._models)
  }
  /**
   * Disconnect from the database.
   * @throws {Error} An error if connection was not open
   */
  async disconnect() {
    await mongoose.connection.close()
  }
  /**
   * Return a model for a particular schema.
   * @param {String} name name of the model
   * @returns {import('mongoose').Model} A mongoose model.
   */
  getModel(name) {
    return mongoose.connection.model(name)
  }
}