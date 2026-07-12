import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Layers } from 'lucide-react';

export default function TeamBuilder() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Team Builder</h1>
          <p className="text-dark-400">Create and manage your teams</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Layers size={48} />}
            title="No characters available"
            description="Upload your character database first to start building teams. You'll be able to select characters, choose border rarities, and equip traits and supports."
          />
        </div>
      </div>
    </Layout>
  );
}
