import React from 'react';
import { User, Calendar, MapPin, GraduationCap, Globe, Radio } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { FlippableCard } from './FlippableCard';
import { ResumeCollect } from './ResumeCollect';

export const CharacterSection: React.FC = React.memo(() => {
  const { character } = portfolioData;

  return (
    <section id="character" className="py-20 px-4 md:px-8 max-w-6xl mx-auto border-b border-slate-800">
      {/* Section Header */}
      <ScrollReveal direction="up" playSound>
        <div className="mb-12">
          <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">01 CHARACTER</span>
          <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">Character Profile</h2>
          <p className="text-sm text-game-muted font-sans italic">Every hero has a story.</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Story & Core Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ScrollReveal direction="left" delay={100}>
            <div className="pixel-box p-6 bg-slate-950/40 border border-slate-800/80 rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-2 font-sans">{character.name}</h3>
              <div className="inline-block px-3 py-1 bg-purple-950/60 border border-purple-500/30 text-purple-400 font-pressstart text-[9px] tracking-wider uppercase rounded mb-4 shadow-[0_0_8px_rgba(139,92,246,0.2)]">
                {character.title}
              </div>
              <p className="text-slate-300 text-base leading-relaxed font-sans">{character.description}</p>
            </div>
          </ScrollReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Level', value: character.stats.level, color: 'text-amber-500' },
              { label: 'Quests', value: character.stats.questsCompleted, color: 'text-purple-400' },
              { label: 'XP Earned', value: character.stats.xpEarned.toLocaleString(), color: 'text-green-400' },
              { label: 'Power', value: character.stats.power, color: 'text-blue-400' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} direction="up" delay={200 + i * 85}>
                <div className="pixel-box p-4 text-center bg-slate-900/60 border border-slate-800">
                  <span className="text-[8px] font-pressstart text-game-muted uppercase block mb-1">{stat.label}</span>
                  <span className={`text-lg font-bold font-pressstart ${stat.color}`}>{stat.value}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={400}>
            <div className="pixel-box p-6 bg-slate-950/40 border border-slate-800/80 rounded-sm">
              <h4 className="text-xs font-pressstart text-game-gold uppercase tracking-widest mb-5 flex items-center gap-2">
                <User size={12} /> CHARACTER INFO
              </h4>
              <div className="flex flex-col divide-y divide-slate-800/60 font-sans">
                {([
                  {
                    icon: <Calendar size={13} className="text-amber-500 flex-shrink-0" />,
                    label: 'Date of Birth',
                    value: '05 Oct 2004',
                    sub: 'Age 21',
                    valueColor: 'text-amber-400',
                  },
                  {
                    icon: <GraduationCap size={13} className="text-purple-400 flex-shrink-0" />,
                    label: 'GPA',
                    value: '8.22 / 10.0',
                    sub: 'B.Tech CSE • 2023–2027',
                    valueColor: 'text-purple-400',
                  },
                  {
                    icon: <MapPin size={13} className="text-green-400 flex-shrink-0" />,
                    label: 'Origin → Current',
                    value: 'Jabalpur → Bhopal',
                    sub: 'Madhya Pradesh, India',
                    valueColor: 'text-green-400',
                  },
                  {
                    icon: <Globe size={13} className="text-blue-400 flex-shrink-0" />,
                    label: 'Languages',
                    value: 'English • Hindi',
                    sub: 'Fluent in both',
                    valueColor: 'text-blue-400',
                  },
                  {
                    icon: <Radio size={13} className="text-emerald-400 flex-shrink-0" />,
                    label: 'Status',
                    value: '🟢 Open to Opportunities',
                    sub: 'Internship & Full-time',
                    valueColor: 'text-emerald-400',
                  },
                ] as const).map((row, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="w-7 flex items-center justify-center flex-shrink-0">
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-pressstart text-[7px] text-slate-500 uppercase tracking-wider block leading-tight">
                        {row.label}
                      </span>
                      <span className={`font-sans text-sm font-semibold leading-tight block mt-0.5 ${row.valueColor}`}>
                        {row.value}
                      </span>
                      <span className="font-sans text-[10px] text-slate-500 leading-tight">
                        {row.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Resume Download */}
          <ScrollReveal direction="up" delay={520}>
            <div className="flex items-center gap-3">
              <ResumeCollect resumeUrl={portfolioData.finalBoss.contactLinks.resume} />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Interactive 3D Hero Model */}
        <ScrollReveal direction="right" delay={200} className="lg:col-span-5">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-full max-w-sm aspect-square flex flex-col justify-end items-center p-6 border border-slate-800/40 rounded-lg bg-slate-950/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              {/* Background radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/8 via-slate-950/20 to-transparent pointer-events-none" />

              {/* HUD labels */}
              <div className="absolute top-6 left-6 text-amber-500/40 font-pressstart text-[7px] animate-pulse">CLASS: {character.class.toUpperCase()}</div>
              <div className="absolute top-6 right-6 text-purple-400/40 font-pressstart text-[7px] animate-pulse">KJ</div>

              {/* Ground glow effect */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-6 bg-amber-500/15 blur-xl rounded-full" />

              {/* ── INTERACTIVE FLIPPABLE CARD ── */}
              <FlippableCard />

              {/* Physical Nametag below model */}
              <div className="relative z-20 mb-4 select-none animate-pulse">
                <span className="font-pressstart text-[8px] text-amber-400 bg-slate-950 border border-amber-500/30 px-3 py-1.5 rounded shadow-lg tracking-wider">
                  KARAN JAISINGHANI
                </span>
              </div>

              {/* Platform/Pedestal base */}
              <div className="relative z-10 w-44 flex flex-col items-center">
                <div className="w-36 h-3 bg-amber-900 border-x-2 border-t-2 border-amber-500/80 rounded-t-sm" />
                <div className="w-40 h-5 bg-amber-950 border-2 border-amber-800 rounded-sm shadow-[0_5px_15px_rgba(217,119,6,0.4)] flex items-center justify-center">
                  <span className="text-[7px] font-pressstart tracking-widest text-amber-400">HERO STAND</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});
