import { Component } from 'preact'
import fetch from 'unfetch'
import { Col } from '../../frontend/components/Bootstrap'

export default class Categories extends Component {
  constructor() {
    super()
    this.data = []
  }
  async componentDidMount() {
    this.loading = true
    try {
      const res = await fetch('/admin-data?categories')
      this.data = await res.json()
    } catch (err) {
      this.loading = false
      this.error = err
    }
  }
  async submit(e) {
    e.preventDefault()
    console.log(this.form)
    const data = new FormData(this.form)
    const res = await fetch('/admin-data?categories', {
      method: 'POST',
      body: data,
    })
    return false
  }
  render() {
    return <Col>
      <h1>Категории Каталога</h1>
      {this.loading & <span className="echo-loader">Loading…</span>}
      {this.data.map(({ title, image, description }) => {
        return <span>{title}</span>
      })}
      <hr/>
      <h2>Добавить Категорию</h2>
      <form
        ref={r => this.form = r}
        onSubmit={this.submit.bind(this)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group form-check">
          <input name="check" type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Col>
  }
}