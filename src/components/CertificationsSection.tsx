import React, { useState, useMemo } from 'react';
import { Award, GraduationCap, ChevronRight, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

interface CertificationsSectionProps {
  onViewCertificate: (cert: any) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = React.memo(({
  onViewCertificate,
}) => {
  const { certifications } = portfolioData;

  // Group certificates by issuer (category)
  const groupedCerts = useMemo(() => {
    const groups: Record<string, typeof certifications> = {};
    certifications.forEach((cert) => {
      if (!groups[cert.issuer]) {
        groups[cert.issuer] = [];
      }
      groups[cert.issuer].push(cert);
    });
    return groups;
  }, [certifications]);

  // Keep track of which category card is expanded/opened
  const [expandedIssuer, setExpandedIssuer] = useState<string | null>(null);

  const toggleExpand = (issuer: string) => {
    setExpandedIssuer((prev) => (prev === issuer ? null : issuer));
  };

  // Define Category display info (icon and theme)
  const categoryMeta: Record<string, { icon: React.ReactNode; color: string; desc: string }> = {
    Cisco: {
      icon: <Award size={18} />,
      color: 'text-blue-400 border-blue-500/20 bg-blue-950/20',
      desc: 'Networking & Programming Guild',
    },
    Coursera: {
      icon: <GraduationCap size={18} />,
      color: 'text-purple-400 border-purple-500/20 bg-purple-950/20',
      desc: 'Machine Learning Guild',
    },
    'Infosys Springboard': {
      icon: <Award size={18} />,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
      desc: 'AI & Developer Essentials Guild',
    },
    Nasscom: {
      icon: <Award size={18} />,
      color: 'text-amber-400 border-amber-500/20 bg-amber-950/20',
      desc: 'IoT & Digital Guild',
    },
    Wipro: {
      icon: <Award size={18} />,
      color: 'text-rose-400 border-rose-500/20 bg-rose-950/20',
      desc: 'Data Analytics & Power BI Guild',
    },
  };

  return (
    <section id="certifications" className="py-20 px-4 md:px-8 border-b border-slate-800 max-w-6xl mx-auto bg-slate-950/10">
      {/* Section Header */}
      <ScrollReveal direction="up" playSound>
        <div className="mb-12 text-center">
          <span className="font-pressstart text-xs text-game-gold tracking-widest block mb-2">06 CERTIFICATIONS</span>
          <h2 className="text-2xl font-bold font-pressstart text-white tracking-wide uppercase mb-1">Academic Credentials</h2>
          <p className="text-sm text-game-muted font-sans italic">Click any category card to reveal its completion log and inspect certificates.</p>
        </div>
      </ScrollReveal>

      {/* ── Category Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {Object.entries(groupedCerts).map(([issuer, certList], cardIndex) => {
          const isExpanded = expandedIssuer === issuer;
          const meta = categoryMeta[issuer] || {
            icon: <Award size={18} />,
            color: 'text-amber-400 border-amber-500/20 bg-amber-950/20',
            desc: 'Verified Professional Guild',
          };

          return (
            <ScrollReveal key={issuer} direction="up" delay={cardIndex * 100}>
              <div 
                className={`pixel-box p-5 bg-slate-900/60 border hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                  isExpanded ? 'h-[340px] border-amber-500/40 shadow-[0_0_15px_rgba(217,119,6,0.1)]' : 'h-[135px] border-slate-800'
                }`}
                onClick={() => toggleExpand(issuer)}
              >
                {/* Card Header Info */}
                <div className="flex-shrink-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 border rounded-sm ${meta.color}`}>
                        {meta.icon}
                      </div>
                      <h3 className="font-pressstart text-[9px] text-white tracking-wide uppercase">
                        {issuer}
                      </h3>
                    </div>
                    {/* Badge Count */}
                    <span className="font-sans text-[10px] font-bold bg-slate-950 text-amber-500 px-2 py-0.5 border border-slate-850 rounded">
                      {certList.length} Items
                    </span>
                  </div>
                  <p className="text-[11px] text-game-muted font-sans italic truncate">
                    {meta.desc}
                  </p>
                </div>

                {/* ── Conditional Scrollable List inside the card ── */}
                {isExpanded ? (
                  <div 
                    className="flex-1 overflow-y-auto pr-1.5 space-y-2 mt-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent scrollbar-w-1"
                    style={{ maxHeight: '200px' }}
                    onClick={(e) => e.stopPropagation()} // Stop click propagation to prevent card closing when clicking list rows
                  >
                    {certList.map((cert) => (
                      <div
                        key={cert.id}
                        onClick={() => onViewCertificate(cert)}
                        className="group flex items-center justify-between p-2.5 bg-slate-950/40 border border-slate-850/60 hover:border-amber-500/40 hover:bg-slate-950/90 transition-all duration-200 rounded-sm cursor-pointer"
                      >
                        <div className="min-w-0 mr-3">
                          <span className="font-sans text-xs font-semibold text-slate-300 group-hover:text-amber-400 transition-colors block truncate leading-tight">
                            {cert.title}
                          </span>
                          <span className="font-sans text-[10px] text-slate-500 block leading-tight mt-0.5">
                            {cert.date}
                          </span>
                        </div>
                        <ChevronRight size={12} className="text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Expand Action Trigger Indicator */
                  <div className="flex items-center justify-center gap-1 mt-4 text-[8px] font-pressstart text-amber-500/80 hover:text-amber-400 group pt-2 border-t border-slate-800/40">
                    <span>[ REVEAL LIST ]</span>
                    <ChevronDown size={10} className="animate-bounce" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
});
