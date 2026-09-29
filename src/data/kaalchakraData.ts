export type EraId =
  | 'harappan'
  | 'vedic'
  | 'mauryan'
  | 'gupta'
  | 'medieval'
  | 'freedom';

export type GameplayVerb =
  | 'BUILD'
  | 'UNDERSTAND / DECIDE'
  | 'GOVERN'
  | 'DISCOVER'
  | 'TRADE + BUILD'
  | 'PARTICIPATE';

export type SourceInstitution =
  | 'ASI'
  | 'National Museum'
  | 'NCERT'
  | 'RBI Monetary Museum';

export interface EpistemologicalTriLens {
  knownFromEvidence: string;
  scholarlyInterpretation: string;
  stillDebated: string;
}

export interface ArtifactCard {
  id: string;
  eraId: EraId;
  accessionNumber: string;
  title: string;
  titleHi: string;
  subtitle: string;
  period: string;
  siteOrOrigin: string;
  material: string;
  dimensions: string;
  sourceInstitution: SourceInstitution;
  ncertMapping: string;
  illustrationType:
    | 'unicorn_seal'
    | 'chert_weights'
    | 'dholavira_signboard'
    | 'pgw_bowl'
    | 'atranjikhera_plough'
    | 'rigveda_manuscript'
    | 'sarnath_capital'
    | 'girnar_rock_edict'
    | 'karshapana_coin'
    | 'gupta_dinara'
    | 'aryabhatiya_folio'
    | 'sarnath_buddha'
    | 'chola_nataraja'
    | 'vijayanagara_varaha'
    | 'rani_ki_vav_carving'
    | 'dandi_salt_archive'
    | 'harijan_newspaper'
    | 'congress_radio_transmitter';
  summary: string;
  epistemology: EpistemologicalTriLens;
  historianVerifiedBy: string;
  bundleSizeKb: number;
  unlockedByDefault?: boolean;
}

export interface EraDefinition {
  id: EraId;
  index: string;
  name: string;
  nameHi: string;
  period: string;
  gameplayVerb: GameplayVerb;
  gameplayVerbHi: string;
  mainIdentity: string;
  ncertAlignment: string;
  bundleSizeMb: string;
  cautionNote: string;
  summary: string;
  subChapters?: string[];
  accentColor: string;
}

export const ERAS: EraDefinition[] = [
  {
    id: 'harappan',
    index: '01',
    name: 'Harappan / Indus Valley',
    nameHi: 'हड़प्पा / सिंधु घाटी सभ्यता',
    period: '2600 – 1900 BCE',
    gameplayVerb: 'BUILD',
    gameplayVerbHi: 'निर्माण और नगर नियोजन (BUILD)',
    mainIdentity: 'City planning · Covered drainage · Standardized weights & trade · Craft specialization',
    ncertAlignment: 'NCERT Class 6 (Ch. 3: In the Earliest Cities) & Class 12 (Themes in Indian History I: Bricks, Beads and Bones)',
    bundleSizeMb: '2.4 MB',
    cautionNote:
      'Epistemological Rule: The Indus script remains undeciphered. We never present a fake "decode the script" puzzle—instead, players examine how seals functioned as mercantile & administrative impressions.',
    summary:
      'Engineer baked-brick urban grids and gravity-fed covered drains at Mohenjo-daro and Dholavira, calibrate binary chert weights at the Lothal dockyard, and investigate archaeological stratigraphy.',
    accentColor: '#9A3412',
  },
  {
    id: 'vedic',
    index: '02',
    name: 'Vedic Age',
    nameHi: 'वैदिक काल',
    period: '1500 – 600 BCE',
    gameplayVerb: 'UNDERSTAND / DECIDE',
    gameplayVerbHi: 'सभा निर्णय और श्रुति स्मृति (DECIDE)',
    mainIdentity: 'Sabha & Samiti assemblies · Oral knowledge (Shruti) · Agro-pastoral community · Early political institutions',
    ncertAlignment: 'NCERT Class 6 (Ch. 4: What Books and Burials Tell Us)',
    bundleSizeMb: '1.9 MB',
    cautionNote:
      'Artifact Integrity Rule: Because early Vedic society relied on perishable timber/thatch and oral transmission, we never invent fictional monuments to pad the museum—only verified Painted Grey Ware (PGW) and early iron archaeology are cataloged.',
    summary:
      'Convene the Sabha and Samiti community councils to balance pastoral cattle wealth and barley/iron-plough agriculture, and master acoustic Shruti pitch-accent memory sequences.',
    accentColor: '#78350F',
  },
  {
    id: 'mauryan',
    index: '03',
    name: 'Mauryan Empire',
    nameHi: 'मौर्य साम्राज्य',
    period: '322 – 185 BCE',
    gameplayVerb: 'GOVERN',
    gameplayVerbHi: 'प्रशासन और धम्म शासन (GOVERN)',
    mainIdentity: 'Imperial administration · Provincial revenue & granaries · Uttarapatha trade · Ashoka’s Rock & Pillar Edicts',
    ncertAlignment: 'NCERT Class 6 (Ch. 7: Ashoka, The Emperor Who Gave Up War) & Class 12 (Kings, Farmers and Towns)',
    bundleSizeMb: '2.8 MB',
    cautionNote:
      'Epigraphic Grounding: Civic dilemmas are resolved directly through documented Prakrit/Brahmi and Kharosthi inscriptions from Girnar, Kalsi, Sarnath, and Sohgaura.',
    summary:
      'Administer four Mauryan provinces (Taxila, Ujjayini, Tosali, Suvarnagiri), maintain famine-relief granaries, connect the Uttarapatha trade artery, and apply Ashoka’s Major Rock Edicts to real governance crises.',
    accentColor: '#1E3A8A',
  },
  {
    id: 'gupta',
    index: '04',
    name: 'Gupta Period',
    nameHi: 'गुप्त काल',
    period: '320 – 550 CE',
    gameplayVerb: 'DISCOVER',
    gameplayVerbHi: 'खोज, खगोल और मुद्रा (DISCOVER)',
    mainIdentity: 'Mathematics & astronomy · Sarnath & Udayagiri sculpture · Classical literature · Royal gold Dinara coinage',
    ncertAlignment: 'NCERT Class 6 (Ch. 10 & 11: New Empires and Kingdoms; Buildings, Paintings and Books)',
    bundleSizeMb: '2.6 MB',
    cautionNote:
      'Scientific Precision: Mathematical and astronomical puzzles use Aryabhata’s documented 499 CE treatise (Aryabhatiya) and authentic RBI Monetary Museum numismatic weight standards.',
    summary:
      'Calculate pi and Earth’s umbra eclipse geometry in Aryabhata’s Kusumapura observatory, reconstruct Sarnath sandstone sculptural proportions, and strike gold Dinara coins at the Royal Mint.',
    accentColor: '#B45309',
  },
  {
    id: 'medieval',
    index: '05',
    name: 'Medieval India (Regional Kingdoms)',
    nameHi: 'मध्यकालीन भारत (क्षेत्रीय राज्य)',
    period: '800 – 1700 CE',
    gameplayVerb: 'TRADE + BUILD',
    gameplayVerbHi: 'व्यापार, स्थापत्य और मुद्रा पहचान (TRADE + BUILD)',
    mainIdentity: 'Multi-kingdom diversity · Stepwells & temple/fort engineering · Maritime & overland markets · Multilingual coinage',
    ncertAlignment: 'NCERT Class 7 (Our Pasts II: New Kings and Kingdoms, Delhi, Mughals, Vijayanagara & Hampi)',
    bundleSizeMb: '3.5 MB',
    cautionNote:
      'Pluralistic Framing: Medieval India was never one monolithic civilization. Gameplay explicitly distinguishes Chola maritime guilds, Vijayanagara markets, Western stepwells, Delhi Sultanate Sarai Adl, and Mughal mints.',
    summary:
      'Engineer subterranean Baoli stepwells and structural arches across regional kingdoms, manage Indian Ocean and inland guild networks, and attribute historical coins by ruler, script, metal, and calligraphy.',
    subChapters: ['Chola Maritime & Temple Guilds', 'Vijayanagara (Hampi) Bazaar & Aqueducts', 'Delhi Sultanate & Western Stepwells', 'Mughal Karkhanas & Silver Rupiya'],
    accentColor: '#14532D',
  },
  {
    id: 'freedom',
    index: '06',
    name: 'Freedom Struggle',
    nameHi: 'स्वतंत्रता संग्राम',
    period: '1857 – 1947 CE',
    gameplayVerb: 'PARTICIPATE',
    gameplayVerbHi: 'जन-भागीदारी और संचार (PARTICIPATE)',
    mainIdentity: 'Grassroots mass participation · Underground communication · Constructive Swadeshi · Salt Satyagraha logistics',
    ncertAlignment: 'NCERT Class 8 (Ch. 9: The Making of the National Movement 1870s–1947) & Class 10 (Nationalism in India)',
    bundleSizeMb: '2.7 MB',
    cautionNote:
      'Perspective Choice: Instead of roleplaying famous leaders, the player acts as an ordinary citizen—a student typesetter, village volunteer, and Khadi weaver coordinating grassroots resistance.',
    summary:
      'Play as an ordinary participant routing underground bulletins and Congress Radio frequencies past colonial censorship, and organize village-by-village logistics along the 240-mile Dandi Salt Satyagraha.',
    accentColor: '#991B1B',
  },
];

export const ARTIFACTS: ArtifactCard[] = [
  // 1. HARAPPAN
  {
    id: 'art-ivc-seal',
    eraId: 'harappan',
    accessionNumber: 'ACC. NM-IVC-001',
    title: 'Steatite Unicorn Seal (Mohenjo-daro)',
    titleHi: 'सेलखड़ी एकशृंगी मुहर (मोहनजोदड़ो)',
    subtitle: 'Intaglio carved merchant seal with undeciphered Indus script',
    period: 'c. 2500–1900 BCE (Mature Harappan)',
    siteOrOrigin: 'Mohenjo-daro, Sindh (DK Area)',
    material: 'Fired white steatite (soapstone) with alkali coating',
    dimensions: '2.9 × 2.9 × 0.8 cm',
    sourceInstitution: 'National Museum',
    ncertMapping: 'Class 6 Ch. 3 & Class 12 Theme 1',
    illustrationType: 'unicorn_seal',
    summary:
      'Pressed into wet clay tags (bullae) tied around bales of cotton and carnelian goods to certify package integrity and sender identity across Mesopotamian and internal Harappan trade routes.',
    epistemology: {
      knownFromEvidence:
        'Carved in reverse (intaglio) on soft steatite then kiln-hardened; clay sealings found at Lothal warehouse bear rope and woven cloth impressions on the back.',
      scholarlyInterpretation:
        'The animal motif likely represented a specific mercantile clan, guild, or administrative office so even non-literate porters could recognize the sender.',
      stillDebated:
        'The 5-character Indus script inscription at the top remains completely undeciphered—scholars debate whether it encodes a Dravidian, Indo-Aryan, or isolate language, or non-linguistic heraldic tokens.',
    },
    historianVerifiedBy: 'Dr. R. Subramanian (Epigraphy & Harappan Archaeology Panel)',
    bundleSizeKb: 140,
    unlockedByDefault: true,
  },
  {
    id: 'art-ivc-weights',
    eraId: 'harappan',
    accessionNumber: 'ACC. ASI-IVC-014',
    title: 'Cubical Chert Binary Weights Set',
    titleHi: 'चर्ट पत्थर के घनाकार बाट (लोथल और हड़प्पा)',
    subtitle: 'Standardized binary-decimal mass system (1 : 2 : 4 : 8 : 16 : 32 : 64)',
    period: 'c. 2400–1900 BCE',
    siteOrOrigin: 'Lothal (Gujarat) & Harappa',
    material: 'Polished banded chert stone',
    dimensions: 'Base unit = 13.63 grams; cubical geometry',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 12 Theme 1 (Section 5: Weights)',
    illustrationType: 'chert_weights',
    summary:
      'Remarkably uniform cubical stone weights discovered across sites separated by over 1,000 km, enabling fair valuation of carnelian beads, lapis lazuli, and precious metals.',
    epistemology: {
      knownFromEvidence:
        'Lower denominations follow a strict binary progression (1, 2, 4, 8, 16, 32, up to 12,800), while higher weights follow the decimal system.',
      scholarlyInterpretation:
        'Such civic standardization across Mohenjo-daro, Harappa, Kalibangan, and Lothal points to strong inter-city commercial regulation or shared municipal norms.',
      stillDebated:
        'Whether standardization was enforced by a centralized state authority or maintained voluntarily by powerful inter-city merchant guilds.',
    },
    historianVerifiedBy: 'Prof. M. Deshpande (ASI Western Circle Reviewer)',
    bundleSizeKb: 115,
    unlockedByDefault: true,
  },
  {
    id: 'art-ivc-dholavira',
    eraId: 'harappan',
    accessionNumber: 'ACC. ASI-IVC-029',
    title: 'Dholavira North Gate Inscription & Water Reservoir Blueprint',
    titleHi: 'धोलावीरा उत्तरी द्वार पट्टिका और जल कुंड प्रणाली',
    subtitle: 'Ten large gypsum-inlaid symbols & rock-cut rainwater harvesting channels',
    period: 'c. 2500–1900 BCE',
    siteOrOrigin: 'Dholavira (Khadir Bet, Rann of Kutch, Gujarat)',
    material: 'Crystalline gypsum paste inlaid on wooden plank (mineralized impression)',
    dimensions: '300 × 37 cm (10 symbols, each ~37 cm high)',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 3 (A Closer Look: Dholavira)',
    illustrationType: 'dholavira_signboard',
    summary:
      'Found fallen inside the chamber of the Northern Gateway of the Dholavira Citadel alongside a monumental network of 16 rock-cut reservoirs capturing seasonal monsoon runoff.',
    epistemology: {
      knownFromEvidence:
        'Excavated by ASI in 1990; each symbol is formed from fitted crystalline gypsum pieces originally mounted on a wooden board above the citadel gate.',
      scholarlyInterpretation:
        'Represents the earliest known public civic signage in South Asia, demonstrating that Indus symbols were displayed publicly, not merely on miniature trade seals.',
      stillDebated:
        'Whether the ten signs spell the ancient toponym of Dholavira, a royal/civic title, or an astronomical calendar marker.',
    },
    historianVerifiedBy: 'Dr. R. Subramanian (Epigraphy & Harappan Archaeology Panel)',
    bundleSizeKb: 165,
  },

  // 2. VEDIC AGE
  {
    id: 'art-ved-pgw',
    eraId: 'vedic',
    accessionNumber: 'ACC. NM-VED-102',
    title: 'Painted Grey Ware (PGW) Ritual & Dining Bowl',
    titleHi: 'चित्रित धूसर मृदभांड (PGW) पात्र',
    subtitle: 'Fine wheel-thrown grey ceramic with black geometric motifs',
    period: 'c. 1200–600 BCE',
    siteOrOrigin: 'Hastinapura & Ahichchhatra (Upper Ganga Doab)',
    material: 'Well-levigated clay fired in reducing kiln conditions (~600°C)',
    dimensions: 'Diameter 18.4 cm, Height 8.2 cm',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 5 (Kingdoms, Kings and an Early Republic)',
    illustrationType: 'pgw_bowl',
    summary:
      'Thin-walled, smooth grey earthenware painted before firing with linear strokes, concentric circles, dots, and swastika motifs, associated with Iron Age settlements in the Indo-Gangetic divide.',
    epistemology: {
      knownFromEvidence:
        'Excavated by B.B. Lal at Hastinapura (1950–52) in strata containing domesticated horse bones, charred barley, rice, and early iron slag.',
      scholarlyInterpretation:
        'Served as deluxe tableware used by elite households or during communal Sabha feasts and domestic rituals in Janapada settlements.',
      stillDebated:
        'The exact one-to-one correlation between PGW archaeological horizons and specific textual lineages mentioned in Later Vedic literature.',
    },
    historianVerifiedBy: 'Dr. A. K. Sharma (NCERT Curriculum Alignment Advisor)',
    bundleSizeKb: 120,
    unlockedByDefault: true,
  },
  {
    id: 'art-ved-iron',
    eraId: 'vedic',
    accessionNumber: 'ACC. ASI-VED-108',
    title: 'Atranjikhera Early Iron Ploughshare & Sickle (Krishi)',
    titleHi: 'अतरंजीखेड़ा का लौह हल-फाल और हँसिया',
    subtitle: 'Early smelted wrought-iron agricultural implements (Shyama Ayas)',
    period: 'c. 1000–700 BCE',
    siteOrOrigin: 'Atranjikhera (Etah District, Uttar Pradesh)',
    material: 'Smelted wrought iron (bloomery furnace)',
    dimensions: 'Length 21.5 cm, Weight 340 g',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 5 (Changes in Agriculture)',
    illustrationType: 'atranjikhera_plough',
    summary:
      'Iron tools referred to in Later Vedic texts as "Shyama Ayas" (dark metal) that enabled communities to turn heavy alluvial clay soils of the Ganga-Yamuna Doab and expand wet-rice cultivation.',
    epistemology: {
      knownFromEvidence:
        'Found alongside smelting furnaces, tuyeres, and iron slag in PGW levels at Atranjikhera and Jakhera.',
      scholarlyInterpretation:
        'The transition from wooden ploughshares (Udumbala) to iron ploughshares generated the agricultural surplus necessary for the rise of Mahajanapadas.',
      stillDebated:
        'Whether iron metallurgy evolved independently across multiple Indian regional centers (Central India, Middle Ganga, South India) or diffused from a single hub.',
    },
    historianVerifiedBy: 'Dr. A. K. Sharma (NCERT Curriculum Alignment Advisor)',
    bundleSizeKb: 130,
  },
  {
    id: 'art-ved-shruti',
    eraId: 'vedic',
    accessionNumber: 'ACC. NM-VED-115',
    title: 'UNESCO Memory of the World Rigveda Birch-Bark & Paper Folio',
    titleHi: 'ऋग्वेद पांडुलिपि पर्ण (पदपाठ और स्वर चिह्न)',
    subtitle: 'Samhita & Padapatha notation preserving 3,000-year oral Shruti accents',
    period: 'Oral composition c. 1500–1200 BCE; Manuscript exemplar 15th c. CE',
    siteOrOrigin: 'Bhandarkar Oriental Research Institute / National Museum Archive',
    material: 'Handmade paper & birch bark (Bhurjapatra) with red accent markers',
    dimensions: '24.5 × 11.2 cm',
    sourceInstitution: 'National Museum',
    ncertMapping: 'Class 6 Ch. 4 (The Oldest Books in the World)',
    illustrationType: 'rigveda_manuscript',
    summary:
      'Illustrates how Vedic hymns were preserved with acoustic precision across millennia through combinatorial recitation methods (Samhitapatha, Padapatha, Kramapatha, Ghanapatha) before being written down.',
    epistemology: {
      knownFromEvidence:
        'Red ink vertical and horizontal strokes mark the Udātta, Anudātta, and Svarita pitch accents; inscribed on UNESCO’s Memory of the World Register (2007).',
      scholarlyInterpretation:
        'Cross-regional oral recitations from Kashmir to Kerala match down to individual syllables and pitch accents, functioning like an acoustic checksum.',
      stillDebated:
        'Absolute astronomical vs linguistic dating of the earliest Mandala strata (Mandala II–VII family books).',
    },
    historianVerifiedBy: 'Prof. S. Bhattacharya (Sanskrit & Oral Traditions Reviewer)',
    bundleSizeKb: 145,
  },

  // 3. MAURYAN EMPIRE
  {
    id: 'art-mau-sarnath',
    eraId: 'mauryan',
    accessionNumber: 'ACC. ASI-MAU-201',
    title: 'Lion Capital of Ashoka at Sarnath',
    titleHi: 'सारनाथ का अशोक सिंह स्तंभ शीर्ष',
    subtitle: 'Mirror-polished Chunar sandstone capital with 24-spoke Dhammachakra',
    period: 'c. 250 BCE (Reign of Emperor Ashoka)',
    siteOrOrigin: 'Sarnath (near Varanasi, Uttar Pradesh)',
    material: 'Monolithic buff Chunar sandstone with Mauryan mirror polish',
    dimensions: 'Height 215 cm, Base diameter 90 cm',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 7 (The Rampurwa Bull & Sarnath Lion Capital)',
    illustrationType: 'sarnath_capital',
    summary:
      'Crowned the pillar erected by Emperor Ashoka at the site of the Buddha’s first sermon (Dhammacakkappavattana); adopted as the National Emblem of the Republic of India on 26 January 1950.',
    epistemology: {
      knownFromEvidence:
        'Excavated in 1904–05 by F.O. Oertel for the Archaeological Survey of India; features four Asiatic lions back-to-back above an abacus carved with a wheel, horse, bull, lion, and elephant.',
      scholarlyInterpretation:
        'Quarried exclusively at Chunar near Mirzapur and transported via river barges along the Ganga, showcasing imperial stone-polishing guilds and state logistics.',
      stillDebated:
        'The degree of stylistic cross-pollination between indigenous Indian wood/ivory carving traditions and Achaemenid/Hellenistic stone workshop techniques.',
    },
    historianVerifiedBy: 'Dr. R. Subramanian (Epigraphy & Harappan Archaeology Panel)',
    bundleSizeKb: 175,
    unlockedByDefault: true,
  },
  {
    id: 'art-mau-girnar',
    eraId: 'mauryan',
    accessionNumber: 'ACC. ASI-MAU-209',
    title: 'Girnar Fourteen Major Rock Edicts of Ashoka',
    titleHi: 'गिरनार के चतुर्दश अशोक शिलालेख',
    subtitle: 'Prakrit in Brahmi script proclaiming Dhamma, medical care, and Kalinga remorse',
    period: 'c. 257–256 BCE',
    siteOrOrigin: 'Junagadh (Girnar Hills, Gujarat)',
    material: 'Granite boulder inscription in Early Brahmi script',
    dimensions: 'Boulder face ~3.2 × 4.5 m',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 7 (What was Ashoka’s Dhamma?)',
    illustrationType: 'girnar_rock_edict',
    summary:
      'Publicly inscribed boulder along a major pilgrimage and trade route where Emperor "Devanampiya Piyadassi" addresses officials and citizens directly on non-violence, hospitals for humans and animals, and religious tolerance.',
    epistemology: {
      knownFromEvidence:
        'Deciphered by James Prinsep in 1837; the same boulder later received inscriptions by Rudradaman I (150 CE, featuring the Sudarshana Lake dam repair record) and Skandagupta (455 CE).',
      scholarlyInterpretation:
        'Demonstrates that Mauryan edicts were placed strategically near water reservoirs, trade crossroads, and frontier towns where literate officials read them aloud to assemblies.',
      stillDebated:
        'Why Rock Edict XIII (describing the Kalinga war) was omitted in Kalinga itself (Dhauli and Jaugada) and replaced by Separate Rock Edicts on compassionate administration.',
    },
    historianVerifiedBy: 'Dr. R. Subramanian (Epigraphy & Harappan Archaeology Panel)',
    bundleSizeKb: 160,
  },
  {
    id: 'art-mau-karshapana',
    eraId: 'mauryan',
    accessionNumber: 'ACC. RBI-MAU-218',
    title: 'Mauryan Silver Punch-Marked Karshapana Coin',
    titleHi: 'मौर्यकालीन आहत रजत कार्षापण मुद्रा',
    subtitle: 'Five-symbol imperial silver coinage (Sun, Six-Armed Wheel, Three-Arched Hill, Peacock, Tree)',
    period: 'c. 320–185 BCE',
    siteOrOrigin: 'Pataliputra & Taxila Hoards (RBI Monetary Museum Collection)',
    material: 'Stamped silver-copper alloy sheet (32 Rattis standard)',
    dimensions: '1.6 × 1.4 cm, Weight 3.4 grams',
    sourceInstitution: 'RBI Monetary Museum',
    ncertMapping: 'Class 6 Ch. 8 (Punch-Marked Coins)',
    illustrationType: 'karshapana_coin',
    summary:
      'Instead of die-striking a single portrait, Mauryan mints stamped five separate microscopic punches onto cut silver blanks to guarantee weight and royal treasury authentication.',
    epistemology: {
      knownFromEvidence:
        'Thousands recovered in hoards from Taxila to Amaravati; the Sun and Six-Armed symbol appear consistently alongside the crescent-topped three-arched hill.',
      scholarlyInterpretation:
        'As described in the Arthashastra’s section on the Lakshanadhyaksha (Superintendent of Mint), these coins paid standing army salaries and facilitated taxed trade along the Uttarapatha.',
      stillDebated:
        'Exact attribution of individual fourth and fifth banker/mint master counter-marks to specific Mauryan emperors.',
    },
    historianVerifiedBy: 'Shri V. Kulkarni (Numismatics & RBI Museum Consultant)',
    bundleSizeKb: 125,
  },

  // 4. GUPTA PERIOD
  {
    id: 'art-gup-dinara',
    eraId: 'gupta',
    accessionNumber: 'ACC. RBI-GUP-301',
    title: 'Gold Dinara of Samudragupta (Lyrist / Vina Type) & Chandragupta II (Archer)',
    titleHi: 'समुद्रगुप्त (वीणावादक) एवं चंद्रगुप्त द्वितीय की स्वर्ण दीनार मुद्रा',
    subtitle: 'Die-struck gold coinage with Gupta Brahmi poetry and Garudadhvaja standard',
    period: 'c. 335–415 CE',
    siteOrOrigin: 'Bayana Hoard (Rajasthan) / RBI Monetary Museum',
    material: 'High-purity die-struck gold (Suvarna standard, ~9.1–9.3 g)',
    dimensions: 'Diameter 2.1 cm, Weight 9.2 grams',
    sourceInstitution: 'RBI Monetary Museum',
    ncertMapping: 'Class 6 Ch. 10 (Samudragupta’s Prashasti & Coinage)',
    illustrationType: 'gupta_dinara',
    summary:
      'Showcases the emperor seated cross-legged playing the seven-stringed harp-vina on the obverse, and Goddess Lakshmi seated on a wicker stool holding a cornucopia/noose on the reverse.',
    epistemology: {
      knownFromEvidence:
        'Bears the Brahmi legend "Maharajadhiraja Sri Samudraguptah" on the obverse, aligning with Harishena’s Allahabad Pillar Prashasti praising the ruler’s musical skill.',
      scholarlyInterpretation:
        'Marks the complete Indianization of gold die-striking techniques originally adapted from Kushan coinage, replacing foreign motifs with Garuda standards, dhotis, and Sanskrit metrical legends.',
      stillDebated:
        'Whether gold Dinaras circulated in everyday retail markets (where cowrie shells were common, as noted by Fa-Hien) or were reserved for royal donations, land grants (Agraharas), and large guild transactions.',
    },
    historianVerifiedBy: 'Shri V. Kulkarni (Numismatics & RBI Museum Consultant)',
    bundleSizeKb: 150,
    unlockedByDefault: true,
  },
  {
    id: 'art-gup-aryabhata',
    eraId: 'gupta',
    accessionNumber: 'ACC. NM-GUP-312',
    title: 'Aryabhatiya Ganitapada & Golapada Astronomical Diagram Folio',
    titleHi: 'आर्यभटीय (गणितपाद और गोलपाद) पांडुलिपि एवं ग्रहण ज्यामिति',
    subtitle: 'Pi approximation (3.1416), sine tables (Jya), axial Earth rotation, and eclipse shadow theory',
    period: 'Composed 499 CE at Kusumapura (Pataliputra)',
    siteOrOrigin: 'Kusumapura / Manuscript Tradition in Kerala & National Museum',
    material: 'Incised palm-leaf (Talapatra) & brass astronomical armillary diagram',
    dimensions: '32.0 × 5.4 cm folio',
    sourceInstitution: 'National Museum',
    ncertMapping: 'Class 6 Ch. 11 (Books of Science: Aryabhata)',
    illustrationType: 'aryabhatiya_folio',
    summary:
      'In 121 concise Sanskrit verses, the 23-year-old mathematician-astronomer Aryabhata stated that the Earth rotates on its axis daily, gave pi as 62,832 / 20,000 (3.1416), and proved eclipses are shadows cast by the Earth and Moon.',
    epistemology: {
      knownFromEvidence:
        'Aryabhatiya Golapada Verse 9 explicitly uses the simile of a passenger in a moving boat seeing stationary riverbank trees move backward to explain apparent stellar motion.',
      scholarlyInterpretation:
        'Aryabhata’s trigonometric half-chord (Ardha-jya) tables laid foundational groundwork for medieval Indian, Islamic, and global trigonometry.',
      stillDebated:
        'The precise observational instruments used at Kusumapura to measure solar and sidereal year lengths to within minutes of modern values.',
    },
    historianVerifiedBy: 'Prof. S. Bhattacharya (Sanskrit & History of Science Reviewer)',
    bundleSizeKb: 155,
  },
  {
    id: 'art-gup-buddha',
    eraId: 'gupta',
    accessionNumber: 'ACC. ASI-GUP-324',
    title: 'Sarnath Seated Buddha in Dharmachakra Pravartana Mudra',
    titleHi: 'सारनाथ की धर्मचक्र प्रवर्तन मुद्रा में बुद्ध प्रतिमा',
    subtitle: 'Carved Chunar sandstone with foliate Prabhamandala halo and canonical iconometric ratios',
    period: 'c. 475 CE (Late 5th Century CE)',
    siteOrOrigin: 'Sarnath Archaeological Museum (ASI)',
    material: 'Buff Chunar sandstone',
    dimensions: 'Height 160 cm, Width 79 cm',
    sourceInstitution: 'ASI',
    ncertMapping: 'Class 6 Ch. 11 (Sculpture in the Gupta Period)',
    illustrationType: 'sarnath_buddha',
    summary:
      'A masterpiece of the Sarnath school combining smooth, unpleated drapery (wet-cloth effect), downcast meditative eyes, an intricately carved floral halo (Prabhamandala), and six kneeling disciples flanking the Wheel of Law on the pedestal.',
    epistemology: {
      knownFromEvidence:
        'Carved according to strict Tala-mana iconometric proportions where the head, torso, and lotus base form an equilateral triangle of visual stability.',
      scholarlyInterpretation:
        'The Sarnath workshop shifted away from the muscular realistic folds of earlier Gandhara and Mathura styles toward serene inward spirituality and botanical ornament.',
      stillDebated:
        'Specific royal vs monastic guild patronage behind individual undated workshops at Sarnath during the reigns of Kumaragupta and Budhagupta.',
    },
    historianVerifiedBy: 'Prof. M. Deshpande (ASI Art History Reviewer)',
    bundleSizeKb: 170,
  },

  // 5. MEDIEVAL INDIA
  {
    id: 'art-med-nataraja',
    eraId: 'medieval',
    accessionNumber: 'ACC. NM-MED-401',
    title: 'Chola Lost-Wax (Madhuchchishtavidhana) Bronze & Temple Trade Inscription',
    titleHi: 'चोल कांस्य शिल्प (मधुच्छिष्ट विधान) एवं श्रेणी अभिलेख',
    subtitle: 'Solid-cast Panchaloha bronze craft and Ayyavole-500 maritime guild patronage',
    period: 'c. 10th–11th Century CE (Chola Period)',
    siteOrOrigin: 'Thanjavur / Tiruvalangadu (Tamil Nadu)',
    material: 'Panchaloha bronze alloy (Copper, Tin, Lead, Silver, Gold trace)',
    dimensions: 'Height 96 cm, Width 82.5 cm',
    sourceInstitution: 'National Museum',
    ncertMapping: 'NCERT Class 7 Ch. 2 (Splendid Temples and Bronze Sculpture) & Ch. 6 (Towns, Traders and Craftspersons)',
    illustrationType: 'chola_nataraja',
    summary:
      'Cast using the lost-wax (cire perdue) technique where a beeswax model is coated in alluvial clay from the Kaveri river, heated to melt out the wax, and poured with molten bronze—resulting in a one-of-a-kind sculpture once the clay mold is broken.',
    epistemology: {
      knownFromEvidence:
        'Copper-plate grants and temple wall inscriptions in Tamil and Sanskrit document endowments by merchant guilds (Nagarattar, Manigramam, Ayyavole 500) and bronze-casting Sthapatis.',
      scholarlyInterpretation:
        'Chola temples functioned as economic hubs—managing land irrigation, banking loans to village assemblies (Sabha & Ur), and financing Indian Ocean maritime voyages to Srivijaya and Song China.',
      stillDebated:
        'The exact metallurgical ratios of trace gold and silver in medieval Panchaloha texts versus non-destructive XRF chemical analyses of surviving bronzes.',
    },
    historianVerifiedBy: 'Dr. R. Subramanian (Epigraphy & South Indian History Panel)',
    bundleSizeKb: 180,
    unlockedByDefault: true,
  },
  {
    id: 'art-med-varaha',
    eraId: 'medieval',
    accessionNumber: 'ACC. RBI-MED-415',
    title: 'Vijayanagara Gold Varaha (Pagoda) & Sultanate Silver Tanka Pair',
    titleHi: 'विजयनगर स्वर्ण वराह (पगोडा) और सल्तनत रजत टंका',
    subtitle: 'Comparative medieval numismatics across Nagari, Kannada, and Persian scripts',
    period: 'c. 1210–1529 CE (Iltutmish to Krishnadevaraya)',
    siteOrOrigin: 'Hampi (Karnataka) & Delhi Mint (RBI Monetary Museum)',
    material: 'Gold (3.4 g Varaha) & Pure Silver (10.8 g Tanka)',
    dimensions: 'Varaha: 1.2 cm dia; Tanka: 2.6 cm dia',
    sourceInstitution: 'RBI Monetary Museum',
    ncertMapping: 'NCERT Class 7 Ch. 3 & Ch. 6 (Hampi, Masulipatnam and Surat)',
    illustrationType: 'vijayanagara_varaha',
    summary:
      'Pairs the gold Varaha (Pagoda) of Vijayanagara—accepted by Portuguese, Persian, and Deccani horse and diamond merchants across global ports—with the standardized 175-grain Silver Tanka of the Delhi Sultanate that was later refined into Sher Shah Suri and Mughal Rupiya coinage.',
    epistemology: {
      knownFromEvidence:
        'Vijayanagara coins bear the royal Boar (Varaha) or Balkrishna emblem with Nagari/Kannada legends ("Sri Pratapa Krishna Raya"), while Sultanate/Mughal coins record exact Hijri year and mint town (Dar-ul-Khilafat) in Persian calligraphy.',
      scholarlyInterpretation:
        'Demonstrates how medieval Indian trade relied on trusted metallic purity across politically rival kingdoms, brokered by Sarrafs (moneychangers) who tested coins and issued Hundis (bills of exchange).',
      stillDebated:
        'Fluctuations in silver-to-gold bimetallic exchange ratios in interior Deccan markets prior to the influx of New World silver via Surat.',
    },
    historianVerifiedBy: 'Shri V. Kulkarni (Numismatics & RBI Museum Consultant)',
    bundleSizeKb: 145,
  },
  {
    id: 'art-med-stepwell',
    eraId: 'medieval',
    accessionNumber: 'ACC. ASI-MED-428',
    title: 'Rani-ki-Vav Stepwell (Baoli) Subterranean Hydro-Architecture Blueprint',
    titleHi: 'रानी की वाव (बावड़ी) जल-स्थापत्य संरचना (पाटण)',
    subtitle: 'Seven-level inverted subterranean water temple and aquifer pressure stabilizer',
    period: 'c. 1063 CE (Solanki / Chaulukya Dynasty, commissioned by Queen Udayamati)',
    siteOrOrigin: 'Patan, Gujarat (ASI World Heritage Site & ₹100 Banknote Motif)',
    material: 'Dhrangadhra sandstone masonry with interlocking corbelled pavilions',
    dimensions: 'Length 64 m, Width 20 m, Depth 27 m (7 subterranean storeys)',
    sourceInstitution: 'ASI',
    ncertMapping: 'NCERT Class 7 Ch. 5 (Rulers and Buildings — Baolis and Water Tanks)',
    illustrationType: 'rani_ki_vav_carving',
    summary:
      'Engineered as a stepped subterranean corridor descending 27 meters to the water table, using multi-tiered open pavilions (Kutas) as lateral structural buttresses to prevent sandy soil walls from collapsing inward while cooling the microclimate by 6–8°C.',
    epistemology: {
      knownFromEvidence:
        'Buried under Saraswati river silt for centuries, preserving over 500 principal sculptures and 1,000 minor carvings; excavated and restored by ASI between the 1960s and 1980s.',
      scholarlyInterpretation:
        'Stepwells (Vav in Gujarat, Baoli in North India, Kalyani/Pushkarani in Karnataka) served simultaneously as drought-resilient aquifers, caravan rest stops, and women’s communal social spaces.',
      stillDebated:
        'Precise chronology of the flood event of the Saraswati river that silted the stepwell and prevented its quarry reuse in later centuries.',
    },
    historianVerifiedBy: 'Prof. M. Deshpande (ASI Western Circle Reviewer)',
    bundleSizeKb: 185,
  },

  // 6. FREEDOM STRUGGLE
  {
    id: 'art-fre-dandi',
    eraId: 'freedom',
    accessionNumber: 'ACC. NM-FRE-501',
    title: 'Dandi Salt Satyagraha Grassroots Volunteer Field Notebook & Salt Pan Sample',
    titleHi: 'दांडी नमक सत्याग्रह स्वयंसेवक पंजी और नमक नमूना (१९३०)',
    subtitle: '240-mile march logistics log from Sabarmati to Navsari/Dandi (12 March – 6 April 1930)',
    period: 'March–April 1930 CE',
    siteOrOrigin: 'Sabarmati Ashram / Dandi Coast Archive (Gujarat)',
    material: 'Hand-spun Khadi cloth binding, cyclostyled Gujarati/Hindi leaflets, unrefined sea salt',
    dimensions: '21.0 × 14.5 cm field diary',
    sourceInstitution: 'NCERT',
    ncertMapping: 'NCERT Class 8 Ch. 9 & Class 10 Ch. 2 (The Salt March and the Civil Disobedience Movement)',
    illustrationType: 'dandi_salt_archive',
    summary:
      'Documents the work of ordinary advance-party volunteers (Arun Tukaram & village Satyagrahis) who mapped village wells, sanitation trenches, spinning quotas, and drum-signal relays ahead of the 78 marchers across 24 days.',
    epistemology: {
      knownFromEvidence:
        'Colonial Bombay Presidency Police intelligence reports and Ashram registers verify that over 300 village Patels and Talatis resigned their British revenue posts as the march passed through Kheda, Bharuch, and Surat districts.',
      scholarlyInterpretation:
        'Choosing salt—an everyday necessity taxed at up to 2,400% of production cost—bridged rural-urban, caste, religious, and gender divides, bringing tens of thousands of women into public picketing for the first time.',
      stillDebated:
        'Regional variations in how local peasant movements (such as no-rent campaigns in UP and forest satyagrahas in Maharashtra/Central Provinces) interpreted and extended Congress Working Committee directives.',
    },
    historianVerifiedBy: 'Dr. A. K. Sharma (Modern Indian History & NCERT Reviewer)',
    bundleSizeKb: 140,
    unlockedByDefault: true,
  },
  {
    id: 'art-fre-press',
    eraId: 'freedom',
    accessionNumber: 'ACC. NM-FRE-512',
    title: 'Underground Cyclostyle Satyagraha Bulletin & Hand-Spun Charkha Spindle',
    titleHi: 'भूमिगत सत्याग्रह पत्रिका (साइक्लोस्टाइल) एवं पेटी चरखा',
    subtitle: 'Vernacular press sheets and portable Yeravda/Peti Charkha',
    period: 'c. 1921–1942 CE',
    siteOrOrigin: 'Bombay, Wardha & Allahabad Archival Collections',
    material: 'Swadeshi handmade paper, stencil ink, and teakwood folding Box Charkha',
    dimensions: 'Bulletin: 29 × 21 cm; Folding Charkha: 34 × 18 × 9 cm',
    sourceInstitution: 'National Museum',
    ncertMapping: 'NCERT Class 10 (Print Culture and the Modern World & Nationalism in India)',
    illustrationType: 'harijan_newspaper',
    summary:
      'When British authorities confiscated printing presses under the Press Act, ordinary students, railway workers, and compositors produced nocturnal cyclostyled sheets in Hindi, Marathi, Bengali, Tamil, and Urdu wrapped inside grain sacks and school satchels.',
    epistemology: {
      knownFromEvidence:
        'Home Department Political (Internal) files in the National Archives of India catalog hundreds of seized cyclostyle machines and hand-drawn lithograph posters from 1930–1942.',
      scholarlyInterpretation:
        'Combining constructive daily practices (spinning Khadi, village schools) with clandestine communication networks sustained mass consciousness even during periods when top leaders were imprisoned.',
      stillDebated:
        'The relative reach of clandestine print versus oral folk songs (Powadas, Alha, Baul, Villupattu) in mobilizing non-literate rural participants.',
    },
    historianVerifiedBy: 'Dr. A. K. Sharma (Modern Indian History & NCERT Reviewer)',
    bundleSizeKb: 135,
  },
  {
    id: 'art-fre-radio',
    eraId: 'freedom',
    accessionNumber: 'ACC. NM-FRE-529',
    title: '1942 Underground Congress Radio (42.34 Meters) Vacuum-Tube Transmitter Log',
    titleHi: '१९४२ भूमिगत कांग्रेस रेडियो (४२.३४ मीटर) ट्रांसमीटर लॉग',
    subtitle: 'Mobile shortwave transmitter relocated nightly across Bombay apartments',
    period: 'August – November 1942 CE (Quit India Movement)',
    siteOrOrigin: 'Bombay (Mumbai) — Operated by Usha Mehta, Vitthalbhai Jhaveri & Chicago Radio technicians',
    material: 'Assembled vacuum-tube oscillator, suitcase chassis, and broadcast logbook',
    dimensions: '46 × 32 × 22 cm portable suitcase assembly',
    sourceInstitution: 'National Museum',
    ncertMapping: 'NCERT Class 8 Ch. 9 (Quit India and Later)',
    illustrationType: 'congress_radio_transmitter',
    summary:
      'Operating on 42.34 meters shortwave ("This is the Congress Radio calling on 42.34 meters from somewhere in India"), student organizers and amateur radio technicians evaded British direction-finding vans for nearly three months by shifting the transmitter across seven different buildings.',
    epistemology: {
      knownFromEvidence:
        'Court transcripts of the Special Tribunal trial in Bombay (1943) and surviving broadcast recordings verify daily transmissions in English and Hindustani from 14 August to 12 November 1942.',
      scholarlyInterpretation:
        'Demonstrates how young citizen volunteers and technicians filled the communication vacuum after the arrest of the entire All-India Congress leadership on 9 August 1942.',
      stillDebated:
        'How extensively provincial underground cells in Satara (Prati Sarkar), Ballia, and Tamluk received direct radio coordination versus autonomous local initiative.',
    },
    historianVerifiedBy: 'Dr. A. K. Sharma (Modern Indian History & NCERT Reviewer)',
    bundleSizeKb: 150,
  },
];

// Localization strings for English + Hindi scaffolding (Phase 2 requirement from PDF)
export const UI_STRINGS = {
  en: {
    navExpeditions: 'Era Expeditions',
    navMuseum: 'Virtual Museum',
    navScanner: 'AR Scanner Lab',
    navKingdom: 'Kingdom Guilds',
    navEducator: 'Educator & CMS',
    loopHeader: 'Kaalchakra Learning Loop',
    loopSteps: [
      '01. Enter Era',
      '02. Explore Context',
      '03. Face Historical Problem',
      '04. Solve via Era Mechanic',
      '05. Separate Evidence vs Debate',
      '06. Collect & Curate in Museum',
    ],
    knownFromEvidence: 'Known from Evidence',
    scholarlyInterpretation: 'Scholarly Interpretation',
    stillDebated: 'Still Debated',
  },
  hi: {
    navExpeditions: 'युग अभियान (Eras)',
    navMuseum: 'आभासी संग्रहालय (Museum)',
    navScanner: 'एआर स्कैनर (AR Lab)',
    navKingdom: 'राज्य व व्यापार (Guilds)',
    navEducator: 'शिक्षक एवं समीक्षा (CMS)',
    loopHeader: 'कालचक्र अधिगम चक्र (Kaalchakra Loop)',
    loopSteps: [
      '01. युग प्रवेश',
      '02. अन्वेषण',
      '03. ऐतिहासिक चुनौती',
      '04. युग-विशिष्ट समाधान',
      '05. साक्ष्य बनाम विमर्श',
      '06. संग्रहालय में संरक्षण',
    ],
    knownFromEvidence: 'प्रत्यक्ष साक्ष्य से ज्ञात (Known from Evidence)',
    scholarlyInterpretation: 'विद्वानों की व्याख्या (Scholarly Interpretation)',
    stillDebated: 'अभी भी विचारणीय (Still Debated)',
  },
};
