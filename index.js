const express = require("express");
const app = express();

const baseDir = `${__dirname}/build/`;

app.use(express.static(`${baseDir}`));

app.use(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
});

app.get("*", (req, res) => res.sendFile("index.html", { root: baseDir }));

const port = 3000;

app.listen(port, () =>
  console.log(`Servidor subiu com sucesso em http://localhost:${port}`)
);
