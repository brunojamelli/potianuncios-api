
const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const express = require('express');

const routes = express.Router();

routes.post('/Advertiser', AdController.post);
routes.put('/Advertiser/:id', AdController.put);
routes.delete('/Advertiser/:id', AdController.delete);
routes.get('/Advertiser', AdController.get);
routes.get('/Advertiser/:id', AdController.getById);

routes.post('/announcement', AnController.create);
routes.get('/announcement', AnController.show);

module.exports = routes;