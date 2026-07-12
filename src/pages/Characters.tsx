import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import CardGridItem from '@components/CardGridItem';
import CardEditorModal from '@components/CardEditorModal';
import { useCards, useSaveCard, useDeleteCard, useSearchCards } from '@db/hooks';
import { useCharacterDatabaseStore } from '@stores/characterDatabaseStore';
import { createNewCard, duplicateCard } from '@db/db';
import type { Card, BorderRarityKey } from '@types/index';
import { BORDER_RARITIES, BORDER_RARITY_LABELS } from '@types/index';

export default function Characters() {
  const { cards, loading } = useCards();
  const saveCard = useSaveCard();
  const deleteCard = useDeleteCard();
  const { searchQuery, setSearchQuery, filters, setSortBy, setSortOrder } =
    useCharacterDatabaseStore();
  const { results: searchResults } = useSearchCards(searchQuery, [
    'name',
    'ability',
    'passive',
    'trait',
    'tags',
  ]);

  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<BorderRarityKey>('base');
  const [showFilters, setShowFilters] = useState(false);

  // Get display cards (search results or all cards)
  const displayCards = searchQuery.trim() ? searchResults : cards;

  // Apply filters and sorting
  const filteredAndSortedCards = useMemo(() => {
    let result = [...displayCards];

    // Sort
    result.sort((a, b) => {
      const aStats = a.borderRarities[selectedRarity];
      const bStats = b.borderRarities[selectedRarity];

      let comparison = 0;
      if (filters.sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'hp') {
        comparison = aStats.hp - bStats.hp;
      } else if (filters.sortBy === 'damage') {
        comparison = aStats.damage - bStats.damage;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [displayCards, selectedRarity, filters.sortBy, filters.sortOrder]);

  const handleCreate = async () => {
    const newCard = createNewCard('New Card');
    setEditingCard(newCard);
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
  };

  const handleSave = async (card: Card) => {
    try {
      await saveCard(card);
      setEditingCard(null);
    } catch (error) {
      console.error('Failed to save card:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this card? This action cannot be undone.')) {
      try {
        await deleteCard(id);
      } catch (error) {
        console.error('Failed to delete card:', error);
      }
    }
  };

  const handleDuplicate = async (card: Card) => {
    try {
      const duplicated = duplicateCard(card);
      await saveCard(duplicated);
    } catch (error) {
      console.error('Failed to duplicate card:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Character Database</h1>
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
              <h1 className="text-3xl font-bold text-dark-50 mb-2">Character Database</h1>
              <p className="text-dark-400">{filteredAndSortedCards.length} cards</p>
            </div>
            <button onClick={handleCreate} className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={20} />
              New Card
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
                placeholder="Search by name, ability, passive..."
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
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-dark-700">
              {/* Rarity Filter */}
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Display Rarity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BORDER_RARITIES.map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity)}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                        selectedRarity === rarity
                          ? 'bg-accent-600 text-white'
                          : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                      }`}
                    >
                      {BORDER_RARITY_LABELS[rarity]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'hp' | 'damage')}
                    className="input-field text-sm"
                  >
                    <option value="name">Name</option>
                    <option value="hp">HP</option>
                    <option value="damage">Damage</option>
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

        {/* Card Grid or Empty State */}
        {filteredAndSortedCards.length === 0 ? (
          <div className="flex-1 card-border bg-dark-800/50 p-8">
            <EmptyState
              icon={<div className="text-4xl">🗂️</div>}
              title="No characters available"
              description="Create your first card to get started. Upload artworks, set stats, and define abilities for each border rarity."
              action={<button onClick={handleCreate} className="btn-primary">Create First Card</button>}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
              {filteredAndSortedCards.map((card) => (
                <CardGridItem
                  key={card.id}
                  card={card}
                  selectedRarity={selectedRarity}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Editor Modal */}
      {editingCard && (
        <CardEditorModal
          card={editingCard}
          isOpen={!!editingCard}
          onClose={() => setEditingCard(null)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
