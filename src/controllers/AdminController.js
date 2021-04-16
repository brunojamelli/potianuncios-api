const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            password
        } = request.body;
        
        if (password == undefined || password.length < 8 || password == '') {
            return response.status(400).send("Passoword invalid");
        }

        let res = await connection('advertisers').insert({
            name,
            email,
            password
        });

        return response.json({ res });
    },

    async profile(request, response) {
        const { id } = request.params;
        const user = await connection('advertisers').select('*').where('id', id);

        return response.json({
            id: user.id,
            name: user.name,
        });
    },
}