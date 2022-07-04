const fs = require('fs')

// subescribe y si el archivo no existe lo crea.
fs.writeFileSync('./produtos.txt', 'Archivo modificado!')
// Modifica y si el archivo no existe lo crea.
fs.appendFileSync('./produtos.txt', ' Mejorado!')
// Para leer el Archivo.
const message = fs.readFileSync('./produtos.txt', 'utf-8')

//manejo de errores
try {
  const rutaX = fs.readFileSync('./aradad.tx')
  console.log(rutaX)
} catch (err) {
  console.log('Error on path!', err)
}

console.log(message)
