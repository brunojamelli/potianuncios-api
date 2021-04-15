
exports.up = function (knex) {
    return knex.schema.createTable('announcements', function (table) {
        table.increments('id');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('dateExpiration');
        table.string('category');
        table.integer('advertiserId').references('id').inTable('advertisers');
        table.string('title');
        table.string('description');
        table.float('value');
        table.boolean('valid');
        table.integer('validateFor').references('id').inTable('administrators');        
    });
};

exports.down = function (knex) {

};
