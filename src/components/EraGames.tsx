import React, { useState } from 'react';
import {
  ArtifactCard,
  ARTIFACTS,
  EraDefinition,
  EraId,
} from '../data/kaalchakraData';
import { ArtifactIllustration } from './ArtifactIllustration';
import { sound } from '../utils/sound';
import {
  CheckCircle2,
  Compass,
  RotateCcw,
  Volume2,
  Scale,
  Landmark,
  Radio,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface EraGamesProps {
  era: EraDefinition;
  lang: 'en' | 'hi';
  unlockedArtifactIds: string[];
  onUnlockArtifact: (artifactId: string) => void;
  onInspectArtifact: (artifact: ArtifactCard) => void;
}

// ============================================================================
// 1. HARAPPAN ENGINE — BUILD (Urban Drainage Grid + Binary Chert Scale + Stratigraphy)
// ============================================================================
type HarappanTileType =
  | 'empty'
  | 'citadel_bath'
  | 'house'
  | 'workshop'
  | 'drain_h'
  | 'drain_v'
  | 'drain_corner'
  | 'soak_pit';

const HARAPPAN_PALETTE: {
  type: HarappanTileType;
  label: string;
  desc: string;
}[] = [
  { type: 'house', label: 'Courtyard House', desc: 'Brick home with private bathing platform (needs adjacent covered drain)' },
  { type: 'workshop', label: 'Carnelian Bead Workshop', desc: 'Craft kiln producing etched beads for Lothal export' },
  { type: 'drain_h', label: 'Covered Brick Drain (E–W)', desc: 'Baked brick channel with removable corbelled stone inspection lid' },
  { type: 'drain_v', label: 'Covered Brick Drain (N–S)', desc: 'North-South street conduit with 2 cm/m gravity gradient' },
  { type: 'soak_pit', label: 'Terracotta Sump / Soak Pit', desc: 'Filters solid silt before wastewater exits city wall' },
];

const INITIAL_HARAPPAN_GRID: HarappanTileType[][] = [
  ['citadel_bath', 'drain_h', 'drain_h', 'empty', 'empty'],
  ['house', 'empty', 'drain_v', 'house', 'empty'],
  ['workshop', 'drain_h', 'drain_v', 'empty', 'house'],
  ['empty', 'house', 'drain_v', 'workshop', 'empty'],
  ['empty', 'empty', 'soak_pit', 'empty', 'empty'],
];

// ============================================================================
// 2. VEDIC ENGINE — UNDERSTAND / DECIDE (Sabha Decisions + Shruti Oral Memory)
// ============================================================================
interface VedicScenario {
  id: string;
  title: string;
  speaker: string;
  dilemma: string;
  options: {
    label: string;
    impact: { cattle: number; grain: number; harmony: number; oralMemory: number };
    historicalNote: string;
  }[];
}

const VEDIC_SCENARIOS: VedicScenario[] = [
  {
    id: 'ved-1',
    title: 'Sabha Deliberation I: Adoption of the Shyama Ayas (Iron) Ploughshare',
    speaker: 'Gramani (Village Head) & Karmara (Smith)',
    dilemma:
      'Our community is expanding eastward into the heavy alluvial clay of the Ganga-Yamuna Doab. Wooden Udumbala ploughshares snap in the dense soil, but smelting iron (Shyama Ayas) requires charcoal and skilled smiths.',
    options: [
      {
        label: 'Commission Atranjikhera-style wrought iron ploughshares & share them across clans',
        impact: { cattle: +5, grain: +25, harmony: +10, oralMemory: +5 },
        historicalNote:
          'Archaeology at Atranjikhera and Jakhera confirms wrought-iron agricultural tools enabled deep cultivation of barley (Yava) and wet rice (Vrihi).',
      },
      {
        label: 'Keep iron exclusively for weapons and rely only on pastoral grazing',
        impact: { cattle: +10, grain: -15, harmony: -10, oralMemory: 0 },
        historicalNote:
          'Without iron ploughshares, clearing dense Doab forests and turning heavy clay limited grain surplus.',
      },
    ],
  },
  {
    id: 'ved-2',
    title: 'Samiti Assembly II: Preserving the Oral Shruti Recitation',
    speaker: 'Purohita & Young Brahmacharin Scholars',
    dilemma:
      'Without a script, elders worry that pronunciation and pitch accents (Udātta, Anudātta, Svarita) of our hymns may drift over generations as clans migrate.',
    options: [
      {
        label: 'Institute Padapatha (word-by-word) and Kramapatha (step-pair) acoustic checksum training',
        impact: { cattle: 0, grain: -5, harmony: +15, oralMemory: +30 },
        historicalNote:
          'Combinatorial recitation (AB, BC, CD) acted as an error-correcting code, preserving Vedic phonetic accuracy across 3,000 years.',
      },
      {
        label: 'Allow each settlement to improvise wording freely without metrical discipline',
        impact: { cattle: +5, grain: +5, harmony: -5, oralMemory: -20 },
        historicalNote:
          'Strict Chandas (meter) and Svara (pitch accent) rules were essential to oral preservation prior to manuscripts.',
      },
    ],
  },
  {
    id: 'ved-3',
    title: 'Sabha Deliberation III: Bali Voluntary Tribute vs Pasture Commons',
    speaker: 'Vis (Commoners Assembly) & Rajan',
    dilemma:
      'Neighboring Janas dispute summer grazing lands along the Sarasvati-Yamuna watershed. How should the Rajan and Sabha mobilize resources?',
    options: [
      {
        label: 'Negotiate shared riverside grazing compacts and collect proportionate Bali offerings for the communal granary',
        impact: { cattle: +15, grain: +15, harmony: +20, oralMemory: +10 },
        historicalNote:
          'In the Early Vedic period, the Rajan was checked by both the Sabha (council of elders/women included in early phase) and Samiti (general tribal assembly).',
      },
      {
        label: 'Seize cattle herds unilaterally without consulting the Samiti assembly',
        impact: { cattle: +20, grain: -10, harmony: -25, oralMemory: -5 },
        historicalNote:
          'Rigvedic hymns emphasize that a Rajan’s legitimacy depended on the consent of the Samiti and protection of the Jana.',
      },
    ],
  },
];

// ============================================================================
// 3. MAURYAN ENGINE — GOVERN (Provincial Administration + Ashoka Rock Edict Matcher)
// ============================================================================
interface MauryanCrisis {
  id: string;
  province: string;
  yearBce: string;
  reportFromMahamatta: string;
  correctEdictId: string;
  edicts: {
    id: string;
    title: string;
    prakritExcerpt: string;
    outcome: string;
  }[];
}

const MAURYAN_CRISES: MauryanCrisis[] = [
  {
    id: 'mau-1',
    province: 'Tosali (Kalinga Province)',
    yearBce: '261–257 BCE',
    reportFromMahamatta:
      'Eight years after the coronation, the annexation of Kalinga has caused 100,000 slain and 150,000 displaced. Citizens and forest tribes (Atavikas) fear harsh imperial reprisals.',
    correctEdictId: 're-13',
    edicts: [
      {
        id: 're-13',
        title: 'Major Rock Edict XIII & Separate Kalinga Edict ("All men are my children")',
        prakritExcerpt: 'Sabe munisse paja mama — Conquest by Dhamma (Dhammavijaya) replaces conquest by arms.',
        outcome: 'Public remorse proclaimed across the empire; judicial Mahamattas instructed to ensure impartial, non-coercive administration in Tosali and Samapa.',
      },
      {
        id: 're-1',
        title: 'Major Rock Edict I (Royal Kitchen Regulation)',
        prakritExcerpt: 'Idha na kanchi jivam arabhitu pajuhitavyam — Prohibition of festival animal sacrifices.',
        outcome: 'Addresses royal dietary ethics, but does not directly resolve post-war judicial reconciliation in Kalinga.',
      },
    ],
  },
  {
    id: 'mau-2',
    province: 'Ujjayini & Dakshinapatha Crossroads',
    yearBce: '256 BCE',
    reportFromMahamatta:
      'Merchant caravans traveling from Pataliputra to Bharukachchha suffer heat exhaustion, and draft bullocks lack veterinary medicinal herbs along arid highway stretches.',
    correctEdictId: 're-2',
    edicts: [
      {
        id: 're-2',
        title: 'Major Rock Edict II (Chikitsa — Medical Care & Roadside Amenities)',
        prakritExcerpt: 'Dve chikichha kata — Manusa-chikichha cha pasu-chikichha cha (Medical care for humans and animals).',
        outcome: 'Medicinal herbs, roots, and fruit trees imported and planted; wells dug and banyan rest-groves established every 8 Krosa along highways.',
      },
      {
        id: 're-12',
        title: 'Major Rock Edict XII (Samavaya — Inter-Sectarian Harmony)',
        prakritExcerpt: 'Vaciguti — Restraint of speech and honoring all sects (Brahmanas, Sramanas, Ajivikas, Jains).',
        outcome: 'Promotes philosophical dialogue, but highway travellers specifically require Rock Edict II infrastructure.',
      },
    ],
  },
  {
    id: 'mau-3',
    province: 'Pataliputra & Magadha Core',
    yearBce: '255 BCE',
    reportFromMahamatta:
      'Rival philosophical orders (Brahmanas, Buddhist Bhikkhus, Ajivikas, and Nirgranthas/Jains) are disparaging one another’s doctrines in public debates to win royal patronage.',
    correctEdictId: 're-12',
    edicts: [
      {
        id: 're-12',
        title: 'Major Rock Edict XII (Vaciguti & Bahusruta — Mutual Listening Across Sects)',
        prakritExcerpt: 'Yo hi koci atmapasandam pujayati... — Whoever praises his own sect and blames others out of excessive devotion actually injures his own sect.',
        outcome: 'Dhamma Mahamattas convene inter-sectarian assemblies where followers study each other’s texts in mutual respect (Samavaya).',
      },
      {
        id: 're-1',
        title: 'Major Rock Edict I (Ban on Samaja Banquets)',
        prakritExcerpt: 'Reduction of royal kitchen peacocks and deer to zero.',
        outcome: 'Important ethical policy, yet Rock Edict XII specifically addresses inter-religious harmony.',
      },
    ],
  },
];

export const EraGames: React.FC<EraGamesProps> = ({
  era,
  lang,
  unlockedArtifactIds,
  onUnlockArtifact,
  onInspectArtifact,
}) => {
  // Common Kaalchakra Loop progress tracker
  const eraArtifacts = ARTIFACTS.filter((a) => a.eraId === era.id);

  // --- 1. HARAPPAN STATE ---
  const [harappanSubMode, setHarappanSubMode] = useState<'drainage' | 'weights' | 'archaeology'>('drainage');
  const [grid, setGrid] = useState<HarappanTileType[][]>(INITIAL_HARAPPAN_GRID);
  const [selectedBrush, setSelectedBrush] = useState<HarappanTileType>('drain_h');
  const [targetCargoWeight, setTargetCargoWeight] = useState<number>(22); // e.g., 16 + 4 + 2 = 22 units
  const [panWeights, setPanWeights] = useState<number[]>([16, 2]);
  const [sealStamped, setSealStamped] = useState<boolean>(false);
  const [excavatedLayers, setExcavatedLayers] = useState<number[]>([0]);

  // --- 2. VEDIC STATE ---
  const [vedicSubMode, setVedicSubMode] = useState<'sabha' | 'shruti'>('sabha');
  const [vedicStep, setVedicStep] = useState<number>(0);
  const [vedicStats, setVedicStats] = useState({ cattle: 60, grain: 55, harmony: 70, oralMemory: 65 });
  const [vedicLog, setVedicLog] = useState<string[]>([]);
  const targetShrutiSequence: ('udatta' | 'anudatta' | 'svarita')[] = ['udatta', 'anudatta', 'svarita', 'udatta'];
  const [playerShruti, setPlayerShruti] = useState<('udatta' | 'anudatta' | 'svarita')[]>([]);

  // --- 3. MAURYAN STATE ---
  const [mauryanCrisisIdx, setMauryanCrisisIdx] = useState<number>(0);
  const [mauryanResolved, setMauryanResolved] = useState<Record<string, string>>({});
  const [bhagaTaxRate, setBhagaTaxRate] = useState<number>(16); // ~1/6th = 16.6%
  const [granaryReserve, setGranaryReserve] = useState<number>(40);

  // --- 4. GUPTA STATE ---
  const [guptaSubMode, setGuptaSubMode] = useState<'observatory' | 'mint'>('observatory');
  const [moonAngle, setMoonAngle] = useState<number>(155); // 180 = full lunar eclipse in Earth's umbra
  const [polygonSides, setPolygonSides] = useState<number>(96); // 384 sides gives 3.1416
  const [mintObverse, setMintObverse] = useState<'lyrist' | 'archer'>('lyrist');
  const [mintStandard, setMintStandard] = useState<'garuda' | 'makara'>('garuda');
  const [mintWeightGrains, setMintWeightGrains] = useState<number>(144);
  const [coinStruck, setCoinStruck] = useState<boolean>(false);

  // --- 5. MEDIEVAL STATE ---
  const [medievalSubMode, setMedievalSubMode] = useState<'stepwell' | 'numismatics'>('stepwell');
  const [stepwellDepthTiers, setStepwellDepthTiers] = useState<number>(5);
  const [kutaButtresses, setKutaButtresses] = useState<number>(3);
  const [archType, setArchType] = useState<'corbel' | 'voussoir'>('corbel');
  const [selectedCoinId, setSelectedCoinId] = useState<'varaha' | 'tanka' | 'rupiya'>('varaha');
  const [coinAttributions, setCoinAttributions] = useState<Record<string, boolean>>({ varaha: true });

  // --- 6. FREEDOM STRUGGLE STATE ---
  const [freedomSubMode, setFreedomSubMode] = useState<'network' | 'dandi'>('network');
  const [connectedNodes, setConnectedNodes] = useState<string[]>(['Sabarmati', 'Nadiad']);
  const [saltPansPrepared, setSaltPansPrepared] = useState<number>(2);
  const [khadiYardsSpun, setKhadiYardsSpun] = useState<number>(120);

  // Helper: compute Harappan city hygiene & drainage score
  const evaluateHarappanCity = () => {
    let houses = 0;
    let connectedHouses = 0;
    let drains = 0;
    let hasSoakPit = false;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const cell = grid[r][c];
        if (cell === 'soak_pit') hasSoakPit = true;
        if (cell === 'drain_h' || cell === 'drain_v' || cell === 'drain_corner') drains++;
        if (cell === 'house' || cell === 'workshop') {
          houses++;
          const neighbors = [
            grid[r - 1]?.[c],
            grid[r + 1]?.[c],
            grid[r]?.[c - 1],
            grid[r]?.[c + 1],
          ];
          if (neighbors.some((n) => n === 'drain_h' || n === 'drain_v' || n === 'soak_pit')) {
            connectedHouses++;
          }
        }
      }
    }
    const drainageEfficiency = houses > 0 ? Math.round((connectedHouses / houses) * 100) : 0;
    return { houses, connectedHouses, drains, hasSoakPit, drainageEfficiency };
  };

  const harappanMetrics = evaluateHarappanCity();
  const currentPanSum = panWeights.reduce((acc, w) => acc + w, 0);

  return (
    <div className="space-y-8">
      {/* ERA HEADER & DISTINCT GAMEPLAY IDENTITY BANNER */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-stone-300/80">
          <div>
            <div className="text-xs font-mono-tabular text-stone-600 tracking-wider">
              ERA {era.index} · {era.period} · {era.ncertAlignment}
            </div>
            <h2 className="text-2xl lg:text-3xl font-display font-semibold text-stone-900 mt-1">
              {lang === 'hi' ? era.nameHi : era.name}
            </h2>
            <p className="text-sm text-stone-700 mt-1 max-w-2xl">
              {era.mainIdentity}
            </p>
          </div>

          <div className="flex flex-col sm:items-end justify-center shrink-0">
            <span className="text-xs text-stone-500">Distinct Era Gameplay Mechanic</span>
            <div
              className="mt-1 px-4 py-2 text-sm font-mono-tabular font-semibold text-white tracking-wide"
              style={{ backgroundColor: era.accentColor }}
            >
              {lang === 'hi' ? era.gameplayVerbHi : `MODE: ${era.gameplayVerb}`}
            </div>
          </div>
        </div>

        {/* Epistemological / Design Caution Note from PDF */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-700 bg-[#FBF9F5] p-3.5 border border-stone-200">
          <p className="leading-relaxed">
            <strong className="font-semibold text-stone-900">Historical Integrity Guardrail: </strong>
            {era.cautionNote}
          </p>
          <span className="font-mono-tabular text-stone-500 whitespace-nowrap shrink-0">
            Pack Size: {era.bundleSizeMb} (Offline Ready)
          </span>
        </div>
      </div>

      {/* =====================================================================
          ERA 1: HARAPPAN / INDUS VALLEY (BUILD)
         ===================================================================== */}
      {era.id === 'harappan' && (
        <div className="space-y-6">
          {/* Interactive Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-3">
            <button
              onClick={() => {
                sound.playTap();
                setHarappanSubMode('drainage');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                harappanSubMode === 'drainage'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              01. Build Covered Drainage &amp; Urban Grid
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setHarappanSubMode('weights');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                harappanSubMode === 'weights'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              02. Trade with Binary Chert Weights &amp; Seals
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setHarappanSubMode('archaeology');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                harappanSubMode === 'archaeology'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              03. Archaeologist Trench Investigation
            </button>
          </div>

          {harappanSubMode === 'drainage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              {/* Left 7 Cols: Interactive 5x5 Baked-Brick City Grid */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-stone-900">
                      Mohenjo-daro Lower Town &amp; Drainage Planner
                    </h3>
                    <p className="text-xs text-stone-600">
                      Connect every Courtyard House and Bead Workshop to a Covered Baked-Brick Drain leading to the Southern Soak Pit.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playTap(300);
                      setGrid(INITIAL_HARAPPAN_GRID);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 border border-stone-300 hover:bg-stone-100 whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Grid
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 p-4 bg-[#EFECE4] border border-stone-300">
                  {grid.map((row, rIdx) =>
                    row.map((cell, cIdx) => {
                      const isFixedCitadel = rIdx === 0 && cIdx === 0;
                      const isConnected =
                        (cell === 'house' || cell === 'workshop') &&
                        [
                          grid[rIdx - 1]?.[cIdx],
                          grid[rIdx + 1]?.[cIdx],
                          grid[rIdx]?.[cIdx - 1],
                          grid[rIdx]?.[cIdx + 1],
                        ].some((n) => n === 'drain_h' || n === 'drain_v' || n === 'soak_pit');

                      return (
                        <button
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => {
                            if (isFixedCitadel) return;
                            sound.playTap(480);
                            const next = grid.map((r) => [...r]);
                            next[rIdx][cIdx] = next[rIdx][cIdx] === selectedBrush ? 'empty' : selectedBrush;
                            setGrid(next);
                            const updatedMetrics = evaluateHarappanCity();
                            if (updatedMetrics.drainageEfficiency === 100) {
                              onUnlockArtifact('art-ivc-dholavira');
                            }
                          }}
                          className={`min-h-[76px] p-2 border text-left flex flex-col justify-between transition-transform active:scale-95 ${
                            cell === 'citadel_bath'
                              ? 'bg-[#9A3412] text-white border-[#7C2D12]'
                              : cell === 'house'
                              ? isConnected
                                ? 'bg-[#FDE68A]/70 border-amber-700 text-stone-900'
                                : 'bg-red-50 border-red-400 text-red-900'
                              : cell === 'workshop'
                              ? isConnected
                                ? 'bg-orange-100 border-orange-700 text-stone-900'
                                : 'bg-red-50 border-red-400 text-red-900'
                              : cell === 'drain_h' || cell === 'drain_v'
                              ? 'bg-sky-100 border-sky-700 text-sky-950'
                              : cell === 'soak_pit'
                              ? 'bg-emerald-100 border-emerald-800 text-emerald-950'
                              : 'bg-[#FAF8F3] border-stone-300 text-stone-400 hover:border-stone-500'
                          }`}
                        >
                          <span className="text-[10px] font-mono-tabular opacity-75">
                            R{rIdx + 1}·C{cIdx + 1}
                          </span>
                          <span className="text-xs font-semibold leading-tight">
                            {cell === 'citadel_bath' && 'Great Bath (Citadel)'}
                            {cell === 'house' && (isConnected ? 'House · Drained' : 'House · Unlinked!')}
                            {cell === 'workshop' && (isConnected ? 'Bead Kiln · OK' : 'Kiln · Unlinked!')}
                            {cell === 'drain_h' && '══ Brick Drain E-W'}
                            {cell === 'drain_v' && '║║ Brick Drain N-S'}
                            {cell === 'soak_pit' && '◎ Terracotta Sump'}
                            {cell === 'empty' && '+ Empty Plot'}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right 5 Cols: Palette & Civic Telemetry */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-stone-900">
                    Select Standard Baked-Brick Module (Ratio 4 : 2 : 1)
                  </h4>
                  <div className="space-y-2">
                    {HARAPPAN_PALETTE.map((item) => (
                      <button
                        key={item.type}
                        onClick={() => {
                          sound.playTap(520);
                          setSelectedBrush(item.type);
                        }}
                        className={`w-full p-3 text-left border transition-colors ${
                          selectedBrush === item.type
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-300 bg-[#FBF9F5] text-stone-900 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            selectedBrush === item.type ? 'text-stone-300' : 'text-stone-600'
                          }`}
                        >
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Engineering Verification */}
                <div className="p-4 bg-[#F5F1E8] border border-stone-300 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span>DRAINAGE HYGIENE COVERAGE:</span>
                    <span className="font-semibold text-stone-900">
                      {harappanMetrics.connectedHouses}/{harappanMetrics.houses} Buildings ({harappanMetrics.drainageEfficiency}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-300 overflow-hidden">
                    <div
                      className="h-full bg-[#15803D] transition-all duration-200"
                      style={{ width: `${harappanMetrics.drainageEfficiency}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-700 pt-1">
                    {harappanMetrics.drainageEfficiency === 100 && harappanMetrics.hasSoakPit
                      ? 'All houses and craft kilns connect to covered gypsum-mortared brick drains with a terracotta soak pit! Artifact unlocked in Museum.'
                      : 'Tip: Select "Covered Brick Drain" and click adjacent to any red Unlinked House or Kiln so all domestic greywater flows cleanly.'}
                  </p>
                  {harappanMetrics.drainageEfficiency === 100 && (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        onUnlockArtifact('art-ivc-dholavira');
                      }}
                      className="w-full mt-2 py-2 px-3 bg-[#9A3412] text-white text-xs font-medium hover:bg-[#7C2D12] transition-colors"
                    >
                      Claim Dholavira Signboard &amp; Reservoir Blueprint →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {harappanSubMode === 'weights' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-lg font-display font-semibold text-stone-900">
                    Lothal Dockyard Binary Chert Weight Scale &amp; Steatite Seal Press
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Harappan merchants used polished cubical chert weights in a binary sequence (1, 2, 4, 8, 16, 32 units; 1 unit = 13.63g). Balance the pan to match the Carnelian &amp; Lapis shipment!
                  </p>
                </div>

                {/* Cargo Selector */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: 'Etched Carnelian Parcel (14 Units)', units: 14 },
                    { label: 'Shortughai Lapis Lazuli (22 Units)', units: 22 },
                    { label: 'Oman (Magan) Copper Ingot (29 Units)', units: 29 },
                  ].map((cargo) => (
                    <button
                      key={cargo.units}
                      onClick={() => {
                        sound.playTap();
                        setTargetCargoWeight(cargo.units);
                        setPanWeights([]);
                        setSealStamped(false);
                      }}
                      className={`px-3 py-1.5 text-xs font-mono-tabular border transition-colors ${
                        targetCargoWeight === cargo.units
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-[#FBF9F5] text-stone-800 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {cargo.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Balance Display */}
                <div className="p-6 bg-[#F5F1E8] border border-stone-300 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-xs font-mono-tabular text-stone-700 mb-4">
                    <div>
                      LEFT PAN (CHERT WEIGHTS):{' '}
                      <strong className="text-stone-900">
                        {currentPanSum} Units ({(currentPanSum * 13.63).toFixed(1)}g)
                      </strong>
                    </div>
                    <div>
                      RIGHT PAN (CARGO):{' '}
                      <strong className="text-stone-900">
                        {targetCargoWeight} Units ({(targetCargoWeight * 13.63).toFixed(1)}g)
                      </strong>
                    </div>
                  </div>

                  {/* Beam visualization */}
                  <div className="w-full max-w-md py-6 flex flex-col items-center">
                    <div
                      className="w-full h-2 bg-stone-800 transition-transform duration-200 flex items-center justify-between px-4"
                      style={{
                        transform: `rotate(${Math.max(
                          -12,
                          Math.min(12, (targetCargoWeight - currentPanSum) * 0.8)
                        )}deg)`,
                      }}
                    >
                      <div className="w-3 h-3 bg-amber-600 rounded-full -mt-1" />
                      <div className="w-3 h-3 bg-amber-600 rounded-full -mt-1" />
                    </div>
                    <div className="w-3 h-12 bg-stone-700" />
                    <div className="w-24 h-2 bg-stone-900" />
                  </div>

                  {/* Binary Chert Weights Buttons */}
                  <div className="w-full pt-2">
                    <div className="text-xs font-medium text-stone-700 mb-2">
                      Click Cubical Chert Weights to Toggle on Scale:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 4, 8, 16].map((w) => {
                        const active = panWeights.includes(w);
                        return (
                          <button
                            key={w}
                            onClick={() => {
                              sound.playTap(350 + w * 15);
                              setPanWeights((prev) =>
                                prev.includes(w) ? prev.filter((item) => item !== w) : [...prev, w]
                              );
                            }}
                            className={`px-4 py-2.5 font-mono-tabular text-xs border transition-colors ${
                              active
                                ? 'bg-[#9A3412] text-white border-[#7C2D12] font-semibold'
                                : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            [{w} Unit{w > 1 ? 's' : ''}] · {(w * 13.63).toFixed(1)}g
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Steatite Seal Bulla Impression & Script Guardrail */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-stone-900">
                    Step 2: Seal the Clay Bulla Tag
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Once the binary chert weights match the cargo ({targetCargoWeight} units), press your carved Steatite Unicorn Seal into the wet clay knot sealing the rope bale.
                  </p>
                  <button
                    disabled={currentPanSum !== targetCargoWeight}
                    onClick={() => {
                      sound.playUnlock();
                      setSealStamped(true);
                      onUnlockArtifact('art-ivc-seal');
                      onUnlockArtifact('art-ivc-weights');
                    }}
                    className={`w-full py-3 px-4 text-xs font-semibold tracking-wide transition-colors ${
                      currentPanSum === targetCargoWeight
                        ? 'bg-stone-900 text-white hover:bg-stone-800'
                        : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    {currentPanSum === targetCargoWeight
                      ? 'Scale Balanced! Press Steatite Seal into Wet Clay Bulla'
                      : `Adjust Weights (Difference: ${Math.abs(targetCargoWeight - currentPanSum)} Units)`}
                  </button>

                  {sealStamped && (
                    <div className="p-4 bg-emerald-50/80 border border-emerald-700/40 space-y-2">
                      <div className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Clay Bulla Impressed &amp; Shipment Certified for Dilmun/Mesopotamia!
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        <strong>Why isn’t there a "Decode the Script" puzzle here?</strong> Over 4,000 Indus objects bear script symbols (averaging 5 signs per seal), but no bilingual Rosetta-style inscription has ever been unearthed. Scholars know from clay impressions at Lothal that seals certified ownership and package security—even while the language itself remains an active scientific mystery!
                      </p>
                    </div>
                  )}
                </div>

                <ArtifactIllustration type="unicorn_seal" className="w-full h-44" />
              </div>
            </div>
          )}

          {harappanSubMode === 'archaeology' && (
            <div className="bg-white border border-stone-300 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Archaeologist Mode: Stratigraphic Clues &amp; Late Harappan Transition (c. 1900 BCE)
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Excavate the three archaeological trenches below and compare what is proven by physical evidence versus scholarly interpretation and ongoing debate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    idx: 0,
                    site: 'Trench A · Lothal Warehouse',
                    clue: '65 burnt clay sealings (bullae) found together in a brick-lined structure beside a 214m × 36m tidal basin.',
                    evidence: 'Known from Evidence: Back of clay tags preserve twisted cord and woven cotton/reed mat impressions.',
                    interpretation: 'Scholarly Interpretation: The brick basin functioned as a tidal dockyard handling maritime trade with the Persian Gulf.',
                    debate: 'Still Debated: A few scholars once argued the basin was an irrigation tank, though marine micro-fossils (foraminifera) strongly support tidal estuary docking.',
                  },
                  {
                    idx: 1,
                    site: 'Trench B · Kalibangan Ploughed Field',
                    clue: 'Furrow marks crisscrossing at right angles in Early Harappan strata (c. 2800 BCE).',
                    evidence: 'Known from Evidence: Short-spaced east-west furrows and wide-spaced north-south furrows preserved in soil.',
                    interpretation: 'Scholarly Interpretation: Demonstrates intercropping of two crops simultaneously (such as mustard and horsegram/chickpea), a practice still used in Rajasthan today.',
                    debate: 'Still Debated: Whether wooden ploughs were drawn by oxen or human teams in the earliest pre-urban phase.',
                  },
                  {
                    idx: 2,
                    site: 'Trench C · Late Harappan Levels (1900–1700 BCE)',
                    clue: 'Cubical chert weights and steatite seals disappear; large public drains at Mohenjo-daro are subdivided by smaller brick kilns.',
                    evidence: 'Known from Evidence: Gradual de-urbanization and eastward shift of smaller rural settlements toward Gujarat and the Upper Ganga-Yamuna Doab.',
                    interpretation: 'Scholarly Interpretation: Multi-decade monsoon weakening, shifting river courses (Ghaggar-Hakra / Indus floods), and loss of long-distance Mesopotamian trade disrupted civic administration.',
                    debate: 'Still Debated: The precise weighting of tectonic shifts vs hydro-climatic aridification across different regional cities (the old "invasion" theory was disproven by skeletal forensics).',
                  },
                ].map((trench) => {
                  const isExcavated = excavatedLayers.includes(trench.idx);
                  return (
                    <div key={trench.idx} className="border border-stone-300 bg-[#FBF9F5] p-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-xs font-mono-tabular text-stone-500">{trench.site}</div>
                        <h4 className="text-sm font-semibold text-stone-900">{trench.clue}</h4>
                        {isExcavated ? (
                          <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                            <p className="text-emerald-900"><strong>● {trench.evidence}</strong></p>
                            <p className="text-stone-700"><strong>◆ {trench.interpretation}</strong></p>
                            <p className="text-amber-900"><strong>▲ {trench.debate}</strong></p>
                          </div>
                        ) : (
                          <p className="text-xs text-stone-500 italic py-4">
                            Stratum unexcavated. Click below to brush away alluvial silt and analyze findings.
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          sound.playTap(460);
                          if (!excavatedLayers.includes(trench.idx)) {
                            const next = [...excavatedLayers, trench.idx];
                            setExcavatedLayers(next);
                            if (next.length >= 3) {
                              sound.playUnlock();
                              onUnlockArtifact('art-ivc-dholavira');
                            }
                          }
                        }}
                        className="mt-4 w-full py-2 px-3 text-xs font-medium border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                      >
                        {isExcavated ? 'Stratum Logged in Field Journal' : 'Excavate & Analyze Stratum'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ERA 2: VEDIC AGE (UNDERSTAND / DECIDE)
         ===================================================================== */}
      {era.id === 'vedic' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-3">
            <button
              onClick={() => {
                sound.playTap();
                setVedicSubMode('sabha');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                vedicSubMode === 'sabha'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              01. Sabha &amp; Samiti Community Decisions
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setVedicSubMode('shruti');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                vedicSubMode === 'shruti'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              02. Shruti Oral Pitch-Accent Memory Challenge
            </button>
          </div>

          {vedicSubMode === 'sabha' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-tabular text-stone-500">
                    COUNCIL SESSION {Math.min(vedicStep + 1, VEDIC_SCENARIOS.length)} OF {VEDIC_SCENARIOS.length}
                  </span>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setVedicStep(0);
                      setVedicStats({ cattle: 60, grain: 55, harmony: 70, oralMemory: 65 });
                      setVedicLog([]);
                    }}
                    className="text-xs text-stone-600 hover:text-stone-900 underline"
                  >
                    Reconvene Sabha
                  </button>
                </div>

                {vedicStep < VEDIC_SCENARIOS.length ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-semibold text-stone-900">
                      {VEDIC_SCENARIOS[vedicStep].title}
                    </h3>
                    <div className="text-xs font-mono-tabular text-[#78350F]">
                      Speaker before the Assembly: {VEDIC_SCENARIOS[vedicStep].speaker}
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed bg-[#F5F1E8] p-4 border border-stone-300">
                      {VEDIC_SCENARIOS[vedicStep].dilemma}
                    </p>
                    <div className="space-y-3 pt-2">
                      {VEDIC_SCENARIOS[vedicStep].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            sound.playTap(440 + idx * 80);
                            setVedicStats((prev) => ({
                              cattle: Math.max(0, Math.min(100, prev.cattle + opt.impact.cattle)),
                              grain: Math.max(0, Math.min(100, prev.grain + opt.impact.grain)),
                              harmony: Math.max(0, Math.min(100, prev.harmony + opt.impact.harmony)),
                              oralMemory: Math.max(0, Math.min(100, prev.oralMemory + opt.impact.oralMemory)),
                            }));
                            setVedicLog((prev) => [...prev, opt.historicalNote]);
                            if (vedicStep + 1 >= VEDIC_SCENARIOS.length) {
                              sound.playUnlock();
                              onUnlockArtifact('art-ved-iron');
                            }
                            setVedicStep((s) => s + 1);
                          }}
                          className="w-full p-4 text-left border border-stone-300 bg-[#FBF9F5] hover:bg-stone-900 hover:text-white transition-colors group"
                        >
                          <div className="text-sm font-semibold">{opt.label}</div>
                          <div className="text-xs text-stone-500 group-hover:text-stone-300 mt-1 font-mono-tabular">
                            Cattle: {opt.impact.cattle >= 0 ? `+${opt.impact.cattle}` : opt.impact.cattle} · Barley/Rice:{' '}
                            {opt.impact.grain >= 0 ? `+${opt.impact.grain}` : opt.impact.grain} · Sabha Consensus:{' '}
                            {opt.impact.harmony >= 0 ? `+${opt.impact.harmony}` : opt.impact.harmony}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-emerald-50/70 border border-emerald-800/30 space-y-3">
                    <h3 className="text-lg font-display font-semibold text-stone-900">
                      Sabha &amp; Samiti Deliberations Complete!
                    </h3>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      Your Jana balanced pastoral wealth (Gavishti) with iron-plough agriculture (Krishi) and preserved oral Shruti canons. The Atranjikhera Iron Ploughshare artifact is now unlocked in the Virtual Museum!
                    </p>
                  </div>
                )}
              </div>

              {/* Right 5 Cols: Community Meters & Historical Logs */}
              <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <h4 className="text-sm font-semibold text-stone-900">
                  Jana &amp; Grama Community Equilibrium
                </h4>
                <div className="grid grid-cols-2 gap-3 font-mono-tabular">
                  {[
                    { label: 'Cattle Wealth (Go)', val: vedicStats.cattle },
                    { label: 'Barley & Rice (Yava/Vrihi)', val: vedicStats.grain },
                    { label: 'Sabha Consensus (Samjnana)', val: vedicStats.harmony },
                    { label: 'Shruti Continuity', val: vedicStats.oralMemory },
                  ].map((m) => (
                    <div key={m.label} className="p-3 bg-[#F5F1E8] border border-stone-300">
                      <div className="text-[11px] text-stone-600">{m.label}</div>
                      <div className="text-lg font-semibold text-stone-900 mt-0.5">{m.val}/100</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-stone-800">Historical Context Notes:</div>
                  {vedicLog.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">
                      Make a decision in the Sabha assembly to see archaeological and textual evidence notes.
                    </p>
                  ) : (
                    vedicLog.map((note, i) => (
                      <div key={i} className="p-2.5 bg-[#FBF9F5] border border-stone-200 text-xs text-stone-700">
                        {note}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {vedicSubMode === 'shruti' && (
            <div className="bg-white border border-stone-300 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Shruti Acoustic Memory Challenge (Udātta · Anudātta · Svarita)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Vedic knowledge was transmitted orally through strict pitch accents: <strong>Udātta</strong> (raised pitch), <strong>Anudātta</strong> (low unmarked pitch, underlined in manuscripts), and <strong>Svarita</strong> (falling circumflex pitch, marked with a vertical stroke). Listen to the 4-syllable cadence and repeat it accurately!
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      targetShrutiSequence.forEach((tone, idx) => {
                        setTimeout(() => sound.playVedicTone(tone, idx), idx * 400);
                      });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to Teacher’s Recitation (4 Accents)
                  </button>
                  <button
                    onClick={() => setPlayerShruti([])}
                    className="px-3 py-2.5 border border-stone-300 text-xs text-stone-700 hover:bg-stone-100"
                  >
                    Clear Attempt
                  </button>
                </div>

                {/* Target Cadence Guide */}
                <div className="p-4 bg-[#F5F1E8] border border-stone-300">
                  <div className="text-xs font-mono-tabular text-stone-600 mb-2">
                    TARGET METRICAL PATTERN: [1. UDĀTTA (High)] → [2. ANUDĀTTA (Low)] → [3. SVARITA (Falling)] → [4. UDĀTTA (High)]
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {(
                      [
                        { id: 'udatta', label: 'उदात्त · Udātta', sub: 'Raised Pitch Accent' },
                        { id: 'anudatta', label: 'अनुदात्त · Anudātta', sub: 'Low Pitch (Horizontal Under-bar)' },
                        { id: 'svarita', label: 'स्वरित · Svarita', sub: 'Falling Pitch (Vertical Stroke)' },
                      ] as const
                    ).map((btn, i) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          sound.playVedicTone(btn.id, playerShruti.length);
                          const next = [...playerShruti, btn.id].slice(0, 4);
                          setPlayerShruti(next);
                          if (
                            next.length === 4 &&
                            next.every((val, index) => val === targetShrutiSequence[index])
                          ) {
                            setTimeout(() => sound.playUnlock(), 350);
                            onUnlockArtifact('art-ved-shruti');
                          }
                        }}
                        className="p-3.5 bg-white border border-stone-300 hover:border-stone-900 text-left transition-colors"
                      >
                        <div className="text-sm font-semibold text-stone-900">{btn.label}</div>
                        <div className="text-[11px] text-stone-600 mt-0.5">{btn.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Player Sequence Progress */}
                <div className="flex items-center gap-2 text-xs font-mono-tabular">
                  <span>YOUR RECITATION:</span>
                  {[0, 1, 2, 3].map((slot) => {
                    const entered = playerShruti[slot];
                    const matches = entered === targetShrutiSequence[slot];
                    return (
                      <span
                        key={slot}
                        className={`px-3 py-1 border ${
                          !entered
                            ? 'border-stone-300 text-stone-400'
                            : matches
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                            : 'border-red-600 bg-red-50 text-red-900'
                        }`}
                      >
                        {entered ? entered.toUpperCase() : `Syllable ${slot + 1}`}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <ArtifactIllustration type="rigveda_manuscript" className="w-full h-48" />
                <p className="text-xs text-stone-600 leading-relaxed mt-3">
                  <strong>Artifact Caution from Problem Statement:</strong> Because early Vedic pastoralists built with timber, bamboo, and thatch rather than baked brick, we never fabricate fictional statues—instead we study verified Painted Grey Ware (PGW), Atranjikhera iron tools, and the UNESCO-recognized oral transmission tradition.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ERA 3: MAURYAN EMPIRE (GOVERN)
         ===================================================================== */}
      {era.id === 'mauryan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
          {/* Left 7 Cols: Ashokan Edict Crisis Resolution */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Imperial Secretariat at Pataliputra &amp; Provincial Edict Dispatch
                </h3>
                <p className="text-xs text-stone-600">
                  Match each provincial report from your Amatyas and Dhamma Mahamattas to the historically documented Ashokan Rock Edict.
                </p>
              </div>
              <div className="flex gap-1">
                {MAURYAN_CRISES.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playTap();
                      setMauryanCrisisIdx(idx);
                    }}
                    className={`px-3 py-1 text-xs font-mono-tabular border ${
                      mauryanCrisisIdx === idx
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-[#FBF9F5] text-stone-700 border-stone-300'
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const crisis = MAURYAN_CRISES[mauryanCrisisIdx];
              const chosenId = mauryanResolved[crisis.id];
              return (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F5F1E8] border border-stone-300">
                    <div className="text-xs font-mono-tabular text-[#1E3A8A] font-semibold">
                      PROVINCE: {crisis.province} · {crisis.yearBce}
                    </div>
                    <p className="text-sm text-stone-800 mt-1.5 leading-relaxed">
                      "{crisis.reportFromMahamatta}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-stone-700">
                      Select the Ashokan Rock Edict to Inscribe &amp; Proclaim:
                    </div>
                    {crisis.edicts.map((ed) => {
                      const isSelected = chosenId === ed.id;
                      const isCorrect = ed.id === crisis.correctEdictId;
                      return (
                        <button
                          key={ed.id}
                          onClick={() => {
                            sound.playMintStrike();
                            const next = { ...mauryanResolved, [crisis.id]: ed.id };
                            setMauryanResolved(next);
                            if (ed.id === crisis.correctEdictId) {
                              onUnlockArtifact('art-mau-girnar');
                              onUnlockArtifact('art-mau-karshapana');
                            }
                          }}
                          className={`w-full p-4 text-left border transition-colors ${
                            isSelected
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-700 text-stone-900'
                                : 'bg-amber-50 border-amber-700 text-stone-900'
                              : 'bg-[#FBF9F5] border-stone-300 hover:border-stone-800'
                          }`}
                        >
                          <div className="text-sm font-semibold text-stone-900">{ed.title}</div>
                          <div className="text-xs font-mono-tabular text-stone-600 mt-1 italic">
                            Prakrit Inscription: "{ed.prakritExcerpt}"
                          </div>
                          {isSelected && (
                            <div className="text-xs text-stone-800 mt-2 pt-2 border-t border-stone-300">
                              <strong>Historical Outcome:</strong> {ed.outcome}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right 5 Cols: Provincial Revenue (Bhaga) & Sohgaura Famine Granary Simulator */}
          <div className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
            <div>
              <h4 className="text-sm font-semibold text-stone-900">
                Provincial Treasury (Sannidhata) &amp; Sohgaura Granary Balance
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Set the land revenue share (Bhaga, traditionally 1/6th or ~16.6% of produce; reduced to 1/8th at Lumbini in the Rummindei Pillar Inscription) and emergency grain buffer.
              </p>
            </div>

            <div className="space-y-4 p-4 bg-[#F5F1E8] border border-stone-300">
              <div>
                <div className="flex justify-between text-xs font-mono-tabular mb-1">
                  <label htmlFor="bhaga-slider" className="font-medium text-stone-800">
                    Land Revenue (Bhaga Tax Rate):
                  </label>
                  <span className="font-semibold text-stone-900">{bhagaTaxRate}% of Harvest</span>
                </div>
                <input
                  id="bhaga-slider"
                  type="range"
                  min={10}
                  max={30}
                  value={bhagaTaxRate}
                  onChange={(e) => setBhagaTaxRate(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
                <div className="text-[11px] text-stone-600 mt-1">
                  {bhagaTaxRate <= 18
                    ? '● Fair Canonical Rate (1/8th to 1/6th): Cultivator contentment high.'
                    : '▲ Heavy Assessment (>20%): Risk of rural flight from Janapada lands.'}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono-tabular mb-1">
                  <label htmlFor="granary-slider" className="font-medium text-stone-800">
                    Sohgaura &amp; Mahasthan Granary Reserve:
                  </label>
                  <span className="font-semibold text-stone-900">{granaryReserve}% Stored</span>
                </div>
                <input
                  id="granary-slider"
                  type="range"
                  min={10}
                  max={60}
                  value={granaryReserve}
                  onChange={(e) => setGranaryReserve(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
                <div className="text-[11px] text-stone-600 mt-1">
                  Based on the Sohgaura Copper Plate &amp; Mahasthan Brahmi inscription mandating state storehouses for drought relief.
                </div>
              </div>
            </div>

            <ArtifactIllustration type="girnar_rock_edict" className="w-full h-40" />
          </div>
        </div>
      )}

      {/* =====================================================================
          ERA 4: GUPTA PERIOD (DISCOVER)
         ===================================================================== */}
      {era.id === 'gupta' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-3">
            <button
              onClick={() => {
                sound.playTap();
                setGuptaSubMode('observatory');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                guptaSubMode === 'observatory'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              01. Aryabhata’s Kusumapura Astronomy &amp; Pi Lab (499 CE)
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setGuptaSubMode('mint');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                guptaSubMode === 'mint'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              02. Run Royal Gold Dinara Mint &amp; Sculpture Studio
            </button>
          </div>

          {guptaSubMode === 'observatory' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-lg font-display font-semibold text-stone-900">
                    Golapada Eclipse Shadow Simulator &amp; Ganitapada Pi Approximation
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    In 499 CE, Aryabhata proved mathematically that lunar and solar eclipses are caused by the Moon entering Earth’s shadow (Chhaya) or blocking the Sun—not by mythological nodes swallowing the luminaries. Align the Moon into Earth’s Umbra cone at 180°!
                  </p>
                </div>

                {/* Interactive SVG Orbital Eclipse Simulator */}
                <div className="p-4 bg-[#0F172A] text-white border border-stone-800">
                  <svg viewBox="0 0 420 170" className="w-full h-44">
                    {/* Sun rays */}
                    <circle cx="48" cy="85" r="28" fill="#F59E0B" />
                    <line x1="76" y1="57" x2="360" y2="75" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="76" y1="113" x2="360" y2="95" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                    {/* Earth */}
                    <circle cx="210" cy="85" r="18" fill="#38BDF8" />
                    {/* Earth's Umbra Shadow Cone pointing right (180 deg from Sun) */}
                    <polygon points="210,67 355,85 210,103" fill="#020617" opacity="0.75" />
                    {/* Moon Orbit Ring */}
                    <circle cx="210" cy="85" r="78" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                    {/* Moon position calculated from moonAngle */}
                    {(() => {
                      const rad = ((moonAngle - 180) * Math.PI) / 180;
                      const mx = 210 + 78 * Math.cos(rad);
                      const my = 85 + 78 * Math.sin(rad);
                      const inUmbra = Math.abs(moonAngle - 180) <= 8;
                      return (
                        <g>
                          <circle
                            cx={mx}
                            cy={my}
                            r="9"
                            fill={inUmbra ? '#DC2626' : '#E2E8F0'}
                            stroke="#F8FAFC"
                            strokeWidth="1.5"
                          />
                          <text x={mx} y={my - 14} textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="IBM Plex Mono">
                            {inUmbra ? 'CHANDRA GRAHANA (UMBRA)' : 'CHANDRA'}
                          </text>
                        </g>
                      );
                    })()}
                  </svg>

                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-xs font-mono-tabular">
                      <label htmlFor="moon-orbit-slider">Orbital Elongation Angle (Align to 180° Opposition):</label>
                      <span className="text-amber-300 font-semibold">{moonAngle}°</span>
                    </div>
                    <input
                      id="moon-orbit-slider"
                      type="range"
                      min={120}
                      max={240}
                      value={moonAngle}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMoonAngle(val);
                        if (Math.abs(val - 180) <= 5) {
                          sound.playUnlock();
                          onUnlockArtifact('art-gup-aryabhata');
                        }
                      }}
                      className="w-full accent-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Ganitapada Verse 10 Pi Calculator */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-stone-900">
                    Aryabhatiya Ganitapada Verse 10: Asana-vritta (Approximation of π)
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    <em>"Add 4 to 100, multiply by 8, and add 62,000. By this rule the circumference of a circle of diameter 20,000 is approached."</em>
                  </p>
                  <div className="p-4 bg-[#F5F1E8] border border-stone-300 space-y-3 font-mono-tabular">
                    <div className="flex justify-between text-xs">
                      <span>Inscribed Polygon Sides (n):</span>
                      <span className="font-semibold">{polygonSides} sides</span>
                    </div>
                    <input
                      aria-label="Inscribed Polygon Sides"
                      type="range"
                      min={12}
                      max={384}
                      step={12}
                      value={polygonSides}
                      onChange={(e) => setPolygonSides(Number(e.target.value))}
                      className="w-full accent-stone-900"
                    />
                    <div className="text-xs space-y-1 pt-1 border-t border-stone-300">
                      <div>Diameter (Viskambha): 20,000 units</div>
                      <div>
                        Computed Circumference:{' '}
                        <strong>
                          {Math.round(20000 * polygonSides * Math.sin(Math.PI / polygonSides))}
                        </strong>{' '}
                        (Aryabhata: 62,832)
                      </div>
                      <div className="text-sm font-semibold text-[#9A3412]">
                        π ≈ {(polygonSides * Math.sin(Math.PI / polygonSides)).toFixed(5)} (Asanna = 3.14160)
                      </div>
                    </div>
                  </div>
                </div>
                <ArtifactIllustration type="aryabhatiya_folio" className="w-full h-36" />
              </div>
            </div>
          )}

          {guptaSubMode === 'mint' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Royal Gupta Mint: Strike a Gold Dinara (Suvarna Weight Standard)
                </h3>
                <p className="text-xs text-stone-600">
                  Configure the bronze die obverse, imperial standard emblem, and gold blank weight (144 grains = 1 Suvarna) to strike an authentic Gupta Dinara.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FBF9F5] border border-stone-300 space-y-2">
                    <div className="text-xs font-semibold text-stone-800">1. Select Royal Obverse Die:</div>
                    <button
                      onClick={() => setMintObverse('lyrist')}
                      className={`w-full p-2.5 text-left text-xs border ${
                        mintObverse === 'lyrist' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300'
                      }`}
                    >
                      Samudragupta Lyrist (Playing 7-stringed Vina)
                    </button>
                    <button
                      onClick={() => setMintObverse('archer')}
                      className={`w-full p-2.5 text-left text-xs border ${
                        mintObverse === 'archer' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300'
                      }`}
                    >
                      Chandragupta II Vikramaditya (Royal Archer)
                    </button>
                  </div>

                  <div className="p-4 bg-[#FBF9F5] border border-stone-300 space-y-2">
                    <div className="text-xs font-semibold text-stone-800">2. Imperial Dhwaja Emblem:</div>
                    <button
                      onClick={() => setMintStandard('garuda')}
                      className={`w-full p-2.5 text-left text-xs border ${
                        mintStandard === 'garuda' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300'
                      }`}
                    >
                      Garudadhvaja (Royal Gupta Emblem)
                    </button>
                    <button
                      onClick={() => setMintStandard('makara')}
                      className={`w-full p-2.5 text-left text-xs border ${
                        mintStandard === 'makara' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300'
                      }`}
                    >
                      Makara Standard (Riverine Tiger-Bearer)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playMintStrike();
                    setCoinStruck(true);
                    onUnlockArtifact('art-gup-dinara');
                    onUnlockArtifact('art-gup-buddha');
                  }}
                  className="w-full py-3 px-4 bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  Strike Gold Blank with Bronze Die (144 Grains / 9.2g)
                </button>

                {coinStruck && (
                  <div className="p-3.5 bg-amber-50 border border-amber-700/40 text-xs text-stone-800">
                    <strong>Mint Master’s Certification:</strong> Struck with Gupta Brahmi legend <em>"{mintObverse === 'lyrist' ? 'Maharajadhiraja Sri Samudraguptah' : 'Devasri Maharajadhiraja Sri Chandraguptah'}"</em> and {mintStandard.toUpperCase()} standard. Added to Virtual Museum!
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <ArtifactIllustration type="gupta_dinara" className="w-full h-48" />
                <div className="text-xs text-stone-600 mt-2">
                  Source: RBI Monetary Museum &amp; Bayana Hoard numismatic records.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ERA 5: MEDIEVAL INDIA (TRADE + BUILD across Regional Kingdoms)
         ===================================================================== */}
      {era.id === 'medieval' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-3">
            <button
              onClick={() => {
                sound.playTap();
                setMedievalSubMode('stepwell');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                medievalSubMode === 'stepwell'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              01. Stepwell (Baoli) &amp; Regional Architecture Engineering
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setMedievalSubMode('numismatics');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                medievalSubMode === 'numismatics'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              02. Multi-Kingdom Coin Identification Lab
            </button>
          </div>

          {medievalSubMode === 'stepwell' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Subterranean Stepwell (Rani-ki-Vav / Baoli) Lateral Earth-Pressure Engineer
                </h3>
                <p className="text-xs text-stone-600">
                  Digging 27 meters into sandy alluvial soil risks catastrophic wall collapse unless horizontal colonnaded pavilions (Kutas) brace the side walls. Balance the aquifer depth with structural Kuta buttresses!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F5F1E8] border border-stone-300">
                  <div>
                    <div className="flex justify-between text-xs font-mono-tabular mb-1">
                      <label htmlFor="stepwell-depth">Subterranean Depth Tiers:</label>
                      <span className="font-semibold">{stepwellDepthTiers} Storeys ({stepwellDepthTiers * 3.8}m)</span>
                    </div>
                    <input
                      id="stepwell-depth"
                      type="range"
                      min={3}
                      max={7}
                      value={stepwellDepthTiers}
                      onChange={(e) => setStepwellDepthTiers(Number(e.target.value))}
                      className="w-full accent-stone-900"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-tabular mb-1">
                      <label htmlFor="stepwell-buttress">Cross-Bracing Kuta Pavilions:</label>
                      <span className="font-semibold">{kutaButtresses} Pavilions</span>
                    </div>
                    <input
                      id="stepwell-buttress"
                      type="range"
                      min={1}
                      max={4}
                      value={kutaButtresses}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setKutaButtresses(val);
                        if (stepwellDepthTiers === 7 && val === 4) {
                          sound.playUnlock();
                          onUnlockArtifact('art-med-stepwell');
                        }
                      }}
                      className="w-full accent-stone-900"
                    />
                  </div>
                </div>

                {/* Structural Diagnosis */}
                <div className="p-4 bg-[#FBF9F5] border border-stone-300 text-xs space-y-2">
                  <div className="font-mono-tabular font-semibold text-stone-900">
                    HYDRO-STATIC STATUS:{' '}
                    {stepwellDepthTiers === 7 && kutaButtresses === 4
                      ? '● OPTIMAL EQUILIBRIUM (27m Aquifer Reached + 4 Lateral Kuta Buttresses)'
                      : kutaButtresses * 2 < stepwellDepthTiers
                      ? '▲ LATERAL SOIL PRESSURE WARNING: Add more Kuta cross-pavilions!'
                      : '◆ STABLE — Increase depth to 7 tiers & 4 Kutas to reach drought water table.'}
                  </div>
                  <p className="text-stone-600">
                    InNCERT Class 7 (Rulers and Buildings), compare how Maru-Gurjara stepwells used horizontal corbelled lintels (Trabeate), whereas Sultanate and Mughal monuments introduced wedge-shaped Voussoir True Arches (Arcuate).
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <ArtifactIllustration type="rani_ki_vav_carving" className="w-full h-48" />
              </div>
            </div>
          )}

          {medievalSubMode === 'numismatics' && (
            <div className="bg-white border border-stone-300 p-6 space-y-5">
              <div>
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Regional Kingdoms Numismatic Identifier (Ruler · Script · Metal · Design)
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Medieval India comprised vibrant regional kingdoms—never a single uniform state. Inspect each coin’s script, metallic weight, and iconography to verify its regional origin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'varaha' as const,
                    title: 'Gold Varaha (Pagoda) · 3.4g',
                    script: 'Nagari & Kannada Script ("Sri Pratapa Krishna Raya")',
                    motif: 'Boar (Varaha) /Seated Deity',
                    kingdom: 'Vijayanagara Empire (Hampi Mint)',
                  },
                  {
                    id: 'tanka' as const,
                    title: 'Silver Tanka · 10.8g (175 Grains)',
                    script: 'Arabic/Persian Naskh Calligraphy + Devanagari Horserider on regional issues',
                    motif: 'Inscribed Square within Circle',
                    kingdom: 'Delhi Sultanate (Iltutmish / Balban)',
                  },
                  {
                    id: 'rupiya' as const,
                    title: 'Pure Silver Rupiya · 11.5g',
                    script: 'Persian Couplet with Ilahi Solar Month & Surat/Agra Mint Mark',
                    motif: 'Quadruple-dotted border with assay stamp',
                    kingdom: 'Sher Shah Suri & Mughal Empire',
                  },
                ].map((c) => {
                  const verified = coinAttributions[c.id];
                  return (
                    <div key={c.id} className="p-4 border border-stone-300 bg-[#FBF9F5] flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono-tabular text-stone-500">{c.kingdom}</div>
                        <h4 className="text-sm font-semibold text-stone-900">{c.title}</h4>
                        <p className="text-xs text-stone-700"><strong>Script:</strong> {c.script}</p>
                        <p className="text-xs text-stone-700"><strong>Design:</strong> {c.motif}</p>
                      </div>
                      <button
                        onClick={() => {
                          sound.playMintStrike();
                          const next = { ...coinAttributions, [c.id]: true };
                          setCoinAttributions(next);
                          onUnlockArtifact('art-med-varaha');
                        }}
                        className={`w-full py-2 px-3 text-xs font-medium border ${
                          verified
                            ? 'bg-emerald-900 text-white border-emerald-900'
                            : 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                        }`}
                      >
                        {verified ? '✓ Assay & Script Verified in Catalog' : 'Inspect with Sarraf Loupe & Verify'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ERA 6: FREEDOM STRUGGLE (PARTICIPATE as an Ordinary Citizen)
         ===================================================================== */}
      {era.id === 'freedom' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-300 pb-3">
            <button
              onClick={() => {
                sound.playTap();
                setFreedomSubMode('network');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                freedomSubMode === 'network'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              01. Grassroots Bulletin &amp; 42.34m Radio Relay
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setFreedomSubMode('dandi');
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                freedomSubMode === 'dandi'
                  ? 'bg-stone-900 text-[#FBF9F5]'
                  : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
              }`}
            >
              02. Dandi March Advance-Party Village Coordinator (1930)
            </button>
          </div>

          {freedomSubMode === 'network' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-300 p-6">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="text-xs font-mono-tabular text-[#991B1B]">
                    ROLE: ORDINARY PARTICIPANT — STUDENT TYPESETTER &amp; VOLUNTEER COURIER
                  </div>
                  <h3 className="text-lg font-display font-semibold text-stone-900 mt-0.5">
                    Spread Satyagraha Bulletins Across All 6 Grassroots Nodes Under Press Censorship
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    With official telegraph lines monitored by colonial censors, ordinary students, weavers, and railway workers carried cyclostyled leaflets and tuned portable 42.34m shortwave receivers. Click each town node to establish the grassroots chain!
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F5F1E8] border border-stone-300">
                  {[
                    { name: 'Sabarmati Ashram', role: 'Cyclostyle Stencil Origin' },
                    { name: 'Nadiad & Anand', role: 'Kheda Peasant Volunteer Relay' },
                    { name: 'Bharuch Crossing', role: 'Narmada Boatmen Courier' },
                    { name: 'Surat Textile Guild', role: 'Khadi Weavers Distribution' },
                    { name: 'Dandi Coast', role: 'Salt Satyagraha Camp' },
                    { name: 'Bombay (42.34m Radio)', role: 'Underground Shortwave Broadcast' },
                  ].map((node) => {
                    const active = connectedNodes.includes(node.name) || node.name.startsWith('Sabarmati');
                    return (
                      <button
                        key={node.name}
                        onClick={() => {
                          sound.playTap(520);
                          if (!connectedNodes.includes(node.name)) {
                            const next = [...connectedNodes, node.name];
                            setConnectedNodes(next);
                            if (next.length >= 6) {
                              sound.playUnlock();
                              onUnlockArtifact('art-fre-press');
                              onUnlockArtifact('art-fre-radio');
                            }
                          }
                        }}
                        className={`p-3.5 border text-left transition-colors ${
                          active
                            ? 'bg-[#991B1B] text-white border-[#7F1D1D]'
                            : 'bg-white text-stone-800 border-stone-300 hover:border-stone-800'
                        }`}
                      >
                        <div className="text-xs font-semibold">{node.name}</div>
                        <div className={`text-[11px] mt-1 ${active ? 'text-red-100' : 'text-stone-500'}`}>
                          {node.role}
                        </div>
                        <div className="text-[10px] font-mono-tabular mt-2">
                          {active ? '● RELAY ACTIVE' : '○ CLICK TO LINK'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-4 lg:pt-0 lg:pl-6">
                <ArtifactIllustration type="congress_radio_transmitter" className="w-full h-48" />
                <p className="text-xs text-stone-600 leading-relaxed mt-3">
                  By focusing on ordinary citizens—typesetters, Khadi spinners, village teachers, and radio technicians—players experience how mass participation sustained the Freedom Struggle.
                </p>
              </div>
            </div>
          )}

          {freedomSubMode === 'dandi' && (
            <div className="bg-white border border-stone-300 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-lg font-display font-semibold text-stone-900">
                  Dandi Salt Satyagraha: Village Advance-Party Logistics (March–April 1930)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  As a grassroots volunteer walking ahead of the main column, coordinate community Khadi spinning and solar evaporation salt pans so every coastal village can participate simultaneously on 6 April 1930.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F5F1E8] border border-stone-300">
                  <div className="space-y-2">
                    <div className="text-xs font-mono-tabular text-stone-700">
                      SOLAR SALT PANS PREPARED: <strong>{saltPansPrepared} / 5 Coastal Villages</strong>
                    </div>
                    <button
                      onClick={() => {
                        sound.playTap(490);
                        const next = Math.min(5, saltPansPrepared + 1);
                        setSaltPansPrepared(next);
                        if (next === 5) {
                          sound.playUnlock();
                          onUnlockArtifact('art-fre-dandi');
                        }
                      }}
                      className="w-full py-2 px-3 bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
                    >
                      + Prepare Coastal Brine Evaporation Pan
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono-tabular text-stone-700">
                      SWADESHI KHADI YARN SPUN: <strong>{khadiYardsSpun} Yards</strong>
                    </div>
                    <button
                      onClick={() => {
                        sound.playTap(540);
                        setKhadiYardsSpun((y) => y + 40);
                      }}
                      className="w-full py-2 px-3 bg-[#991B1B] text-white text-xs font-medium hover:bg-[#7F1D1D]"
                    >
                      + Spin 40 Yards on Portable Box Charkha
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ArtifactIllustration type="dandi_salt_archive" className="w-full h-44" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ERA ARTIFACT COLLECTION & EPISTEMOLOGICAL TRI-LENS STRIP
         ===================================================================== */}
      <div className="space-y-4 pt-4 border-t border-stone-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-display font-semibold text-stone-900">
              Era Artifacts &amp; Epistemological Evidence Separation
            </h3>
            <p className="text-xs text-stone-600">
              Every Kaalchakra artifact separates <strong className="text-stone-900">Known from Evidence</strong> · <strong className="text-stone-900">Scholarly Interpretation</strong> · <strong className="text-stone-900">Still Debated</strong>.
            </p>
          </div>
          <div className="text-xs font-mono-tabular text-stone-600">
            Sources: ASI · National Museum · NCERT · RBI Monetary Museum
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eraArtifacts.map((art) => {
            const isUnlocked = unlockedArtifactIds.includes(art.id);
            return (
              <div
                key={art.id}
                className="bg-white border border-stone-300 flex flex-col justify-between transition-colors hover:border-stone-500"
              >
                <div>
                  <ArtifactIllustration type={art.illustrationType} className="w-full h-44 border-b border-stone-200" />
                  <div className="p-5 space-y-3">
                    {/* Unboxed clean metadata per Zero-Pill Discipline */}
                    <div className="text-[11px] font-mono-tabular text-stone-500">
                      {art.accessionNumber} · {art.sourceInstitution} · {isUnlocked ? 'COLLECTED' : 'LOCKED IN ERA'}
                    </div>
                    <h4 className="text-base font-display font-semibold text-stone-900 leading-snug">
                      {lang === 'hi' ? art.titleHi : art.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {art.summary}
                    </p>

                    {/* 3-Part Epistemological Separation */}
                    <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-emerald-900">● Known from Evidence: </span>
                        <span className="text-stone-700">{art.epistemology.knownFromEvidence}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">◆ Scholarly Interpretation: </span>
                        <span className="text-stone-700">{art.epistemology.scholarlyInterpretation}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-900">▲ Still Debated: </span>
                        <span className="text-stone-700">{art.epistemology.stillDebated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      sound.playTap();
                      onInspectArtifact(art);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[#9A3412] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect Accession Record
                  </button>
                  {!isUnlocked && (
                    <button
                      onClick={() => {
                        sound.playUnlock();
                        onUnlockArtifact(art.id);
                      }}
                      className="px-3 py-1.5 bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 whitespace-nowrap"
                    >
                      Collect to Museum
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
