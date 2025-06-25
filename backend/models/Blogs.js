const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['SEO', 'Trends', 'Content', 'Email', 'Social Media', 'PPC']
  },
  image: {
    type: String,
    required: [true, 'Featured image URL is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min',
    enum: ['3 min', '5 min', '7 min', '10 min', '15 min']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Format the date before returning the document
blogSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.date = doc.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return ret;
  }
});

module.exports = mongoose.model('Blog', blogSchema);