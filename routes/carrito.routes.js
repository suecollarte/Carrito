const express = require('express');
const {Router}= express;
const ContenedorProducto = require("../models/ContenedorProducto.js");
//clases DAO

const routerCarrito = Router();

const ListaCarrito= new ContenedorProducto('./DB/CarritoBD.json');
const ListaProducto= new ContenedorProducto('./DB/ProductoBD.json');


//Router
routerCarrito.get("/", async (req, res,next) => {
  const Carrito = await ListaCarrito.getAll();
  try {
  
  res.status(200).send(Carrito);

  } catch (error) {
    next(error);
  }

});

routerCarrito.post("/:id", async (req, res) => {
  const Carrito= {id: await ListaCarrito.save(req.body)};

    
  try {
    //const Carrito= {ListaCarrito.save({Productos: []})};
    res.status(200).send(Carrito)  ;
  } catch (error) {
      next(error);
  }
 
    //res.json({id: await ListaCarrito.save({ListaProducto: []})});
  });

routerCarrito.post("/:id/", async (req, res) => {
    const carro = await ListaCarrito.getById(req.params.id);
    const producto = await ListaProducto.getById(req.body.id);
    carro.productos.push(producto);
    await ListaCarrito.save(carro, req.params.id)
   
});

routerCarrito.get("/:id/", async (req, res) => {
 const carrito= await ListaCarrito.getAll(req.params.id)
 res.json(carrito.productos);

}) 

routerCarrito.put("/:id/productos", (req, res) => {
  res.status(201).json(respuesta);
});

routerCarrito.delete("/:id/ListaProducto/:idProd", async (req, res) => {
  const carrito= await ListaCarrito.getAll(req.params.id)
  const index =carrito.ListaProducto.findIndex(p =>p.id == req.params.idProd)
  if (index != -1){
    carrito.ListaProducto.splice(index,1)
    await ListaCarrito.save(carrito,req.params.id)
  }
    res.status(404).json({error:"no encontrado"});
});

module.exports = routerCarrito;
