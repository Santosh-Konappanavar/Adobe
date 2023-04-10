const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define User model
const User = mongoose.model('User', {
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  bio: { type: String, maxlength: 200 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define Post model
const Post = mongoose.model('Post', {
  id: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, minlength: 1, maxlength: 300 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  likes: { type: Number, min: 0, default: 0 }
});

// Define API routes for User model
// Define API routes for User model
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'bio'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => user[update] = req.body[update]);
    user.updated_at = Date.now();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/analytics/users', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.send({ total_users: count });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/analytics/users/top-active', async (req, res) => {
  try {
    const users = await User.aggregate([
      { $lookup: { from: 'posts', localField: '_id', foreignField: 'user_id', as: 'posts' } },
      { $project: { name: 1, post_count: { $size: '$posts' } } },
      { $sort: { post_count: -1 } },
      { $limit: 5 }
    ]);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Define API routes for Post model
app.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/posts/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['content'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    updates.forEach((update) => post[update] = req.body[update]);
    post.updated_at = Date.now();
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

  app.delete('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).send();
      }
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.post('/posts/:id/like', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!post) {
        return res.status(404).send();
      }
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.post('/posts/:id/unlike', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).send();
      }
      if (post.likes === 0) {
        return res.status(400).send({ error: 'Post has no likes!' });
      }
      post.likes -= 1;
      post.updated_at = Date.now();
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.get('/analytics/posts', async (req, res) => {
    try {
      const count = await Post.countDocuments();
      res.send({ total_posts: count });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.get('/analytics/posts/top-liked', async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: -1 }).limit(5);
      res.send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
// Start the server
app.listen(3000, () => {
console.log('Server is up on port 3000');
});