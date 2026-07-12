import { useMemo } from 'react';
import type { TeamMember, Card, Trait, Support } from '@types/index';
import { BORDER_RARITIES, BORDER_RARITY_LABELS } from '@types/index';

interface SelectedCardDetailsProps {
  slot: TeamMember;
  card: Card | undefined;
  traits: Trait[];
  supports: Support[];
  onRarityChange: (rarity: typeof BORDER_RARITIES[number]) => void;
  onTraitChange: (traitId: string | undefined) => void;
  onSupportChange: (supportId: string | undefined) => void;
}

export default function SelectedCardDetails({
  slot,
  card,
  traits,
  supports,
  onRarityChange,
  onTraitChange,
  onSupportChange,
}: SelectedCardDetailsProps) {
  const stats = useMemo(() => {
    if (!card) return null;
    return card.borderRarities[slot.selectedRarity];
  }, [card, slot.selectedRarity]);

  const selectedTrait = useMemo(
    () => traits.find((t) => t.id === slot.trait),
    [traits, slot.trait]
  );

  const selectedSupport = useMemo(
    () => supports.find((s) => s.id === slot.support),
    [supports, slot.support]
  );

  if (!card || !stats) {
    return (
      <div className="card-border bg-dark-800/50 p-6 text-center">
        <p className="text-dark-400">No card selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Artwork */}
      {stats.artwork && (
        <div className="card-border overflow-hidden bg-dark-900">
          <img src={stats.artwork} alt={card.name} className="w-full" />
        </div>
      )}

      {/* Name */}
      <div>
        <h3 className="text-2xl font-bold text-dark-50">{card.name}</h3>
        {card.animeName && (
          <p className="text-sm text-dark-400">{card.animeName}</p>
        )}
      </div>

      {/* Rarity Selector */}
      <div>
        <label className="block text-sm font-medium text-dark-300 mb-2">
          Border Rarity
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BORDER_RARITIES.map((rarity) => (
            <button
              key={rarity}
              onClick={() => onRarityChange(rarity)}
              className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                slot.selectedRarity === rarity
                  ? 'bg-accent-600 text-white'
                  : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
              }`}
            >
              {BORDER_RARITY_LABELS[rarity]}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-border bg-dark-800/50 p-3">
          <div className="text-sm text-dark-400">HP</div>
          <div className="text-2xl font-bold text-green-400">{stats.hp}</div>
        </div>
        <div className="card-border bg-dark-800/50 p-3">
          <div className="text-sm text-dark-400">Damage</div>
          <div className="text-2xl font-bold text-red-400">{stats.damage}</div>
        </div>
      </div>

      {/* Ability */}
      {stats.abilityDescription && (
        <div className="card-border bg-dark-800/50 p-3 space-y-1">
          <h4 className="font-bold text-dark-50 text-sm">Ability</h4>
          <p className="text-sm text-dark-300">{stats.abilityDescription}</p>
        </div>
      )}

      {/* Passive */}
      {stats.passiveDescription && (
        <div className="card-border bg-dark-800/50 p-3 space-y-1">
          <h4 className="font-bold text-dark-50 text-sm">Passive</h4>
          <p className="text-sm text-dark-300">{stats.passiveDescription}</p>
        </div>
      )}

      {/* Equipped Trait */}
      {selectedTrait && (
        <div className="card-border bg-dark-800/50 p-3 space-y-1 border-l-2 border-accent-500">
          <h4 className="font-bold text-dark-50 text-sm flex items-center gap-2">
            ⭐ Equipped Trait: {selectedTrait.name}
          </h4>
          <p className="text-xs text-dark-300">{selectedTrait.effects}</p>
        </div>
      )}

      {/* Equipped Support */}
      {selectedSupport && (
        <div className="card-border bg-dark-800/50 p-3 space-y-1 border-l-2 border-blue-500">
          <h4 className="font-bold text-dark-50 text-sm flex items-center gap-2">
            📦 Equipped Support: {selectedSupport.name}
          </h4>
          <p className="text-xs text-dark-300">{selectedSupport.effects}</p>
        </div>
      )}
    </div>
  );
}
