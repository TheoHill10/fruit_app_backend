require('dotenv').config()
const app = require('./app')
//const port = 3000 //define out own port because doing it on our own machine and not using a server
const port = process.env.PORT

//makes sure express is actually working, nothing for the server. 
app.listen(port, () => { //method to make sure the server has been listening for connections
  console.log(`Example app listening on port ${port}`)
})