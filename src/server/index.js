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

let port = 5005;
app.listen(port, () => {
    console.log(`server running on port ${port}!`)
})

// server storage object
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

