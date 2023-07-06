const router = require('./routers/router.js')
const session = require('express-session')
const express = require('express')
const dotEnv = require('dotenv')
const app = express()
const port = 3000
dotEnv.config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('trust proxy', 1)

// setup session untuk men store id login
app.use(session({
  secret: 'keyboard_cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(router)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})