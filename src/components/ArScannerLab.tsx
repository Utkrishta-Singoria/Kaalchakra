import React, { useState, useRef, useEffect } from 'react';
import { ARTIFACTS, ArtifactCard } from '../data/kaalchakraData';
import { ArtifactIllustration } from './ArtifactIllustration';
import { sound } from '../utils/sound';
import {
  Camera,
  QrCode,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Coins,
  StopCircle,
} from 'lucide-react';

interface ArScannerLabProps {
  onUnlockArtifact: (id: string) => void;
  onInspectArtifact: (art: ArtifactCard) => void;
}

interface ScannableTarget {
  id: string;
  artifactId: string;
  category: 'coin_tflite' | 'textbook_image';
  name: string;
  ncertPageRef: string;
  featuresDetected: string[];
  qrCodeToken: string;
  illustrationType: ArtifactCard['illustrationType'];
}

const SCANNABLE_TARGETS: ScannableTarget[] = [
  {
    id: 'scan-karshapana',
    artifactId: 'art-mau-karshapana',
    category: 'coin_tflite',
    name: 'Mauryan Silver Punch-Marked Karshapana Coin',
    ncertPageRef: 'NCERT Class 6 · Chapter 8 (Page 79 Box: Punch-Marked Coins)',
    featuresDetected: [
      'Irregular rectangular silver cut sheet (3.4g / 32 Rattis)',
      '5 distinct micro-punches: Solar wheel, 6-armed Shadarachakra, 3-arched Chaitya hill',
      'No die-struck portrait or continuous rim legend',
    ],
    qrCodeToken: 'QR-RBI-MAU-218',
    illustrationType: 'karshapana_coin',
  },
  {
    id: 'scan-dinara',
    artifactId: 'art-gup-dinara',
    category: 'coin_tflite',
    name: 'Gupta Gold Dinara (Samudragupta Lyrist / Chandragupta Archer)',
    ncertPageRef: 'NCERT Class 6 · Chapter 10 (Page 105: Prashastis and Coins)',
    featuresDetected: [
      'High-karat yellow gold circular flan (21mm, 9.2g Suvarna standard)',
      'High-relief Garudadhvaja standard + seated harp/vina motif',
      'Vertical Gupta Brahmi obverse legend under left arm',
    ],
    qrCodeToken: 'QR-RBI-GUP-301',
    illustrationType: 'gupta_dinara',
  },
  {
    id: 'scan-varaha',
    artifactId: 'art-med-varaha',
    category: 'coin_tflite',
    name: 'Vijayanagara Gold Varaha (Pagoda) & Sultanate Silver Tanka',
    ncertPageRef: 'NCERT Class 7 · Chapter 6 (Hampi & Medieval Trade)',
    featuresDetected: [
      'Compact thick gold dump flan (3.4g) with three-line Nagari legend',
      'High-relief Varaha (Boar) incarnation crest on obverse',
      'Assay banker (Sarraf) test mark on edge',
    ],
    qrCodeToken: 'QR-RBI-MED-415',
    illustrationType: 'vijayanagara_varaha',
  },
  {
    id: 'scan-sarnath',
    artifactId: 'art-mau-sarnath',
    category: 'textbook_image',
    name: 'Sarnath Lion Capital (NCERT Class 6 Chapter 7 Textbook Figure)',
    ncertPageRef: 'NCERT Class 6 · Chapter 7 (Page 68: The Lion Capital)',
    featuresDetected: [
      'High-contrast 2D feature points on four addorsed Asiatic lions',
      '24-spoke Dhammachakra relief on abacus drum',
      'Inverted bell-shaped lotus base with mirror Chunar polish',
    ],
    qrCodeToken: 'QR-ASI-MAU-201',
    illustrationType: 'sarnath_capital',
  },
  {
    id: 'scan-seal',
    artifactId: 'art-ivc-seal',
    category: 'textbook_image',
    name: 'Mohenjo-daro Steatite Unicorn Seal (NCERT Class 6 & 12 Textbook Plate)',
    ncertPageRef: 'NCERT Class 6 · Chapter 3 (Page 27: Seals and Sealings)',
    featuresDetected: [
      'Square 2.9cm aspect ratio with intaglio border',
      'Top register of 5 undeciphered Indus script signs',
      'Single-horned bovid profile above ritual brazier standard',
    ],
    qrCodeToken: 'QR-NM-IVC-001',
    illustrationType: 'unicorn_seal',
  },
];

export const ArScannerLab: React.FC<ArScannerLabProps> = ({
  onUnlockArtifact,
  onInspectArtifact,
}) => {
  const [scanPipeline, setScanPipeline] = useState<'coin_tflite' | 'textbook_image'>('coin_tflite');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('scan-karshapana');
  const [coinWearPercent, setCoinWearPercent] = useState<number>(20);
  const [specularGlare, setSpecularGlare] = useState<number>(15);
  const [qrFallbackUsed, setQrFallbackUsed] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeTarget =
    SCANNABLE_TARGETS.find((t) => t.id === selectedTargetId) || SCANNABLE_TARGETS[0];
  const matchedArtifact = ARTIFACTS.find((a) => a.id === activeTarget.artifactId);

  // Compute simulated TFLite / ARCore confidence score based on wear and lighting glare
  const rawConfidence =
    scanPipeline === 'coin_tflite'
      ? Math.max(32, Math.round(98 - coinWearPercent * 0.45 - specularGlare * 0.5))
      : Math.max(65, Math.round(99 - specularGlare * 0.3));
  const effectiveConfidence = qrFallbackUsed ? 100 : rawConfidence;
  const fallbackTriggered = effectiveConfidence < 70;

  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraActive(false);
      return;
    }
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch {
      setCameraError(
        'Camera permission unavailable in this browser sandbox—using Interactive Optical Testbed below.'
      );
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Architecture Header explaining why Coins & Textbook Images use two distinct pipelines */}
      <div className="bg-[#F5F1E8] border border-stone-300 p-6 lg:p-8">
        <div className="text-xs font-mono-tabular text-stone-500 uppercase tracking-widest">
          PHASE 5 DELIVERABLE · DUAL AR &amp; COMPUTER VISION PIPELINE
        </div>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <h1 className="text-3xl font-display font-semibold text-stone-900">
              AR Monument, NCERT Textbook &amp; On-Device Coin Scanner Lab
            </h1>
            <p className="text-sm text-stone-700 mt-2 max-w-2xl leading-relaxed">
              Standard AR image tracking works well on flat, feature-rich NCERT textbook illustrations and monument plaques, but fails on small, worn, or shiny metallic coins. Kaalchakra separates them into two specialized pipelines with built-in rural/museum fallbacks.
            </p>
          </div>

          <button
            onClick={toggleCamera}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0"
          >
            {cameraActive ? (
              <>
                <StopCircle className="w-4 h-4 text-red-400" /> Stop Live Camera
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" /> Test Live Device Camera
              </>
            )}
          </button>
        </div>

        {cameraError && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-700/40 text-xs text-amber-950">
            {cameraError}
          </div>
        )}

        {/* Pipeline Switcher */}
        <div className="pt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sound.playTap();
              setScanPipeline('coin_tflite');
              setSelectedTargetId('scan-karshapana');
              setQrFallbackUsed(false);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors ${
              scanPipeline === 'coin_tflite'
                ? 'bg-[#9A3412] text-white'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Coins className="w-4 h-4" /> Pipeline A: On-Device Coin Classifier (TensorFlow Lite)
          </button>
          <button
            onClick={() => {
              sound.playTap();
              setScanPipeline('textbook_image');
              setSelectedTargetId('scan-sarnath');
              setQrFallbackUsed(false);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors ${
              scanPipeline === 'textbook_image'
                ? 'bg-[#9A3412] text-white'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Pipeline B: NCERT Textbook &amp; Monument Image Tracking
          </button>
        </div>
      </div>

      {/* Main Two-Column Scanner Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-stone-300 p-6 lg:p-8">
        {/* Left 7 Cols: Optical Viewfinder & Wear/Glare Stress Tester */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-display font-semibold text-stone-900">
              {scanPipeline === 'coin_tflite'
                ? 'On-Device Coin Classifier Viewfinder (Worn / Shiny / Angled Coins)'
                : 'Feature-Point Image Tracker (NCERT Textbook & Monument Plaques)'}
            </h2>
            <span className="text-xs font-mono-tabular text-stone-500">
              MODEL: {scanPipeline === 'coin_tflite' ? 'KAALCHAKRA-COIN-INT8.TFLITE (1.8 MB)' : 'ARCORE-2D-REFERENCE-LIB'}
            </span>
          </div>

          {/* Target Specimen Selector */}
          <div className="flex flex-wrap gap-2">
            {SCANNABLE_TARGETS.filter((t) => t.category === scanPipeline).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedTargetId(t.id);
                  setQrFallbackUsed(false);
                }}
                className={`px-3 py-2 text-xs font-medium border transition-colors ${
                  selectedTargetId === t.id
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-[#FBF9F5] text-stone-800 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Viewfinder Frame */}
          <div className="relative bg-stone-900 p-6 border border-stone-800 overflow-hidden">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover border border-amber-400/50"
              />
            ) : (
              <div
                className="relative transition-all duration-200"
                style={{
                  filter: `contrast(${100 - coinWearPercent * 0.35}%) brightness(${100 + specularGlare * 0.4}%)`,
                }}
              >
                <ArtifactIllustration
                  type={activeTarget.illustrationType}
                  className="w-full h-60"
                />
              </div>
            )}

            {/* Viewfinder HUD Overlay */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-stone-200">
              <div>
                CONFIDENCE:{' '}
                <span
                  className={
                    effectiveConfidence >= 70 ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'
                  }
                >
                  {effectiveConfidence}% ({effectiveConfidence >= 70 ? '● IDENTIFIED' : '▲ LOW CONFIDENCE — FALLBACK READY'})
                </span>
              </div>
              <div>TOKEN: {activeTarget.qrCodeToken}</div>
            </div>
          </div>

          {/* Environmental Stress Sliders (Phase 5 Step 21 & 22: Worn coins, lighting angles, fallbacks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F5F1E8] border border-stone-300">
            <div>
              <div className="flex justify-between text-xs font-mono-tabular mb-1">
                <label htmlFor="wear-slider" className="font-medium text-stone-800">
                  Surface Wear / Circulation Patina:
                </label>
                <span className="font-semibold text-stone-900">{coinWearPercent}% Worn</span>
              </div>
              <input
                id="wear-slider"
                type="range"
                min={0}
                max={85}
                value={coinWearPercent}
                onChange={(e) => {
                  setCoinWearPercent(Number(e.target.value));
                  setQrFallbackUsed(false);
                }}
                className="w-full accent-stone-900"
              />
              <div className="text-[11px] text-stone-600 mt-1">
                Test how worn edges affect classification confidence (&gt;65% wear triggers Fallback).
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-tabular mb-1">
                <label htmlFor="glare-slider" className="font-medium text-stone-800">
                  Metallic Specular Glare / Angle:
                </label>
                <span className="font-semibold text-stone-900">{specularGlare}% Glare</span>
              </div>
              <input
                id="glare-slider"
                type="range"
                min={0}
                max={80}
                value={specularGlare}
                onChange={(e) => {
                  setSpecularGlare(Number(e.target.value));
                  setQrFallbackUsed(false);
                }}
                className="w-full accent-stone-900"
              />
              <div className="text-[11px] text-stone-600 mt-1">
                Shiny gold/silver coins reflect harsh room lights; tilt 15° or use Museum QR Fallback.
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Classification Result & Mandatory 3-Tier Fallback System */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-6">
          <div className="space-y-4">
            <div className="text-xs font-mono-tabular text-stone-500">
              RECOGNITION &amp; FALLBACK ENGINE (PHASE 5 STEP 22)
            </div>
            <h3 className="text-xl font-display font-semibold text-stone-900">
              {activeTarget.name}
            </h3>
            <div className="text-xs text-stone-600 font-mono-tabular">
              {activeTarget.ncertPageRef}
            </div>

            {fallbackTriggered ? (
              <div className="p-4 bg-amber-50 border border-amber-700/50 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Low Optical Confidence ({effectiveConfidence}%): Phase 5 Fallback Protocol Activated
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>Hint:</strong> Shiny or heavily worn coins can obscure micro-punches. Try reducing glare below 40%, or use one of the two guaranteed fallbacks below:
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() => {
                      sound.playUnlock();
                      setQrFallbackUsed(true);
                      onUnlockArtifact(activeTarget.artifactId);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
                  >
                    <QrCode className="w-3.5 h-3.5" /> Scan Museum QR ({activeTarget.qrCodeToken})
                  </button>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setCoinWearPercent(15);
                      setSpecularGlare(10);
                    }}
                    className="px-3 py-2 border border-stone-300 bg-white text-stone-800 text-xs font-medium hover:bg-stone-100"
                  >
                    Auto-Correct Lighting &amp; Angle
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50/80 border border-emerald-800/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Specimen Identified ({effectiveConfidence}% Match Confidence)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700 list-disc pl-4">
                  {activeTarget.featuresDetected.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {matchedArtifact && (
            <div className="p-4 bg-[#F5F1E8] border border-stone-300 space-y-3">
              <div className="text-xs font-mono-tabular text-stone-600">
                LINKED MUSEUM ACCESSION: {matchedArtifact.accessionNumber}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {matchedArtifact.epistemology.knownFromEvidence}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    sound.playUnlock();
                    onUnlockArtifact(matchedArtifact.id);
                    onInspectArtifact(matchedArtifact);
                  }}
                  className="px-4 py-2 bg-[#9A3412] text-white text-xs font-semibold hover:bg-[#7C2D12] transition-colors"
                >
                  Add to Virtual Museum &amp; View Full Record →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
