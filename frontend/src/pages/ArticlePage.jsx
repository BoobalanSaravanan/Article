import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchJSON } from '../api/client';
import { useEventTracking } from '../hooks/useEventTracking';
import { useSessionId } from '../hooks/useSessionId';

const ctaButton = 'rounded bg-gold px-4 py-2 font-semibold text-black hover:opacity-90';

export const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const sessionId = useSessionId();
  const tracking = useEventTracking({ page: `/articles/${slug}`, articleId: article?._id || null, sessionId });

  useEffect(() => {
    fetchJSON(`/articles/${slug}`)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  useEffect(() => {
    if (article?._id) {
      tracking.send('article_view');
    }
  }, [article?._id]);

  const sections = useMemo(() => article?.content.split('\n\n') || [], [article]);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!article) return <p>Loading article...</p>;

  return (
    <>
      <Helmet>
        <title>{article.title} | ChessMind</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article>
          <img src={article.featuredImage} alt={article.title} loading="lazy" className="mb-6 h-72 w-full rounded-lg object-cover" />
          <p className="text-sm text-gold">{article.category} · {new Date(article.createdAt).toLocaleDateString()}</p>
          <h1 className="mt-2 font-heading text-4xl">{article.title}</h1>
          <p className="mt-2 text-white/70">By {article.author}</p>

          <div className="mt-8 space-y-6 text-white/90">
            {sections.map((part, idx) => (
              <p key={idx}>{part.replaceAll('## ', '')}</p>
            ))}
          </div>

          <div className="mt-8">
            <button className={ctaButton} onClick={() => tracking.send('download_click')}>Download Free Opening Guide</button>
          </div>
          <div className="mt-8">
            <button className={ctaButton} onClick={() => tracking.send('newsletter_click')}>Join Chess Newsletter</button>
          </div>
          <div className="mt-8">
            <button className={ctaButton} onClick={() => tracking.send('analyze_click')}>Analyze Your Game With Us</button>
          </div>
        </article>
        <aside className="h-fit rounded-lg border border-gold/50 bg-white/5 p-5 lg:sticky lg:top-6">
          <h3 className="font-heading text-2xl">Need Better Results?</h3>
          <button className="mt-4 w-full rounded bg-gold px-4 py-2 font-semibold text-black" onClick={() => tracking.send('subscribe_click')}>
            Get Weekly Chess Tips
          </button>
        </aside>
      </div>
    </>
  );
};
