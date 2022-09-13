const express = require('express');
const path = require('path');

/* ---------------------- Instancia de servidor ----------------------*/
const app = express();
/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());
//Rutas
//onst routerCarrito  = require( "./routes/carrito.routes.js");
const routerProducto  = require( "./routes/productos.routes.js");


app.use("api/productos", routerProducto);
//app.use("api/carrito", routerCarrito);
/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})


