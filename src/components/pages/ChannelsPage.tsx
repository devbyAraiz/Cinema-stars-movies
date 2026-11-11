import React, { useState } from 'react';
import { Crown, Play, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { CHANNELS } from '../../data/channels';
import { Movie } from '../../types/movie';

interface ChannelsPageProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const ChannelsPage: React.FC<ChannelsPageProps> = ({
  movies,
  onPlay,
  onMoreInfo,
}) => {
  const [selectedChannelId, setSelectedChannelId] = useState<string>('prime-originals');

  const activeChannel = CHANNELS.find((c) => c.id === selectedChannelId) || CHANNELS[0];

  // Map channels to movie collections
  const channelMovies = movies.filter((m) => {
    if (selectedChannelId === 'prime-originals') return m.isPrime || m.category === 'prime-original';
    if (selectedChannelId === 'netflix-specials') return m.isNetflixOriginal || m.category === 'netflix-original';
    if (selectedChannelId === 'hindilinks-vault') return m.isHindiDubbed || m.category === 'south-hindi';
    if (selectedChannelId === 'lionsgate') return m.category === 'hollywood';
    return true;
  });

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Prime Video Channels Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-950 via-zinc-900 to-blue-950 border border-sky-500/40 p-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-sky-400" /> Prime Video Channels Hub
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
            Premium Partner Networks & Vaults
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Manage your subscriptions and explore dedicated catalogues from Lionsgate Play, Discovery+, Anime Prime, and the HindiLinks Vault with unified 4K HDR playback.
          </p>
        </div>
      </div>

      {/* Channel Cards Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CHANNELS.map((ch) => {
          const isSelected = selectedChannelId === ch.id;
          return (
            <div
              key={ch.id}
              onClick={() => setSelectedChannelId(ch.id)}
              className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-sky-900/90 to-zinc-900 border-sky-400 shadow-xl shadow-sky-950/60 ring-2 ring-sky-500/50 scale-102'
                  : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div className="text-3xl mb-3 filter drop-shadow group-hover:scale-110 transition-transform">
                {ch.logo}
              </div>
              <h3 className="font-bold text-white text-sm font-heading">{ch.name}</h3>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-black/50 text-sky-300 block mt-2 truncate">
                {ch.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Channel Spotlight */}
      <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-5xl filter drop-shadow">{activeChannel.logo}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-600/30 border border-sky-500/50 text-sky-300 uppercase">
                {activeChannel.badge}
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Subscription
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
              {activeChannel.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">{activeChannel.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block text-xs">
            <span className="text-zinc-400 block">Unified Billing:</span>
            <span className="font-bold text-white">Included in VIP Pass</span>
          </div>
          <button
            onClick={() => {
              if (channelMovies[0]) onPlay(channelMovies[0]);
            }}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-950/60 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Channel Top Hit</span>
          </button>
        </div>
      </div>

      {/* Channel Movies Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" /> Titles in {activeChannel.name} ({channelMovies.length})
          </h3>
          <span className="text-xs text-zinc-400">All available in 4K UHD & Dolby Atmos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {channelMovies.map((movie) => (
            <div
              key={movie.id}
              className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-sky-500/80 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-sky-600 text-white shadow">
                  PRIME CHANNEL
                </span>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {movie.imdbRating}
                  </span>
                  <span className="text-zinc-300 text-[11px]">{movie.releaseYear}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-sky-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  {movie.hindiTitle && (
                    <p className="text-xs text-sky-400/90 font-medium mt-0.5">{movie.hindiTitle}</p>
                  )}
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => onPlay(movie)}
                    className="py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow transition-all hover:scale-102"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Stream Now</span>
                  </button>
                  <button
                    onClick={() => onMoreInfo(movie)}
                    className="py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
