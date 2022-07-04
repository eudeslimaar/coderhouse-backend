const fs = require('fs')
let productArray = []
let productObject = {}

class Contenedor {
  constructor(nombreDelArchivo) {
    this.nombreDelArchivo = './' + nombreDelArchivo
  }

  save(producto) {
    try {
      productObject = producto
      productObject.id = productArray.length + 1
      productArray.push(productObject)
      fs.writeFileSync(
        this.nombreDelArchivo,
        JSON.stringify(productArray, null, 2)
      )
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      productArray = JSON.parse(
        await fs.promises.readFile(this.nombreDelArchivo, 'utf8')
      )
      let productById = productArray.find(product => product.id == id)
      if (productById === undefined) {
        return null
      } else {
        return productById
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAll() {
    try {
      productArray = JSON.parse(
        await fs.promises.readFile(this.nombreDelArchivo, 'utf8')
      )
      console.log(productArray)
    } catch (error) {
      console.log(error)
    }
  }

  deleteById(id) {
    try {
      productArray = JSON.parse(
        fs.readFileSync(this.nombreDelArchivo, 'utf8')
      ).filter(product => product.id != id)
      fs.writeFileSync(
        this.nombreDelArchivo,
        JSON.stringify(productArray, null, 2)
      )
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAll() {
    let emptyContent = {}
    await fs.promises.writeFile(
      this.nombreDelArchivo,
      JSON.stringify(emptyContent)
    )
  }
}

// Crear una nueva instancia de la clase contenedor
const Productos = new Contenedor('productos.txt')

// Método Save - Recibir un objeto, guardarlo en el archivo y devoler el id asignado a dicho objeto.

Productos.save({
  title: 'Escuadra',
  price: 123.45,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
})
Productos.save({
  title: 'Calculadora',
  price: 234.56,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
})
Productos.save({
  title: 'Globo Terráqueo',
  price: 345.67,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
})

// Metodos

//Productos.getAll()

// Productos.getById(3)
// Productos.deleteById(2)

// Borrar productos

//Productos.deleteAll()
//console.log(fs.readFileSync(Productos.nombreDelArchivo, 'utf8'))
