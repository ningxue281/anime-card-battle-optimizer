import Dexie, { Table } from 'dexie';
import type { Card, Trait, Support, Team, BattleLog } from '@types/index';

export class AnimeBattleDB extends Dexie {
  cards!: Table<Card>;
  traits!: Table<Trait>;
  supports!: Table<Support>;
  teams!: Table<Team>;
  battleLogs!: Table<BattleLog>;

  constructor() {
    super('AnimeBattleOptimizer');
    this.version(1).stores({
      cards: 'id, name, createdAt',
      traits: 'id, name, createdAt',
      supports: 'id, name, createdAt',
      teams: 'id, name, createdAt',
      battleLogs: 'id, createdAt, team1Id, team2Id',
    });
  }
}

export const db = new AnimeBattleDB();
