import Express from "express";
import {
  queryTodosUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../../controllers/usuarios/controller.js";

//Enrutamiento de vista usuarios
const rutasUsuario = Express.Router();

//callbak generico
const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los usuarios");
  } else {
    res.json(result);
  }
};

rutasUsuario.route("/usuarios").get((req, res) => {
  console.log("Alguien hizo get en la ruta /usuarios");
  queryTodosUsuarios(genericCallback(res));
});

rutasUsuario.route("/usuarios").post((req, res) => {
  crearUsuario(req.body, genericCallback(res));
});

//editar usuarios
rutasUsuario.route("/usuarios/:id").patch((req, res) => {
  editarUsuario(req.params.id, req.body, genericCallback(res));
});

//Eliminar usuarios
rutasUsuario.route("/usuarios/:id").delete((req, res) => {
  eliminarUsuario(req.params.id, genericCallback(res));
});

export default rutasUsuario;
