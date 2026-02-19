import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export const MainLayout = () => (
  <div>
    <Navbar />
    <main className="container-base py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);
