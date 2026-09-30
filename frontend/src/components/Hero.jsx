import React from 'react';
import {
  ShieldAlert,
  Flame,
  Award,
  Truck,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function Hero({ onExploreCatalog, onOpenWizard }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      {/* Decorative background fire gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-fire-600/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fire-500/10 border border-fire-500/30 text-fire-400 text-xs font-semibold tracking-wide uppercase">
              <Flame className="w-4 h-4 text-fire-500 fill-fire-500" />
              Fireshaw Safety Standards 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.15]">
              Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-500 via-fire-400 to-amber-300">Fire Protection</span> For Every Space.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Equip your home, office, kitchen, or industrial plant with government-approved fire extinguishers, automated smoke detection systems, and emergency suppression gear.
            </p>

            {/* Quick Benefits Bullet points */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>BIS / IS:15683 & CE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Free Heavy-Duty Wall Bracket</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>5-Year Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>On-Site Installation Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-fire-600 to-fire-700 hover:from-fire-500 hover:to-fire-600 shadow-lg shadow-fire-600/30 flex items-center gap-2 transform active:scale-95 transition-all text-sm sm:text-base"
              >
                Browse Equipment Catalog
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWizard}
                className="px-6 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-all text-sm sm:text-base hover:border-amber-400/50"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                Safety Selection Wizard
              </button>
            </div>
          </div>

          {/* Right Column: Visual Shield & Highlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-fire-600/20 border border-fire-500/40 flex items-center justify-center text-fire-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Fireshaw Guarantee</h3>
                    <p className="text-xs text-slate-400">Verified Industrial Compliance</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  100% TESTED
                </span>
              </div>

              {/* 4 Feature Stat Blocks */}
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <Award className="w-6 h-6 text-amber-400 mb-2" />
                  <div className="text-2xl font-black font-display text-white">IS:15683</div>
                  <div className="text-xs text-slate-400 font-medium">Standard ISI Mark</div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <ShieldAlert className="w-6 h-6 text-fire-400 mb-2" />
                  <div className="text-2xl font-black font-display text-white">35+ Bar</div>
                  <div className="text-xs text-slate-400 font-medium">Hydrostatic Pressure</div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <RotateCcw className="w-6 h-6 text-sky-400 mb-2" />
                  <div className="text-2xl font-black font-display text-white">5 Years</div>
                  <div className="text-xs text-slate-400 font-medium">Service Life Warranty</div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <Truck className="w-6 h-6 text-emerald-400 mb-2" />
                  <div className="text-2xl font-black font-display text-white">24-48 Hrs</div>
                  <div className="text-xs text-slate-400 font-medium">Rapid Dispatch Ready</div>
                </div>
              </div>

              <div className="bg-fire-950/40 border border-fire-800/40 rounded-xl p-3.5 flex items-center gap-3 text-xs text-fire-200">
                <span className="w-2.5 h-2.5 rounded-full bg-fire-500 animate-ping"></span>
                <span>Annual Maintenance Contract (AMC) & Gas Refilling available nationwide.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
