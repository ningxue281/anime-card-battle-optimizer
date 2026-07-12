import { create } from 'zustand';

interface TraitDatabaseFilters {
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

interface TraitDatabaseState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: TraitDatabaseFilters;
  setSortBy: (sortBy: 'name' | 'createdAt') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useTraitDatabaseStore = create<TraitDatabaseState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: {
    sortBy: 'name',
    sortOrder: 'asc',
  },
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    })),
}));
