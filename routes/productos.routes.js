const express = require('express');
const {Router}= express;
const routerProducto = Router();
const ContenedorProducto = require("../models/ContenedorProducto.js");
const ListaProductos= new ContenedorProducto('./DB/ProductoBD.json');



/* Administracion */
const config={
  isAdmin: true

}
const esAdmin= config.isAdmin;
function administrador(req, res,next){
  if(!esAdmin){
  res.status(403).json({code: 403, msg:`No tiene permiso ${req.baseUrl}${req.url}`});

  }
  else {
    next();
  }

}

//Servicios
//Router
routerProducto.get("/", async (req, res,next) => {
  
  try {
  const Producto = await ListaProductos.getAll();
  res.status(200).send(Producto);

  } catch (error) {
    next(error);
  }
});

routerProducto.get("/:id", async (req, res,next) => {
  try {
 
    const Producto= await ListaProductos.getById(req.params.id);
    res.status(200).send(Producto);
  } catch (error) {
    next(error);
  }
});


routerProducto.post("/:id", administrador,async (req, res,next) => {
  
  const Producto= await ListaProductos.save(req.body);
  try {
    
    res.status(200).send(Producto)  ;
  } catch (error) {
      next(error);
  }
});

routerProducto.put("/:id", administrador, async (req, res,next) => {
  try {
    const Producto = await ListaProductos.update(req.params.id, req.body);
    res.status(200).send(Producto);
  } catch (error) {
    next(error);
  } 
});


routerProducto.delete("/:id", administrador, async (req, res,next) => {
  res.json(await ListaProductos.deletebyId(req.params.id))  
});

module.exports = routerProducto;



