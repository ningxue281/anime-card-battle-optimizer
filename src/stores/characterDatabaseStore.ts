import { create } from 'zustand';
import type { BorderRarityKey } from '@types/index';

interface CharacterDatabaseFilters {
  rarities: BorderRarityKey[];
  sortBy: 'name' | 'hp' | 'damage';
  sortOrder: 'asc' | 'desc';
}

interface CharacterDatabaseState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: CharacterDatabaseFilters;
  setRarityFilter: (rarities: BorderRarityKey[]) => void;
  setSortBy: (sortBy: 'name' | 'hp' | 'damage') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useCharacterDatabaseStore = create<CharacterDatabaseState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: {
    rarities: ['base', 'gold', 'magmatic', 'abyssal', 'mystic', 'chronicle'],
    sortBy: 'name',
    sortOrder: 'asc',
  },
  setRarityFilter: (rarities) =>
    set((state) => ({
      filters: { ...state.filters, rarities },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    })),
}));
