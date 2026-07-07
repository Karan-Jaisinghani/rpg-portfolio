import React from 'react';
import { Award, Trophy as TrophyIcon, Shield, Code, Mic } from 'lucide-react';
import type { Trophy } from '../data/portfolioData';
interface TrophyCardProps {
  trophy: Trophy;
}

export const TrophyCard: React.FC<TrophyCardProps> = ({ trophy }) => {
  // Select icon based on ID or text
  const getIcon = () => {
    switch (trophy.id) {
      case 'nec-trophy':
        return <TrophyIcon className="w-10 h-10 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />;
      case 'ecell-vp':
        return <Award className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />;
      case 'orators-anchor':
      case 'orators-lead-trophy':
        return <Mic className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />;
      case 'leetcode':
        return <Code className="w-10 h-10 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />;
      default:
        return <Shield className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />;
    }
  };

  // Determine border and text styling based on rarity
  const getRarityStyles = () => {
    switch (trophy.rarity) {
      case 'Legendary':
        return {
          border: 'border-yellow-500/40',
          bg: 'bg-yellow-950/20',
          text: 'text-yellow-400',
          glow: 'rgba(234, 179, 8, 0.4)',
        };
      case 'Epic':
        return {
          border: 'border-purple-500/40',
          bg: 'bg-purple-950/20',
          text: 'text-purple-400',
          glow: 'rgba(168, 85, 247, 0.4)',
        };
      case 'Rare':
        return {
          border: 'border-blue-500/40',
          bg: 'bg-blue-950/20',
          text: 'text-blue-400',
          glow: 'rgba(59, 130, 246, 0.4)',
        };
      default:
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-950/20',
          text: 'text-emerald-400',
          glow: 'rgba(34, 197, 94, 0.4)',
        };
    }
  };

  const styles = getRarityStyles();

  return (
    <div className="flex flex-col items-center group">
      {/* 3D Pedestal and Trophy container */}
      <div className="relative w-44 h-48 flex flex-col justify-end items-center mb-4">
        {/* Glow light beam background */}
        <div
          className="absolute bottom-8 w-24 h-32 rounded-t-full opacity-35 group-hover:opacity-60 transition-opacity duration-500 animate-glow-slow"
          style={{
            background: `linear-gradient(to top, ${styles.glow}, transparent)`,
            filter: 'blur(10px)',
          }}
        />

        {/* Floating Trophy */}
        <div className="z-10 mb-4 animate-float group-hover:scale-110 transition-transform duration-300">
          {getIcon()}
        </div>

        {/* 3D Pedestal (Drawn using CSS shapes to represent a concrete game platform) */}
        <div className="relative z-10 w-28 flex flex-col items-center">
          {/* Top of pedestal */}
          <div className="w-24 h-4 bg-slate-700 border-x-2 border-t-2 border-slate-500/80 rounded-t-sm shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]" />
          {/* Middle pillar */}
          <div className="w-20 h-10 bg-slate-800 border-x-2 border-slate-600/80 relative flex items-center justify-center">
            <span className="text-[7px] font-pressstart tracking-widest text-slate-500 uppercase">
              {trophy.rarity}
            </span>
          </div>
          {/* Base slab */}
          <div className="w-28 h-6 bg-slate-900 border-2 border-slate-700 rounded-sm shadow-[0_4px_10px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      {/* Trophy Info Details */}
      <div className="text-center max-w-[180px] h-20 flex flex-col justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-amber-400 transition-colors font-sans line-clamp-1">
            {trophy.title}
          </h3>
          <p className="text-xs text-game-muted mb-2 font-sans line-clamp-2 px-1">
            {trophy.description}
          </p>
        </div>
      </div>
    </div>
  );
};
