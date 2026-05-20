import React, { useEffect } from 'react';
import { SHOW_ADSENSE_PLACEHOLDERS, ADSENSE_CLIENT_ID } from '../config';

const AdPlaceholder = ({ 
  format = 'auto', 
  slot = '', 
  style = {}, 
  className = '',
  label = 'SPONSORED ADVERTISEMENT'
}) => {
  // Try to load AdSense script if a real slot is provided and placeholders are enabled
  useEffect(() => {
    if (SHOW_ADSENSE_PLACEHOLDERS && slot && window) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense script error:', e);
      }
    }
  }, [slot]);

  // If placeholders are disabled, do not render anything at all (requested by user for review submission)
  if (!SHOW_ADSENSE_PLACEHOLDERS) {
    return null;
  }

  // If a real slot is provided, render the actual AdSense code block
  if (slot) {
    return (
      <div className={`my-8 mx-auto text-center w-full overflow-hidden ${className}`} style={style}>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Otherwise, render a stunning, professional placeholder
  return (
    <div className={`my-8 mx-auto w-full max-w-4xl clay-card overflow-hidden border border-emerald-500/20 dark:border-amber-400/10 p-6 bg-gradient-to-br from-emerald-500/5 to-amber-500/5 backdrop-blur-md relative group transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-amber-400/20 ${className}`} style={style}>
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>

      <div className="flex flex-col items-center justify-center py-8 px-4 text-center border border-dashed border-emerald-500/25 dark:border-amber-400/20 rounded-2xl">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60 dark:text-amber-400/60 mb-3 bg-emerald-500/10 dark:bg-amber-500/10 px-3 py-1 rounded-full">
          {label}
        </span>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-emerald-500/20 mb-3">
          <i className="fas fa-bullhorn text-sm animate-pulse"></i>
        </div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Ruang Iklan AdSense Siap Pakai
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1">
          Tata letak dioptimalkan untuk performa rasio klik tertinggi. Tempelkan kode unit iklan Anda di sini setelah disetujui.
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder;

