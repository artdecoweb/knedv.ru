import popup from '@lemuria/popup'

const ArticleEditor = ({ article, onSave, name }) => {
  return (<div className="form-group">
    <label>Статья</label>
    <div className="mb-3 ArticleHolder" dangerouslySetInnerHTML={{ __html: article }}/>
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
    <input type="hidden" name={name} value={article} />
  </div>)
}

export default ArticleEditor