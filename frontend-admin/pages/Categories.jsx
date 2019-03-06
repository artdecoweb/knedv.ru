import { Component } from 'preact'
import { Col, Row, Icon, A } from '../../frontend/components/Bootstrap'
import DeleteModal, { EditModal } from '../DeleteModal'
import { loadData } from '../Components/LoadData'
import CategoryForm from './Forms/Category'
// import 'preact/devtools/'

export default class Categories extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      data: [],
    }
  }
  async componentDidMount() {
    await this.load()
  }
  async load() {
    /** @type {Array<Category>} */
    const data = await loadData.bind(this)('categories')
    if (data) this.setState({ data })
  }
  openModal(modal) {
    this.setState({ modal })
  }
  openEdit(edit) {
    this.setState({ edit })
  }
  render() {
    const { loading, data, modal, edit } = this.state
    return <Col>
      <h1>Категории Каталога</h1>
      <p>
        В каталоге невдижимости содержатся следующие разделы:
      </p>
      <List data={data} loading={loading}
        openModal={this.openModal.bind(this)}
        openEdit={this.openEdit.bind(this)} />
      {modal &&
        <DeleteModal {...modal} btnClass="danger" onClose={this.openModal.bind(this, null)} onComplete={this.load.bind(this)}/>
      }
      {edit &&
        <EditModal title="Редактирование Категории" onClose={this.openEdit.bind(this, null)}>
          <CategoryForm id={edit._id} submitFinish={this.load.bind(this)} path="/admin-data?categories"
            onClose={this.openEdit.bind(this, null)}
            successMessage="Категория успешно отредактирована!"
            confirmText="Сохранить" />
        </EditModal>
      }
    </Col>
  }
}
// {this.state.loading && <span className="echo-loader">Loading…</span>}
//       {this.state.data.map(({ _id, ...item }) => {
//         return <ItemRow key={_id} {...item} id={_id} onDelete={() => this.load()} />
//       })}
// const List =
const List = ({ data, openModal, openEdit, loading }) => {
  return (<div>
    {loading && <span className="echo-loader">Loading…</span>}
    {!loading && !data.length && 'Нет объектов недвижимости.'}
    {data.map((item, i) => {
      const even = i % 2 == 0
      return <Item item={item} key={item._id}
        openModal={openModal}
        openEdit={openEdit}
        style={`background:${!even ? '#edeee8' : 'white'};`}
      />
    })}
  </div>)
}

class Item extends Component {
  render({ item, openModal, openEdit }) {
    const { title, image, description, seo, _id }   = item
    const s = `/каталог/${seo}/`
    const link = `knedv.ru${s}`

    return (<Row className="CategoryRow">
      <Col className="col-3 col-sm-4 ">
        <img src={image} className="img-fluid p-1"/>
      </Col>
      <Col>
        <h2>{title}</h2>
        <em><a href={s}>{link}</a></em>
        <p>{description}</p>
      </Col>
      <Col className="col-1 CategoryMeta">
        <A style="color:brown;" onClick={() => {
          openEdit(item)
        }}> <Icon icon="fas fa-pen"/></A>
        <br/>
        <A style="color:brown;" onClick={() => {
          openModal({
            modal: {
              text: <span>Вы действительно хотите удалить категорию <strong>{title}</strong>?</span>,
              confirmText: 'Удалить',
              title: 'Удаление Категории',
              path: `categories&id=${_id}&delete`,
            },
          })
        }}><Icon icon="far fa-trash-alt"/></A>
      </Col>
    </Row>)
  }
}

{/* <a style="color:brown;" href={`/admin/add-category/${id}`}></a> */}


{/* <FormRow name="article" label="Статья" help="Подробная статья для раздела каталога." textarea={5} required="1"/> */}