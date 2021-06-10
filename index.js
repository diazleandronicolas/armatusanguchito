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
    { id: 13, tipo: 'extra', nombre: 'huevo', precio: 70},
    { id: 14, tipo: 'extra', nombre: 'bacon', precio: 70},
    { id: 15, tipo: 'extra', nombre: 'queso', precio: 50}
]

let resumenCarrito = false;
let resumenDatos = false;

let carrito = []
let nuevoCarrito = []

const listaPedido = $('.lista__pedido')
const listaSubtotal = $('.lista__subtotal')
const listaResumen = $('.lista__resumen')
const listaDatos = $('.lista__datos')
const listaTotal = $('.lista__total')

const botonIniciarPedido = $('#btn-iniciar')

const botonCancelarProteina = $('#form__btn__proteina--atras')
const botonCancelarVegetales = $('#form__btn__vegetales--atras')
const botonCancelarAderezo = $('#form__btn__aderezo--atras')
const botonCancelarExtra = $('#form__btn__extra--atras')
const botonCancelarDatos = $('#form__btn__datos--atras')
const botonCancelarCompra = $('#form__btn__resumen--atras')

const botonConfirmarPan = $('#form__btn__pan--siguiente')
const botonConfirmarProteina = $('#form__btn__proteina--siguiente')
const botonConfirmarVegetales = $('#form__btn__vegetales--siguiente')
const botonConfirmarAderezo = $('#form__btn__aderezo--siguiente')
const botonConfirmarExtra = $('#form__btn__extra--siguiente')
const botonConfirmarDatos = $('#form__btn__datos--siguiente')
const botonConfirmarCompra = $('#form__btn__resumen--siguiente')

const inputNombre = $('.nombre__input')
const inputTelefono = $('.telefono__input')
const inputCalle = $('.calle__input')
const inputAltura = $('.altura__input')

const cerrarModal = $('.div__cerrar')

// Activar modal principal
botonIniciarPedido.on ('click', () => {

    $('.modal__contenedor').addClass('modal__contenedor--modificado')

    $('.div__pedido').addClass('div__pedido--modificado')
    $('.div__pedido__img--3').toggleClass('div__pedido__img--3__modificado')

    elegirPan()
})

// Cerrar el modal principal
cerrarModal.on ('click', () => {

    carrito = []
    nuevoCarrito = []
    listaPedido.empty()
    listaResumen.empty()
    listaSubtotal.empty()

    $('.modal__contenedor').removeClass('modal__contenedor--modificado')

    $('.div__pedido').removeClass ('div__pedido--modificado')
    $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
    $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
    $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
    $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
    $('.div__pedido__img--8').removeClass('div__pedido__img--8__modificado')
    $('.div__pedido__img--9').removeClass('div__pedido__img--9__modificado')

    $('.seccion__pan').removeClass('seccion__pan--modificado')
    $('.seccion__proteina').removeClass('seccion__proteina--modificado')
    $('.seccion__vegetales').removeClass('seccion__vegetales--modificado')
    $('.seccion__aderezo').removeClass('seccion__aderezo--modificado')
    $('.seccion__extra').removeClass('seccion__extra--modificado')
    $('.seccion__datos').removeClass('seccion__datos--modificado')
    $('.seccion__resumen').removeClass('seccion__resumen--modificado') 
    $('.seccion__finalizado').removeClass ('seccion__finalizado--modificado')

    $('.lista__subtotal').removeClass ('lista__subtotal--modificado')
    $('.lista__total').removeClass ('lista__total--modificado')
    $('.lista__datos').removeClass ('lista__datos--modificado')

})

// Agregando producto elegido al carrito
function agregarCarrito (producto) {
    
    carrito.push (arrayIngredientes.find (el => el.nombre === (producto)))

    let lista = new Set (carrito)
    let carritoLista = Array.from (lista)
    
    nuevoCarrito = carritoLista

    //ingredientesPedido (nuevoCarrito)
    subtotalPedido(nuevoCarrito) 
}

// Contador del precio subtotal
function subtotalPedido (carrito) {
    let subtotal = carrito.reduce ((acc, el) => acc += el.precio, 0)
    
    listaSubtotal.empty()
    listaSubtotal.append (`<h4>Subtotal: $${subtotal}</h4>`)
}

// Contador del precio total
function totalPedido (carrito) {
    let total = carrito.reduce ((acc, el) => acc += el.precio, 0)

    listaTotal.empty()
    listaTotal.append (`<h4>Total: $${total}</h4>`)
}

// Función que elimina el último ingrediente seleccionado.
function pasoAnterior () { 

    listaPedido.empty ()   
    carrito.pop ()

}

// Captando valor de radio button PAN.
function elegirPan() {
    botonConfirmarPan.on ('click', (event)=> {
        event.preventDefault()
    
        const pan = $('.pan__radio:checked').val()

        if (pan) {

            agregarCarrito (pan)        
        
            $('.seccion__pan').addClass ('seccion__pan--modificado')
            $('.seccion__proteina').addClass ('seccion__proteina--modificado')

            $('.div__pedido__img--4').addClass('div__pedido__img--4__modificado')
            $('.div__pedido__img--3').removeClass ('div__pedido__img--3__modificado')

            elegirProteina ()
        } else {
            alert ('elija una opción para continuar')
        }
    })
}


// Captando valor de radio button PROTEINA.
function elegirProteina () {
    botonConfirmarProteina.on ('click', (event) => {
        event.preventDefault()

        const proteina = $('.proteina__radio:checked').val()

        if (proteina) {

            agregarCarrito (proteina)
    
            $('.seccion__proteina').removeClass ('seccion__proteina--modificado')
            $('.seccion__vegetales').addClass('seccion__vegetales--modificado')

            $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
            $('.div__pedido__img--5').addClass('div__pedido__img--5__modificado')
            
            elegirVegetales()
        } else {
            alert ('elija una opción para continuar')
        }
    })

    botonCancelarProteina.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__proteina').removeClass('seccion__proteina--modificado')
        $('.seccion__pan').removeClass('seccion__pan--modificado')

        $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
        $('.div__pedido__img--3').addClass ('div__pedido__img--3__modificado')

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

        if (vegetales.length > 0) {
            
                $('.seccion__vegetales').removeClass ('seccion__vegetales--modificado')
                $('.seccion__aderezo').addClass ('seccion__aderezo--modificado')
        
                $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
                $('.div__pedido__img--6').addClass('div__pedido__img--6__modificado')

                elegirAderezo()

        } else {
            alert ('elija una opción para continuar')
        }

    })

    botonCancelarVegetales.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__vegetales').removeClass('seccion__vegetales--modificado')
        $('.seccion__proteina').addClass('seccion__proteina--modificado')

        $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
        $('.div__pedido__img--4').addClass('div__pedido__img--4__modificado')
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

        if (aderezos.length > 0) {
    
            $('.seccion__aderezo').removeClass ('seccion__aderezo--modificado')
            $('.seccion__extra').addClass ('seccion__extra--modificado')
    
            $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
            $('.div__pedido__img--7').addClass('div__pedido__img--7__modificado')

            elegirExtra ()

        } else {

            alert ('elija una opción para continuar')
        }
    })

    botonCancelarAderezo.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__aderezo').removeClass('seccion__aderezo--modificado')
        $('.seccion__vegetales').addClass('seccion__vegetales--modificado')

        $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
        $('.div__pedido__img--5').addClass('div__pedido__img--5__modificado')

        pasoAnterior()
    })
}

function elegirExtra() {
    botonConfirmarExtra.on ('click', (event)=> {
        event.preventDefault()
    
        const extras = []
        
        $(".extra__checkbox:checkbox:checked").each(function() {
            const extrasCheckbox = $(this).val()
            extras.push (extrasCheckbox)
        })

        for (let extra of extras) {
            agregarCarrito (extra)
        }

        if (extras.length > 0) {
            
            $('.seccion__extra').removeClass('seccion__extra--modificado')
            $('.seccion__datos').addClass('seccion__datos--modificado')
            
            completarDatos()

        } else {
            alert ('elija una opción para continuar')
        }
    })

    botonCancelarExtra.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__extra').removeClass('seccion__extra--modificado')
        $('.seccion__aderezo').addClass('seccion__aderezo--modificado')

        $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
        $('.div__pedido__img--6').addClass('div__pedido__img--6__modificado')

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
        
        if (nombre.length > 0 && telefono.length > 0 && calle.length > 0 && altura.length > 0) {
            
            const datos = new Datos (nombre, telefono, calle, altura)
    
            const datosArray = []
            datosArray.push (datos)
        
            $('.seccion__datos').removeClass ('seccion__datos--modificado')
            $('.seccion__resumen').addClass ('seccion__resumen--modificado')
                
            $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
            $('.div__pedido__img--8').addClass('div__pedido__img--8__modificado')

            $('.lista__resumen').addClass ('lista__resumen--modificado')
            $('.lista__datos').addClass ('lista__datos--modificado')

            $('.lista__total').addClass('lista__total--modificado')
            $('.lista__subtotal').addClass ('lista__subtotal--modificado')

            resumenCompra(datosArray)
            totalPedido (nuevoCarrito)

        } else {
            alert ('revise los campos')
        }

    })

    botonCancelarDatos.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__datos').removeClass ('seccion__datos--modificado')
        $('.seccion__extra').addClass ('seccion__extra--modificado')
        
        pasoAnterior()
    })
}

function resumenCompra (datos) {

    if (!resumenCarrito) {

        nuevoCarrito.forEach( (el) => {
            listaResumen.append (`<p>-${el.tipo}: ${el.nombre}</p>`)
        })
        resumenCarrito = true;
    }

    if (!resumenDatos){

        datos.forEach( (el) => {
            listaDatos.append (`
                            
                            <p>-nombre: ${el.nombre}</p>
                            <p>-telefono: ${el.telefono}</p>
                            <p>-calle: ${el.calle}</p>
                            <p>-altura: ${el.altura}</p>
                                        `)
        })
        resumenDatos = true;
    }
    
    botonConfirmarCompra.on ('click', (event) => {
        event.preventDefault ()

        $('.seccion__finalizado').addClass ('seccion__finalizado--modificado')
        $('.seccion__resumen').removeClass('seccion__resumen--modificado')

        $('.div__pedido__img--8').removeClass('div__pedido__img--8__modificado')
        $('.div__pedido__img--9').addClass('div__pedido__img--9__modificado')

        $('.lista__resumen').removeClass ('lista__resumen--modificado')
        $('.lista__datos').removeClass ('lista__datos--modificado')

        $('.lista__total').removeClass('lista__total--modificado')

        $('.lista__finales').addClass ('lista__finales--modificado')

    })

    botonCancelarCompra.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__resumen').removeClass ('seccion__resumen--modificado')
        $('.seccion__datos').addClass ('seccion__datos--modificado')

        $('.lista__resumen').removeClass ('lista__resumen--modificado')
        $('.lista__datos').removeClass ('lista__datos--modificado')

        $('.div__pedido__img--8').removeClass('div__pedido__img--8__modificado')
        $('.div__pedido__img--7').addClass('div__pedido__img--7__modificado')

        $('.lista__subtotal').removeClass ('lista__subtotal--modificado')
        $('.lista__total').removeClass('lista__total--modificado')
    })
}
