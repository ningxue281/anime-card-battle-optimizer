import { useMemo } from 'react';
import type { Trait } from '@types/index';

interface TraitSelectorProps {
  traits: Trait[];
  selectedTrait?: string;
  onSelectTrait: (traitId: string | undefined) => void;
}

export default function TraitSelector({
  traits,
  selectedTrait,
  onSelectTrait,
}: TraitSelectorProps) {
  const selectedTraitData = useMemo(
    () => traits.find((t) => t.id === selectedTrait),
    [traits, selectedTrait]
  );

  if (traits.length === 0) {
    return (
      <div className="card-border bg-dark-800/50 p-4">
        <p className="text-sm text-dark-400">No traits available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {traits.map((trait) => (
          <button
            key={trait.id}
            onClick={() =>
              onSelectTrait(selectedTrait === trait.id ? undefined : trait.id)
            }
            className={`card-border p-2 text-center transition-all duration-200 ${
              selectedTrait === trait.id
                ? 'bg-accent-600 text-white border-accent-500 ring-2 ring-accent-400'
                : 'bg-dark-800/50 hover:bg-dark-700 text-dark-50'
            }`}
            title={trait.description}
          >
            <div className="text-xs font-bold truncate">{trait.name}</div>
          </button>
        ))}
      </div>

      {selectedTraitData && (
        <div className="card-border bg-dark-800/50 p-3 space-y-2">
          <div>
            <h4 className="font-bold text-dark-50 text-sm">{selectedTraitData.name}</h4>
            <p className="text-xs text-dark-400 mt-1">{selectedTraitData.description}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-dark-300">Effects:</p>
            <p className="text-xs text-dark-400 mt-1">{selectedTraitData.effects}</p>
          </div>
        </div>
      )}
    </div>
  );
}
