import React from 'react';
import { CHANNELS } from '../../data/channels';
import { ChevronRight, Sparkles } from 'lucide-react';

interface ChannelsHubProps {
  onSelectChannel: (channelId: string) => void;
}

export const ChannelsHub: React.FC<ChannelsHubProps> = ({ onSelectChannel }) => {
  return (
    <section className="relative z-20 cinestream-container -mt-8 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Prime Channels Hub
          </span>
          <span className="text-zinc-500 text-xs hidden sm:inline">| Partner Hubs & Bollywood Vault</span>
        </div>
        <span className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
          See all channels <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CHANNELS.map((ch) => (
          <div
            key={ch.id}
            onClick={() => onSelectChannel(ch.id)}
            className={`group relative overflow-hidden rounded-xl border border-zinc-700/60 bg-gradient-to-br ${ch.bgGradient} p-3.5 hover:border-sky-400/80 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                {ch.logo}
              </span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/40 text-sky-300 border border-sky-400/30">
                {ch.badge}
              </span>
            </div>
            <h4 className="font-bold text-white text-xs font-heading tracking-wide group-hover:text-sky-300 transition-colors">
              {ch.name}
            </h4>
            <p className="text-[10px] text-zinc-300 line-clamp-1 mt-0.5">
              {ch.tagline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
