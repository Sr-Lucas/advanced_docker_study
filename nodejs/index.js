const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const connection = mysql.createConnection(config);

const sqlInsert = `
  INSERT INTO people(name)
  VALUES ('Lucas Santos');
`;
connection.query(sqlInsert);

connection.end();

app.get('/', (req, res) => {
  res.send('<h1>FullCycle</h1>');
});

app.listen(port, () => {
  console.log('Rodando na porta:' + port);
});