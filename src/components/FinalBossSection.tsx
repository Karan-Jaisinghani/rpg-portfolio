import React, { useState } from 'react';
import { Mail, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { PixelButton } from './PixelButton';
import { ScrollReveal } from './ScrollReveal';
import { Hero3D } from './Hero3D';

export const FinalBossSection: React.FC = React.memo(() => {
  const { finalBoss } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleRecruitClick = () => {
    const emailAddress = "karan.emailme@gmail.com";
    
    // Copy address to clipboard for backup
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});

    // Open Web-based Gmail compose window in a new tab (fully reliable on browser)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <section id="boss" className="py-20 px-4 md:px-8 border-b border-slate-800 bg-slate-950/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" playSound>
          <div className="mb-12 text-center">
            <span className="font-pressstart text-xs text-rose-500 tracking-widest block mb-2 animate-pulse">
              ⚠️ WARNING: BOSS LEVEL ⚠️
            </span>
            <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">
              {finalBoss.title}
            </h2>
            <p className="text-sm text-game-muted font-sans italic">Ready to recruit this hero?</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Side: Hero (same as Character section, boss-fight atmosphere) */}
          <ScrollReveal direction="left" delay={100} className="lg:col-span-5">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square flex flex-col justify-end items-center p-6 border-4 rounded-lg"
                style={{
                  borderColor: '#9f1239',
                  background: 'radial-gradient(ellipse at bottom, rgba(159,18,57,0.25) 0%, rgba(2,6,23,0.95) 70%)',
                  boxShadow: '0 0 40px rgba(244,63,94,0.15), inset 0 0 30px rgba(0,0,0,0.8)',
                }}>
                {/* Dramatic red atmospheric light */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16 bg-rose-900/30 blur-2xl rounded-full pointer-events-none" />

                {/* Floating battle stats */}
                <div className="absolute top-5 left-5 text-rose-400/40 font-pressstart text-[7px] animate-pulse">CLASS: {portfolioData.character.class.toUpperCase()}</div>
                <div className="absolute top-5 right-5 text-amber-500/40 font-pressstart text-[7px] animate-pulse">KJ</div>

                {/* Ground glow */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-36 h-6 bg-rose-700/20 blur-xl rounded-full" />

                {/* ── Same Interactive 3D Hero ── */}
                <div className="relative z-10 w-full h-[220px] flex items-center justify-center mb-2">
                  <Hero3D className="w-full h-full" glowColor="#f43f5e" />
                </div>

                {/* Physical Nametag below model */}
                <div className="relative z-20 mb-4 select-none animate-pulse">
                  <span className="font-pressstart text-[8px] text-rose-400 bg-slate-950 border border-rose-500/30 px-3 py-1.5 rounded shadow-lg tracking-wider">
                    KARAN JAISINGHANI
                  </span>
                </div>

                {/* Pedestal */}
                <div className="relative z-10 w-44 flex flex-col items-center">
                  <div className="w-36 h-3 bg-rose-900 border-x-2 border-t-2 border-rose-500/80 rounded-t-sm" />
                  <div className="w-40 h-5 bg-rose-950 border-2 border-rose-800 rounded-sm shadow-[0_5px_15px_rgba(244,63,94,0.3)] flex items-center justify-center">
                    <span className="text-[7px] font-pressstart tracking-widest text-rose-300">HERO STAND</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Side: Recruitment CTA */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-7 flex flex-col gap-6 font-sans">
            <div className="pixel-box-gold p-6 bg-slate-900/80 border border-amber-500/20 shadow-xl rounded-sm">
              <h3 className="text-2xl font-bold text-amber-500 mb-3 font-sans glow-text-gold">
                {finalBoss.subtitle}
              </h3>
              
              <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {finalBoss.description}
              </p>

              {/* Quest Specifications Table */}
              <div className="border border-amber-500/20 rounded overflow-hidden mb-6 bg-slate-950/60 font-sans text-xs">
                <div className="grid grid-cols-2 p-3 border-b border-amber-500/10">
                  <span className="text-slate-400 font-bold">QUEST DIFFICULTY</span>
                  <span className="text-amber-500 font-bold font-pressstart text-[8px] flex items-center gap-1">
                    ★★★★★ (S-RANK)
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-slate-400 font-bold">QUEST REWARDS</span>
                  <div className="flex flex-col gap-1">
                    {finalBoss.rewards.map((reward) => (
                      <span key={reward} className="text-green-400 font-bold flex items-center gap-1 font-sans text-[11px]">
                        🛡️ {reward}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <PixelButton 
                onClick={handleRecruitClick} 
                variant={copied ? "gray" : "gold"}
                className="w-full text-center py-4 text-xs tracking-widest mb-6 transition-all duration-300"
              >
                {copied ? "⚔ EMAIL COPIED TO CLIPBOARD!" : "⚔ RECRUIT HERO (EMAIL QUEST)"}
              </PixelButton>

              {/* Social links */}
              <div className="border-t border-amber-500/20 pt-4">
                <div className="flex justify-between items-center text-[8px] font-pressstart text-slate-500 mb-3">
                  <span>QUEST LOOT DROP CHANNELS</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <a href={finalBoss.contactLinks.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 rounded transition-colors text-xs font-semibold">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg> GitHub
                  </a>
                  
                  <a href={finalBoss.contactLinks.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 rounded transition-colors text-xs font-semibold">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg> LinkedIn
                  </a>

                  <a href={finalBoss.contactLinks.email}
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 rounded transition-colors text-xs font-semibold">
                    <Mail size={14} /> Email
                  </a>

                  <a href={finalBoss.contactLinks.resume} download
                    className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-400 rounded transition-colors text-xs font-semibold">
                    <FileText size={14} /> Resume
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});
