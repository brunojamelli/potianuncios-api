
exports.up = function (knex) {
    return knex.schema.createTable('photos', function (table) {
        table.increments('id');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.string('filename');
        table.string('filepath');
        table.string('mimetype');
        table.bigInteger('size');
        table.integer('an_id').references('id').inTable('announcements');
    });
};

exports.down = function (knex) {

};
