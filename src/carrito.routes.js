const express = require("express");
const {Router}= express;
const routerCarrito= Router();


//DB

const DB_CARRITO=[
        {
          "id": 0,
          "timestamp":"2022-01-01 23:05",
          "nombre": "Escuadra",
          "descripcion":"describe",
          "codigo":"AA01",
          "stock": 23,
          "precio": "123.45",
          "foto": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "id": 1,
          "timestamp":"2022-01-01 23:05",
          "nombre": "Escuadra",
          "descripcion":"describe",
          "codigo":"AA02",
          "stock": 23,
          "precio": "123.45",
          "foto": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        },
        {
          "id": 2,
          "timestamp":"2022-01-01 23:05",
          "nombre": "Escuadra",
          "descripcion":"describe",
          "codigo":"AA03",
          "stock": 23,
          "precio": "123.45",
          "foto": "https://cdn3.iconfinder.com/data/icons/education/64/ruler-trianglestationary-school-256.png"
        }
      ];

//Router
routerCarrito.get("/", (req, res) => {
  res.status(200).json(DB_CARRITO);
});

routerCarrito.post("/api/carrito", (req, res) => {
    const { id, nombre, timestamp, descripcion, codigo,stock,precio,foto } = req.body;
    DB_CARRITO.push.apply(req.body);
    res.status(201).json({ code: 201, msg: `Carrito guardado con exito` });
  });



let respuesta = {
  error: false,
  codigo: 200,
  mensaje: "",
};


routerCarrito.get("/api/carrito/:id", (req, res) => {
  try {
    const id = req.params.id;

    const indexObj = DB_CARRITO.findIndex((o) => o.id == id);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Carrito ${id} no adicionado` });
    }
    res.status(200).json(DB_CARRITO[id]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});


routerCarrito.put("/api/carrito/:id", (req, res) => {

  const { id, nombre, timestamp, descripcion, codigo,stock,precio,foto } = req.body;
 
  if (!req.body.nombre) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre es requeridos",
    };
  } else {
    let largo = DB_CARRITO.lenght;
    for (let i = 0; i < largo; i++) {
      if (DB_CARRITO[i].nombre == req.body.nombre) {
        DB_CARRITO[i] = {
          id: req.body.id,
          nombre: req.body.nombre,
          precio: req.body.precio,
          foto:   req.body.foto,
          descripcion:   req.body.descripcion,
          codigo : req.body.codigo,
          stock : req.body.stock

        };
        respuesta = {
          error: true,
          codigo: 201,
          mensaje: "Carrito producto adicionado",
        };
      }
    }
  }
  res.status(201).json(respuesta);
});

routerCarrito.delete("/api/carrito/:id", (req, res) => {
  try {
    const id = req.params.id;
    const j = id;
    p.deletebyId(j);

    if (id == -1) {
      res.status(404).json({ code: 404, msg: `Carrito ${id} no encontrado` });
    }
    res.status(200).json(j);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, msg: `Error al obtener ${req.method} ${req.url}` });
  }
});
routerCarrito.get("*", (req, res) => {
  /* Returning a 404 status code. */
  res.status(404).json({
    code: 404,
    msg: "not found",
  });
});

module.exports = routerCarrito;


