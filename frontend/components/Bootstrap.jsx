/**
 * The Bootstrap row.
 */
export const Row = ({ children, className }) => {
  const cl = `row${className ? ` ${className}` : ''}`
  return <div className={cl}>{children}</div>
}

/**
 * The Bootstrap column.
 */
export const Col = ({ children, className }) => {
  const cl = `col${className ? ` ${className}` : ''}`
  return <div className={cl}>{children}</div>
}