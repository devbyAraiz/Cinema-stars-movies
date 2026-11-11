import React, { useState, useEffect } from 'react';
import { X, Play, Plus, Check, Star, Crown, Download } from 'lucide-react';
import { Movie } from '../../types/movie';

interface MovieDetailModalProps {
  movie: Movie | null;
  allMovies: Movie[];
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  allMovies,
  onClose,
  onPlay,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = movie ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, movie]);

  if (!movie) return null;

  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && (m.category === movie.category || m.genres.some((g) => movie.genres.includes(g))))
    .slice(0, 4);

  const currentSeason = movie.seasons?.find((s) => s.seasonNumber === selectedSeason);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl bg-[#141518] border border-zinc-700/60 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          id="detail-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/80 hover:bg-black text-white border border-zinc-600/60 transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-900">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-[#141518]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141518]/60 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-5 left-6 right-16">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {movie.isPrime && (
                <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-sky-600 text-white">
                  <Crown className="w-3 h-3" /> PRIME
                </span>
              )}
              {movie.isNetflixOriginal && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-red-600 text-white">
                  NETFLIX
                </span>
              )}
              {movie.isHindiDubbed && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500 text-black">
                  HINDI DUBBED
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              {movie.title}
            </h2>
            {movie.hindiTitle && (
              <p className="text-base text-red-400 font-medium mt-1">{movie.hindiTitle}</p>
            )}

            {/* Action Buttons on Banner */}
            <div className="flex items-center gap-3 mt-4">
              <button
                id="detail-play-btn"
                onClick={() => { onClose(); onPlay(movie); }}
                className="px-7 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play Now</span>
              </button>

              <button
                id="detail-watchlist-btn"
                onClick={() => onToggleWatchlist(movie)}
                className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${
                  isInWatchlist
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-zinc-800/80 border-zinc-600 text-white hover:bg-zinc-700'
                }`}
                title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
              >
                {isInWatchlist ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Synopsis */}
            <div className="md:col-span-2 space-y-4">
              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-emerald-400 font-bold text-sm">98% Match</span>
                <span className="text-zinc-400">{movie.releaseYear}</span>
                <span className="px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800/70 text-zinc-200 font-bold">
                  {movie.rating}
                </span>
                <span className="text-zinc-400">{movie.duration}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800/70 border border-zinc-700 text-zinc-200 font-bold">
                  {movie.videoQuality}
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {movie.imdbRating}
                </span>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {movie.synopsis}
              </p>

              {/* Audio Tracks */}
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Audio Tracks</span>
                <div className="flex flex-wrap gap-2">
                  {movie.audioTracks.map((tr) => (
                    <span key={tr} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-xs border border-zinc-700/60">
                      {tr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Links */}
              {movie.downloadLinks.length > 0 && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                  <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Direct Download Links
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {movie.downloadLinks.map((dl) => (
                      <a
                        key={dl.quality}
                        href={dl.url}
                        onClick={(e) => e.preventDefault()}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-950/70 border border-zinc-700 hover:border-emerald-500/50 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3 h-3 text-emerald-400" />
                        <span>{dl.quality}</span>
                        <span className="text-zinc-500">({dl.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Cast & Details */}
            <div className="space-y-4 text-xs border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pt-4 md:pt-0">
              <div>
                <span className="text-zinc-500 block uppercase font-bold tracking-wider mb-1.5">Director</span>
                <span className="text-white font-semibold">{movie.director}</span>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase font-bold tracking-wider mb-1.5">Starring</span>
                <div className="space-y-1.5">
                  {movie.cast.slice(0, 4).map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                      />
                      <span className="text-zinc-300 leading-tight">
                        {c.name} <span className="text-zinc-500">as {c.role}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase font-bold tracking-wider mb-1.5">Genres</span>
                <div className="flex flex-wrap gap-1.5">
                  {movie.genres.map((g) => (
                    <span key={g} className="px-2 py-0.5 rounded-lg bg-zinc-800 border border-zinc-700/60 text-zinc-300">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase font-bold tracking-wider mb-1.5">Subtitles</span>
                <span className="text-zinc-300">{movie.subtitles.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Episodes Section */}
          {movie.seasons && movie.seasons.length > 0 && (
            <div className="border-t border-zinc-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white font-heading">Episodes</h4>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-zinc-800 border border-zinc-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500"
                >
                  {movie.seasons.map((s) => (
                    <option key={s.seasonNumber} value={s.seasonNumber}>
                      Season {s.seasonNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto no-scrollbar">
                {(currentSeason || movie.seasons[0]).episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => { onClose(); onPlay(movie); }}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800/60 hover:border-zinc-700 transition-all cursor-pointer group"
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-950">
                      <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors truncate">
                        {ep.epNumber}. {ep.title}
                      </h5>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">{ep.description}</p>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono shrink-0">{ep.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This */}
          {similarMovies.length > 0 && (
            <div className="border-t border-zinc-800 pt-6">
              <h4 className="text-base font-bold text-white font-heading mb-4">More Like This</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similarMovies.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onPlay(sim)}
                    className="group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-all cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={sim.backdropUrl}
                        alt={sim.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <span className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-white font-bold">
                        {sim.videoQuality}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <h5 className="font-bold text-white text-xs truncate group-hover:text-red-400 transition-colors">
                        {sim.title}
                      </h5>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>{sim.imdbRating}</span>
                        <span>· {sim.releaseYear}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
