const path = require('path');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');

const compression = require('compression');
const cors = require('cors');

const config = require('./config/config');

const routes = require('./routes');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(compression());

app.use(cors());
app.options('*', cors());

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send('404 error! Page not found.');
});

module.exports = app;