
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
      users.increments('user_id')
      users.string('user_name', 128).notNullable().unique()
      users.string('user_password', 128).notNullable()
    })
    .createTable('plants', plants => {
      plants.increments('plant_id')
      plants.string('plant_name', 128).notNullable().unique()
      plants.string('plant_species', 128).notNullable()
      plants.string('plant_frequency', 32).notNullable()
      plants.integer('user_id', )
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
