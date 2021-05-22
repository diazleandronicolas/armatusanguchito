const arrayIngredientes = [
    { id: 1, tipo: 'pan', nombre: 'blanco', precio: 200},
    { id: 2, tipo: 'pan', nombre: 'negro', precio: 250},
    { id: 3, tipo: 'pan', nombre: 'parmesano', precio: 250},
    { id: 4, tipo: 'proteina', nombre: 'lomo', precio: 550},
    { id: 5, tipo: 'proteina', nombre: 'pollo', precio: 500},
    { id: 6, tipo: 'proteina', nombre: 'tofu', precio: 550},
    { id: 7, tipo: 'vegetal', nombre: 'tomate', precio: 60},
    { id: 8, tipo: 'vegetal', nombre: 'lechuga', precio: 40},
    { id: 9, tipo: 'vegetal', nombre: 'rucula', precio: 60},
    { id: 10, tipo: 'aderezo', nombre: 'mayonesa', precio: 50},
    { id: 11, tipo: 'aderezo', nombre: 'barbacoa', precio: 70},
    { id: 12, tipo: 'aderezo', nombre: 'picante', precio: 70},
    { id: 13, tipo: 'tostado', nombre: 'tostado', precio: 10},
    { id: 14, tipo: 'tostado', nombre: 'sin tostar', precio: 0},
]



const botonIniciarPedido = $('#btn-iniciar')
botonIniciarPedido.on ('click', () => {
    $('.modal__contenedor').toggleClass ('modal__contenedor--modificado')
})

const botonConfirmarPan = $('#form__btn__pan--siguiente')
botonConfirmarPan.on ('click', (event)=> {
    event.preventDefault()

    const pan = $('.pan__radio:checked').val()
    console.log (pan)
})



/* const botonAgregar = $('#confirmar__form')
const listaPedido = $('.lista__pedido')

botonAgregar.on('submit', (event) => {
    event.preventDefault()

    const nombre = $('.nombre__input').val()
    const telefono = $('.telefono__input').val()
    const observaciones = $('#observaciones__textarea').val()
    
    const pan = $('.pan__radio:checked').val()
    const proteina = $('.proteina__radio:checked').val()
    const vegetales = $('.vegetales__radio:checked').val()
    const aderezo = $('.aderezo__radio:checked').val()
    const tostado = $('.tostado__radio:checked').val()

    let carrito = []

    function pushear (producto) {
        carrito.push (arrayIngredientes.find (el => el.nombre == (producto)))
    }

    pushear (pan)
    pushear (proteina)
    pushear (vegetales)
    pushear (aderezo)
    pushear (tostado)

    let precioTotal = carrito.reduce ((acc, el) => acc += el.precio, 0)

    listaPedido.prepend (`
                    <h2>${nombre}, este es tu sanguche:</h2>
                    <li>Pan: ${pan}</li>
                    <li>Proteina: ${proteina}</li>
                    <li>Vegetales: ${vegetales}</li>
                    <li>Aderezo: ${aderezo}</li>
                    <li>${tostado}</li>
                    <li>El monto total es: ${precioTotal}$</li>
                    <p>Teléfono: ${telefono}</p>
                    <p>Observaciones: ${observaciones}</p>`)
}) */