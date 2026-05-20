const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/portfolio';

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  category: String,
  image: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Post.deleteMany({}); // Clear existing

    const demoPost = new Post({
      title: 'Membangun Masa Depan dengan AI',
      slug: 'membangun-masa-depan-dengan-ai',
      content: '<p>AI adalah teknologi yang akan mengubah segalanya. Dalam artikel ini kita akan membahas bagaimana developer bisa memanfaatkan AI untuk meningkatkan produktivitas.</p>',
      excerpt: 'Bagaimana AI mengubah cara kita bekerja sebagai developer modern...',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60'
    });

    await demoPost.save();
    console.log('Demo post seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
