import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, Icon, Switch } from '../../frontend/components/Bootstrap'
import DeleteModal, { EditModal } from '../DeleteModal'
import Form, { FormGroup, Input, TextArea } from '@depack/form'
import FormImage from '../Components/FormImage'
import SpecialForm from '../Components/SpecialForm'

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
  openModal(modal) {
    this.setState({ modal })
  }
  openEdit(edit) {
    this.setState({ edit })
  }
  render() {
    const f = <details>
      <summary>
        <h3 style="display: inline-block;vertical-align: middle;">Создать Новое Предложение</h3>
      </summary>
      <SpecialsForm path="/admin-data?specials" submitFinish={() => {
        this.load()
      }} successMessage="Предложение успешно создано!"
      confirmText="Добавить" />
    </details>
    return <Col>
      <h1>Специальные Предложения</h1>
      <List data={this.state.data} loading={this.state.loading}
        openModal={this.openModal.bind(this)}
        openEdit={this.openEdit.bind(this)}
      />
      <hr/>
      {f}
      {this.state.modal &&
        <DeleteModal {...this.state.modal} btnClass="danger" onClose={this.openModal.bind(this, null)} onComplete={this.load.bind(this)}/>
      }
      {this.state.edit &&
        <EditModal title="Редактирование" onClose={this.openEdit.bind(this, null)}>
          <SpecialsForm item={this.state.edit} submitFinish={this.load.bind(this)} path="/admin-data?specials"
            onClose={this.openEdit.bind(this, null)} closeText="Отмена" successMessage="Предложение успешно отредактировано!"
            confirmText="Сохранить"/>
        </EditModal>
      }
    </Col>
  }
}

const List = ({ data, openModal, openEdit, loading }) => {
  return (<div style="height:25rem;overflow:scroll;background:wheat; padding:0.5rem;">
    {loading && <span className="echo-loader">Loading…</span>}
    {!loading && !data.length && 'Нет специальных предложений.'}
    {data.map((item) => {
      return <Item item={item} key={item._id}
        openModal={openModal}
        openEdit={openEdit}
      />
    })}
  </div>)
}


const Item = ({ item, openModal, openEdit }) => {
  const { _id, title, cdnImage, description, price } = item
  return (<div style="border-bottom:1px solid brown;border-top:1px solid lightcoral;">
    <h4>{title}</h4>
    <p>
      <img src={cdnImage} />
      {description}
      <span style="font-weight: bold;"> {price}</span>
    </p>
    <a style="color:brown;" href="#" onClick={(e) => {
      e.preventDefault()
      openModal({
        text: <span>Вы действительно хотите удалить предложение <strong>{title}</strong>?</span>,
        confirmText: 'Удалить',
        title: 'Удаление Предложения',
        path: `specials&id=${_id}&delete`,
      })
      return false
    }}>
      <Icon icon="far fa-trash-alt"/>
    </a>
    <a style="color:brown;" href="#" onClick={(e) => {
      e.preventDefault()
      openEdit(item)
      return e
    }}>
      <Icon icon="fas fa-pen"/>
    </a>
  </div>)
}

class SpecialsForm extends SpecialForm {
  render({ item, onClose, closeText = 'Отмена', successMessage, confirmText = 'Добавить' }) {
    const i = item || {}
    const { formLoading } = this.state
    return (<Form onSubmit={this.submit.bind(this)} onChange={() => {
      this.setState({ error: null, success: null })
    }}>
      <FormGroup label="Название" help="Заголовок для главной страницы, напр., Ленинский проспект, дом 114">
        <Input placeholder="Название акции" name="title" required value={i.title}/>
      </FormGroup>
      <FormGroup label="Описание" help="Введите описание акции...">
        <TextArea name="description" required={true} placeholder="Описание акции">{i.description}</TextArea>
      </FormGroup>

      <FormImage help="Картинка, отображаемая на главной странице." required editing={item} image={i.cdnImage} />

      <FormGroup label="Цена" help="Задайте цену...">
        <Input name="price" placeholder="55 000 000 руб." value={i.price} />
      </FormGroup>

      <FormGroup label="Переход" help="Ссылка на страницу каталога, или сайта.">
        <Input name="href" placeholder="/каталог/москва-элитная/лениниский-проспект-дом-114" value={i.href} />
      </FormGroup>

      {item && <input type="hidden" name="id" value={i._id} />}

      <Error error={this.state.error}/>
      <Success success={this.state.success} message={successMessage}/>

      <button type="submit" className="btn btn-primary" disabled={formLoading}>{formLoading ? 'Загрузка...' : confirmText}</button>

      {onClose &&
        <button type="button" className="FormCancelBtn btn btn-secondary" onClick={onClose}>{closeText}</button>
      }
    </Form>)
  }
}

const Error = ({ error }) => {
  if (!error) return null
  return (<div className="alert alert-danger mt-3" role="alert">{error}</div>)
}

const Success = ({ success, message }) => {
  if (!success) return null
  return (<div className="alert alert-success mt-3" role="alert">{message || success}</div>)
}