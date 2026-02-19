import { Link } from 'react-router-dom';

export const ArticleCard = ({ article }) => (
  <article className="overflow-hidden rounded-lg border border-white/20 bg-white/5">
    <img src={article.featuredImage} alt={article.title} loading="lazy" className="h-48 w-full object-cover" />
    <div className="p-4">
      <p className="text-xs uppercase tracking-widest text-gold">{article.category}</p>
      <h3 className="mt-2 font-heading text-xl">{article.title}</h3>
      <p className="mt-2 text-sm text-white/80">{article.excerpt}</p>
      <Link className="mt-4 inline-block text-gold" to={`/articles/${article.slug}`}>
        Read article →
      </Link>
    </div>
  </article>
);
