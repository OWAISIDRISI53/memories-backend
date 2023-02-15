require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors');

const { getPost } = require("./controllers/posts")
const app = express()
const postRouter = require("./routes/posts")
const authRouter = require("./routes/auth/auth")


const connectMongo = require("./db");
const User = require("./models/User");


const PORT = process.env.PORT || 8000


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use(express.json())
connectMongo()

// route
app.use('/posts', postRouter)
app.use('/auth', require("./routes/auth/auth"))



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
