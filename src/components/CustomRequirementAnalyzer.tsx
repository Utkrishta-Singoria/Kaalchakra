import React, { useState } from 'react';
import { ProjectArchitecture } from '../data/architectureProjects';
import { Sparkles, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface CustomRequirementAnalyzerProps {
  onSelectProject: (proj: ProjectArchitecture) => void;
  allProjects: ProjectArchitecture[];
}

export const CustomRequirementAnalyzer: React.FC<CustomRequirementAnalyzerProps> = ({
  onSelectProject,
  allProjects,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    summary: string;
    stack: string[];
    risks: string[];
    milestones: string[];
  } | null>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setGeneratedResult({
        title: 'Architectural Blueprint: ' + inputText.slice(0, 32) + '...',
        summary: 'Parsed requirements into 4-tier decoupled architecture with offline-first client resilience, edge processing, and strict regulatory compliance controls.',
        stack: ['Client: Unity / React PWA (Offline Bundle)', 'Edge: WebAssembly / TFLite Inference', 'Data Layer: TimescaleDB / Firestore Async Sync', 'Security: Zero-Knowledge End-to-End Tokens'],
        risks: ['Hardware fragmentation on low-end target devices', 'Network latency spikes during peak synchronization', 'Data governance & audit trail integrity'],
        milestones: ['Phase 0: Scope & Technical Feasibility', 'Phase 1: Vertical Prototype & User Study', 'Phase 2: Offline Resilience & Edge Model Optimization', 'Phase 3: Production Hardening & Closed Beta'],
      });
    }, 600);
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono-tabular text-sky-400">
          <Sparkles className="w-4 h-4" />
          <span>REQUIREMENT-TO-ARCHITECTURE COMPILER</span>
        </div>
        <h3 className="text-xl font-display font-semibold text-white mt-1">
          Custom Specification Ingestion Engine
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Paste complex RFPs, student innovation problem statements, or engineering PRDs to evaluate architecture trade-offs.
        </p>
      </div>

      <div className="space-y-3">
        <label htmlFor="custom-requirement-input" className="block text-xs font-mono-tabular text-slate-400">
          INPUT RAW REQUIREMENTS / PROBLEM STATEMENT TEXT:
        </label>
        <textarea
          id="custom-requirement-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Build an offline-first mobile application for rural schools with on-device computer vision, asynchronous multiplayer economy, and strict child privacy compliance..."
          rows={4}
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono-tabular focus:outline-none focus:border-sky-500"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono-tabular">OR LOAD PRE-ANALYZED BENCHMARK:</span>
            {allProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono-tabular"
              >
                {p.title.split('—')[0].trim()}
              </button>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !inputText.trim()}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors font-mono-tabular flex items-center gap-1.5 disabled:opacity-50"
          >
            {analyzing ? 'Synthesizing Architecture...' : 'Compile Architecture Plan →'}
          </button>
        </div>
      </div>

      {generatedResult && (
        <div className="p-5 bg-[#090D16] border border-slate-800 rounded-lg space-y-4">
          <div>
            <div className="text-xs font-mono-tabular text-emerald-400">ARCHITECTURAL SYNTHESIS COMPLETE</div>
            <h4 className="text-base font-semibold text-white mt-1">{generatedResult.title}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{generatedResult.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-tabular">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1.5">
              <span className="text-slate-400 font-bold block">RECOMMENDED STACK:</span>
              {generatedResult.stack.map((s, i) => (
                <div key={i} className="text-slate-300">✓ {s}</div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1.5">
              <span className="text-slate-400 font-bold block">PRIMARY RISK DEFENSES:</span>
              {generatedResult.risks.map((r, i) => (
                <div key={i} className="text-amber-300">▲ {r}</div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1.5">
              <span className="text-slate-400 font-bold block">DELIVERY MILESTONES:</span>
              {generatedResult.milestones.map((m, i) => (
                <div key={i} className="text-purple-300">📦 {m}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
