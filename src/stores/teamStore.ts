import { create } from 'zustand';
import type { TeamMember, BorderRarityKey } from '@types/index';

interface TeamState {
  selectedTeam: TeamMember[];
  addMember: (member: TeamMember, slot: number) => void;
  removeMember: (slot: number) => void;
  updateMember: (slot: number, member: Partial<TeamMember>) => void;
  clearTeam: () => void;
  getTeamMember: (slot: number) => TeamMember | undefined;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  selectedTeam: Array(5).fill(null),
  addMember: (member, slot) =>
    set((state) => {
      const newTeam = [...state.selectedTeam];
      newTeam[slot] = member;
      return { selectedTeam: newTeam };
    }),
  removeMember: (slot) =>
    set((state) => {
      const newTeam = [...state.selectedTeam];
      newTeam[slot] = null;
      return { selectedTeam: newTeam };
    }),
  updateMember: (slot, updates) =>
    set((state) => {
      const newTeam = [...state.selectedTeam];
      if (newTeam[slot]) {
        newTeam[slot] = { ...newTeam[slot], ...updates };
      }
      return { selectedTeam: newTeam };
    }),
  clearTeam: () => set({ selectedTeam: Array(5).fill(null) }),
  getTeamMember: (slot) => get().selectedTeam[slot],
}));
