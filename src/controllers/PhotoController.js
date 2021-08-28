const path = require('path');
const db = require('../database/connection');
const { logger } = require("../logger");

module.exports = {
    async create(request, response) {
        const { an_id } = request.body;
        var filename, filepath, mimetype, size;
        request.files.forEach(element => {
            filename = element.filename;
            filepath = `uploads/${element.filename}`;
            mimetype = element.mimetype;
            size = element.size;
            db
                .insert({
                    filename,
                    filepath,
                    mimetype,
                    size,
                    an_id
                })
                .into('photos')
                .then(() => logger.debug({ callback: { success: true, filename } }, "callback_image"))
                .catch(err => logger.error(
                    {
                        success: false,
                        message: 'upload failed',
                        stack: err.stack,
                    }
                )
                );
        });

        return response.status(201).send({ result: "success" });
    },
    async show(request, response) {
        const { filename } = request.params;
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, 'uploads/' + filename);
        return response.sendFile(fullfilepath);
    },

    async showPhotoNames(request, response) {
        const { id } = request.params;
        const list = await db("photos").select("filename").where("an_id", id);
        if (list.length == 0) return response.status(204).send("Invalid ID");
        // console.table(list);
        return response.json(list);
    },

    async showFirstFotoNames(request, response) {
        return response.json(['photo_an_01', 'photo_an_02']);
    }


}