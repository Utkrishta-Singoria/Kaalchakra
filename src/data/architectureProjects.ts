export interface TechStackChoice {
  layer: string;
  choice: string;
  rationale: string;
  tradeOff: string;
  alternativesConsidered: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sub: string;
  tier: 'client' | 'edge' | 'backend' | 'storage' | 'external';
  x: number;
  y: number;
  connections: string[];
  latency: string;
  throughput: string;
  protocols: string;
}

export interface RoadmapPhase {
  phaseNum: number;
  name: string;
  duration: string;
  milestones: string[];
  deliverables: string[];
  risksAddressed: string[];
  teamAllocation: string[];
}

export interface RiskItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  category: 'Technical' | 'Content/Accuracy' | 'Regulatory' | 'Infrastructure';
  impactDescription: string;
  mitigationStrategy: string;
  owner: string;
}

export interface GeneratedCodeFile {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export interface ProjectArchitecture {
  id: string;
  title: string;
  tagline: string;
  category: string;
  clientOrganization: string;
  problemStatementId?: string;
  executiveSummary: string;
  keyConstraints: string[];
  targetAudience: string;
  recommendedStack: TechStackChoice[];
  nodes: ArchitectureNode[];
  roadmap: RoadmapPhase[];
  risks: RiskItem[];
  codeScaffolds: GeneratedCodeFile[];
  databaseSchema: string;
  interactiveDemoType: 'game_engine' | 'realtime_telemetry' | 'saas_rbac';
}

export const ARCHITECTURE_PROJECTS: ProjectArchitecture[] = [
  {
    id: 'aicte-26208',
    title: 'Kaalchakra — Civilizational History & Gaming Engine',
    tagline: 'Transforming ancient Indian history, numismatics, and archaeology into distinct 2D game loops, on-device AR, and educator telemetry.',
    category: 'Educational Gaming & Computer Vision',
    clientOrganization: 'AICTE / MIC-Student Innovation (Problem Statement 26208)',
    problemStatementId: '26208',
    executiveSummary:
      'A mobile-first, low-bandwidth gaming and museum suite addressing the AICTE challenge to build games based on Indian civilization, history, and culture. Spanning 6 eras with distinct gameplay mechanics (Harappan: BUILD, Vedic: DECIDE, Mauryan: GOVERN, Gupta: DISCOVER, Medieval: TRADE+BUILD, Freedom: PARTICIPATE), dual-pipeline AR scanning (TFLite for worn coins, ARCore for textbook figures), and asynchronous multiplayer guild trade.',
    keyConstraints: [
      'Mobile-first, Android-first (Dominant in India; supports budget Android 8+ devices with 3 GB RAM)',
      'Low-bandwidth & offline-first: Addressables CDN downloads eras individually (2–3 MB each)',
      'Dual AR: Optical tracking handles flat book illustrations well, but worn shiny coins require custom TFLite classifier',
      'Child safety: India DPDP Act compliance, parental consent gates, zero third-party behavioral ads, preset diplomatic chat only',
      'Historical accuracy guardrail: Mandatory historian and teacher sign-off before content release',
    ],
    targetAudience: 'Classes 6–10 students, history teachers, museum visitors, and NCERT curriculum learners',
    recommendedStack: [
      {
        layer: 'Game Engine',
        choice: 'Unity (LTS) + C# / WebGL Light Canvas',
        rationale: 'Mature 2D puzzle tooling, unified Android/iOS deployment, lightweight 2D sprite memory footprint for budget devices.',
        tradeOff: 'Higher initial build size if unoptimized; mitigated by stripping unused engine modules and using Addressables.',
        alternativesConsidered: ['Unreal Engine 5 (too heavy for budget phones)', 'Custom WebGL/Three.js (longer AR integration cycle)'],
      },
      {
        layer: 'AR: Monuments & Textbooks',
        choice: 'AR Foundation (ARCore / ARKit) 2D Image Tracking',
        rationale: 'Flawlessly identifies feature-rich NCERT textbook illustrations, diagrams, and high-contrast monument plaques.',
        tradeOff: 'Fails on small, worn, shiny, non-planar coins.',
        alternativesConsidered: ['Vuforia (costly licensing)', 'OpenCV ORB descriptors (higher CPU overhead)'],
      },
      {
        layer: 'AR: Ancient Coins',
        choice: 'Custom On-Device Classifier (TensorFlow Lite INT8)',
        rationale: 'Trained on multi-angle, multi-lighting photos of worn punch-marked and die-struck coins. 1.8 MB quantized model executes in <65ms.',
        tradeOff: 'Requires curated labeled training dataset and optical fallback mechanisms when wear exceeds 70%.',
        alternativesConsidered: ['Cloud Vision API (requires persistent high-speed internet, fails in rural schools)'],
      },
      {
        layer: 'Backend & Async Sync',
        choice: 'Firebase Firestore + Cloud Functions (MVP)',
        rationale: 'Fast to deploy, cost-efficient free tier, seamless offline persistence and asynchronous turn sync for school trade offers.',
        tradeOff: 'NoSQL requires deliberate denormalization for complex leaderboards.',
        alternativesConsidered: ['Nakama / Photon (overkill for turn-based async trade)', 'Self-hosted PostgreSQL (higher DevOps overhead)'],
      },
      {
        layer: 'Content Delivery',
        choice: 'Unity Addressables + Global Edge CDN',
        rationale: 'Separates the 6 eras into independent downloadable asset bundles, keeping the initial app install under 30 MB.',
        tradeOff: 'Requires bundle versioning and caching logic.',
        alternativesConsidered: ['Monolithic APK (bloats app to >150 MB, fails rural download thresholds)'],
      },
      {
        layer: 'Content Management (CMS)',
        choice: 'Headless CMS (Strapi) with Dual Sign-Off Workflow',
        rationale: 'Historians and teachers can write, audit, and approve facts, cards, and puzzles without pushing new app binary releases.',
        tradeOff: 'Requires schema sync between CMS JSON and client data models.',
        alternativesConsidered: ['Hardcoded game JSON (requires full app re-compilation for single typo fixes)'],
      },
    ],
    nodes: [
      {
        id: 'node-client',
        label: 'Mobile Client (Unity / WebGL)',
        sub: 'Android 8+ / 3 GB RAM Budget Target',
        tier: 'client',
        x: 100,
        y: 180,
        connections: ['node-cdn', 'node-tflite', 'node-firebase'],
        latency: '<16ms (60 FPS)',
        throughput: 'Local Frame Render',
        protocols: 'C# / WebAssembly / Canvas',
      },
      {
        id: 'node-tflite',
        label: 'On-Device TFLite Classifier',
        sub: 'Numismatic Coin Model (INT8)',
        tier: 'edge',
        x: 360,
        y: 80,
        connections: ['node-client'],
        latency: '45–65ms inference',
        throughput: 'On-Device Zero Data Cost',
        protocols: 'NNAPI / WebGL Shader',
      },
      {
        id: 'node-cdn',
        label: 'Addressables CDN',
        sub: 'Per-Era Asset Bundles (2–3 MB)',
        tier: 'storage',
        x: 360,
        y: 280,
        connections: ['node-client', 'node-cms'],
        latency: '~120ms (Edge PoP)',
        throughput: 'HTTP/3 Compressed Assets',
        protocols: 'HTTPS / Brotli',
      },
      {
        id: 'node-cms',
        label: 'Headless CMS (Strapi)',
        sub: 'Historian & Teacher Sign-off Gate',
        tier: 'backend',
        x: 640,
        y: 280,
        connections: ['node-cdn'],
        latency: 'Webhooks on Publish',
        throughput: 'JSON Manifests',
        protocols: 'REST / GraphQL / OAuth',
      },
      {
        id: 'node-firebase',
        label: 'Async Cloud Sync',
        sub: 'Firestore & Cloud Functions',
        tier: 'backend',
        x: 640,
        y: 140,
        connections: ['node-client', 'node-db'],
        latency: 'Asynchronous Background Sync',
        throughput: 'Offline-First Queue',
        protocols: 'gRPC / WebSocket Stream',
      },
      {
        id: 'node-db',
        label: 'Player State & Telemetry',
        sub: 'NCERT Pre/Post Mastery Datastore',
        tier: 'storage',
        x: 900,
        y: 140,
        connections: [],
        latency: '<50ms read/write',
        throughput: 'NoSQL Document Store',
        protocols: 'TLS Encrypted / DPDP Gated',
      },
    ],
    roadmap: [
      {
        phaseNum: 0,
        name: 'Validate & Scope',
        duration: 'Weeks 1–3',
        milestones: ['Map NCERT Classes 6–10 learning objectives', 'Interview 15 students and 5 teachers', 'Define MVP: Indus Valley era with 3 puzzles & 20 artifact cards', 'Set 30 MB base download budget'],
        deliverables: ['PRD Document', 'Curriculum Mapping Matrix', 'Low-End Device Spec Target (Android 8+, 3GB RAM)'],
        risksAddressed: ['Over-scoping game engine', 'Classroom curriculum disconnect'],
        teamAllocation: ['1 Product Owner', '1 Game Designer', '1 History Consultant'],
      },
      {
        phaseNum: 1,
        name: 'Content & Game Design Pipeline',
        duration: 'Weeks 2–8',
        milestones: ['Draft Game Design Document with 6 distinct era mechanics', 'Source image licenses from ASI, National Museum, RBI Museum', 'Establish Historian Sign-Off Review Protocol', 'Paper prototype test with students'],
        deliverables: ['GDD v1.0', 'Content Pipeline Spec', 'Pedagogical Rubric', 'Paper Prototype Test Report'],
        risksAddressed: ['Accuracy vs Fun risk', 'Cultural sensitivity risk'],
        teamAllocation: ['1 Game Designer', '2 2D Artists', '2 Historian Consultants'],
      },
      {
        phaseNum: 2,
        name: 'Technical Foundation & Privacy Baseline',
        duration: 'Weeks 4–6',
        milestones: ['Set up Unity/WebGL core repository & CI/CD build matrix', 'Implement Guest-First Auth & offline save system', 'Scaffold English + Hindi localization engine', 'Implement India DPDP Act compliance controls (no behavioral ad SDKs)'],
        deliverables: ['Core Engine Shell', 'Bilingual Translation Scaffolding', 'Parental Consent Flow', 'Analytics Event Spec'],
        risksAddressed: ['Child privacy violations', 'Language exclusivity in rural areas'],
        teamAllocation: ['2 Unity Developers', '1 Backend Engineer', '1 DevOps Engineer'],
      },
      {
        phaseNum: 3,
        name: 'Vertical Slice: Indus Valley (Harappan)',
        duration: 'Weeks 6–12',
        milestones: ['Build Harappan Era Hub & Drainage System Puzzle', 'Implement Binary Chert Weight Trading pan balance', 'Build 2D Virtual Museum Gallery with Epistemological Tri-Lens', 'Playtest with 25 middle school students'],
        deliverables: ['Playable Harappan Vertical Slice', '20 Interactive Artifact Cards', 'Museum Share Feature', 'Playtest Iteration Log'],
        risksAddressed: ['Mechanics feel too educational or tedious', 'Performance drops on budget phones'],
        teamAllocation: ['2 Unity Developers', '1 UI/2D Artist', '1 QA Tester'],
      },
      {
        phaseNum: 4,
        name: 'Core Gameplay Expansion & Teacher Mode',
        duration: 'Weeks 12–20',
        milestones: ['Implement Vedic (DECIDE), Mauryan (GOVERN), Gupta (DISCOVER), Medieval (TRADE+BUILD), and Freedom (PARTICIPATE) engines', 'Deploy Teacher Mode with class codes and homework assignments', 'Integrate Strapi Headless CMS with Addressables bundle export'],
        deliverables: ['6 Era Game Modes', 'Teacher Analytics Dashboard', 'CMS Remote Publishing Pipeline'],
        risksAddressed: ['Repetitive gameplay burnout', 'Teacher adoption barriers'],
        teamAllocation: ['2 Unity Developers', '1 Backend Developer', '1 CMS Specialist'],
      },
      {
        phaseNum: 5,
        name: 'AR Scanner & On-Device TFLite Model',
        duration: 'Weeks 16–26',
        milestones: ['Integrate ARCore image tracking for NCERT textbook plates', 'Train and quantize TFLite INT8 ancient coin classifier on 3,000 multi-angle coin shots', 'Implement 3-tier Fallback Engine (Lighting hint, manual filter, Museum QR)', 'Field pilot at National Museum / Heritage site'],
        deliverables: ['TFLite Numismatic Model (1.8 MB)', 'AR Scanner Module', 'Fallback QR System', 'Field Test Accuracy Report (>92%)'],
        risksAddressed: ['Worn coin optical scanning failure', 'Low-light museum failures'],
        teamAllocation: ['1 AR/CV Engineer', '1 ML Specialist', '1 3D/Tech Artist'],
      },
      {
        phaseNum: 6,
        name: 'Build Your Kingdom: Guild Economy & Async Trade',
        duration: 'Weeks 22–32',
        milestones: ['Balance historical guild economy (Shreni, Ayyavole, Bhaga taxation)', 'Implement asynchronous inter-school caravan trading', 'Build Child-Safe Preset Envoy Chat (Zero free-text chat for minors)', 'Tune balance via student analytics'],
        deliverables: ['Kingdom Guild Engine', 'Async Firestore Sync Layer', 'Content Moderation & Report Tool'],
        risksAddressed: ['Cyberbullying / safety of minors', 'Network latency in rural areas'],
        teamAllocation: ['1 Game Designer', '1 Backend Engineer', '1 Frontend Developer'],
      },
      {
        phaseNum: 7,
        name: 'Hardening & Low-End Optimization',
        duration: 'Weeks 30–36',
        milestones: ['Texture compression (ASTC/ETC2) and memory footprint profiling (<220 MB RAM)', 'Full academic content audit with external historians', 'Security, penetration, and child-data audit', 'Closed beta on Google Play Internal Track'],
        deliverables: ['Optimized APK/PWA (<30 MB Base)', 'Signed Historian Audit Certificate', 'Security Audit Report'],
        risksAddressed: ['Device crashes on 3GB RAM', 'Historical inaccuracies'],
        teamAllocation: ['1 Performance Engineer', '1 Security Consultant', '2 Historian Reviewers'],
      },
      {
        phaseNum: 8,
        name: 'Pilot School Launch & Learning Impact Study',
        duration: 'Weeks 36–44',
        milestones: ['Pilot rollout across 5 schools (Kendriya Vidyalaya & State Boards) and 1 museum partner', 'Collect pre/post-play concept retention metrics across NCERT chapters', 'Soft launch on Google Play in pilot state', 'Establish teacher crash monitoring and feedback loop'],
        deliverables: ['Impact Study Whitepaper (Pre/Post Delta)', 'Production Release v1.0', 'Teacher Onboarding Kit'],
        risksAddressed: ['User drop-off after single session', 'Unreported client exceptions'],
        teamAllocation: ['Full Team (Maintenance & Scaling)'],
      },
      {
        phaseNum: 9,
        name: 'Scale & Regional Localization',
        duration: 'Post-Launch',
        milestones: ['Roll out additional regional languages (Tamil, Marathi, Bengali, Telugu)', 'Expand CMS for community museum additions', 'Build state education department aggregate analytics'],
        deliverables: ['Multilingual Era Packs', 'Government Dashboard', 'iOS Port'],
        risksAddressed: ['Regional language accessibility barriers'],
        teamAllocation: ['Ongoing Product Team'],
      },
    ],
    risks: [
      {
        id: 'risk-1',
        title: 'Accuracy vs. Fun Dissonance',
        severity: 'High',
        likelihood: 'Medium',
        category: 'Content/Accuracy',
        impactDescription: 'Game mechanics could trivialize historical facts or become dry quizzes if not thoughtfully balanced.',
        mitigationStrategy: 'Mandatory 2-stage Historian Sign-Off step in the CMS; playtest every mechanic with 20+ students to ensure cognitive engagement without inventing unverified artifacts.',
        owner: 'Lead Game Designer & Historian Consultant',
      },
      {
        id: 'risk-2',
        title: 'Ancient Coin Optical Recognition Failure',
        severity: 'High',
        likelihood: 'High',
        category: 'Technical',
        impactDescription: 'Traditional AR image tracking handles flat book pages well, but fails on worn, reflective, small metallic coins under varied classroom lighting.',
        mitigationStrategy: 'Deploy custom on-device quantized TFLite INT8 model trained on worn coin photographs; enforce 3-tier fallback protocol (Lighting guidance, manual selector, Museum QR code).',
        owner: 'Computer Vision & ML Engineer',
      },
      {
        id: 'risk-3',
        title: 'Cultural Sensitivity & Regional Representation',
        severity: 'High',
        likelihood: 'Low',
        category: 'Content/Accuracy',
        impactDescription: 'Portrayal of historical rulers, religious traditions, or regional kingdoms could spark controversy if handled monolithically.',
        mitigationStrategy: 'Explicitly frame Medieval India as diverse regional cultures (Chola, Vijayanagara, Sultanate, Mughal) and separate Known Evidence from Scholarly Debates using the Epistemological Tri-Lens.',
        owner: 'Academic Review Board',
      },
      {
        id: 'risk-4',
        title: 'Hardware Constraints on Budget Android Phones',
        severity: 'Medium',
        likelihood: 'High',
        category: 'Infrastructure',
        impactDescription: 'Target users in Tier 2/3 Indian cities use phones with 2–3 GB RAM and slow 3G/4G connectivity.',
        mitigationStrategy: '2D illustrated vector art style instead of heavy 3D meshes; Addressables on-demand era downloads (2–3 MB each); ASTC texture compression; base package under 30 MB.',
        owner: 'Lead Unity Engineer',
      },
      {
        id: 'risk-5',
        title: 'Child Data Privacy & India DPDP Act Compliance',
        severity: 'High',
        likelihood: 'Low',
        category: 'Regulatory',
        impactDescription: 'Collecting behavioral metrics or student chats without verifiable parental consent violates children data regulations.',
        mitigationStrategy: 'Strict child-safety baseline: Guest-first local storage, zero behavioral tracking or advertising SDKs, preset diplomatic chat only (zero free text), class codes without personal identifiers.',
        owner: 'Legal Advisor & Security Lead',
      },
    ],
    codeScaffolds: [
      {
        filename: 'src/contracts/HistoricalEngine.ts',
        language: 'typescript',
        description: 'Core TypeScript state machine contract defining era mechanics and epistemological classifications.',
        code: `export type EraGameplayVerb = 'BUILD' | 'DECIDE' | 'GOVERN' | 'DISCOVER' | 'TRADE_BUILD' | 'PARTICIPATE';

export interface EpistemologicalTriLens {
  knownFromEvidence: string;      // Physical excavation / epigraphic proof
  scholarlyInterpretation: string;// Peer-reviewed historical synthesis
  stillDebated: string;           // Open questions & uncertainties
}

export interface EraEngineState {
  eraId: string;
  gameplayVerb: EraGameplayVerb;
  cityHygieneScore?: number;
  sabhaConsensusRatio?: number;
  bhagaTaxRate?: number;
  astronomicalPiComputed?: number;
  stepwellHydraulicBalance?: number;
  clandestineRelayActive?: boolean;
}

export interface ArtifactCardEntity {
  id: string;
  accessionNumber: string;
  sourceInstitution: 'ASI' | 'National Museum' | 'NCERT' | 'RBI Monetary Museum';
  title: string;
  period: string;
  material: string;
  epistemology: EpistemologicalTriLens;
  historianSignOffBy: string;
  verifiedAt: string;
}`,
      },
      {
        filename: 'src/ml/CoinClassifierTFLite.ts',
        language: 'typescript',
        description: 'On-device TFLite model runner with confidence grading and automatic 3-tier fallback trigger.',
        code: `export interface ClassifierResult {
  coinId: string;
  confidence: number;
  features: string[];
  fallbackRequired: boolean;
  suggestedAction?: 'TRY_AGAIN_LIGHTING' | 'MANUAL_FILTER' | 'SCAN_QR_ALTERNATIVE';
}

export class CoinClassifierEngine {
  private static CONFIDENCE_THRESHOLD = 0.70;

  public static evaluateFrame(featuresFound: number, wearLevel: number, glare: number): ClassifierResult {
    // Simulated inference based on optical feature extraction
    const rawScore = 1.0 - (wearLevel * 0.005) - (glare * 0.004);
    const confidence = Math.max(0.2, Math.min(0.99, rawScore));

    if (confidence < this.CONFIDENCE_THRESHOLD) {
      return {
        coinId: 'unknown',
        confidence,
        features: ['Low edge contrast', 'Specular hotspot detected'],
        fallbackRequired: true,
        suggestedAction: glare > 35 ? 'TRY_AGAIN_LIGHTING' : 'SCAN_QR_ALTERNATIVE'
      };
    }

    return {
      coinId: 'karshapana_32_rattis',
      confidence,
      features: ['5 micro-punches detected', 'Irregular rectangular silver flan', 'Sun & Shadarachakra'],
      fallbackRequired: false
    };
  }
}`,
      },
      {
        filename: 'src/api/routes/cmsReviewRouter.ts',
        language: 'typescript',
        description: 'Express REST router handling the dual-stage historian and teacher sign-off pipeline.',
        code: `import { Router, Request, Response } from 'express';

export const cmsReviewRouter = Router();

cmsReviewRouter.post('/artifacts/:id/sign-off', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewerRole, reviewerCredential, citationVerification, sensitivityConfirmed } = req.body;

  if (!reviewerCredential || !citationVerification || !sensitivityConfirmed) {
    return res.status(400).json({ error: 'All compliance verification checkboxes required.' });
  }

  // Record audit log and trigger Addressables CDN bundle rebuild
  const auditStamp = {
    artifactId: id,
    signOffBy: reviewerCredential,
    role: reviewerRole,
    signedAt: new Date().toISOString(),
    status: 'PUBLISHED_TO_CDN'
  };

  return res.json({ success: true, auditStamp });
});`,
      },
    ],
    databaseSchema: `// Prisma Schema: Kaalchakra System Architecture
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum EraType {
  HARAPPAN
  VEDIC
  MAURYAN
  GUPTA
  MEDIEVAL
  FREEDOM_STRUGGLE
}

enum SourceArchive {
  ASI
  NATIONAL_MUSEUM
  NCERT
  RBI_MONETARY_MUSEUM
}

enum ReviewStatus {
  DRAFT
  PENDING_HISTORIAN_AUDIT
  APPROVED_PUBLISHED
  FLAGGED_CITATION_CHECK
}

model Artifact {
  id                  String        @id @default(cuid())
  accessionNumber     String        @unique
  era                 EraType
  title               String
  period              String
  site                String
  material            String
  sourceInstitution   SourceArchive
  ncertChapterRef     String
  knownEvidence       String
  scholarlyHypothesis String
  stillDebatedNotes   String
  reviewStatus        ReviewStatus  @default(DRAFT)
  historianSignOff    String?
  bundleAssetUri      String
  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt
}

model StudentSession {
  id              String   @id @default(cuid())
  classCode       String   @index
  anonymousSeed   String
  eraUnlocked     EraType[]
  prePlayMastery  Float    @default(0.0)
  postPlayMastery Float    @default(0.0)
  lastSyncedAt    DateTime @default(now())
}

model TradeOffer {
  id               String   @id @default(cuid())
  fromSchoolCode   String
  guildName        String
  offeredItem      String
  requestedItem    String
  presetMessage    String
  fulfilled        Boolean  @default(false)
  moderationFlag   Boolean  @default(false)
  createdAt        DateTime @default(now())
}`,
    interactiveDemoType: 'game_engine',
  },
  {
    id: 'healthcare-fhir-exchange',
    title: 'HealthBridge — Multi-Tenant FHIR Health Data Exchange',
    tagline: 'End-to-end encrypted medical telemetry & longitudinal patient record integration conforming to ABDM & HIPAA.',
    category: 'Healthcare & Interoperability',
    clientOrganization: 'Ayushman Bharat Digital Mission (ABDM) / Hospital Consortia',
    executiveSummary:
      'A federated FHIR R4 interoperability layer connecting hospital electronic health records (EHRs), diagnostic labs, and patient consent managers. Uses asymmetric envelope encryption and edge tokenization to ensure zero plain-text storage of Protected Health Information (PHI).',
    keyConstraints: [
      'Zero-knowledge PHI: All client medical payloads encrypted using recipient public keys before transit',
      'Millisecond consent check: High-throughput OIDC consent token validation (<25ms)',
      'Audit immutability: Append-only cryptographic audit ledger for every doctor/patient record access',
    ],
    targetAudience: 'Hospital networks, telemedicine clinics, and national health authorities',
    recommendedStack: [
      {
        layer: 'API Gateway',
        choice: 'Envoy / Kong API Gateway with mTLS',
        rationale: 'Hardware-accelerated TLS termination, rate limiting, and automated OAuth2 token introspection.',
        tradeOff: 'Configuration complexity.',
        alternativesConsidered: ['AWS API Gateway (vendor lock-in, latency across hybrid on-prem hospital clusters)'],
      },
      {
        layer: 'Data Pipeline',
        choice: 'Apache Kafka + Apache Flink',
        rationale: 'Real-time FHIR event streaming, deduplication of laboratory reports, and out-of-order event reconciliation.',
        tradeOff: 'Requires dedicated Zookeeper/KRaft operational maintenance.',
        alternativesConsidered: ['RabbitMQ (insufficient durable playback for audit replays)'],
      },
      {
        layer: 'Storage Layer',
        choice: 'PostgreSQL + TimescaleDB for telemetry + MinIO Encrypted Blobs',
        rationale: 'Relational ACID compliance for patient master index; object storage for DICOM imaging files.',
        tradeOff: 'Requires automated key rotation daemon.',
        alternativesConsidered: ['MongoDB (weaker relational guarantees across clinical patient graphs)'],
      },
    ],
    nodes: [
      {
        id: 'node-client-doc',
        label: 'Doctor EMR Portal',
        sub: 'Web PKI Signature Client',
        tier: 'client',
        x: 100,
        y: 120,
        connections: ['node-gateway'],
        latency: '<20ms UI',
        throughput: '100 req/sec',
        protocols: 'HTTPS / mTLS / WebCrypto',
      },
      {
        id: 'node-gateway',
        label: 'FHIR Gateway & Consent Filter',
        sub: 'ABDM Consent Manager Validator',
        tier: 'edge',
        x: 380,
        y: 160,
        connections: ['node-kafka', 'node-auth'],
        latency: '14ms verification',
        throughput: '10,000 req/sec',
        protocols: 'OIDC / JWT / FHIR R4',
      },
      {
        id: 'node-auth',
        label: 'Consent & RBAC Authority',
        sub: 'ABHA Health ID Registry',
        tier: 'backend',
        x: 640,
        y: 80,
        connections: ['node-gateway'],
        latency: '<10ms token check',
        throughput: 'Cached Redis Tokens',
        protocols: 'gRPC / TLS',
      },
      {
        id: 'node-kafka',
        label: 'Clinical Event Pipeline',
        sub: 'Kafka Partitioned Topics',
        tier: 'backend',
        x: 640,
        y: 240,
        connections: ['node-db-clinical', 'node-audit'],
        latency: '<5ms queue dispatch',
        throughput: '40,000 events/sec',
        protocols: 'Kafka Wire Protocol',
      },
      {
        id: 'node-audit',
        label: 'Immutable Audit Ledger',
        sub: 'Append-Only Cryptographic Log',
        tier: 'storage',
        x: 920,
        y: 200,
        connections: [],
        latency: 'Batch commit 1s',
        throughput: 'Merkle Tree Hashes',
        protocols: 'SHA-256 Chain',
      },
      {
        id: 'node-db-clinical',
        label: 'PostgreSQL FHIR Store',
        sub: 'Partitioned by Hospital Tenant',
        tier: 'storage',
        x: 920,
        y: 300,
        connections: [],
        latency: '6ms query',
        throughput: 'Read Replicas Pool',
        protocols: 'Postgres Wire / SSL',
      },
    ],
    roadmap: [
      {
        phaseNum: 1,
        name: 'Consent & FHIR Schema Validation',
        duration: 'Month 1–2',
        milestones: ['FHIR R4 resource definitions', 'OIDC token bridge', 'Zero-knowledge encryption proof-of-concept'],
        deliverables: ['FHIR Specification', 'Security Whitepaper'],
        risksAddressed: ['Data breach vulnerabilities'],
        teamAllocation: ['2 Security Engineers', '2 Backend Engineers'],
      },
      {
        phaseNum: 2,
        name: 'Hospital Pilot & Interoperability Lab',
        duration: 'Month 3–5',
        milestones: ['Connect 3 tier-1 hospital EMRs', 'Audit pipeline verification', 'High-throughput stress test'],
        deliverables: ['Pilot Validation Report', 'SDK v1.0'],
        risksAddressed: ['Hospital legacy system latency'],
        teamAllocation: ['3 Integration Engineers', '1 Clinical Advisor'],
      },
    ],
    risks: [
      {
        id: 'risk-h1',
        title: 'Unauthorized PHI Exposure',
        severity: 'High',
        likelihood: 'Low',
        category: 'Regulatory',
        impactDescription: 'Regulatory penalties under DPDP and HIPAA if medical records are leaked.',
        mitigationStrategy: 'Envelope encryption with hardware security module (HSM) stored master keys and automated tamper alarms.',
        owner: 'Chief Information Security Officer',
      },
    ],
    codeScaffolds: [
      {
        filename: 'src/services/FhirConsentGate.ts',
        language: 'typescript',
        description: 'FHIR consent verification gateway interceptor enforcing ABDM artifact expiry.',
        code: `export class FhirConsentGate {
  public static async verifyConsent(patientAbhaId: string, consentArtifactToken: string): Promise<boolean> {
    const payload = await parseJwt(consentArtifactToken);
    if (new Date(payload.expiresAt) < new Date()) {
      throw new Error('Consent artifact expired.');
    }
    return payload.patientId === patientAbhaId && payload.permissions.includes('VIEW_DIAGNOSTICS');
  }
}`,
      },
    ],
    databaseSchema: `model PatientConsent {
  id              String   @id @default(uuid())
  patientAbhaId   String   @index
  doctorId        String
  purpose         String
  validUntil      DateTime
  grantedScopes   String[]
  signatureHash   String
  createdAt       DateTime @default(now())
}`,
    interactiveDemoType: 'saas_rbac',
  },
  {
    id: 'edge-fleet-iot',
    title: 'AeroPulse — Autonomous Drone Fleet Telemetry & Edge Vision',
    tagline: 'Edge AI processing with ultra-low latency spatial telemetry for industrial facility inspection.',
    category: 'Edge AI & Real-time Robotics',
    clientOrganization: 'Industrial Infrastructure & Solar Farm Monitoring Consortia',
    executiveSummary:
      'High-frequency MQTT telemetry aggregator and computer vision fault detection system for autonomous drone swarms. Combines edge TensorRT inference on Jetson companion computers with intermittent mesh sync to central cloud control stations.',
    keyConstraints: [
      'Sub-50ms collision alert latency',
      'Intermittent connection tolerance: Operates completely offline during remote inspections',
      'Battery-efficient inference: Deep learning models quantized to FP16/INT8 consuming <10 Watts',
    ],
    targetAudience: 'Infrastructure inspection teams, solar farm operators, and autonomous fleet engineers',
    recommendedStack: [
      {
        layer: 'Edge Compute',
        choice: 'NVIDIA Jetson Orin Nano + TensorRT',
        rationale: 'Hardware-accelerated edge inference for crack/hotspot detection in 4K video feeds at 30 FPS.',
        tradeOff: 'Higher BOM hardware cost per drone.',
        alternativesConsidered: ['Raspberry Pi 5 (too slow for real-time 4K defect segmentation)'],
      },
      {
        layer: 'Telemetry Broker',
        choice: 'EMQX / Mosquitto MQTT Broker over QUIC',
        rationale: 'Resilient packet loss recovery over unstable cellular/mesh links.',
        tradeOff: 'Requires QUIC-aware client libraries.',
        alternativesConsidered: ['WebSockets (higher overhead on low-bandwidth satellite links)'],
      },
    ],
    nodes: [
      {
        id: 'node-drone',
        label: 'Autonomous Drone Swarm',
        sub: 'Jetson Orin Edge Inference',
        tier: 'client',
        x: 100,
        y: 160,
        connections: ['node-broker'],
        latency: '30ms onboard CV',
        throughput: '30 FPS local',
        protocols: 'ROS2 / TensorRT',
      },
      {
        id: 'node-broker',
        label: 'MQTT QUIC Broker',
        sub: 'Edge Gateway Cluster',
        tier: 'edge',
        x: 400,
        y: 160,
        connections: ['node-tsdb', 'node-cloud'],
        latency: '8ms dispatch',
        throughput: '50,000 msgs/sec',
        protocols: 'MQTT 5.0 / QUIC',
      },
      {
        id: 'node-tsdb',
        label: 'TimescaleDB / InfluxDB',
        sub: 'Flight Telemetry & Geospatial Points',
        tier: 'storage',
        x: 700,
        y: 240,
        connections: [],
        latency: 'Batch ingestion 5ms',
        throughput: 'Timeseries Metrics',
        protocols: 'Postgres / SQL',
      },
      {
        id: 'node-cloud',
        label: 'Cloud Fleet Mission Control',
        sub: 'Global Map & Mission Replay',
        tier: 'backend',
        x: 700,
        y: 100,
        connections: [],
        latency: '<100ms real-time map',
        throughput: 'Streaming WebSockets',
        protocols: 'gRPC / TLS',
      },
    ],
    roadmap: [
      {
        phaseNum: 1,
        name: 'Edge Vision & Collision Avoidance',
        duration: 'Weeks 1–6',
        milestones: ['TensorRT defect detection model', 'ROS2 edge node integration', 'Simulation bench testing'],
        deliverables: ['Model Weights (FP16)', 'Simulation Rig'],
        risksAddressed: ['Model drift under direct sunlight'],
        teamAllocation: ['2 Robotics Engineers', '1 CV Specialist'],
      },
    ],
    risks: [
      {
        id: 'risk-e1',
        title: 'Communication Blackout During Critical Inspection',
        severity: 'High',
        likelihood: 'Medium',
        category: 'Technical',
        impactDescription: 'Loss of telemetry could cause drone drift in GPS-denied indoor environments.',
        mitigationStrategy: 'Onboard visual-inertial odometry (VIO) with autonomous return-to-home and local SSD blackbox logging.',
        owner: 'Flight Control Lead',
      },
    ],
    codeScaffolds: [
      {
        filename: 'src/edge/MqttTelemetryRelay.ts',
        language: 'typescript',
        description: 'MQTT client featuring circular offline buffer and automatic backpressure flushing.',
        code: `export class MqttTelemetryRelay {
  private buffer: Array<{ timestamp: number; payload: string }> = [];

  public publishTelemetry(topic: string, data: object) {
    if (!this.isConnected()) {
      this.buffer.push({ timestamp: Date.now(), payload: JSON.stringify(data) });
      if (this.buffer.length > 5000) this.buffer.shift(); // Evict oldest
      return;
    }
    this.flushBuffer();
    this.client.publish(topic, JSON.stringify(data));
  }
}`,
      },
    ],
    databaseSchema: `CREATE TABLE drone_telemetry (
  time TIMESTAMPTZ NOT NULL,
  drone_id VARCHAR(64) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  altitude_meters REAL,
  battery_percent SMALLINT,
  defect_detected BOOLEAN,
  confidence_score REAL
);
SELECT create_hypertable('drone_telemetry', 'time');`,
    interactiveDemoType: 'realtime_telemetry',
  },
];
