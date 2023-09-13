const bodyParser = require('body-parser');
const express = require('express'); 

const app = express();
const jsonParser = bodyParser.json();

app.listen(9090, () => {
  console.log("server is running !!!");
});
