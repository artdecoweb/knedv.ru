import { Component } from 'preact'

export default class SpecialForm extends Component {
  /**
   * Submits the form to the /path property, setting `formLoading` during this time.
   */
  async submit(e) {
    e.preventDefault()
    if (!this.props.path) {
      this.setState({ error: 'Form Path is not included' })
      return false
    }
    this.setState({ error: null, success: null })
    const data = new FormData(e.target)
    this.setState({ formLoading: true })
    try {
      const res = await fetch(this.props.path, {
        method: 'POST',
        body: data,
      })
      const { error } = await res.json()
      if (error) this.setState({ error })
      else this.setState({ success: 1 })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ formLoading: false })
    }
    if (this.props.submitFinish) {
      await this.props.submitFinish()
    }
    return false
  }
}