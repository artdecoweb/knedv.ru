import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, FormRow } from '../../frontend/components/Bootstrap'

export default class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: [],
    }
  }
  async componentDidMount() {
    this.setState({ loading: true })
    this.loading = true
    try {
      const res = await fetch('/admin-data?categories')
      const data = await res.json()
      this.setState({ data })
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ loading: false })
    }
  }
  async submit(e) {
    this.setState({ error: null })
    e.preventDefault()
    console.log(this.form)
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
  render() {
    const hint = 'Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>москва-новостройки</strong>/3х-комнатные-квартиры.'
    return <Col>
      <h1>Добавить Категорию</h1>
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>
        <FormRow name="title" placeholder="Москва Новостройки" label="Название" help="Название для меню слева." required="1" />
        <FormRow name="seo" placeholder="москва-новостройки" label="СЕО Название" help={hint} required="1" />
        <FormRow name="description" placeholder="Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий." label="Описание" help="Краткое описание для главной страницы." textarea={3} required="1"/>
        <FormRow name="image" label="Изображение" help="Картинка, отображаемая на главной странице." file="1" type="file" required="1"/>
        <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{ this.state.formLoading ? 'Загрузка...' : 'Добавить'}</button>
        {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
        {this.state.success && <div className="alert alert-success mt-3" role="alert">Категория успешно создана!</div>}
      </form>
    </Col>
  }
}