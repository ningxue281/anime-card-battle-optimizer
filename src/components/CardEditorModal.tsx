import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Card, BorderRarityKey } from '@/types';
import { BORDER_RARITIES, BORDER_RARITY_LABELS } from '@/types';
import ImagePicker from './ImagePicker';

interface CardEditorModalProps {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Card) => Promise<void>;
}

export default function CardEditorModal({
  card,
  isOpen,
  onClose,
  onSave,
}: CardEditorModalProps) {
  const [editingCard, setEditingCard] = useState<Card>(card);
  const [selectedRarity, setSelectedRarity] = useState<BorderRarityKey>('base');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditingCard(card);
  }, [card]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await onSave(editingCard);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleGeneralChange = (field: 'name' | 'animeName' | 'notes', value: string) => {
    setEditingCard({
      ...editingCard,
      [field]: value,
    });
  };

  const handleRarityChange = (field: keyof Card['borderRarities']['base'], value: string | number) => {
    setEditingCard({
      ...editingCard,
      borderRarities: {
        ...editingCard.borderRarities,
        [selectedRarity]: {
          ...editingCard.borderRarities[selectedRarity],
          [field]: value,
        },
      },
    });
  };

  const handleImageUpload = (base64: string) => {
    handleRarityChange('artwork', base64);
  };

  const currentRarity = editingCard.borderRarities[selectedRarity];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-800 rounded-lg border border-dark-700 w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-2xl font-bold text-dark-50">Edit Card</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-700 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-dark-50">General Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Card Name *
                </label>
                <input
                  type="text"
                  value={editingCard.name}
                  onChange={(e) => handleGeneralChange('name', e.target.value)}
                  className="input-field"
                  placeholder="Enter card name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Anime Name
                </label>
                <input
                  type="text"
                  value={editingCard.animeName || ''}
                  onChange={(e) => handleGeneralChange('animeName', e.target.value)}
                  className="input-field"
                  placeholder="Enter anime name (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={editingCard.notes}
                  onChange={(e) => handleGeneralChange('notes', e.target.value)}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Enter notes"
                />
              </div>
            </div>
          </div>

          {/* Border Rarity Selector */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-dark-50">Border Rarity</h3>
            <div className="grid grid-cols-3 gap-2">
              {BORDER_RARITIES.map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedRarity === rarity
                      ? 'bg-accent-600 text-white'
                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                  }`}
                >
                  {BORDER_RARITY_LABELS[rarity]}
                </button>
              ))}
            </div>
          </div>

          {/* Rarity Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-dark-50">
              {BORDER_RARITY_LABELS[selectedRarity]} Stats
            </h3>

            <ImagePicker
              currentImage={currentRarity.artwork}
              onImageSelected={handleImageUpload}
              label={`Upload ${BORDER_RARITY_LABELS[selectedRarity]} Artwork`}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  HP
                </label>
                <input
                  type="number"
                  value={currentRarity.hp}
                  onChange={(e) => handleRarityChange('hp', parseInt(e.target.value) || 0)}
                  className="input-field"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Damage
                </label>
                <input
                  type="number"
                  value={currentRarity.damage}
                  onChange={(e) => handleRarityChange('damage', parseInt(e.target.value) || 0)}
                  className="input-field"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Ability Description
              </label>
              <textarea
                value={currentRarity.abilityDescription}
                onChange={(e) => handleRarityChange('abilityDescription', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="Enter ability description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Passive Description
              </label>
              <textarea
                value={currentRarity.passiveDescription}
                onChange={(e) => handleRarityChange('passiveDescription', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="Enter passive description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Notes
              </label>
              <textarea
                value={currentRarity.notes}
                onChange={(e) => handleRarityChange('notes', e.target.value)}
                className="input-field resize-none"
                rows={2}
                placeholder="Enter notes for this rarity"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-dark-700 bg-dark-900/50">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
            disabled={saving || !editingCard.name.trim()}
          >
            {saving ? 'Saving...' : 'Save Card'}
          </button>
        </div>
      </div>
    </div>
  );
}
