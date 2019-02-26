const ArticleEditor = ({ article, onSave }) => {
  return <div className="form-group">
    <label>Статья</label>
    <div style="background: #edeee8;" className="mb-3" dangerouslySetInnerHTML={{ __html: article }}/>
    <a className="btn btn-outline-success" href="#" onClick={(e) => {
      e.preventDefault()
      window['editorCallback'] = (html) => {
        editor.close()
        onSave(html)
      }
      window['editorGetData'] = () => article
      const editor = popup('/admin/editor', 'Редактор Статей', 900, 650)
      return false
    }}>Редактировать</a>
  </div>
}

const popup = (url, title, width, height) => {
  const { top: {
    outerHeight, screenY, outerWidth, screenX,
  } } = window
  const y = outerHeight / 2 + screenY - (height / 2)
  const x = outerWidth / 2 + screenX - (width / 2)
  const w = window.open(url, title, `height=${height},width=${width},top=${y-50},left=${x}`)
  return w
}

export default ArticleEditor