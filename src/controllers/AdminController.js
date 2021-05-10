const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const {
            name,
            email,
            password,
        } = request.body;
        const role = 'admin';
        if (password == undefined || password.length < 8 || password == '') {
            return response.status(400).send("Passoword invalid");
        }
        try {
            let res = await connection('administrators').insert({
                name,
                email,
                password,
                role
            });

            return response.status(201).send({ result: "created" });
        } catch (error) {
            return response.status(400).send({error: 'not created'})
        }


    },

    async profile(request, response) {
        const { id } = request.params;
        const user = await connection('administrators').select('*').where('id', id);

        return response.json({
            id: user.id,
            name: user.name,
        });
    },

    async index(request, response) {
        const list = await connection('administrators').select('*');
        return response.json(list);
    }
}