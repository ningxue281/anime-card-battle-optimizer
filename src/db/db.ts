import Dexie, { Table } from 'dexie';
import type { Card, Trait, Support, Team, BattleLog } from '@/types';

export class AnimeBattleDB extends Dexie {
  cards!: Table<Card>;
  traits!: Table<Trait>;
  supports!: Table<Support>;
  teams!: Table<Team>;
  battleLogs!: Table<BattleLog>;

  constructor() {
    super('AnimeBattleOptimizer');
    this.version(1).stores({
      cards: 'id, name, createdAt, tags',
      traits: 'id, name, createdAt',
      supports: 'id, name, createdAt',
      teams: 'id, name, createdAt',
      battleLogs: 'id, createdAt, team1Id, team2Id',
    });
  }
}

export const db = new AnimeBattleDB();

// Helper functions
export const createEmptyBorderRarityStats = () => ({
  artwork: '',
  hp: 0,
  damage: 0,
  abilityDescription: '',
  passiveDescription: '',
  notes: '',
});

export const createNewCard = (name: string): Card => ({
  id: crypto.randomUUID(),
  name,
  animeName: '',
  notes: '',
  tags: [],
  borderRarities: {
    base: createEmptyBorderRarityStats(),
    gold: createEmptyBorderRarityStats(),
    magmatic: createEmptyBorderRarityStats(),
    abyssal: createEmptyBorderRarityStats(),
    mystic: createEmptyBorderRarityStats(),
    chronicle: createEmptyBorderRarityStats(),
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const duplicateCard = (card: Card): Card => ({
  ...card,
  id: crypto.randomUUID(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
});
