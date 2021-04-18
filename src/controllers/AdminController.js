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

        let res = await connection('administrators').insert({
            name,
            email,
            password
        });

        return response.status(201).send({result: "success"});

    },

    async profile(request, response) {
        const { id } = request.params;
        const user = await connection('administrators').select('*').where('id', id);

        return response.json({
            id: user.id,
            name: user.name,
        });
    },
}