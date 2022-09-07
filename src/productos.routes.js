const express = require("express");
const {Router}= express;
const routerProducto = Router();


//Servicios
//Router
routerProducto.get("/", (req, res) => {
  res.status(200).json(PRODUCTO_DB);
});

routerProducto.post("/productos", (req, res) => {
    const { id,timeproducto,nombre, descripcion,codigoprod,precio, stock,foto } = req.body;
    //console.log('hola');
    PRODUCTO_DB.push.apply(req.body);
    res.status(201).json({ code: 201, msg: `Producto guardado con exito` });
  });



let respuesta = {
  error: false,
  codigo: 200,
  mensaje: "",
};


routerProducto.get("/productos/:id", (req, res) => {
  try {
    const id = req.params.id;

    const indexObj = DB_PRODUCTOS.findIndex((o) => o.id == id);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Producto ${id} no encontrado` });
    }
    res.status(200).json(DB_PRODUCTOS[id]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});


routerProducto.put("/productos/:id", (req, res) => {
  const { id,timeproducto,nombre, descripcion,codigoprod,precio, stock,foto } = req.body;
  if (!req.body.nombre) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre es requeridos",
    };
  } else {
    let largo = DB_PRODUCTOS.lenght;
    for (let i = 0; i < largo; i++) {
      if (DB_PRODUCTOS[i].codigoprod == req.body.codigoprod) {
        DB_PRODUCTOS[i] = {
          id:req.body.id,
          timeproducto:req.body.timeproducto,
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          codigoprod: req.body.codigoprod,
          precio: req.body.precio,
          stock: req.body.stock,
          foto: DB_PRODUCTOS[i].foto,
        };
        respuesta = {
          error: true,
          codigo: 201,
          mensaje: "Producto creado",
        };
      }
    }
  }
  res.status(201).json(respuesta);
});

routerProducto.delete("/productos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const j = id;
    p.deletebyId(j);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Producto ${id} no encontrado` });
    }
    res.status(200).json(j);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});
routerProducto.get("*", (req, res) => {
  /* Returning a 404 status code. */
  res.status(404).json({
    code: 404,
    msg: "not found",
  });
});



module.exports = routerProducto;


