const header = {
  typ: 'JWT',
  alg: 'HS256',
}
const payload = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
}
const jwtSecret = 'supersecretdonotsharewithanyone!'

// function for encoding

const encode = (obj) => {
  //   const encoded = btoa(JSON.stringify(obj))
  const encoded = Buffer.from(JSON.stringify(obj)).toString('base64')
  return encoded
}

console.log(`

SENDING

${JSON.stringify(header, null, 2)},
${JSON.stringify(payload, null, 2)}

`)

const encodedHeader = encode(header)
const encodedPayload = encode(payload)

console.log(`

Check Encoding

${encodedHeader},
${encodedPayload}

`)

const encodingReplacements = {
  '+': '-',
  '/': '_',
  '=': '',
}

const cleanEncoded = (encodedString) => {
  const cleanEncodedString = encodedString.replace(
    /[+/=]/g,
    (match) => encodingReplacements[match]
  )
  console.log(`xxx${cleanEncodedString}`)
  return cleanEncodedString
}

const cleanEncodedHeader = cleanEncoded(encodedHeader)
const cleanEncodedPayload = cleanEncoded(encodedPayload)

console.log(`

Check Cleaning

${cleanEncodedHeader},
${cleanEncodedPayload}

`)

// now we need to clean these values
