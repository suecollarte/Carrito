/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs= require('express-handlebars');
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/* ---------------------- Instancia de servidor ----------------------*/
const app = express();
const http = new HttpServer(app);

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const {Router}= express;

//Rutas
import  routerCarrito  from "./src/carrito.routes.js";
import routerProducto  from "./src/productos.routes.js";
const ContenedorProducto = require("./src/ContenedorProducto.js");
//const ContenedorProducto = require("./src/ContenedorProducto.js");

app.use("/productos", routerProducto);
app.use("/carrito", routerCarrito);

const config={
    isAdmin: true

}

const esAdmin= config.isAdmin;

//engine plantilla
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
  })
);


//motor plantilla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//BD
/* const CARRITO_DB=[];
const p=new ContenedorProducto('./BD/ProductoBD.txt');
const PRODUCTO_DB= []; */

/* ---------------------- Rutas ----------------------*/
/* app.get('/', (req, res) => {
   //res.sendFile(path.join(__dirname, './public', 'index.html'));
   res.render('home',{ PRODUCTO_DB });
}); */




/* ---------------------- WebSocket ----------------------*/

const io = new IOServer(http);
app.set('socketio', io);

io.on('connection', (socket)=>{

    console.log(`Nuevo cliente conectadss! ${socket.id}`);
    socket.emit('from-server-producto', { PRODUCTO_DB });
    socket.emit('from-server-carrito', { CARRITO_DB });
//ProductoNuevo
    socket.on('from-client-producto', (producto) => {
    //  console.log(producto);
  
        PRODUCTO_DB.push(producto);
        io.sockets.emit('from-server-producto', { PRODUCTO_DB });
    
    });
    // se añade al array con el metodo push
    socket.on('from-client-carrito', (carro) => {
     
      CARRITO_DB.push(carro);
      //console.log(CARRITO_DB);
      //emit envia informacion a todos los chat
      io.sockets.emit('from-server-carrito', { CARRITO_DB }  );
    });

})


/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = http.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})


