import type { TeamStats } from '@types/index';

interface TeamSummaryProps {
  stats: TeamStats;
}

export default function TeamSummary({ stats }: TeamSummaryProps) {
  const getReadinessColor = (value: number) => {
    if (value >= 75) return 'text-green-400';
    if (value >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-3">
      {/* Total Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-border bg-dark-800/50 p-4">
          <div className="text-xs text-dark-400 uppercase">Total HP</div>
          <div className="text-3xl font-bold text-green-400 mt-1">{stats.totalHP}</div>
        </div>
        <div className="card-border bg-dark-800/50 p-4">
          <div className="text-xs text-dark-400 uppercase">Total Damage</div>
          <div className="text-3xl font-bold text-red-400 mt-1">{stats.totalDamage}</div>
        </div>
      </div>

      {/* DPS and Synergy */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-border bg-dark-800/50 p-4">
          <div className="text-xs text-dark-400 uppercase">Estimated DPS</div>
          <div className="text-2xl font-bold text-orange-400 mt-1">{stats.estimatedDPS}</div>
        </div>
        <div className="card-border bg-dark-800/50 p-4">
          <div className="text-xs text-dark-400 uppercase">Synergy</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{stats.synergyRating}%</div>
        </div>
      </div>

      {/* Battle Readiness */}
      <div className="card-border bg-dark-800/50 p-4">
        <div className="text-xs text-dark-400 uppercase mb-2">Battle Readiness</div>
        <div className="flex items-center gap-3">
          <div className={`text-3xl font-bold ${getReadinessColor(stats.battleReadiness)}`}>
            {stats.battleReadiness}%
          </div>
          <div className="flex-1 h-3 bg-dark-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                stats.battleReadiness >= 75
                  ? 'bg-green-500'
                  : stats.battleReadiness >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{ width: `${stats.battleReadiness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
