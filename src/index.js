import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agrega esta línea
app.use(cors());

const conexion = mysql.createPool({
  host: "3.216.22.69",
  user: "fernan",
  password: "admin",
  database: "formulario"
});

function startServer() {
  const port = process.env.PORT || 3000;

  const server = app.listen(port, function() {
    console.log("Servidor funcionando en puerto: " + port);
  });

  // Release the connection when the server is shut down
  process.on("SIGINT", function() {
    server.close(function() {
      conexion.end();
      process.exit();
    });
  });
}

conexion.getConnection(function(error, connection) {
    if (error) {
      console.error("Error connecting to MySQL:", error);
      process.exit(1); // Exit the application if there's an error connecting to MySQL
    } else {
      console.log("Conexión exitosa");
  
      startServer();
    }
  });
  

app.post("/api/personas", (req, res) => {
  let data = {
    nombres: req.body.NOMBRES,
    email: req.body.EMAIL,
    celular: req.body.CELULAR,
    msg: req.body.MSG
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
