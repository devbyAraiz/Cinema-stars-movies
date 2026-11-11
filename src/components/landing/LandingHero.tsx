import React, { useState } from 'react';
import { ChevronRight, Tv, Download, Smartphone, Sparkles } from 'lucide-react';
import { useToast } from '../ui/useToast';

interface LandingHeroProps {
  onGetStarted: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted }) => {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address to start streaming', 'warning');
      return;
    }
    showToast(`Welcome! Unlimited VIP streaming activated for ${email}`, 'success');
    onGetStarted();
  };

  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Poster Collage with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=2000&q=80"
          alt="Cinema collage background"
          className="w-full h-full object-cover filter brightness-[0.25] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/70 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 pb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Netflix • Prime • HindiLinks Hybrid
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight font-heading">
          Unlimited Bollywood, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-sky-400">
            Hindi Dubbed & 4K Originals
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-medium">
          Watch anywhere. Multi-server streaming with zero buffering. Cancel anytime.
        </p>

        <p className="text-xs sm:text-sm text-zinc-400">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email Lead Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full sm:w-80 px-4 py-3.5 rounded-xl bg-black/60 border border-zinc-600 text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-red-500 backdrop-blur-md"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl shadow-red-950/80 hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            <span>Get Started</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-zinc-400">
          <span>✓ 4 Streaming Servers</span>
          <span>✓ Hindi Dubbed 5.1</span>
          <span>✓ 100% Free VIP Preview</span>
        </div>
      </div>

      {/* Feature Value Propositions (Netflix style pillars) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
            <Tv className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white font-heading">Enjoy on your TV</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white font-heading">Download your shows</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Save your favorites easily and always have something to watch offline on flights or trains.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white font-heading">Watch everywhere</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.
          </p>
        </div>
      </div>
    </div>
  );
};
