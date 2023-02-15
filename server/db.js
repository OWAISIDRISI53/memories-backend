const mongoose = require('mongoose')
// const MONGO_URI = "mongodb://localhost/memories"

const MONGO_URI = process.env.MONGO_URI


const connectMongo = () => {
    mongoose.connect(MONGO_URI, () => {
        console.log("Connected to MongoDb ");
    })
}

module.exports = connectMongo