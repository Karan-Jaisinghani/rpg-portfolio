import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'rp-theme';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== 'light'; // default = dark
  });

  // Restore background immediately on mount (before effects fire) to avoid white flash
  useEffect(() => {
    if (!isDark) {
      document.documentElement.style.backgroundColor = '#e8dfcc';
      document.body.style.backgroundColor = '#e8dfcc';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount only

  // Apply theme on mount and on change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute('data-theme');
      root.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      // Force eggshell canvas at the html root level — bypasses any CSS specificity
      root.style.backgroundColor = '#e8dfcc';
      document.body.style.backgroundColor = '#e8dfcc';
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((d) => !d)}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      className="relative w-12 h-6 rounded-full border border-slate-700 bg-slate-900 hover:border-amber-500/50 transition-all duration-300 flex items-center px-0.5 group overflow-hidden"
    >
      {/* Track fill */}
      <span
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-slate-800' : 'bg-amber-100/80'
        }`}
      />
      {/* Sliding knob */}
      <span
        className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full shadow transition-all duration-300 ${
          isDark
            ? 'translate-x-0 bg-slate-700'
            : 'translate-x-6 bg-amber-500'
        }`}
      >
        {isDark ? (
          <Moon size={10} className="text-amber-400" />
        ) : (
          <Sun size={10} className="text-white" />
        )}
      </span>
    </button>
  );
}
