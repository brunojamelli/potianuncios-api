
exports.up = function (knex) {
    return knex.schema.createTable('announcements', function (table) {
        table.increments('id');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('dateExpiration');
        table.string('category');
        table.integer('advertiser_id').references('id').inTable('advertisers');
        table.string('title');
        table.string('description');
        table.float('value');
        table.integer('quantity');
        table.boolean('valid');
        //administrador que validou anuncio
        table.integer('adm_id').references('id').inTable('administrators');
        table.boolean('active');        
        table.boolean('deleted');

    });
};

exports.down = function (knex) {

};
