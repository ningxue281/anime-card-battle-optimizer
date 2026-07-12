import { useEffect, useState } from 'react';
import { db } from './db';
import type { Card, Trait, Support, Team, BattleLog } from '@types/index';

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
