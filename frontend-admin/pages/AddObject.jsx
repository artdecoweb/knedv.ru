import { Component } from 'preact'
import ObjectForm from './Forms/Object'

class AddObject extends Component {
  /**
   * Add object is the page
   */
  render ({ onLoad, id }) {
    if (id) {
      // edit
      return (
        <ObjectForm
          title="Редактировать Объект"
          id={id}path="/admin-data?objects"
          successMessage="Объект успешно отредактирован!"
          confirmText="Сохранить"/>)
    }
    return (
      <ObjectForm title="Добавить Объект" submitFinish={async (res) => {
        if (onLoad) onLoad(res)
        const d = await res.json()
        const { data } = d
        this.setState({ id: data })
      }} path="/admin-data?objects" successMessage="Объект успешно добавлен!" confirmText="Добавить" addedId={this.state.id} />)
  }
}

export default AddObject