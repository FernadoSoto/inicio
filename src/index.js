import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(join(__dirname, 'public')));

const conexion = mysql.createPool({
  host: '127.0.0.1',
  user: 'fernan',
  password: 'admin',
  database: 'formulario'
});

function startServer() {
  const port = 3000;

  const server = app.listen(port, function () {
    console.log('Servidor funcionando en puerto: ' + port);
  });

  process.on('SIGINT', function () {
    server.close(function () {
      conexion.end();
      process.exit();
    });
  });
}

conexion.getConnection(function (error, connection) {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  } else {
    console.log('Conexión exitosa');
    startServer();
  }
});

app.get('/', (req, res) => res.render('index.ejs'));

app.post('/api/personas', (req, res) => {
  let data = {
    nombres: req.body.NOMBRES,
    email: req.body.EMAIL,
    celular: req.body.CELULAR,
    msg: req.body.MSG
  };
  let sql = 'INSERT INTO personas SET ?';
  conexion.query(sql, data, function (error, resultados) {
    if (error) {
      throw error;
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.get('/api/fechas_civicas', function (req, res) {
  var sql = 'SELECT * FROM fechas_civicas WHERE FECHA = CURDATE()';
  conexion.query(sql, function (error, results) {
    if (error) {
      throw error;
    } else {
      res.json(results);
    }
  });
});
