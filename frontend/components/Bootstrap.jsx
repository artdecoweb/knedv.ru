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

export const Switch = ({ label }) => {
  const id = 'i' + Math.floor(Math.random() * 100000)
  return (<div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id={id}/>
    <label className="custom-control-label" htmlFor={id}>{label}</label>
  </div>)
}