const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching posts.');
        } else {
            res.json(posts);
        }
    });
});

app.post('/post', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });
    newPost.save((err, post) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating post.');
        } else {
            res.json(post);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});