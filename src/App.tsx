import React, { useState } from 'react';
import {
  ArtifactCard,
  ARTIFACTS,
  ERAS,
  EraId,
  UI_STRINGS,
} from './data/kaalchakraData';
import { EraGames } from './components/EraGames';
import { VirtualMuseum } from './components/VirtualMuseum';
import { ArScannerLab } from './components/ArScannerLab';
import { KingdomGuilds } from './components/KingdomGuilds';
import { EducatorCmsView } from './components/EducatorCmsView';
import { sound } from './utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

type ActiveSection =
  | 'expeditions'
  | 'museum'
  | 'scanner'
  | 'kingdom'
  | 'educator';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('expeditions');
  const [selectedEraId, setSelectedEraId] = useState<EraId>('harappan');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [muted, setMuted] = useState<boolean>(false);

  // Initialize unlocked artifacts with the starter set (1 per era)
  const [unlockedArtifactIds, setUnlockedArtifactIds] = useState<string[]>(() =>
    ARTIFACTS.filter((a) => a.unlockedByDefault).map((a) => a.id)
  );
  const [inspectedArtifact, setInspectedArtifact] = useState<ArtifactCard | null>(
    null
  );
  const [recentUnlockNotice, setRecentUnlockNotice] = useState<string | null>(
    null
  );

  const activeEra = ERAS.find((e) => e.id === selectedEraId) || ERAS[0];
  const t = UI_STRINGS[lang];

  const handleUnlockArtifact = (artifactId: string) => {
    setUnlockedArtifactIds((prev) => {
      if (prev.includes(artifactId)) return prev;
      const found = ARTIFACTS.find((a) => a.id === artifactId);
      if (found) {
        setRecentUnlockNotice(
          `Unlocked in Virtual Museum: ${found.title} (${found.accessionNumber})`
        );
        setTimeout(() => setRecentUnlockNotice(null), 4500);
      }
      return [...prev, artifactId];
    });
  };

  const handleInspectArtifactFromEra = (artifact: ArtifactCard) => {
    setInspectedArtifact(artifact);
    setActiveSection('museum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAudio = () => {
    const nextMuted = !muted;
    sound.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      sound.playTap(480);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* =====================================================================
          STRICT 3-ZONE TOP BAR CONTRACT
          Zone 1: Single text element wordmark
          Zone 2: 5 single-line text navigation links
          Zone 3: 2 primary actions (Language toggle + Audio / Museum switch)
         ===================================================================== */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-300 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            sound.playTap();
            setActiveSection('expeditions');
          }}
          className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-stone-900 whitespace-nowrap"
        >
          Kaalchakra
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600"
        >
          {(
            [
              { id: 'expeditions', label: t.navExpeditions },
              { id: 'museum', label: `${t.navMuseum} (${unlockedArtifactIds.length}/${ARTIFACTS.length})` },
              { id: 'scanner', label: t.navScanner },
              { id: 'kingdom', label: t.navKingdom },
              { id: 'educator', label: t.navEducator },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playTap();
                setActiveSection(item.id);
              }}
              className={`py-1 transition-colors whitespace-nowrap border-b-2 ${
                activeSection === item.id
                  ? 'border-[#9A3412] text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 2 Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleAudio}
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
            className="p-2 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
            title={muted ? 'Sound Muted' : 'Web Audio Active'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setLang((l) => (l === 'en' ? 'hi' : 'en'));
            }}
            className="px-3.5 py-1.5 text-xs font-semibold border border-stone-900 bg-stone-900 text-[#FBF9F5] hover:bg-stone-800 transition-colors whitespace-nowrap"
          >
            {lang === 'en' ? 'हिन्दी / EN' : 'EN / हिन्दी'}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar (Visible only on small viewports) */}
      <div className="md:hidden flex overflow-x-auto border-b border-stone-300 bg-[#F5F1E8] px-4 py-2 gap-4 text-xs font-medium">
        {(
          [
            { id: 'expeditions', label: t.navExpeditions },
            { id: 'museum', label: `${t.navMuseum} (${unlockedArtifactIds.length})` },
            { id: 'scanner', label: t.navScanner },
            { id: 'kingdom', label: t.navKingdom },
            { id: 'educator', label: t.navEducator },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playTap();
              setActiveSection(item.id);
            }}
            className={`py-1 whitespace-nowrap shrink-0 border-b-2 ${
              activeSection === item.id
                ? 'border-[#9A3412] text-stone-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Toast Notification for Newly Unlocked Museum Artifacts */}
      {recentUnlockNotice && (
        <div className="bg-emerald-900 text-white px-6 py-2.5 text-xs font-mono-tabular flex items-center justify-between">
          <span>★ {recentUnlockNotice}</span>
          <button
            onClick={() => {
              setActiveSection('museum');
              setRecentUnlockNotice(null);
            }}
            className="underline font-sans font-semibold ml-4 whitespace-nowrap"
          >
            Open Virtual Museum →
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN VIEWPORT CONTAINER (1440px Desktop Presence)
         ===================================================================== */}
      <main className="flex-1 w-full max-w-[1320px] mx-auto px-4 sm:px-8 py-8 space-y-10">
        {activeSection === 'expeditions' && (
          <>
            {/* Editorial Marquee & Core Kaalchakra Loop Banner */}
            <section className="border-b border-stone-300 pb-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  {/* Unboxed quiet metadata */}
                  <div className="text-xs font-mono-tabular text-stone-500">
                    AICTE PROBLEM STATEMENT ID 26208 · MIC-STUDENT INNOVATION · TOYS &amp; GAMES · NCERT CLASSES 6–10
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-semibold text-stone-900 leading-[1.15]">
                    Six Eras of Indian Civilization. Six Distinct Ways to Play, Reason &amp; Discover.
                  </h1>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed pt-1">
                    Rather than repeating the same quiz across different historical backdrops, Kaalchakra maps each era to its core historical identity—from engineering baked-brick drainage in Mohenjo-daro to deliberating in a Vedic Sabha, governing Mauryan provinces by Ashokan Edicts, calculating eclipses with Aryabhata, trading across Medieval kingdoms, and routing underground bulletins in the Freedom Struggle.
                  </p>
                </div>

                {/* Quick Jump Actions */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                  <button
                    onClick={() => {
                      sound.playTap();
                      setActiveSection('scanner');
                    }}
                    className="px-4 py-2.5 text-xs font-semibold border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Launch AR Coin &amp; Textbook Scanner
                  </button>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setActiveSection('museum');
                    }}
                    className="px-4 py-2.5 text-xs font-semibold bg-[#9A3412] text-white hover:bg-[#7C2D12] transition-colors whitespace-nowrap"
                  >
                    Explore Virtual Museum ({unlockedArtifactIds.length}/{ARTIFACTS.length})
                  </button>
                </div>
              </div>

              {/* Kaalchakra Core Loop Strip (Page 4 of PDF 1) */}
              <div className="bg-[#F5F1E8] border border-stone-300 p-4">
                <div className="text-[11px] font-mono-tabular text-stone-500 uppercase tracking-wider mb-2">
                  {t.loopHeader} · HISTORICAL REALITY → EVIDENCE → GAMEPLAY → LEARNING → ARTIFACT COLLECTION
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                  {t.loopSteps.map((step, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#FBF9F5] border border-stone-200 font-medium text-stone-800"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6-Era Selector Matrix (Highlighting Distinct Gameplay Style per Era) */}
            <section aria-label="Select Historical Era" className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-mono-tabular uppercase tracking-wider text-stone-600">
                  Select Historical Era &amp; Gameplay Mode
                </h2>
                <span className="text-xs text-stone-500">
                  Every era features a distinct core mechanic
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                {ERAS.map((eraItem) => {
                  const isSelected = eraItem.id === selectedEraId;
                  const eraUnlockedCount = ARTIFACTS.filter(
                    (a) => a.eraId === eraItem.id && unlockedArtifactIds.includes(a.id)
                  ).length;

                  return (
                    <button
                      key={eraItem.id}
                      onClick={() => {
                        sound.playTap(440);
                        setSelectedEraId(eraItem.id);
                      }}
                      className={`p-4 text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-stone-900 text-[#FBF9F5] border-stone-900 shadow-sm'
                          : 'bg-white text-stone-900 border-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div>
                        <div
                          className={`text-[11px] font-mono-tabular ${
                            isSelected ? 'text-stone-300' : 'text-stone-500'
                          }`}
                        >
                          ERA {eraItem.index} · {eraItem.period.split(' ')[0]}
                        </div>
                        <div className="text-sm font-display font-semibold mt-1 leading-snug">
                          {lang === 'hi' ? eraItem.nameHi : eraItem.name}
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-stone-300/30 flex items-center justify-between text-[11px] font-mono-tabular">
                        <span
                          className={
                            isSelected ? 'text-amber-300 font-semibold' : 'text-[#9A3412] font-semibold'
                          }
                        >
                          → {eraItem.gameplayVerb}
                        </span>
                        <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                          {eraUnlockedCount}/3
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Active Era Interactive Gameplay Engine */}
            <section>
              <EraGames
                era={activeEra}
                lang={lang}
                unlockedArtifactIds={unlockedArtifactIds}
                onUnlockArtifact={handleUnlockArtifact}
                onInspectArtifact={handleInspectArtifactFromEra}
              />
            </section>
          </>
        )}

        {activeSection === 'museum' && (
          <VirtualMuseum
            lang={lang}
            unlockedArtifactIds={unlockedArtifactIds}
            selectedArtifact={inspectedArtifact}
            onSelectArtifact={setInspectedArtifact}
            onUnlockArtifact={handleUnlockArtifact}
          />
        )}

        {activeSection === 'scanner' && (
          <ArScannerLab
            onUnlockArtifact={handleUnlockArtifact}
            onInspectArtifact={handleInspectArtifactFromEra}
          />
        )}

        {activeSection === 'kingdom' && <KingdomGuilds />}

        {activeSection === 'educator' && <EducatorCmsView />}
      </main>

      {/* Quiet Curatorial Footer */}
      <footer className="border-t border-stone-300 bg-[#F5F1E8] px-4 sm:px-8 py-6 mt-12">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <strong className="font-display text-stone-900">Kaalchakra</strong> · AICTE Problem Statement ID 26208 (MIC-Student Innovation · Toys &amp; Games)
          </div>
          <div className="font-mono-tabular">
            Primary Sources: ASI · National Museum · NCERT (Classes 6–10) · RBI Monetary Museum
          </div>
        </div>
      </footer>
    </div>
  );
}
