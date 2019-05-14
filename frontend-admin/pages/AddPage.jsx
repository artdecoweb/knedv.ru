import { Component } from 'preact'
import fetch from 'unfetch'
import { Col, FormRow } from '../../frontend/components/Bootstrap'
import ArticleEditor from '../ArticleEditor'

export default class AppPage extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: {},
      article: '',
    }
    this.form = null
  }
  async componentDidMount() {
    const editing = !!this.props.id
    if (!editing) return
    this.setState({ editing: 1, loading: true })

    try {
      const res = await fetch(`/admin-data?pages&id=${this.props.id}`)
      const { error, data } = await res.json()
      if (error) this.setState({ error })
      else {
        const [d] = data
        this.setState({
          data: d,
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
      const res = await fetch('/admin-data?pages', {
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
    const { editing } = this.state
    const hint = 'Путь страницы, например knedv.ru/<strong>новости</strong>'
    return <Col>
      <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Страницу</h1>
      {editing && this.state.loading && <span className="echo-loader">Loading…</span>}
      {!(editing && this.state.loading) &&
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>

        <FormRow name="title" placeholder="Новости" label="Название" help="Название для администратора." required="1" value={this.state.data.title} />

        <FormRow name="seo" placeholder="новости" label="СЕО Название" help={hint} required="1" value={this.state.data.seo} />

        <FormRow name="description" placeholder="Раздел Новостей." label="Описание" help="Описание страницы." textarea={2} required="1" value={this.state.data.description}/>

        <ArticleEditor article={this.state.article} onSave={(html) => {
          this.setState({ article: html })
        }}/>
        {editing && <input type="hidden" name="id" value={this.props.id}/>}
        <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{ this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
        {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
        {this.state.success && <div className="alert alert-success mt-3" role="alert">Страница успешно {editing ? 'сохранена' : 'создана'}!</div>}
      </form>
      }
    </Col>
  }
}