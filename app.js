const router = require('./routers/router.js')
const express = require('express')
const dotEnv = require('dotenv')
const session = require('express-session')
const app = express()
const port = 3000
dotEnv.config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.set('trust proxy', 1)
// setup session untuk men store id login
app.use(session({
  secret: 'BELOM_MANDI',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: true
  }
}))


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})