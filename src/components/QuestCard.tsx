import React from 'react';
import { Star, CheckCircle2, RotateCw } from 'lucide-react';
import type { Quest } from '../data/portfolioData';
import { playSelectSound } from '../hooks/useGameAudio';

interface QuestCardProps {
  quest: Quest;
  onSelect: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = React.memo(({ quest, onSelect }) => {
  const isEpic = quest.type === 'Epic Quest';
  
  return (
    <div
      onClick={() => { playSelectSound(); onSelect(quest); }}
      className={`glass-panel p-5 rounded-md cursor-pointer hover:border-amber-500/60 hover:shadow-[0_0_15px_rgba(217,119,6,0.15)] transition-all duration-300 relative group flex flex-col justify-between h-full ${
        isEpic ? 'border-purple-500/20' : 'border-slate-800'
      }`}
    >
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Card Header tag */}
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-[9px] font-pressstart px-2 py-0.5 tracking-wider ${
                isEpic
                  ? 'text-purple-400 bg-purple-950/40 border border-purple-500/30'
                  : 'text-amber-400 bg-amber-950/30 border border-amber-500/20'
              }`}
            >
              {quest.type.toUpperCase()}
            </span>
            
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-game-muted font-pressstart scale-90">DIFF</span>
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className={i < quest.difficulty ? 'fill-current text-amber-500' : 'text-slate-800'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors font-sans mb-2">
            {quest.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-game-muted font-sans line-clamp-3">
            {quest.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {quest.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] font-sans bg-slate-950/60 text-slate-400 px-2 py-0.5 border border-slate-855 rounded-sm">
              {tag}
            </span>
          ))}
          {quest.tags.length > 3 && (
            <span className="text-[9px] font-sans bg-slate-950/60 text-slate-500 px-1.5 py-0.5 border border-slate-855 rounded-sm">
              +{quest.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer status */}
      <div className="border-t border-slate-850/80 mt-5 pt-3.5 flex justify-between items-center z-10">
        <div className="flex items-center gap-1">
          {quest.status === 'COMPLETED' ? (
            <>
              <CheckCircle2 size={12} className="text-green-500" />
              <span className="text-[9px] font-pressstart tracking-wider text-green-500">COMPLETED</span>
            </>
          ) : (
            <>
              <RotateCw size={12} className="text-blue-400 animate-spin-slow" />
              <span className="text-[9px] font-pressstart tracking-wider text-blue-400">IN PROGRESS</span>
            </>
          )}
        </div>
        <span className="text-xs text-amber-500 group-hover:translate-x-1 transition-transform font-bold font-pressstart text-[9px]">
          DETAILS &rarr;
        </span>
      </div>
    </div>
  );
});
