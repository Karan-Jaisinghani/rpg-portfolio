import React from 'react';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
  animate?: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({
  level,
  className = '',
  animate = true,
}) => {
  // Overall level progress percentage (21 to 100)
  const totalLevels = 100 - 21;
  const currentProgress = level - 21;
  const percentage = Math.min(100, Math.max(0, (currentProgress / totalLevels) * 100));

  return (
    <div className={`w-full max-w-xl ${className}`}>
      <div className="flex justify-between items-center mb-1 font-pressstart text-[10px] tracking-wide text-game-muted">
        <span className="text-game-gold font-bold">LEVEL {level}</span>
        <span>
          LVL {level} / 100 ({Math.floor(percentage)}%)
        </span>
      </div>
      <div className="relative h-6 bg-slate-950 border-2 border-slate-800 p-0.5 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
        <div
          className={`h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(217,119,6,0.6)] ${
            animate ? 'transition-all duration-300 ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
        {/* Diagonal stripes on the bar */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:16px_16px] pointer-events-none opacity-30" />
      </div>
    </div>
  );
};
