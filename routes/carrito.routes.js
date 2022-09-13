const express = require('express');
const {Router}= express;
const ContenedorProducto = require("../models/ContenedorProducto.js");
//clases DAO

const routerCarrito = Router();

const carritoApi= new ContenedorProducto();
carritoApi.archivo='../DB/CarritoDB.json';
const productoApi= new ContenedorProducto();
productoApi.archivo='../DB/ProductoDB.json';

//Router

routerCarrito.get("/", async (req, res) => {
  res.json(await carritoApi.getAll());
});

routerCarrito.post("/", async (req, res) => {
    res.json({id: await carritoApi.save({productos: []})});
  });

routerCarrito.post("/:id/productos", async (req, res) => {
    const carro = await carritoApi.getById(req.params.id);
    const producto = await productoApi.getById(req.body.id);
    carro.productos.push(producto);
    await carritoApi.save(carro, req.params.id)
    //res.end();
});

routerCarrito.get("/:id/productos", async (req, res) => {
 const carrito= await carritoApi.getAll(req.params.id)
 res.json(carrito.productos);

}) 

routerCarrito.put("/:id/productos", (req, res) => {
  res.status(201).json(respuesta);
});

routerCarrito.delete("/:id/productos/:idProd", async (req, res) => {
  const carrito= await carritoApi.getAll(req.params.id)
  const index =carrito.productos.findIndex(p =>p.id == req.params.idProd)
  if (index != -1){
    carrito.productos.splice(index,1)
    await carritoApi.save(carrito,req.params.id)
  }
    //res.end()
});

module.exports = routerCarrito;
