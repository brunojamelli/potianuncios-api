require("dotenv-safe").config();
const UserController = require('./controllers/UserController');
const express = require('express');

const routes = express.Router();

routes.post('/usuario', UserController.post);
routes.put('/usuario/:id', UserController.put);
routes.delete('/usuario/:id', UserController.delete);
routes.get('/usuarios', UserController.get);
routes.get('/usuario/:id', UserController.getById);



module.exports = routes;