import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { TrophyCard } from './TrophyCard';
import { ScrollReveal } from './ScrollReveal';

interface AchievementHallSectionProps {}

export const AchievementHallSection: React.FC<AchievementHallSectionProps> = React.memo(() => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="py-20 px-4 md:px-8 border-b border-slate-800 max-w-6xl mx-auto">
      {/* Section Header */}
      <ScrollReveal direction="up" playSound>
        <div className="mb-16 text-center">
          <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">05 ACHIEVEMENTS</span>
          <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">Trophy Hall</h2>
          <p className="text-sm text-game-muted font-sans italic">Trophies from the battles won.</p>
        </div>
      </ScrollReveal>

      {/* Trophies Grid Container */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto justify-items-center">
        {achievements.map((trophy, i) => (
          <ScrollReveal key={trophy.id} direction="up" delay={i * 120}>
            <TrophyCard
              trophy={trophy}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
});
