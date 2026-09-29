import React, { useState } from 'react';
import { ProjectArchitecture } from '../data/architectureProjects';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Shield,
  Layers,
  Send,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface LiveSolutionSimulatorProps {
  project: ProjectArchitecture;
}

export const LiveSolutionSimulator: React.FC<LiveSolutionSimulatorProps> = ({ project }) => {
  // Simulator sub-mode for AICTE 26208
  const [activeSimTab, setActiveSimTab] = useState<'eras' | 'ar_tflite' | 'async_guilds' | 'cms_audit'>('eras');

  // --- 1. Era Engine Simulator State ---
  const [activeEraIndex, setActiveEraIndex] = useState<number>(0);
  const [harappanGrid, setHarappanGrid] = useState<string[]>([
    'citadel', 'drain', 'drain', 'house', 'soak_pit',
    'house', 'empty', 'drain', 'workshop', 'empty',
    'workshop', 'drain', 'drain', 'empty', 'house',
    'empty', 'house', 'drain', 'house', 'empty',
    'empty', 'empty', 'soak_pit', 'empty', 'empty',
  ]);
  const [vedicConsensus, setVedicConsensus] = useState<number>(75);
  const [mauryanTax, setMauryanTax] = useState<number>(16); // 1/6th
  const [guptaPiSides, setGuptaPiSides] = useState<number>(96);
  const [stepwellStoreys, setStepwellStoreys] = useState<number>(5);
  const [stepwellButtresses, setStepwellButtresses] = useState<number>(3);
  const [freedomRelays, setFreedomRelays] = useState<string[]>(['Sabarmati', 'Nadiad']);

  // --- 2. TFLite Coin AR Simulator State ---
  const [coinWear, setCoinWear] = useState<number>(25);
  const [coinGlare, setCoinGlare] = useState<number>(20);
  const [qrFallbackActivated, setQrFallbackActivated] = useState<boolean>(false);

  const tfliteConfidence = qrFallbackActivated
    ? 100
    : Math.max(30, Math.round(98 - coinWear * 0.45 - coinGlare * 0.5));
  const fallbackNeeded = tfliteConfidence < 70;

  // --- 3. Async Guild State ---
  const [caravanOffers, setCaravanOffers] = useState([
    { id: 'c1', from: 'Kaveripattinam Port', goods: 'Malabar Black Pepper (40 Bales)', status: 'Pending Charter' },
    { id: 'c2', from: 'Bharukachchha Estuary', goods: 'Etched Carnelian Agates (25 Bales)', status: 'Pending Charter' },
  ]);
  const [presetEnvoyLog, setPresetEnvoyLog] = useState<string[]>([
    'Envoy dispatched to Kaveripattinam: "May our guild caravan pass safely under your Shulka customs seal!"',
  ]);

  // --- 4. CMS Audit State ---
  const [cmsReviewStatus, setCmsReviewStatus] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true,
    'check-3': false,
  });

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-400">
            <Play className="w-4 h-4" />
            <span>INTERACTIVE ARCHITECTURE SANDBOX &amp; VERIFICATION SUITE</span>
          </div>
          <h3 className="text-xl font-display font-semibold text-white mt-1">
            Live Functional Solution Testbed
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Execute and stress-test the engineered architecture: 6 era game mechanics, on-device TFLite edge model with fallbacks, and child-safe async trade.
          </p>
        </div>

        {/* Sim Tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono-tabular text-xs">
          <button
            onClick={() => setActiveSimTab('eras')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSimTab === 'eras' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            01. 6-Era Game Mechanics
          </button>
          <button
            onClick={() => setActiveSimTab('ar_tflite')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSimTab === 'ar_tflite' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            02. TFLite Edge AR &amp; Fallbacks
          </button>
          <button
            onClick={() => setActiveSimTab('async_guilds')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSimTab === 'async_guilds' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            03. Async Guild Economy
          </button>
          <button
            onClick={() => setActiveSimTab('cms_audit')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeSimTab === 'cms_audit' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            04. Historian CMS Gate
          </button>
        </div>
      </div>

      {/* --- TAB 1: 6-ERA GAME ENGINES --- */}
      {activeSimTab === 'eras' && (
        <div className="space-y-6 bg-[#090D16] border border-slate-800 rounded-lg p-6">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 0, name: '1. Harappan (BUILD)', desc: 'Baked-Brick Drainage Grid' },
              { id: 1, name: '2. Vedic (DECIDE)', desc: 'Sabha & Shruti Memory' },
              { id: 2, name: '3. Mauryan (GOVERN)', desc: 'Ashokan Rock Edicts' },
              { id: 3, name: '4. Gupta (DISCOVER)', desc: 'Aryabhata Pi & Eclipse' },
              { id: 4, name: '5. Medieval (TRADE+BUILD)', desc: 'Stepwell Hydraulics' },
              { id: 5, name: '6. Freedom (PARTICIPATE)', desc: 'Underground Relays' },
            ].map((era) => (
              <button
                key={era.id}
                onClick={() => setActiveEraIndex(era.id)}
                className={`px-3 py-2 rounded text-left text-xs font-mono-tabular transition-colors ${
                  activeEraIndex === era.id
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>{era.name}</div>
                <div className="text-[10px] opacity-80">{era.desc}</div>
              </button>
            ))}
          </div>

          {/* Era 0: Harappan */}
          {activeEraIndex === 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-semibold text-white">Mohenjo-daro 5x5 Urban Drainage Grid Builder</h4>
                  <p className="text-slate-400">Click tiles to toggle covered brick drains connecting houses to the soak pit.</p>
                </div>
                <button
                  onClick={() => setHarappanGrid(new Array(25).fill('empty'))}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded text-xs"
                >
                  Clear Grid
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto p-4 bg-slate-900 border border-slate-800 rounded-lg">
                {harappanGrid.map((tile, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const next = [...harappanGrid];
                      const types = ['empty', 'house', 'drain', 'workshop', 'soak_pit'];
                      const currentIdx = types.indexOf(tile);
                      next[i] = types[(currentIdx + 1) % types.length];
                      setHarappanGrid(next);
                    }}
                    className={`h-14 rounded p-1 text-[11px] font-mono-tabular font-medium flex flex-col justify-center items-center text-center transition-all ${
                      tile === 'drain'
                        ? 'bg-sky-950/80 border border-sky-500 text-sky-300'
                        : tile === 'house'
                        ? 'bg-amber-950/80 border border-amber-500 text-amber-300'
                        : tile === 'workshop'
                        ? 'bg-orange-950/80 border border-orange-500 text-orange-300'
                        : tile === 'soak_pit'
                        ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                        : tile === 'citadel'
                        ? 'bg-red-950/80 border border-red-500 text-red-300'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-500 hover:border-slate-600'
                    }`}
                  >
                    <span>{tile.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-center text-slate-400 font-mono-tabular">
                Epistemological Guardrail: Indus script remains undeciphered—seals function as mercantile security tags, not decoded glyphs.
              </div>
            </div>
          )}

          {/* Era 1: Vedic */}
          {activeEraIndex === 1 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <h4 className="font-semibold text-white text-sm">Sabha &amp; Samiti Assembly Consensus Decision</h4>
              <p className="text-xs text-slate-400">
                Deliberate on the adoption of the Atranjikhera wrought-iron ploughshare (Shyama Ayas) vs pastoral cattle grazing.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono-tabular text-xs">
                <div className="flex justify-between">
                  <span>SABHA DELIBERATION CONSENSUS:</span>
                  <span className="text-emerald-400 font-semibold">{vedicConsensus}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${vedicConsensus}%` }} />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setVedicConsensus((v) => Math.min(100, v + 10))}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded"
                  >
                    Adopt Iron Ploughshare for Alluvial Doab (+Grain)
                  </button>
                  <button
                    onClick={() => setVedicConsensus((v) => Math.max(20, v - 10))}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded"
                  >
                    Retain Pure Pastoral Grazing (+Cattle)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Era 2: Mauryan */}
          {activeEraIndex === 2 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <h4 className="font-semibold text-white text-sm">Provincial Administration &amp; Ashokan Edict Proclamation</h4>
              <p className="text-xs text-slate-400">
                Govern Tosali and Ujjayini provinces by balancing Bhaga agricultural tax share with Major Rock Edicts.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono-tabular text-xs">
                <div className="flex justify-between">
                  <label htmlFor="sim-bhaga-rate">Bhaga Land Revenue Assessment:</label>
                  <span className="text-sky-400 font-semibold">{mauryanTax}% of Harvest (~1/6th)</span>
                </div>
                <input
                  id="sim-bhaga-rate"
                  type="range"
                  min={10}
                  max={25}
                  value={mauryanTax}
                  onChange={(e) => setMauryanTax(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <div className="p-3 bg-slate-800/80 rounded border border-slate-700 text-slate-300">
                  📜 <strong>Major Rock Edict II Proclaimed:</strong> Free medical dispensaries for humans and animals established across Uttarapatha highway stops.
                </div>
              </div>
            </div>
          )}

          {/* Era 3: Gupta */}
          {activeEraIndex === 3 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <h4 className="font-semibold text-white text-sm">Aryabhata’s Kusumapura Observatory (499 CE)</h4>
              <p className="text-xs text-slate-400">
                Calculate π = 62,832 / 20,000 using polygon circumference approximations.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono-tabular text-xs">
                <div className="flex justify-between">
                  <label htmlFor="sim-polygon-sides">Inscribed Polygon Sides (n):</label>
                  <span className="text-amber-400 font-semibold">{guptaPiSides} sides</span>
                </div>
                <input
                  id="sim-polygon-sides"
                  type="range"
                  min={12}
                  max={384}
                  step={12}
                  value={guptaPiSides}
                  onChange={(e) => setGuptaPiSides(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="text-emerald-400 text-sm font-semibold">
                  Computed π ≈ {(guptaPiSides * Math.sin(Math.PI / guptaPiSides)).toFixed(5)} (Aryabhata Asanna = 3.1416)
                </div>
              </div>
            </div>
          )}

          {/* Era 4: Medieval */}
          {activeEraIndex === 4 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <h4 className="font-semibold text-white text-sm">Subterranean Stepwell (Rani-ki-Vav) Lateral Pressure Balance</h4>
              <p className="text-xs text-slate-400">
                Balance subterranean depth tiers with horizontal cross-bracing pavilions (Kutas).
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono-tabular text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sim-depth-tiers" className="block text-slate-400 mb-1">Depth Storeys: {stepwellStoreys} ({(stepwellStoreys * 3.8).toFixed(1)}m)</label>
                    <input
                      id="sim-depth-tiers"
                      type="range"
                      min={3}
                      max={7}
                      value={stepwellStoreys}
                      onChange={(e) => setStepwellStoreys(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="sim-kuta-pavilions" className="block text-slate-400 mb-1">Kuta Pavilions: {stepwellButtresses}</label>
                    <input
                      id="sim-kuta-pavilions"
                      type="range"
                      min={1}
                      max={4}
                      value={stepwellButtresses}
                      onChange={(e) => setStepwellButtresses(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
                <div className="text-xs text-emerald-400 font-semibold">
                  Status: {stepwellButtresses * 2 >= stepwellStoreys ? '● Hydrostatic Equilibrium' : '▲ Wall Soil Pressure Alert'}
                </div>
              </div>
            </div>
          )}

          {/* Era 5: Freedom */}
          {activeEraIndex === 5 && (
            <div className="space-y-4 max-w-xl mx-auto">
              <h4 className="font-semibold text-white text-sm">Clandestine Underground Bulletin &amp; 42.34m Radio Relays</h4>
              <p className="text-xs text-slate-400">
                Route cyclostyled satyagraha bulletins past colonial telegraph censorship across grassroots nodes.
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 font-mono-tabular text-xs">
                <div className="grid grid-cols-3 gap-2">
                  {['Sabarmati', 'Nadiad', 'Bharuch', 'Surat', 'Dandi', 'Bombay 42.34m'].map((node) => {
                    const active = freedomRelays.includes(node);
                    return (
                      <button
                        key={node}
                        onClick={() => {
                          setFreedomRelays((prev) =>
                            prev.includes(node) ? prev.filter((n) => n !== node) : [...prev, node]
                          );
                        }}
                        className={`p-2.5 rounded text-center border transition-colors ${
                          active
                            ? 'bg-red-950/80 border-red-500 text-red-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400'
                        }`}
                      >
                        {node}
                        <div className="text-[10px] mt-0.5">{active ? '● RELAY ON' : '○ DISCONNECTED'}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: TFLITE COIN CLASSIFIER SIMULATOR --- */}
      {activeSimTab === 'ar_tflite' && (
        <div className="space-y-6 bg-[#090D16] border border-slate-800 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base font-semibold text-white">
                On-Device TFLite Coin Classifier (INT8 Quantized Model)
              </h4>
              <p className="text-xs text-slate-400">
                Test how coin surface wear and specular glare impact optical confidence and trigger the 3-tier fallback engine.
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-amber-400">
              FALLBACK THRESHOLD: &lt; 70% CONFIDENCE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3 p-4 bg-slate-900 border border-slate-800 rounded-lg font-mono-tabular text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="sim-coin-wear">Surface Wear / Erosion Patina:</label>
                    <span className="text-amber-400">{coinWear}% Worn</span>
                  </div>
                  <input
                    id="sim-coin-wear"
                    type="range"
                    min={0}
                    max={85}
                    value={coinWear}
                    onChange={(e) => {
                      setCoinWear(Number(e.target.value));
                      setQrFallbackActivated(false);
                    }}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="sim-specular-glare">Metallic Specular Glare / Angle:</label>
                    <span className="text-amber-400">{coinGlare}% Glare</span>
                  </div>
                  <input
                    id="sim-specular-glare"
                    type="range"
                    min={0}
                    max={80}
                    value={coinGlare}
                    onChange={(e) => {
                      setCoinGlare(Number(e.target.value));
                      setQrFallbackActivated(false);
                    }}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2 font-mono-tabular text-xs">
                <div className="flex justify-between">
                  <span>MODEL INFERENCE CONFIDENCE:</span>
                  <span
                    className={
                      tfliteConfidence >= 70 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'
                    }
                  >
                    {tfliteConfidence}% ({tfliteConfidence >= 70 ? 'PASS' : 'TRIGGER FALLBACK'})
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tfliteConfidence >= 70 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    style={{ width: `${tfliteConfidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Fallback Display */}
            <div className="space-y-4">
              {fallbackNeeded ? (
                <div className="p-5 bg-amber-950/20 border border-amber-500/40 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Optical Confidence Low (&lt;70%): Automated Fallback Engine Engaged</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Under poor classroom lighting or severe ancient coin wear, Kaalchakra avoids user frustration by presenting three non-optical options:
                  </p>
                  <div className="flex flex-col gap-2 pt-1 font-mono-tabular text-xs">
                    <button
                      onClick={() => setQrFallbackActivated(true)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700 flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Scan Museum Pedestal QR Code (QR-RBI-MAU-218)
                    </button>
                    <button
                      onClick={() => {
                        setCoinGlare(10);
                        setCoinWear(20);
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700"
                    >
                      Apply Lighting Angle Correction Guide
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-emerald-950/20 border border-emerald-500/40 rounded-lg space-y-2 font-mono-tabular text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Coin Positively Identified: Silver Karshapana (32 Rattis)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    5 punch-mark features detected in 52ms inference cycle on budget device.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: ASYNC GUILDS --- */}
      {activeSimTab === 'async_guilds' && (
        <div className="space-y-6 bg-[#090D16] border border-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-base font-semibold text-white">
                Asynchronous Inter-School Guild Trade &amp; Child-Safe Envoy Chat
              </h4>
              <p className="text-xs text-slate-400">
                Complies with India DPDP Act: Zero open chat for minors; strictly verified historical envoy phrases.
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> CHILD-SAFE BASELINE VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 font-mono-tabular text-xs">
              <span className="text-slate-400 block">INCOMING ASYNC CARAVAN OFFERS:</span>
              {caravanOffers.map((c) => (
                <div key={c.id} className="p-3 bg-slate-900 border border-slate-800 rounded flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">{c.from}</div>
                    <div className="text-slate-400 text-[11px]">{c.goods}</div>
                  </div>
                  <button
                    onClick={() => {
                      setCaravanOffers((prev) =>
                        prev.map((item) => (item.id === c.id ? { ...item, status: 'Charter Sealed ✓' } : item))
                      );
                    }}
                    className={`px-3 py-1.5 rounded text-xs transition-colors ${
                      c.status === 'Charter Sealed ✓'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-sky-500 text-slate-950 font-semibold'
                    }`}
                  >
                    {c.status}
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-mono-tabular text-xs">
              <span className="text-slate-400 block">DISPATCH PRESET DIPLOMATIC SCROLL:</span>
              <div className="flex gap-2">
                <select
                  aria-label="Preset Envoy Message"
                  className="flex-1 bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200"
                >
                  <option>May our guild caravan pass safely under your Shulka customs seal!</option>
                  <option>Proposing mutual rest-house alliance along Uttarapatha (Rock Edict II).</option>
                  <option>Our granaries replenish after monsoon harvest—let us trade next season.</option>
                </select>
                <button
                  onClick={() => {
                    setPresetEnvoyLog((prev) => [
                      'Envoy dispatched: "Charter agreement reaffirmed with standardized weights."',
                      ...prev,
                    ]);
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400"
                >
                  Send
                </button>
              </div>
              <div className="space-y-1.5 pt-2">
                {presetEnvoyLog.map((log, i) => (
                  <div key={i} className="text-[11px] text-slate-400">
                    ✓ {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: CMS AUDIT --- */}
      {activeSimTab === 'cms_audit' && (
        <div className="space-y-4 bg-[#090D16] border border-slate-800 rounded-lg p-6 font-mono-tabular text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-base font-semibold text-white font-sans">
              Historian &amp; Teacher Review Pipeline (Accuracy vs. Fun Defense)
            </h4>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Before any game puzzle or fact deploys via Addressables CDN, academic reviewers must sign off on primary sources.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { id: 'check-1', title: 'ASI Lothal Excavation Report (S.R. Rao) citation verified for binary weights' },
              { id: 'check-2', title: 'Undeciphered Indus Script guardrail enforced (zero fake translation games)' },
              { id: 'check-3', title: 'NCERT Class 6 Chapter 7 Ashokan Rock Edict text matched with Girnar epigraphy' },
            ].map((chk) => (
              <div
                key={chk.id}
                className="p-3 bg-slate-900 border border-slate-800 rounded flex items-center justify-between"
              >
                <span className="text-slate-300">{chk.title}</span>
                <button
                  onClick={() =>
                    setCmsReviewStatus((prev) => ({ ...prev, [chk.id]: !prev[chk.id] }))
                  }
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    cmsReviewStatus[chk.id]
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {cmsReviewStatus[chk.id] ? '✓ Signed Off' : 'Pending Audit'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
