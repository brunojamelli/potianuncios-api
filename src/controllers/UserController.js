const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailservice = require('../services/email-service');
const { logger } = require("../logger");

async function emailRepository(email) {
    const user = await connection('advertisers').select('*').where('email', email);
    if (user.length == 0) return null;

    return user;
}
function generateAccessToken(user) {
    // expires after half and hour (600 seconds = 10 minutes)
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: 1200 });
}

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

module.exports = {

    async loginAdvertiser(request, response) {
        const email = request.body.email;
        const pwd = request.body.password;
        const advertisers = await connection('advertisers').select('*');

        const user = advertisers.find(u => u.email === email && u.password === pwd);

        if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
        return response.json({ auth: true, token: generateAccessToken({ id: user.id, role: user.role }), user: { id: user.id, username: user.username, role: user.role } });
    },
    async loginAdmin(request, response) {
        const email = request.body.email;
        const pwd = request.body.password;
        const admins = await connection('administrators').select('*');

        const user = admins.find(u => u.email === email && u.password === pwd);

        if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
        return response.json({ auth: true, token: generateAccessToken({ id: user.id, role: user.role }), user: { id: user.id, username: user.username, role: user.role } });
    },

    async forgotPassword(request, response) {
        const email = request.body.email;
        // busca o email do usuario no banco de dados
        let user = await emailRepository(email);
        logger.info({ "user": user }, "user founded");

        // caso o email seja um email cadastrado
        if (user != null) {

            // cria uma nova senha randomicamente
            const newPassword = crypto.randomBytes(4).toString('HEX');

            const changes = { password: newPassword }

            try {
                // atualiza no banco de dados a nova senha
                const userId = user[0].id;
                logger.info({ "userid": userId }, "user to be updated")
                const count = await connection('advertisers').where({ id: userId }).update(changes);
                if (count) {
                    // envia a senha para o email do usuario
                    emailservice.send(email, 'Administração Potianuncios', newPassword);
                    logger.info("email sended");

                    return response.status(201).json({ message: 'email sended' });

                } else {
                    logger.info({ message: "Record not found" });
                }
            } catch (err) {
                // res.status(500).json({ message: "Error updating new post", error: err })
                logger.error({ error }, "erro");
            }


        }
        else { return response.status(400).send({ message: "Invalid user Email" }); }
    }


}