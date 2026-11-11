import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { FAQS } from '../../data/faqs';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          Everything you need to know about streaming, servers, and multi-audio support.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-lg hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="p-1 rounded-full bg-zinc-800 text-zinc-300">
                  {isOpen ? <X className="w-5 h-5 text-red-500" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-zinc-950/40 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
