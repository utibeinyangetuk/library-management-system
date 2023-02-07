/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcrypt')
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del()
	await knex('users').insert([
		{
			id: 1,
			username: 'admin',
			email: 'admin@email.com',
			password: await bcrypt.hash('admin', 5),
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 2,
			username: 'user',
			email: 'user@email.com',
			password: await bcrypt.hash('user', 5),
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 3,
			username: 'utibe',
			email: 'utibe@email.com',
			password: await bcrypt.hash('12345', 5),
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
