import { useState, useEffect, useCallback } from 'react';
import { Swords, Menu, X, ArrowUp, Heart } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import type { Quest, Trophy } from './data/portfolioData';
import { HeroSection } from './components/HeroSection';
import { CharacterSection } from './components/CharacterSection';
import { JourneySection } from './components/JourneySection';
import { QuestBoardSection } from './components/QuestBoardSection';
import { AchievementHallSection } from './components/AchievementHallSection';
import { FinalBossSection } from './components/FinalBossSection';
import { QuestDetailsModal } from './components/QuestDetailsModal';
import { CertificateModal } from './components/CertificateModal';
import { MusicControl } from './components/MusicControl';
import { CertificationsSection } from './components/CertificationsSection';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { SkillTree } from './components/SkillTree';

function App() {
  const [currentXP, setCurrentXP] = useState(12450);
  const [level, setLevel] = useState(21);
  const [prevLevel, setPrevLevel] = useState(21);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Loading screen: show once per session
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    return !sessionStorage.getItem('rp-loaded');
  });
  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem('rp-loaded', '1');
    setShowLoader(false);
  }, []);

  // Track music toggle state from MusicControl
  
  // Modals state
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);

  const maxXP = 20000;

  // Track scroll position to update XP, Level, and Active Section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          if (docHeight > 0) {
            const progress = Math.min(1, Math.max(0, scrollTop / docHeight));

            // Map progress to levels (21 to 100)
            const startLevel = 21;
            const endLevel = 100;
            const levelRange = endLevel - startLevel;
            const floatLevel = startLevel + progress * levelRange;
            const newLevel = Math.min(100, Math.floor(floatLevel));
            
            // Calculate XP within the current level
            let newXP = 0;
            if (newLevel === 100) {
              newXP = maxXP;
            } else {
              const levelProgress = floatLevel - newLevel; // Decimal progress in current level
              newXP = Math.floor(levelProgress * maxXP);
            }

            setLevel(newLevel);
            setCurrentXP(newXP);

            // Section tracking for active menu indicator
            const sections = ['hero', 'character', 'journey', 'quests', 'inventory', 'achievements', 'certifications', 'boss'];
            let currentSection = 'hero';

            for (const sectionId of sections) {
              const el = document.getElementById(sectionId);
              if (el) {
                const rect = el.getBoundingClientRect();
                // If section top is above or near mid-viewport, set as active
                if (rect.top <= window.innerHeight * 0.4) {
                  currentSection = sectionId;
                }
              }
            }
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Level Up Toast trigger (sound disabled to avoid frequency fatigue)
  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true);
      const timer = setTimeout(() => {
        setShowLevelUp(false);
      }, 2000);
      setPrevLevel(level);
      return () => clearTimeout(timer);
    } else if (level < prevLevel) {
      setPrevLevel(level);
    }
  }, [level, prevLevel]);

  // Smooth scroll helper
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  const handleBeginAdventure = useCallback(() => {
    scrollToSection('character');
  }, [scrollToSection]);

  const navLinks = [
    { label: '🛡️ CHARACTER', id: 'character' },
    { label: '🗺️ JOURNEY', id: 'journey' },
    { label: '📜 QUESTS', id: 'quests' },
    { label: '🎒 INVENTORY', id: 'inventory' },
    { label: '🏆 HALL', id: 'achievements' },
    { label: '🎓 CERTS', id: 'certifications' },
    { label: '👑 FINAL BOSS', id: 'boss' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-amber-600 selection:text-white">
      {/* Loading Screen (first visit only) */}
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      {/* Dynamic scanlines texture for retro look */}
      <div className="crt-screen" />

      {/* Navigation Bar (Glassmorphic) */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Title */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <Swords className="text-amber-500 animate-pulse" size={20} />
            <span className="font-pressstart text-[10px] sm:text-xs tracking-wider text-white">
              {portfolioData.character.name.toUpperCase()}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-pressstart text-[9px] tracking-widest transition-colors ${
                  activeSection === link.id
                    ? 'text-amber-500 glow-text-gold font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right mini HUD (Level, XP, Theme Toggle, and Music) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <span className="font-pressstart text-[8px] text-amber-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                LVL {level}
              </span>
              <div className="w-24 h-2 bg-slate-950 border border-slate-850 p-0.5 rounded-sm overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(currentXP / maxXP) * 100}%` }}
                />
              </div>
            </div>
            <ThemeToggle />
            <MusicControl />
          </div>

          {/* Mobile Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded border border-slate-800 bg-slate-900/50"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 py-4 px-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left font-pressstart text-[9px] py-2.5 px-3 border border-transparent rounded ${
                  activeSection === link.id
                    ? 'text-amber-500 border-amber-500/20 bg-amber-950/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        {/* Level Up — subtle pill notification */}
        {showLevelUp && (
          <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 text-amber-400 px-3 py-1.5 font-pressstart text-[8px] tracking-wider rounded-full shadow-[0_0_12px_rgba(217,119,6,0.2)] backdrop-blur-sm animate-[fadeSlideIn_0.3s_ease-out] select-none pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            LVL {level} ↑
          </div>
        )}

        {/* Sections */}
        <HeroSection
          currentXP={currentXP}
          maxXP={maxXP}
          level={level}
          onBeginAdventure={handleBeginAdventure}
        />
        
        <CharacterSection />
        
        <JourneySection />
        
        <QuestBoardSection onSelectQuest={setSelectedQuest} />
        
        <SkillTree />
        
        <AchievementHallSection />
        
        <CertificationsSection onViewCertificate={setSelectedTrophy} />
        
        <FinalBossSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-4 text-center font-sans text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-pressstart text-[8px] text-slate-400">© 2026 KARAN JAISINGHANI.</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Designed & Built with</span>
            <Heart size={11} className="text-rose-500 fill-current animate-pulse" />
            <span>in standard pixel fantasy style.</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <QuestDetailsModal 
        quest={selectedQuest} 
        onClose={() => setSelectedQuest(null)} 
      />
      
      <CertificateModal 
        trophy={selectedTrophy} 
        onClose={() => setSelectedTrophy(null)} 
      />

      {/* Scroll to top floating button (hidden on top screen) */}
      {activeSection !== 'hero' && (
        <button
          onClick={() => scrollToSection('hero')}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 p-3 bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 text-slate-400 hover:text-white rounded shadow-lg transition-all"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
