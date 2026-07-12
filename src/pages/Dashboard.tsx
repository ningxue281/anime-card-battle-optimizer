import Layout from '@components/Layout';
import { useCards } from '@db/hooks';
import { useTeams } from '@db/hooks';
import { BarChart3, Layers, Database } from 'lucide-react';

export default function Dashboard() {
  const { cards } = useCards();
  const { teams } = useTeams();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-dark-50 mb-2">Dashboard</h1>
          <p className="text-dark-400">Welcome to Anime Card Battle Optimizer</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-border p-6 bg-dark-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-600/20 rounded-lg">
                <Database className="text-accent-500" size={24} />
              </div>
              <div>
                <p className="text-dark-400 text-sm">Cards in Database</p>
                <p className="text-2xl font-bold text-dark-50">{cards.length}</p>
              </div>
            </div>
          </div>

          <div className="card-border p-6 bg-dark-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Layers className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-dark-400 text-sm">Teams Created</p>
                <p className="text-2xl font-bold text-dark-50">{teams.length}</p>
              </div>
            </div>
          </div>

          <div className="card-border p-6 bg-dark-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <BarChart3 className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-dark-400 text-sm">App Version</p>
                <p className="text-2xl font-bold text-dark-50">1.0.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="card-border p-6 bg-dark-800/50">
          <h2 className="text-xl font-bold text-dark-50 mb-4">Getting Started</h2>
          <ul className="space-y-3 text-dark-300">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Upload your card database in the Character Database module</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Upload supports and traits in their respective modules</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Build your first team in Team Builder</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>Simulate battles to test your strategies</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
