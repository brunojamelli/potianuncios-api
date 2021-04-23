const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const valid = 0, active = 1, deleted = 0;
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
            valid,
            active,
            deleted
        });

        return response.status(201).send({ result: "success" });

    },

    async announcementsById(request, response) {
        const { id } = request.params;
        const list = await connection("announcements").select("*").where("advertiser_id", id);
        if (list.length == 0) return response.status(204).send("Invalid ID");
        console.log(`informações anuncio do anunciante ${id}`);
        return response.json(list);
    },

    async index(request, response) {
        const list = await connection('announcements').select('*');
        return response.json(list);
    },

    async adsByValidAttribute(request, response){
        const {isValid} = request.query;
        try {
            const announcement = await connection("announcements")
            .select("*")
            .where("valid", isValid);
            return response.json(announcement); 
        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async desativeAnnouncement(request, response) {
        const { id } = request.params;

        const announcement = await connection("announcements")
            .select("id")
            .where("id", id)
            .then(([row]) => {
                if (!row) {
                    return response.status(400).send("do not exist");
                }
                return connection("announcements")
                    .update({
                        'active': 0
                    })
                    .where("id", row.id);
            });
        console.log(announcement);
        if (announcement) return response.status(200).send("announcement desactivated");
    },

    async deleteAnnouncement(request, response) {
        const { id } = request.params;

        const announcement = await connection("announcements")
            .select("id")
            .where("id", id)
            .then(([row]) => {
                if (!row) {
                    return response.status(400).send("do not exist");
                }
                return connection("announcements")
                    .update({
                        'deleted': 1
                    })
                    .where("id", row.id);
            });
        console.log(announcement);
        if (announcement) return response.status(200).send("announcement deleted");
    },

    async validationAnnouncement(request, response) {
        try {
            const { id } = request.params;
            const announcement = await connection("announcements")
                .select("id")
                .where("id", id)
                .then(([row]) => {
                    if (!row) {
                        return response.status(400).send("do not exist");
                    }
                    return connection("announcements")
                        .update({
                            'valid': 1
                        })
                        .where("id", row.id);
                });
            console.log(announcement);
            return response.status(200).send("announcement validated");
        } catch (error) {
            return response.json(error)
        }
    }

    
}