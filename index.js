const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Customer = require("./models/Customer");
const mongoose = require("mongoose")
const validator = require("validator")


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

mongoose.connect("mongodb+srv://admin:1234Db4321@cluster0.mu8zb.mongodb.net/iServiceDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post('/', (req, res) => {
    country = req.body.country,
        firstname = req.body.first_name,
        lastname = req.body.last_name,
        email = req.body.email,
        password = req.body.password,
        confirm_password = req.body.confirm_password,
        address = req.body.address,
        address1 = req.body.address1,
        city = req.body.city,
        state = req.body.state,
        zip = req.body.zip,
        mobile_number = req.body.mobile_phone_number

    if (password == confirm_password) {
        if (password.length >= 8) {
            const customer = new Customer({
                country: country,
                fname: firstname,
                lname: lastname,
                email: email,
                password: password,
                confirmpass: confirm_password,
                address: address,
                address1: address1,
                city: city,
                state: state,
                zip: zip,
                mobile_number: mobile_number
            })
            customer.save((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (res.statusCode === 200) {
                        res.sendFile(__dirname + "/success.html")
                    }
                    else {
                        res.sendFile(__dirname + "/404.html")
                    }

                }
            });
        } else {
            res.sendFile(__dirname +"/error1.html")
        }
    } else {
        res.sendFile(__dirname +"/error2.html")
    }
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, (req, res) => {
    console.log("Server is running successfullly!")
})