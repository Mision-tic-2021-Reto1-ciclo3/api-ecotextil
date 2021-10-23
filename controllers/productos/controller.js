import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryTodosProductos = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("productos")
    .find({})
    .limit(50)
    .toArray(callback);
};

const crearProducto = async (datosProducto, callback) => {
  //crear producto en la DB
  if (
    Object.keys(datosProducto).includes("idProducto") &&
    Object.keys(datosProducto).includes("descripcion") &&
    Object.keys(datosProducto).includes("valorUnit") &&
    Object.keys(datosProducto).includes("estado")
  ) {
    const baseDeDatos = getDB();
    //implementar código para crear productos
    await baseDeDatos
      .collection("productos")
      .insertOne(datosProducto, callback);
  } else {
    return "error";
  }
};

const editarProducto = async (edicion, callback) => {
  //const edicion = req.body;
  //filtro para realizar actualizaciones
  const filtroProducto = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("productos")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarProducto = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("productos")
    .deleteOne(filtroProducto, callback);
};

export { queryTodosProductos, crearProducto, editarProducto, eliminarProducto };
