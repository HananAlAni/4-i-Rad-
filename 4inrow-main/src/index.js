const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
// Importar archivo de rutas
// app.use(require('./routes/index'));
// Importar carpeta Public
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3100, (err) => {
  if (err) throw new Error(err);
  console.log('Server working in port 3100');
})