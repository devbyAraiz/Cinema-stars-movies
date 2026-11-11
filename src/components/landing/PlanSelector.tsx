import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../../data/faqs';
import { useToast } from '../ui/useToast';

interface PlanSelectorProps {
  onPlanChosen: () => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ onPlanChosen }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('premium');
  const { showToast } = useToast();

  const handleSelect = (id: string, name: string) => {
    setSelectedPlanId(id);
    showToast(`Selected ${name}. Redirecting to stream portal!`, 'success');
    setTimeout(() => {
      onPlanChosen();
    }, 1000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500">
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Choose the plan that fits your screen
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          All plans include full access to Bollywood, Hollywood Hindi Dubbed, South Indian blockbusters, and 4 streaming servers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative rounded-2xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-red-500 shadow-2xl ring-2 ring-red-500/50 transform scale-102'
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <span className="inline-block px-3 py-1 text-[9px] font-black uppercase rounded-bl-xl bg-gradient-to-r from-red-600 to-amber-500 text-white tracking-widest shadow">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-white font-heading">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-zinc-800 text-xs">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500">Quality</span>
                    <span className="font-semibold text-white">{plan.quality}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500">Resolution</span>
                    <span className="font-semibold text-emerald-400">{plan.resolution}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500">Screens</span>
                    <span className="font-semibold text-white">{plan.simultaneousScreens} at once</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-zinc-500 block mb-1">Devices:</span>
                    <div className="flex flex-wrap gap-1">
                      {plan.supportedDevices.map((d) => (
                        <span
                          key={d}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(plan.id, plan.name);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/60'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Plan Selected' : 'Choose Plan'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
