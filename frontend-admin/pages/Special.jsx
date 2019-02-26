import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, Row, Icon } from '../../frontend/components/Bootstrap'
import DeleteModal from '../DeleteModal'
import Form, { FormGroup, Input, TextArea } from '@depack/form'

export default class Special extends Component {
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
      /** @type {{ json: function(): Promise<{ error: string, data: Array<Special> }> }} */
      const res = await fetch('/admin-data?specials')
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else this.setState({ data })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  async submit(e) {
    this.setState({ error: null })
    e.preventDefault()
    const data = new FormData(this.form)
    this.setState({ formLoading: true })
    try {
      const res = await fetch('/admin-data?specials', {
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
    return false
  }
  render() {
    if (this.state.loading) {
      return (<Col>
        <h1>Специальные Предложения</h1>
        <span className="echo-loader">Loading…</span>
        {}
      </Col>)
    }
    const f = <details>
      <summary>
        <h3 style="display: inline-block;vertical-align: middle;">Создать Новое Предложение</h3>
      </summary>
      <AddForm formLoading={this.state.formLoading} onSubmit={this.submit.bind(this)} formRef={r => { this.form = r }} />
    </details>
    if (!this.state.data.length) {
      return (<Col>
        <h1>Специальные Предложения</h1>
        Нет специальных предложений.
        <hr/>
        {f}
      </Col>)
    }
    return <Col>
      <h1>Специальные Предложения</h1>
      <div style="max-height:25rem;overflow:scroll;background:wheat; padding:0.5rem;">
        {this.state.data.map((Item, i) => {
          return (<div key={i} style="border-bottom:1px solid brown;border-top:1px solid lightcoral;">
            <h4>{Item.title}</h4>
            <p>
              <img src={Item.cdnImage} />
              {Item.description}
              <span style="font-weight: bold;"> {Item.price}</span>
            </p>
            <a style="color:brown;" href="#" onClick={(e) => {
              e.preventDefault()
              this.setState({
                modal: {
                  text: <span>Вы действительно хотите удалить предложение <strong>{Item.title}</strong>?</span>,
                  confirmText: 'Удалить',
                  title: 'Удаление Предложения',
                  path: `specials&id=${Item._id}&delete`,
                },
              })
              return false
            }}><Icon icon="far fa-trash-alt"/></a>
            {this.state.modal &&
              <DeleteModal {...this.state.modal} btnClass="danger" onClose={() => {
                this.setState({ modal: null })
              }} onComplete={this.load.bind(this)}/>
            }
          </div>)
        })}
      </div>
      <hr/>
      {f}
    </Col>
  }
}

const AddForm = ({ formLoading, onSubmit, formRef }) => {
  return (<Form onSubmit={onSubmit} formRef={formRef}>
    <FormGroup label="Название" help="Заголовок для главной страницы, напр., Ленинский проспект, дом 114">
      <Input placeholder="Название акции" name="title" required/>
    </FormGroup>
    <FormGroup label="Описание" help="Введите описание акции...">
      <TextArea name="description" required={true} placeholder="Описание акции"></TextArea>
    </FormGroup>
    <FormGroup label="Изображение" help="Выберите изображение...">
      <Input name="image" type="file" required={true} file="1"/>
    </FormGroup>
    <FormGroup label="Цена" help="Задайте цену...">
      <Input name="price" placeholder="55 000 000 руб." />
    </FormGroup>
    <FormGroup label="Переход" help="Ссылка на страницу каталога, или сайта.">
      <Input name="href" placeholder="/каталог/москва-элитная/лениниский-проспект-дом-114" />
    </FormGroup>
    <button type="submit" className="btn btn-primary" disabled={formLoading}>{formLoading ? 'Загрузка...' : 'Добавить'}</button>
  </Form>)
}

{/* <h1>Категории Каталога</h1>
<p>
  В каталоге невдижимости содержатся следующие разделы:
</p>
{this.state.loading && <span className="echo-loader">Loading…</span>}
{this.state.data.map(({ _id, ...item }) => {
  return <ItemRow key={_id} {...item} id={_id} onDelete={() => this.load()} />
})} */}

class ItemRow extends Component {
  constructor() {
    super()
    this.state = {
      modal: null,
    }
  }
  render() {
    /** @type {CategoryProps} */
    const props = this.props
    const { title, image, description, seo, id, onDelete } = props
    return <Row className="CategoryRow">
      <Col className="col-3 col-sm-4 "><img src={image} className="img-fluid p-1"/></Col>
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