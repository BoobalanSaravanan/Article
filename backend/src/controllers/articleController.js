import { Article } from '../models/Article.js';

export const getArticles = async (_req, res, next) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};
