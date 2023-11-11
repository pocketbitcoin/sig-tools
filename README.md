# Sig tools

A tiny library to create and verify signature hashes.

Very useful to secure webhooks endpoints.

Inspired by [GitHub's Webhook implementation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks), the library lets you:

- create a hash signature of each request payload (using a HMAC hex digest) to be sent via HTTP header
- verify the validity of a signature

## Install

```sh
$ npm install --save @pocketbitcoin/sig-tools
```

## Usage

```js
import { createSignature, isSignatureValid } from '@pocketbitcoin/sig-tools'

const SECRET = 'MY SECRET KEY'

// create signature and send it via http header

const reqPayload = JSON.stringify({
  val: 123,
  val1: 123456
})

const signature = createSignature({
  algorithm: 'sha256',
  secret: SECRET,
  data: reqPayload
})

try {
  await axios.post('http://localhost:5000/my-webhook-endpoint', reqPayload, {
    headers: {
      'x-sig-256': signature,
      'content-type': 'application/json'
    }
  })
} catch (err) {
  console.log(err.response.data)
}

// verify signature (Express example)

const valid = isSignatureValid({
  algorithm: 'sha256',
  secret: SECRET,
  data: req.rawBody,
  signature: req.headers['x-sig-256']
})
```

## Tests

```sh
$ npm run test
```

[MIT License](LICENSE.md)
