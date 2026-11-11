import React, { useState } from 'react';
import { Layers, Play, Star, Bookmark, Check, Filter, ArrowUpDown, Film, Download } from 'lucide-react';
import { Movie } from '../../types/movie';

interface SouthDubbedPageProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const SouthDubbedPage: React.FC<SouthDubbedPageProps> = ({
  movies,
  onPlay,
  onMoreInfo,
  watchlist,
  onToggleWatchlist,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [selectedAudioFilter, setSelectedAudioFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'year'>('rating');

  const southList = movies.filter((m) => m.category === 'south-hindi');

  const filtered = southList
    .filter((m) => {
      const matchQuality = selectedQuality === 'all' || m.videoQuality === selectedQuality;
      const matchAudio =
        selectedAudioFilter === 'all' ||
        m.audioTracks.some((a) => a.toLowerCase().includes(selectedAudioFilter.toLowerCase()));
      return matchQuality && matchAudio;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.imdbRating - a.imdbRating;
      return b.releaseYear - a.releaseYear;
    });

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-zinc-900 to-orange-950 border border-amber-500/40 p-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> South Cinema Hindi Dubbed Hub
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
            South Indian Mega Action in Hindi Dubbed
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Pushpa 2, Salaar, K.G.F Chapter 2, Devara, and Kalki 2898 AD. Pure high-octane mass cinema with official multi-language theatrical 5.1 mixes.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase">
            <Filter className="w-3.5 h-3.5 text-amber-500" /> Filters:
          </div>

          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Resolutions</option>
            <option value="4K UHD">4K UHD (HDR10)</option>
            <option value="1080p FHD">1080p Full HD</option>
          </select>

          <select
            value={selectedAudioFilter}
            onChange={(e) => setSelectedAudioFilter(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Audio Dubs</option>
            <option value="Hindi Dubbed">Hindi Dubbed 5.1</option>
            <option value="Telugu">Telugu Original + Hindi</option>
            <option value="Tamil">Tamil Original + Hindi</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400 flex items-center gap-1 font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" /> Sort:
          </span>
          <div className="flex rounded-xl bg-zinc-800 p-1 border border-zinc-700">
            <button
              onClick={() => setSortBy('rating')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                sortBy === 'rating' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              IMDb Rating
            </button>
            <button
              onClick={() => setSortBy('year')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                sortBy === 'year' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Release Year
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((movie) => {
          const isInWatchlist = watchlist.includes(movie.id);
          return (
            <div
              key={movie.id}
              className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/80 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                <img
                  src={movie.backdropUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                <span className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500 text-black shadow font-heading">
                  HINDI DUBBED
                </span>
                <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-black/70 border border-zinc-700 text-zinc-200">
                  {movie.videoQuality}
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
                  <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  {movie.hindiTitle && (
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">{movie.hindiTitle}</p>
                  )}
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-zinc-800/60 border border-zinc-800 text-[11px] text-zinc-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Director:</span>
                    <span className="font-semibold text-zinc-200">{movie.director}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Audio:</span>
                    <span className="text-amber-300 font-medium truncate max-w-[150px]">{movie.audioTracks[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => onPlay(movie)}
                    className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1 shadow transition-all hover:scale-102"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Watch</span>
                  </button>

                  <button
                    onClick={() => onMoreInfo(movie)}
                    className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => onToggleWatchlist(movie)}
                    className={`py-2 px-2 rounded-xl border text-xs flex items-center justify-center gap-1 transition-all ${
                      isInWatchlist
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isInWatchlist ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isInWatchlist ? 'Saved' : 'List'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No South Hindi Dubbed titles match</h3>
          <p className="text-xs text-zinc-400 mt-1">Try resetting audio or resolution filter.</p>
        </div>
      )}
    </div>
  );
};
