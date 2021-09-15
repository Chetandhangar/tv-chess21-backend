const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

const routerUser = require('./routers/user.router.js')
const routerVideo = require('./routers/video.router.js')

const app = express();


app.use(cors())
app.use(bodyParser.json())
app.use("/user",routerUser)
app.use('/video',routerVideo)




const dbConnection = require('./database/database.js')
dbConnection()

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(process.env.PORT || 3000,() => {
  console.log('server started');
});