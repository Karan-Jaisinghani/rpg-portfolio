import React, { useState, useRef, useEffect, memo } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

/* ─── Layout: position each skill node in SVG coordinate space ─── */
const LEVEL_LABEL: Record<string, string> = {
  Expert: 'S',
  Advanced: 'A',
  Intermediate: 'B',
  Novice: 'C',
};

type Colors = { ring: string; fill: string; text: string; glow: string };

const LEVEL_COLOR: Record<string, Colors> = {
  Expert:       { ring: '#f59e0b', fill: '#78350f', text: '#fef08a', glow: 'rgba(245,158,11,0.35)' },
  Advanced:     { ring: '#a78bfa', fill: '#2e1065', text: '#ddd6fe', glow: 'rgba(167,139,250,0.3)' },
  Intermediate: { ring: '#34d399', fill: '#022c22', text: '#a7f3d0', glow: 'rgba(52,211,153,0.25)' },
  Novice:       { ring: '#60a5fa', fill: '#1e3a5f', text: '#bfdbfe', glow: 'rgba(96,165,250,0.25)' },
};

function getColors(level: string): Colors {
  return LEVEL_COLOR[level] ?? { ring: '#94a3b8', fill: '#0f172a', text: '#e2e8f0', glow: 'rgba(148,163,184,0.2)' };
}

/* ─── Tree node positions — manually tuned for readability ─── */
interface NodeLayout {
  id: string;
  x: number; // 0–100 in viewBox space
  y: number;
}

const TREE_LAYOUT: NodeLayout[] = [
  // Column 1 — Root: Python
  { id: 'python',        x: 50, y: 10 },
  // Column 2 — Python children
  { id: 'pandas-numpy',  x: 20, y: 30 },
  { id: 'oops',          x: 50, y: 30 },
  { id: 'scikit-learn',  x: 80, y: 30 },
  // Column 3 — Further branches
  { id: 'streamlit-tkinter', x: 10, y: 54 },
  { id: 'html-css',      x: 35, y: 54 },
  { id: 'java',          x: 65, y: 54 },
  { id: 'sql',           x: 90, y: 54 },
  // Column 4 — Tools
  { id: 'git',           x: 50, y: 77 },
];

/* ─── Edges: [from, to] — which nodes are connected ─── */
const EDGES: [string, string][] = [
  ['python', 'pandas-numpy'],
  ['python', 'scikit-learn'],
  ['python', 'oops'],
  ['pandas-numpy', 'streamlit-tkinter'],
  ['pandas-numpy', 'html-css'],
  ['scikit-learn', 'java'],
  ['scikit-learn', 'sql'],
  ['html-css', 'git'],
  ['java', 'git'],
  ['oops', 'git'],
];

/* ─── Component ─── */
export const SkillTree: React.FC = memo(() => {
  const { inventory } = portfolioData;
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger node reveal animation once scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const nodeMap: Record<string, NodeLayout> = {};
  TREE_LAYOUT.forEach((n) => { nodeMap[n.id] = n; });

  const skillMap: Record<string, typeof inventory[number]> = {};
  inventory.forEach((s) => { skillMap[s.id] = s; });

  const selectedSkill = selected ? skillMap[selected] : null;

  return (
    <section id="inventory" className="py-20 px-4 md:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal direction="up" playSound>
          <div className="mb-12">
            <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">05 INVENTORY</span>
            <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">Skill Tree</h2>
            <p className="text-sm text-game-muted font-sans italic">Follow the paths of mastery.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={containerRef}>

          {/* ── SVG Skill Tree ── */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full rounded-lg overflow-hidden border border-slate-800/60"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%), #05070f',
                minHeight: 420,
              }}
            >
              <svg
                viewBox="0 0 100 90"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto"
                style={{ display: 'block' }}
                aria-label="Skill tree diagram"
              >
                <defs>
                  {/* Animated gradient for edges */}
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
                  </linearGradient>
                  {/* Glow filter for selected node */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ── Edges ── */}
                {EDGES.map(([fromId, toId]) => {
                  const from = nodeMap[fromId];
                  const to   = nodeMap[toId];
                  if (!from || !to) return null;
                  const isHighlighted = selected === fromId || selected === toId;
                  return (
                    <line
                      key={`${fromId}-${toId}`}
                      x1={from.x} y1={from.y}
                      x2={to.x}   y2={to.y}
                      stroke={isHighlighted ? 'url(#edgeGrad)' : 'rgba(100,116,139,0.25)'}
                      strokeWidth={isHighlighted ? 0.6 : 0.35}
                      strokeDasharray={isHighlighted ? 'none' : '1 1'}
                      style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                    />
                  );
                })}

                {/* ── Nodes ── */}
                {TREE_LAYOUT.map((node, i) => {
                  const skill = skillMap[node.id];
                  if (!skill) return null;
                  const colors = getColors(skill.level);
                  const isSelected = selected === node.id;
                  const delay = visible ? i * 60 : 99999;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelected(isSelected ? null : node.id)}
                      style={{
                        cursor: 'pointer',
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ${delay}ms, transform 0.5s ${delay}ms`,
                        transform: visible
                          ? `translate(${node.x}px, ${node.y}px)`
                          : `translate(${node.x}px, ${node.y + 4}px)`,
                      }}
                      filter={isSelected ? 'url(#nodeGlow)' : undefined}
                    >
                      {/* Outer glow ring (selected) */}
                      {isSelected && (
                        <circle
                          r="5.5"
                          fill="none"
                          stroke={colors.ring}
                          strokeWidth="0.4"
                          opacity="0.5"
                        >
                          <animate attributeName="r" values="5;6.5;5" dur="1.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.4s" repeatCount="indefinite" />
                        </circle>
                      )}

                      {/* Node body */}
                      <circle
                        r="4"
                        fill={colors.fill}
                        stroke={colors.ring}
                        strokeWidth={isSelected ? 0.7 : 0.4}
                        style={{ transition: 'stroke-width 0.25s' }}
                      />

                      {/* XP fill arc — visual bar inside circle */}
                      <circle
                        r="2.8"
                        fill="none"
                        stroke={colors.ring}
                        strokeWidth="1.2"
                        strokeDasharray={`${(skill.xpPercent / 100) * 17.6} 17.6`}
                        strokeLinecap="round"
                        transform="rotate(-90)"
                        opacity="0.5"
                      />

                      {/* Level badge */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="2.6"
                        fontFamily="'Press Start 2P', monospace"
                        fill={colors.text}
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {LEVEL_LABEL[skill.level]}
                      </text>

                      {/* Skill name below */}
                      <text
                        y="6.2"
                        textAnchor="middle"
                        fontSize="1.65"
                        fontFamily="Outfit, sans-serif"
                        fill="rgba(226,232,240,0.8)"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {skill.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 px-4 pb-4 justify-center">
                {(['Expert', 'Advanced', 'Intermediate'] as const).map((lvl) => {
                  const c = getColors(lvl);
                  return (
                    <div key={lvl} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: c.ring }} />
                      <span className="font-pressstart text-[7px]" style={{ color: c.text }}>
                        {lvl}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Info Panel ── */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 pixel-box p-5 min-h-[200px] flex flex-col gap-4"
              style={{ transition: 'all 0.3s' }}
            >
              {selectedSkill ? (
                <>
                  {/* Skill header */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-pressstart text-xs flex-shrink-0"
                      style={{
                        background: getColors(selectedSkill.level).fill,
                        border: `2px solid ${getColors(selectedSkill.level).ring}`,
                        color: getColors(selectedSkill.level).text,
                        boxShadow: `0 0 12px ${getColors(selectedSkill.level).glow}`,
                      }}
                    >
                      {LEVEL_LABEL[selectedSkill.level]}
                    </div>
                    <div>
                      <p className="font-pressstart text-[9px] text-white leading-tight">{selectedSkill.name}</p>
                      <span
                        className="inline-block font-pressstart text-[7px] mt-1 px-2 py-0.5 rounded"
                        style={{
                          background: getColors(selectedSkill.level).fill,
                          color: getColors(selectedSkill.level).text,
                          border: `1px solid ${getColors(selectedSkill.level).ring}44`,
                        }}
                      >
                        {selectedSkill.level}
                      </span>
                    </div>
                  </div>

                  {/* XP Bar */}
                  <div>
                    <div className="flex justify-between text-[7px] font-pressstart mb-1">
                      <span className="text-slate-500">MASTERY</span>
                      <span className="text-amber-500">{selectedSkill.xpPercent}%</span>
                    </div>
                    <div className="h-2 bg-slate-950 border border-slate-800 rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all duration-700 ease-out"
                        style={{
                          width: `${selectedSkill.xpPercent}%`,
                          background: `linear-gradient(90deg, ${getColors(selectedSkill.level).fill}, ${getColors(selectedSkill.level).ring})`,
                          boxShadow: `0 0 6px ${getColors(selectedSkill.level).glow}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs font-sans leading-relaxed">
                    {selectedSkill.description}
                  </p>

                  {/* Projects */}
                  <div>
                    <p className="font-pressstart text-[7px] text-slate-500 mb-2">USED IN:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.projects.map((p) => (
                        <span
                          key={p}
                          className="font-sans text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-300 rounded"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center gap-3 py-8">
                  <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center">
                    <span className="font-pressstart text-[10px] text-slate-600">?</span>
                  </div>
                  <p className="font-pressstart text-[8px] text-slate-600 leading-relaxed">
                    SELECT A<br />SKILL NODE<br />TO INSPECT
                  </p>
                  <p className="font-sans text-[11px] text-slate-700">
                    Click any node in the tree to view details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
