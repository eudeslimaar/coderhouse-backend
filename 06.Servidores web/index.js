const express = require('express')
const fs = require('fs')

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo
  }

  async save(object) {
    let idDinamic
    try {
      let archivo = await fs.promises.readFile(
        `./${this.nombreArchivo}`,
        'utf-8'
      )
      let producto
      if (archivo !== '') {
        producto = JSON.parse(archivo)
        let count = producto.length
        object.id = producto[count - 1].id + 1
        producto.push(object)
      } else {
        object.id = 1
        producto = [object]
      }
      try {
        await fs.promises.writeFile(
          `./${this.nombreArchivo}`,
          JSON.stringify(producto, null, 2),
          'utf-8'
        )
        idDinamic = object.id
        console.log(producto)
        console.log('exito al generar id: ' + idDinamic)
      } catch (err) {
        throw err
      }
    } catch (err) {
      object.id = 1
      try {
        await fs.promises.writeFile(
          `./${this.nombreArchivo}`,
          JSON.stringify([object], null, 2),
          'utf-8'
        )
        console.log('exito: ' + object.id)
      } catch (err) {
        throw err
      }
    }
  }

  async getById(id) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
      const productos = JSON.parse(archivo)
      const producto = productos.find(x => x.id == id)
      if (producto == undefined) {
        console.log('No existe producto con este ID')
        return null
      } else {
        return producto
      }
    } catch (err) {
      console.error(err)
    }
  }
  async getAll() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
      const productos = JSON.parse(archivo)

      return productos
    } catch (err) {
      console.error(err)
    }
  }

  //Borra el producto con el id correspondiente si existe
  async deleteById(id) {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
      const productos = JSON.parse(archivo)
      const indice = productos.findIndex(x => x.id == id)
      if (indice == -1) {
        console.log('No existe producto con este ID')
      } else {
        productos.splice(indice, 1)
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(productos, null, 4)
        )
        console.log('Producto Borrado con Exito')
      }
    } catch (err) {
      console.error(err)
    }
  }

  async deleteAll() {
    try {
      const productos = []
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(productos, null, 4)
      )
      console.log('Todos los productos borrados con exito')
    } catch (err) {
      console.error(err)
    }
  }
}

const contenedor = new Contenedor('productos.txt')

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server on, port: ${8080}!`)
})
server.on('error', error => console.log(`Error on server ${error}`))

app.get('/', (req, res) => {
  res.send(console.log('Status : ok!'))
})

app.get('/productos', async (req, res) => {
  const productos = await contenedor.getAll()
  res.send(productos)
})

app.get('/productoRandom', async (req, res) => {
  const productos = await contenedor.getAll()
  const random = Math.floor(Math.random() * productos.length)
  // console.log(random)
  const producto = await contenedor.getById(random)
  res.send(producto)
})
