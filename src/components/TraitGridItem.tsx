import { Edit2, Trash2, Copy } from 'lucide-react';
import type { Trait } from '@types/index';

interface TraitGridItemProps {
  trait: Trait;
  onEdit: (trait: Trait) => void;
  onDelete: (id: string) => void;
  onDuplicate: (trait: Trait) => void;
}

export default function TraitGridItem({
  trait,
  onEdit,
  onDelete,
  onDuplicate,
}: TraitGridItemProps) {
  const hasIcon = !!trait.icon;

  return (
    <div className="card-border bg-dark-800/50 overflow-hidden hover:border-accent-600/50 transition-colors group">
      {/* Icon */}
      <div className="relative w-full aspect-square bg-dark-900 overflow-hidden flex items-center justify-center">
        {hasIcon ? (
          <img
            src={trait.icon}
            alt={trait.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-dark-500">
            <div className="text-4xl">⭐</div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-dark-50 text-sm">{trait.name}</h3>
          <p className="text-xs text-dark-400 line-clamp-2 mt-1">{trait.description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-dark-700">
          <button
            onClick={() => onEdit(trait)}
            className="flex-1 px-2 py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 hover:text-blue-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            onClick={() => onDuplicate(trait)}
            className="px-2 py-2 bg-green-900/30 hover:bg-green-900/50 text-green-300 hover:text-green-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
            title="Duplicate trait"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={() => onDelete(trait.id)}
            className="px-2 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 rounded font-medium text-sm transition-colors flex items-center justify-center gap-1"
            title="Delete trait"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
