
exports.up = function(knex) {
    return knex.schema.createTable('product', function (table){
        table.increments();
  
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
  
        table.string('market_id').notNullable();
        table.foreign('market_id').references('id').inTable('market')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product')
};
