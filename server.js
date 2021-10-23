//importar express TRADICIONAL
//const express = require('express');

//import express manera actual
import Express from "express";

import dotenv from 'dotenv';
import Cors from "cors";
import {conectarBD, getDB} from './db/db.js';

dotenv.config({ path: './.env'});


 /* "mongodb+srv://riky:ecotextil@ecotextil.upg8z.mongodb.net/test?authSource=admin&replicaSet=atlas-udecoi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
/*"mongodb+srv://riky:<ecotextil>@ecotextil.upg8z.mongodb.net/EcoTextil?retryWrites=true&w=majority";
  /*"mongodb+srv://admin:admin@EcoTextil.pd6q6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";*/





const app = Express();
app.use(Express.json());
app.use(Cors());

app.get("/productos", (req, res) => {
  console.log("Alguien hizo get en la ruta /productos");
  const baseDeDatos = getDB();
  baseDeDatos
    .collection("productos")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consultando los productos");
      } else {
        res.json(result);
      }
    });
});

app.post("/productos/nuevo", (req, res) => {
  //crear producto en la DB
  console.log(req);
  const datosProducto = req.body;
  console.log("llaves: ", Object.keys(datosProducto));
  try {
    if (
      Object.keys(datosProducto).includes("idProducto") &&
      Object.keys(datosProducto).includes("descripcion") &&
      Object.keys(datosProducto).includes("valorUnit") &&
      Object.keys(datosProducto).includes("estado")
    ) {
      const baseDeDatos = getDB();
      //implementar código para crear productos
      baseDeDatos
        .collection("productos")
        .insertOne(datosProducto, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        });
    } else {
      res.sendStatus(500);
    }
    //res.send('ok, usuario creado')
  } catch {
    res.sendStatus(500);
  }
});
//editar productos
app.patch("/productos/editar", (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  //filtro para realizar actualizaciones
  const filtroProducto = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  baseDeDatos
    .collection("productos")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true },
      (err, result) => {
        if (err) {
          console.error("error actualizando el producto", err);
          res.sendStatus(500);
        } else {
          console.log("Actualizado con éxito");
          res.sendStatus(200);
        }
      }
    );
});
//Eliminar productos
app.delete("/productos/eliminar", (req, res) => {
  const filtroProducto = { _id: new ObjectId(req.body.id) };
  const baseDeDatos = getDB();
  baseDeDatos
    .collection("productos")
    .deleteOne(filtroProducto, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
});

/*const dbName = "ecotextil";

async function main() {
  await client.connect();
  console.log("Conectado satisfactoriamente al servidor");
  const db = client.db(dbName);
  const collection = db.collection("productos");

  return "done.";
}*/
const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
  });
};

/*main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());*/
conectarBD(main);
