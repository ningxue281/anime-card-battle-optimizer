import { useMemo } from 'react';
import { BORDER_RARITIES, BORDER_RARITY_LABELS } from '@types/index';
import type { BorderRarityKey, Card } from '@types/index';

interface CardLibraryProps {
  cards: Card[];
  selectedRarity: BorderRarityKey;
  onCardSelect: (card: Card, slotIndex: number) => void;
  targetSlot: number | null;
}

export default function CardLibrary({
  cards,
  selectedRarity,
  onCardSelect,
  targetSlot,
}: CardLibraryProps) {
  const displayCards = useMemo(
    () =>
      cards.filter((card) => {
        const stats = card.borderRarities[selectedRarity];
        return stats.hp > 0 || stats.damage > 0 || stats.artwork;
      }),
    [cards, selectedRarity]
  );

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-dark-300">
        {displayCards.length} cards available
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto scrollbar-hide">
        {displayCards.map((card) => {
          const stats = card.borderRarities[selectedRarity];
          const hasArtwork = !!stats.artwork;

          return (
            <button
              key={card.id}
              onClick={() => targetSlot !== null && onCardSelect(card, targetSlot)}
              className="card-border bg-dark-800/50 hover:bg-dark-700 transition-colors overflow-hidden group"
              disabled={targetSlot === null}
            >
              {/* Artwork */}
              <div className="relative w-full aspect-square bg-dark-900 overflow-hidden">
                {hasArtwork ? (
                  <img
                    src={stats.artwork}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-500">
                    <div className="text-2xl">🖼️</div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2 bg-dark-800/80">
                <h4 className="font-bold text-dark-50 text-xs truncate">{card.name}</h4>
                <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                  <div className="bg-dark-900/50 px-1 py-0.5 rounded">
                    <div className="text-dark-400">HP</div>
                    <div className="font-bold text-dark-50">{stats.hp}</div>
                  </div>
                  <div className="bg-dark-900/50 px-1 py-0.5 rounded">
                    <div className="text-dark-400">DMG</div>
                    <div className="font-bold text-dark-50">{stats.damage}</div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
