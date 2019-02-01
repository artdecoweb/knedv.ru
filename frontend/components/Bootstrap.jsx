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
export const Col = ({ children, className }) => {
  const cl = `col${className ? ` ${className}` : ''}`
  return <div className={cl}>{children}</div>
}

const Input = ({ textarea, required, name, placeholder, id, hid, type, file }) => {
  const props = { required, name, placeholder, className: `form-control${file ? '-file' : ''}`, id, 'aria-describedby': hid }
  const input = textarea ? <textarea rows={typeof textarea == 'number' ? textarea : 3} {...props}/> : <input type={type} {...props}/>
  return input
}

export const FormRow = ({
  label, type = 'text', placeholder, name, help, textarea,
  required, file,
}) => {
  const id = `i${Math.random() * 100000}`
  const hid = `h${id}`


  return <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <Input textarea={textarea} placeholder={placeholder} name={name} type={type} required={required} id={id} hid={hid} file={file}/>
    {help && <small id={hid} className="form-text text-muted" dangerouslySetInnerHTML={{ __html: help }}/>}
  </div>
}

export const Icon = ({ icon }) =>
  <span><i className={icon}></i> </span>