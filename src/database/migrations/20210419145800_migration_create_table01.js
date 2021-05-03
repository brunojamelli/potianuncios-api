
exports.up = function(knex) {
    return knex.schema.createTable('advertisers', function (table) {
        table.increments('id');   
        table.string('name'); 
        table.string('whatsapp'); 
        table.string('email'); 
        table.string('password');
        table.string('address'); 
        table.string('role'); 
    });
};

exports.down = function(knex) {
  
};