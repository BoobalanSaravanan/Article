import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `text-sm uppercase tracking-wide ${isActive ? 'text-gold' : 'text-white hover:text-gold transition'}`;

export const Navbar = () => (
  <header className="border-b border-white/20">
    <nav className="container-base flex items-center justify-between py-4">
      <Link className="font-heading text-2xl text-gold" to="/">
        ChessMind
      </Link>
      <div className="flex gap-4 md:gap-6">
        <NavLink to="/articles" className={linkClass}>Articles</NavLink>
        <NavLink to="/players/magnus-carlsen" className={linkClass}>Players</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
      </div>
    </nav>
  </header>
);
