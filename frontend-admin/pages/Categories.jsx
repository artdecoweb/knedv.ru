import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, Row, Icon } from '../../frontend/components/Bootstrap'

export default class Categories extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: [],
    }
  }
  async componentDidMount() {
    await this.load()
  }
  async load() {
    this.setState({ loading: true })
    try {
      const res = await fetch('/admin-data?categories')
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else this.setState({ data })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    return <Col>
      <h1>Категории Каталога</h1>
      <p>
        В каталоге невдижимости содержатся следующие разделы:
      </p>
      {this.state.loading && <span className="echo-loader">Loading…</span>}
      {this.state.data.map(({ _id, ...item }) => {
        return <ItemRow key={_id} {...item} id={_id} onDelete={() => this.load()} />
      })}
    </Col>
  }
}

class ItemRow extends Component {
  constructor() {
    super()
    this.state = {
      modal: null,
    }
  }
  render() {
    const { title, image, description, seo, id, onDelete } = this.props
    return <Row className="CategoryRow">
      <Col className="col-3 col-sm-4 "><img src={image} className="img-fluid"/></Col>
      <Col>
        <h2>{title}</h2>
        <em>knedv.ru/{seo}</em>
        <p>{description}</p>
      </Col>
      <Col className="col-1 CategoryMeta">
        <a style="color:brown;" href={`/admin/add-category/${id}`}><Icon icon="fas fa-pen"/></a>
        <br/>
        <a style="color:brown;" href="#" onClick={(e) => {
          e.preventDefault()
          this.setState({
            modal: {
              text: <span>Вы действительно хотите удалить категорию <strong>{title}</strong>?</span>,
              confirmText: 'Удалить',
              title: 'Удаление Категории',
              path: `categories&id=${id}&delete`,
            },
          })
          return false
        }}><Icon icon="far fa-trash-alt"/></a>
      </Col>
      {this.state.modal &&
        <DeleteModal {...this.state.modal} btnClass="danger" onClose={() => {
          this.setState({ modal: null })
        }} onComplete={onDelete}/>
      }
    </Row>
  }
}

class DeleteModal extends Component {
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
  render() {
    const { text, title, onClose, btnClass = 'primary', confirmText, closeText = 'Отмена' } = this.props
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

{/* <FormRow name="article" label="Статья" help="Подробная статья для раздела каталога." textarea={5} required="1"/> */}