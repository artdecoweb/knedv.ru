import { Component } from 'preact'

export default class DeleteModal extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }
  async delete() {
    this.setState({ loading: true })
    try {
      const res = await fetch(`/admin-data?${this.props.path}`, {
        method: 'POST',
      })
      const { error } = await res.json()
      if (error) this.setState({ error })
      else {
        this.props.onClose()
        this.props.onComplete()
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  render({ text, title, onClose, btnClass = 'primary', confirmText, closeText = 'Отмена' }) {
    return <div className="modal" tabIndex="-1" role="dialog" style="display: block;">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ title }</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{ text }</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>{closeText}</button>
            <button type="button" disabled={this.state.loading} className={`btn btn-${btnClass}`} onClick={() => this.delete()}>{this.state.loading ? 'Отправка...' : confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  }
}