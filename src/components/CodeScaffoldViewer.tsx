import React, { useState } from 'react';
import { GeneratedCodeFile } from '../data/architectureProjects';
import { Code, Copy, Check, Database, FileCode } from 'lucide-react';

interface CodeScaffoldViewerProps {
  files: GeneratedCodeFile[];
  databaseSchema: string;
}

export const CodeScaffoldViewer: React.FC<CodeScaffoldViewerProps> = ({
  files,
  databaseSchema,
}) => {
  const [activeTab, setActiveTab] = useState<string>('schema');
  const [copied, setCopied] = useState<boolean>(false);

  const activeContent = activeTab === 'schema'
    ? databaseSchema
    : files.find((f) => f.filename === activeTab)?.code || '';

  const activeTitle = activeTab === 'schema'
    ? 'Database Schema (Prisma / SQL DDL)'
    : files.find((f) => f.filename === activeTab)?.description || '';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeContent).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-sky-400">
            <Code className="w-4 h-4" />
            <span>PRODUCTION SCAFFOLDING &amp; DATABASE CONTRACTS</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Executable Architecture Code
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Turn architectural requirements into verified TypeScript contracts, API controllers, and database schemas.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tabular rounded-lg border border-slate-700 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" /> Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Snippet
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3.5 py-1.5 text-xs font-mono-tabular rounded transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'schema'
              ? 'bg-sky-500 text-slate-950 font-semibold'
              : 'bg-[#090D16] text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> schema.prisma / ddl.sql
        </button>

        {files.map((f) => (
          <button
            key={f.filename}
            onClick={() => setActiveTab(f.filename)}
            className={`px-3.5 py-1.5 text-xs font-mono-tabular rounded transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === f.filename
                ? 'bg-sky-500 text-slate-950 font-semibold'
                : 'bg-[#090D16] text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> {f.filename}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-mono-tabular">
          {activeTitle}
        </div>
        <div className="relative bg-[#090D16] border border-slate-800 rounded-lg p-5 overflow-x-auto max-h-[460px]">
          <pre className="text-xs font-mono-tabular text-slate-300 leading-relaxed">
            <code>{activeContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
