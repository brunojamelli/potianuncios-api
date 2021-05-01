// const connection = require('../database/connection');
module.exports = {

    async login(request, response) {
        const username = request.body.username;
        const pwd = request.body.password;
        // users hardcoded for simplicity, store in a db for production applications
        const users = [
            { id: 1, username: 'german', password: 'pg321', name: 'germam', role: Role.Admin },
            { id: 2, username: 'franco', password: 'pg1', name: 'gonzales', role: Role.User },
            { id: 3, username: 'zola', password: 'pg321', name: 'carneiro', role: Role.User },
            { id: 4, username: 'zidane', password: 'pg432', name: 'gutierez', role: Role.User }

        ];
        const user = users.find(u => u.username === username && u.password === pwd);

        if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
        return response.json({ auth: true, token: generateAccessToken(user.id), user: { id: user.id, username: user.username, role: user.role } });
    }
}