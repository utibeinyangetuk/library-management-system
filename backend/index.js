const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { pool } = require('../backend/database/dbconfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const Localstrategy = require('passport-local').Strategy
const AuthenticateUser=require("./modules/userAuthentication")
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

// setting up login authentication
// TODO? convert this function to a module and export it
// const AuthenticateUser = (email, password, done) => {
// 	pool.query(`select * from users where email=$1`[email], (err, results) => {
// 		// if there's an error, throw the error
// 		if (err) throw err
// 		// else begin authenticating the user
// 		if (results.rows.length > 0) {
// 			const user = results.rows[0]
// 			// use bcrypt to compare saved password with the one typed
// 			bcrypt.compare(user.password, password, (err, isMatch) => {
// 				// wrong password
// 				if (err) throw err
// 				if (isMatch) {
// 					return done(null, user)
// 				} else {
// 					console.log('incorrect password')
// 					return done(null, false)
// 				}
// 			})
// 		} else {
// 			console.log('email does not exist')
// 			return done(null, false)
// 		}
// 	})
// }

// use passport local strategy to check user's input
passport.use(
	new Localstrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		AuthenticateUser
	)
)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
	pool.query(`select * from users where id=$1`[id], (err, results) => {
		if (err) throw err
		else return done(null, results.rows[0])
	})
})

// Registering the users
app.post('/api/users/register', async (req, res) => {
	let { username, email, password } = req.body
	console.log(req.body)
	try {
		let hashedPassword = await bcrypt.hash(password, 5)
		// check database to see if user exist
		pool.query(`select * from users where email=$1`, [email], (err, results) => {
			if (err) {
				throw err
			} else {
				if (results.rows.length > 0) {
					console.log('email already exist')
					res.send({ error: 'email already exist' })
				} else {
					pool.query(`Insert into users (username,email,password) values ($1,$2,$3)`, [username, email, hashedPassword], (err, results) => {
						if (err) throw err
						console.log('registration successful')
						res.send({ success: 'registration successful' })
					})
				}
			}
		})
	} catch (error) {
		throw error
	}
})

// paths
app.listen(port, () => console.log(`server running on port ${port}!`))
module.export = app
