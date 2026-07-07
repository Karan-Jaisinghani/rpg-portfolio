import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import type { Quest } from '../data/portfolioData';
import { QuestCard } from './QuestCard';
import { ScrollReveal } from './ScrollReveal';
import { playClickSound } from '../hooks/useGameAudio';

interface QuestBoardSectionProps {
  onSelectQuest: (quest: Quest) => void;
}

export const QuestBoardSection: React.FC<QuestBoardSectionProps> = React.memo(({ onSelectQuest }) => {
  const { quests } = portfolioData;
  const [activeTab, setActiveTab] = useState<'All' | 'Developer Projects' | 'Web Apps' | 'Other'>('All');

  const filteredQuests = quests.filter((quest) => {
    if (activeTab === 'All') return true;
    return quest.category === activeTab;
  });

  const tabs: ('All' | 'Developer Projects' | 'Web Apps' | 'Other')[] = ['All', 'Developer Projects', 'Web Apps', 'Other'];

  return (
    <section id="quests" className="py-20 px-4 md:px-8 border-b border-slate-800 max-w-6xl mx-auto">
      {/* Section Header */}
      <ScrollReveal direction="up" playSound>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">03 QUESTS</span>
            <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">Quest Board</h2>
            <p className="text-sm text-game-muted font-sans italic">Every project is a quest completed.</p>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { playClickSound(); setActiveTab(tab); }}
                  onMouseEnter={() => {}}
                  className={`font-pressstart text-[8px] md:text-[9px] tracking-wider px-3.5 py-2.5 transition-all duration-100 ease-out select-none border-2 rounded ${
                    isActive
                      ? 'bg-amber-600 border-amber-400 text-white shadow-[inset_0_2px_0_#fbbf24]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Quests Grid */}
      {filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredQuests.map((quest, i) => (
            <ScrollReveal key={quest.id} direction="up" delay={i * 100}>
              <QuestCard quest={quest} onSelect={onSelectQuest} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal direction="fade">
          <div className="pixel-box p-12 text-center text-game-muted border border-slate-850">
            <p className="font-pressstart text-xs text-slate-500 uppercase tracking-widest">No active quests found in this region.</p>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
});
