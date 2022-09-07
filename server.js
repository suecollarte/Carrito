/* ---------------------- Modulos ----------------------*/
const express = require('express');
const exphbs= require('express-handlebars');

//registra los request
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/* ---------------------- Instancia de servidor ----------------------*/
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//Rutas
const routerProducto = require("./src/productos.routes.js");
const routerCarrito = require("./src/carrito.routes.js");
const ContenedorProducto = require("./src/ContenedorProducto.js");

app.use("/productos", routerProducto);
app.use("/carrito", routerCarrito);


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
const PRODUCTO_DB=[];
const CARRITO_DB=[];
//DB
const p=new ContenedorProducto();
p.archivo = './BD/ProductoBD.json';
//PRODUCTO_DB=p.getAll();
  
/* ---------------------- Rutas ----------------------*/
app.get('/', (req, res) => {
   //res.sendFile(path.join(__dirname, './public', 'index.html'));
   res.render('home',{PRODUCTO_DB});
});
/* app.post('/productos',(req,res)=>{
  CARRITO_DB.push(req.body);
  res.redirect('/');
  io.sockets.emit('from-server-mensaje', req.body);
}) */


/* ---------------------- WebSocket ----------------------*/
io.on('connection', (socket)=>{

    console.log(`Nuevo cliente conectadss! ${socket.id}`);
    socket.emit('from-server-producto', {PRODUCTO_DB});
    socket.emit('from-server-mensaje', {CARRITO_DB});
//ProductoNuevo
    socket.on('from-client-producto', producto => {
        PRODUCTO_DB.push(producto);
        io.sockets.emit('from-server-producto', {PRODUCTO_DB});
    
    });
    // se añade al array con el metodo push
    socket.on('from-client-mensaje', mensaje => {
      CARRITO_DB.push(mensaje);
      //emit envia informacion a todos los chat
      io.sockets.emit('from-server-mensaje', {CARRITO_DB});
    });

})


/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = http.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})


