const mongoose = require("mongoose")
const validator = require("validator")
const customerSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true
        },

        firstname: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (validator.isEmail(value) != true) {
                    throw new Error('Email is not valid!')
                }
            }
        },
        password: {
            type: String,
            require: true,
            minlength: 8,
            validate(value) {
                if (this.confirmpass != value) {
                    throw new Error('Password does not match!')
                }
            }
        },

        confirmpass: {
            type: String,
            required: true,
            minlength: 8
        },

        address: {
            type: String,
            require: true
        },

        address1: {
            type: String
        },

        city: {
            type: String,
            require: true
        },
        state: {
            type: String,
            require: true
        },
        zip: {
            type: String,
            require: true
        },
        mobile_number: {
            type: Number
        }
    }
)



module.exports = mongoose.model("Customer", customerSchema)
