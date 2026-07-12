import { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { useUIStore } from '@stores/uiStore';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen bg-dark-900">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 lg:z-auto h-screen transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => useUIStore.setState({ sidebarOpen: false })}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-dark-800 border-b border-dark-700 lg:hidden">
          <h1 className="text-xl font-bold text-accent-500">Anime Battle</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
