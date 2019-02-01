/* eslint-env browser */
document.querySelector('#Save').onclick = (e) => {
  e.preventDefault()
  const html = $('#trumbowyg').trumbowyg('html')
  window.opener.editorCallback(html)
  return false
}
document.querySelector('#Close').onclick = () => {
  window.close()
}
const data = window.opener.editorGetData()
$('#trumbowyg').trumbowyg('html', data)