const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const valid = 0;
        const {
            category,
            title,
            description,
            value,
            advertiser_id
        } = request.body;
        let res = await connection('announcements').insert({
            category,
            advertiser_id,
            title,
            description,
            value,
            valid
        });

        return response.status(201).send({result: "success"});
        
    },

    show(request, response) {
        const { id } = request.params;
        // const space = await connection("spaces").select("*").where("id", id);
        return response.json(`informações anuncio do anunciante ${id}`);
    }
}