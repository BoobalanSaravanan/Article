import { Helmet } from 'react-helmet-async';

export const PlayerProfilePage = () => (
  <section className="grid gap-8 md:grid-cols-2 md:items-center">
    <Helmet>
      <title>Legendary Player Profile | ChessMind</title>
    </Helmet>
    <img
      src="https://images.unsplash.com/photo-1543096222-72de739f7917?auto=format&fit=crop&w=1200&q=80"
      alt="Magnus Carlsen profile"
      loading="lazy"
      className="h-80 w-full rounded-lg object-cover"
    />
    <div>
      <p className="text-gold">Legendary Player</p>
      <h1 className="font-heading text-4xl">Magnus Carlsen</h1>
      <p className="mt-4 text-white/80">
        Magnus Carlsen is renowned for universal style, endgame precision, and practical decision-making under pressure.
      </p>
      <ul className="mt-6 space-y-2 text-white/80">
        <li>• Multiple-time World Chess Champion</li>
        <li>• Consistent #1 rating performances</li>
        <li>• Exceptional conversion of equal positions</li>
      </ul>
    </div>
  </section>
);
