import Form, {
  FormGroup, Input, TextArea, SubmitForm, SubmitButton,
} from '@depack/form'
import { Success, ErrorAlert } from '../../../frontend/components/Bootstrap'
import FormImage from '../../Components/FormImage'

export default class GalleryForm extends SubmitForm {
  render({ item, onClose, closeText = 'Отмена', successMessage, confirmText = 'Добавить' }) {
    const i = item || {}
    const { formLoading, error, success } = this.state
    return (<Form onSubmit={this.submit.bind(this)} onChange={() => {
      this.reset()
    }}>
      <FormGroup label="Название" help="Заголовок альбома для выбора на странице объекта.">
        <Input placeholder="Мосфильмовская, дом 70к6" name="title" required value={i.title}/>
      </FormGroup>
      <FormGroup label="Описание" help="Введите описание акции...">
        <TextArea name="description" required={true} placeholder="Описание Альбома">{i.description}</TextArea>
      </FormGroup>

      <FormImage help="Картинка для узнаваемости." required editing={item} image={i.cdnImage} />

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