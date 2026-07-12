import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Wand2 } from 'lucide-react';

export default function TeamOptimizer() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Team Optimizer</h1>
          <p className="text-dark-400">Automatically optimize team composition</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Wand2 size={48} />}
            title="No teams to optimize"
            description="Create a team first in the Team Builder. The optimizer will suggest the best border rarities, traits, and supports based on synergy and battle readiness."
          />
        </div>
      </div>
    </Layout>
  );
}
