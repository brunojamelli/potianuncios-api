// require("dotenv-safe").config();
const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const express = require('express');

const routes = express.Router();

routes.post('/usuario', AdController.post);
routes.put('/usuario/:id', AdController.put);
routes.delete('/usuario/:id', AdController.delete);
routes.get('/usuarios', AdController.get);
routes.get('/usuario/:id', AdController.getById);

routes.post('/announcement', AnController.create);
routes.get('/announcement', AnController.show)

module.exports = routes;