// In your backend routes (e.g., routes/admin.js)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blogs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');

// Apply auth middleware to all admin routes


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST /admin/login
router.post('/verify', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Create JWT token
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, {
    expiresIn: '2h',
  });
  
  res.status(200).json({ success: true, token });
});

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.use(authMiddleware);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });



// Create new blog
router.post('/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, category, readTime } = req.body;

    const blog = new Blog({
      title,
      excerpt,
      category,
      readTime,
      image: req.file?.filename // or full path/url if needed
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Update blog
// Update blog with optional image upload
router.put('/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // If a new image was uploaded, include it in update
    if (req.file) {
      updateData.image = req.file.filename; // or full URL if your schema expects a URL
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Delete blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
