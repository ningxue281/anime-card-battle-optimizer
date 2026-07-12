import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Database } from 'lucide-react';

export default function Characters() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Character Database</h1>
          <p className="text-dark-400">Manage your anime card collection</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Database size={48} />}
            title="No characters available"
            description="Upload your character database to get started. Upload CSV, JSON, or other supported formats with card data."
            action={
              <button className="btn-primary">Upload Character Database</button>
            }
          />
        </div>
      </div>
    </Layout>
  );
}
