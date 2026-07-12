import { XCircle } from 'lucide-react';
import type { Card, BorderRarityKey } from '@types/index';
import { BORDER_RARITY_LABELS } from '@types/index';

interface TeamSlotCardProps {
  card: Card;
  selectedRarity: BorderRarityKey;
  onRemove: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

export default function TeamSlotCard({
  card,
  selectedRarity,
  onRemove,
  onSelect,
  isSelected,
}: TeamSlotCardProps) {
  const stats = card.borderRarities[selectedRarity];
  const hasArtwork = !!stats.artwork;

  return (
    <div
      onClick={onSelect}
      className={`relative card-border overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-accent-500 bg-dark-700'
          : 'bg-dark-800/50 hover:bg-dark-700 hover:ring-1 hover:ring-dark-600'
      }`}
    >
      {/* Artwork */}
      <div className="relative w-full aspect-square bg-dark-900 overflow-hidden">
        {hasArtwork ? (
          <img
            src={stats.artwork}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark-500">
            <div className="text-center">
              <div className="text-2xl mb-1">🖼️</div>
              <div className="text-xs">No art</div>
            </div>
          </div>
        )}

        {/* Rarity Badge */}
        <div className="absolute top-1 left-1 px-2 py-0.5 bg-black/70 rounded text-xs font-bold text-accent-400">
          {BORDER_RARITY_LABELS[selectedRarity]}
        </div>

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-700 rounded-full transition-colors"
          title="Remove card"
        >
          <XCircle size={16} />
        </button>
      </div>

      {/* Info */}
      <div className="p-2 space-y-2 bg-dark-800/80">
        <h4 className="font-bold text-dark-50 text-xs truncate">{card.name}</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="bg-dark-900/50 px-1.5 py-0.5 rounded">
            <div className="text-dark-400">HP</div>
            <div className="font-bold text-dark-50">{stats.hp}</div>
          </div>
          <div className="bg-dark-900/50 px-1.5 py-0.5 rounded">
            <div className="text-dark-400">DMG</div>
            <div className="font-bold text-dark-50">{stats.damage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
