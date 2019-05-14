import fetch from 'unfetch'

/**
 * Loads the data while setting the state of `this` to `loading`.
 * The data is returned by this function, unless `error` is returned in which case the `error` state is set to the error.
 * @this {!preact.Component}
 */
export async function loadData(path) {
  this.setState({ loading: true })
  try {
    const res = await fetch('/admin-data?' + path)
    const { 'error': error, 'data': data } = await res.json()
    if (error) {
      this.setState({ error }); return }
    else return data
  } catch (error) {
    this.setState({ error })
  } finally {
    this.setState({ loading: false })
  }
}