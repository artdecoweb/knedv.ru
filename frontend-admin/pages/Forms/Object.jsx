import fetch from 'unfetch'
import { Component } from 'preact'
import Form, {
  FormGroup, Input, TextArea, SubmitForm, SubmitButton, Select,
} from '@depack/form'
import { Col, ErrorAlert, Success } from '../../../frontend/components/Bootstrap'
import ArticleEditor from '../../ArticleEditor'
import FormImage from '../../Components/FormImage'
import { LoadingIndicator } from '../../Components'
import { loadData } from '../../Components/LoadData'

export default class ObjectForm extends SubmitForm {
  constructor() {
    super()
    Object.assign(this.state, {
      loading: false,
      data: {
        showing: true,
      },
      categories: [],
      hint: '1-комнатные-апартаменты-воскресенское',
      catSeo: 'апартаменты',
      article: '',
    })
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
  }
  async componentDidMount() {
    await this.loadCategories()

    const editing = !!this.props.id
    if (!editing) return
    this.setState({ editing: 1 })

    /** @type {Array<Property>} */
    const data = await loadData.bind(this)(`objects&id=${this.props.id}`)
    if (data) {
      const [d] = data
      if (d) this.setState({
        data: {
          ...d,
          showing: !d.hidden,
        },
        hint: d.seo,
        catSeo: d.categorySeo,
        article: d.article,
      })
    }
  }
  // make this part of the other Select component
  // redux store ftw
  async loadCategories() {
    this.setState({ loading: true })
    try {
      const res = await fetch(`/admin-data?categories`)
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else {
        const categories = data.map(({ _id, title }) => ({
          value: _id,
          title,
        }))
        this.setState({ categories })
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  get hint() {
    return `Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/${this.state.catSeo}/<strong>${this.state.hint}</strong>.`
  }
  get editing() {
    return !!this.props.id
  }
  render({
    onClose, closeText = 'Отмена', successMessage, confirmText = 'Добавить', title, addedId,
  }) {
    const { categories, formLoading, data, loading, error, success } = this.state

    const form = (<Form onSubmit={this.submit} onChange={this.reset}>
      <FormGroup help="Название для каталога недвижимости." label="Название">
        <Input name="title" required placeholder="1к. апартаменты, 21 кв.м, п. Воскресенское" value={data.title} />
      </FormGroup>
      <FormGroup help="Цена объекта" label="Цена">
        <Input name="price" required placeholder="3 000 000 руб." value={data.price} />
      </FormGroup>
      <FormGroup help={this.hint} label="СЕО Название">
        <Input name="seo" required placeholder="1-комнатные-апартаменты-воскресенское" value={data.seo} />
      </FormGroup>
      <FormGroup help="Описание объекта." label="Описание">
        <TextArea rows={10} name="description" required placeholder={placeholder}>
          {data.description}
        </TextArea>
      </FormGroup>

      <FormImage help="Картинка, отображаемая на главной странице." required editing={this.editing} image={data.cdnImage} />

      <ArticleEditor name="article" article={this.state.article} onSave={(html) => {
        this.setState({ article: html })
        this.reset()
      }}/>
      {this.editing && <input type="hidden" name="id" value={this.props.id}/>}
      <FormGroup label="Раздел" help="Категория в каталоге">
        <Select name="category" options={categories} required value={data.category} />
      </FormGroup>

      <FormGroup label="Включено">
        <Switch name="showing" value={data.showing} hint="Показывается в каталоге" />
      </FormGroup>

      <ErrorAlert error={error} />
      <Success success={success} message={successMessage} />
      <SubmitButton confirmText={confirmText} loadingText="Загрузка..." loading={formLoading} />

      {addedId &&
        <a className="ml-2 btn btn-warning" href={`/admin/albums/${addedId}`}>
          Загрузить Фотографии
        </a>}

      {onClose &&
        <button type="button" className="FormCancelBtn btn btn-secondary" onClick={onClose}>{closeText}</button>
      }
    </Form>)
    return <Col>
      {title && <h1>{title}</h1>}
      {loading && <LoadingIndicator />}
      {!loading && form}
    </Col>
  }
}

class Switch extends Component {
  render(props) {
    const { name, value, required, hint } = props
    const { onChange, id, values = {} } = this.context
    const rendered = name in values // for SSR
    const switchValue = rendered ? values[name] : value
    return (<div className="form-check">
      <input
        checked={switchValue}
        type="checkbox"
        className="form-check-input"
        id={id}
        name={name}
        required={required}
        onChange={(e) => {
          const el = /** @type {HTMLInputElement} */ (e.currentTarget)
          onChange(name, el.checked)
        }}
      />
      <small className="form-text text-muted" style="padding-top:3px;">
        <label className="form-check-label" htmlFor={id}>
          {hint}
        </label>
      </small>
    </div>)
  }
}

const placeholder = `Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле "современная классика", что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).`


// {addedId &&
//   <a className="ml-2 btn btn-light" href={`/goto/${addedId}`}>
//     Перейти К Каталогу
//   </a>}