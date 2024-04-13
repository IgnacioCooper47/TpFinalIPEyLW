
//barra dezplegable.
document.addEventListener("DOMContentLoaded", function() {
  const miBarra = document.getElementById("miBarra");
  const botonDesplegar = document.getElementById("botonDesplegar");

  botonDesplegar.addEventListener("click", function() {
      if (miBarra.style.width === "" || miBarra.style.width === "0px") {
          miBarra.style.width = "250px"; // Ancho de la barra cuando está visible
      } else {
          miBarra.style.width = "0";
      }
  });
});

function borderRed(elemento){
    elemento.style.border = '1px solid red';
}


function restablecer() {
    var elementos = document.getElementsByTagName('input');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.borderColor = '';
    }
    
    var textarea = document.getElementsByTagName('textarea')[0]; // Obtén el único textarea
    textarea.style.borderColor = '';
}

function validarEmail(elemento){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(elemento);
}



function Validar() {

    //obtenemos los elementos del formulario
    var form = document.getElementById("form");

    var nombre = form.elements.nombre;
    var correo = form.elements.correo;
    var telefono = form.elements.telefono;
    var mensaje = form.elements.mensaje;
    var error = false;

    //pasamos los valores a las variables
    var nombreValue = nombre.value;
    var correoValue = correo.value;
    var telefonoValue = telefono.value;
    var mensajeValue = mensaje.value;

    //validamos el nombre
    if (nombreValue === "") {
        borderRed(nombre);
        error = true;
    }

    //que no contenga numeros el nombre
    if (isNaN(nombreValue) === false) {
        borderRed(nombre);
        error = true;
    }

    //validamos el correo
    if (correoValue === "") {
        borderRed(correo);
        error = true;
    }


    if (validarEmail(correoValue) === false) {
        borderRed(correo);
        error = true;
    }


    //validamos el telefono
    if (telefonoValue === "") {
        borderRed(telefono);
        error = true;
    }

    //que solo contenga numeros
    if (isNaN(telefonoValue)) {
        borderRed(telefono);
        error = true;
    }

    //que el numero de telefono tenga 10 digitos o menos.
    if (telefonoValue.length > 10) {
        borderRed(telefono);
        error = true;
    }

    //validamos el mensaje
    if (mensajeValue === "") {
        borderRed(mensaje);
        error = true;
    }

    //si no hay errores
    if (!error) {
        restablecer();
        alert("Mensaje enviado correctamente");
    }

}

function agregarAlCarrito(nombre, precio) {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push({ nombre: nombre, precio: precio });

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    console.log(`Producto agregado al carrito: ${nombre}, Precio: ${precio}`);
    
}

function redirigirALink() {
    // Reemplaza 'tu-enlace-aqui' con la URL a la que deseas redirigir
    var enlace = './carrito.html';

    // Redirige a la URL especificada
    window.location.href = enlace;
}

//funcion que elimina un producto del carrito
function eliminarDelCarrito(nombre) {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el índice del producto a eliminar
    let indice = carrito.findIndex(producto => producto.nombre === nombre);

    // Eliminar el producto
    carrito.splice(indice, 1);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que vacia el carrito
function vaciarCarrito() {
    // Eliminar el carrito de localStorage
    localStorage.removeItem('carrito');

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que inicia la compra
function iniciarCompra() {
    // Eliminar el carrito de localStorage
    localStorage.removeItem('carrito');

    // que salga un mensaje de que la compra se realizo correctamente con el total de la compra.
    alert("Compra realizada correctamente, el total de la compra es: " + document.getElementById('total-general').textContent);
    

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que actualiza el total general
function actualizarTotalGeneral() {
    // Obtener el total general
    let totalGeneral = document.getElementById('total-general');

    // Obtener todos los subtotales
    let subtotales = document.getElementsByClassName('subtotal');

    // Inicializar el total general
    let total = 0;

    // Recorrer los subtotales
    for (let i = 0; i < subtotales.length; i++) {
        // Sumar el subtotal al total general
        total += Number(subtotales[i].textContent);
    }

    // Actualizar el total general
    totalGeneral.textContent = total;
}

//funcion que actualiza el subtotal del input de mostrar carrito...
function actualizarSubtotal(cantidad) {
    // Obtener el elemento que disparó el evento
    let input = event.target;

    // Obtener la fila del producto
    let fila = input.parentElement.parentElement;

    // Obtener el precio del producto
    let precio = fila.getElementsByTagName('td')[1].textContent;

    // Obtener el subtotal
    let subtotal = fila.getElementsByClassName('subtotal')[0];

    // Calcular el subtotal
    subtotal.textContent = precio * cantidad;

    // Actualizar el total general
    actualizarTotalGeneral();

}

//funcion que muestra el contendio del carrito en la pagina carrito.html
function mostrarCarrito() {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el elemento con el id 'carrito'
    let carritoDOM = document.getElementById('carrito');

    let totalProductos = 0;
    let precioNumero = 0;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        // Mostrar un mensaje
        carritoDOM.innerHTML = '<h1>El carrito está vacío ;(</h1>';
    } else {
        carritoDOM.innerHTML = `
        <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th> 
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            ${carrito.map(producto => `

                ${precioNumero = Number(producto.precio)};
                <tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>
                        <input type="number" min="1" value="1" onchange="actualizarSubtotal(this.value)" />
                    </td>
                    <td class="subtotal">${producto.precio}</td> <!-- Nueva columna -->
                    <td>
                        <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
                    </td>
                </tr>
               ${totalProductos += precioNumero}; 
            `).join('')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Total:</td>
                <td id="total-general">${totalProductos}</td> <!-- Celda para mostrar el total general -->
                <td></td>
            </tr>
        </tfoot>
    </table>
    <button onclick="iniciarCompra()">Iniciar compra</button>
    <button onclick="vaciarCarrito()">Vaciar carrito</button>
    
        `;
    }
}