import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────
// Bidirectional: elements animate in when scrolled into view, and fade out when scrolled past
export function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ─── Audio Engine ─────────────────────────────────────────────────────────────
// All sounds generated programmatically using Web Audio API — no external files needed

let audioCtx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let musicPlaying = false;
let musicScheduledNodes: OscillatorNode[] = [];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

// Play a single tone
function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15,
  startTime = 0,
  ctx?: AudioContext
): OscillatorNode {
  const ac = ctx || getAudioContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.connect(gain);
  gain.connect(musicGain || ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + startTime);

  gain.gain.setValueAtTime(0, ac.currentTime + startTime);
  gain.gain.linearRampToValueAtTime(volume, ac.currentTime + startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startTime + duration);

  osc.start(ac.currentTime + startTime);
  osc.stop(ac.currentTime + startTime + duration + 0.05);

  return osc;
}

// ── Sound Effects (all kept very subtle) ──
export function playClickSound() {
  try {
    const ac = getAudioContext();
    if (ac.state === 'suspended') ac.resume();
    playTone(880, 0.04, 'sine', 0.04); // single soft sine blip
  } catch {}
}

// Hover sound removed — was too noisy
export function playHoverSound() { /* silent */ }

export function playSelectSound() {
  try {
    const ac = getAudioContext();
    if (ac.state === 'suspended') ac.resume();
    playTone(523, 0.06, 'sine', 0.05);
    playTone(659, 0.06, 'sine', 0.04, 0.07);
  } catch {}
}

export function playLevelUpSound() {
  try {
    const ac = getAudioContext();
    if (ac.state === 'suspended') ac.resume();
    // subtle two-note chime only
    playTone(659, 0.12, 'sine', 0.06);
    playTone(880, 0.1, 'sine', 0.04, 0.13);
  } catch {}
}

// Section reveal sound silenced — fires too frequently during scroll
export function playSectionRevealSound() { /* silent */ }

// ── Background Chiptune Music ──
// A simple 8-bar looping chiptune melody in C major
const MELODY: [number, number][] = [
  [523, 0.18], [659, 0.18], [784, 0.18], [880, 0.36],
  [784, 0.18], [659, 0.18], [523, 0.18], [392, 0.36],
  [440, 0.18], [523, 0.18], [659, 0.18], [784, 0.36],
  [659, 0.18], [523, 0.18], [440, 0.18], [392, 0.36],
  [349, 0.18], [440, 0.18], [523, 0.18], [659, 0.36],
  [523, 0.18], [440, 0.18], [349, 0.18], [294, 0.36],
  [330, 0.18], [392, 0.18], [494, 0.18], [587, 0.36],
  [494, 0.18], [392, 0.18], [330, 0.18], [294, 0.54],
];

// Bass line (every quarter note)
const BASS: [number, number][] = [
  [130, 0.36], [165, 0.36], [196, 0.36], [220, 0.36],
  [196, 0.36], [165, 0.36], [130, 0.36], [98, 0.36],
  [110, 0.36], [130, 0.36], [165, 0.36], [196, 0.36],
  [165, 0.36], [130, 0.36], [110, 0.36], [98, 0.72],
];

function scheduleMusic(ac: AudioContext, loopDuration: number) {
  if (!musicPlaying) return;

  let t = 0;
  // Melody
  for (const [freq, dur] of MELODY) {
    const osc = playTone(freq, dur - 0.02, 'square', 0.035, t, ac);
    musicScheduledNodes.push(osc);
    t += dur;
  }

  // Bass (runs in parallel, loop duration same)
  let bt = 0;
  for (const [freq, dur] of BASS) {
    const osc = playTone(freq, dur - 0.02, 'sawtooth', 0.022, bt, ac);
    musicScheduledNodes.push(osc);
    bt += dur;
  }

  // Schedule next loop
  setTimeout(() => {
    if (musicPlaying) scheduleMusic(ac, loopDuration);
  }, (loopDuration - 0.5) * 1000);
}

export function startMusic() {
  if (musicPlaying) return;
  try {
    const ac = getAudioContext();
    if (ac.state === 'suspended') ac.resume();

    musicGain = ac.createGain();
    musicGain.gain.setValueAtTime(0.25, ac.currentTime);
    musicGain.connect(ac.destination);

    musicPlaying = true;
    const loopDuration = MELODY.reduce((acc, [, d]) => acc + d, 0);
    scheduleMusic(ac, loopDuration);
  } catch {}
}

export function stopMusic() {
  musicPlaying = false;
  musicScheduledNodes.forEach((n) => {
    try { n.stop(); } catch {}
  });
  musicScheduledNodes = [];
  if (musicGain) {
    try { musicGain.disconnect(); } catch {}
    musicGain = null;
  }
}

export function setMusicVolume(vol: number) {
  if (musicGain && audioCtx) {
    musicGain.gain.setValueAtTime(vol, audioCtx.currentTime);
  }
}

// ─── useSoundButton: wraps onClick with click sound ──────────────────────────
export function useSoundButton(onClick?: () => void) {
  return useCallback(() => {
    playClickSound();
    onClick?.();
  }, [onClick]);
}
