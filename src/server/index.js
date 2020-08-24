// express and app instance
const express = require('express')
const app = express()

// middleware and cors
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use(express.static('dist'))

let port = 3000;
app.listen(port, function () {
    console.log(`server running on port ${port}!`)
})


let serverStorage = {};
app.post('/appStorage', (request, response) => {
    serverStorage = {
        city: request.body.city,
        image: request.body.image,
        temp: request.body.temp
    }
    console.log(serverStorage)
})

// send data to client
app.get('/serverData', async (request, response) => {
    const data = await serverStorage;
    response.send(data);
})