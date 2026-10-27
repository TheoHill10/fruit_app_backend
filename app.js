const express = require('express'); //requires the express framework saving it to exrpeess
const cors = require('cors')
const app = express() //always needs paraenthesis. defining a new variable app so express becomes an application
const fruits = require('./routes/fruitsRouter')

app.use(cors())
app.use(express.json()) //turns javascript into a js objective which we can work with
app.use('/fruits', fruits)

app.get('/', (req, res) => { //app is talking with express. .get is a http method and it retrieves it, we always use req and res as the arguments. // '/' is the path we are looking for
  res.send('Hello fruity') //send is a method of the response and that sends the message
})

module.exports = app