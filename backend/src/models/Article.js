import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    featuredImage: { type: String, required: true },
    excerpt: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Article = mongoose.model('Article', articleSchema);
