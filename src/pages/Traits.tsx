import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Zap } from 'lucide-react';

export default function Traits() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Traits Database</h1>
          <p className="text-dark-400">Manage trait effects and bonuses</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Zap size={48} />}
            title="No traits available"
            description="Upload your traits database to get started. Traits will display as an icon grid with names, descriptions, and effects."
            action={
              <button className="btn-primary">Upload Traits Database</button>
            }
          />
        </div>
      </div>
    </Layout>
  );
}
