const AdController = require('./controllers/AdvertiserController');
const AnController = require('./controllers/AnnouncementController');
const AdmController = require('./controllers/AdminController');
const PhController = require('./controllers/PhotoController');
const UserController = require('./controllers/UserController');

const authMid = require('./helpers/authMiddleware');
const verifyJWT = require('./helpers/auth');

const multer = require('multer');// Create multer object
const { celebrate, Segments, Joi } = require('celebrate');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, `${Date.now()} - ${file.originalname}`);
    },
    limits: {
        fileSize: 1024 * 1024
    }
});

var upload = multer({ storage: storage }).array('photo', 6);

const express = require('express');
const routes = express.Router();

routes.post('/loginAn', UserController.loginAdvertiser);
routes.post('/loginAdmin', UserController.loginAdmin);

routes.get('/onlyadmin', verifyJWT, authMid.roleController(["admin"]), (req, res) => {
    res.json({ message: 'FEIJAO' });
});
routes.get('/onlyadmin02', verifyJWT, authMid.roleController(["admin"]), (req, res) => {
    res.json({ message: 'ARROZ' });
});
routes.get('/onlyadmin03', verifyJWT, authMid.roleController(["admin"]), (req, res) => {
    res.json({ message: 'FAROFA' });
});
routes.get('/all_loged', verifyJWT, authMid.roleController(["admin", "basic"]), (req, res) => {
    res.json({ message: 'uhahuahuahu !!!' });
});

routes.get('/anunciante_view01', verifyJWT, authMid.roleController(["basic"]), (req, res) => {
    res.json({ message: 'bem vindo meu anunciante !!!' });
});
routes.get('/anunciante_view02', verifyJWT, authMid.roleController(["basic"]), (req, res) => {
    res.json({ message: 'bem vindo meu anunciante !!!' });
});


routes.post('/advertiser', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        whatsapp: Joi.string().required().min(9),
        email: Joi.string().email(),
        password: Joi.string().required(),
        address: Joi.optional()
    })
}), AdController.create);
routes.put('/Advertiser/:id', AdController.edit);
routes.get('/advertiser/:id', AdController.profile);
routes.get('/Advertiser', AdController.index);

routes.post('/announcement', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category: Joi.string().required().min(4),
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(8),
        value: Joi.number().required(),
        advertiser_id: Joi.optional()
    })
}), AnController.create);
routes.get('/announcement/advertiser/:id', AnController.announcementsById);
routes.get('/announcement', AnController.index);
routes.get('/announcement/by_validation', verifyJWT, authMid.roleController(["admin"]), AnController.adsByValidAttribute);
routes.get('/announcement/ordered', AnController.adsByCreationDate);


routes.delete('/announcement/:id', AnController.deleteAnnouncement);
routes.patch('/announcement/validation/:id', AnController.validationAnnouncement);
routes.patch('/announcement/desativation/:id', AnController.desativeAnnouncement);
//anuncio nao pode ser editado, apenas desativado e

routes.post('/administrator', AdmController.create);
routes.get('/administrator', AdmController.profile);

routes.post('/photo', upload, PhController.create);
routes.get('/photo/:filename', PhController.show);
routes.get('/photo/filenames/announcement/:id', PhController.showPhotoNames);



module.exports = routes;