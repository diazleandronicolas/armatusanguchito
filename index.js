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

// Carrito preliminar
let carrito = []

// Carrito con lista filtrada (donde no se repiten ingredientes)
let nuevoCarrito = []

// Condicionales para que los métodos forEach sólo iteren una vez los valores de los ingredientes elegidos.
let resumenCarrito = false;
let resumenDatos = false;

// Resúmenes que se crean en el DOM
const listaPedido = $('.lista__pedido')
const listaSubtotal = $('.lista__subtotal')
const listaResumen = $('.lista__resumen')
const listaDatos = $('.lista__datos')
const listaTotal = $('.lista__total')

// Botones que abren/cierran el modal principal
const botonIniciarPedido = $('#btn-iniciar')
const cerrarModal = $('.div__cerrar')

// Botones "atrás" de cada form
const botonCancelarProteina = $('#form__btn__proteina--atras')
const botonCancelarVegetales = $('#form__btn__vegetales--atras')
const botonCancelarAderezo = $('#form__btn__aderezo--atras')
const botonCancelarExtra = $('#form__btn__extra--atras')
const botonCancelarDatos = $('#form__btn__datos--atras')
const botonCancelarCompra = $('#form__btn__resumen--atras')

// Botones "siguiente" de cada form
const botonConfirmarPan = $('#form__btn__pan--siguiente')
const botonConfirmarProteina = $('#form__btn__proteina--siguiente')
const botonConfirmarVegetales = $('#form__btn__vegetales--siguiente')
const botonConfirmarAderezo = $('#form__btn__aderezo--siguiente')
const botonConfirmarExtra = $('#form__btn__extra--siguiente')
const botonConfirmarDatos = $('#form__btn__datos--siguiente')
const botonConfirmarCompra = $('#form__btn__resumen--siguiente')

// Inputs de los datos de pedido
const inputNombre = $('.nombre__input')
const inputTelefono = $('.telefono__input')
const inputCalle = $('.calle__input')
const inputAltura = $('.altura__input')

// Activar modal principal
botonIniciarPedido.on ('click', () => {

    // Activar secciones
    $('.modal__contenedor').addClass('modal__contenedor--modificado')
    $('.div__pedido').addClass('div__pedido--modificado')
    $('.div__pedido__img--3').toggleClass('div__pedido__img--3__modificado')

    // Ejecutar función de elección del pan
    elegirPan()
})

// Cerrar el modal principal
cerrarModal.on ('click', () => {

    // Vaciar arrays
    carrito = []
    nuevoCarrito = []
    datosArray = []

    // Vaciar las listas 
    listaPedido.empty()
    listaResumen.empty()
    listaSubtotal.empty()

    // Cerrar modal principal
    $('.modal__contenedor').removeClass('modal__contenedor--modificado')

    // Cerrar las distintas imágenes activadas
    $('.div__pedido').removeClass ('div__pedido--modificado')
    $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
    $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
    $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
    $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
    $('.div__pedido__img--8').removeClass('div__pedido__img--8__modificado')
    $('.div__pedido__img--9').removeClass('div__pedido__img--9__modificado')

    // Cerrar las distintas secciones de elección de ingredientes
    $('.seccion__pan').removeClass('seccion__pan--modificado')
    $('.seccion__proteina').removeClass('seccion__proteina--modificado')
    $('.seccion__vegetales').removeClass('seccion__vegetales--modificado')
    $('.seccion__aderezo').removeClass('seccion__aderezo--modificado')
    $('.seccion__extra').removeClass('seccion__extra--modificado')
    $('.seccion__datos').removeClass('seccion__datos--modificado')
    $('.seccion__resumen').removeClass('seccion__resumen--modificado') 
    $('.seccion__finalizado').removeClass ('seccion__finalizado--modificado')

    // Cerrar las secciones de listas
    $('.lista__subtotal').removeClass ('lista__subtotal--modificado')
    $('.lista__total').removeClass ('lista__total--modificado')
    $('.lista__datos').removeClass ('lista__datos--modificado')

})

// Agregar producto elegido al carrito
function agregarCarrito (producto) {
    
    // Encontrando el producto ingresado en la lista de ingredientes y pusheando al carrito
    carrito.push (arrayIngredientes.find (el => el.nombre === (producto)))

    // Creando un nuevo carrito que sólo filtre productos únicos y no repetidos
    let lista = new Set (carrito)
    let carritoLista = Array.from (lista)
    
    // Asignando la lista filtrada a un nuevo carrito (el definitivo)
    nuevoCarrito = carritoLista

    subtotalPedido(nuevoCarrito) 
}

// Contador del precio subtotal
function subtotalPedido (carrito) {
    let subtotal = carrito.reduce ((acc, el) => acc += el.precio, 0)
    
    // Actualizando el subtotal en el DOM
    listaSubtotal.empty()
    listaSubtotal.append (`<h4>Subtotal: $${subtotal}</h4>`)
}

// Contador del precio total
function totalPedido (carrito) {
    let total = carrito.reduce ((acc, el) => acc += el.precio, 0)

    // Actualizar el total en el DOM
    listaTotal.empty()
    listaTotal.append (`<h4>Total: $${total}</h4>`)
}

// Función que elimina el último ingrediente seleccionado
function pasoAnterior () { 

    listaPedido.empty ()   
    carrito.pop ()

}

// Ejecutar función para elegir el pan
function elegirPan() {
    botonConfirmarPan.on ('click', (event)=> {
        event.preventDefault()
    
        // Captando valor del pan elegido
        const pan = $('.pan__radio:checked').val()

        // Condicional para que no permita avanzar de sección sin seleccionar un ingrediente
        if (pan) {

            agregarCarrito (pan)        
        
            // Habilitando/deshabilitando las secciones anteriores/posteriores
            $('.seccion__pan').addClass ('seccion__pan--modificado')
            $('.seccion__proteina').addClass ('seccion__proteina--modificado')
            $('.div__pedido__img--4').addClass('div__pedido__img--4__modificado')
            $('.div__pedido__img--3').removeClass ('div__pedido__img--3__modificado')

            // Ejecutar selección de ingrediente siguiente
            elegirProteina ()

        } else {
            alert ('Por favor, elija una opción para continuar')
        }
    })
}


// Ejecutar función para elegir la proteína
function elegirProteina () {
    botonConfirmarProteina.on ('click', (event) => {
        event.preventDefault()

        // Captar valor de la proteína elegida
        const proteina = $('.proteina__radio:checked').val()

        // Condicional para que no permita avanzar de sección sin seleccionar un ingrediente
        if (proteina) {

            agregarCarrito (proteina)
    
            // Habilitando/deshabilitando las secciones anteriores/posteriores
            $('.seccion__proteina').removeClass ('seccion__proteina--modificado')
            $('.seccion__vegetales').addClass('seccion__vegetales--modificado')
            $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
            $('.div__pedido__img--5').addClass('div__pedido__img--5__modificado')
            
            elegirVegetales()

        } else {
            alert ('Por favor, elija una opción para continuar')
        }
    })

    // Función que se ejecuta al apretar el botón "cancelar"
    botonCancelarProteina.on ('click', (event) => {
        event.preventDefault()

        // Habilitando/deshabilitando las secciones anteriores/posteriores
        $('.seccion__proteina').removeClass('seccion__proteina--modificado')
        $('.seccion__pan').removeClass('seccion__pan--modificado')
        $('.div__pedido__img--4').removeClass('div__pedido__img--4__modificado')
        $('.div__pedido__img--3').addClass ('div__pedido__img--3__modificado')

        // Función que elimina el último ingrediente elegido
        pasoAnterior()
        
    })
}

// Ejecutar función para elegir los vegetales
function elegirVegetales () {
    botonConfirmarVegetales.on ('click', (event) => {
        event.preventDefault ()

        // Creando un array para los vegetales elegidos
        const vegetales = []

        // Captando los valores de los vegetales elegidos y pusheándolos al array de vegetales
        $(".vegetales__checkbox:checkbox:checked").each(function() {
            const vegetalesCheckbox = $(this).val()
            vegetales.push (vegetalesCheckbox)
        })

        // Iterando todos los vegetales del array y agregándolos al carrito
        for (let vegetal of vegetales) {
            agregarCarrito (vegetal)
        }

        // Condicional para que no permita avanzar de sección sin seleccionar un ingrediente
        if (vegetales.length > 0) {
            
                 // Habilitando/deshabilitando las secciones anteriores/posteriores
                $('.seccion__vegetales').removeClass ('seccion__vegetales--modificado')
                $('.seccion__aderezo').addClass ('seccion__aderezo--modificado')
                $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
                $('.div__pedido__img--6').addClass('div__pedido__img--6__modificado')

                elegirAderezo()

        } else {
            alert ('Por favor, elija una opción para continuar')
        }

    })

    // Función que se ejecuta al clickear el botón "cancelar"
    botonCancelarVegetales.on ('click', (event) => {
        event.preventDefault()

        // Habilitando/deshabilitando las secciones anteriores/posteriores
        $('.seccion__vegetales').removeClass('seccion__vegetales--modificado')
        $('.seccion__proteina').addClass('seccion__proteina--modificado')
        $('.div__pedido__img--5').removeClass('div__pedido__img--5__modificado')
        $('.div__pedido__img--4').addClass('div__pedido__img--4__modificado')

        // Elimina el último ingrediente elegido
        pasoAnterior()
        
    })
}

// Ejecutar función para elegir los aderezos
function elegirAderezo (){
    botonConfirmarAderezo.on ('click', (event) => {
        event.preventDefault ()

        // Creando un array para los vegetales elegidos
        const aderezos = []

        // Capta los valores de los aderezos elegidos y los pushea al array de aderezos
        $(".aderezo__checkbox:checkbox:checked").each(function() {
            const aderezosCheckbox = $(this).val()
            aderezos.push (aderezosCheckbox)
        })

        // Itera todos los aderezos del array y los agrega al carrito
        for (let aderezo of aderezos) {
            agregarCarrito (aderezo)
        }

        // Condicional para que no permita avanzar de sección sin seleccionar un ingrediente
        if (aderezos.length > 0) {
    
            // Habilitando/deshabilitando las secciones anteriores/posteriores
            $('.seccion__aderezo').removeClass ('seccion__aderezo--modificado')
            $('.seccion__extra').addClass ('seccion__extra--modificado')
            $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
            $('.div__pedido__img--7').addClass('div__pedido__img--7__modificado')

            // Ejecuta sección siguiente
            elegirExtra ()

        } else {
            alert ('Por favor, elija una opción para continuar')
        }
    })
    // Función que se ejecuta al clickear el botón "cancelar"
    botonCancelarAderezo.on ('click', (event) => {
        event.preventDefault()

        // Habilitando/deshabilitando las secciones anteriores/posteriores
        $('.seccion__aderezo').removeClass('seccion__aderezo--modificado')
        $('.seccion__vegetales').addClass('seccion__vegetales--modificado')
        $('.div__pedido__img--6').removeClass('div__pedido__img--6__modificado')
        $('.div__pedido__img--5').addClass('div__pedido__img--5__modificado')

        pasoAnterior()
    })
}

// Ejecutar función para elegir los extra
function elegirExtra() {
    botonConfirmarExtra.on ('click', (event)=> {
        event.preventDefault()
    
        // Creando un array para los extras elegidos
        const extras = []
        
        // Capta los valores de los extra elegidos y los pushea al array de extras
        $(".extra__checkbox:checkbox:checked").each(function() {
            const extrasCheckbox = $(this).val()
            extras.push (extrasCheckbox)
        })

        // Itera todos los extras del array y los agrega al carrito
        for (let extra of extras) {
            agregarCarrito (extra)
        }

        // Condicional para que no permita avanzar de sección sin seleccionar un ingrediente
        if (extras.length > 0) {
            
            $('.seccion__extra').removeClass('seccion__extra--modificado')
            $('.seccion__datos').addClass('seccion__datos--modificado')
            
            completarDatos()

        } else {
            alert ('Por favor, elija una opción para continuar')
        }
    })

    // Función que se ejecuta al clickear el botón "cancelar"
    botonCancelarExtra.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__extra').removeClass('seccion__extra--modificado')
        $('.seccion__aderezo').addClass('seccion__aderezo--modificado')
        $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
        $('.div__pedido__img--6').addClass('div__pedido__img--6__modificado')

        // función que elimina el último ingrediente elegido
        pasoAnterior()
    })
}

// Ejecutar función para completar los datos
function completarDatos () {
    botonConfirmarDatos.on ('click', (event) => {
        event.preventDefault ()

        // Función para crear un objeto de datos
        function Datos (nombre, telefono, calle, altura) {
            this.nombre = nombre;
            this.telefono = telefono;
            this.calle = calle;
            this.altura = altura;
        }

        // Capta los valores ingresados en los input
        const nombre = inputNombre.val()
        const telefono = inputTelefono.val()
        const calle = inputCalle.val()
        const altura = inputAltura.val()
        
        // Condicional que no permite avanzar de sección sin rellenar todos los campos (al menos con un string)
        if (nombre.length > 0 && telefono.length > 0 && calle.length > 0 && altura.length > 0) {
            
            // Crea instancia del objeto Datos
            const datos = new Datos (nombre, telefono, calle, altura)
    
            // Crea un array para alojar la instancia de Datos
            const datosArray = []
            // Pushea el objeto al array vacío
            datosArray.push (datos)
        
            // Habilitando/deshabilitando las secciones anteriores/posteriores
            $('.seccion__datos').removeClass ('seccion__datos--modificado')
            $('.seccion__resumen').addClass ('seccion__resumen--modificado')
            $('.div__pedido__img--7').removeClass('div__pedido__img--7__modificado')
            $('.div__pedido__img--8').addClass('div__pedido__img--8__modificado')

            // Habilitando/deshabilitando las distintas listas
            $('.lista__resumen').addClass ('lista__resumen--modificado')
            $('.lista__datos').addClass ('lista__datos--modificado')
            $('.lista__total').addClass('lista__total--modificado')
            $('.lista__subtotal').addClass ('lista__subtotal--modificado')

            // Ejecuta la función que muestra la sección del resumen de compra con los datos obtenidos
            resumenCompra(datosArray)

            // Ejecuta la función que calcula el valor total del sanguchito
            totalPedido (nuevoCarrito)

        } else {
            alert ('Por favor, rellene todos los campos')
        }
    })

    // Función que se ejecuta al clickear el botón "cancelar"
    botonCancelarDatos.on ('click', (event) => {
        event.preventDefault()

        $('.seccion__datos').removeClass ('seccion__datos--modificado')
        $('.seccion__extra').addClass ('seccion__extra--modificado')
        
        pasoAnterior()
    })
}

// Función que ejecuta la sección que muestra el resumen de la compra
function resumenCompra (datos) {

    // Condicional para que la función de aquí adentro se ejecute sólo una vez
    if (!resumenCarrito) {
        // Plasmando en el DOM el resumen con los ingredientes elegidos
        nuevoCarrito.forEach( (el) => {
            listaResumen.append (`<p>-${el.tipo}: ${el.nombre}</p>`)
        })
        // Con esto nos aseguramos que ya no vuelva a ejecutarse
        resumenCarrito = true;
    }

    // Condicional para que la función de aquí adentro se ejecute sólo una vez
    if (!resumenDatos){
        // Plasmando en el DOM los datos personales de quien hace el pedido
        datos.forEach( (el) => {
            listaDatos.append (`
                            
                            <p>-nombre: ${el.nombre}</p>
                            <p>-telefono: ${el.telefono}</p>
                            <p>-calle: ${el.calle}</p>
                            <p>-altura: ${el.altura}</p>
                                        `)
        })
        // Con esto nos aseguramos que ya no vuelva a ejecutarse
        resumenDatos = true;
    }
    
    // Boton "confirmar compra"
    botonConfirmarCompra.on ('click', (event) => {
        event.preventDefault ()

        // Habilita/deshabilita todas las secciones correspondientes
        $('.seccion__finalizado').addClass ('seccion__finalizado--modificado')
        $('.seccion__resumen').removeClass('seccion__resumen--modificado')
        $('.div__pedido__img--8').removeClass('div__pedido__img--8__modificado')
        $('.div__pedido__img--9').addClass('div__pedido__img--9__modificado')
        $('.lista__resumen').removeClass ('lista__resumen--modificado')
        $('.lista__datos').removeClass ('lista__datos--modificado')
        $('.lista__total').removeClass('lista__total--modificado')
        $('.lista__finales').addClass ('lista__finales--modificado')
        $('.div__cerrar').addClass('div__cerrar--modificado')

    })

    // Botón "cancelar"
    botonCancelarCompra.on ('click', (event) => {
        event.preventDefault()

        // Habilita/deshabilita todas las secciones correspondientes
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
