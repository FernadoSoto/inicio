var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");
var app = express();

app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "formulario"
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexion existosa");
    }
});

const port = process.env.PUERTO || 3000;

app.listen(port, function() {
    console.log("Servidor funcionando en puerto: " + port);
});

app.post("/api/personas", (req, res) => {
    let data = {
        nombres: req.body.NOMBRES,
        email: req.body.EMAIL,
        celular: req.body.CELULAR,
        msg: req.body.MSG,
    };
    let sql = "INSERT INTO personas SET ?";
    conexion.query(sql, data, function(error, resultados) {
        if (error) {
            throw error;
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

app.get("/api/fechas_civicas", function(req, res) {
    var sql = "SELECT * FROM fechas_civicas WHERE FECHA = CURDATE()";
    conexion.query(sql, function(error, results) {
        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});
