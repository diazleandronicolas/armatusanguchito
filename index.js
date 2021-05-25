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
    { id: 13, tipo: 'tostado', nombre: 'tostado', precio: 0},
    { id: 14, tipo: 'tostado', nombre: 'sin tostar', precio: 0},
]

let carrito = []


const listaResumen = $('.lista__pedido')

const botonIniciarPedido = $('#btn-iniciar')

const botonCancelarProteina = $('#form__btn__proteina--atras')

const botonConfirmarPan = $('#form__btn__pan--siguiente')
const botonConfirmarProteina = $('#form__btn__proteina--siguiente')
const botonConfirmarVegetales = $('#form__btn__vegetales--siguiente')
const botonConfirmarAderezo = $('#form__btn__aderezo--siguiente')
const botonConfirmarTostado = $('#form__btn__tostado--siguiente')
const botonConfirmarDatos = $('#form__btn__datos--siguiente')

const inputNombre = $('.nombre__input')
const inputTelefono = $('.telefono__input')
const inputCalle = $('.calle__input')
const inputAltura = $('.altura__input')


// Activando modal principal
botonIniciarPedido.on ('click', () => {
    $('.modal__contenedor').toggleClass ('modal__contenedor--modificado')

    elegirPan()
})

// Iterando elementos del carrito para armar la lista del pedido
function ingredientesPedido (carrito) {

    carrito[carrito.length-1];{
        listaResumen.append (`
            <li>Usted eligió ${carrito[carrito.length-1].tipo} ${carrito[carrito.length-1].nombre}</li>`)            
    }

}

// Agregando producto elegido al carrito
function agregarCarrito (producto) {
    carrito.push (arrayIngredientes.find (el => el.nombre === (producto)))

    ingredientesPedido (carrito)
    totalPedido(carrito)

}

// Contador del precio total
function totalPedido (carrito) {
    let total = carrito.reduce ((acc, el) => acc += el.precio, 0)

    listaResumen.append (`<p>${total}</p>`)
}

// Captando valor de radio button PAN.
function elegirPan() {
    botonConfirmarPan.on ('click', (event)=> {
        event.preventDefault()
    
        const pan = $('.pan__radio:checked').val()
    
        agregarCarrito (pan)        
    
        $('.seccion__pan').addClass ('seccion__pan--modificado')
        $('.seccion__proteina').addClass ('seccion__proteina--modificado')

        elegirProteina ()
    })
}

function pasoAnterior () { 

    listaResumen.empty ()   
    carrito.pop()       

    console.log (carrito)
}

// Captando valor de radio button PROTEINA.
function elegirProteina () {
    botonConfirmarProteina.on ('click', (event) => {
        event.preventDefault()
        
        const proteina = $('.proteina__radio:checked').val()
        
        agregarCarrito (proteina)

        $('.seccion__proteina').toggleClass ('seccion__proteina--modificado')
        $('.seccion__vegetales').toggleClass('seccion__vegetales--modificado')
        
        elegirVegetales()
    })

    botonCancelarProteina.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__proteina').removeClass('seccion__proteina--modificado')
        $('.seccion__pan').removeClass('seccion__pan--modificado')

        pasoAnterior()
    })
}

// Captando valores de checkbox VEGETALES.
function elegirVegetales () {
    botonConfirmarVegetales.on ('click', (event) => {
        event.preventDefault ()

        const vegetales = []

        $(".vegetales__checkbox:checkbox:checked").each(function() {
            const vegetalesCheckbox = $(this).val()
            vegetales.push (vegetalesCheckbox)
        })

        for (let vegetal of vegetales) {
            agregarCarrito (vegetal)
        }

        $('.seccion__vegetales').toggleClass ('seccion__vegetales--modificado')
        $('.seccion__aderezo').toggleClass ('seccion__aderezo--modificado')

        elegirAderezo()
    })
}

function elegirAderezo (){
    botonConfirmarAderezo.on ('click', (event) => {
        event.preventDefault ()

        const aderezos = []

        $(".aderezo__checkbox:checkbox:checked").each(function() {
            const aderezosCheckbox = $(this).val()
            aderezos.push (aderezosCheckbox)
        })

        for (let aderezo of aderezos) {
            agregarCarrito (aderezo)
        }

        console.log (aderezos)

        $('.seccion__aderezo').toggleClass ('seccion__aderezo--modificado')
        $('.seccion__tostado').addClass ('seccion__tostado--modificado')
        elegirTostado ()
    })
}

function elegirTostado() {
    botonConfirmarTostado.on ('click', (event)=> {
        event.preventDefault()
    
        const tostado = $('.tostado__radio:checked').val()
    
        $('.seccion__tostado').toggleClass ('seccion__tostado--modificado')
        $('.seccion__datos').addClass ('seccion__datos--modificado')
        agregarCarrito (tostado)
        
        completarDatos()
    })
}

function completarDatos () {
    botonConfirmarDatos.on ('click', (event) => {
        event.preventDefault ()

        const datos = []

        const nombre = inputNombre.val()
        const telefono = inputTelefono.val()
        const calle = inputCalle.val()
        const altura = inputAltura.val()

        const pushearDatos = (nombre, telefono, calle, altura) => {
            datos.push (nombre, telefono, calle, altura)
        }

        pushearDatos (nombre, telefono, calle, altura)
    
        $('.seccion__datos').toggleClass ('seccion__datos--modificado')
        $('.seccion__resumen').addClass ('seccion__resumen--modificado')

    })
}