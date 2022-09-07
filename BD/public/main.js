const socket = io();
//PARTE CLIENTE
socket.on('from-server-producto', datos => {
    //console.log('productos:', producto.PRODUCTO_DB);
    if (!datos.PRODUCTO_DB.lenght){
        renderProdVacio();
        return;
    }
    renderProd(producto.PRODUCTO_DB); 
    
});

function renderProdVacio() {
    const htmlCuerpo = '<h3 class="alert alert-warning">No hay productos</h3>';
    document.querySelector('#historial').innerHTML = htmlCuerpo;
  }

function renderProd(productos) {
    const HistoriaProd = productos.map((prod)=>{
     return (`<tr>
     <td>${prod.nombre}</td>
     <td>${prod.precio}</td>
     <td><img src="${prod.foto}" width="50px"></td><tr>`)
    }).join(''); 
    
  const table =
  '<div class="table-responsive"><table class="table table-dark"><tr style="color: yellow;"> <th>Nombre</th> <th>Precio</th> <th>Imagen</th> </tr>' +
  HistoriaProd +
  '</table></div>';
    document.querySelector('#historial').innerHTML = table;
}

function enviarProducto() {
   
    const inputProducto = document.querySelector('#nombre');
    const inputPrecio = document.querySelector('#precio');
    const inputThumbail = document.querySelector('#foto');

 
    const Fproducto = {
        nombre: inputProducto.value,
        precio: inputPrecio.value,
        foto : inputThumbail.value
    }

   socket.emit('from-client-producto', Fproducto);
}



socket.on('from-server-carrito', carrito => {
    console.log('Usuarios:', carrito.CARRITO_DB);
    renderCarrito(carrito.CARRITO_DB); 
    
});
function renderCarrito(carrito) {
    const HistoriaMsj= carrito.map((msj)=>{
        return (`<span style='color:blue;'>
        <b>${msj.nombre}: </b>
        <span style='color:#804000;'>${msj.descripcion}</span>
        <span style='color:green;font-style: italic;'>${msj.stock} </span>`)
    }).join('<br>'); 
    document.querySelector('#carritos').innerHTML = HistoriaMsj;
}
function enviarCarrito(e) {
    
    const inputid = document.querySelector('#id');
    const inputnombre = document.querySelector('#nombre');
    const inputdescripcion = document.querySelector('#descripcion');
    const inputcodigo = document.querySelector('#codigo');
    const inputstock = document.querySelector('#stock');
    const inputprecio = document.querySelector('#precio');
    const inputfoto = document.querySelector('#foto');
    const date= new Date();
    const usuarios = {
        id: inputid.value,
        timestamp: date.toLocaleString(),
        nombre: inputnombre.value,
        descripcion: inputdescripcion.value, 
        codigo: inputcodigo.value, 
        stock: inputstock.value, 
        precio: inputprecio.value, 
        foto: inputfoto.value
    }
    
    socket.emit('from-client-carrito', usuarios);
    return false;
}
