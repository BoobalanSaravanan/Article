import { useEffect, useState } from 'react';
import { fetchJSON } from '../api/client';
import { ArticleCard } from '../components/ArticleCard';

export const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJSON('/articles').then(setArticles).catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section>
      <h1 className="font-heading text-4xl">Chess Articles</h1>
      <p className="mt-2 text-white/80">Explore strategy, history, achievements, and beginner improvement tips.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {articles.map((article) => <ArticleCard key={article._id} article={article} />)}
      </div>
    </section>
  );
};
