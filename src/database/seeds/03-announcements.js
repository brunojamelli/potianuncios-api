
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('announcements').del()
    .then(function () {
      // Inserts seed entries
      return knex('announcements').insert([
        {
          id: 1,
          category: 'venda',
          title: 'milho',
          description: 'venda de milho de macaiba',
          value: 55.3,
          quantity: 8,
          valid: 0,
          active: 1,
          deleted: 0,
        },
        {
          id: 2,
          category: 'venda',
          title: 'milho',
          description: 'venda de feijao de são jose',
          value: 350,
          quantity: 8,
          valid: 0,
          active: 1,
          deleted: 0,
        },
        {
          id: 3,
          category: 'serviço',
          title: 'limpeza lavoura',
          description: 'limpeza de lavoura já plantada de maneira manual',
          value: 80,
          valid: 0,
          active: 1,
          deleted: 0,
        },
        {
          id: 4,
          category: 'serviço',
          title: 'corte de terras',
          description: 'corte de terra previo para plantio',
          value: 400,
          valid: 0,
          active: 1,
          deleted: 0,
        },
        {
          id: 5,
          category: 'venda',
          title: 'venda de leite',
          description: 'leite de gado',
          value: 4,
          quantity: 8,
          valid: 0,
          active: 1,
          deleted: 0,
        },
        {
          id: 6,
          category: 'venda',
          title: 'ovos caipiras',
          description: 'ovos caipiras de galinha de raça',
          value: 0.50,
          quantity: 200,
          valid: 0,
          active: 1,
          deleted: 0,
        }
      ]);
    });
};
