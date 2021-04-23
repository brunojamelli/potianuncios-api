const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const AdmController = require('./controllers/AdminController')
const PhController = require('./controllers/PhotoController')
const multer = require('multer');// Create multer object

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

var upload = multer({ storage : storage }).array('photo',3);

const express = require('express');
const routes = express.Router();

routes.post('/advertiser', AdController.create);
routes.put('/Advertiser/:id', AdController.edit);
// routes.delete('/Advertiser/:id', AdController.delete);
routes.get('/advertiser/:id', AdController.profile);
routes.get('/Advertiser', AdController.index);

routes.post('/announcement', AnController.create);
routes.get('/announcement/advertiser/:id', AnController.announcementsById);
routes.get('/announcement', AnController.index);
routes.delete('/announcement/:id', AnController.deleteAnnouncement);
routes.patch('/announcement/validation/:id', AnController.validationAnnouncement);
routes.patch('/announcement/desativation/:id', AnController.desativeAnnouncement);
//anuncio nao pode ser editado, apenas desativado e

routes.post('/administrator', AdmController.create);
routes.get('/administrator', AdmController.profile);

routes.post('/photo', upload, PhController.create);
routes.get('/photo/:filename', PhController.show);


module.exports = routes;