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
export const Col = ({ children }) => {
  return <div className="col">{children}</div>
}

/**
 * The Top Menu Column.
 */
export const TopMenuCol = ({ children }) => {
  return <div className="TopMenuCol h-100 p-2 pl-3 pr-3">{children}</div>
}