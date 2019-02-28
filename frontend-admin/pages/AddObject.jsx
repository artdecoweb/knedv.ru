import { Component } from 'preact'
import fetch from 'unfetch'
import { Col } from '../../frontend/components/Bootstrap'
import ArticleEditor from '../ArticleEditor'
import Form, { FormGroup, Input, TextArea, Select } from '@depack/form'

export default class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: {},
      categories: [],
      hint: '1-комнатные-апартаменты-воскресенское',
      catSeo: 'апартаменты',
      article: '',
    }
  }
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
  async componentDidMount() {
    await this.loadCategories()

    const editing = !!this.props.id
    if (!editing) return
    this.setState({ editing: 1, loading: true })

    try {
      const res = await fetch(`/admin-data?objects&id=${this.props.id}`)
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else {
        const [d] = data
        this.setState({
          data: d,
          hint: d.seo,
          catSeo: d.categorySeo,
          article: d.article,
        })
      }
    } catch ({ message: error }) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  async submit(e) {
    this.setState({ error: null })
    e.preventDefault()
    const data = new FormData(this.form)
    data.append('article', this.state.article)
    this.setState({ formLoading: true })
    try {
      const res = await fetch('/admin-data?objects', {
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
  getHint() {
    return `Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/${this.state.catSeo}/<strong>${this.state.hint}</strong>.`
  }
  render() {
    const hint = this.getHint()
    const { editing, resetImage, categories } = this.state
    if (this.state.loading) {
      return <Col>
        <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Объект</h1>
        <span className="echo-loader">Loading…</span>
      </Col>
    }
    return <Col>
      <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Объект</h1>
      {!(editing && this.state.loading) &&
      <Form formRef={r => this.form = r} onSubmit={this.submit.bind(this)}>
        <FormGroup help="Название для каталога недвижимости." label="Название">
          <Input name="title" required={true} placeholder="1к. апартаменты, 21 кв.м, п. Воскресенское" value={this.state.data.title} />
        </FormGroup>
        <FormGroup help="Цена объекта" label="Цена">
          <Input name="price" required={true} placeholder="3 000 000 руб." value={this.state.data.price} />
        </FormGroup>
        <FormGroup help={hint} label="СЕО Название">
          <Input name="seo" required={true} placeholder="1-комнатные-апартаменты-воскресенское" value={this.state.data.seo} />
        </FormGroup>
        <FormGroup help="Описание объекта." label="Описание">
          <TextArea rows={10} name="description" required={true}  placeholder="Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично).">
            {this.state.data.description}
          </TextArea>
        </FormGroup>

        {editing && !resetImage && <div className="form-group">
          <label>Изображение</label><br/>
          <img className="img-fluid" src={this.state.data.cdnImage} />
          <a href="#" className="btn btn-outline-warning" onClick={(e) => {
            e.preventDefault()
            this.setState({ resetImage: true })
            return false
          }}>Изменить</a>
        </div>
        }
        {(!editing || resetImage) && <FormGroup label="Изображение" help="Картинка, отображаемая на главной странице.">
          <Input name="image" file="1" type="file" required={true} />
        </FormGroup>}
        <ArticleEditor article={this.state.article} onSave={(html) => {
          this.setState({ article: html })
        }}/>
        {editing && <input type="hidden" name="id" value={this.props.id}/>}
        <FormGroup label="Раздел" help="Категория в каталоге">
          <Select name="category" options={categories} required={true} value={this.state.data.category} />
        </FormGroup>
        <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
        <Error error={this.state.error} />
        {this.state.success && <div className="alert alert-success mt-3" role="alert">Объект успешно {editing ? 'сохранен' : 'создан'}!</div>}
      </Form>
      }
    </Col>
  }
}

const Error = ({ error }) => {
  if (!error) return null
  return <div className="alert alert-danger mt-3" role="alert">{error}</div>
}