const connection = require("./database/db");
const express = require("express");
const cors = require("cors");

//Routerlar
const authRouter = require("./routers/auth.router");
const todoRouter = require("./routers/todo.router");

//Api istekleri için application
const app = express();

//İsteklerin türü Json olarak ayarlanıyor
app.use(express.json());

//CORS politikası yazılıyor
app.use(cors());

//Db Connection
connection().then();

//Auth Router
app.use("/api/auth/", authRouter);

//Todo Router
app.use("/api/todo/", todoRouter);

//Server dinleme
app.listen(3000, ()=> console.log("Sunucu çalışıyor..."));



