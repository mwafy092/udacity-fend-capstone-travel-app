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


// let appStorage = []
// app.post('/appStorage', (request, response) => {
//     appStorage.push(request.body)
//     console.log(appStorage)
// })

