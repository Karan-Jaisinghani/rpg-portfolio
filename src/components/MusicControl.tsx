import React, { useState } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { startMusic, stopMusic, setMusicVolume } from '../hooks/useGameAudio';
import { playClickSound } from '../hooks/useGameAudio';

export const MusicControl: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const toggleMusic = () => {
    playClickSound();
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      startMusic();
      setPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMusicVolume(val);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMusic}
        title={playing ? 'Stop Music' : 'Play Arcade Music'}
        aria-label={playing ? 'Mute chiptune soundtrack' : 'Play chiptune soundtrack'}
        className={`p-1.5 rounded border transition-all ${
          playing
            ? 'bg-amber-600 border-amber-400 text-white shadow-[0_0_8px_rgba(217,119,6,0.5)] animate-pulse'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40'
        }`}
      >
        {playing ? <Music size={14} /> : <VolumeX size={14} />}
      </button>

      {playing && (
        <div className="hidden sm:flex items-center gap-1">
          <Volume2 size={11} className="text-amber-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolume}
            className="w-16 h-1 accent-amber-500 cursor-pointer"
            title="Music Volume"
          />
        </div>
      )}
    </div>
  );
};
