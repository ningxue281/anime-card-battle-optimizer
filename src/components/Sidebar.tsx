import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Database,
  Zap,
  Swords,
  BarChart3,
  Users,
  BarChart2,
  Settings,
  Wand2,
} from 'lucide-react';
import { useUIStore } from '@stores/uiStore';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Character DB', path: '/characters', icon: Database },
  { name: 'Support DB', path: '/supports', icon: Users },
  { name: 'Traits DB', path: '/traits', icon: Zap },
  { name: 'Team Builder', path: '/team-builder', icon: Layers },
  { name: 'Team Optimizer', path: '/team-optimizer', icon: Wand2 },
  { name: 'Battle Simulator', path: '/battle-simulator', icon: Swords },
  { name: 'Statistics', path: '/statistics', icon: BarChart2 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { closeSidebar } = useUIStore();

  return (
    <aside className="w-64 h-screen bg-dark-800 border-r border-dark-700 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-dark-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
            <Swords size={20} />
          </div>
          <span className="font-display font-bold text-lg text-accent-500">ACB</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-accent-600 text-white'
                  : 'text-dark-300 hover:bg-dark-700 hover:text-dark-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <p className="text-xs text-dark-500 text-center">v1.0.0</p>
      </div>
    </aside>
  );
}
