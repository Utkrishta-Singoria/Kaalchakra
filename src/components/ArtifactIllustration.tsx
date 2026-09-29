import React from 'react';
import { ArtifactCard } from '../data/kaalchakraData';

interface ArtifactIllustrationProps {
  type: ArtifactCard['illustrationType'];
  className?: string;
  interactiveZoom?: boolean;
}

export const ArtifactIllustration: React.FC<ArtifactIllustrationProps> = ({
  type,
  className = 'w-full h-48',
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#F3EFE6] border border-stone-300/80 flex items-center justify-center select-none ${className}`}
    >
      {/* Subtle archival gallery grid lines */}
      <svg
        className="w-full h-full"
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Museum illustration of ${type.replace(/_/g, ' ')}`}
      >
        <defs>
          <radialGradient id="museumGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#FAF6EE" />
            <stop offset="100%" stopColor="#E6DEC8" />
          </radialGradient>
          <linearGradient id="goldMint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="silverMint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="terracotta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <linearGradient id="sandstone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E7D8C1" />
            <stop offset="100%" stopColor="#B89F7D" />
          </linearGradient>
        </defs>

        <rect width="320" height="220" fill="url(#museumGlow)" />
        <line x1="20" y1="195" x2="300" y2="195" stroke="#C8BFA8" strokeWidth="1" />

        {type === 'unicorn_seal' && (
          <g>
            {/* Square steatite tablet */}
            <rect x="88" y="24" width="144" height="144" rx="6" fill="#EDE7DA" stroke="#78716C" strokeWidth="2.5" />
            <rect x="96" y="32" width="128" height="128" rx="3" fill="#DFD7C5" stroke="#A8A29E" strokeWidth="1" strokeDasharray="3 2" />
            {/* Undeciphered Indus Script Glyphs at top (5 signs) */}
            <g stroke="#292524" strokeWidth="2.2" strokeLinecap="round">
              {/* Fish sign */}
              <path d="M112 48 C117 42, 123 42, 128 48 C123 54, 117 54, 112 48 Z" />
              <line x1="128" y1="48" x2="132" y2="44" />
              <line x1="128" y1="48" x2="132" y2="52" />
              {/* Jar / U sign */}
              <path d="M142 42 L146 56 L154 56 L158 42" />
              <line x1="140" y1="45" x2="144" y2="42" />
              <line x1="160" y1="45" x2="156" y2="42" />
              {/* Vertical stroke triplets */}
              <line x1="168" y1="42" x2="168" y2="55" />
              <line x1="173" y1="42" x2="173" y2="55" />
              <line x1="178" y1="42" x2="178" y2="55" />
              {/* Wheel with spokes */}
              <circle cx="192" cy="49" r="7" />
              <line x1="192" y1="42" x2="192" y2="56" />
              <line x1="185" y1="49" x2="199" y2="49" />
              {/* Comb motif */}
              <line x1="205" y1="43" x2="215" y2="43" />
              <line x1="206" y1="43" x2="206" y2="54" />
              <line x1="210" y1="43" x2="210" y2="54" />
              <line x1="214" y1="43" x2="214" y2="54" />
            </g>
            {/* Unicorn Bull Profile & Sacred Brazier */}
            <path
              d="M126 118 C126 98, 145 94, 175 96 L186 80 L194 82 L188 102 C192 110, 190 124, 180 128 L180 148 L174 148 L174 128 L142 128 L142 148 L136 148 L136 125 C129 124, 126 121, 126 118 Z"
              fill="#57534E"
            />
            {/* Single curved horn */}
            <path d="M190 81 C198 68, 212 64, 216 54" stroke="#292524" strokeWidth="2.8" strokeLinecap="round" />
            {/* Ritual standard / brazier */}
            <line x1="206" y1="115" x2="206" y2="148" stroke="#44403C" strokeWidth="2.5" />
            <rect x="198" y="108" width="16" height="10" rx="2" fill="#78716C" />
            <path d="M198 108 Q206 95 214 108" fill="#A8A29E" />
            <text x="160" y="186" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              STEATITE INTAGLIO · 2.9 × 2.9 CM · UNDECIPHERED SCRIPT
            </text>
          </g>
        )}

        {type === 'chert_weights' && (
          <g>
            {/* Balance Beam */}
            <line x1="160" y1="30" x2="160" y2="165" stroke="#78350F" strokeWidth="4" />
            <line x1="85" y1="55" x2="235" y2="55" stroke="#92400E" strokeWidth="3.5" />
            <circle cx="160" cy="55" r="5" fill="#B45309" />
            {/* Left Pan: Chert Cubical Weights */}
            <line x1="90" y1="55" x2="72" y2="115" stroke="#78716C" strokeWidth="1.2" />
            <line x1="90" y1="55" x2="108" y2="115" stroke="#78716C" strokeWidth="1.2" />
            <path d="M65 115 Q90 126 115 115" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            {/* Cubical weights row */}
            <rect x="44" y="142" width="14" height="14" fill="#D6D3D1" stroke="#44403C" strokeWidth="1.5" />
            <rect x="64" y="138" width="18" height="18" fill="#C7C2B8" stroke="#44403C" strokeWidth="1.5" />
            <rect x="88" y="132" width="24" height="24" fill="#A8A29E" stroke="#44403C" strokeWidth="1.5" />
            <rect x="118" y="124" width="32" height="32" fill="#78716C" stroke="#292524" strokeWidth="1.5" />
            {/* Right Pan: Carnelian Beads */}
            <line x1="230" y1="55" x2="212" y2="115" stroke="#78716C" strokeWidth="1.2" />
            <line x1="230" y1="55" x2="248" y2="115" stroke="#78716C" strokeWidth="1.2" />
            <path d="M205 115 Q230 126 255 115" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            <circle cx="222" cy="110" r="6" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.2" />
            <circle cx="235" cy="110" r="6" fill="#EA580C" stroke="#7F1D1D" strokeWidth="1.2" />
            <circle cx="229" cy="102" r="5.5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.2" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              BINARY CHERT RATIO · 1 : 2 : 4 : 8 : 16 (BASE 13.63g)
            </text>
          </g>
        )}

        {type === 'dholavira_signboard' && (
          <g>
            {/* Wooden plank frame with 10 crystalline gypsum symbols */}
            <rect x="26" y="45" width="268" height="58" rx="4" fill="#5C4033" stroke="#292524" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <g key={i} transform={`translate(${36 + i * 25.5}, 56)`}>
                <circle cx="10" cy="18" r="9" stroke="#F8FAFC" strokeWidth="2.2" fill="none" />
                {i % 2 === 0 ? (
                  <path d="M10 9 L10 27 M4 18 L16 18" stroke="#F8FAFC" strokeWidth="2" />
                ) : (
                  <path d="M5 11 L15 25 M15 11 L5 25" stroke="#F8FAFC" strokeWidth="2" />
                )}
              </g>
            ))}
            {/* Rock-cut reservoir steps below */}
            <rect x="46" y="118" width="228" height="48" fill="#0284C7" fillOpacity="0.22" stroke="#0369A1" strokeWidth="1.5" />
            <path d="M46 126 H90 V136 H130 V146 H170 V156 H274" stroke="#57534E" strokeWidth="2" fill="none" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              DHOLAVIRA 10-SIGN GYPSUM INLAY &amp; ROCK-CUT RESERVOIR
            </text>
          </g>
        )}

        {type === 'pgw_bowl' && (
          <g>
            {/* Painted Grey Ware hemispherical bowl */}
            <path
              d="M70 65 C70 140, 110 162, 160 162 C210 162, 250 140, 250 65 Z"
              fill="#9CA3AF"
              stroke="#374151"
              strokeWidth="2.5"
            />
            <ellipse cx="160" cy="65" rx="90" ry="14" fill="#6B7280" stroke="#1F2937" strokeWidth="2" />
            {/* Black geometric PGW motifs */}
            <circle cx="120" cy="112" r="14" stroke="#111827" strokeWidth="2" fill="none" />
            <circle cx="120" cy="112" r="7" stroke="#111827" strokeWidth="1.8" fill="none" />
            <circle cx="120" cy="112" r="2" fill="#111827" />
            <path d="M152 96 C158 112, 162 112, 168 128 M160 96 C166 112, 170 112, 176 128" stroke="#111827" strokeWidth="2" />
            <circle cx="202" cy="112" r="14" stroke="#111827" strokeWidth="2" fill="none" />
            <circle cx="202" cy="112" r="7" stroke="#111827" strokeWidth="1.8" fill="none" />
            <text x="160" y="186" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              PAINTED GREY WARE (PGW) · HASTINAPURA · c. 1000 BCE
            </text>
          </g>
        )}

        {type === 'atranjikhera_plough' && (
          <g>
            {/* Wooden Beam & Smelted Iron Ploughshare (Shyama Ayas) */}
            <path d="M55 130 L195 55 L204 66 L64 142 Z" fill="#92400E" stroke="#451A03" strokeWidth="2" />
            <path d="M150 75 L228 148 L212 156 L140 85 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.2" />
            {/* Iron Ploughshare Tip */}
            <polygon points="212,156 262,162 228,140" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            {/* Barley stalks */}
            <path d="M85 60 Q90 35 102 28 M88 48 L98 42 M90 40 L100 34" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
            <text x="160" y="186" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SHYAMA AYAS (WROUGHT IRON PLOUGHSHARE) · ATRANJIKHERA
            </text>
          </g>
        )}

        {type === 'rigveda_manuscript' && (
          <g>
            {/* Birch-bark / paper horizontal manuscript folio */}
            <rect x="36" y="54" width="248" height="96" rx="4" fill="#F5E6C8" stroke="#92400E" strokeWidth="2" />
            <rect x="44" y="62" width="232" height="80" fill="none" stroke="#B45309" strokeWidth="1" />
            <circle cx="160" cy="102" r="6" fill="#FBF9F5" stroke="#92400E" strokeWidth="1.5" />
            {/* Sanskrit Devanagari / Vedic accent markers in red */}
            <line x1="60" y1="80" x2="260" y2="80" stroke="#292524" strokeWidth="2" />
            <line x1="60" y1="102" x2="144" y2="102" stroke="#292524" strokeWidth="2" />
            <line x1="176" y1="102" x2="260" y2="102" stroke="#292524" strokeWidth="2" />
            <line x1="60" y1="124" x2="245" y2="124" stroke="#292524" strokeWidth="2" />
            {/* Red Udatta / Svarita vertical & horizontal pitch marks */}
            {[72, 96, 128, 192, 224, 244].map((x, idx) => (
              <g key={idx}>
                <line x1={x} y1="71" x2={x} y2="78" stroke="#DC2626" strokeWidth="2.2" />
                <line x1={x + 6} y1="86" x2={x + 14} y2="86" stroke="#DC2626" strokeWidth="2" />
                <line x1={x} y1="115" x2={x} y2="122" stroke="#DC2626" strokeWidth="2.2" />
              </g>
            ))}
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SHRUTI ORAL PITCH ACCENTS · UDATTA · ANUDATTA · SVARITA
            </text>
          </g>
        )}

        {type === 'sarnath_capital' && (
          <g>
            {/* Polished Chunar Sandstone Column, Lotus Bell, Abacus with Dhammachakra & Lions */}
            <rect x="130" y="138" width="60" height="34" rx="4" fill="url(#sandstone)" stroke="#78350F" strokeWidth="2" />
            {/* Abacus Drum with 24-spoke Dhammachakra */}
            <rect x="116" y="110" width="88" height="28" rx="4" fill="url(#sandstone)" stroke="#78350F" strokeWidth="2" />
            <circle cx="160" cy="124" r="11" stroke="#78350F" strokeWidth="2" fill="#FEF3C7" />
            <circle cx="160" cy="124" r="2.5" fill="#78350F" />
            <line x1="160" y1="113" x2="160" y2="135" stroke="#78350F" strokeWidth="1.2" />
            <line x1="149" y1="124" x2="171" y2="124" stroke="#78350F" strokeWidth="1.2" />
            <line x1="152" y1="116" x2="168" y2="132" stroke="#78350F" strokeWidth="1.2" />
            <line x1="168" y1="116" x2="152" y2="132" stroke="#78350F" strokeWidth="1.2" />
            {/* Heraldic Lions Silhouette */}
            <path
              d="M124 110 L124 68 C124 50, 142 42, 160 42 C178 42, 196 50, 196 68 L196 110 Z"
              fill="url(#sandstone)"
              stroke="#78350F"
              strokeWidth="2.2"
            />
            <circle cx="145" cy="64" r="10" stroke="#78350F" strokeWidth="1.6" fill="none" />
            <circle cx="175" cy="64" r="10" stroke="#78350F" strokeWidth="1.6" fill="none" />
            <line x1="160" y1="44" x2="160" y2="110" stroke="#78350F" strokeWidth="1.6" />
            <text x="160" y="186" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SARNATH LION CAPITAL · CHUNAR SANDSTONE · c. 250 BCE
            </text>
          </g>
        )}

        {type === 'girnar_rock_edict' && (
          <g>
            {/* Granite Boulder with Early Brahmi Inscription */}
            <path
              d="M52 156 C44 102, 74 36, 152 34 C232 32, 268 85, 264 156 Z"
              fill="#D6D3D1"
              stroke="#57534E"
              strokeWidth="2.5"
            />
            {/* Early Brahmi characters for "Devanampiya Piyadassi" */}
            <text x="160" y="84" textAnchor="middle" fill="#1C1917" fontSize="22" fontFamily="serif" letterSpacing="6">
              𑀤𑁂𑀯𑀸𑀦𑀁𑀧𑀺𑀬 𑀧𑀺𑀬𑀤𑀲𑀺
            </text>
            <line x1="85" y1="102" x2="235" y2="102" stroke="#78716C" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="78" y1="120" x2="242" y2="120" stroke="#78716C" strokeWidth="1.5" strokeDasharray="8 3" />
            <line x1="90" y1="138" x2="230" y2="138" stroke="#78716C" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="160" y="186" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              BRAHMI ROCK EDICT · DEVANAMPIYA PIYADASSI · GIRNAR
            </text>
          </g>
        )}

        {type === 'karshapana_coin' && (
          <g>
            {/* Rectangular/Irregular Silver Punch-Marked Blank */}
            <rect
              x="95"
              y="36"
              width="130"
              height="122"
              rx="14"
              fill="url(#silverMint)"
              stroke="#334155"
              strokeWidth="3"
            />
            {/* 1. Sun punch */}
            <circle cx="130" cy="68" r="10" stroke="#1E293B" strokeWidth="2" fill="none" />
            <path d="M130 52 V56 M130 80 V84 M114 68 H118 M142 68 H146" stroke="#1E293B" strokeWidth="2" />
            {/* 2. Six-armed symbol (Shadarachakra) */}
            <circle cx="190" cy="68" r="11" stroke="#1E293B" strokeWidth="2" fill="none" />
            <line x1="190" y1="53" x2="190" y2="83" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="175" y1="68" x2="205" y2="68" stroke="#1E293B" strokeWidth="1.8" />
            {/* 3. Three-arched hill with crescent (Chaitya) */}
            <path d="M136 132 Q144 116 152 132 Q160 116 168 132 Q152 100 136 132" stroke="#1E293B" strokeWidth="2.2" fill="none" />
            <path d="M146 106 Q152 112 158 106" stroke="#1E293B" strokeWidth="2" fill="none" />
            {/* 4. Caduceus / Tree-in-railing */}
            <rect x="184" y="122" width="18" height="14" stroke="#1E293B" strokeWidth="1.8" fill="none" />
            <line x1="193" y1="106" x2="193" y2="122" stroke="#1E293B" strokeWidth="2" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SILVER PUNCH-MARKED KARSHAPANA · 3.4g (32 RATTIS)
            </text>
          </g>
        )}

        {type === 'gupta_dinara' && (
          <g>
            {/* Circular Gold Dinara Coin */}
            <circle cx="160" cy="96" r="64" fill="url(#goldMint)" stroke="#78350F" strokeWidth="3" />
            <circle cx="160" cy="96" r="56" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Royal Archer / Lyrist figure & Garuda standard */}
            <path d="M145 64 C132 82, 132 110, 145 128" stroke="#451A03" strokeWidth="3" fill="none" />
            <line x1="145" y1="64" x2="145" y2="128" stroke="#FEF3C7" strokeWidth="1.5" />
            <circle cx="164" cy="74" r="8" fill="#451A03" />
            <path d="M154 84 L174 84 L170 124 L158 124 Z" fill="#451A03" />
            {/* Garudadhvaja Pillar on left */}
            <line x1="124" y1="78" x2="124" y2="124" stroke="#451A03" strokeWidth="2.5" />
            <circle cx="124" cy="74" r="5" fill="#FEF3C7" stroke="#451A03" strokeWidth="1.5" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              GUPTA GOLD DINARA · SUVARNA STANDARD · GARUDADVAJA
            </text>
          </g>
        )}

        {type === 'aryabhatiya_folio' && (
          <g>
            {/* Eclipse Umbric Cone & Pi Circle Geometry */}
            <circle cx="70" cy="96" r="24" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <circle cx="168" cy="96" r="16" fill="#0284C7" stroke="#1E3A8A" strokeWidth="2" />
            {/* Earth Umbra Shadow Cone */}
            <polygon points="168,80 265,96 168,112" fill="#1E293B" fillOpacity="0.35" stroke="#334155" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="228" cy="96" r="7" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.8" />
            <text x="70" y="135" textAnchor="middle" fill="#78350F" fontSize="9" fontFamily="IBM Plex Mono">SURYA</text>
            <text x="168" y="128" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontFamily="IBM Plex Mono">BHU (EARTH)</text>
            <text x="234" y="120" textAnchor="middle" fill="#334155" fontSize="9" fontFamily="IBM Plex Mono">CHANDRA</text>
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              ARYABHATIYA (499 CE) · PI = 62832 / 20000 = 3.1416
            </text>
          </g>
        )}

        {type === 'sarnath_buddha' && (
          <g>
            {/* Foliate Prabhamandala Halo */}
            <circle cx="160" cy="82" r="46" fill="#E7D8C1" stroke="#78350F" strokeWidth="2.2" />
            <circle cx="160" cy="82" r="38" fill="none" stroke="#92400E" strokeWidth="1.2" strokeDasharray="4 2" />
            {/* Equilateral Triangle Canonical Composition */}
            <polygon
              points="160,46 114,148 206,148"
              fill="url(#sandstone)"
              stroke="#78350F"
              strokeWidth="2"
            />
            <circle cx="160" cy="68" r="11" fill="#D6C2A5" stroke="#78350F" strokeWidth="1.8" />
            {/* Dharmachakra Mudra hands at heart center */}
            <circle cx="160" cy="102" r="8" fill="none" stroke="#78350F" strokeWidth="2" />
            <rect x="104" y="148" width="112" height="14" rx="2" fill="#B89F7D" stroke="#78350F" strokeWidth="1.8" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SARNATH SEATED BUDDHA · TALA-MANA PROPORTIONS · c. 475 CE
            </text>
          </g>
        )}

        {type === 'chola_nataraja' && (
          <g>
            {/* Flaming Tiruvasi Arch (Prabhamandala) */}
            <circle cx="160" cy="94" r="56" stroke="#78350F" strokeWidth="4" fill="none" />
            <circle cx="160" cy="94" r="61" stroke="#B45309" strokeWidth="1.8" strokeDasharray="3 5" fill="none" />
            {/* Dynamic axial equilibrium lines */}
            <path d="M160 48 L160 142 M124 82 L196 82 M138 118 L184 96" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="160" cy="64" r="9" fill="#78350F" />
            <ellipse cx="160" cy="148" rx="34" ry="8" fill="#92400E" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              CHOLA PANCHALOHA LOST-WAX BRONZE · CIRE PERDUE
            </text>
          </g>
        )}

        {type === 'vijayanagara_varaha' && (
          <g>
            {/* Left: Gold Varaha Coin; Right: Silver Tanka Coin */}
            <circle cx="108" cy="96" r="44" fill="url(#goldMint)" stroke="#78350F" strokeWidth="2.5" />
            <text x="108" y="92" textAnchor="middle" fill="#451A03" fontSize="11" fontWeight="bold">VARAHA</text>
            <text x="108" y="108" textAnchor="middle" fill="#451A03" fontSize="9" fontFamily="serif">श्री प्रताप</text>

            <circle cx="212" cy="96" r="48" fill="url(#silverMint)" stroke="#334155" strokeWidth="2.5" />
            <rect x="180" y="68" width="64" height="56" fill="none" stroke="#1E293B" strokeWidth="1.5" />
            <text x="212" y="94" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold">TANKA</text>
            <text x="212" y="110" textAnchor="middle" fill="#1E293B" fontSize="9" fontFamily="IBM Plex Mono">175 GRAINS</text>
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              VIJAYANAGARA GOLD VARAHA (3.4g) &amp; SILVER TANKA (10.8g)
            </text>
          </g>
        )}

        {type === 'rani_ki_vav_carving' && (
          <g>
            {/* Cross-section of 7-tier Subterranean Stepwell descending to aquifer */}
            <path
              d="M36 42 H80 V62 H120 V82 H160 V102 H200 V122 H240 V42 H284 V162 H36 Z"
              fill="url(#sandstone)"
              stroke="#78350F"
              strokeWidth="2"
            />
            {/* Aquifer Water Table at base */}
            <rect x="200" y="122" width="40" height="38" fill="#0284C7" fillOpacity="0.65" />
            {/* Lateral Kuta Pavilions */}
            <line x1="80" y1="62" x2="80" y2="162" stroke="#78350F" strokeWidth="2" />
            <line x1="120" y1="82" x2="120" y2="162" stroke="#78350F" strokeWidth="2" />
            <line x1="160" y1="102" x2="160" y2="162" stroke="#78350F" strokeWidth="2" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              RANI-KI-VAV STEPWELL · 7 SUBTERRANEAN TIERS · PATAN
            </text>
          </g>
        )}

        {type === 'dandi_salt_archive' && (
          <g>
            {/* Route map Sabarmati -> Dandi + Khadi Notebook */}
            <rect x="44" y="38" width="110" height="122" rx="4" fill="#F5F5F4" stroke="#57534E" strokeWidth="2" />
            <path d="M68 55 L82 80 L76 105 L95 128 L112 146" stroke="#991B1B" strokeWidth="2.5" strokeDasharray="4 3" fill="none" />
            <circle cx="68" cy="55" r="4" fill="#991B1B" />
            <circle cx="112" cy="146" r="5" fill="#1E3A8A" />
            {/* Salt crystals & Charkha wheel on right */}
            <circle cx="222" cy="96" r="38" stroke="#78350F" strokeWidth="2.5" fill="none" />
            <circle cx="222" cy="96" r="5" fill="#78350F" />
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <line
                key={deg}
                x1="222"
                y1="58"
                x2="222"
                y2="134"
                stroke="#78350F"
                strokeWidth="1.2"
                transform={`rotate(${deg} 222 96)`}
              />
            ))}
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              SABARMATI TO DANDI · 240 MILES · 24 DAYS (MARCH–APRIL 1930)
            </text>
          </g>
        )}

        {type === 'harijan_newspaper' && (
          <g>
            {/* Cyclostyle Satyagraha Bulletin Sheet */}
            <rect x="76" y="30" width="168" height="136" fill="#FAF7F0" stroke="#44403C" strokeWidth="2" />
            <line x1="90" y1="50" x2="230" y2="50" stroke="#1C1917" strokeWidth="3" />
            <text x="160" y="45" textAnchor="middle" fill="#1C1917" fontSize="11" fontWeight="bold" fontFamily="serif">
              SATYAGRAHA BULLETIN
            </text>
            <line x1="90" y1="68" x2="155" y2="68" stroke="#57534E" strokeWidth="2" />
            <line x1="90" y1="80" x2="155" y2="80" stroke="#78716C" strokeWidth="1.5" />
            <line x1="90" y1="92" x2="155" y2="92" stroke="#78716C" strokeWidth="1.5" />
            <line x1="168" y1="68" x2="230" y2="68" stroke="#57534E" strokeWidth="2" />
            <line x1="168" y1="80" x2="230" y2="80" stroke="#78716C" strokeWidth="1.5" />
            <rect x="90" y="108" width="140" height="42" fill="#E7E5E4" stroke="#78716C" strokeWidth="1" />
            <text x="160" y="133" textAnchor="middle" fill="#991B1B" fontSize="10" fontFamily="IBM Plex Mono">
              SWADESHI CYCLOSTYLE EDITION
            </text>
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              UNDERGROUND VERNACULAR PRESS &amp; PORTABLE CHARKHA
            </text>
          </g>
        )}

        {type === 'congress_radio_transmitter' && (
          <g>
            {/* Portable Suitcase Shortwave Radio 42.34m */}
            <rect x="68" y="46" width="184" height="112" rx="6" fill="#44403C" stroke="#1C1917" strokeWidth="2.5" />
            <rect x="80" y="58" width="160" height="88" rx="3" fill="#292524" stroke="#78716C" strokeWidth="1.5" />
            {/* Frequency Dial */}
            <circle cx="126" cy="102" r="26" fill="#F5E6C8" stroke="#B45309" strokeWidth="2" />
            <line x1="126" y1="102" x2="142" y2="84" stroke="#DC2626" strokeWidth="2.2" />
            <text x="126" y="116" textAnchor="middle" fill="#1C1917" fontSize="9" fontFamily="IBM Plex Mono">
              42.34m
            </text>
            {/* Vacuum tubes & signal waves */}
            <rect x="176" y="76" width="16" height="32" rx="8" fill="#F59E0B" fillOpacity="0.4" stroke="#FBBF24" strokeWidth="1.5" />
            <rect x="204" y="76" width="16" height="32" rx="8" fill="#F59E0B" fillOpacity="0.4" stroke="#FBBF24" strokeWidth="1.5" />
            <line x1="172" y1="124" x2="224" y2="124" stroke="#A8A29E" strokeWidth="2" />
            <text x="160" y="185" textAnchor="middle" fill="#57534E" fontSize="10" fontFamily="IBM Plex Mono">
              CONGRESS RADIO · 42.34 METERS SHORTWAVE · 1942
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
