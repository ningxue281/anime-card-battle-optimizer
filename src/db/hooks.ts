import { useEffect, useState, useCallback } from 'react';
import { db } from './db';
import type { Card, Trait, Support, Team, BattleLog, BorderRarityKey } from '@types/index';

// Cards
export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.cards.toArray().then(setCards).finally(() => setLoading(false));
  }, []);

  return { cards, loading };
};

export const useCard = (id: string) => {
  const [card, setCard] = useState<Card | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.cards.get(id).then(setCard).finally(() => setLoading(false));
  }, [id]);

  return { card, loading };
};

export const useSaveCard = () => {
  return useCallback(async (card: Card) => {
    const existingCard = await db.cards.get(card.id);
    if (existingCard) {
      return db.cards.update(card.id, {
        ...card,
        updatedAt: Date.now(),
      });
    } else {
      return db.cards.add(card);
    }
  }, []);
};

export const useDeleteCard = () => {
  return useCallback(async (id: string) => {
    return db.cards.delete(id);
  }, []);
};

export const useSearchCards = (query: string, searchFields: ('name' | 'ability' | 'passive' | 'trait' | 'tags')[]) => {
  const [results, setResults] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    db.cards.toArray().then((cards) => {
      const lowerQuery = query.toLowerCase();
      const filtered = cards.filter((card) => {
        if (searchFields.includes('name') && card.name.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (searchFields.includes('trait') && card.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
          return true;
        }
        if (searchFields.includes('tags') && card.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
          return true;
        }
        // Search in all rarities for ability and passive
        for (const rarity of Object.values(card.borderRarities)) {
          if (searchFields.includes('ability') && rarity.abilityDescription.toLowerCase().includes(lowerQuery)) {
            return true;
          }
          if (searchFields.includes('passive') && rarity.passiveDescription.toLowerCase().includes(lowerQuery)) {
            return true;
          }
        }
        return false;
      });
      setResults(filtered);
      setLoading(false);
    });
  }, [query, searchFields]);

  return { results, loading };
};

// Traits
export const useTraits = () => {
  const [traits, setTraits] = useState<Trait[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.traits.toArray().then(setTraits).finally(() => setLoading(false));
  }, []);

  return { traits, loading };
};

// Supports
export const useSupports = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.supports.toArray().then(setSupports).finally(() => setLoading(false));
  }, []);

  return { supports, loading };
};

// Teams
export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.teams.toArray().then(setTeams).finally(() => setLoading(false));
  }, []);

  return { teams, loading };
};

export const useTeam = (id: string) => {
  const [team, setTeam] = useState<Team | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.teams.get(id).then(setTeam).finally(() => setLoading(false));
  }, [id]);

  return { team, loading };
};

// Battle Logs
export const useBattleLogs = () => {
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.battleLogs.toArray().then(setLogs).finally(() => setLoading(false));
  }, []);

  return { logs, loading };
};
