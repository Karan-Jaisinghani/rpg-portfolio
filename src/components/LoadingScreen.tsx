import { useState, useEffect, useCallback } from 'react';
import { Swords } from 'lucide-react';

const BOOT_LINES = [
  { text: '> INITIALIZING REALM ENGINE v3.2.1...', delay: 0 },
  { text: '> LOADING CHARACTER DATA......... [OK]', delay: 350 },
  { text: '> MOUNTING QUEST ARCHIVES......... [OK]', delay: 700 },
  { text: '> CALIBRATING MAGIC CIRCUITS...... [OK]', delay: 1050 },
  { text: '> RENDERING WORLD MAP............. [OK]', delay: 1400 },
  { text: '> SYNCING ACHIEVEMENT LEDGER...... [OK]', delay: 1750 },
  { text: '> ALL SYSTEMS READY. ENTER HERO.', delay: 2100 },
];

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [progressDone, setProgressDone] = useState<boolean>(false);

  // Reveal boot lines one by one
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
      }, 400 + BOOT_LINES[i].delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar animation (fills over 2.8s)
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 2800;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgressDone(true);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Trigger fade-out after boot is fully done
  useEffect(() => {
    if (progressDone && visibleLines >= BOOT_LINES.length) {
      const t = setTimeout(() => setFadeOut(true), 500);
      return () => clearTimeout(t);
    }
  }, [progressDone, visibleLines]);

  // Unmount after fade completes
  useEffect(() => {
    if (fadeOut) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [fadeOut, onComplete]);

  const handleSkip = useCallback(() => {
    setFadeOut(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* CRT scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.22) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 1,
          opacity: 0.4,
        }}
      />

      {/* Subtle grid glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-xl px-6 sm:px-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="relative">
            <Swords
              size={40}
              className="text-amber-500"
              style={{ filter: 'drop-shadow(0 0 12px rgba(217,119,6,0.7))' }}
            />
          </div>
          <div
            className="font-pressstart text-xs sm:text-sm text-amber-400 tracking-widest text-center"
            style={{ textShadow: '0 0 16px rgba(217,119,6,0.6)' }}
          >
            KARAN JAISINGHANI
          </div>
          <p className="font-pressstart text-[8px] text-slate-500 tracking-widest">
            DEV CRUSADER • PORTFOLIO v2.0
          </p>
        </div>

        {/* Boot log terminal */}
        <div className="bg-slate-900/70 border border-slate-800 rounded p-4 font-mono text-[11px] sm:text-xs space-y-1.5 min-h-[168px] mb-6">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`${
                i === visibleLines - 1 ? 'text-green-400' : 'text-slate-400'
              }`}
              style={{
                animation: 'fadeSlideIn 0.25s ease-out both',
              }}
            >
              {line.text}
              {i === visibleLines - 1 && !progressDone && (
                <span className="inline-block w-1.5 h-3 bg-green-400 ml-1 animate-pulse align-middle" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-pressstart text-[8px] text-slate-500">
              LOADING...
            </span>
            <span className="font-pressstart text-[8px] text-amber-500">
              {progress}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 transition-none"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(217,119,6,0.6)',
              }}
            />
          </div>
        </div>

        {/* Skip button appears after a moment */}
        {visibleLines >= 2 && (
          <div className="text-center mt-6">
            <button
              onClick={handleSkip}
              className="font-pressstart text-[8px] text-slate-600 hover:text-slate-400 transition-colors tracking-widest"
            >
              [ SKIP ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
