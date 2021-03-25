'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conectando ao banco de dados
mongoose.connect("mongodb+srv://root:root@cluster0.4wcvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Carrega os Models
// const Product = require("./models/product");

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;