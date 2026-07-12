import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Users } from 'lucide-react';

export default function Supports() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Support Database</h1>
          <p className="text-dark-400">Manage support items and effects</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Users size={48} />}
            title="No supports available"
            description="Upload your support database to get started. Each support will display with artwork, name, description, and effects."
            action={
              <button className="btn-primary">Upload Support Database</button>
            }
          />
        </div>
      </div>
    </Layout>
  );
}
