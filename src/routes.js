const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const AdmController = require('./controllers/AdminController')

const express = require('express');
const routes = express.Router();

routes.post('/advertiser', AdController.create);
// routes.put('/Advertiser/:id', AdController.put);
// routes.delete('/Advertiser/:id', AdController.delete);
// routes.get('/Advertiser', AdController.get);
// routes.get('/Advertiser/:id', AdController.getById);

routes.post('/announcement', AnController.create);
routes.get('/announcement', AnController.show);

routes.post('/administrator', AdmController.create);
routes.get('/administrator', AdmController.profile);

module.exports = routes;