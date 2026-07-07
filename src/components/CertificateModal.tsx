import React, { useState } from 'react';
import { X, Eye, FileWarning } from 'lucide-react';
import type { Trophy } from '../data/portfolioData';

interface CertificateModalProps {
  trophy: Trophy | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ trophy, onClose }) => {
  const [imageError, setImageError] = useState(false);
  if (!trophy) return null;

  const isPdf = trophy.certificateUrl?.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-800 rounded shadow-2xl p-6 md:p-8 animate-[scaleUp_0.2s_ease-out] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6 w-full">
          <span className="text-[8px] font-pressstart px-2.5 py-1 tracking-wider text-amber-500 bg-amber-950/30 border border-amber-500/20 uppercase rounded-sm inline-block mb-3">
            VERIFIED CREDENTIAL
          </span>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">{trophy.title}</h2>
          <p className="text-xs text-game-muted font-sans max-w-md mx-auto">{trophy.description}</p>
        </div>

        {/* Certificate Display Area */}
        <div className="w-full aspect-[4/3] bg-slate-950 border border-slate-850 rounded overflow-hidden flex flex-col items-center justify-center relative p-4 mb-6">
          {imageError ? (
            /* Fallback Retro Certificate Scroll Display */
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-full bg-amber-950/30 border-2 border-dashed border-amber-500/40 flex items-center justify-center text-amber-500 animate-pulse">
                <FileWarning size={32} />
              </div>
              <h3 className="font-pressstart text-[10px] text-amber-400">CREDENTIAL SOURCE DETAILS</h3>
              
              <div className="border border-slate-850 p-4 bg-slate-900/60 rounded text-left font-sans text-xs text-slate-300 w-full space-y-2">
                <p><strong>Quest Milestone:</strong> {trophy.title}</p>
                <p><strong>Description:</strong> {trophy.details}</p>
                <p className="text-[10px] text-rose-400 mt-2 bg-rose-950/20 border border-rose-500/10 p-2 rounded">
                  💡 <strong>To view your own PNG certificate here:</strong> Save your certificate image as <code className="bg-slate-950 p-0.5 rounded text-white">{trophy.certificateUrl?.split('/').pop()}</code> inside the <code className="bg-slate-950 p-0.5 rounded text-white">public/certificates/</code> folder on your project directory.
                </p>
              </div>
            </div>
          ) : (
            /* Loaded PNG Image or PDF */
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {isPdf ? (
                <div className="w-full h-full flex flex-col">
                  <iframe
                    src={trophy.certificateUrl}
                    className="w-full flex-1 rounded border-0 bg-slate-950"
                    title={trophy.title}
                  />
                  <div className="mt-3 text-center">
                    <a
                      href={trophy.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-xs text-amber-500 hover:text-amber-400 font-semibold underline"
                    >
                      🔗 Open Certificate PDF in new window
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={trophy.certificateUrl}
                    alt={`${trophy.title} Certificate`}
                    className="max-w-full max-h-full object-contain rounded shadow-lg"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded flex items-center gap-1.5 text-[9px] text-game-muted font-sans font-medium">
                    <Eye size={12} /> Live Preview
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Bottom Metadata */}
        <div className="w-full text-center border-t border-slate-800/80 pt-4 font-sans text-[11px] text-slate-500 flex justify-between items-center px-2">
          <span>Category: <strong className="text-amber-500 font-medium">{trophy.rarity || 'Professional Certification'}</strong></span>
          <span>Verified Seal ID: {trophy.id.substring(0, 12)}-2026</span>
        </div>
      </div>
    </div>
  );
};
