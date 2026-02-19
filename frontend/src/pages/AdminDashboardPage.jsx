import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from 'chart.js';
import { fetchJSON } from '../api/client';

Chart.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export const AdminDashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchJSON('/events/analytics/summary').then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h1 className="font-heading text-4xl">Admin Analytics Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card label="Total CTA Clicks" value={data.totalCtaClicks} />
        <Card label="Most Clicked CTA" value={data.mostClickedCta || 'N/A'} />
        <Card label="Most Viewed Article" value={data.mostViewedArticle?.title || 'N/A'} />
        <Card label="Average Time Spent" value={`${data.averageTimeSpent}s`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded border border-white/20 p-4">
          <h2 className="mb-4 font-heading text-2xl">Scroll Depth Distribution</h2>
          <Bar
            data={{
              labels: data.scrollDepthDistribution.map((i) => `${i._id}%`),
              datasets: [{ label: 'Events', data: data.scrollDepthDistribution.map((i) => i.count), backgroundColor: '#C9A227' }]
            }}
          />
        </div>
        <div className="rounded border border-white/20 p-4">
          <h2 className="mb-4 font-heading text-2xl">Conversion Rate per Article</h2>
          <Doughnut
            data={{
              labels: data.conversionRatePerArticle.map((i) => i.title),
              datasets: [{ data: data.conversionRatePerArticle.map((i) => Number(i.conversionRate.toFixed(2))), backgroundColor: ['#C9A227', '#e5cf7f', '#f0df9a', '#8b6f16'] }]
            }}
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ label, value }) => (
  <div className="rounded border border-white/20 bg-white/5 p-4">
    <p className="text-xs uppercase text-white/70">{label}</p>
    <p className="mt-2 text-xl font-semibold text-gold">{value}</p>
  </div>
);
