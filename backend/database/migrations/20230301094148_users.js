exports.up = async function (knex) {
	await knex.schema.createTable('users', function (table) {
		table.increments('id').primary()
		table.string('username', 255).notNullable()
		table.string('email', 255).notNullable().unique()
		table.string('password', 255).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
}

exports.down = async function (knex) {
	return await knex.schema.dropTableIfExists('users')
}
