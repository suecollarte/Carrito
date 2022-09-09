import { Router } from "express";
import { ContenedorProducto } from "./ContenedorProducto.js";
//clases DAO

const carritosRouter = Router();

const carritoApi= new ContenedorProducto('../DB/CarritoDB.json');
const productoApi= new ContenedorProducto('../DB/ProductoDB.json');


//Router
routerCarrito.get("/", async (req, res) => {
  res.status(200).json((await carritoApi.getAll()));
});

routerCarrito.post("/", async (req, res) => {
    res.json({id: await carritoApi.save({productos: []})});
  });

routerCarrito.post("/:id/productos", async (req, res) => {
    const carro = await carritoApi.getById(req.params.id);
    const producto = await productoApi.getById(req.body.id);
    carro.productos.push(producto);
    await carritoApi.save(carro, req.params.id)
    res.end();
});

routerCarrito.get("/:id/productos", (req, res) => {
 const carrito= await carritoApi.getAll(req.params.id)
 res.json(carrito.productos);

}) 

routerCarrito.put("/:id/productos", (req, res) => {
  res.status(201).json(respuesta);
});

routerCarrito.delete("/:id/productos/:idProd", (req, res) => {
  const carrito= await carritoApi.getAll(req.params.id)
  const index =carrito.productos.findIndex(p =>p.id == req.params.idProd)
  if (index != -1){
    carrito.productos.splice(index,1)
    await carritoApi.save(carrito,req.params.id)
  }
    res.end()
});
export default routerCarrito;


