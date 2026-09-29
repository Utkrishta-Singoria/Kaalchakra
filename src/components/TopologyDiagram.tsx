import React, { useState } from 'react';
import { ArchitectureNode } from '../data/architectureProjects';
import { Network, Activity, Shield, Zap, ArrowRight, Info } from 'lucide-react';

interface TopologyDiagramProps {
  nodes: ArchitectureNode[];
}

export const TopologyDiagram: React.FC<TopologyDiagramProps> = ({ nodes }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const tierColors: Record<ArchitectureNode['tier'], { fill: string; stroke: string; text: string }> = {
    client: { fill: '#1E293B', stroke: '#38BDF8', text: '#38BDF8' },
    edge: { fill: '#1E293B', stroke: '#F59E0B', text: '#F59E0B' },
    backend: { fill: '#1E293B', stroke: '#10B981', text: '#10B981' },
    storage: { fill: '#1E293B', stroke: '#A855F7', text: '#A855F7' },
    external: { fill: '#1E293B', stroke: '#EF4444', text: '#EF4444' },
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-400">
            <Network className="w-4 h-4" />
            <span>INTERACTIVE C4 TOPOLOGY &amp; SYSTEM DATA FLOW</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            System Component &amp; Edge Integration Map
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on any architectural node to inspect latency envelopes, protocols, and failover pathways.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-tabular text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Client Tier</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Edge / ML</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Backend / CMS</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Storage / CDN</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative overflow-x-auto bg-[#090D16] border border-slate-800/80 rounded-lg p-4">
        <svg
          viewBox="0 0 1050 380"
          className="w-full min-w-[760px] h-72 select-none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#475569" />
            </marker>
            <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {nodes.map((source) =>
            source.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              const isSelected = selectedNodeId === source.id || selectedNodeId === target.id;

              return (
                <g key={`${source.id}->${target.id}`}>
                  <line
                    x1={source.x + 85}
                    y1={source.y + 35}
                    x2={target.x + 10}
                    y2={target.y + 35}
                    stroke={isSelected ? '#38BDF8' : '#334155'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray={isSelected ? 'none' : '4 3'}
                    markerEnd="url(#arrowhead)"
                  />
                  {isSelected && (
                    <circle r="3.5" fill="#38BDF8">
                      <animateMotion
                        path={`M ${source.x + 85} ${source.y + 35} L ${target.x + 10} ${target.y + 35}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })
          )}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const style = tierColors[node.tier];

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNodeId(node.id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <rect
                  width="180"
                  height="72"
                  rx="8"
                  fill={isSelected ? '#1E293B' : '#0F172A'}
                  stroke={isSelected ? style.stroke : '#334155'}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                />
                <circle cx="16" cy="22" r="5" fill={style.stroke} />
                <text
                  x="28"
                  y="26"
                  fill="#F8FAFC"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.label.length > 20 ? `${node.label.slice(0, 19)}...` : node.label}
                </text>
                <text
                  x="16"
                  y="46"
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  {node.sub}
                </text>
                <text
                  x="16"
                  y="62"
                  fill={style.stroke}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {node.latency}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono-tabular">
          <div>
            <span className="text-slate-500 block">SELECTED SUBSYSTEM:</span>
            <strong className="text-white font-sans text-sm mt-0.5 block">{selectedNode.label}</strong>
            <span className="text-slate-400">{selectedNode.sub}</span>
          </div>
          <div>
            <span className="text-slate-500 block">LATENCY BUDGET:</span>
            <strong className="text-emerald-400 text-sm mt-0.5 block">{selectedNode.latency}</strong>
            <span className="text-slate-400">P99 Target SLA</span>
          </div>
          <div>
            <span className="text-slate-500 block">THROUGHPUT CAPACITY:</span>
            <strong className="text-sky-400 text-sm mt-0.5 block">{selectedNode.throughput}</strong>
            <span className="text-slate-400">Offline Buffer Supported</span>
          </div>
          <div>
            <span className="text-slate-500 block">COMMUNICATION PROTOCOL:</span>
            <strong className="text-amber-400 text-sm mt-0.5 block">{selectedNode.protocols}</strong>
            <span className="text-slate-400">Zero-Trust Encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
};
