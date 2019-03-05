import { Component } from 'preact'
import CategoryForm from './Forms/Category';

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

  // async submit(e) {
  //   this.setState({ error: null })
  //   e.preventDefault()
  //   const data = new FormData(e.currentTarget.data)
  //   this.setState({ formLoading: true })
  //   try {
  //     const res = await fetch('/admin-data?categories', {
  //       method: 'POST',
  //       body: data,
  //     })
  //     const { error } = await res.json()
  //     if (error) this.setState({ error })
  //     else this.setState({ success: 1 })
  //   } catch (error) {
  //     this.setState({ error })
  //   } finally {
  //     this.setState({ formLoading: false })
  //   }
  //   return false
  // }
  // onFormChange(values) {
  //   const newSeo = values.seo
  // }
  render({ onLoad }) {
    return (<CategoryForm title="Добавить Категорию" submitFinish={async (res) => {
      if (onLoad) onLoad(res)
      const d = await res.json()
      const { 'data': data } = d
      this.setState({ id: data })
    }} path="/admin-data?categories" successMessage="Категория успешно добавлена!" confirmText="Добавить" addedId={this.state.id} />)
  }
}