import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import TraitGridItem from '@components/TraitGridItem';
import TraitEditorModal from '@components/TraitEditorModal';
import { useTraits, useSaveTrait, useDeleteTrait } from '@db/hooks';
import { useSearchTraits } from '@db/traitHooks';
import { useTraitDatabaseStore } from '@stores/traitDatabaseStore';
import type { Trait } from '@types/index';

const createNewTrait = (name: string): Trait => ({
  id: crypto.randomUUID(),
  name,
  icon: '',
  description: '',
  effects: '',
  notes: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const duplicateTrait = (trait: Trait): Trait => ({
  ...trait,
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export default function Traits() {
  const { traits, loading } = useTraits();
  const saveTrait = useSaveTrait();
  const deleteTrait = useDeleteTrait();
  const { searchQuery, setSearchQuery, filters, setSortBy, setSortOrder } =
    useTraitDatabaseStore();
  const { results: searchResults } = useSearchTraits(searchQuery, [
    'name',
    'description',
    'effect',
  ]);

  const [editingTrait, setEditingTrait] = useState<Trait | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get display traits (search results or all traits)
  const displayTraits = searchQuery.trim() ? searchResults : traits;

  // Apply sorting
  const filteredAndSortedTraits = useMemo(() => {
    let result = [...displayTraits];

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
  }, [displayTraits, filters.sortBy, filters.sortOrder]);

  const handleCreate = async () => {
    const newTrait = createNewTrait('New Trait');
    setEditingTrait(newTrait);
  };

  const handleEdit = (trait: Trait) => {
    setEditingTrait(trait);
  };

  const handleSave = async (trait: Trait) => {
    try {
      await saveTrait(trait);
      setEditingTrait(null);
    } catch (error) {
      console.error('Failed to save trait:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this trait? This action cannot be undone.')) {
      try {
        await deleteTrait(id);
      } catch (error) {
        console.error('Failed to delete trait:', error);
      }
    }
  };

  const handleDuplicate = async (trait: Trait) => {
    try {
      const duplicated = duplicateTrait(trait);
      await saveTrait(duplicated);
    } catch (error) {
      console.error('Failed to duplicate trait:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Trait Database</h1>
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
              <h1 className="text-3xl font-bold text-dark-50 mb-2">Trait Database</h1>
              <p className="text-dark-400">{filteredAndSortedTraits.length} traits</p>
            </div>
            <button onClick={handleCreate} className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={20} />
              New Trait
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

        {/* Trait Grid or Empty State */}
        {filteredAndSortedTraits.length === 0 ? (
          <div className="flex-1 card-border bg-dark-800/50 p-8">
            <EmptyState
              icon={<div className="text-4xl">⭐</div>}
              title="No traits available"
              description="Create your first trait. Upload an icon, add descriptions and effects for use in team building."
              action={<button onClick={handleCreate} className="btn-primary">Create First Trait</button>}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
              {filteredAndSortedTraits.map((trait) => (
                <TraitGridItem
                  key={trait.id}
                  trait={trait}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trait Editor Modal */}
      {editingTrait && (
        <TraitEditorModal
          trait={editingTrait}
          isOpen={!!editingTrait}
          onClose={() => setEditingTrait(null)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
