# JSON Scrambler Proxy

**An HTTPS Proxy that uses [json-scrambler](https://github.com/sbarre/json-scrambler) to scramble upstream responses in realtime.**

## What is this about?

An easy way to proxy any HTTPS API that returns JSON and apply JSON Scrambler's `scramble()` to the response body before returning it to the client.

Built on [Fastify](https://fastify.dev/) and the [@fastify/http-proxy](https://github.com/fastify/fastify-http-proxy) plugin.

## Installation

Create a `.env` file in the directory with the following values:

| Variable Name   | Description                                                                                    |
| :-------------- | :--------------------------------------------------------------------------------------------- |
| PROXY_PORT      | The port on which you want to run the proxy server (default: **4000**)                         |
| PROXY_UPSTREAM  | The full URL to the API you want to proxy (default: **http://localhost:3000)**                 |
| SCRAMBLER_CHAOS | The `chaos` property to pass to `json-scrambler`, a value between 0 and 100. (default: **10**) |

Then run:

```
npm start
```

Docker configuration coming soon!

## Tests

Tests coming soon!

## LICENSE

json-scrambler-proxy is licensed under the MIT license.
