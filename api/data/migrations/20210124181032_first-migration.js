exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('role').notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('events', (table) => {
      table.increments('event_id')
      table.string('event_name', 100).notNullable()
      table.string('date').notNullable()
      table.string('location').notNullable()
    })
    .createTable('dishes', (table) => {
      table.increments('dish_id')
      table.string('dish_name', 50).notNullable
    })
    .createTable('event_dishes', (table) => {
      table.increments('event_resource_id')
      table.integer('event_id')
      .unsigned()
      .notNullable()
      .references('event_id')
      .inTable('events')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.integer('dish_id')
      .unsigned()
      .notNullable()
      .references('dish_id')
      .inTable('dishes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.boolean('reserved').defaultTo(0).notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('event_dishes')
    .dropTableIfExists('dishes')
    .dropTableIfExists('events')
    .dropTableIfExists('users')
}
