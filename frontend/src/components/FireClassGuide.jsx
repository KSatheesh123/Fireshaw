import React from 'react';
import { Flame, Zap, Droplets, Utensils, Box, Shield, ArrowRight } from 'lucide-react';

const fireClasses = [
  {
    id: 'Class A',
    label: 'Class A',
    name: 'Ordinary Combustibles',
    description: 'Wood, paper, cloth, trash, plastics & textiles.',
    bestFor: 'ABC Powder, Water Mist, Foam',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-800',
    icon: Box,
  },
  {
    id: 'Class B',
    label: 'Class B',
    name: 'Flammable Liquids',
    description: 'Petrol, diesel, paints, solvents, kerosene & oils.',
    bestFor: 'Mechanical Foam, CO2, ABC Powder',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    icon: Droplets,
  },
  {
    id: 'Class C',
    label: 'Class C',
    name: 'Electrical & Gas Fires',
    description: 'Live wiring, servers, transformers, LPG & CNG.',
    bestFor: 'CO2, Clean Agent FE-36, Dry Powder',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    icon: Zap,
  },
  {
    id: 'Class K',
    label: 'Class K / F',
    name: 'Commercial Cooking Oils',
    description: 'Deep fryers, vegetable oils, animal fats & kitchen grease.',
    bestFor: 'Wet Chemical Extinguisher, Fire Blanket',
    color: 'from-fire-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-800',
    icon: Utensils,
  },
];

export default function FireClassGuide({ activeFireClass, onSelectFireClass }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-fire-600 uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-fire-600" />
            Standard Fire Classification Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            Choose by Hazard Type
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Using the wrong extinguisher can spread a fire or cause electrocution. Select your fire hazard below to view certified matching extinguishers.
          </p>
        </div>

        {activeFireClass !== 'All' && (
          <button
            onClick={() => onSelectFireClass('All')}
            className="text-xs font-semibold text-slate-600 hover:text-fire-600 underline flex items-center gap-1 self-start"
          >
            Clear Class Filter (Viewing {activeFireClass})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fireClasses.map((item) => {
          const Icon = item.icon;
          const isSelected = activeFireClass === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectFireClass(isSelected ? 'All' : item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                isSelected
                  ? 'ring-2 ring-fire-600 shadow-md bg-white border-transparent'
                  : 'bg-white hover:shadow-md hover:border-slate-300 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.bgColor} ${item.textColor} border ${item.borderColor}`}
                  >
                    {item.label}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-fire-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-2">
                <div className="text-[11px] text-slate-400 font-medium">Recommended:</div>
                <div className="text-xs font-bold text-slate-700">{item.bestFor}</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-fire-600 mt-2">
                  <span>{isSelected ? 'Selected' : 'Filter products'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
