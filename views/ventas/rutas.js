import Express from "express";
import {
  queryAllVentas,
  crearVenta,
  editarVenta,
  eliminarVenta,
} from "../../controllers/ventas/controller.js";

//Enrutamiento de vista ventas
const rutasVenta = Express.Router();

//callbak generico
const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los ventas");
  } else {
    res.json(result);
  }
};

rutasVenta.route("/ventas").get((req, res) => {
  console.log("Alguien hizo get en la ruta /ventas");
  queryAllVentas(genericCallback(res));
});

rutasVenta.route("/ventas").post((req, res) => {
  crearVenta(req.body, genericCallback(res));
});

//editar ventas
rutasVenta.route("/ventas/:id").patch((req, res) => {
  editarVenta(req.params.id, req.body, genericCallback(res));
});

//Eliminar ventas
rutasVenta.route("/ventas/:id").delete((req, res) => {
  eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasVenta;
