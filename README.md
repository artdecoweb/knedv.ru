# @artdeco/knedv.ru

[![npm version](https://badge.fury.io/js/@artdeco/knedv.ru.svg)](https://npmjs.org/package/@artdeco/knedv.ru)

`@artdeco/knedv.ru`: The Realty Corporation 21 Century Website.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

- [Server](#server)
  * [`ServerOptions`](#type-serveroptions)
- [Dokku Deploy](#dokku-deploy)
- [@idio/mailru](#idiomailru)
- [.env](#env)
- [Development](#development)
  * [Gallery2](#gallery2)
  * [Streaming Response](#streaming-response)
  * [Authentication](#authentication)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Server

The server can be configured using a number of options.

`import('node-exiftool').ExiftoolProcess` __<a name="type-exiftoolprocess">`ExiftoolProcess`</a>__

__<a name="type-serveroptions">`ServerOptions`</a>__: The options accepted by the server.

|        Name        |                    Type                    |                                        Description                                        | Default |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------- | ------- |
| port               | _number_                                   | What port to start on.                                                                    | `5000`  |
| PROD               | _boolean_                                  | Whether this is a production server.                                                      | `false` |
| watch              | _boolean_                                  | Watch routes for changes.                                                                 | `true`  |
| __database_url*__  | _string_                                   | The MongoDB connection string.                                                            | -       |
| __client_id*__     | _string_                                   | The Mail.ru app id for admin authentication. Add new at https://api.mail.ru/sites/my/add. | -       |
| __client_secret*__ | _string_                                   | The Mail.ru app secrte for admin authentication.                                          | -       |
| elastic            | _string_                                   | The URL of the ElasticSearch for logging the requests.                                    | -       |
| exiftool           | _[ExiftoolProcess](#type-exiftoolprocess)_ | The open Exiftool process.                                                                | -       |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Dokku Deploy

To deploy on a Dokku host, an app needs to be created first, and the `DOKKU_LETSENCRYPT_EMAIL` should be set. Locally, the following command will add a remote git repo that can be used for deploy:

```sh
git add remove dokku dokku@artd.eco:@artdeco/knedv.ru
```

On the host, the app need to be prepared first.

```sh
dokku apps:create @artdeco/knedv.ru
dokku config:set --no-restart @artdeco/knedv.ru DOKKU_LETSENCRYPT_EMAIL=ssh@adc.sh
# deploy from git
dokku letsencrypt @artdeco/knedv.ru
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## @idio/mailru

The Mail.ru OAuth is implemented with `@idio/mailru` that adds the `/auth/mailru` and `/auth/mailru/redirect` paths to redirect to the log-in dialog, and then exchange the short-lived token for a long-lived one.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## .env

The local environment can be setup using the `.env` file:

```sh
AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=ex;AccountKey=asdf78123ghjs/ahsjdgf765asd54==;EndpointSuffix=core.windows.net"
STORAGE=storage
CONTAINER=container
SECRET=facebook-secret
```

It is available when running the app both via `src/bin` and via `build/bin` directories, however the production entry is `build/bin/app.js`.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true"></a></p>

## Development

There are a number of solutions used in the making of the website.

### Gallery2

Uploading to the Azure bucket can be done, when the `window['AzureStorage']` is present on the page.

```jsx
{loggedIn &&
  <script src="/azure.js"></script>
}
```

Then the _Photo_ component can implement the `upload` method by using the `blobService` that it will receive in its properties.

```js
if (blobService) {
  const blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512
  blobService.singleBlobPutThresholdInBytes = blockSize
  const speedSummary = blobService.createBlockBlobFromBrowserFile(
    'web-uploads', file.name, file,
    { blockSize },
    (error, result) => {
      this.setState({ uploaded: true, progress: null })
      if(error) {
        // Handle blob error
        this.setState({ error: error.message })
      } else {
        console.log('Upload is successful')
      }
    })
  speedSummary.on('progress', () => {
    const process = speedSummary.getCompletePercent()
    this.updateProgress(process)
  })
}
```

However, there is a disadvantage to it because the upload will be done in blocks and the progress won't be clear, when the smaller the blocks the higher the cost, and the upload progress doesn't work in Chrome even with small block sizes. There is also no synchronous control over the reception of the image to the server, and it must be processed, which can be done by a lambda function triggered by a blob upload. This also requires an installation of the Storage extension, whereas the HTTP trigger does not require that. Therefore, the best serverless solution for the upload, is to have an Azure function that receives the file, processes it, and stores on Blob Storage. One disadvantage is that Azure Functions Node.JS API does not provide access to the streaming request, and the whole file needs to be uploaded before the function can start.

```js
// Creating blob service from AzureStorage library
if (name && sas) {
  const blobUri = `https://${name}.blob.core.windows.net`
  blobService = window['AzureStorage'].Blob.createBlobServiceWithSas(blobUri, sas)
}
```

The disadvantage of the **serverless** approach is that the function will have a cold start time when not run within the last 40 minutes. This could be overcome, for example, by having a server receiver to receive some files when a request is sent to the function to warm up. When the function is known to be up, the URL for uploads can be swapped real-time on the web-page.

### Streaming Response

It could potentially be possible to notify the client about each stage of processing the file. The response on the server will just be a `Writable` stream, to which JSON-serialised data will be pushed at each step, such as reading metadata, and generating previews for different sizes. The browser needs to listen for the `xhr.readystatechange` event with when the state is `3`.

```js
if(xhr.readyState == 3) {
  const newData = xhr.response.substr(xhr.seenBytes)
  xhr.seenBytes = xhr.responseText.length
  lastData = newData
  if (lastData) {
    try {
      lastData = JSON.parse(lastData)
    } catch (err) {/**/}
  }
  return
}
```

In such way, the user can receive a more detailed feedback to what is going on. This, however, is impossible to implement with Azure functions because they don't support streaming. Only in .NET it could be possible.

```js
import { Readable } from 'stream'
ctx.body = new Readable({
  read() {},
})
promise.catch((err) => {
  ctx.body.push(JSON.stringify({ error: err.message }))
  ctx.body.push(null)
})
const communicate = (ctx, obj) => {
  ctx.body.push(JSON.stringify(obj))
}
communicate(ctx, { previewM: cdnImageM })
communicate(ctx, { previewS: cdnImageS })
communicate(ctx, { metadata })
communicate(ctx, { photo_id: 'ASSIGN THE ID HERE' })
ctx.body.push(null)
```

### Authentication

The authentication is performed by generating the SAS token on the server, and passing it to the Azure function, which then validates the token by attempting to upload the document into the store. If it was fine, it continues to save the picture in the database.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>