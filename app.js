const express = require('express');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const router = express.Router();
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(boom());
require('./routes')(router);
app.use(router);

module.exports = app;
