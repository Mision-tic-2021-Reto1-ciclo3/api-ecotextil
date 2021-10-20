//importar express TRADICIONAL
//const express = require('express');

//import express manera actual
import Express from "express";
import { MongoClient } from "mongodb";

const stringConexion =
  "mongodb+srv://riky:ecotextil@ecotextil.upg8z.mongodb.net/test?authSource=admin&replicaSet=atlas-udecoi-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
/*"mongodb+srv://riky:<ecotextil>@ecotextil.upg8z.mongodb.net/EcoTextil?retryWrites=true&w=majority";
  /*"mongodb+srv://admin:admin@EcoTextil.pd6q6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";*/

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const app = Express();
app.use(Express.json());

app.get("/productos", (req, res) => {
  console.log("Alguien hizo get en la ruta /productos");
  conexion
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
      //implementar código para crear productos
      conexion
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

/*const dbName = "ecotextil";

async function main() {
  await client.connect();
  console.log("Conectado satisfactoriamente al servidor");
  const db = client.db(dbName);
  const collection = db.collection("productos");

  return "done.";
}*/
const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
    }
    conexion = client.db('EcoTextil');
    console.log('conexión exitosa');
    return app.listen(5000, () => {
      console.log('Escuchando puerto 5000'); 
    });
  });
};

/*main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());*/

main();
