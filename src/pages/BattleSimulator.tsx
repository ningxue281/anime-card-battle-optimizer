import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import { Swords } from 'lucide-react';

export default function BattleSimulator() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Battle Simulator</h1>
          <p className="text-dark-400">Simulate battles between teams</p>
        </div>

        <div className="card-border bg-dark-800/50 p-8">
          <EmptyState
            icon={<Swords size={48} />}
            title="No teams available"
            description="Create at least two teams in the Team Builder to simulate battles. The simulator will use only data from your databases without generating any placeholder values."
          />
        </div>
      </div>
    </Layout>
  );
}
