const path = require('path');
const db = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { an_id } = request.body;
        var filename, filepath, mimetype, size;
        request.files.forEach(element => {
            filename = element.filename;
            filepath = element.filename;
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
                .then(() => console.log({ success: true, filename }))
                .catch(err => console.log(
                    {
                        success: false,
                        message: 'upload failed',
                        stack: err.stack,
                    }
                )
                );
        });




        // return response.json('/image api');
        return response.status(201).send({ result: "success" });
    },
    async show(request, response) {
        const { filename } = request.params;
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, 'uploads/' + filename);
        return response.sendFile(fullfilepath);
    },

    
}