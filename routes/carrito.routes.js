const express = require('express');
const {Router}= express;
const ContenedorProducto = require("../models/ContenedorProducto.js");
//clases DAO

const routerCarrito = Router();

const BDCarritos= new ContenedorProducto('../DB/CarritoDB.json');
const BDProducto= new ContenedorProducto('../DB/ProductoDB.json');


//Router

routerCarrito.get("/", async (req, res) => {
  res.json(await BDCarritos.getAll());
});

routerCarrito.post("/", async (req, res) => {
    res.json({id: await BDCarritos.save({BDProducto: []})});
  });

routerCarrito.post("/:id/productos", async (req, res) => {
    const carro = await BDCarritos.getById(req.params.id);
    const producto = await BDProducto.getById(req.body.id);
    carro.productos.push(producto);
    await BDCarritos.save(carro, req.params.id)
   
});

routerCarrito.get("/:id/productos", async (req, res) => {
 const carrito= await BDCarritos.getAll(req.params.id)
 res.json(carrito.productos);

}) 

routerCarrito.put("/:id/productos", (req, res) => {
  res.status(201).json(respuesta);
});

routerCarrito.delete("/:id/BDProducto/:idProd", async (req, res) => {
  const carrito= await BDCarritos.getAll(req.params.id)
  const index =carrito.BDProducto.findIndex(p =>p.id == req.params.idProd)
  if (index != -1){
    carrito.BDProducto.splice(index,1)
    await BDCarritos.save(carrito,req.params.id)
  }
    res.status(404).json({error:"no encontrado"});
});

module.exports = routerCarrito;
