import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { createSignature, isSignatureValid } from './'

const payload = JSON.stringify({
  val: 123,
  val1: 123456
})
const SECRET = '96eb2c74343a6d58590ea4a06ab13d24da4affc4'
const expected =
  'sha256=89cc7396704998f25bd0019bdc2ec30de78ff0c89add39685b30df608ba2a8d6'

test('createSignature', () => {
  const signature = createSignature({
    algorithm: 'sha256',
    secret: SECRET,
    data: payload
  })

  assert.equal(signature, expected, 'should match')
})

test('isSignatureValid', () => {
  const valid = isSignatureValid({
    algorithm: 'sha256',
    secret: SECRET,
    data: payload,
    signature: expected
  })

  assert.is(valid, true, 'should match')
})

test.run()
