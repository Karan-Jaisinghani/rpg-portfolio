import React, { useState, useRef, useEffect } from 'react';
import { School, Mic, Award, Trophy, ShieldAlert, GraduationCap, Code, Map, X, Calendar, Compass, ChevronRight, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { JourneyMilestone } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { playSelectSound } from '../hooks/useGameAudio';
import { PixelButton } from './PixelButton';
import worldMapBg from '../assets/world_map_bg.jpg';

// Fixed milestone coordinates for the winding treasure-map path inside the modal
const MAP_POSITIONS: Record<string, { x: number; y: number }> = {
  'lws-10':            { x: 15, y: 80 },
  'lws-12':            { x: 18, y: 52 },
  'lnct-college':      { x: 25, y: 25 },
  'sih-participation': { x: 45, y: 38 },
  'orators-anchor':    { x: 50, y: 70 },
  'nec-vp':            { x: 68, y: 80 },
  'orators-lead':      { x: 78, y: 55 },
  'next-quest':        { x: 85, y: 30 },
};

export const JourneySection: React.FC = React.memo(() => {
  const { journey } = portfolioData;
  
  // States
  const [showMapModal, setShowMapModal] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<JourneyMilestone | null>(null);
  const [isLogExpanded, setIsLogExpanded] = useState(false); // Collapsed by default
  
  const [animatedPath, setAnimatedPath] = useState(0); 
  const mapRef = useRef<SVGPathElement>(null);

  // Get coordinates for map layout
  const getPos = (id: string) =>
    MAP_POSITIONS[id] ?? { x: 50, y: 50 };

  // Build SVG winding dotted path
  const buildPath = () => {
    const points = journey.map((m) => getPos(m.id));
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpX1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpY1 = prev.y;
      const cpX2 = curr.x - (curr.x - prev.x) * 0.4;
      const cpY2 = curr.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const getIcon = (iconName: string, size = 16) => {
    switch (iconName) {
      case 'School':        return <School size={size} />;
      case 'GraduationCap': return <GraduationCap size={size} />;
      case 'Mic':           return <Mic size={size} />;
      case 'Code':          return <Code size={size} />;
      case 'Award':         return <Award size={size} />;
      case 'Trophy':        return <Trophy size={size} />;
      default:              return <ShieldAlert size={size} />;
    }
  };

  // ─── CUSTOM GLOWING CHECKPOINTS THAT FIT THE PIXEL ART BACKGROUND ───
  const renderMapNodeIcon = (milestoneId: string) => {
    if (milestoneId === 'next-quest') {
      // Cartoon Magic Wizard Portal
      return (
        <g>
          {/* Glowing Aura Base */}
          <ellipse rx="7.5" ry="3.0" cy="3.5" fill="url(#portalGlow)" />
          {/* Main Swirling Portal Element */}
          <g transform="translate(0, -3.5)">
            {/* Spinning background vortex */}
            <circle r="7.5" fill="none" stroke="url(#portalGrad)" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.9">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
            </circle>
            {/* Central glowing core */}
            <circle r="4.5" fill="url(#portalGrad)" stroke="#0f172a" strokeWidth="1.0">
              <animate attributeName="r" values="4.0;5.0;4.0" dur="1.6s" repeatCount="indefinite" />
            </circle>
            {/* Swirling inner details */}
            <circle r="2.2" fill="#fbcfe8" stroke="#0f172a" strokeWidth="0.6">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      );
    }

    if (milestoneId === 'lnct-college') {
      // Cartoon Wizard School Tower
      return (
        <g className="animate-float">
          {/* Platform Shadow */}
          <ellipse rx="6.5" ry="2.2" cy="4" fill="rgba(0, 0, 0, 0.4)" />
          {/* Platform Base */}
          <polygon points="-5,4 -4.5,1 4.5,1 5,4" fill="url(#castleBrickGrad)" stroke="#0f172a" strokeWidth="1.0" strokeLinejoin="round" />
          
          {/* Tower Body */}
          <g transform="translate(0, -1)">
            {/* Main shaft */}
            <rect x="-3" y="-3.5" width="6" height="5.5" fill="url(#brickGrad)" stroke="#0f172a" strokeWidth="1.0" rx="1" />
            {/* Brick detail lines */}
            <line x1="-1.5" y1="-1" x2="0.5" y2="-1" stroke="#334155" strokeWidth="0.6" />
            <line x1="-0.5" y1="1" x2="2" y2="1" stroke="#334155" strokeWidth="0.6" />
            {/* Windows */}
            <rect x="-1.2" y="-2" width="1" height="1.8" fill="#1e293b" rx="0.3" stroke="#0f172a" strokeWidth="0.4" />
            <rect x="0.8" y="-2" width="1" height="1.8" fill="#1e293b" rx="0.3" stroke="#0f172a" strokeWidth="0.4" />
            
            {/* Conical Roof */}
            <polygon points="-3.8,-3.5 3.8,-3.5 0,-7.5" fill="url(#roofGrad)" stroke="#0f172a" strokeWidth="1.0" strokeLinejoin="round" />
            
            {/* Spire & Floating Star */}
            <line x1="0" y1="-7.5" x2="0" y2="-9.5" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="0,-11.5 1,-10 2.5,-10 1.2,-9 1.8,-7.5 0,-8.5 -1.8,-7.5 -1.2,-9 -2.5,-10 -1,-10" fill="url(#goldGrad)" stroke="#0f172a" strokeWidth="0.6" strokeLinejoin="round">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
            </polygon>
          </g>
        </g>
      );
    }

    if (milestoneId === 'nec-vp') {
      // Cartoon Castle Fortress
      return (
        <g className="animate-float">
          {/* Shadow */}
          <ellipse rx="7.5" ry="2.2" cy="4" fill="rgba(0, 0, 0, 0.4)" />
          {/* Foundation */}
          <polygon points="-6,4 -5.5,1.5 5.5,1.5 6,4" fill="url(#brickGrad)" stroke="#0f172a" strokeWidth="1.0" strokeLinejoin="round" />
          
          <g transform="translate(0, -1)">
            {/* Central Keep wall */}
            <rect x="-4.5" y="-1.5" width="9" height="4" fill="url(#castleBrickGrad)" stroke="#0f172a" strokeWidth="1.0" />
            {/* Battlements details */}
            <rect x="-4.5" y="-2.5" width="1.5" height="1" fill="url(#castleBrickGrad)" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="-1" y="-2.5" width="2" height="1" fill="url(#castleBrickGrad)" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="3" y="-2.5" width="1.5" height="1" fill="url(#castleBrickGrad)" stroke="#0f172a" strokeWidth="0.8" />
            
            {/* Left Tower */}
            <rect x="-5" y="-4.5" width="2.5" height="7" fill="url(#brickGrad)" stroke="#0f172a" strokeWidth="1.0" rx="0.5" />
            <polygon points="-5.5,-4.5 -2,-4.5 -3.75,-7.5" fill="#dc2626" stroke="#0f172a" strokeWidth="0.8" strokeLinejoin="round" />
            
            {/* Right Tower */}
            <rect x="2.5" y="-4.5" width="2.5" height="7" fill="url(#brickGrad)" stroke="#0f172a" strokeWidth="1.0" rx="0.5" />
            <polygon points="2,-4.5 5.5,-4.5 3.75,-7.5" fill="#dc2626" stroke="#0f172a" strokeWidth="0.8" strokeLinejoin="round" />
            
            {/* Wooden Arched Gate */}
            <path d="M -1.2,2.5 L -1.2,0.8 A 1.2,1.2 0 0 1 1.2,0.8 L 1.2,2.5 Z" fill="#78350f" stroke="#0f172a" strokeWidth="0.8" />
            
            {/* Waving Flag on right tower */}
            <g transform="translate(3.75, -7.5)">
              <line x1="0" y1="0" x2="0" y2="-2.5" stroke="#0f172a" strokeWidth="0.6" />
              <polygon points="0,-2.5 2,-2 0,-1.5" fill="url(#goldGrad)" stroke="#0f172a" strokeWidth="0.4" />
            </g>
          </g>
        </g>
      );
    }

    // Default: Cute Cartoon Campfire
    return (
      <g>
        {/* Soft fire light glow */}
        <circle r="6" cy="1.5" fill="url(#portalGlow)" opacity="0.3" className="animate-glow-slow" />
        {/* Ground shadow */}
        <ellipse rx="5.5" ry="1.8" cy="3.5" fill="rgba(0, 0, 0, 0.45)" />
        
        {/* Campfire logs & flames */}
        <g transform="translate(0, -0.8)">
          {/* Logs */}
          <rect x="-3" y="1.2" width="6" height="1.2" rx="0.5" fill="#78350f" stroke="#0f172a" strokeWidth="0.8" transform="rotate(-15)" />
          <rect x="-3" y="1.2" width="6" height="1.2" rx="0.5" fill="#78350f" stroke="#0f172a" strokeWidth="0.8" transform="rotate(15)" />
          
          {/* Outer flame */}
          <path d="M -2,1 C -3,-2.5 0,-5 0,-5 C 0,-5 3,-2.5 2,1 Z" fill="url(#fireGrad)" stroke="#0f172a" strokeWidth="1.0" strokeLinejoin="round">
            <animateTransform attributeName="transform" type="scale" values="1 1; 1.05 1.15; 1 1" dur="1s" repeatCount="indefinite" additive="sum" />
          </path>
          {/* Inner flame */}
          <path d="M -1.2,1 C -1.8,-1.2 0,-3 0,-3 C 0,-3 1.8,-1.2 1.2,1 Z" fill="#f97316" stroke="#0f172a" strokeWidth="0.8" strokeLinejoin="round">
            <animateTransform attributeName="transform" type="scale" values="1 1; 1.1 1.05; 1 1" dur="0.8s" repeatCount="indefinite" additive="sum" />
          </path>
          {/* Core flame */}
          <path d="M -0.5,1 C -0.8,-0.2 0,-1.5 0,-1.5 C 0,-1.5 0.8,-0.2 0.5,1 Z" fill="#fef08a" stroke="#0f172a" strokeWidth="0.6" strokeLinejoin="round" />
        </g>
      </g>
    );
  };

  const pathD = buildPath();
  const pathLength = mapRef.current?.getTotalLength() ?? 1000;

  // Trigger path drawing inside map modal
  useEffect(() => {
    if (showMapModal) {
      setAnimatedPath(0);
      let start: number;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min(1, (ts - start) / 1600);
        setAnimatedPath(progress);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [showMapModal]);

  const openMap = () => {
    playSelectSound();
    setShowMapModal(true);
  };

  const closeMap = () => {
    playSelectSound();
    setShowMapModal(false);
  };

  const handleMilestoneClick = (milestone: JourneyMilestone) => {
    playSelectSound();
    setActiveMilestone(milestone);
  };

  const closeMilestoneDetail = () => {
    playSelectSound();
    setActiveMilestone(null);
  };

  return (
    <section id="journey" className="py-20 px-4 md:px-8 border-b border-slate-800 bg-slate-950/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Desk Layout (Columns) at the top of the section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          {/* Left Column: Header Info */}
          <ScrollReveal direction="left" playSound>
            <div className="text-left md:pr-6">
              <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">02 JOURNEY</span>
              <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-3">Adventure Log</h2>
              <p className="text-sm text-game-muted font-sans leading-relaxed">
                Chronicle of landmarks unlocked. Open the World Map to view coordinates and checkpoints represented as castles, forts, and towers!
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Dynamic Interactive Mini-Map Preview Card */}
          <ScrollReveal direction="right" delay={150}>
            <div className="flex justify-center md:justify-end">
              <div 
                onClick={openMap}
                className="relative w-64 h-36 rounded-lg overflow-hidden cursor-pointer group border-2 hover:border-amber-500 hover:shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300 transform hover:-rotate-1 hover:scale-105"
                style={{
                  borderColor: '#78350f',
                  backgroundImage: `url(${worldMapBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dotted path preview inside mini-map */}
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 15 80 C 16.2 80, 16.8 52, 18 52 C 20.8 52, 22.2 25, 25 25 C 33 25, 37 38, 45 38 C 47 38, 48 70, 50 70 C 57.2 70, 60.8 80, 68 80 C 72 80, 74 55, 78 55 C 80.8 55, 82.2 30, 85 30" fill="none" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
                  {/* Glowing mini flag */}
                  <circle cx="50" cy="70" r="3" fill="#ef4444" />
                  <circle cx="50" cy="70" r="1.5" fill="#fff" />
                </svg>

                {/* Rotating mini compass ornament in background */}
                <div className="absolute bottom-2 right-2 opacity-25 group-hover:opacity-40 transition-opacity">
                  <Compass size={40} className="text-amber-500 animate-spin-slow" />
                </div>

                {/* Glowing Overlay Hover Banner */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors flex flex-col justify-end p-3.5">
                  <span className="font-pressstart text-[8px] text-amber-500 tracking-wider flex items-center gap-1.5 glow-text-gold">
                    <Map size={10} className="animate-bounce" /> EXAMINE WORLD MAP
                  </span>
                  <p className="text-[9px] text-slate-400 font-sans italic mt-1">Click to view 3D castle nodes</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Collapsible Dropdown Ledger button for the Log list */}
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => {
              playSelectSound();
              setIsLogExpanded(!isLogExpanded);
            }}
            className="w-full pixel-box p-4 bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between font-pressstart text-[9px] tracking-widest text-amber-400"
          >
            <span className="flex items-center gap-2">
              📜 {isLogExpanded ? 'CLOSE LOG ENTRIES' : 'OPEN ADVENTURE LOG (8 CHECKPOINTS)'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLogExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Spacious Timeline List (Expands/Collapses smoothly) */}
        {isLogExpanded && (
          <div className="relative border-l border-amber-900/40 ml-4 md:ml-6 pl-6 md:pl-8 py-4 flex flex-col gap-8 max-w-4xl mx-auto animate-[fadeIn_0.2s_ease-out]">
            {journey.map((milestone) => (
              <div 
                key={milestone.id}
                onClick={() => handleMilestoneClick(milestone)}
                className="relative group cursor-pointer"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-amber-900 flex items-center justify-center text-amber-500 group-hover:border-amber-500 transition-all duration-300">
                  {getIcon(milestone.icon, 11)}
                </div>

                {/* Milestone Detail Card */}
                <div className="pixel-box p-5 bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(217,119,6,0.1)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-sans">{milestone.title}</h3>
                    <span className="self-start sm:self-center font-pressstart text-[8px] px-2 py-0.5 border border-amber-900/40 bg-amber-950/40 text-amber-500 rounded">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {milestone.description}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1 text-[8px] font-pressstart text-amber-500/50 group-hover:text-amber-500 transition-colors">
                    READ LOG DETAILS <ChevronRight size={8} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── WORLD MAP MODAL (Fullscreen spacious map view!) ─── */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-4xl aspect-[4/3] max-h-[90vh] bg-slate-900 border-4 border-amber-900 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{
              borderColor: '#78350f',
              backgroundImage: `url(${worldMapBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8), 0 0 0 4px #92400e',
            }}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-amber-900/50 flex justify-between items-center z-10 bg-slate-950/95 shadow-md">
              <span className="font-pressstart text-[10px] text-amber-400 font-bold flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                <Compass size={14} className="animate-spin-slow text-amber-400" /> WORLD MAP: REALM OF KARAN
              </span>
              <button 
                onClick={closeMap}
                className="p-1.5 text-amber-400 hover:text-amber-200 hover:scale-110 active:scale-95 transition-all duration-150 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Map Body */}
            <div className="flex-1 relative overflow-hidden select-none">
              {/* Semi-transparent dark overlay to help nodes stand out clearly */}
              <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
              {/* Parchment texture overlay */}

              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(139,90,43,0.08) 20px, rgba(139,90,43,0.08) 21px),
                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139,90,43,0.08) 20px, rgba(139,90,43,0.08) 21px)
                  `,
                }}
              />

              {/* Map SVG Layer */}
              <svg className="absolute inset-0 w-full h-full" viewBox="-14 -12 128 120" preserveAspectRatio="none">
                <defs>
                  <filter id="pathGlow">
                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="nodeGlow">
                    <feGaussianBlur stdDeviation="1.0" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#b91c1c" />
                    <stop offset="50%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                  <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b45309" />
                    <stop offset="60%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                  <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4c1d95" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </linearGradient>
                  <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="castleBrickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Shadow path */}
                <path d={pathD} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1.2" strokeLinecap="round" transform="translate(0.3, 0.4)" />

                {/* Winding dotted path */}
                <path
                  ref={mapRef}
                  d={pathD}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeDasharray="2.5 1.5"
                  filter="url(#pathGlow)"
                  style={{
                    strokeDashoffset: animatedPath < 1 ? pathLength * (1 - animatedPath) : 0,
                    transition: 'stroke-dashoffset 0.1s linear',
                  }}
                />

                {/* Map Vintage Header Banner Scroll */}
                <g transform="translate(50, 9)" opacity="0.85">
                  <rect x="-24" y="-4" width="48" height="8" rx="2" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="0.8" />
                  <text x="0" y="1.2" textAnchor="middle" fontSize="3.8" fontFamily="monospace" fill="#fbbf24" fontWeight="bold" letterSpacing="1.2">REALM OF KARAN</text>
                </g>

                {/* Compass Rose */}
                <g transform="translate(86, 14)" opacity="0.75" className="animate-spin-slow">
                  <circle r="4.5" fill="none" stroke="#fbbf24" strokeWidth="0.4" />
                  <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#fbbf24" strokeWidth="0.4" />
                  <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#fbbf24" strokeWidth="0.4" />
                  <polygon points="0,-5.5 1,-1 0,0 -1,-1" fill="#fbbf24" />
                  <polygon points="0,5.5 1,1 0,0 -1,1" fill="#92400e" />
                  <polygon points="-5.5,0 -1,1 0,0 -1,-1" fill="#92400e" />
                  <polygon points="5.5,0 1,1 0,0 1,-1" fill="#fbbf24" />
                </g>

                {/* Vintage Sailing Ship in the river */}
                <g transform="translate(88, 51)" opacity="0.85" className="animate-float">
                  <path d="M -3,0 L 3,0 L 2,1.5 L -2,1.5 Z" fill="#78350f" stroke="#451a03" strokeWidth="0.35" />
                  <path d="M -2,0 L -0.5,-3.5 L 0,0 Z" fill="#ffffff" />
                  <path d="M 0,0 L 1.2,-4 L 2.2,0 Z" fill="#ffffff" />
                </g>

                {/* Hidden Treasure Chest */}
                <g transform="translate(8, 14)" opacity="0.8" className="hover:opacity-100 cursor-help transition-opacity">
                  <rect x="-2" y="-0.5" width="4" height="2" fill="#d97706" stroke="#78350f" strokeWidth="0.4" />
                  <path d="M -2,-0.5 L 2,-0.5 L 1.5,-1.8 L -1.5,-1.8 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.4" />
                  <circle cx="0" cy="-0.6" r="0.3" fill="#fcd34d" />
                  <circle cx="1.5" cy="-2.5" r="0.4" fill="#ffffff" className="animate-pulse" />
                </g>

                {/* Sea Monster / Serpent tail in the water */}
                <g transform="translate(48, 85)" opacity="0.4" className="animate-pulse">
                  <path d="M -3,0 Q -1,-4 0,0 Q 1,-4 3,0" fill="none" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" />
                  <text x="-4" y="-3" fontSize="2" fill="#0ea5e9" fontFamily="monospace">~</text>
                </g>

                {/* Terrain elements */}
                <g opacity="0.25" fill="#78350f">
                  <path d="M5 65 L11 55 L17 65z" />
                  <path d="M8 65 L14 50 L20 65z" fill="#92400e" />
                  <path d="M72 20 L77 11 L82 20z" />
                  <path d="M75 20 L80 9 L85 20z" fill="#92400e" />
                </g>
                {[[30, 22], [48, 75], [64, 76], [90, 22]].map(([tx, ty], index) => (
                  <g key={index} transform={`translate(${tx},${ty})`} opacity="0.2" fill="#15803d">
                    <rect x="-0.5" y="2" width="1" height="3" fill="#78350f" />
                    <polygon points="0,-3 -3,2 3,2" />
                  </g>
                ))}

                {/* Winding checkpoints represented as dynamic vector castle / building icons */}
                {journey.map((milestone, index) => {
                  const pos = getPos(milestone.id);
                  const isRevealed = animatedPath > index / journey.length;
                  return (
                    <g
                      key={milestone.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      className="cursor-pointer group"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                      onClick={() => handleMilestoneClick(milestone)}
                    >
                      {/* Render custom castle/academy/cottage graphic shape */}
                      <g className="transform group-hover:scale-110 transition-transform">
                        {renderMapNodeIcon(milestone.id)}
                      </g>

                      {/* Small floating node coordinate label */}
                      <circle cx="0" cy="5" r="1.8" fill="#1c1410" stroke="#fbbf24" strokeWidth="0.3" />
                      <text x="-1" y="6" fontSize="2.8" fill="#fbbf24" opacity="0.8">{index + 1}</text>
                      
                      {/* Floating tooltip label (Shifts horizontally near edges to avoid clipping) */}
                      <g 
                        transform={`translate(${pos.x < 22 ? 14 : pos.x > 78 ? -14 : 0}, -11)`} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      >
                        <rect 
                          x={-(Math.max(36, milestone.title.length * 1.7 + 4) / 2)} 
                          y="-4" 
                          width={Math.max(36, milestone.title.length * 1.7 + 4)} 
                          height="6.5" 
                          rx="1" 
                          fill="rgba(15,10,5,0.95)" 
                          stroke="#fbbf24" 
                          strokeWidth="0.35" 
                        />
                        <text x="0" y="0.5" textAnchor="middle" fontSize="2.8" fill="#fbbf24" fontFamily="monospace">{milestone.title}</text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Modal Footer helper */}
            <div className="p-3 border-t border-amber-900/40 text-center font-sans text-[10px] text-amber-500/60 pointer-events-none select-none z-10">
              🧭 Examine checkpoints represented as castles, academies, and forts. Click to view log details.
            </div>
          </div>
        </div>
      )}

      {/* ─── ADVENTURE LOG DETAIL MODAL (Fullscreen spacious details, no clipping or shrinking!) ─── */}
      {activeMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-[fadeIn_0.15s_ease-out]">
          <div className="relative w-full max-w-lg pixel-box p-6 bg-slate-900 border border-amber-900/60 shadow-2xl flex flex-col justify-between max-h-[85vh] overflow-hidden"
            style={{ borderColor: 'rgba(217,119,6,0.5)', background: '#0b0f19' }}
          >
            {/* Close Button */}
            <button 
              onClick={closeMilestoneDetail}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Milestone Header & Content wrapper */}
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 text-amber-500 font-pressstart text-[8px] tracking-wider mb-4">
                <Calendar size={10} /> {activeMilestone.year}
              </div>
              
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-3 mb-4">
                <span className="p-2 bg-amber-950/60 rounded-md border border-amber-900/50 text-amber-500">
                  {getIcon(activeMilestone.icon, 18)}
                </span>
                {activeMilestone.title}
              </h3>

              {/* Complete details description */}
              <div className="text-slate-200 text-sm leading-relaxed font-sans pr-2 overflow-y-auto border-t border-b border-slate-800/80 py-4 my-2 flex-grow max-h-[45vh]">
                {activeMilestone.description}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end">
              {showMapModal ? (
                <PixelButton
                  onClick={closeMilestoneDetail}
                  variant="gold"
                  className="px-4 py-2 font-pressstart text-[8px]"
                >
                  RETURN TO MAP
                </PixelButton>
              ) : (
                <PixelButton
                  onClick={closeMilestoneDetail}
                  variant="gray"
                  className="px-4 py-2 font-pressstart text-[8px]"
                >
                  CLOSE LOG
                </PixelButton>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
