import ObjectForm from './Forms/Object'

/**
 * Add object is the page
 */
const AddObject = ({ onLoad }) => {
  return (
    <ObjectForm title="Добавить Объект" submitFinish={onLoad} path="/admin-data?objects" successMessage="Объект успешно добавлен!" confirmText="Добавить" />)
}
export default AddObject