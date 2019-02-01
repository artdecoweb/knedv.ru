import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, FormRow } from '../../frontend/components/Bootstrap'
import ArticleEditor from '../ArticleEditor';

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
    const { editing, resetImage } = this.state
    return <Col>
      <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Объект</h1>
      {editing && this.state.loading && <span className="echo-loader">Loading…</span>}
      {!(editing && this.state.loading) &&
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>
        <FormRow name="title" placeholder="1к. апартаменты, 21 кв.м, п. Воскресенское" label="Название" help="Название для каталога недвижимости." required="1" { ...(editing ? { value: this.state.data.title } : {})} />
        <FormRow name="seo" placeholder="1-комнатные-апартаменты-воскресенское" label="СЕО Название" help={hint} required="1" { ...(editing ? { value: this.state.data.seo } : {})} />
        <FormRow name="description" placeholder="Новый торгово-гостиничный Комплекс «Воскресенский» в п. Воскресенское, который исполнен в стиле 'современная классика', что придает проекту свою индивидуальность и привлекательность в целях инвестиций. В комплексе будут развиты свои сервисные службы, и он станет достойным торгово-гостиничным комплексом, который будет являться частью п.Воскресенское: д/о Воскресенское, ФГАО Оздоровительный Комплекс «Архангельское» (Управ делами Президента РФ), детская балетная школа, хореографическая школа, детский центр творчества, детский музыкальный театр, студия музыкального развития, п. Юрьев Сад (таунхаусы), п. Кронбург (квадрохаусы), дачи известных людей СССР и политических деятелей нашего времени. Выгодные инвестиции (сдача в аренду посуточно, месячно, годично)." label="Описание" help="Описание объекта." textarea={10} required="1" value={this.state.data.description}/>

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
        {(!editing || resetImage) && <FormRow name="image" label="Изображение" help="Картинка, отображаемая на главной странице." file="1" type="file" required="1"/>}
        <ArticleEditor article={this.state.article} onSave={(html) => {
          this.setState({ article: html })
        }}/>
        {editing && <input type="hidden" name="id" value={this.props.id}/>}
        <FormRow name="category" label="Раздел" help="Категория в каталоге" options={this.state.categories} required="1" value={this.state.data.category}/>
        <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{ this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
        {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
        {this.state.success && <div className="alert alert-success mt-3" role="alert">Объект успешно {editing ? 'сохранен' : 'создан'}!</div>}
      </form>
      }
    </Col>
  }
}