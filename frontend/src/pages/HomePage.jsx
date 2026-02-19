import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJSON } from '../api/client';
import { ArticleCard } from '../components/ArticleCard';

export const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchJSON('/articles').then((data) => setArticles(data.slice(0, 3))).catch(console.error);
  }, []);

  return (
    <div className="space-y-16">
      <section className="rounded-xl border border-gold/40 bg-white/5 p-8 text-center">
        <h1 className="font-heading text-4xl md:text-6xl">Master Chess Strategy</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">Sharpen your tactics, absorb chess history, and learn from legendary players.</p>
        <button className="mt-6 rounded bg-gold px-6 py-3 font-semibold text-black">Subscribe for Weekly Chess Insights</button>
      </section>

      <section>
        <h2 className="font-heading text-3xl">Featured Articles</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {articles.map((article) => <ArticleCard key={article._id} article={article} />)}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-3xl">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {['Strategy', 'History', 'Achievements'].map((cat) => (
            <span key={cat} className="rounded border border-gold px-4 py-2 text-sm">{cat}</span>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/20 p-6">
        <h2 className="font-heading text-2xl">Newsletter</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <input type="email" placeholder="Your email address" className="w-full rounded border border-white/30 bg-transparent p-3" />
          <button className="rounded bg-gold px-5 py-3 font-semibold text-black">Subscribe</button>
        </div>
        <Link to="/contact" className="mt-4 inline-block text-sm text-gold">Need coaching? Contact us.</Link>
      </section>
    </div>
  );
};
