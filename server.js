const express = require('express')
const cors = require('cors')
const { db } = require('./src/models')

const app = express()

var corsOptions = {
    origin: "http://localhost:8000"
}

app.use(cors(corsOptions))

// for parse request of Content-type - application/json
app.use(express.json())

// for parse request of Content-type - application/x-www-form-urlenconded
app.use(express.urlencoded({extended: true}))

// create route

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
