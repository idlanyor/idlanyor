const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Post Model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, default: 'General' },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API Key Middleware (Simple protection)
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Routes
// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const posts = await Post.find().sort({ date: -1 }).limit(limit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single post by ID or Slug
app.get('/api/posts/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let post;
    
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      post = await Post.findById(identifier);
    } else {
      post = await Post.findOne({ slug: identifier });
    }

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a post (Protected)
app.post('/api/posts', apiKeyAuth, async (req, res) => {
  const post = new Post({
    title: req.body.title,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    content: req.body.content,
    excerpt: req.body.excerpt,
    category: req.body.category,
    image: req.body.image
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post (Protected)
app.put('/api/posts/:id', apiKeyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If title changes, update slug too if not provided
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post (Protected)
app.delete('/api/posts/:id', apiKeyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
