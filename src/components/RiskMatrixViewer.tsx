import React, { useState } from 'react';
import { RiskItem } from '../data/architectureProjects';
import { AlertTriangle, ShieldCheck, User } from 'lucide-react';

interface RiskMatrixViewerProps {
  risks: RiskItem[];
}

export const RiskMatrixViewer: React.FC<RiskMatrixViewerProps> = ({ risks }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const categories = ['All', 'Technical', 'Content/Accuracy', 'Regulatory', 'Infrastructure'];

  const filteredRisks = filterCategory === 'All'
    ? risks
    : risks.filter((r) => r.category === filterCategory);

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>ARCHITECTURAL RISK MATRIX &amp; PRE-MORTEM DEFENSE</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Risk Assessment &amp; Mitigation Playbook
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Proactive failure analysis addressing accuracy vs fun, AR reliability, data sovereignty, and hardware fragmentation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono-tabular rounded transition-colors ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="bg-[#090D16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono-tabular text-slate-400">
                  {risk.category.toUpperCase()} · OWNER: {risk.owner}
                </span>
                <span
                  className={`text-[10px] font-mono-tabular px-2 py-0.5 rounded font-semibold ${
                    risk.severity === 'High'
                      ? 'bg-red-950/60 text-red-300 border border-red-800/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}
                >
                  SEVERITY: {risk.severity} · {risk.likelihood} LIKELIHOOD
                </span>
              </div>

              <h4 className="text-base font-display font-semibold text-white">
                {risk.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Failure Scenario:</strong> {risk.impactDescription}
              </p>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Engineered Mitigation Architecture:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {risk.mitigationStrategy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
