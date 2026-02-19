import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage').then((m) => ({ default: m.ArticlesPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })));
const PlayerProfilePage = lazy(() => import('./pages/PlayerProfilePage').then((m) => ({ default: m.PlayerProfilePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));

function App() {
  return (
    <Suspense fallback={<div className="container-base py-10">Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/players/:slug" element={<PlayerProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
