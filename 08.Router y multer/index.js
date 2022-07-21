const express = require('express')
const Contenedor = require('./src/contenedor')
const { Router } = express

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const router = Router()
const productos = new Contenedor(__dirname + '/src/data/productos.json')

app.use('/api/productos', router)
app.use(express.static('./public'))

router.get('/', (req, res) => {
  return res.json(productos.content)
})

router.get('/:id', (req, res) => {
  let id = Number(req.params.id)
  return res.json(productos.getById(id))
})

router.post('/', (req, res) => {
  let obj = req.body
  return res.json(productos.save(obj))
})

router.put('/:id', (req, res) => {
  let obj = req.body
  let id = Number(req.params.id)
  return res.json(productos.update(id, obj))
})

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id)
  return res.json(productos.deleteById(id))
})

app.listen(8080, () => {
  console.log('Server on!')
})
