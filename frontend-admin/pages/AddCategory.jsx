import { Component } from 'preact'
import fetch from 'unfetch'
import Form, { FormGroup, Input, TextArea } from '@depack/form'
import { Col } from '../../frontend/components/Bootstrap'
import ArticleEditor from '../ArticleEditor'

export default class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      data: {},
      hint: 'москва-новостройки',
      article: '',
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
        this.setState({ data: d, hint: d.seo, article: d.article })
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
    const data = new FormData(e.currentTarget.data)
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
  onFormChange(values) {
    const newSeo = values.seo
  }
  render() {
    const hint = this.getHint()
    const { editing, resetImage } = this.state
    return <Col>
      <h1>{this.state.editing ? 'Редактировать' : 'Добавить'} Категорию</h1>
      {editing && this.state.loading && <span className="echo-loader">Loading…</span>}
      {!(editing && this.state.loading) &&
        <Form onChange={(values) => {
          console.log(values)
          console.log(values.seo)
        }}
        onSubmit={this.submit.bind(this)}>
          <FormGroup label="Название" help="Название для меню слева.">
            <Input name="title" placeholder="Москва Новостройки"
              value={this.state.data.title} required={true} />
          </FormGroup>
          <FormGroup label="СЕО Название" help={hint}>
            <Input required={true} name="seo" placeholder="москва-новостройки" value={this.state.data.seo}/>
          </FormGroup>
          <FormGroup label="Описание" help="Краткое описание для главной страницы.">
            <TextArea rows="3" required={true} name="description" placeholder="Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий.">
              {this.state.data.description}
            </TextArea>
          </FormGroup>
          {editing && !resetImage && <FormGroup label="Изображение">
            <br/>
            <img className="img-fluid" src={this.state.data.cdnImage} />
            <a href="#" className="btn btn-outline-warning" onClick={(e) => {
              e.preventDefault()
              this.setState({ resetImage: true })
              return false
            }}>Изменить</a>
          </FormGroup>
          }
          {(!editing || resetImage) && <FormGroup label="Изображение" help="Картинка, отображаемая на главной странице.">
            <Input name="image" type="file" file="1" required={true}  />
          </FormGroup>}
          <ArticleEditor article={this.state.article} onSave={(html) => {
            this.setState({ article: html })
          }}/>
          {editing && <input type="hidden" name="id" value={this.props.id}/>}

          <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
          {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
          {this.state.success && <div className="alert alert-success mt-3" role="alert">Категория успешно {editing ? 'сохранена' : 'создана'}!</div>}
        </Form>
      }
    </Col>
  }
}

{/* <form
  ref={r => this.form = r}
  onSubmit={this.submit.bind(this)}>
  <FormRow name="description" placeholder="Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий." label="Описание" help="Краткое описание для главной страницы." textarea={3} required="1" value={this.state.data.description}/>
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
  <button type="submit" className="btn btn-primary" disabled={this.state.formLoading}>{ this.state.formLoading ? 'Загрузка...' : `${editing ? 'Сохранить' : 'Добавить'}`}</button>
  {this.state.error && <div className="alert alert-danger mt-3" role="alert">{this.state.error}</div>}
  {this.state.success && <div className="alert alert-success mt-3" role="alert">Категория успешно {editing ? 'сохранена' : 'создана'}!</div>}
</form> */}