const express = require('express')
const cors = require('cors')
const { db } = require('./src/models')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()

app.use(cookieParser('secret'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())

var corsOptions = {
    origin: "http://localhost:8000"
}

app.set('view engine', 'ejs')

app.use(cors(corsOptions))

// for parse request of Content-type - application/json
app.use(express.json())

// for parse request of Content-type - application/x-www-form-urlenconded
app.use(express.urlencoded({extended: true}))

// create route
app.use('/', require('./src/routes'))

db.sync()
.then(() => {
    console.log('db synced')
})
.catch((err) => {
    console.log('failed sync db err: ' + err.message)
})

const PORT = process.env.PORT || 8000 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
