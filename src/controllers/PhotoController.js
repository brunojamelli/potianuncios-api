const path = require('path');

module.exports = {
    async create(request, response) {
        request.files.forEach(element => {
            console.log(element.filename);
        });
        return response.json('/image api');
        // return response.status(201).send({result: "success"});
    },
    async show(request, response) {
        const { filename } = request.params;
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, 'uploads/' + filename);
        return response.sendFile(fullfilepath);
    },
}