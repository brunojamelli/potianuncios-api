const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailservice = require('../middlewares/email-service');
async function emailRepository(email) {
    const user = await connection('advertisers').select('*').where('email', email);
    if (user.length == 0) return null;

    return user;
}
function generateAccessToken(user) {
    // expires after half and hour (600 seconds = 10 minutes)
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: 1200 });
}
// users hardcoded for simplicity, store in a db for production applications
const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}
const advertisers_ = [
    { id: 1, username: 'morato', password: 'teter', name: 'antonio luiz da silva', role: ROLE.BASIC },
    { id: 2, username: 'cano', password: 'ether', name: 'german cano', role: ROLE.BASIC },
    { id: 3, username: 'marquinhos', password: 'nano', name: 'marquinhos gabriel', role: ROLE.BASIC },
    { id: 4, username: 'zeca', password: 'litecoin', name: 'Jose alguma coisa', role: ROLE.BASIC }

];

const admins_ = [
    { id: 1, username: 'german', password: 'USDC', name: 'germam', role: ROLE.ADMIN },
    { id: 2, username: 'franco', password: 'bitcoin', name: 'gonzales', role: ROLE.ADMIN },
    { id: 3, username: 'zola', password: 'b4', name: 'carneiro', role: ROLE.ADMIN },
    { id: 4, username: 'zidane', password: 'nasdac', name: 'gutierez', role: ROLE.ADMIN },
    { id: 5, username: 'cr7', password: 'dogecoin', name: 'cristiano ronaldo', role: ROLE.ADMIN }

]
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
        console.log(user);

        // caso o email seja um email cadastrado
        if (user != null) {

            // cria a configuração do cliente SMTP
            var smtp = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "d45b9b439b0c48",
                    pass: "fe069bfd158de2"
                }
            });

            // cria uma nova senha randomicamente
            const newPassword = crypto.randomBytes(4).toString('HEX');

            var mailOptions = {
                from: 'Administração <3e5ab7b0f9-8cfc28@inbox.mailtrap.io>',
                to: email,
                subject: 'Mudança de senha',
                text: newPassword
            };


            const changes = { password: newPassword }

            try {
                // atualiza no banco de dados a nova senha
                const userId = user[0].id;
                console.log(userId);
                const count = await connection('advertisers').where({ id: userId }).update(changes);
                if (count) {
                    console.log({ updated: count });

                    // envia a senha para o email do usuario
                    // smtp.sendMail(mailOptions, function (error, info) {
                    //     if (error) {
                    //         return console.log(error);
                    //     }
                    //     console.log('Message sent: ' + info.response);
                    //     return response.status(201).json({ message: 'email sended' });
                    // });
                    emailservice.send(email, 'Administração Potianuncios', user.name, newPassword);
                    return response.status(201).json({ message: 'email sended' });

                } else {
                    console.log({ message: "Record not found" })
                }
            } catch (err) {
                // res.status(500).json({ message: "Error updating new post", error: err })
                console.log(err);
            }


        }
        else { return response.status(400).send("Invalid user Email"); }
    }


}