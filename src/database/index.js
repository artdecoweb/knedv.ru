import mongoose, { Schema } from 'mongoose'
import * as _Schemas from './schema'

const Schemas = Object.keys(_Schemas).reduce((acc, k) => {
  const v = _Schemas[k]
  if (!(v instanceof Schema)) return acc
  acc[k] = v
  return acc
}, {})

function setupModels(connection, schemas) {
  Object.keys(schemas).forEach((key) => {
    const schema = schemas[key]
    connection.model(key, schema)
  })
}

class Database {
  /**
   * Create new database instance.
   */
  constructor() {
    this._schemas = Schemas
    console.log(Object.keys(Schemas).join(', '))
  }
  /**
   * Create a new object
   * @param {string} modelName The name of the model to use.
   */
  async addObject(modelName, data) {
    const M = this.getModel(modelName)
    const m = new M(data)
    const res = await m.save()
    return res._doc
  }
  async deleteById(modelName, id) {
    const M = this.getModel(modelName)
    const res = await M.deleteOne({ _id: id })
    return res
  }
  /**
   * Connect to the database.
   * @param {string} uri the url of the database to connect to
   */
  async connect(uri) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    })
    setupModels(mongoose.connection, this._schemas)
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

export default Database