const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
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
        return response.json({ auth: true, token: generateAccessToken({id: user.id, role: user.role}), user: { id: user.id, username: user.username, role: user.role } });
    },
    async loginAdmin(request, response) {
        const email = request.body.email;
        const pwd = request.body.password;
        const admins = await connection('administrators').select('*');

        const user = admins.find(u => u.email === email && u.password === pwd);

        if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
        return response.json({ auth: true, token: generateAccessToken({id: user.id, role: user.role}), user: { id: user.id, username: user.username, role: user.role } });
    }
}