const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const AdmController = require('./controllers/AdminController')
const PhController = require('./controllers/PhotoController')
const multer = require('multer');// Create multer object
const imageUpload = multer({
    dest: 'uploads',
});
const express = require('express');
const routes = express.Router();

routes.post('/advertiser', AdController.create);
// routes.put('/Advertiser/:id', AdController.put);
// routes.delete('/Advertiser/:id', AdController.delete);
routes.get('/advertiser/:id', AdController.profile);
routes.get('/Advertiser', AdController.index);

routes.post('/announcement', AnController.create);
routes.get('/announcement', AnController.show);

routes.post('/administrator', AdmController.create);
routes.get('/administrator', AdmController.profile);

routes.post('/photo', imageUpload.single('image'),PhController.create);
routes.get('/photo/:filename', PhController.show);


module.exports = routes;