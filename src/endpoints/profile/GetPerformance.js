const Post = require("../../models/Post");

async function GetPerformance(req, res) {
    const username = req.user.name
    const date = req.body.date

    try {
        const posts = (await Post.find({ authorName: username })).filter(post => post.date > date)

        const likes = (await Post.find()).filter(post => {
            const like = post.likes.find(like => like.authorName === username)
            if (!like)
                return false

            return like.date > date
        })

        const comments = (await Post.find()).filter(post => {
            const comment = post.comments.find(comment => comment.authorName === username)
            if(!comment)
                return false

            return comment.date > date
        })

        res.status(200).json({
            posts,
            likes,
            comments
        })

    }
    catch (e) {
        res.status(500).send({ error: e.message })
    }
}

module.exports = GetPerformance