const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { pool } = require('../backend/database/dbconfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const Localstrategy = require('passport-local').Strategy

const app = express()
const port = 3000

// middlewares
dotenv.config()
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(session({ secret: 'adminstuffs', resave: false, saveUninitialized: false }))

// passport
app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())

// setting up passport strategy

// Registering the users
app.post('/api/users/register', (req, res) => {
	let { username, email, password } = req.body
	console.log(req.body)
})

// paths
app.listen(port, () => console.log(`server running on port ${port}!`))
module.export = app
