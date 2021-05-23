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

let carrito = []


const listaResumen = $('.lista__pedido')
const botonIniciarPedido = $('#btn-iniciar')
const botonConfirmarPan = $('#form__btn__pan--siguiente')
const botonConfirmarProteina = $('#form__btn__proteina--siguiente')
const botonConfirmarVegetales = $('#form__btn__vegetales--siguiente')


// Activando modal principal
botonIniciarPedido.on ('click', () => {
    $('.modal__contenedor').toggleClass ('modal__contenedor--modificado')
})

function ingredientesPedido (carrito) {
    carrito.forEach ( (el) => {
        listaResumen.append (`
                    <li>Usted eligió ${el.tipo} ${el.nombre}</li>`)            
    })
}

// Agregando producto elegido al carrito
function agregarCarrito (producto) {
    carrito.push (arrayIngredientes.find (el => el.nombre === (producto)))
    console.log (carrito)
    ingredientesPedido (carrito)
}

function totalPedido () {
    let total = carrito.reduce ((acc, el) => acc += el.precio, 0)

    console.log (total)
    listaResumen.append (`<p>${total}</p>`)
}

// Captando valor de radio button pan.
function elegirPan() {
    botonConfirmarPan.on ('click', (event)=> {
        event.preventDefault()
    
        const pan = $('.pan__radio:checked').val()
    
        agregarCarrito (pan)        
    
        $('.seccion__pan').toggleClass ('seccion__pan--modificado')
        $('.seccion__proteina').addClass ('seccion__proteina--modificado')
    })
}

function elegirProteina () {
    botonConfirmarProteina.on ('click', (event) => {
        event.preventDefault()
        
        const proteina = $('.proteina__radio:checked').val()
        
        agregarCarrito (proteina)
/*         ingredientesPedido (proteina)
        totalPedido (proteina) */

        $('.seccion__proteina').toggleClass ('seccion__proteina--modificado')
        $('.seccion__vegetales').toggleClass('seccion__vegetales--modificado')
        
    })
}

function elegirVegetales () {
    botonConfirmarVegetales.on ('click', (event) => {
        event.preventDefault ()
        const vegetales = []

        $("input:checkbox:checked").each(function() {
            const vegetalesCheckbox = $(this).val()
            vegetales.push (vegetalesCheckbox)
        })

        for (let vegetal of vegetales) {
            agregarCarrito (vegetal)
        }
        ingredientesPedido (vegetales)
        totalPedido (vegetales)

    })
}

elegirPan()
elegirProteina ()
elegirVegetales()

console.log (carrito)







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