const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    date: Number,
    content: String,
    authorName: String
})

const Like = mongoose.Schema({
    date: Number,
    authorName: String
})

const Post = mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    description: String,
    //Image id
    image: String,
    date: {
        type: Number,
        required: true
    },

    // Keeps array of usernames, who have liked this publication
    likes: [Like],
    comments: [Comment]
})

module.exports = mongoose.model("posts", Post)