class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }
  addMascotas(mascota) {
    return this.mascotas.push(mascota)
  }
  countMascotas() {
    return this.mascotas.length
  }
  addBook(nombre, autor) {
    return this.libros.push({ nombre: nombre, autor: autor })
  }
  getBookNames() {
    const bookNames = []
    this.libros.forEach(libro => {
      bookNames.push(libro.nombre)
    })
    return bookNames
  }
}

const usuario = new Usuario(
  'Eudes',
  'lima',
  [
    { nombre: 'El conde Del Monte Cristo', autor: 'Alexandre Dumas' },
    {
      nombre: 'Lost Symbol',
      autor: 'Dawn Brown',
    },
  ],
  ['Pajaro', 'gato']
)

const infoUser = user =>
  console.log(`
  Hola, ${user.getFullName()}.
  Mascotas: ${user.mascotas}(${user.countMascotas()} mascotas).
  Libros: ${user.getBookNames()}(${user.libros.length} libros).
`)

infoUser(usuario)
usuario.addBook('Player One', 'Ernest cline')
usuario.addMascotas('Perro')
infoUser(usuario)
