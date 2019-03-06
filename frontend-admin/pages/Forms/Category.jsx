import Form, { SubmitForm, SubmitButton, FormGroup, Input, TextArea } from '@depack/form'
import FormImage from '../../Components/FormImage'
import { loadData } from '../../Components/LoadData'
import ArticleEditor from '../../ArticleEditor'
import { ErrorAlert, Success, Col } from '../../../frontend/components/Bootstrap'
import { LoadingIndicator } from '../../Components'

class CategoryForm extends SubmitForm {
  constructor() {
    super()
    Object.assign(this.state, {
      loading: false,
      data: {},
      hint: 'москва-новостройки',
      article: '',
    })
  }
  async componentDidMount() {
    const editing = !!this.props.id
    if (!editing) return
    this.setState({ editing: true })
    /** @type {Array<Category>} */
    const data = await loadData.bind(this)(`categories&id=${this.props.id}`)
    if (data) {
      const [d] = data
      if (d) this.setState({
        data: d, hint: d.seo, article: d.article,
      })
    }
  }
  render({ confirmText, successMessage, addedId, title, id, onClose, closeText = 'Отмена' }) {
    const { formLoading, error, success, loading,
      editing, article, data } = this.state

    const form = (<Form onSubmit={this.submit.bind(this)} onChange={() => {
      this.reset()
    }}>
      <FormGroup label="Название" help="Название для меню слева.">
        <Input name="title" placeholder="Москва Новостройки"
          value={data.title} required />
      </FormGroup>
      <FormGroup label="СЕО Название" help={this.hint}>
        <Input required name="seo" placeholder="москва-новостройки" value={data.seo}/>
      </FormGroup>
      <FormGroup label="Описание" help="Краткое описание для главной страницы.">
        <TextArea rows="3" required name="description" placeholder="Новая недвижиость в столице России -- это привлекательное предложения для тех, кто собирается строить свое будущее в центре событий.">
          {data.description}
        </TextArea>
      </FormGroup>
      <FormImage help="Картинка, отображаемая на главной странице." required editing={editing} image={data.cdnImage} />
      <ArticleEditor name="article" article={article} onSave={(html) => {
        this.setState({ article: html })
        this.reset()
      }}/>
      {editing && <input type="hidden" name="id" value={id}/>}

      <ErrorAlert error={error} />
      <Success success={success} message={successMessage} />

      <SubmitButton confirmText={confirmText} loadingText="Загрузка..." loading={formLoading} />

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

  get hint() {
    const hint = this.state.hint
    return `Фраза для поисковой оптимизации, участвующая в адресах страниц, например, knedv.ru/<strong>${hint}</strong>/3х-комнатные-квартиры.`
  }
}

export default CategoryForm