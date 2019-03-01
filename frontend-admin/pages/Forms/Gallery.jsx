import Form, { FormGroup, Input, TextArea } from '@depack/form'
import { Success, ErrorAlert } from '../../../frontend/components/Bootstrap'
import FormImage from '../../Components/FormImage'
import SpecialForm from '../../Components/SpecialForm'

export default class GalleryForm extends SpecialForm {
  render({ item, onClose, closeText = 'Отмена', successMessage, confirmText = 'Добавить' }) {
    const i = item || {}
    const { formLoading } = this.state
    return (<Form onSubmit={this.submit.bind(this)} onChange={() => {
      this.setState({ error: null, success: null })
    }}>
      <FormGroup label="Название" help="Заголовок альбома для выбора на странице объекта.">
        <Input placeholder="Мосфильмовская, дом 70к6" name="title" required value={i.title}/>
      </FormGroup>
      <FormGroup label="Описание" help="Введите описание акции...">
        <TextArea name="description" required={true} placeholder="Описание Альбома">{i.description}</TextArea>
      </FormGroup>

      <FormImage help="Картинка для узнаваемости." required editing={item} image={i.cdnImage} />

      {item && <input type="hidden" name="id" value={i._id} />}

      <ErrorAlert error={this.state.error}/>
      <Success success={this.state.success} message={successMessage}/>

      <button type="submit" className="btn btn-primary" disabled={formLoading}>
        {formLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>}

        {formLoading ? 'Загрузка...' : confirmText}
      </button>

      {onClose &&
        <button type="button" className="FormCancelBtn btn btn-secondary" onClick={onClose}>{closeText}</button>
      }
    </Form>)
  }
}