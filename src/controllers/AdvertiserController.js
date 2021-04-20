const connection = require('../database/connection');

function generateAccessToken(user) {
    // expires after half and hour (600 seconds = 10 minutes)
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: 600 });
}

module.exports = {
    async create(request, response) {
        const {
            name,
            whatsapp,
            email,
            password,
            address
        } = request.body;

        if (password == undefined || password.length < 8 || password == '') {
            return response.status(400).send("Passoword invalid");
        }


        let res = await connection('advertisers').insert({
            name,
            whatsapp,
            email,
            password,
            address
        });
        return response.status(201).send({ result: "success" });
    },

    async profile(request, response) {
        const { id } = request.params;
        const user = await connection('advertisers').select('*').where('id', id);
        if (user.length == 0) return response.status(400).send("Invalid ID");

        return response.json(user);
    },

    async index(request, response) {
        const advertisers = await connection('advertisers').select('*');
        return response.json(advertisers);
    },
    //serviço alterar senha
    async edit(request, response) {
        const { id } = request.params;
        const {
            name,
            whatsapp,
            email,
            address
        } = request.body;

        const advertiser = await connection("advertisers")
            .select("id")
            .where("id", id)
            .then(([row]) => {
                if (!row) {
                    return response.status(400).send("do not exist");
                }
                return connection("advertisers")
                    .update({
                        'name': name,
                        'whatsapp': whatsapp,
                        'email': email,
                        'address': address
                    })
                    .where("id", row.id);
            });
        return response.status(200).send("Advertiser Updated");
    },

    async login(request, response) {
        const username = request.body.username;
        const pwd = request.body.password;
        // users hardcoded for simplicity, store in a db for production applications
        const users = [
            { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
            { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
        ];
        const user = users.find(u => u.username === username && u.password === pwd);

        if (!user) { return response.status(500).json({ auth: false, message: 'Login inválido!' }); }
        return response.json({ auth: true, token: generateAccessToken(user.id), user: { id: user.id, username: user.username, role: user.role } });
    },
}




