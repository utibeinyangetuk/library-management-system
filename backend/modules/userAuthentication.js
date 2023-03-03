const { pool } = require('../database/dbconfig')
const bcrypt = require('bcrypt')

const AuthenticateUser = (email, password, done) => {
	pool.query(`select * from users where email=$1`[email], (err, results) => {
		// if there's an error, throw the error
		if (err) throw err
		// else begin authenticating the user
		if (results.rows.length > 0) {
			const user = results.rows[0]
			// use bcrypt to compare saved password with the one typed
			bcrypt.compare(user.password, password, (err, isMatch) => {
				// wrong password
				if (err) throw err
				if (isMatch) {
					return done(null, user)
				} else {
					console.log('incorrect password')
					return done(null, false)
				}
			})
		} else {
			console.log('email does not exist')
			return done(null, false)
		}
	})
}

module.export = AuthenticateUser
