# JSON Scrambler Proxy

**An HTTP Proxy that uses [json-scrambler](https://github.com/sbarre/json-scrambler) to scramble upstream responses in realtime.**

## What is this about?

An easy way to proxy any HTTPS API that returns JSON and apply JSON Scrambler to the response before returning it to the client.

## Installation

Create a `.env` file in the directory with the following values:

| Variable Name | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| PORT          | The port on which you want to run the proxy server (default: **3000**)                         |
| UPSTREAM      | The full URL to the API you want to proxy (default: **http://localhost:4000)**                 |
| CHAOS         | The `chaos` property to pass to `json-scrambler`, a value between 0 and 100. (default: **10**) |

Then run:

```
npm start
```

Docker configuration coming soon!
