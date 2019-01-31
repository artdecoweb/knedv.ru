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