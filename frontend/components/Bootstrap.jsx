/**
 * The Bootstrap row.
 */
export const Row = ({ children, className, style }) => {
  const cl = `row${className ? ` ${className}` : ''}`
  return <div className={cl} style={style}>{children}</div>
}

/**
 * The Bootstrap column.
 */
export const Col = ({ children, className }) => {
  const cl = `col${className ? ` ${className}` : ''}`
  return <div className={cl}>{children}</div>
}