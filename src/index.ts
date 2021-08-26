import crypto from 'crypto'

export function createSignature(config: {
  algorithm: string
  secret: string
  data: string
}): string {
  const hmac = crypto.createHmac(config.algorithm, config.secret)
  hmac.update(config.data, 'utf-8')
  return config.algorithm + '=' + hmac.digest('hex')
}

export function isSignatureValid(config: {
  algorithm: string
  secret: string
  data: string | Buffer
  signature: string
}): boolean {
  try {
    const sig = Buffer.from(config.signature, 'utf8')
    const hmac = crypto.createHmac(config.algorithm, config.secret)
    const digest = Buffer.from(
      config.algorithm + '=' + hmac.update(config.data).digest('hex'),
      'utf8'
    )

    return sig.length === digest.length && crypto.timingSafeEqual(sig, digest)
  } catch (err) {
    console.log(err)
    return false
  }
}
