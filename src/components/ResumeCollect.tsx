import React, { useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { Scroll, Download, X, Sparkles } from 'lucide-react';

interface Props {
  resumeUrl?: string;
}

export const ResumeCollect: React.FC<Props> = memo(({ resumeUrl = '#' }) => {
  const [open, setOpen] = useState(false);
  const [collected, setCollected] = useState(false);

  const handleCollect = () => {
    setCollected(true);
    // Trigger download
    if (resumeUrl && resumeUrl !== '#') {
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.download = 'Karan_Jaisinghani_Resume.pdf';
      a.click();
    }
    setTimeout(() => {
      setOpen(false);
      setCollected(false);
    }, 1800);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        id="resume-collect-btn"
        onClick={() => setOpen(true)}
        className="pixel-btn-gold flex items-center gap-2 group"
      >
        <Scroll size={13} className="group-hover:animate-bounce" />
        COLLECT RESUME
      </button>

      {/* Modal Overlay rendered via Portal */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            className="relative max-w-xs w-full"
            style={{
              animation: 'collectModalIn 0.4s cubic-bezier(0.34,1.26,0.64,1) both',
            }}
          >
            {/* Item card */}
            <div
              className="pixel-box-gold p-6 rounded flex flex-col items-center gap-4 text-center"
              style={{
                background: 'linear-gradient(180deg, #1c1209 0%, #0f0a04 100%)',
                boxShadow: '0 0 40px rgba(217,119,6,0.35), 0 0 80px rgba(217,119,6,0.12)',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close modal"
                className="absolute top-3 right-3 text-slate-600 hover:text-slate-300 transition-colors"
              >
                <X size={14} />
              </button>

              {/* Icon */}
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(217,119,6,0.25) 0%, transparent 70%)',
                    border: '2px solid rgba(217,119,6,0.5)',
                    boxShadow: '0 0 20px rgba(217,119,6,0.3)',
                    animation: collected ? 'itemGlow 0.4s ease-out both' : 'itemFloat 2.5s ease-in-out infinite',
                  }}
                >
                  {collected ? (
                    <Sparkles size={28} className="text-yellow-400" />
                  ) : (
                    <Scroll size={28} className="text-amber-400" />
                  )}
                </div>
                {/* Sparkle particles on collect */}
                {collected && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <span
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-amber-400"
                        style={{
                          top: '50%', left: '50%',
                          transform: `translate(-50%, -50%)`,
                          animation: `particle${i % 3} 0.7s ease-out ${i * 80}ms both`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              {collected ? (
                <>
                  <p className="font-pressstart text-[9px] text-amber-400 tracking-wider">ITEM ACQUIRED!</p>
                  <p className="font-pressstart text-[8px] text-yellow-300 glow-text-gold">RESUME SCROLL</p>
                  <p className="font-sans text-xs text-slate-400">Download starting...</p>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-pressstart text-[7px] text-slate-500 tracking-wider mb-1">FOUND RARE ITEM</p>
                    <p className="font-pressstart text-[11px] text-amber-400 tracking-wider glow-text-gold">RESUME SCROLL</p>
                  </div>
                  <div className="flex flex-col gap-1 text-slate-400 font-sans text-[11px]">
                    <span>📄 Karan Jaisinghani Resume</span>
                    <span className="text-purple-400 font-pressstart text-[7px]">RARITY: LEGENDARY</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 w-full">
                    <div
                      className="flex items-center gap-1.5 text-[7px] font-pressstart text-slate-500 w-full justify-center border border-slate-800 py-1.5 px-3 rounded"
                      style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                      <span>+1250 XP</span>
                      <span className="text-slate-700">|</span>
                      <span className="text-amber-600">+RECRUIT_TOKEN</span>
                    </div>
                    <button
                      id="resume-download-confirm"
                      onClick={handleCollect}
                      className="pixel-btn-gold w-full flex items-center justify-center gap-2 mt-1"
                    >
                      <Download size={11} />
                      COLLECT ITEM
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="font-pressstart text-[7px] text-slate-600 hover:text-slate-400 transition-colors mt-0.5 tracking-wider"
                    >
                      [ LEAVE ]
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
});
