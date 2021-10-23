import Express from "express";
import {
  queryTodosProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../../controllers/productos/controller.js";

//Enrutamiento de vista productos
const rutasProducto = Express.Router();

//callbak generico
const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los productos");
  } else {
    res.json(result);
  }
};

rutasProducto.route("/productos").get((req, res) => {
  console.log("Alguien hizo get en la ruta /productos");
  queryTodosProductos(genericCallback(res));
});

rutasProducto.route("/productos/nuevo").post((req, res) => {
  crearProducto(req.body, genericCallback(res));
});

//editar productos
rutasProducto.route("/productos/editar").patch((req, res) => {
  editarProducto(req.body, genericCallback(res));
});

//Eliminar productos
rutasProducto.route("/productos/eliminar").delete((req, res) => {
  eliminarProducto(req.body.id, genericCallback(res));
});

export default rutasProducto;
