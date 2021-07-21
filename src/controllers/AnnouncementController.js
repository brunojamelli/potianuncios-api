const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const valid = 0, active = 1, deleted = 0;
        const {
            category,
            title,
            description,
            value,
            quantity,
            advertiser_id
        } = request.body;
        let res = await connection('announcements').insert({
            category,
            advertiser_id,
            title,
            description,
            value,
            quantity,
            valid,
            active,
            deleted
        });

        return response.status(201).send({ result: "success" });

    },

    async announcementsById(request, response) {
        const { id } = request.params;
        const { filterBy } = request.query;
        const list = await connection("announcements").select("*").where("advertiser_id", id);
        if (list.length == 0) return response.status(204).send("Invalid ID");
        console.log(`informações anuncio do anunciante ${id}`);
        switch (filterBy) {
            default:
                const list1 = await connection("announcements")
                    .select("*")
                    .where("advertiser_id", id)
                    .where("deleted", 0);
                return response.json(list1);
            case "valids":
                const list2 = await connection("announcements").
                    select("*")
                    .where("deleted", 0)
                    .where("advertiser_id", id)
                    .where("valid", true);
                return response.json(list2);
            case "invalids":
                const list3 = await connection("announcements").
                    select("*")
                    .where("deleted", 0)
                    .where("advertiser_id", id)
                    .where("valid", false);
                return response.json(list3);
            case "activated":
                const list4 = await connection("announcements").
                    select("*")
                    .where("deleted", 0)
                    .where("advertiser_id", id)
                    .where("active", true);
                return response.json(list4);
            case "disabled":
                const list5 = await connection("announcements").
                    select("*")
                    .where("deleted", 0)
                    .where("advertiser_id", id)
                    .where("active", false);
                return response.json(list5);
        }

        // if(filterBy == ){

        // }


    },

    async index(request, response) {
        const { ordered, quantity, title, category, price } = request.query;
        console.log(request.query)
        let list;

        if (ordered == null && quantity == null) {
            // console.log(quantity);
            list = await connection('announcements')
                .select('*').where("deleted", 0);
        } else if (quantity != null && ordered != null) {
            list = await connection('announcements')
                .select("*")
                .where("deleted", 0)
                .orderBy('createdAt')
                .limit(quantity);
        } else if (ordered == 'desc' && quantity == null) {
            list = await connection('announcements')
                .select("*")
                .where("deleted", 0)
                .orderBy('createdAt', 'desc');
        } else {
            list = await connection('announcements')
                .select("*")
                .where("deleted", 0)
                .orderBy('createdAt', 'desc')
                .limit(quantity);
        }

        return response.json(list);
    },

    async adsByValidAttribute(request, response) {
        const { isValid } = request.query;
        try {
            const announcement = await connection("announcements")
                .select("*")
                .where("deleted", 0)
                .where("valid", isValid);
            return response.json(announcement);
        } catch (error) {
            return response.status(400).json(error);
        }
    },

    async adsByCreationDate(request, response) {
        const { quantity } = request.query;
        try {
            const list = await connection("announcements")
                .select("*")
                .where("deleted", 0)
                .orderBy('createdAt')
                .limit(quantity)
            return response.json(list);
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