import React, { useState } from 'react';
import { TechStackChoice } from '../data/architectureProjects';
import { Layers, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface StackEvaluatorProps {
  stack: TechStackChoice[];
}

export const StackEvaluator: React.FC<StackEvaluatorProps> = ({ stack }) => {
  const [activeLayer, setActiveLayer] = useState<string>(stack[0]?.layer || '');
  const selectedChoice = stack.find((s) => s.layer === activeLayer) || stack[0];

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>TECHNOLOGY DECISION MATRIX &amp; TRADE-OFF ANALYSIS</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Engineered Architectural Stack
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every layer evaluated against low-end hardware, rural connectivity, developer velocity, and maintenance costs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Layer Buttons */}
        <div className="lg:col-span-5 space-y-2">
          {stack.map((item) => {
            const isSelected = item.layer === activeLayer;
            return (
              <button
                key={item.layer}
                onClick={() => setActiveLayer(item.layer)}
                className={`w-full p-3.5 text-left rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-sky-500 shadow-md'
                    : 'bg-[#090D16] border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-slate-400">{item.layer}</span>
                  {isSelected && <span className="text-[10px] font-mono-tabular text-sky-400">● ACTIVE</span>}
                </div>
                <div className="text-sm font-semibold text-white mt-1">{item.choice}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Trade-off Breakdown */}
        {selectedChoice && (
          <div className="lg:col-span-7 bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono-tabular text-slate-400">LAYER: {selectedChoice.layer.toUpperCase()}</span>
                <h4 className="text-xl font-display font-semibold text-white mt-0.5">
                  {selectedChoice.choice}
                </h4>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Architectural Rationale &amp; Strategic Fit</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedChoice.rationale}
                  </p>
                </div>

                <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Incurred Technical Debt &amp; Trade-Off</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedChoice.tradeOff}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs">
              <span className="text-slate-500 block mb-1.5 font-mono-tabular">REJECTED ALTERNATIVES &amp; WHY:</span>
              <div className="flex flex-wrap gap-2">
                {selectedChoice.alternativesConsidered.map((alt, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/60 rounded text-slate-300 font-mono-tabular"
                  >
                    ✕ {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
