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

%~%