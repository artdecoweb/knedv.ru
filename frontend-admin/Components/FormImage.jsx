import { Component } from 'preact'
import { FormGroup, Input } from '@depack/form'

/**
 * The image for the form that can be changed.
 */
class FormImage extends Component {
  constructor() {
    super()
    this.state = { resetImage: false }
    /** @type {{ editing: boolean, required: boolean, image: string, help: string }} */
    this.props = this.props
  }
  render({ editing, required, image, help }) {
    const { resetImage } = this.state
    if (editing && !resetImage) return <FormGroup label="Изображение" help={help}>
      <br/>
      <img className="img-fluid" src={image} />
      <a href="#" className="btn btn-outline-warning" onClick={(e) => {
        e.preventDefault()
        this.setState({ resetImage: true })
        return false
      }}>Изменить</a>
    </FormGroup>
    if(!editing || resetImage) return <FormGroup label="Изображение" help={help}>
      <Input name="image" type="file" file="1" required={required} />
    </FormGroup>
    return null
  }
}

export default FormImage