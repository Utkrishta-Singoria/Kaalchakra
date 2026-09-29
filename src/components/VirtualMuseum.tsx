import React, { useState } from 'react';
import {
  ArtifactCard,
  ARTIFACTS,
  ERAS,
  EraId,
  SourceInstitution,
} from '../data/kaalchakraData';
import { ArtifactIllustration } from './ArtifactIllustration';
import { sound } from '../utils/sound';
import {
  Search,
  Share2,
  Check,
  BookOpen,
  Eye,
  X,
} from 'lucide-react';

interface VirtualMuseumProps {
  lang: 'en' | 'hi';
  unlockedArtifactIds: string[];
  selectedArtifact: ArtifactCard | null;
  onSelectArtifact: (art: ArtifactCard | null) => void;
  onUnlockArtifact: (id: string) => void;
}

export const VirtualMuseum: React.FC<VirtualMuseumProps> = ({
  lang,
  unlockedArtifactIds,
  selectedArtifact,
  onSelectArtifact,
  onUnlockArtifact,
}) => {
  const [eraFilter, setEraFilter] = useState<EraId | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceInstitution | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [curatedIds, setCuratedIds] = useState<string[]>([
    'art-ivc-seal',
    'art-mau-sarnath',
    'art-gup-dinara',
  ]);
  const [exhibitionTitle, setExhibitionTitle] = useState<string>(
    'Weights, Seals & Sovereign Coinage Across Early India'
  );
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const filteredArtifacts = ARTIFACTS.filter((art) => {
    const matchesEra = eraFilter === 'all' || art.eraId === eraFilter;
    const matchesSource = sourceFilter === 'all' || art.sourceInstitution === sourceFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.accessionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.siteOrOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesSource && matchesQuery;
  });

  const handleShareExhibition = () => {
    sound.playUnlock();
    const chosen = ARTIFACTS.filter((a) => curatedIds.includes(a.id));
    const shareText = `KAALCHAKRA VIRTUAL MUSEUM EXHIBITION: "${exhibitionTitle}"\nCurated Artifacts:\n${chosen
      .map((c, i) => `${i + 1}. ${c.title} (${c.accessionNumber} · ${c.sourceInstitution})`)
      .join('\n')}\nVerified via ASI · National Museum · NCERT · RBI Monetary Museum.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Institutional Marquee & Operational Utility Ribbon */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 lg:p-8">
        <div className="text-xs font-mono-tabular tracking-widest uppercase text-stone-500">
          KAALCHAKRA NATIONAL ARCHIVE · 2D CURATORIAL GALLERY · PHASE 3 DELIVERABLE
        </div>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900">
              Virtual Museum of Indian Civilization
            </h1>
            <p className="text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
              Every cataloged artifact is grounded in primary archaeological, epigraphic, or numismatic collections from the Archaeological Survey of India (ASI), National Museum, RBI Monetary Museum, and NCERT curriculum chapters.
            </p>
          </div>
          <div className="text-right font-mono-tabular">
            <div className="text-xs text-stone-500">COLLECTION COMPLETION</div>
            <div className="text-2xl font-semibold text-stone-900">
              {unlockedArtifactIds.length} / {ARTIFACTS.length} Artifacts Cataloged
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Era Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                sound.playTap();
                setEraFilter('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                eraFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              All 6 Eras ({ARTIFACTS.length})
            </button>
            {ERAS.map((e) => (
              <button
                key={e.id}
                onClick={() => {
                  sound.playTap();
                  setEraFilter(e.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  eraFilter === e.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {e.index}. {e.name.split('/')[0].trim()}
              </button>
            ))}
          </div>

          {/* Source Institution & Search */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              ['all', 'ASI', 'National Museum', 'RBI Monetary Museum', 'NCERT'] as const
            ).map((src) => (
              <button
                key={src}
                onClick={() => {
                  sound.playTap();
                  setSourceFilter(src);
                }}
                className={`px-2.5 py-1.5 text-xs font-mono-tabular transition-colors whitespace-nowrap ${
                  sourceFilter === src
                    ? 'bg-[#9A3412] text-white'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {src === 'all' ? 'All Sources' : src}
              </button>
            ))}

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accession, site, material..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900 w-56"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Artifact Accession Detail Drawer (If Open) */}
      {selectedArtifact && (
        <div className="bg-white border-2 border-stone-900 p-6 lg:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs font-mono-tabular text-stone-500">
                MUSEUM ACCESSION RECORD · {selectedArtifact.accessionNumber} · {selectedArtifact.sourceInstitution}
              </div>
              <h2 className="text-2xl font-display font-semibold text-stone-900 mt-1">
                {lang === 'hi' ? selectedArtifact.titleHi : selectedArtifact.title}
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">{selectedArtifact.subtitle}</p>
            </div>
            <button
              onClick={() => onSelectArtifact(null)}
              className="p-2 text-stone-500 hover:text-stone-900 border border-stone-300"
              aria-label="Close accession detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <ArtifactIllustration
                type={selectedArtifact.illustrationType}
                className="w-full h-64"
              />
              <p className="text-xs font-serif italic text-stone-500">
                Fig. {selectedArtifact.accessionNumber} — 2D vector conservation plate optimized for low-bandwidth devices ({selectedArtifact.bundleSizeKb} KB).
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {/* Structured dl Accession Grid per Museum Reference */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs border-b border-stone-200 pb-4">
                <div>
                  <dt className="text-stone-500 font-mono-tabular">PROVENANCE / SITE</dt>
                  <dd className="text-stone-900 font-medium mt-0.5">{selectedArtifact.siteOrOrigin}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-mono-tabular">CHRONOLOGY</dt>
                  <dd className="text-stone-900 font-medium mt-0.5">{selectedArtifact.period}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-mono-tabular">MATERIAL &amp; TECHNIQUE</dt>
                  <dd className="text-stone-900 font-medium mt-0.5">{selectedArtifact.material}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-mono-tabular">DIMENSIONS</dt>
                  <dd className="text-stone-900 font-mono-tabular mt-0.5">{selectedArtifact.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-mono-tabular">CURRICULUM MAPPING</dt>
                  <dd className="text-stone-900 font-medium mt-0.5">{selectedArtifact.ncertMapping}</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-mono-tabular">HISTORIAN SIGN-OFF</dt>
                  <dd className="text-emerald-900 font-medium mt-0.5">✓ {selectedArtifact.historianVerifiedBy}</dd>
                </div>
              </dl>

              {/* Mandatory 3-Tier Epistemological Breakdown */}
              <div className="space-y-3 text-xs">
                <h3 className="text-sm font-display font-semibold text-stone-900">
                  Epistemological Certainty Separation (Historical Reality → Evidence)
                </h3>
                <div className="p-3 bg-[#F5F1E8] border-l-2 border-emerald-800">
                  <div className="font-semibold text-emerald-950">1. Known from Direct Evidence</div>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">
                    {selectedArtifact.epistemology.knownFromEvidence}
                  </p>
                </div>
                <div className="p-3 bg-[#F5F1E8] border-l-2 border-stone-800">
                  <div className="font-semibold text-stone-900">2. Scholarly Interpretation</div>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">
                    {selectedArtifact.epistemology.scholarlyInterpretation}
                  </p>
                </div>
                <div className="p-3 bg-[#F5F1E8] border-l-2 border-amber-700">
                  <div className="font-semibold text-amber-950">3. Still Debated by Historians</div>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">
                    {selectedArtifact.epistemology.stillDebated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 18-Artifact Curatorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtifacts.map((art) => {
          const isUnlocked = unlockedArtifactIds.includes(art.id);
          const isCurated = curatedIds.includes(art.id);

          return (
            <article
              key={art.id}
              className="bg-white border border-stone-300 flex flex-col justify-between hover:border-stone-600 transition-colors"
            >
              <div>
                <ArtifactIllustration
                  type={art.illustrationType}
                  className="w-full h-48 border-b border-stone-200"
                />
                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] font-mono-tabular text-stone-500">
                    {art.accessionNumber} · {art.sourceInstitution} · {art.period}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-stone-900 leading-snug">
                    {lang === 'hi' ? art.titleHi : art.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{art.summary}</p>

                  <div className="pt-2 text-[11px] text-stone-500 font-mono-tabular">
                    Site: {art.siteOrOrigin} · {art.ncertMapping}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    sound.playTap();
                    onSelectArtifact(art);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#9A3412] whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Full Evidence Record
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playTap(500);
                      setCuratedIds((prev) =>
                        prev.includes(art.id)
                          ? prev.filter((i) => i !== art.id)
                          : [...prev.slice(-2), art.id]
                      );
                    }}
                    className={`px-2.5 py-1 text-xs border transition-colors whitespace-nowrap ${
                      isCurated
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-[#FBF9F5] text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {isCurated ? '★ In Exhibition' : '+ Pin to Showcase'}
                  </button>
                  {!isUnlocked && (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        onUnlockArtifact(art.id);
                      }}
                      className="px-2.5 py-1 text-xs bg-[#9A3412] text-white font-medium hover:bg-[#7C2D12] whitespace-nowrap"
                    >
                      Unlock
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Shareable Student Exhibition Feature (Phase 3 Item 15 requirement) */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono-tabular text-stone-500">
            STUDENT CURATORIAL SHOWCASE · SHARE FEATURE (PHASE 3 STEP 15)
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="exhibition-title-input" className="text-xs font-semibold text-stone-800 whitespace-nowrap">
              Exhibition Theme:
            </label>
            <input
              id="exhibition-title-input"
              type="text"
              value={exhibitionTitle}
              onChange={(e) => setExhibitionTitle(e.target.value)}
              className="px-3 py-1.5 text-sm font-display bg-white border border-stone-300 text-stone-900 w-full sm:w-96"
            />
          </div>
          <div className="text-xs text-stone-700">
            Pinned Artifacts ({curatedIds.length}/3):{' '}
            {ARTIFACTS.filter((a) => curatedIds.includes(a.id))
              .map((a) => a.title)
              .join(' · ')}
          </div>
        </div>

        <button
          onClick={handleShareExhibition}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
        >
          {copiedShare ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" /> Exhibition Citation Copied!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" /> Share Virtual Exhibition Card
            </>
          )}
        </button>
      </div>
    </div>
  );
};
