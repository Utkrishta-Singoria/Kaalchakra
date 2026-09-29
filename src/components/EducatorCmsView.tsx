import React, { useState } from 'react';
import { ERAS, EraId } from '../data/kaalchakraData';
import { sound } from '../utils/sound';
import {
  CheckCircle2,
  FileCheck,
  Download,
  Shield,
  GraduationCap,
  Plus,
} from 'lucide-react';

interface CmsReviewItem {
  id: string;
  eraName: string;
  contentType: 'Puzzle Mechanic' | 'Artifact Card' | 'Historical Scenario';
  title: string;
  primarySourceCitation: string;
  epistemologyCheck: string;
  sensitivityNote: string;
  status: 'Pending Historian Sign-Off' | 'Approved & Published' | 'Flagged for Citation Check';
}

const INITIAL_CMS_QUEUE: CmsReviewItem[] = [
  {
    id: 'cms-101',
    eraName: 'Harappan / Indus Valley',
    contentType: 'Puzzle Mechanic',
    title: 'Lothal Seal Impression & Undeciphered Script Guardrail',
    primarySourceCitation: 'ASI Lothal Excavation Report (S.R. Rao) & NCERT Class 12 Theme 1',
    epistemologyCheck:
      'Explicitly separates Known (clay bullae rope impressions) from Still Debated (undeciphered Indus script signs). Zero fake script translation claims.',
    sensitivityNote: 'Verified neutral, evidence-led archaeological framing.',
    status: 'Approved & Published',
  },
  {
    id: 'cms-102',
    eraName: 'Medieval India',
    contentType: 'Historical Scenario',
    title: 'Multi-Kingdom Regional Chapters (Chola, Vijayanagara, Sultanate, Mughal)',
    primarySourceCitation: 'NCERT Class 7 (Our Pasts II) & RBI Monetary Museum Catalog',
    epistemologyCheck:
      'Presents regional kingdoms, architectural engineering (Trabeate corbels vs Arcuate true arches), and multilingual coinage with balanced pluralistic context.',
    sensitivityNote: 'Pending final sign-off from external medieval history consultant.',
    status: 'Pending Historian Sign-Off',
  },
  {
    id: 'cms-103',
    eraName: 'Vedic Age',
    contentType: 'Artifact Card',
    title: 'Atranjikhera Wrought-Iron Ploughshare & Painted Grey Ware',
    primarySourceCitation: 'ASI Excavations at Atranjikhera (R.C. Gaur) & Hastinapura (B.B. Lal)',
    epistemologyCheck:
      'Adheres strictly to excavated material culture without inventing unverified artifacts.',
    sensitivityNote: 'Pending curriculum sign-off for Class 6 Chapter 4–5 alignment.',
    status: 'Pending Historian Sign-Off',
  },
];

export const EducatorCmsView: React.FC = () => {
  const [cmsQueue, setCmsQueue] = useState<CmsReviewItem[]>(INITIAL_CMS_QUEUE);
  const [cachedEras, setCachedEras] = useState<Record<EraId, boolean>>({
    harappan: true,
    vedic: true,
    mauryan: true,
    gupta: false,
    medieval: false,
    freedom: false,
  });
  const [homeworkAssignedEra, setHomeworkAssignedEra] = useState<EraId>('harappan');
  const [homeworkDueNote, setHomeworkDueNote] = useState<string>(
    'Complete Mohenjo-daro Drainage Grid & inspect Steatite Seal Evidence Record before Friday.'
  );
  const [homeworkPublished, setHomeworkPublished] = useState<boolean>(false);
  const [parentalConsentVerified, setParentalConsentVerified] = useState<boolean>(true);

  const handleReviewAction = (
    id: string,
    newStatus: CmsReviewItem['status']
  ) => {
    sound.playUnlock();
    setCmsQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 lg:p-8">
        <div className="text-xs font-mono-tabular text-stone-500 uppercase tracking-widest">
          PHASES 1, 4, 7 &amp; 8 · EDUCATOR CLASSROOM, HISTORIAN CMS &amp; RURAL DEVICE ARCHITECTURE
        </div>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-stone-900">
              Teacher Classroom Mode, Historian Sign-Off CMS &amp; Offline Bundles
            </h1>
            <p className="text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
              Accuracy and cultural sensitivity are safeguarded through a mandatory historian and teacher sign-off workflow before content ships over Addressables CDN. Designed for low-end rural devices (Android 8+ / 3 GB RAM) and India’s DPDP Act child-safety standards.
            </p>
          </div>
          <div className="font-mono-tabular text-right">
            <div className="text-xs text-stone-500">ACTIVE CLASSROOM CODE</div>
            <div className="text-xl font-semibold text-stone-900">KLC-STD6-2026</div>
          </div>
        </div>
      </div>

      {/* Section 1: Historian & Teacher Review Sign-Off Queue (Phase 1 Step 7 & Phase 7 Step 29) */}
      <div className="bg-white border border-stone-300 p-6 lg:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xl font-display font-semibold text-stone-900">
              01. Headless CMS Historian &amp; Teacher Sign-Off Workflow
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Every historical claim, puzzle rule, and artifact card requires academic sign-off verifying ASI / NCERT / National Museum / RBI Monetary Museum provenance.
            </p>
          </div>
          <span className="text-xs font-mono-tabular text-stone-600">
            APPROVED: {cmsQueue.filter((i) => i.status === 'Approved & Published').length} / {cmsQueue.length}
          </span>
        </div>

        <div className="space-y-4">
          {cmsQueue.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-[#FBF9F5] border border-stone-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="text-xs font-mono-tabular text-stone-500">
                  {item.id.toUpperCase()} · {item.eraName} · {item.contentType} · STATUS:{' '}
                  <strong
                    className={
                      item.status === 'Approved & Published'
                        ? 'text-emerald-800'
                        : item.status === 'Flagged for Citation Check'
                        ? 'text-red-800'
                        : 'text-amber-800'
                    }
                  >
                    {item.status}
                  </strong>
                </div>
                <h3 className="text-base font-display font-semibold text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-700">
                  <strong>Primary Source Citation:</strong> {item.primarySourceCitation}
                </p>
                <p className="text-xs text-stone-700">
                  <strong>Epistemological Audit:</strong> {item.epistemologyCheck}
                </p>
                <p className="text-xs text-stone-600 italic">
                  <strong>Sensitivity Review:</strong> {item.sensitivityNote}
                </p>
              </div>

              <div className="flex sm:flex-row lg:flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleReviewAction(item.id, 'Approved & Published')}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 whitespace-nowrap"
                >
                  ✓ Sign Off &amp; Publish to CDN
                </button>
                <button
                  onClick={() => handleReviewAction(item.id, 'Flagged for Citation Check')}
                  className="px-4 py-2 border border-stone-300 bg-white text-stone-800 text-xs font-medium hover:bg-stone-100 whitespace-nowrap"
                >
                  Request Source Revision
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: School Classroom Progress, Pre/Post Play Learning Outcomes & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white border border-stone-300 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-display font-semibold text-stone-900">
              02. Pilot School Learning-Outcome Telemetry (Pre-Play vs Post-Play Mastery)
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Aggregated anonymous concept mastery across 32 students in Class 6–8 pilot cohort (Phase 8 Step 31).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono-tabular">
              <thead>
                <tr className="border-b border-stone-300 text-stone-500">
                  <th className="py-2.5 pr-4">NCERT CHAPTER &amp; ERA</th>
                  <th className="py-2.5 px-3">MECHANIC</th>
                  <th className="py-2.5 px-3">PRE-PLAY</th>
                  <th className="py-2.5 px-3">POST-PLAY</th>
                  <th className="py-2.5 pl-3">DELTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr>
                  <td className="py-3 pr-4 font-sans font-medium">Ch. 3 · Harappan Urban Drainage &amp; Weights</td>
                  <td className="py-3 px-3">BUILD</td>
                  <td className="py-3 px-3">54%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-900">89%</td>
                  <td className="py-3 pl-3 text-emerald-800">+35%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-sans font-medium">Ch. 4 · Vedic Sabha &amp; Shruti Transmission</td>
                  <td className="py-3 px-3">DECIDE</td>
                  <td className="py-3 px-3">48%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-900">84%</td>
                  <td className="py-3 pl-3 text-emerald-800">+36%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-sans font-medium">Ch. 7 · Ashoka’s Dhamma &amp; Rock Edicts</td>
                  <td className="py-3 px-3">GOVERN</td>
                  <td className="py-3 px-3">58%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-900">92%</td>
                  <td className="py-3 pl-3 text-emerald-800">+34%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-sans font-medium">Ch. 11 · Aryabhata Astronomy &amp; Gupta Mint</td>
                  <td className="py-3 px-3">DISCOVER</td>
                  <td className="py-3 px-3">51%</td>
                  <td className="py-3 px-3 font-semibold text-emerald-900">88%</td>
                  <td className="py-3 pl-3 text-emerald-800">+37%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gamified Homework Assigner */}
          <div className="p-4 bg-[#F5F1E8] border border-stone-300 space-y-3">
            <div className="text-xs font-semibold text-stone-900">
              Assign Gamified NCERT Chapter Mission to Classroom (KLC-STD6-2026)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                aria-label="Select Era for Homework"
                value={homeworkAssignedEra}
                onChange={(e) => setHomeworkAssignedEra(e.target.value as EraId)}
                className="p-2 text-xs bg-white border border-stone-300 text-stone-900"
              >
                {ERAS.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.index}. {e.name} ({e.gameplayVerb})
                  </option>
                ))}
              </select>
              <input
                type="text"
                aria-label="Homework Instructions"
                value={homeworkDueNote}
                onChange={(e) => setHomeworkDueNote(e.target.value)}
                className="sm:col-span-2 p-2 text-xs bg-white border border-stone-300 text-stone-900"
              />
            </div>
            <button
              onClick={() => {
                sound.playUnlock();
                setHomeworkPublished(true);
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
            >
              {homeworkPublished ? '✓ Mission Dispatched to 32 Student Devices' : 'Dispatch Gamified Homework Mission'}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Addressables Offline Era Pack Manager & DPDP Child Privacy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-300 p-6 space-y-4">
            <div>
              <h3 className="text-base font-display font-semibold text-stone-900">
                03. On-Demand Era Packs (Addressables CDN · Rural Offline Mode)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Each era downloads separately (1.9–3.5 MB) so the base app stays tiny and runs smoothly offline on low-end 3 GB RAM phones.
              </p>
            </div>

            <div className="space-y-2">
              {ERAS.map((e) => {
                const isCached = cachedEras[e.id];
                return (
                  <div
                    key={e.id}
                    className="p-3 bg-[#FBF9F5] border border-stone-300 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-semibold text-stone-900">
                        {e.index}. {e.name}
                      </div>
                      <div className="text-[11px] font-mono-tabular text-stone-500">
                        Pack: {e.bundleSizeMb} · {isCached ? '● Cached Offline' : '○ On-Demand CDN'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        sound.playTap(480);
                        setCachedEras((prev) => ({ ...prev, [e.id]: !prev[e.id] }));
                      }}
                      className={`px-3 py-1.5 text-xs font-medium border whitespace-nowrap ${
                        isCached
                          ? 'bg-stone-200 text-stone-800 border-stone-300'
                          : 'bg-stone-900 text-white border-stone-900'
                      }`}
                    >
                      {isCached ? 'Cached ✓' : 'Download Pack'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DPDP Act Child Safety Baseline */}
          <div className="bg-white border border-stone-300 p-6 space-y-3">
            <div className="text-xs font-mono-tabular text-emerald-900 font-semibold">
              DPDP ACT (INDIA) CHILD-SAFETY &amp; PRIVACY BASELINE (PHASE 2 STEP 12)
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero third-party advertising SDKs, zero behavioral tracking of minors, guest-first local progression, and verifiable parental/school consent.
            </p>
            <label className="flex items-center gap-2 text-xs text-stone-800 font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={parentalConsentVerified}
                onChange={(e) => setParentalConsentVerified(e.target.checked)}
                className="accent-stone-900"
              />
              <span>Enforce School/Parental Consent Gate &amp; Minimal Telemetry Mode</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
