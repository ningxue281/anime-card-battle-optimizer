import type { Card, TeamMember, BorderRarityKey, Trait, Support } from '@types/index';

export const calculateTeamStats = (
  team: (TeamMember | null)[],
  cards: Card[],
  traits: Trait[],
  supports: Support[]
) => {
  let totalHP = 0;
  let totalDamage = 0;
  let cardCount = 0;

  team.forEach((slot) => {
    if (!slot) return;

    const card = cards.find((c) => c.id === slot.cardId);
    if (!card) return;

    const rarity = card.borderRarities[slot.selectedRarity];
    totalHP += rarity.hp;
    totalDamage += rarity.damage;
    cardCount++;
  });

  // Calculate DPS (simplified: total damage / number of members)
  const estimatedDPS = cardCount > 0 ? totalDamage / cardCount : 0;

  // Synergy Rating (simplified: 0-100 based on team composition)
  const synergyRating = cardCount === 5 ? 75 : cardCount * 15;

  // Battle Readiness (simplified: combination of HP, damage, and card count)
  const battleReadiness = Math.min(
    100,
    Math.round((totalHP / 1000) * 25 + (totalDamage / 500) * 25 + (cardCount / 5) * 50)
  );

  return {
    totalHP,
    totalDamage,
    estimatedDPS: Math.round(estimatedDPS),
    synergyRating,
    battleReadiness,
  };
};
