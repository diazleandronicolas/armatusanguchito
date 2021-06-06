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


let resumenCarrito = false;
let resumenDatos = false;

let carrito = []
let nuevoCarrito = []

const listaPedido = $('.lista__pedido')
const listaTotal = $('.lista__total')
const listaResumen = $('.lista__resumen')

const botonIniciarPedido = $('#btn-iniciar')

const botonCancelarProteina = $('#form__btn__proteina--atras')
const botonCancelarVegetales = $('#form__btn__vegetales--atras')
const botonCancelarAderezo = $('#form__btn__aderezo--atras')
const botonCancelarTostado = $('#form__btn__tostado--atras')
const botonCancelarDatos = $('#form__btn__datos--atras')
const botonCancelarCompra = $('#form__btn__resumen--atras')

const botonConfirmarPan = $('#form__btn__pan--siguiente')
const botonConfirmarProteina = $('#form__btn__proteina--siguiente')
const botonConfirmarVegetales = $('#form__btn__vegetales--siguiente')
const botonConfirmarAderezo = $('#form__btn__aderezo--siguiente')
const botonConfirmarTostado = $('#form__btn__tostado--siguiente')
const botonConfirmarDatos = $('#form__btn__datos--siguiente')
const botonConfirmarCompra = $('#form__btn__resumen--siguiente')

const inputNombre = $('.nombre__input')
const inputTelefono = $('.telefono__input')
const inputCalle = $('.calle__input')
const inputAltura = $('.altura__input')

// Activando modal principal
botonIniciarPedido.on ('click', () => {
    $('.modal__contenedor').toggleClass ('modal__contenedor--modificado')

    elegirPan()
})

// Agregando producto elegido al carrito
function agregarCarrito (producto) {
    
    carrito.push (arrayIngredientes.find (el => el.nombre === (producto)))

    console.log (carrito)

    let lista = new Set (carrito)
    let carritoMejorado = Array.from (lista)
    
    nuevoCarrito = carritoMejorado

    console.log (nuevoCarrito)

    ingredientesPedido (nuevoCarrito)
    totalPedido(nuevoCarrito) 

}

// Iterando elementos del carrito para armar la lista del pedido
function ingredientesPedido (carrito) {

    carrito[carrito.length-1];{
        listaPedido.empty()
        listaPedido.append (`
            <li>Usted eligió ${carrito[carrito.length-1].tipo} ${carrito[carrito.length-1].nombre}</li>`)            
    }
}

// Contador del precio total
function totalPedido (carrito) {
    let total = carrito.reduce ((acc, el) => acc += el.precio, 0)
    
    listaTotal.empty()
    listaTotal.append (`<p>${total}</p>`)
}

// Función que elimina el último ingrediente seleccionado.
function pasoAnterior () { 

    listaPedido.empty ()   
    carrito.pop()

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


// Captando valor de radio button PROTEINA.
function elegirProteina () {
    botonConfirmarProteina.on ('click', (event) => {
        event.preventDefault()

        const proteina = $('.proteina__radio:checked').val()
        
        agregarCarrito (proteina)

        $('.seccion__proteina').removeClass ('seccion__proteina--modificado')
        $('.seccion__vegetales').addClass('seccion__vegetales--modificado')
        
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

        $('.seccion__vegetales').removeClass ('seccion__vegetales--modificado')
        $('.seccion__aderezo').addClass ('seccion__aderezo--modificado')

        elegirAderezo()
    })

    botonCancelarVegetales.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__vegetales').removeClass('seccion__vegetales--modificado')
        $('.seccion__proteina').addClass('seccion__proteina--modificado')

        pasoAnterior()
        
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

        $('.seccion__aderezo').removeClass ('seccion__aderezo--modificado')
        $('.seccion__tostado').addClass ('seccion__tostado--modificado')

        elegirTostado ()
    })

    botonCancelarAderezo.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__aderezo').removeClass('seccion__aderezo--modificado')
        $('.seccion__vegetales').addClass('seccion__vegetales--modificado')

        pasoAnterior()
    })
}

function elegirTostado() {
    botonConfirmarTostado.on ('click', (event)=> {
        event.preventDefault()
    
        const tostado = $('.tostado__radio:checked').val()
        
        agregarCarrito (tostado)

        $('.seccion__tostado').removeClass ('seccion__tostado--modificado')
        $('.seccion__datos').addClass ('seccion__datos--modificado')
        
        
        completarDatos()
    })

    botonCancelarTostado.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__tostado').removeClass('seccion__tostado--modificado')
        $('.seccion__aderezo').addClass('seccion__aderezo--modificado')

        pasoAnterior()
    })
}

function completarDatos () {
    botonConfirmarDatos.on ('click', (event) => {
        event.preventDefault ()

        function Datos (nombre, telefono, calle, altura) {
            this.nombre = nombre;
            this.telefono = telefono;
            this.calle = calle;
            this.altura = altura;
        }

        const nombre = inputNombre.val()
        const telefono = inputTelefono.val()
        const calle = inputCalle.val()
        const altura = inputAltura.val()
        
        const datos = new Datos (nombre, telefono, calle, altura)

        const datosArray = []
        datosArray.push (datos)
    
        $('.seccion__datos').removeClass ('seccion__datos--modificado')
        $('.seccion__resumen').addClass ('seccion__resumen--modificado')

        $('.div__pedido').addClass ('div__pedido--modificado')

        resumenCompra(datosArray)
        

    })

    botonCancelarDatos.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__datos').removeClass ('seccion__datos--modificado')
        $('.seccion__tostado').addClass ('seccion__tostado--modificado')

        pasoAnterior()
    })
}

function resumenCompra (datos) {

    if (!resumenCarrito) {

        nuevoCarrito.forEach( (el) => {
            listaResumen.append (`<li>${el.tipo} ${el.nombre}</li>`)
            resumenCarrito= true;
        })
    }

    if (!resumenDatos){

        datos.forEach( (el) => {
            listaResumen.append (`
                            <li>nombre: ${el.nombre}</li>
                            <li>telefono: ${el.telefono}</li>
                            <li>calle: ${el.calle}</li>
                            <li>altura: ${el.altura}</li>
                                        `)
        })
        resumenDatos = true;
    }
/*    
    botonConfirmarCompra.on ('click', (event) => {
        event.preventDefault ()


    })

    botonCancelarCompra.on ('click', (event) => {
        event.preventDefault()
        $('.seccion__resumen').removeClass ('seccion__resumen--modificado')
        $('.seccion__datos').addClass ('seccion__datos--modificado')

        pasoAnterior()
    }) */
}
