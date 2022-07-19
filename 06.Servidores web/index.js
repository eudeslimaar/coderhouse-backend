const express = require('express')
const Contenedor = require('./src/Contenedor')

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
