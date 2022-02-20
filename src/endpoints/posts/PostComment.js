const Post = require('../../models/Post')

async function PostComment(req, res)
{
    const comment = req.body.comment

    console.log(req.body.postId)

    try{
        const post = await Post.findById(req.body.postId).exec();

        console.log(post)

        post.comments.push({content: comment, authorName: req.user.name})

        post.save()
    }
    catch(e)
    {
        res.status(400).send(e.message)
        return
    }

    res.sendStatus(201)
}

module.exports = PostComment