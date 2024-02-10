//Importing Modules

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//Setting Up Express And Adding Middleware Functions

const app = express()
app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

//Defining Route Handler For GET Requests

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/register.html')
})

//Setting Up MongoDB And Posting Form Data

main().catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/registerCricket')
    const registerSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true,
            unique: true
        },
        role: String,
        batStyle: String,
        bowlStyle: String
    })
    const Register = mongoose.model('Register', registerSchema)
    app.post('/register', (req, res) => {
        var myData = new Register(req.body)
        myData.save().then(() => {
            res.send('<script>alert("Form Submitted Successfully"); window.location.href = "/";</script>')
        }).catch((error) => {
            if (error.code === 11000) {
                res.send('<script>alert("Enter Unique Details"); window.location.href = "/register";</script>')
            }
            else{
                res.send('<script>alert("Server Error"); window.location.href = "/register";</script>')
            }
        })
    })
}

//Listening To Connections On Port 500

app.listen(500, () => {
    console.log("Started on port 500")
})