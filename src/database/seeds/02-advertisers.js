const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('advertisers').del()
    .then(function () {
      // Inserts seed entries
      return knex('advertisers').insert([
        { id: 1, name: 'morato', password: 'teter', email:'morato@gmail.com', whatsapp:'987050775', address:'', role: ROLE.BASIC },
        { id: 2, name: 'leo matos', password: 'teter', email:'caveira@gmail.com', whatsapp:'981069624', address:'', role: ROLE.BASIC },
        { id: 3, name: 'marquinhos', password: 'nano', email:'mqgab@outlook.com', whatsapp:'999221136', address:'', role: ROLE.BASIC },
        { id: 4, name: 'zeca', password: 'litecoin', email:'pagotinho@protonmail.com', whatsapp:'987000775', address:'', role: ROLE.BASIC }      ]);
    });
};
