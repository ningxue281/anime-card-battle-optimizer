// Card Types
export interface BorderRarityStats {
  artwork: string;
  hp: number;
  damage: number;
  abilityDescription: string;
  passiveDescription: string;
  notes: string;
}

export interface Card {
  id: string;
  name: string;
  artwork: string;
  notes: string;
  borderRarities: {
    base: BorderRarityStats;
    gold: BorderRarityStats;
    magmatic: BorderRarityStats;
    abyssal: BorderRarityStats;
    mystic: BorderRarityStats;
    chronicle: BorderRarityStats;
  };
  createdAt: number;
  updatedAt: number;
}

export type BorderRarityKey = 'base' | 'gold' | 'magmatic' | 'abyssal' | 'mystic' | 'chronicle';

// Trait Types
export interface Trait {
  id: string;
  name: string;
  icon: string;
  description: string;
  effects: string;
  createdAt: number;
  updatedAt: number;
}

// Support Types
export interface Support {
  id: string;
  name: string;
  artwork: string;
  description: string;
  effects: string;
  createdAt: number;
  updatedAt: number;
}

// Team Types
export interface TeamMember {
  cardId: string;
  selectedRarity: BorderRarityKey;
  trait?: string;
  support?: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: number;
  updatedAt: number;
}

// Team Statistics
export interface TeamStats {
  totalHP: number;
  totalDamage: number;
  estimatedDPS: number;
  synergyRating: number;
  battleReadiness: number;
}

// Battle Simulation
export interface BattleLog {
  id: string;
  team1Id: string;
  team2Id: string;
  winner: 'team1' | 'team2' | 'draw';
  turns: BattleTurn[];
  createdAt: number;
}

export interface BattleTurn {
  turnNumber: number;
  team1HP: number;
  team2HP: number;
  description: string;
}
