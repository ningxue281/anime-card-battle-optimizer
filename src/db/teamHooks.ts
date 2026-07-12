import { useCallback, useEffect } from 'react';
import { db } from './db';
import type { Team, TeamMember } from '@types/index';

export const useSaveTeam = () => {
  return useCallback(async (team: Team) => {
    const existingTeam = await db.teams.get(team.id);
    if (existingTeam) {
      return db.teams.update(team.id, {
        ...team,
        updatedAt: Date.now(),
      });
    } else {
      return db.teams.add(team);
    }
  }, []);
};

export const useDeleteTeam = () => {
  return useCallback(async (id: string) => {
    return db.teams.delete(id);
  }, []);
};

export const useLoadTeam = (id: string) => {
  const { team, loading } = useTeamData(id);
  return { team, loading };
};

function useTeamData(id: string) {
  const { team, loading } = useTeam(id);
  return { team, loading };
}

// Import from hooks.ts
import { useTeam } from './hooks';
