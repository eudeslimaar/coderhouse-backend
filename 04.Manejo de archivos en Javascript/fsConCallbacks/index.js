const fs = require('fs')

fs.mkdir('./files', () => {
  try {
    if (crear === false) {
      console.log('Archivo ya existente!')
    } else {
      console.log('Archivo creado!')
    }
  } catch (err) {
    console.log(err)
  }
})
