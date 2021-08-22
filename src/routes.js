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
// rotas de autenticação
routes.post('/loginAn', UserController.loginAdvertiser);
routes.post('/loginAdmin', UserController.loginAdmin);

// rota de registro de anúnciantes
routes.post('/advertiser', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        whatsapp: Joi.string().required().min(9),
        email: Joi.string().email(),
        password: Joi.string().required(),
        address: Joi.optional()
    })
}), AdController.create);
// advertiser route
routes.put('/Advertiser/:id', verifyJWT, authMid.roleController(["basic"]), AdController.edit);
routes.get('/advertiser/:id', verifyJWT, authMid.roleController(["admin", "basic"]), AdController.profile);
routes.get('/Advertiser', verifyJWT, authMid.roleController(["admin"]), AdController.index);
routes.post('/forgot-password', UserController.forgotPassword);
// cadastro de anúncio
routes.post('/announcement', celebrate({
    [Segments.BODY]: Joi.object().keys({
        category: Joi.string().required().min(4),
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(8),
        value: Joi.number().required(),
        quantity: Joi.optional(),
        advertiser_id: Joi.optional()
    })
}), AnController.create);

// advertiser route
routes.get('/announcement/advertiser/:id', verifyJWT, authMid.roleController(["basic"]), AnController.announcementsById);
routes.get('/announcement', verifyJWT, authMid.roleController(["admin", "basic"]), AnController.index);

// rotas de listagem de anúncios na visão do administrador
routes.get('/announcement/by_validation', verifyJWT, authMid.roleController(["admin"]), AnController.adsByValidAttribute);
routes.get('/announcement/ordered', verifyJWT, authMid.roleController(["admin"]), AnController.adsByCreationDate);

// rotas para controle de estado dos anúncios
routes.delete('/announcement/:id', authMid.roleController(["basic"]), AnController.deleteAnnouncement);
routes.patch('/announcement/validation/:id', AnController.validationAnnouncement);
routes.patch('/announcement/desativation/:id', AnController.desativeAnnouncement);
routes.patch('/announcement/activation/:id', AnController.activationAnnouncement);

// rotas de cadastro e listagem de administradores
routes.post('/administrator', verifyJWT, authMid.roleController(["admin"]), AdmController.create);
routes.get('/administrator', verifyJWT, authMid.roleController(["admin"]), AdmController.index);

// rotas para a gerencia das fotos dos anúncios
routes.post('/photo', upload, PhController.create);
routes.get('/photo/:filename', PhController.show);
routes.get('/photo/filenames/announcement/:id', PhController.showPhotoNames);
routes.get('/photo/filenames', PhController.showFirstFotoNames);

// rota de anúncios publicos
routes.get('/announcements/public', AnController.publicAnnouncements);
routes.get('/advertiser/public/:id', AdController.profile);

module.exports = routes;