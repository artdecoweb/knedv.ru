import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const TS = {
  context: Context,
  async 'has / route'({ ping }) {
    await ping('/')
  },
}

export default TS