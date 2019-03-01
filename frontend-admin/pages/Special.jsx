import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, Icon } from '../../frontend/components/Bootstrap'
import DeleteModal, { EditModal } from '../DeleteModal'
import SpecialsForm from './Forms/Specials'
import { loadData } from '../Components/LoadData';

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
    /** @type {Array<Special>} */
    const data = await loadData.bind(this)('specials')
    if (data) this.setState({ data })
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
  const { _id, title, cdnImage, description, price, show_on_main } = item
  const shownOnMain = show_on_main == 'on'
  return (<div style="border-bottom:1px solid brown;border-top:1px solid lightcoral;" className={shownOnMain ? 'IsShownOnMain' : ''}>
    <h4>{title} {shownOnMain && <span className="badge badge-danger">На главной</span>}</h4>
    <p>
      <img style="display:block;" src={cdnImage} />
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