const mongoose = require('mongoose')
// const MONGO_URI = "mongodb://localhost/memories"

const MONGO_URI = "mongodb+srv://owais05:XwyNehrgfpfLWJRE@cluster0.m3bzife.mongodb.net/memorie?retryWrites=true&w=majority"


const connectMongo = () => {
    mongoose.connect(MONGO_URI, () => {
        console.log("Connected to MongoDb ");
    })
}

module.exports = connectMongo