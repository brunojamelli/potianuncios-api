
exports.up = function(knex) {
    return knex.schema.createTable('advertisers', function (table) {
        table.increments('advertiserId');   
        table.string('name'); 
        table.string('whatsapp'); 
        table.string('email'); 
        table.string('password');
        table.string('address'); 
    });
};

exports.down = function(knex) {
  
};
