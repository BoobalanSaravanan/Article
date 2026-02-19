import { Article } from './models/Article.js';
import { sampleArticles } from './data/sampleArticles.js';

export const seedArticles = async () => {
  const count = await Article.countDocuments();
  if (count === 0) {
    await Article.insertMany(sampleArticles);
    console.log('Sample articles seeded');
  }
};
