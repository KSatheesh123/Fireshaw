import React from 'react';
import {
  Flame,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Award,
  AlertTriangle
} from 'lucide-react';

export default function Footer({ onScrollToCatalog, onOpenWizard }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fire-600 to-fire-800 flex items-center justify-center text-white shadow-md shadow-fire-500/20">
                <Flame className="w-6 h-6 text-amber-300 fill-amber-300" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                FIRE<span className="text-fire-500">SHAW</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Fireshaw is a premier manufacturer and distributor of certified fire protection and life safety equipment. Supplying government-approved fire extinguishers, automated detection networks, hydrants, and firefighting PPE across India.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                IS:15683 ISI Certified
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-amber-400 font-semibold">
                <Award className="w-4 h-4 text-amber-400" />
                PESO Approved
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Equipments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  ABC Powder Extinguishers
                </button>
              </li>
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  Clean Gas & CO2 Units
                </button>
              </li>
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  Kitchen Wet Chemical Systems
                </button>
              </li>
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  Photoelectric Smoke Detectors
                </button>
              </li>
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  Fire Hose Reels & Hydrant Valves
                </button>
              </li>
              <li>
                <button onClick={onScrollToCatalog} className="hover:text-fire-400 transition-colors">
                  Proximity Firefighter Suits
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Guidance */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Safety Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenWizard} className="hover:text-amber-400 transition-colors font-semibold text-amber-300">
                  Extinguisher Selection Wizard
                </button>
              </li>
              <li className="hover:text-slate-300 cursor-pointer">Annual Refilling & Hydro-Testing</li>
              <li className="hover:text-slate-300 cursor-pointer">Commercial NBC Fire Audit</li>
              <li className="hover:text-slate-300 cursor-pointer">Corporate Fire Drill Training</li>
              <li className="hover:text-slate-300 cursor-pointer">Bulk Industrial Quotations (RFQ)</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Store Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-fire-500 flex-shrink-0 mt-0.5" />
                <span>Fireshaw Safety Complex, MIDC Industrial Area, Pune 411019, MH, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <PhoneCall className="w-4 h-4 text-fire-500 flex-shrink-0" />
                <span>+91 (020) 2456-7890 / +91 98220 54321</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-fire-500 flex-shrink-0" />
                <span>support@fireshaw.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-fire-500 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Compliance Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              All fire equipment manufactured and supplied strictly adheres to National Building Code (NBC) 2016 and Bureau of Indian Standards (BIS).
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} Fireshaw Fire Protection Co. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
