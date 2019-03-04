import { Component } from 'preact'
import { Col, Row, Icon } from '../../frontend/components/Bootstrap'
import DeleteModal, { EditModal } from '../DeleteModal'
import ObjectForm from './Forms/Object'
import { loadData } from '../Components/LoadData'

export default class Objects extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: [],
      modal: null,
      edit: null,
    }
  }
  async componentDidMount() {
    await this.load()
  }
  async load() {
    /** @type {Array<Property>}  */
    const data = await loadData.bind(this)('objects')
    if (data) this.setState({ data })
  }
  openModal(modal) {
    this.setState({ modal })
  }
  openEdit(edit) {
    this.setState({ edit })
  }
  render() {
    return <Col>
      <h1>Объекты Недвижимости</h1>
      <p>
        На сайт добалены следующие объекты:
      </p>
      <List data={this.state.data} loading={this.state.loading}
        openModal={this.openModal.bind(this)}
        openEdit={this.openEdit.bind(this)} />
      {this.state.modal &&
        <DeleteModal {...this.state.modal} btnClass="danger" onClose={this.openModal.bind(this, null)} onComplete={this.load.bind(this)}/>
      }
      {this.state.edit &&
        <EditModal title="Редактирование Объекта" onClose={this.openEdit.bind(this, null)}>
          <ObjectForm id={this.state.edit._id} submitFinish={this.load.bind(this)} path="/admin-data?objects"
            onClose={this.openEdit.bind(this, null)} closeText="Отмена" successMessage="Объект успешно отредактирован!"
            confirmText="Сохранить"/>
        </EditModal>
      }
    </Col>
  }
}

const List = ({ data, openModal, openEdit, loading }) => {
  return (<div>
    {loading && <span className="echo-loader">Loading…</span>}
    {!loading && !data.length && 'Нет объектов недвижимости.'}
    {data.map((item) => {
      return <Item item={item} key={item._id}
        openModal={openModal}
        openEdit={openEdit}
      />
    })}
  </div>)
}


class Item extends Component {
  render({ item, openModal, openEdit }) {
    const { title, image, description, seo, _id, categorySeo, price } = item
    // read host ???
    const s = `/каталог/${categorySeo}/${seo}`
    const link = `knedv.ru${s}`
    return <Row className="CategoryRow">
      <Col className="col-3 col-sm-4 "><img src={image} className="img-fluid p-1"/>
        {price && `Цена: ${price}`}
      </Col>
      <Col>
        <h2>{title}</h2>
        <em><a href={s}>{link}</a></em>
        <p>{description}</p>
      </Col>
      <Col className="col-1 CategoryMeta">
        <br/>
        <a style="color:brown;" href="#" onClick={(e) => {
          e.preventDefault()
          openModal({
            text: <span>Вы действительно хотите удалить объект <strong>{title}</strong>?</span>,
            confirmText: 'Удалить',
            title: 'Удаление Объекта',
            path: `objects&id=${_id}&delete`,
          })
          return false
        }}><Icon icon="far fa-trash-alt"/></a>
        <a style="color:brown;" href="#" onClick={(e) => {
          e.preventDefault()
          openEdit(item)
          return e
        }}>
          <Icon icon="fas fa-pen"/>
        </a>
        <a style="color:brown;" href={`/admin/albums/${_id}`} onClick={(e) => {
          e.preventDefault()
          openEdit(item)
          return e
        }}>
          <Icon icon="fas fa-images"/>
        </a>
      </Col>
    </Row>
  }
}

{/* <p><a href={`/admin/albums/${_id}`}>Фотографии: {10}</a></p> */}


{/* <FormRow name="article" label="Статья" help="Подробная статья для раздела каталога." textarea={5} required="1"/> */}

{/* <a style="color:brown;" href={`/admin/add-object/${_id}`}><Icon icon="fas fa-pen"/></a> */}
