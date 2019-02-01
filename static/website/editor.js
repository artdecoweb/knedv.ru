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

$('#trumbowyg').trumbowyg({
  lang: 'ru',
  btns: [
    ['viewHTML'],
    ['undo', 'redo'], // Only supported in Blink browsers
    ['formatting'],
    ['strong', 'em', 'del'],
    ['link'],
    ['insertImage'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
    ['unorderedList', 'orderedList'],
    ['horizontalRule'],
    ['removeformat'],
    ['fullscreen'],
    ['foreColor', 'backColor'],
  ],
})

const data = window.opener.editorGetData()
$('#trumbowyg').trumbowyg('html', data)