const express = require('express');
const {Router}= express;
const routerProducto = Router();
const ContenedorProducto = require("../models/ContenedorProducto.js");
const BDProducto= new ContenedorProducto('../DB/ProductoBD.json');



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

//Servicios
//Router


routerProducto.get("/", async (req, res) => {
  const Producto = await BDProducto.getAll();
  
  res.json("Despliegue listo");
});

routerProducto.get("/:id", async (req, res) => {
  res.json(await BDProducto.getById(req.params.id))
});
routerProducto.post("/", administrador, async(req, res) => {
  res.json(await BDProducto.save(req.params.id))  
});

routerProducto.put("/:id", administrador, async(req, res) => {
  res.json(await BDProducto.save(req.params.id))  
});


routerProducto.delete("/:id", administrador, async(req, res) => {
  res.json(await BDProducto.deletebyId(req.params.id))  
});

module.exports = routerProducto;



