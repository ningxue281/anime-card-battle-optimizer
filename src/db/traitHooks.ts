import { useCallback } from 'react';
import { db } from './db';
import type { Trait } from '@types/index';
import { useState, useEffect } from 'react';

export const useSaveTrait = () => {
  return useCallback(async (trait: Trait) => {
    const existingTrait = await db.traits.get(trait.id);
    if (existingTrait) {
      return db.traits.update(trait.id, {
        ...trait,
        updatedAt: Date.now(),
      });
    } else {
      return db.traits.add(trait);
    }
  }, []);
};

export const useDeleteTrait = () => {
  return useCallback(async (id: string) => {
    return db.traits.delete(id);
  }, []);
};

export const useSearchTraits = (
  query: string,
  searchFields: ('name' | 'description' | 'effect')[]
) => {
  const [results, setResults] = useState<Trait[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    db.traits.toArray().then((traits) => {
      const lowerQuery = query.toLowerCase();
      const filtered = traits.filter((trait) => {
        if (searchFields.includes('name') && trait.name.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (searchFields.includes('description') && trait.description.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (searchFields.includes('effect') && trait.effects.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        return false;
      });
      setResults(filtered);
      setLoading(false);
    });
  }, [query, searchFields]);

  return { results, loading };
};
