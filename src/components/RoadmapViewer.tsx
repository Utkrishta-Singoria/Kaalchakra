import React, { useState } from 'react';
import { RoadmapPhase } from '../data/architectureProjects';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';

interface RoadmapViewerProps {
  roadmap: RoadmapPhase[];
}

export const RoadmapViewer: React.FC<RoadmapViewerProps> = ({ roadmap }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = roadmap[activePhaseIndex] || roadmap[0];

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-purple-400">
            <Calendar className="w-4 h-4" />
            <span>PHASED IMPLEMENTATION TIMELINE &amp; RESOURCE PLANNING</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Step-by-Step Delivery Roadmap (Phases 0–9)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured delivery with clear go/no-go validation gates, risk mitigation steps, and team capacity allocations.
          </p>
        </div>
      </div>

      {/* Horizontal Phase Ribbon */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {roadmap.map((phase, idx) => {
          const isSelected = activePhaseIndex === idx;
          return (
            <button
              key={phase.phaseNum}
              onClick={() => setActivePhaseIndex(idx)}
              className={`px-4 py-2.5 rounded-lg border text-left whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-purple-950/40 border-purple-500 text-white shadow-md'
                  : 'bg-[#090D16] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-mono-tabular text-purple-400">PHASE {phase.phaseNum}</div>
              <div className="text-xs font-semibold mt-0.5">{phase.name}</div>
              <div className="text-[10px] text-slate-500 font-mono-tabular">{phase.duration}</div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details */}
      {activePhase && (
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono-tabular text-purple-400">PHASE {activePhase.phaseNum} · {activePhase.duration}</span>
              <h4 className="text-xl font-display font-semibold text-white mt-1">
                {activePhase.name}
              </h4>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono-tabular text-slate-400 block">KEY MILESTONES:</span>
              <div className="space-y-2">
                {activePhase.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-tabular text-slate-400 block">DELIVERABLE ARTIFACTS:</span>
              <div className="flex flex-wrap gap-2">
                {activePhase.deliverables.map((deliv, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded text-xs text-purple-200 font-mono-tabular"
                  >
                    📦 {deliv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-400">
                <Users className="w-4 h-4 text-sky-400" />
                <span>TEAM RESOURCE ALLOCATION</span>
              </div>
              <div className="space-y-1.5">
                {activePhase.teamAllocation.map((member, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-900/80 border border-slate-800 rounded text-xs text-slate-200 font-mono-tabular"
                  >
                    👤 {member}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono-tabular text-slate-400 block">RISKS MITIGATED IN THIS PHASE:</span>
              {activePhase.risksAddressed.map((risk, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-amber-950/20 border border-amber-500/20 rounded text-xs text-amber-200"
                >
                  🛡️ {risk}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
