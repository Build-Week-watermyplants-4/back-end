
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
      users.increments('user_id')
      users.string('username', 128).notNullable().unique()
      users.string('password', 128).notNullable()
    })
    .createTable('plants', plants => {
      plants.increments('plant_id')
      plants.string('plant_name', 128).notNullable().unique()
      plants.string('plant_species', 128).notNullable()
      plants.string('plant_frequency', 32).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
