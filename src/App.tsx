import React, { useState } from 'react';
import {
  ARCHITECTURE_PROJECTS,
  ProjectArchitecture,
} from './data/architectureProjects';
import { TopologyDiagram } from './components/TopologyDiagram';
import { StackEvaluator } from './components/StackEvaluator';
import { RoadmapViewer } from './components/RoadmapViewer';
import { RiskMatrixViewer } from './components/RiskMatrixViewer';
import { CodeScaffoldViewer } from './components/CodeScaffoldViewer';
import { LiveSolutionSimulator } from './components/LiveSolutionSimulator';
import { CustomRequirementAnalyzer } from './components/CustomRequirementAnalyzer';
import {
  Network,
  Layers,
  Calendar,
  AlertTriangle,
  Code,
  Play,
  FileDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

type ActiveView =
  | 'overview'
  | 'topology'
  | 'stack'
  | 'roadmap'
  | 'risks'
  | 'code'
  | 'simulator';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('aicte-26208');
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  const currentProject =
    ARCHITECTURE_PROJECTS.find((p) => p.id === selectedProjectId) ||
    ARCHITECTURE_PROJECTS[0];

  const handleExportSpec = () => {
    const spec = `# ${currentProject.title}
Organization: ${currentProject.clientOrganization}
Category: ${currentProject.category}

## Executive Summary
${currentProject.executiveSummary}

## Key Constraints
${currentProject.keyConstraints.map((c) => `- ${c}`).join('\n')}

## Recommended Stack
${currentProject.recommendedStack.map((s) => `### ${s.layer}: ${s.choice}\nRationale: ${s.rationale}\nTrade-off: ${s.tradeOff}`).join('\n\n')}

## Roadmap
${currentProject.roadmap.map((r) => `Phase ${r.phaseNum}: ${r.name} (${r.duration})\nDeliverables: ${r.deliverables.join(', ')}`).join('\n\n')}
`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(spec).catch(() => {});
    }
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-[#E2E8F0]">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
          Zone 1: Single text element Brand Wordmark
          Zone 2: 4–6 text navigation links
          Zone 3: 1–2 primary action controls
         ===================================================================== */}
      <header className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('overview');
          }}
          className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white whitespace-nowrap"
        >
          Solution Architect
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Architecture Navigation"
          className="hidden xl:flex items-center gap-6 text-xs font-mono-tabular"
        >
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'topology', label: 'C4 Topology' },
              { id: 'stack', label: 'Tech Decisions' },
              { id: 'roadmap', label: 'Roadmap (0–9)' },
              { id: 'risks', label: 'Risk Pre-Mortem' },
              { id: 'code', label: 'Code & Schema' },
              { id: 'simulator', label: 'Live Testbed' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`py-1 transition-colors whitespace-nowrap border-b-2 ${
                activeView === item.id
                  ? 'border-sky-400 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <select
            aria-label="Select Architecture Project"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono-tabular rounded px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
          >
            {ARCHITECTURE_PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title.split('—')[0].trim()}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportSpec}
            className="px-3 py-1.5 text-xs font-semibold font-mono-tabular bg-sky-500 text-slate-950 hover:bg-sky-400 rounded transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" /> Export Architecture
          </button>
        </div>
      </header>

      {/* Subnav for Mobile/Tablet */}
      <div className="xl:hidden flex overflow-x-auto border-b border-slate-800 bg-[#0F172A] px-4 py-2 gap-4 text-xs font-mono-tabular">
        {(
          [
            { id: 'overview', label: 'Overview' },
            { id: 'topology', label: 'C4 Topology' },
            { id: 'stack', label: 'Tech Decisions' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'risks', label: 'Risk Pre-Mortem' },
            { id: 'code', label: 'Code & Schema' },
            { id: 'simulator', label: 'Live Testbed' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`py-1 whitespace-nowrap shrink-0 border-b-2 ${
              activeView === item.id
                ? 'border-sky-400 text-white font-semibold'
                : 'border-transparent text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {exportNotice && (
        <div className="bg-emerald-950 border-b border-emerald-500/40 text-emerald-300 px-6 py-2 text-xs font-mono-tabular flex items-center justify-between">
          <span>✓ Full Architecture Specification copied to clipboard in Markdown format.</span>
          <span className="text-[10px] text-emerald-400">Ready for PRD / RFP attachments</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1340px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Project Header Banner */}
        <section className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 lg:p-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs font-mono-tabular text-sky-400">
                CLIENT / ORGANIZATION: {currentProject.clientOrganization.toUpperCase()} · CATEGORY: {currentProject.category.toUpperCase()}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-white">
                {currentProject.title}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {currentProject.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:items-end justify-center font-mono-tabular text-xs space-y-1">
              <span className="text-slate-400">STATUS: ARCHITECTURE APPROVED</span>
              <span className="text-emerald-400 font-semibold">● READY FOR IMPLEMENTATION</span>
              <span className="text-slate-400">P99 SLA: &lt; 50ms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-tabular text-slate-300 pt-2">
            <div>
              <span className="text-slate-500 block mb-1">ARCHITECTURAL CONSTRAINTS &amp; GUARDRAILS:</span>
              <ul className="space-y-1 list-disc pl-4 text-slate-300">
                {currentProject.keyConstraints.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">TARGET AUDIENCE &amp; HARDWARE ENVELOPE:</span>
              <p className="text-slate-300 leading-relaxed font-sans">{currentProject.targetAudience}</p>
            </div>
          </div>
        </section>

        {/* Dynamic Section Routing */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            <TopologyDiagram nodes={currentProject.nodes} />
            <StackEvaluator stack={currentProject.recommendedStack} />
            <LiveSolutionSimulator project={currentProject} />
            <CustomRequirementAnalyzer
              onSelectProject={(p) => setSelectedProjectId(p.id)}
              allProjects={ARCHITECTURE_PROJECTS}
            />
          </div>
        )}

        {activeView === 'topology' && (
          <div className="space-y-8">
            <TopologyDiagram nodes={currentProject.nodes} />
          </div>
        )}

        {activeView === 'stack' && (
          <div className="space-y-8">
            <StackEvaluator stack={currentProject.recommendedStack} />
          </div>
        )}

        {activeView === 'roadmap' && (
          <div className="space-y-8">
            <RoadmapViewer roadmap={currentProject.roadmap} />
          </div>
        )}

        {activeView === 'risks' && (
          <div className="space-y-8">
            <RiskMatrixViewer risks={currentProject.risks} />
          </div>
        )}

        {activeView === 'code' && (
          <div className="space-y-8">
            <CodeScaffoldViewer
              files={currentProject.codeScaffolds}
              databaseSchema={currentProject.databaseSchema}
            />
          </div>
        )}

        {activeView === 'simulator' && (
          <div className="space-y-8">
            <LiveSolutionSimulator project={currentProject} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#090D16] px-4 sm:px-8 py-6 mt-12 text-xs font-mono-tabular text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <strong className="text-slate-300 font-sans">Solution Architect</strong> · Transforming Complex Project Briefs into Production Code
        </div>
        <div>
          Compliance: ISO 27001 · India DPDP Act · W3C C4 Architecture Standards
        </div>
      </footer>
    </div>
  );
}
