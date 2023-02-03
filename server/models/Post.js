const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        // required: true
    },
    tags: [],

    selectedFile: {
        type: String,
        // required: true
    },

    likes: {
        type: [],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})
const Note = mongoose.model("post", NoteSchema)
module.exports = Note


    // tags: [String],
    // selectedFile: String,
    // likeCount: {
    //     type: Number,
    //     default: 0,
    // },
    // createdAt: {
    //     type: Date,
    //     default: new Date(),
    // },



    // {
        // "title" : "abc",
        // "message" : "abckldlgkj",
        // "creator" : "owais idrisi"
    //   }