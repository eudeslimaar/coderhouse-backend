const fs = require('fs')

try {
  const date = new Date()
  fs.writeFileSync('./fdyh.txt', date.toString())
  const readFile = fs.readFileSync('./fyh.txt', 'utf-8')
  console.log(readFile)
} catch (err) {
  console.log(err)
  throw new Error(error)
}

fs.readFileSync('./fyh.txt', 'utf-8')
