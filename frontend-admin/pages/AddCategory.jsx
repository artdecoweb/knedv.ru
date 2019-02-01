import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, FormRow } from '../../frontend/components/Bootstrap'

export default class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: {},
      hint: 'москва-новостройки',
    }
  }
  async componentDidMount() {
    const editing = !!this.props.id
    if (!editing) return
    this.setState({ editing: 1, loading: true })
    try {
      const res = await fetch(`/admin-data?categories&id=${this.props.id}`)
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else {
        const [d] = data
        this.setState({ data: d, hint: d.seo })
      }
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
      const res = await fetch('/admin-data?categories', {
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
    return `Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>${this.state.hint}</strong>/3х-комнатные-квартиры.`
  }
  render() {
    const hint = this.getHint()
    const { editing } = this.state
    return <Col>
      <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Категорию</h1>
      {editing && this.state.loading && <span className="echo-loader">Loading…</span>}
      {!(editing && this.state.loading) &&
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>
        <FormRow name="title" placeholder="Москва Новостройки" label="Название" help="Название для меню слева." required="1" { ...(editing ? { value: this.state.data.title } : {})} />
        <FormRow name="seo" placeholder="москва-новостройки" label="СЕО Название" help={hint} required="1" { ...(editing ? { value: this.state.data.seo } : {})} />
        <FormRow name="description" placeholder="Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий." label="Описание" help="Краткое описание для главной страницы." textarea={3} required="1" { ...(editing ? { value: this.state.data.description } : {})}/>
        <FormRow name="image" label="Изображение" help="Картинка, отображаемая на главной странице." file="1" type="file" required="1"/>
        {editing && <input type="hidden" name="id" value={this.props.id}/>}
        <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{ this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
        {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
        {this.state.success && <div className="alert alert-success mt-3" role="alert">Категория успешно {editing ? 'сохранена' : 'создана'}!</div>}
      </form>
      }
    </Col>
  }
}