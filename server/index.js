const express = require('express')
const bodyParser = require('body-parser')
const graphQLExpress = require('express-graphql')
const cors = require('cors')
const PORT = 3050

const schema = require('./graphql/schema')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphQLExpress({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log('Listening on Port: ' + PORT))