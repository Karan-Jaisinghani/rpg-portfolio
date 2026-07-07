import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { PixelButton } from './PixelButton';
import { XPBar } from './XPBar';
import landingBg from '../assets/landing_bg.jpg';

interface HeroSectionProps {
  currentXP: number;
  maxXP: number;
  level: number;
  onBeginAdventure: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentXP,
  maxXP,
  level,
  onBeginAdventure,
}) => {
  const { character } = portfolioData;

  // Typing effect state for "KARAN JAISINGHANI"
  const [typedName, setTypedName] = useState('');
  const fullName = character.name.toUpperCase();

  useEffect(() => {
    let index = 0;
    setTypedName('');
    const interval = setInterval(() => {
    if (index < fullName.length) {
      setTypedName(fullName.slice(0, index + 1));
      index++;
    } else {
      clearInterval(interval);
    }
  }, 95);

  return () => clearInterval(interval);
}, [fullName]);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between items-center text-center px-4 py-12 overflow-hidden border-b border-slate-800"
    >
      {/* Background Landscape Graphic System */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85" 
          style={{ backgroundImage: `url(${landingBg})` }}
        />
        {/* Dark radial and vertical overlays for high text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/60 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,23,42,0.75)_80%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[90px]" />
      </div>


      <div className="scanlines" />

      {/* Hero Header */}
      <div className="z-10 mt-6 flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-amber-500/20 text-amber-500 rounded font-pressstart text-[9px] tracking-wider animate-bounce-slow">
        <Sparkles size={10} />
        <span>WELCOME TO MY ADVENTURE</span>
        <Sparkles size={10} />
      </div>

      {/* Main Title card */}
      <div className="z-10 flex flex-col items-center max-w-3xl mt-12 mb-8">
        <span className="font-pressstart text-xs md:text-sm text-amber-500 tracking-widest uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          LEVEL {level} {character.class.toUpperCase()}
        </span>
        
        {/* Typed Name */}
        <h1 className="font-pressstart text-3xl md:text-5xl lg:text-6xl text-white tracking-wider leading-tight glow-text-gold drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] my-4 min-h-[50px] md:min-h-[70px]">
          {typedName}
          {typedName.length < fullName.length && (
            <span className="inline-block w-4 md:w-6 h-8 md:h-12 bg-amber-500 ml-1 animate-[pulse_0.4s_infinite]" />
          )}
        </h1>

        <p className="font-pressstart text-[10px] md:text-xs text-game-muted tracking-widest uppercase bg-slate-950/80 px-4 py-2 border border-slate-800/60 rounded">
          {character.title}
        </p>

        {/* Overall progress bar (levels only, not sub-level XP progress) */}
        <XPBar
          currentXP={currentXP}
          maxXP={maxXP}
          level={level}
          className="mt-12 bg-slate-900/90 p-4 border border-slate-800/80 rounded shadow-2xl"
        />
      </div>

      {/* Action CTA */}
      <div className="z-10 flex flex-col items-center gap-10 mt-4">
        <PixelButton onClick={onBeginAdventure} className="text-xs md:text-sm py-4 px-8">
          BEGIN ADVENTURE
        </PixelButton>

        <div className="flex flex-col items-center gap-1 cursor-pointer opacity-75 hover:opacity-100 transition-opacity" onClick={onBeginAdventure}>
          <span className="font-pressstart text-[8px] md:text-[9px] tracking-widest text-slate-500">
            SCROLL TO BEGIN YOUR JOURNEY
          </span>
          <ChevronDown className="text-slate-500 animate-bounce" size={18} />
        </div>
      </div>
    </section>
  );
};
