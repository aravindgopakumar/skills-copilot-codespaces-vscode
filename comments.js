// Create web server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a variable to store comments
let comments = [
    {
        id: 1,
        name: 'John Doe',
        comment: 'Hello everyone'
    },
    {
        id: 2,
        name: 'Jane Doe',
        comment: 'Good morning'
    }
];

// GET request
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST request
app.post('/comments', (req, res) => {
    const comment = req.body;
    if (comment.name && comment.comment) {
        comments.push({
            id: comments.length + 1,
            name: comment.name,
            comment: comment.comment
        });
        res.json({
            message: 'Comment added successfully'
        });
    } else {
        res.json({
            message: 'Comment not added'
        });
    }
});

// PUT request
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    const index = comments.findIndex((comment) => comment.id == id);
    if (index >= 0) {
        comments[index] = {
            id: id,
            name: comment.name,
            comment: comment.comment
        };
        res.json({
            message: 'Comment updated successfully'
        });
    } else {
        res.json({
            message: 'Comment not updated'
        });
    }
});

// DELETE request
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex((comment) => comment.id == id);
    if (index >= 0) {
        comments.splice(index, 1);
        res.json({
            message: 'Comment deleted successfully'
        });
    } else {
        res.json({
            message: 'Comment not deleted'
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});