//importar express TRADICIONAL
//const express = require('express');

//import express manera actual
import Express from "express";
import { MongoClient } from "mongodb";

const stringConexion =
  "mongodb+srv://riky:<password>@ecotextil.upg8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
/*"mongodb+srv://admin:admin@EcoTextil.pd6q6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";*/

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const app = Express();
app.use(Express.json());

app.get("/productos", (req, res) => {
  console.log("alguien hizo get en la ruta /productos");
  conexion
    .collection("productos")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error consultando los vehiculos");
      } else {
        res.json(result);
      }
    });
  /*const productos = [
    {
      idProducto: 1,
      descripcion: "tela a",
      valorUnit: 10000,
      estado: "disponible",
    },
    {
      idProducto: 2,
      descripcion: "tela b",
      valorUnit: 10000,
      estado: "disponible",
    },
    {
      idProducto: 3,
      descripcion: "tela c",
      valorUnit: 10000,
      estado: "disponible",
    },
    {
      idProducto: 4,
      descripcion: "tela d",
      valorUnit: 10000,
      estado: "disponible",
    },
  ];*/
  res.send(productos);
});

app.post("/productos/nuevo", (req, res) => {
  //crear usuario en la DB
  console.log(req);
  const datosProducto = req.body;
  console.log("llaves: ", Object.keys(datosProducto));
  if (
    Object.keys(datosProducto).includes("idProducto") &&
    Object.keys(datosProducto).includes("descripcion") &&
    Object.keys(datosProducto).includes("valorUnit") &&
    Object.keys(datosProducto).includes("estado")
  ) {
    //implementar código para crear productos
    conexion.collection("productos").insertOne(datosProducto, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(result);
        res.sendStatus(200);
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
  //res.send('ok, usuario creado')
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error("Error conectando a la base de datos");
    }
    conexion = client.db("ecotextil").collection("productos");
    console.log("conexión exitosa");
    return app.listen(5000, () => {
      console.log("Escuchando puerto 5000");
    });
  });
};

main();
