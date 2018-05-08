const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3050

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.listen(PORT, () => console.log('Listening on Port: ' + PORT))