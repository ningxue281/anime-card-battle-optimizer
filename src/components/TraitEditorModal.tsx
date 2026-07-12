import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Trait } from '@types/index';
import ImagePicker from './ImagePicker';

interface TraitEditorModalProps {
  trait: Trait;
  isOpen: boolean;
  onClose: () => void;
  onSave: (trait: Trait) => Promise<void>;
}

export default function TraitEditorModal({
  trait,
  isOpen,
  onClose,
  onSave,
}: TraitEditorModalProps) {
  const [editingTrait, setEditingTrait] = useState<Trait>(trait);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditingTrait(trait);
  }, [trait]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await onSave(editingTrait);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save trait');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field: 'name' | 'description' | 'effects' | 'notes', value: string) => {
    setEditingTrait({
      ...editingTrait,
      [field]: value,
    });
  };

  const handleImageUpload = (base64: string) => {
    setEditingTrait({
      ...editingTrait,
      icon: base64,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-800 rounded-lg border border-dark-700 w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-2xl font-bold text-dark-50">Edit Trait</h2>
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

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Trait Icon
            </label>
            <ImagePicker
              currentImage={editingTrait.icon}
              onImageSelected={handleImageUpload}
              label="Upload Trait Icon"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Trait Name *
            </label>
            <input
              type="text"
              value={editingTrait.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="input-field"
              placeholder="Enter trait name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Description
            </label>
            <textarea
              value={editingTrait.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="input-field resize-none"
              rows={4}
              placeholder="Enter trait description"
            />
          </div>

          {/* Effects */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Effects
            </label>
            <textarea
              value={editingTrait.effects}
              onChange={(e) => handleFieldChange('effects', e.target.value)}
              className="input-field resize-none"
              rows={4}
              placeholder="Enter trait effects"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Notes
            </label>
            <textarea
              value={'notes' in editingTrait ? (editingTrait.notes || '') : ''}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              className="input-field resize-none"
              rows={3}
              placeholder="Enter additional notes"
            />
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
            disabled={saving || !editingTrait.name.trim()}
          >
            {saving ? 'Saving...' : 'Save Trait'}
          </button>
        </div>
      </div>
    </div>
  );
}
