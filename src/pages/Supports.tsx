import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import SupportGridItem from '@components/SupportGridItem';
import SupportEditorModal from '@components/SupportEditorModal';
import { useSupports, useSaveSupport, useDeleteSupport } from '@db/hooks';
import { useSearchSupports } from '@db/supportHooks';
import { useSupportDatabaseStore } from '@stores/supportDatabaseStore';
import type { Support } from '@types/index';

const createNewSupport = (name: string): Support => ({
  id: crypto.randomUUID(),
  name,
  artwork: '',
  description: '',
  effects: '',
  notes: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const duplicateSupport = (support: Support): Support => ({
  ...support,
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export default function Supports() {
  const { supports, loading } = useSupports();
  const saveSupport = useSaveSupport();
  const deleteSupport = useDeleteSupport();
  const { searchQuery, setSearchQuery, filters, setSortBy, setSortOrder } =
    useSupportDatabaseStore();
  const { results: searchResults } = useSearchSupports(searchQuery, [
    'name',
    'description',
    'effect',
  ]);

  const [editingSupport, setEditingSupport] = useState<Support | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get display supports (search results or all supports)
  const displaySupports = searchQuery.trim() ? searchResults : supports;

  // Apply sorting
  const filteredAndSortedSupports = useMemo(() => {
    let result = [...displaySupports];

    result.sort((a, b) => {
      let comparison = 0;
      if (filters.sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'createdAt') {
        comparison = a.createdAt - b.createdAt;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [displaySupports, filters.sortBy, filters.sortOrder]);

  const handleCreate = async () => {
    const newSupport = createNewSupport('New Support');
    setEditingSupport(newSupport);
  };

  const handleEdit = (support: Support) => {
    setEditingSupport(support);
  };

  const handleSave = async (support: Support) => {
    try {
      await saveSupport(support);
      setEditingSupport(null);
    } catch (error) {
      console.error('Failed to save support:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this support? This action cannot be undone.')) {
      try {
        await deleteSupport(id);
      } catch (error) {
        console.error('Failed to delete support:', error);
      }
    }
  };

  const handleDuplicate = async (support: Support) => {
    try {
      const duplicated = duplicateSupport(support);
      await saveSupport(duplicated);
    } catch (error) {
      console.error('Failed to duplicate support:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Support Database</h1>
            <p className="text-dark-400">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-dark-50 mb-2">Support Database</h1>
              <p className="text-dark-400">{filteredAndSortedSupports.length} supports</p>
            </div>
            <button onClick={handleCreate} className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={20} />
              New Support
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card-border bg-dark-800/50 p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description, or effects..."
                className="input-field pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${showFilters
                ? 'bg-accent-600 text-white'
                : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
              }`}
            >
              <Filter size={18} />
              Sort
            </button>
          </div>

          {/* Sort Panel */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-dark-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'createdAt')}
                    className="input-field text-sm"
                  >
                    <option value="name">Name</option>
                    <option value="createdAt">Date Created</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="input-field text-sm"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support Grid or Empty State */}
        {filteredAndSortedSupports.length === 0 ? (
          <div className="flex-1 card-border bg-dark-800/50 p-8">
            <EmptyState
              icon={<div className="text-4xl">📦</div>}
              title="No supports available"
              description="Create your first support item. Upload artwork, add descriptions and effects for use in team building."
              action={<button onClick={handleCreate} className="btn-primary">Create First Support</button>}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
              {filteredAndSortedSupports.map((support) => (
                <SupportGridItem
                  key={support.id}
                  support={support}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Support Editor Modal */}
      {editingSupport && (
        <SupportEditorModal
          support={editingSupport}
          isOpen={!!editingSupport}
          onClose={() => setEditingSupport(null)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
