const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('administrators').del()
    .then(function () {
      // Inserts seed entries
      return knex('administrators').insert([
        {id: 1, name: 'german', email: 'german@gmail.com', password:'USDC', role:ROLE.ADMIN},
        {id: 2, name: 'franco', email: 'franco@protonmail.com', password:'bitcoin', role:ROLE.ADMIN},
        {id: 3, name: 'zola', email: 'zola@outlook.com', password:'b4', role:ROLE.ADMIN},
        {id: 4, name: 'zidane', email: 'zidane@alamadrid.com', password:'nasdac', role:ROLE.ADMIN},
        
      ]);
    });
};
