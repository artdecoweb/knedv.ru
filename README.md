# @artdeco/knedv.ru

[![npm version](https://badge.fury.io/js/@artdeco/knedv.ru.svg)](https://npmjs.org/package/@artdeco/knedv.ru)

`@artdeco/knedv.ru`: The Realty Corporation 21 Century Website.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

- [Server](#server)
  * [`ServerOptions`](#type-serveroptions)
- [deploy on a Dokku](#deploy-on-a-dokku)
- [@idio/mailru](#idiomailru)
- [.env](#env)
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

## Dokku Deploy

To <a name="deploy-on-a-dokku">deploy on a Dokku</a> host, an app needs to be created first, and the `DOKKU_LETSENCRYPT_EMAIL` should be set. Locally, the following command will add a remote git repo that can be used for deploy:

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

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>