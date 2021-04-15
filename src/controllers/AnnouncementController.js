// const connection = require("../database/connection");
const connection = require('../database/connection');

module.exports = {
    create(request, response) {
        const {
            dateCreation,
            dateExpiration,
            category,
            advertiser,
            title,
            description,
            pictures,
            valid,
            validateFor
        } = request.body;
        
        return response.json("cadastrado");
    },

    show(request, response) {
        const { id } = request.params;
        // const space = await connection("spaces").select("*").where("id", id);
        return response.json(`informações anuncio do anunciante ${id}`);
    }
}