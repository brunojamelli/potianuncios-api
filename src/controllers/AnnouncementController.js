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

    async announcementsById(request, response) {
        const { id } = request.params;
        const list = await connection("announcements").select("*").where("advertiser_id", id);
        console.log(`informações anuncio do anunciante ${id}`);
        return response.json(list);
    },
}