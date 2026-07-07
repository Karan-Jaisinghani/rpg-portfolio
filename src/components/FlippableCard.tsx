import React, { useState, memo } from 'react';
import { Hero3D } from './Hero3D';
import { portfolioData } from '../data/portfolioData';
import { Swords, Cpu, Zap, Shield, Users } from 'lucide-react';

const STAT_ICONS = [Swords, Cpu, Shield, Users, Zap];
const RARITY_COLORS: Record<string, string> = {
  'Algorithmic Logic (STR)': '#f59e0b',
  'Software Architecture (DEX)': '#a78bfa',
  'System Design (CON)': '#34d399',
  'Public Speaking (CHA)': '#f472b6',
  'Team Leadership (LDR)': '#60a5fa',
};

/** Drop-in replacement for the Hero3D card area — adds a click-to-flip mechanic.
 *  Front: existing 3D holographic hero.
 *  Back: Character stat sheet (RPG card back).
 */
export const FlippableCard: React.FC = memo(() => {
  const [flipped, setFlipped] = useState(false);
  const { character } = portfolioData;

  return (
    <div
      className="relative w-full h-[220px] flex items-center justify-center mb-2"
      style={{ perspective: '1000px' }}
    >
      {/* Flip instruction hint */}

      {/* Card container — CSS 3D flip */}
      <div
        className="relative w-full h-full cursor-pointer select-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.34,1.26,0.64,1)',
        }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        aria-label={flipped ? 'Flip card to front' : 'Flip card to see stats'}
      >
        {/* ── FRONT FACE: 3D Hero ── */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Flip hint badge — top right corner, fades out when flipped */}
          <div
            className="absolute top-2 right-2 z-30 pointer-events-none"
            style={{ opacity: flipped ? 0 : 1, transition: 'opacity 0.3s' }}
          >
            <span className="font-pressstart text-[6px] text-slate-600 bg-slate-950/70 border border-slate-800 px-1.5 py-0.5 rounded tracking-widest">
              TAP TO INSPECT
            </span>
          </div>
          <Hero3D className="w-full h-full" glowColor="#d97706" />
        </div>

        {/* ── BACK FACE: Stat Sheet ── */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Holographic card back */}
          <div
            className="w-full h-full flex flex-col p-3 gap-1.5 relative"
            style={{
              background:
                'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 80%)',
              border: '1px solid rgba(167,139,250,0.35)',
              boxShadow: '0 0 24px rgba(139,92,246,0.25), inset 0 0 40px rgba(139,92,246,0.06)',
            }}
          >
            {/* Holographic shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(115deg, transparent 0%, rgba(167,139,250,0.07) 40%, rgba(251,191,36,0.05) 60%, transparent 100%)',
              }}
            />

            {/* Card header */}
            <div className="flex items-center gap-2 border-b border-purple-500/20 pb-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-pressstart text-[8px] text-amber-400"
                style={{
                  background: 'linear-gradient(135deg, #78350f, #d97706)',
                  boxShadow: '0 0 8px rgba(217,119,6,0.5)',
                }}
              >
                KJ
              </div>
              <div className="flex flex-col">
                <span className="font-pressstart text-[7px] text-amber-400 leading-tight">
                  {character.name.toUpperCase()}
                </span>
                <span className="font-pressstart text-[6px] text-purple-400 leading-tight">
                  {character.class} • LVL {character.stats.level}
                </span>
              </div>
              <span
                className="ml-auto font-pressstart text-[6px] text-yellow-400 border border-yellow-400/30 px-1 py-0.5 rounded"
                style={{ boxShadow: '0 0 6px rgba(234,179,8,0.2)' }}
              >
                S-TIER
              </span>
            </div>

            {/* Attributes */}
            <div className="flex flex-col gap-1 flex-1 justify-center">
              {character.attributes.map((attr, i) => {
                const Icon = STAT_ICONS[i];
                const color = RARITY_COLORS[attr.name] ?? '#94a3b8';
                return (
                  <div key={attr.name} className="flex items-center gap-1.5">
                    <Icon
                      size={9}
                      style={{ color, flexShrink: 0 }}
                    />
                    <span className="font-pressstart text-[6px] text-slate-300 flex-1 truncate leading-tight">
                      {attr.name.split(' ')[0]}
                    </span>
                    <div
                      className="w-16 h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${attr.value}%`,
                          background: `linear-gradient(90deg, ${color}88, ${color})`,
                          boxShadow: `0 0 4px ${color}66`,
                        }}
                      />
                    </div>
                    <span className="font-pressstart text-[6px] w-5 text-right" style={{ color }}>
                      {attr.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Card footer */}
            <div className="border-t border-purple-500/20 pt-1.5 flex justify-between items-center">
              <span className="font-pressstart text-[5px] text-slate-500">
                XP {character.stats.xpEarned.toLocaleString()} / {character.stats.xpNextLevel.toLocaleString()}
              </span>
              <span className="font-pressstart text-[5px] text-slate-500">
                QUESTS: {character.stats.questsCompleted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
