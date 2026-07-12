import { useMemo } from 'react';
import type { Support } from '@types/index';

interface SupportSelectorProps {
  supports: Support[];
  selectedSupport?: string;
  onSelectSupport: (supportId: string | undefined) => void;
}

export default function SupportSelector({
  supports,
  selectedSupport,
  onSelectSupport,
}: SupportSelectorProps) {
  const selectedSupportData = useMemo(
    () => supports.find((s) => s.id === selectedSupport),
    [supports, selectedSupport]
  );

  if (supports.length === 0) {
    return (
      <div className="card-border bg-dark-800/50 p-4">
        <p className="text-sm text-dark-400">No supports available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {supports.map((support) => {
          const hasArtwork = !!support.artwork;
          return (
            <button
              key={support.id}
              onClick={() =>
                onSelectSupport(
                  selectedSupport === support.id ? undefined : support.id
                )
              }
              className={`card-border overflow-hidden transition-all duration-200 ${
                selectedSupport === support.id
                  ? 'bg-accent-600 border-accent-500 ring-2 ring-accent-400'
                  : 'bg-dark-800/50 hover:bg-dark-700'
              }`}
              title={support.description}
            >
              <div className="relative w-full aspect-square bg-dark-900 overflow-hidden">
                {hasArtwork ? (
                  <img
                    src={support.artwork}
                    alt={support.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-500">
                    <div className="text-2xl">📦</div>
                  </div>
                )}
              </div>
              <div className="p-2 bg-dark-800/80">
                <h4 className="font-bold text-dark-50 text-xs truncate">
                  {support.name}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {selectedSupportData && (
        <div className="card-border bg-dark-800/50 p-3 space-y-2">
          <div>
            <h4 className="font-bold text-dark-50 text-sm">{selectedSupportData.name}</h4>
            <p className="text-xs text-dark-400 mt-1">
              {selectedSupportData.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-dark-300">Effects:</p>
            <p className="text-xs text-dark-400 mt-1">{selectedSupportData.effects}</p>
          </div>
        </div>
      )}
    </div>
  );
}
