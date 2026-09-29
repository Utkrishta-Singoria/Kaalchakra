import React, { useState } from 'react';
import { sound } from '../utils/sound';
import {
  ShieldCheck,
  Scale,
  Ship,
  Flag,
  CheckCircle2,
  Send,
  RefreshCw,
} from 'lucide-react';

interface TradeOffer {
  id: string;
  senderKingdom: string;
  schoolCode: string;
  guildName: string;
  offering: string;
  offeringQty: number;
  requesting: string;
  requestingQty: number;
  historicalContext: string;
  presetMessage: string;
  fulfilled: boolean;
  reported?: boolean;
}

const INITIAL_OFFERS: TradeOffer[] = [
  {
    id: 'offer-1',
    senderKingdom: 'Kaveripattinam Maritime Port (Class 7B · Chennai)',
    schoolCode: 'KV-CHN-04',
    guildName: 'Manigramam & Ayyavole-500 Guild',
    offering: 'Malabar Black Pepper & Pearl Bales',
    offeringQty: 40,
    requesting: 'Wrought Iron & Alluvial Grain',
    requestingQty: 35,
    historicalContext:
      'Inscriptions from Thanjavur and Lobu Tua (Sumatra) document Tamil merchant guilds trading spices and pearls for iron and horses.',
    presetMessage: 'May our guild caravan pass safely under your Shulka customs seal!',
    fulfilled: false,
  },
  {
    id: 'offer-2',
    senderKingdom: 'Bharukachchha Estuary Hub (Class 8A · Vadodara)',
    schoolCode: 'GHS-VAD-11',
    guildName: 'Sarthavaha Overland Caravan Guild',
    offering: 'Etched Carnelian & Agate Cabochons',
    offeringQty: 30,
    requesting: 'Fine Cotton Muslin & Indigo',
    requestingQty: 30,
    historicalContext:
      'The Periplus of the Erythraean Sea records Bharukachchha (Bharuch) exporting carnelian and cotton textiles across the Indian Ocean.',
    presetMessage: 'Greetings from the Western Sea! We propose an equal weight exchange.',
    fulfilled: false,
  },
  {
    id: 'offer-3',
    senderKingdom: 'Tamralipti Riverine Port (Class 6C · Kolkata)',
    schoolCode: 'BV-KOL-09',
    guildName: 'Uttara-Patha Riverine Shreni',
    offering: 'Fine Gangetic Muslin & Copper',
    offeringQty: 50,
    requesting: 'Spices & Panchaloha Bronze Ingots',
    requestingQty: 45,
    historicalContext:
      'Tamralipti connected the Mauryan and Gupta heartland along the Ganga to Southeast Asian maritime routes.',
    presetMessage: 'Our river barges await your Royal Lakshanadhyaksha mint stamp.',
    fulfilled: false,
  },
];

const CHILD_SAFE_PRESET_MESSAGES = [
  'Greetings! Our Shreni guild accepts your caravan terms in good faith.',
  'May we propose a mutual highway tree-planting and rest-house alliance (Rock Edict II)?',
  'Our granaries are replenishing after monsoon harvest—let us trade next season!',
  'Honoring our trade compact with standardized weights and fair Shulka duty.',
];

export const KingdomGuilds: React.FC = () => {
  const [treasuryKarshapanas, setTreasuryKarshapanas] = useState<number>(480);
  const [grainSurplus, setGrainSurplus] = useState<number>(320);
  const [craftGoods, setCraftGoods] = useState<number>(210);
  const [civicTrust, setCivicTrust] = useState<number>(88);

  const [shulkaCustomsRate, setShulkaCustomsRate] = useState<number>(8); // 1/12th to 1/10th
  const [guildEndowment, setGuildEndowment] = useState<number>(25);
  const [offers, setOffers] = useState<TradeOffer[]>(INITIAL_OFFERS);
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [sentDiplomacyLog, setSentDiplomacyLog] = useState<string[]>([
    'To Kaveripattinam Port: "Honoring our trade compact with standardized weights and fair Shulka duty."',
  ]);

  const handleTurnCycle = () => {
    sound.playTap(500);
    const grainDelta = Math.round(25 + guildEndowment * 0.6);
    const revenueDelta = Math.round(30 + shulkaCustomsRate * 3.5);
    const trustDelta = shulkaCustomsRate <= 10 ? +3 : -4;

    setGrainSurplus((g) => g + grainDelta);
    setTreasuryKarshapanas((t) => t + revenueDelta);
    setCraftGoods((c) => c + 18);
    setCivicTrust((tr) => Math.max(40, Math.min(100, tr + trustDelta)));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 lg:p-8">
        <div className="text-xs font-mono-tabular text-stone-500 uppercase tracking-widest">
          PHASE 6 DELIVERABLE · HISTORICAL ECONOMY &amp; ASYNCHRONOUS MULTIPLAYER
        </div>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <h1 className="text-3xl font-display font-semibold text-stone-900">
              Build Your Kingdom: Shreni Guilds, Taxation &amp; Async Caravan Trade
            </h1>
            <p className="text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
              Designed for low-bandwidth rural networks using asynchronous state sync. Students govern a historical trade hub using documented fiscal rules (Bhaga &amp; Shulka) and trade with partner classrooms using strictly moderated preset diplomatic messages.
            </p>
          </div>

          <button
            onClick={handleTurnCycle}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Advance Harvest &amp; Caravan Season (+1 Turn)
          </button>
        </div>

        {/* Kingdom Resource Meters */}
        <div className="pt-5 grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tabular">
          <div className="bg-white p-4 border border-stone-300">
            <div className="text-xs text-stone-500">ROYAL TREASURY (KOSHA)</div>
            <div className="text-xl font-semibold text-stone-900 mt-1">{treasuryKarshapanas} Pana</div>
            <div className="text-[11px] text-stone-600 mt-0.5">Silver Karshapana / Dinara Reserve</div>
          </div>
          <div className="bg-white p-4 border border-stone-300">
            <div className="text-xs text-stone-500">GRANARY BUFFER (KOSTHAGARA)</div>
            <div className="text-xl font-semibold text-stone-900 mt-1">{grainSurplus} Drona</div>
            <div className="text-[11px] text-stone-600 mt-0.5">Famine &amp; Caravan Rations</div>
          </div>
          <div className="bg-white p-4 border border-stone-300">
            <div className="text-xs text-stone-500">SHRENI CRAFT OUTPUT</div>
            <div className="text-xl font-semibold text-stone-900 mt-1">{craftGoods} Bales</div>
            <div className="text-[11px] text-stone-600 mt-0.5">Textiles, Beads &amp; Wrought Iron</div>
          </div>
          <div className="bg-white p-4 border border-stone-300">
            <div className="text-xs text-stone-500">JANAPADA CIVIC TRUST</div>
            <div className="text-xl font-semibold text-emerald-900 mt-1">{civicTrust}/100 · STABLE</div>
            <div className="text-[11px] text-stone-600 mt-0.5">Guild &amp; Cultivator Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Two-Column Economy & Async Trade Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Async Caravan Trade Offers from Partner Classrooms */}
        <div className="lg:col-span-7 bg-white border border-stone-300 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-lg font-display font-semibold text-stone-900">
                Asynchronous Inter-Kingdom Caravan Offers
              </h2>
              <p className="text-xs text-stone-600">
                Works offline/asynchronously on 2G/3G rural connections—fulfill trade contracts when connected.
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-stone-500">SYNC: ASYNC FIRESTORE QUEUE</span>
          </div>

          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 bg-[#FBF9F5] border border-stone-300 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono-tabular text-stone-500">
                      {offer.schoolCode} · {offer.guildName}
                    </div>
                    <h3 className="text-sm font-semibold text-stone-900 mt-0.5">
                      {offer.senderKingdom}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      sound.playTap(320);
                      setOffers((prev) =>
                        prev.map((o) =>
                          o.id === offer.id ? { ...o, reported: !o.reported } : o
                        )
                      );
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-red-800"
                    title="Child-Safety Moderation Report Tool"
                  >
                    <Flag className="w-3 h-3" />{' '}
                    {offer.reported ? 'Flagged for Teacher Review' : 'Report'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#F5F1E8] border border-stone-200 text-xs font-mono-tabular">
                  <div>
                    <span className="text-stone-500 block">CARAVAN OFFERS:</span>
                    <strong className="text-emerald-950">
                      +{offer.offeringQty} {offer.offering}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">REQUESTS IN EXCHANGE:</span>
                    <strong className="text-stone-900">
                      -{offer.requestingQty} {offer.requesting}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>Historical Source Note:</strong> {offer.historicalContext}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-stone-200">
                  <span className="text-xs italic text-stone-700">
                    Preset Envoy Note: "{offer.presetMessage}"
                  </span>
                  <button
                    disabled={offer.fulfilled}
                    onClick={() => {
                      sound.playUnlock();
                      setOffers((prev) =>
                        prev.map((o) => (o.id === offer.id ? { ...o, fulfilled: true } : o))
                      );
                      setTreasuryKarshapanas((t) => t + 65);
                      setCraftGoods((c) => c + 25);
                    }}
                    className={`px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                      offer.fulfilled
                        ? 'bg-emerald-800 text-white cursor-default'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    {offer.fulfilled ? '✓ Caravan Sealed & Dispatched' : 'Accept & Stamp Caravan Charter'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Historical Fiscal Sliders & Child-Safe Preset Diplomacy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-300 p-6 space-y-4">
            <h3 className="text-base font-display font-semibold text-stone-900">
              Fiscal &amp; Guild Policy (Arthashastra &amp; Epigraphic Rules)
            </h3>

            <div>
              <div className="flex justify-between text-xs font-mono-tabular mb-1">
                <label htmlFor="shulka-slider" className="font-medium text-stone-800">
                  Shulka (Toll &amp; Customs Duty on Caravans):
                </label>
                <span className="font-semibold text-stone-900">{shulkaCustomsRate}%</span>
              </div>
              <input
                id="shulka-slider"
                type="range"
                min={4}
                max={20}
                value={shulkaCustomsRate}
                onChange={(e) => setShulkaCustomsRate(Number(e.target.value))}
                className="w-full accent-stone-900"
              />
              <p className="text-[11px] text-stone-600 mt-1">
                Historical Shulka ranged from 1/20th (5%) to 1/10th (10%) on imported goods. Keeping tolls moderate attracts foreign merchant guilds.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-tabular mb-1">
                <label htmlFor="endowment-slider" className="font-medium text-stone-800">
                  Irrigation Tank (Eri / Vav) &amp; Rest-House Endowment:
                </label>
                <span className="font-semibold text-stone-900">{guildEndowment} Pana / Season</span>
              </div>
              <input
                id="endowment-slider"
                type="range"
                min={10}
                max={60}
                value={guildEndowment}
                onChange={(e) => setGuildEndowment(Number(e.target.value))}
                className="w-full accent-stone-900"
              />
            </div>
          </div>

          {/* Child-Safe Preset Diplomacy Box (Phase 6 Step 26) */}
          <div className="bg-white border border-stone-300 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>CHILD-SAFETY BASELINE: PRESET DIPLOMATIC MESSAGES ONLY</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              To comply with child-safety standards and prevent unmoderated chat among minors, inter-school alliances use verified historical envoy phrases.
            </p>

            <div className="space-y-2">
              {CHILD_SAFE_PRESET_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playTap();
                    setSelectedPresetIdx(i);
                  }}
                  className={`w-full p-2.5 text-left text-xs border transition-colors ${
                    selectedPresetIdx === i
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-[#FBF9F5] text-stone-800 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  "{msg}"
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playTap(540);
                setSentDiplomacyLog((prev) => [
                  `Envoy Dispatched: "${CHILD_SAFE_PRESET_MESSAGES[selectedPresetIdx]}"`,
                  ...prev.slice(0, 2),
                ]);
              }}
              className="w-full py-2.5 px-4 bg-[#9A3412] text-white text-xs font-semibold hover:bg-[#7C2D12] inline-flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Preset Envoy Scroll
            </button>

            <div className="space-y-1 pt-2 border-t border-stone-200">
              {sentDiplomacyLog.map((entry, idx) => (
                <div key={idx} className="text-[11px] font-mono-tabular text-stone-600">
                  ✓ {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
