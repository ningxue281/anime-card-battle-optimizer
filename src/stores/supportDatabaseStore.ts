import { create } from 'zustand';

interface SupportDatabaseFilters {
  sortBy: 'name' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

interface SupportDatabaseState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SupportDatabaseFilters;
  setSortBy: (sortBy: 'name' | 'createdAt') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useSupportDatabaseStore = create<SupportDatabaseState>((set) => ({
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
