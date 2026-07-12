import Layout from '@components/Layout';
import { Settings as SettingsIcon, Download, Upload, Trash2 } from 'lucide-react';

export default function Settings() {
  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Settings</h1>
          <p className="text-dark-400">Manage application settings and data</p>
        </div>

        {/* Database Management */}
        <div className="card-border p-6 bg-dark-800/50 space-y-4">
          <h2 className="text-xl font-bold text-dark-50 flex items-center gap-2">
            <SettingsIcon size={24} />
            Database Management
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg border border-dark-700">
              <div>
                <p className="font-medium text-dark-50">Export Data</p>
                <p className="text-sm text-dark-400">Download all your data as JSON</p>
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg border border-dark-700">
              <div>
                <p className="font-medium text-dark-50">Import Data</p>
                <p className="text-sm text-dark-400">Load data from a JSON file</p>
              </div>
              <button className="btn-secondary flex items-center gap-2">
                <Upload size={18} />
                Import
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-900/50 rounded-lg border border-dark-700">
              <div>
                <p className="font-medium text-dark-50">Clear All Data</p>
                <p className="text-sm text-dark-400">Reset application to initial state</p>
              </div>
              <button className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Trash2 size={18} />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card-border p-6 bg-dark-800/50 space-y-4">
          <h2 className="text-xl font-bold text-dark-50">About</h2>
          <div className="space-y-2 text-dark-400">
            <p><span className="text-dark-50 font-medium">App:</span> Anime Card Battle Optimizer</p>
            <p><span className="text-dark-50 font-medium">Version:</span> 1.0.0</p>
            <p><span className="text-dark-50 font-medium">Status:</span> Offline Ready (PWA)</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
