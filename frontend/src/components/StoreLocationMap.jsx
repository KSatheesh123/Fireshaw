import React from 'react';
import {
  MapPin,
  Navigation,
  PhoneCall,
  Clock,
  Compass,
  CheckCircle2,
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function StoreLocationMap() {
  const storeAddress = "Fireshaw Fire Safety Equipments Showroom, Plot 42, Block D-II, MIDC Industrial Area, Chinchwad, Pune, Maharashtra 411019";
  const googleMapsUrl = "https://maps.google.com/?q=MIDC+Chinchwad+Pune+Maharashtra";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Store Address, Landmarks & Contact Info */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-900 text-white">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-fire-400 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-fire-500" />
                Fireshaw Store & Service Center Location
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-3">
                Visit Our Showroom & Refilling Plant
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Inspect certified fire extinguishers, test smoke alarms live, or get your cylinders refilled and hydro-tested on-site by certified safety engineers.
              </p>

              {/* Exact Address Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 mb-6">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-5 h-5 text-fire-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm block">Fireshaw Fire Protection Co.</strong>
                    <p className="text-xs text-slate-400 leading-normal mt-0.5">
                      Plot 42, Block D-II, MIDC Industrial Area, Chinchwad, Pune, Maharashtra 411019
                    </p>
                  </div>
                </div>
              </div>

              {/* Near Location Landmarks List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  📍 Nearby Landmarks & Directions:
                </h4>
                
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <Compass className="w-4 h-4 text-fire-400 flex-shrink-0" />
                    <span><strong>1.2 km</strong> from Tata Motors Main Assembly Gate</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <Compass className="w-4 h-4 text-fire-400 flex-shrink-0" />
                    <span>Opposite <strong>State Bank of India (SBI)</strong> Industrial Branch</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <Compass className="w-4 h-4 text-fire-400 flex-shrink-0" />
                    <span><strong>2 mins</strong> off Old Pune-Mumbai Highway (NH 48)</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <Compass className="w-4 h-4 text-fire-400 flex-shrink-0" />
                    <span><strong>2.5 km</strong> from Chinchwad & Akurdi Railway Stations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact & Hours */}
            <div className="pt-6 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Working Hours:
                </span>
                <strong className="text-white">Mon - Sat: 9:00 AM - 8:00 PM</strong>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Store Phone:
                </span>
                <strong className="text-emerald-400 font-mono">+91 98220 54321</strong>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-fire-600 hover:bg-fire-700 shadow-lg shadow-fire-600/30 flex items-center justify-center gap-2 transition-all mt-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Side: Embedded Google Map & Visual Location Pin */}
          <div className="lg:col-span-7 relative min-h-[380px] bg-slate-100 flex flex-col justify-between">
            {/* Interactive Embedded Google Map iFrame */}
            <iframe
              title="Fireshaw Store Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.274384958043!2d73.7915!3d18.6508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e45e555555%3A0x123456789abcdef!2sMIDC%20Industrial%20Area%2C%20Chinchwad%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[420px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Custom Location Overlay Card */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur p-3.5 rounded-2xl shadow-lg border border-slate-200 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fire-600 animate-ping" />
                <span className="text-xs font-bold text-slate-900">Fireshaw Showroom & Refilling Hub</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                📍 MIDC Industrial Area, Chinchwad • Near Tata Motors Gate
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
