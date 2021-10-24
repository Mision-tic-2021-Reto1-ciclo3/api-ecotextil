import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryTodosUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .find({})
    .limit(50)
    .toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  //crear usuario en la DB
  if (
    Object.keys(datosUsuario).includes("nombres") &&
    Object.keys(datosUsuario).includes("correo") &&
    Object.keys(datosUsuario).includes("password") &&
    Object.keys(datosUsuario).includes("rol")
  ) {
    const baseDeDatos = getDB();
    //implementar código para crear usuarios
    await baseDeDatos
      .collection("usuarios")
      .insertOne(datosUsuario, callback);
  } else {
    return "error";
  }
};

const editarUsuario = async (id, edicion, callback) => {
  //const edicion = req.body;
  //filtro para realizar actualizaciones
  const filtroUsuario = { _id: new ObjectId(id) };

  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("usuarios")
    .deleteOne(filtroUsuario, callback);
};

export { queryTodosUsuarios, crearUsuario, editarUsuario, eliminarUsuario };
