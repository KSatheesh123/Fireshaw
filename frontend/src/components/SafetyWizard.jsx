import React, { useState } from 'react';
import {
  Compass,
  X,
  Home,
  Building2,
  Utensils,
  Server,
  Factory,
  CheckCircle,
  PlusCircle,
  Flame,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const spacePresets = [
  {
    id: 'home',
    title: 'Apartment or Residential Home',
    icon: Home,
    tagline: 'Living room, bedrooms, domestic kitchen',
    hazards: 'Paper, curtains, electrical appliances, domestic cooking oil',
    recommended: [
      {
        name: 'Fireshaw Pro ABC Dry Powder Extinguisher 4kg',
        reason: 'Essential multipurpose coverage for wood, textiles, and domestic electrical appliances.',
        sku: 'FSH-EXT-ABC4KG',
        price: 1899,
        quantity: 1,
      },
      {
        name: 'Fireshaw Premium Heavy Duty Fire Blanket 1.8m x 1.8m',
        reason: 'Instant safety blanket for smothering stovetop oil pan fires without powder mess.',
        sku: 'FSH-BLK-1818',
        price: 1199,
        quantity: 1,
      },
      {
        name: 'Fireshaw Dual-Sensor Photoelectric Smoke & Fire Detector',
        reason: 'Loud 85dB alarm alerts sleeping family members at the first trace of smoldering smoke.',
        sku: 'FSH-DET-SMK-PRO',
        price: 899,
        quantity: 2,
      },
    ],
  },
  {
    id: 'office',
    title: 'Office or Commercial Workspace',
    icon: Building2,
    tagline: 'Cubicles, conference rooms, breakrooms, archives',
    hazards: 'Computers, printers, AC units, paper documents, wiring',
    recommended: [
      {
        name: 'Fireshaw Pro ABC Dry Powder Extinguisher 4kg',
        reason: 'Universal coverage required by National Building Code (NBC) for hallway mounting.',
        sku: 'FSH-EXT-ABC4KG',
        price: 1899,
        quantity: 2,
      },
      {
        name: 'Fireshaw Elite CO2 Fire Extinguisher 4.5kg',
        reason: 'Zero-residue gas protection for office server closets and photocopy machines.',
        sku: 'FSH-EXT-CO2-45',
        price: 4999,
        quantity: 1,
      },
      {
        name: 'Fireshaw Photoluminescent Glow-in-the-Dark Fire Exit Sign (Pack of 5)',
        reason: 'Mandatory glow signage for emergency stairways during blackout evacuations.',
        sku: 'FSH-SGN-EXIT-GLOW',
        price: 999,
        quantity: 1,
      },
    ],
  },
  {
    id: 'kitchen',
    title: 'Commercial Kitchen / Restaurant',
    icon: Utensils,
    tagline: 'Deep fryers, grills, gas tandoors, ductwork',
    hazards: 'High temperature cooking oils (Class K/F), LPG cylinders',
    recommended: [
      {
        name: 'Fireshaw Kitchen Guard Wet Chemical Extinguisher 6L',
        reason: 'Potassium acetate mist saponifies burning oil, cooling fryers without dangerous oil splashing.',
        sku: 'FSH-EXT-WET-6L',
        price: 3699,
        quantity: 1,
      },
      {
        name: 'Fireshaw Premium Heavy Duty Fire Blanket 1.8m x 1.8m',
        reason: 'Quick pull deployment for chef clothes fires or burner tray flashovers.',
        sku: 'FSH-BLK-1818',
        price: 1199,
        quantity: 2,
      },
      {
        name: 'Fireshaw Fixed Rate-of-Rise Thermal Heat Detector',
        reason: 'Heat triggered alarm immune to normal cooking smoke plumes and steam.',
        sku: 'FSH-DET-HEAT-01',
        price: 1199,
        quantity: 1,
      },
    ],
  },
  {
    id: 'datacenter',
    title: 'Server Room / Telecom / Lab',
    icon: Server,
    tagline: 'Server racks, UPS batteries, control panels',
    hazards: 'High-density electronics, electrical flashover, heat buildup',
    recommended: [
      {
        name: 'Fireshaw Clean Agent CleanGas FE-36 Extinguisher 2kg',
        reason: 'Zero residue, non-conductive clean gas that protects servers without thermal shock.',
        sku: 'FSH-EXT-CLN-2KG',
        price: 5499,
        quantity: 1,
      },
      {
        name: 'Fireshaw Elite CO2 Fire Extinguisher 4.5kg',
        reason: 'Heavy-duty CO2 smothering for main electrical distribution boards (PDB).',
        sku: 'FSH-EXT-CO2-45',
        price: 4999,
        quantity: 1,
      },
    ],
  },
  {
    id: 'factory',
    title: 'Factory, Plant or Warehouse',
    icon: Factory,
    tagline: 'Manufacturing, inventory storage, loading bays',
    hazards: 'Wood pallets, fuel, machinery, high heat operations',
    recommended: [
      {
        name: 'Fireshaw Heavy Duty Swinging Fire Hose Reel with 30m Hose',
        reason: 'High volume continuous water spray for large area industrial floor coverage.',
        sku: 'FSH-HYD-REEL-30M',
        price: 7899,
        quantity: 1,
      },
      {
        name: 'Fireshaw AFFF Mechanical Foam Extinguisher 9L',
        reason: 'Essential blanketing foam for diesel generators, oil tanks, and solvents.',
        sku: 'FSH-EXT-FOAM-9L',
        price: 2899,
        quantity: 2,
      },
      {
        name: 'Fireshaw Comprehensive Industrial Burn Care & Trauma Kit',
        reason: '48-piece specialized sterile burn treatment kit for factory emergency protocols.',
        sku: 'FSH-AID-BURN-TRAUMA',
        price: 2499,
        quantity: 1,
      },
    ],
  },
];

export default function SafetyWizard({ isOpen, onClose, onAddBatchToCart, allProducts }) {
  const [selectedSpaceId, setSelectedSpaceId] = useState('home');

  if (!isOpen) return null;

  const currentSpace = spacePresets.find((s) => s.id === selectedSpaceId) || spacePresets[0];

  const handleAddAllToCart = () => {
    // Map recommendations to catalog products
    const itemsToAdd = [];
    currentSpace.recommended.forEach((rec) => {
      const matched = allProducts.find((p) => p.sku === rec.sku);
      if (matched) {
        itemsToAdd.push({
          ...matched,
          orderQty: rec.quantity,
        });
      }
    });

    if (itemsToAdd.length > 0) {
      onAddBatchToCart(itemsToAdd);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-fire-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 text-amber-400" />
            Fireshaw Safety Recommendation Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display">
            Fire Safety Extinguisher Finder
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Select your facility or room type below to receive tailored, NBC-compliant protection recommendations.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
            Step 1: Select Facility Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {spacePresets.map((space) => {
              const Icon = space.icon;
              const isActive = space.id === selectedSpaceId;
              return (
                <button
                  key={space.id}
                  onClick={() => setSelectedSpaceId(space.id)}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-fire-600 text-white border-fire-600 shadow-md shadow-fire-600/20 scale-[1.02]'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold leading-tight line-clamp-1">{space.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendations Panel */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-fire-100 text-fire-800">
                Selected Facility
              </span>
              <h3 className="text-lg font-bold text-slate-900">{currentSpace.title}</h3>
            </div>
            <p className="text-xs text-slate-500">
              <strong className="text-slate-700">Identified Hazards:</strong> {currentSpace.hazards}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Step 2: Recommended Protection Equipment
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentSpace.recommended.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-fire-600 mb-1">
                      <span>Qty: {item.quantity} Unit{item.quantity > 1 ? 's' : ''}</span>
                      <span className="text-slate-900 font-extrabold">₹{item.price * item.quantity}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {item.reason}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> ISI Marked
                    </span>
                    <span>₹{item.price} each</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Need customized fire safety load assessment? Call our safety engineers for site visits.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleAddAllToCart}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-fire-600 hover:bg-fire-700 shadow-md shadow-fire-600/20 flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Add Recommended Kit to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
