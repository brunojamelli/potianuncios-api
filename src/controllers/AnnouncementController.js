const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const valid = 0, advertiser_id =1;
        const {
            category,
            title,
            description,
            value
        } = request.body;
        let res = await connection('announcements').insert({
            category,
            advertiser_id,
            title,
            description,
            value,
            valid
        });

        return response.json({ res });
    },

    show(request, response) {
        const { id } = request.params;
        // const space = await connection("spaces").select("*").where("id", id);
        return response.json(`informações anuncio do anunciante ${id}`);
    }
}