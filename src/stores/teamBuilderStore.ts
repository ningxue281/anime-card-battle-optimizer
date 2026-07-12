import { create } from 'zustand';
import type { TeamMember, BorderRarityKey } from '@types/index';

interface TeamBuilderState {
  currentTeam: (TeamMember | null)[];
  selectedSlot: number | null;
  teamName: string;
  setTeamName: (name: string) => void;
  setSelectedSlot: (slot: number | null) => void;
  addCardToSlot: (card: TeamMember, slot: number) => void;
  removeCardFromSlot: (slot: number) => void;
  updateCardRarity: (slot: number, rarity: BorderRarityKey) => void;
  updateCardTrait: (slot: number, traitId: string | undefined) => void;
  updateCardSupport: (slot: number, supportId: string | undefined) => void;
  reorderTeam: (fromIndex: number, toIndex: number) => void;
  clearTeam: () => void;
  loadTeam: (team: (TeamMember | null)[]) => void;
}

export const useTeamBuilderStore = create<TeamBuilderState>((set) => ({
  currentTeam: Array(5).fill(null),
  selectedSlot: null,
  teamName: 'Untitled Team',
  setTeamName: (name) => set({ teamName: name }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  addCardToSlot: (card, slot) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      newTeam[slot] = card;
      return { currentTeam: newTeam, selectedSlot: slot };
    }),
  removeCardFromSlot: (slot) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      newTeam[slot] = null;
      return { currentTeam: newTeam, selectedSlot: null };
    }),
  updateCardRarity: (slot, rarity) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      if (newTeam[slot]) {
        newTeam[slot]!.selectedRarity = rarity;
      }
      return { currentTeam: newTeam };
    }),
  updateCardTrait: (slot, traitId) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      if (newTeam[slot]) {
        newTeam[slot]!.trait = traitId;
      }
      return { currentTeam: newTeam };
    }),
  updateCardSupport: (slot, supportId) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      if (newTeam[slot]) {
        newTeam[slot]!.support = supportId;
      }
      return { currentTeam: newTeam };
    }),
  reorderTeam: (fromIndex, toIndex) =>
    set((state) => {
      const newTeam = [...state.currentTeam];
      const [removed] = newTeam.splice(fromIndex, 1);
      newTeam.splice(toIndex, 0, removed);
      return { currentTeam: newTeam };
    }),
  clearTeam: () => set({ currentTeam: Array(5).fill(null), selectedSlot: null }),
  loadTeam: (team) => set({ currentTeam: team }),
}));
