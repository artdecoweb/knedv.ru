import render from '@depack/render'

const App = ({ prod }) => <html lang="ru" style="height: 100%;">
  <head>
    <title>Редактор Статей</title>
    <link rel="stylesheet" href="/website/trumbowyg.min.css"/>
    <link rel="stylesheet" href="/website/trumbowyg.colors.css"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
    <style>
      {
        `.trumbowyg-box {
          margin-top: 0;
          height: 90%;
          background: white;
        }
        body { background: #efefef; }
        `
      }
    </style>
  </head>
  <body style="height: 100%">
    <div id="trumbowyg"/>
    <a id="Save" href="#" className="btn btn-success ml-2">Сохранить</a>
    <a id="Close" href="#" className="btn btn-light mr-2" style="float:right;">Закрыть</a>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
    <script src="/node_modules/trumbowyg/dist/trumbowyg.js"></script>
    <script type="text/javascript" src="/trumbowyg/dist/langs/ru.min.js"></script>
    <script src="/trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js"></script>
    <script src="/trumbowyg/dist/plugins/upload/trumbowyg.upload.min.js"></script>
    <script src="/website/editor.js"></script>
  </body>
</html>

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const { PROD } = ctx
  ctx.body = '<!doctype html>' + render(<App prod={PROD}/>)
}
export default route

export const middleware = r => ['session', 'checkAdmin', r]

export const aliases = ['/admin/editor']