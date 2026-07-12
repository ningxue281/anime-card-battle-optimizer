import { Edit2, Trash2, Copy } from 'lucide-react';
import type { Card, BorderRarityKey } from '@types/index';
import { BORDER_RARITY_LABELS } from '@types/index';

interface CardGridItemProps {
  card: Card;
  selectedRarity: BorderRarityKey;
  onEdit: (card: Card) => void;
  onDelete: (id: string) => void;
  onDuplicate: (card: Card) => void;
}

export default function CardGridItem({
  card,
  selectedRarity,
  onEdit,
  onDelete,
  onDuplicate,
}: CardGridItemProps) {
  const stats = card.borderRarities[selectedRarity];
  const hasArtwork = !!stats.artwork;

  return (
    <div className="card-border bg-dark-800/50 overflow-hidden hover:border-accent-600/50 transition-colors group">
      {/* Artwork */}
      <div className="relative w-full aspect-square bg-dark-900 overflow-hidden">
        {hasArtwork ? (
          <img
            src={stats.artwork}
            alt={card.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm">No artwork</div>
            </div>
          </div>
        )}

        {/* Rarity Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-xs font-bold text-accent-400">
          {BORDER_RARITY_LABELS[selectedRarity]}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-dark-50 text-sm truncate">{card.name}</h3>
          {card.animeName && (
            <p className="text-xs text-dark-400 truncate">{card.animeName}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-dark-900/50 px-2 py-1 rounded">
            <div className="text-dark-400 text-xs">HP</div>
            <div className="font-bold text-dark-50">{stats.hp}</div>
          </div>
          <div className="bg-dark-900/50 px-2 py-1 rounded">
            <div className="text-dark-400 text-xs">DMG</div>
            <div className="font-bold text-dark-50">{stats.damage}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-dark-700">
          <button
            onClick={() => onEdit(card)}
            className="flex-1 px-2 py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 hover:text-blue-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            onClick={() => onDuplicate(card)}
            className="px-2 py-2 bg-green-900/30 hover:bg-green-900/50 text-green-300 hover:text-green-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
            title="Duplicate card"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={() => onDelete(card.id)}
            className="px-2 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
            title="Delete card"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
