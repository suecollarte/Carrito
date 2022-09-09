import { Router} from "express";
const routerProducto = Router();
import { ContenedorProducto } from "./ContenedorProducto.js";
const productoApi= new ContenedorProducto('../DB/ProductoBD.json');


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
routerProducto.get("/", async (req, res) => {
  const productos = await productoApi.getAll();
  res.json(productos);
});

routerProducto.get("/:id", async (req, res) => {
  res.json(await productoApi.getById(req.params.id))
});
routerProducto.post("/", administrador, async(req, res) => {
  res.json(await productoApi.save(req.params.id))  
});

routerProducto.put("/:id", administrador, async(req, res) => {
  res.json(await productoApi.save(req.params.id))  
});


routerProducto.delete("/:id", administrador, async(req, res) => {
  res.json(await productoApi.deletebyId(req.params.id))  
});


export default routerProducto;


