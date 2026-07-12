import { useCallback } from 'react';
import { db } from './db';
import type { Support } from '@/types';

export const useSaveSupport = () => {
  return useCallback(async (support: Support) => {
    const existingSupport = await db.supports.get(support.id);
    if (existingSupport) {
      return db.supports.update(support.id, {
        ...support,
        updatedAt: Date.now(),
      });
    } else {
      return db.supports.add(support);
    }
  }, []);
};

export const useDeleteSupport = () => {
  return useCallback(async (id: string) => {
    return db.supports.delete(id);
  }, []);
};

export const useSearchSupports = (query: string, searchFields: ('name' | 'description' | 'effect')[]) => {
  const { results, loading } = useSearchSupportsData(query, searchFields);
  return { results, loading };
};

function useSearchSupportsData(
  query: string,
  searchFields: ('name' | 'description' | 'effect')[]
) {
  const { results, loading } = useSearchData(query, searchFields);
  return { results, loading };
}

// Import from hooks.ts
import { useSupports } from './hooks';
import { useState, useEffect } from 'react';

function useSearchData(
  query: string,
  searchFields: ('name' | 'description' | 'effect')[]
) {
  const [results, setResults] = useState<Support[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    db.supports.toArray().then((supports) => {
      const lowerQuery = query.toLowerCase();
      const filtered = supports.filter((support) => {
        if (searchFields.includes('name') && support.name.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (searchFields.includes('description') && support.description.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (searchFields.includes('effect') && support.effects.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        return false;
      });
      setResults(filtered);
      setLoading(false);
    });
  }, [query, searchFields]);

  return { results, loading };
}
