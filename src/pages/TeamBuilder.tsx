import { useState, useMemo, useEffect } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import Layout from '@components/Layout';
import EmptyState from '@components/EmptyState';
import CardLibrary from '@components/CardLibrary';
import TeamSlotCard from '@components/TeamSlotCard';
import EmptyTeamSlot from '@components/EmptyTeamSlot';
import SelectedCardDetails from '@components/SelectedCardDetails';
import TraitSelector from '@components/TraitSelector';
import SupportSelector from '@components/SupportSelector';
import TeamSummary from '@components/TeamSummary';
import { useCards } from '@db/hooks';
import { useTraits } from '@db/hooks';
import { useSupports } from '@db/hooks';
import { useTeamBuilderStore } from '@stores/teamBuilderStore';
import { useSaveTeam } from '@db/teamHooks';
import { calculateTeamStats } from '@utils/teamCalculations';
import type { Card, BorderRarityKey, Team, TeamMember } from '@types/index';
import { BORDER_RARITIES, BORDER_RARITY_LABELS } from '@types/index';

export default function TeamBuilder() {
  const { cards, loading: cardsLoading } = useCards();
  const { traits } = useTraits();
  const { supports } = useSupports();
  const saveTeam = useSaveTeam();

  const {
    currentTeam,
    selectedSlot,
    teamName,
    setTeamName,
    setSelectedSlot,
    addCardToSlot,
    removeCardFromSlot,
    updateCardRarity,
    updateCardTrait,
    updateCardSupport,
  } = useTeamBuilderStore();

  const [filterRarity, setFilterRarity] = useState<BorderRarityKey>('base');
  const [sortBy, setSortBy] = useState<'name' | 'hp' | 'damage'>('name');
  const [saving, setSaving] = useState(false);

  // Calculate team stats
  const teamStats = useMemo(
    () => calculateTeamStats(currentTeam, cards, traits, supports),
    [currentTeam, cards, traits, supports]
  );

  // Get selected card data
  const selectedCard = useMemo(() => {
    if (selectedSlot === null || !currentTeam[selectedSlot]) return null;
    return cards.find((c) => c.id === currentTeam[selectedSlot]!.cardId);
  }, [selectedSlot, currentTeam, cards]);

  const handleAddCard = (card: Card, slotIndex: number) => {
    const newMember: TeamMember = {
      cardId: card.id,
      selectedRarity: filterRarity,
    };
    addCardToSlot(newMember, slotIndex);
    setSelectedSlot(slotIndex);
  };

  const handleSaveTeam = async () => {
    setSaving(true);
    try {
      const team: Team = {
        id: crypto.randomUUID(),
        name: teamName || 'Untitled Team',
        members: currentTeam.filter((m) => m !== null) as TeamMember[],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await saveTeam(team);
      alert('Team saved successfully!');
    } catch (error) {
      console.error('Failed to save team:', error);
      alert('Failed to save team');
    } finally {
      setSaving(false);
    }
  };

  if (cardsLoading) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-dark-50 mb-4">Team Builder</h1>
          <p className="text-dark-400">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (cards.length === 0) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Team Builder</h1>
            <p className="text-dark-400">Create and manage your teams</p>
          </div>
          <div className="card-border bg-dark-800/50 p-8">
            <EmptyState
              icon={<div className="text-4xl">📋</div>}
              title="No characters available"
              description="Upload cards in the Character Database first to start building teams."
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark-50 mb-2">Team Builder</h1>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="input-field max-w-xs text-sm"
              placeholder="Enter team name..."
            />
          </div>
          <button
            onClick={handleSaveTeam}
            disabled={saving || currentTeam.filter((m) => m !== null).length === 0}
            className="btn-primary flex items-center gap-2 justify-center w-full md:w-auto"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Team'}
          </button>
        </div>

        {/* Main Content - Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left: Card Library */}
          <div className="card-border bg-dark-800/50 p-4 space-y-4">
            <h2 className="text-lg font-bold text-dark-50">Card Library</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-2">
                  Rarity
                </label>
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value as BorderRarityKey)}
                  className="input-field text-sm"
                >
                  {BORDER_RARITIES.map((rarity) => (
                    <option key={rarity} value={rarity}>
                      {BORDER_RARITY_LABELS[rarity]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-2">
                  Sort
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'hp' | 'damage')}
                  className="input-field text-sm"
                >
                  <option value="name">Name</option>
                  <option value="hp">HP</option>
                  <option value="damage">Damage</option>
                </select>
              </div>
            </div>
            <CardLibrary
              cards={cards}
              selectedRarity={filterRarity}
              onCardSelect={handleAddCard}
              targetSlot={selectedSlot}
            />
          </div>

          {/* Center: Team Slots */}
          <div className="card-border bg-dark-800/50 p-4 space-y-4">
            <h2 className="text-lg font-bold text-dark-50">Team</h2>
            <div className="space-y-2">
              {currentTeam.map((slot, index) => (
                <div key={index}>
                  {slot ? (
                    <TeamSlotCard
                      card={cards.find((c) => c.id === slot.cardId)!}
                      selectedRarity={slot.selectedRarity}
                      onRemove={() => removeCardFromSlot(index)}
                      onSelect={() => setSelectedSlot(index)}
                      isSelected={selectedSlot === index}
                    />
                  ) : (
                    <EmptyTeamSlot
                      slotNumber={index}
                      onSelect={() => setSelectedSlot(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Card Details & Summary */}
          <div className="space-y-6">
            {selectedSlot !== null && currentTeam[selectedSlot] ? (
              <>
                <div className="card-border bg-dark-800/50 p-4">
                  <h2 className="text-lg font-bold text-dark-50 mb-4">
                    Slot {selectedSlot + 1} - {selectedCard?.name}
                  </h2>
                  <SelectedCardDetails
                    slot={currentTeam[selectedSlot]!}
                    card={selectedCard}
                    traits={traits}
                    supports={supports}
                    onRarityChange={(rarity) =>
                      updateCardRarity(selectedSlot, rarity)
                    }
                    onTraitChange={(traitId) =>
                      updateCardTrait(selectedSlot, traitId)
                    }
                    onSupportChange={(supportId) =>
                      updateCardSupport(selectedSlot, supportId)
                    }
                  />
                </div>

                {traits.length > 0 && (
                  <div className="card-border bg-dark-800/50 p-4">
                    <h3 className="text-lg font-bold text-dark-50 mb-3">Traits</h3>
                    <TraitSelector
                      traits={traits}
                      selectedTrait={currentTeam[selectedSlot]?.trait}
                      onSelectTrait={(traitId) =>
                        updateCardTrait(selectedSlot, traitId)
                      }
                    />
                  </div>
                )}

                {supports.length > 0 && (
                  <div className="card-border bg-dark-800/50 p-4">
                    <h3 className="text-lg font-bold text-dark-50 mb-3">Supports</h3>
                    <SupportSelector
                      supports={supports}
                      selectedSupport={currentTeam[selectedSlot]?.support}
                      onSelectSupport={(supportId) =>
                        updateCardSupport(selectedSlot, supportId)
                      }
                    />
                  </div>
                )}
              </>
            ) : null}

            <div className="card-border bg-dark-800/50 p-4">
              <h2 className="text-lg font-bold text-dark-50 mb-4">Team Summary</h2>
              <TeamSummary stats={teamStats} />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden space-y-6">
          {/* Search & Filters */}
          <div className="card-border bg-dark-800/50 p-4 space-y-3">
            <h2 className="text-lg font-bold text-dark-50">Filter</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-2">
                  Rarity
                </label>
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value as BorderRarityKey)}
                  className="input-field text-sm"
                >
                  {BORDER_RARITIES.map((rarity) => (
                    <option key={rarity} value={rarity}>
                      {BORDER_RARITY_LABELS[rarity]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-300 mb-2">
                  Sort
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'hp' | 'damage')}
                  className="input-field text-sm"
                >
                  <option value="name">Name</option>
                  <option value="hp">HP</option>
                  <option value="damage">Damage</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card Library */}
          <div className="card-border bg-dark-800/50 p-4 space-y-4">
            <h2 className="text-lg font-bold text-dark-50">Card Library</h2>
            <CardLibrary
              cards={cards}
              selectedRarity={filterRarity}
              onCardSelect={handleAddCard}
              targetSlot={selectedSlot}
            />
          </div>

          {/* Team Slots */}
          <div className="card-border bg-dark-800/50 p-4 space-y-4">
            <h2 className="text-lg font-bold text-dark-50">Team Slots</h2>
            <div className="space-y-2">
              {currentTeam.map((slot, index) => (
                <div key={index}>
                  {slot ? (
                    <TeamSlotCard
                      card={cards.find((c) => c.id === slot.cardId)!}
                      selectedRarity={slot.selectedRarity}
                      onRemove={() => removeCardFromSlot(index)}
                      onSelect={() => setSelectedSlot(index)}
                      isSelected={selectedSlot === index}
                    />
                  ) : (
                    <EmptyTeamSlot
                      slotNumber={index}
                      onSelect={() => setSelectedSlot(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Card Details */}
          {selectedSlot !== null && currentTeam[selectedSlot] ? (
            <>
              <div className="card-border bg-dark-800/50 p-4">
                <h2 className="text-lg font-bold text-dark-50 mb-4">Card Details</h2>
                <SelectedCardDetails
                  slot={currentTeam[selectedSlot]!}
                  card={selectedCard}
                  traits={traits}
                  supports={supports}
                  onRarityChange={(rarity) => updateCardRarity(selectedSlot, rarity)}
                  onTraitChange={(traitId) => updateCardTrait(selectedSlot, traitId)}
                  onSupportChange={(supportId) =>
                    updateCardSupport(selectedSlot, supportId)
                  }
                />
              </div>

              {traits.length > 0 && (
                <div className="card-border bg-dark-800/50 p-4">
                  <h3 className="text-lg font-bold text-dark-50 mb-3">Traits</h3>
                  <TraitSelector
                    traits={traits}
                    selectedTrait={currentTeam[selectedSlot]?.trait}
                    onSelectTrait={(traitId) =>
                      updateCardTrait(selectedSlot, traitId)
                    }
                  />
                </div>
              )}

              {supports.length > 0 && (
                <div className="card-border bg-dark-800/50 p-4">
                  <h3 className="text-lg font-bold text-dark-50 mb-3">Supports</h3>
                  <SupportSelector
                    supports={supports}
                    selectedSupport={currentTeam[selectedSlot]?.support}
                    onSelectSupport={(supportId) =>
                      updateCardSupport(selectedSlot, supportId)
                    }
                  />
                </div>
              )}
            </>
          ) : null}

          {/* Team Summary */}
          <div className="card-border bg-dark-800/50 p-4">
            <h2 className="text-lg font-bold text-dark-50 mb-4">Team Summary</h2>
            <TeamSummary stats={teamStats} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
