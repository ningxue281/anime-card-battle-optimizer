import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { BarChart2 } from 'lucide-react';

export default function Statistics() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Statistics</h1>
          <p className="text-dark-400">View game and team statistics</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<BarChart2 size={48} />}
            title="No data available"
            description="Statistics will appear here once you've created teams and run simulations. Track your team performance, win rates, and more."
          />
        </div>
      </div>
    </Layout>
  );
}
