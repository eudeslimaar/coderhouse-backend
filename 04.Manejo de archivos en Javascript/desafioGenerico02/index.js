const fs = require('fs')
const ruta = './package.json'
const stats = fs.statSync(ruta)

fs.readFile(ruta, 'utf-8', (err, contenido) => {
  if (err) throw new Error(`No se puede leer el archivo: ${err.message}`)

  const info = {
    contenidoStr: JSON.stringify(contenido),
    contenidoObj: JSON.parse(contenido),
    size: `${stats.size} bytes`,
  }
  console.log(info)
  fs.writeFile('info.txt', JSON.stringify(info, null, 2), err => {})
})
