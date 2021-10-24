import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllVentas = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .find({})
    .limit(50)
    .toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  //crear venta en la DB
  if (
    Object.keys(datosVenta).includes("idVenta") &&
    Object.keys(datosVenta).includes("idProducto") &&
    Object.keys(datosVenta).includes("cantProd") &&
    Object.keys(datosVenta).includes("valorUnit") &&
    Object.keys(datosVenta).includes("idCliente") &&
    Object.keys(datosVenta).includes("nombreCliente") &&
    Object.keys(datosVenta).includes("fechaVenta") &&
    Object.keys(datosVenta).includes("valTotalVenta") &&
    Object.keys(datosVenta).includes("estadoVenta") &&
    Object.keys(datosVenta).includes("vendedor")
  ) {
    const baseDeDatos = getDB();
    //implementar código para crear ventas
    await baseDeDatos
      .collection("ventas")
      .insertOne(datosVenta, callback);
  } else {
    return "error";
  }
};

const editarVenta = async (id, edicion, callback) => {
  //const edicion = req.body;
  //filtro para realizar actualizaciones
  const filtroVenta = { _id: new ObjectId(id) };

  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("ventas")
    .deleteOne(filtroVenta, callback);
};

export { queryAllVentas, crearVenta, editarVenta, eliminarVenta };
