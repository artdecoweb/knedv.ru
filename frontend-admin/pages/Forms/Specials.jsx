import Form, {
  FormGroup, Input, TextArea, SubmitForm, SubmitButton,
} from '@depack/form'
import { Switch, Success, ErrorAlert } from '../../../frontend/components/Bootstrap'
import FormImage from '../../Components/FormImage'

export default class SpecialsForm extends SubmitForm {
  render({ item, onClose, closeText = 'Отмена', successMessage, confirmText = 'Добавить' }) {
    const i = item || {}
    const { formLoading, error, success } = this.state
    return (<Form onSubmit={this.submit.bind(this)} onChange={() => {
      this.setState({ error: null, success: null })
    }}>
      <FormGroup label="Название" help="Заголовок для главной страницы, напр., Ленинский проспект, дом 114">
        <Input placeholder="Название акции" name="title" required value={i.title}/>
      </FormGroup>
      <FormGroup label="Описание" help="Введите описание акции...">
        <TextArea name="description" required placeholder="Описание акции">{i.description}</TextArea>
      </FormGroup>

      <FormImage help="Картинка, отображаемая на главной странице." required editing={item} image={i.cdnImage} />

      <FormGroup label="Цена" help="Задайте цену...">
        <Input name="price" placeholder="55 000 000 руб." value={i.price} />
      </FormGroup>

      <FormGroup label="Переход" help="Ссылка на страницу каталога, или сайта.">
        <Input name="href" placeholder="/каталог/москва-элитная/лениниский-проспект-дом-114" value={i.href} />
      </FormGroup>

      <FormGroup help="Добавить в специальные предложения на главной.">
        <Switch value={i.show_on_main} label="Отображать на главной" name="show_on_main"></Switch>
      </FormGroup>

      {item && <input type="hidden" name="id" value={i._id} />}

      <ErrorAlert error={error}/>
      <Success success={success} message={successMessage}/>

      <SubmitButton confirmText={confirmText} loadingText="Загрузка..." loading={formLoading} />

      {onClose &&
        <button type="button" className="FormCancelBtn btn btn-secondary" onClick={onClose}>{closeText}</button>
      }
    </Form>)
  }
}