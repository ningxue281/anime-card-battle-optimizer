import { Plus } from 'lucide-react';
import type { Card } from '@types/index';

interface EmptyTeamSlotProps {
  slotNumber: number;
  onSelect: () => void;
}

export default function EmptyTeamSlot({ slotNumber, onSelect }: EmptyTeamSlotProps) {
  return (
    <button
      onClick={onSelect}
      className="card-border bg-dark-800/50 hover:bg-dark-700 hover:border-accent-600/50 transition-all duration-200 p-4 flex flex-col items-center justify-center aspect-square cursor-pointer group"
    >
      <Plus size={32} className="text-dark-500 group-hover:text-accent-500 transition-colors mb-2" />
      <span className="text-sm font-medium text-dark-400 group-hover:text-dark-300">
        Slot {slotNumber + 1}
      </span>
    </button>
  );
}
