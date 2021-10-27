//importar express TRADICIONAL
//const express = require('express');

//import express manera actual
import Express from "express";
import dotenv from 'dotenv';
import Cors from "cors";
import {conectarBD, getDB} from './db/db.js';
import rutasProducto from "./views/productos/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";

dotenv.config({ path: './.env'});

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

/*const dbName = "ecotextil";

async function main() {
  await client.connect();
  console.log("Conectado satisfactoriamente al servidor");
  const db = client.db(dbName);
  const collection = db.collection("productos");

  return "done.";
}*/
const main = () => {
  return app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
  });
};

/*main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());*/
conectarBD(main);
