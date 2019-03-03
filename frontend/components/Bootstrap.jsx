import { Component } from 'preact'

/**
 * The Bootstrap row.
 */
export const Row = ({ children, className, ...props }) => {
  const cl = `row${className ? ` ${className}` : ''}`
  return <div className={cl} {...props}>{children}</div>
}

/**
 * The Bootstrap column.
 */
export const Col = ({ children, className, ...props }) => {
  const cl = `col${className ? ` ${className}` : ''}`
  return <div {...props} className={cl}>{children}</div>
}
export const A = ({ onClick, className, ...props }) => {
  return (<a className={className} href="#" {...props} onClick={(e) => {
    e.preventDefault()
    onClick(e)
    return false
  }}/>)
}

const Input = ({ textarea, required, name, placeholder, id, hid, type, file, value }) => {
  const props = { 'required': required, 'name': name, 'placeholder': placeholder, 'className': `form-control${file ? '-file' : ''}`, 'id': id, 'aria-describedby': hid }
  const input = textarea ? <textarea rows={typeof textarea == 'number' ? textarea : 3} {...props}>{value}</textarea> : <input type={type} {...props} {...(value ? { 'value': value } : {})}/>
  return input
}

export const FormRow = ({
  label, type = 'text', placeholder, name, help, textarea,
  required, file, value, options, selectedOption,
}) => {
  const id = `i${Math.random() * 100000}`
  const hid = `h${id}`

  const commonProps = {
    hid, id, value, name, required,
  }
  const I = options ? <Select options={options} selectedOption={selectedOption} {...commonProps} /> : <Input textarea={textarea} placeholder={placeholder} type={type} file={file} {...commonProps}/>

  return <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {I}
    {help && <small id={hid} className="form-text text-muted" dangerouslySetInnerHTML={{ __html: help }}/>}
  </div>
}

const Select = ({ options, name, value, required, id, hid }) => {
  return <select name={name} value={value} className="custom-select" required={required} id={id} aria-describedby={hid}>
    <option></option>
    {options.map(({ value: v, title }) => {
      return <option key={v} value={v} selected={v==value}>
        {title}
      </option>
    })}
  </select>
}

export const Icon = ({ icon }) =>
  <span><i className={icon}></i> </span>

export class Switch extends Component {
  shouldComponentUpdate(_, __, newContext) {
    const { name } = this.props
    return this.context.values[name] != newContext.values[name]
  }
  componentDidMount() {
    const { value, name } = this.props
    const { onChange } = this.context
    if (value !== undefined) onChange(name, value)
  }
  render({ name, label, value, required }) {
    const  { id, onChange, hid, values = {} } = this.context
    const rendered = name in values // for SSR
    return (<div className="custom-control custom-switch">
      <input
        required={required !== undefined}
        name={name}
        checked={rendered ? values[name] : value}
        type="checkbox"
        className="custom-control-input"
        id={id}
        aria-described-by={hid}
        onChange={(e) => {
          onChange(name, e.currentTarget.checked)
        }}/>
      <label className="custom-control-label" htmlFor={id}>{label}</label>
    </div>)
  }
}

export const ErrorAlert = ({ error }) => {
  if (!error) return null
  if (typeof error != 'string') error = 'Ошибка'
  return (<div className="alert alert-danger mt-3" role="alert">{error}</div>)
}

export const Success = ({ success, message }) => {
  if (!success) return null
  return (<div className="alert alert-success mt-3" role="alert">{message || success}</div>)
}