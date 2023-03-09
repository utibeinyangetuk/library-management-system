const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { pool } = require('../backend/database/dbconfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const AuthenticateUser = require('./middlewares/userAuthentication')
const app = express()
const port = 3000

// middlewares
dotenv.config()
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(session({ secret: 'adminstuffs', resave: false, saveUninitialized: false }))

// passport
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))

const authenticateuser = (email, password, done) => {
	pool.query(`select * from users where email=$1`, [email], (err, results) => {
		if (err) {
			throw err
		}
		if (results.rows.length > 0) {
			const user = results.rows[0]
			// use bcrypt to compare the saved password with the one typed by the user
			bcrypt.compare(password, user.password, (err, isMatch) => {
				// wrong password
				if (err) {
					throw err
				}
				// correct password
				if (isMatch) {
					return done(null, user)
				} else {
					console.log('password is incorrect')
					return done(null, false, { message: 'Password is incorrect.' })
				}
			})
		} else {
			console.log('Email does not exist')
			return done(null, false, { message: 'This email does not exist.' })
		}
	})
}

// use the localStrategy to check the user's input
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		authenticateuser
	)
)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
	pool.query(`select * from users where id=$1`, [id], (err, results) => {
		if (err) {
			throw err
		} else {
			return done(null, results.rows[0])
		}
	})
})
// End of passport strategy

// routes
// login route
app.post('/api/users/login', async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err)
		}
		// throw error if credentials are wrong
		if (!user) {
			console.log('❌ Incorrect email or password ❌')
			return res.send({ error: '❌ Incorrect email or password ❌' })
		} else {
			res.send({ success: '✅ Login successful ✅' })
		}
	})(req, res, next)
})

// signup route
app.post('/api/users/signup', async (req, res) => {
	let { username, email, password } = req.body
	console.log(req.body)
	try {
		let hashedPassword = await bcrypt.hash(password, 10)

		pool.query(
			// checking database to see if the user exists
			`SELECT * FROM users WHERE email = $1`,
			[email],
			(error, results) => {
				if (error) {
					throw error
				} else {
					if (results.rows.length > 0) {
						res.send({ error: '❌ This email already exist ❌' })
					} else {
						pool.query(
							// if user doesn't exist, then register the user
							`INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`,
							[username, email, hashedPassword],
							(err, results) => {
								if (err) {
									throw err
								}
								console.log('Registration successful')
								res.send({
									success: '✅ Registration successful ✅',
								})
							}
						)
					}
				}
			}
		)
	} catch (error) {
		throw error
	}
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => console.log(`server running on port ${port}!`))
module.export = app
