// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', productRoutes);
app.use('/api', userRoutes);

module.exports = app;
