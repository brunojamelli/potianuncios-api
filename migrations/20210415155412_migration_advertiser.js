
exports.up = function(knex) {
    return knex.schema.createTable('advertisers', function (table) {
        table.string('id').primary();   
        table.string('name'); 
        table.string('description'); 
        table.string('localization'); 
        table.string('responsible');
        table.boolean('special'); 
        table.string('justification'); 
        table.boolean('disabled'); 
        table.boolean('computers'); 
        table.integer('qtdPeople'); 
        table.integer('extension'); 
    });
};

exports.down = function(knex) {
  
};
