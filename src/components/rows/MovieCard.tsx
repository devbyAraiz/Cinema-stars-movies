import React from 'react';
import { Play, Plus, Check, Info, Star, Crown } from 'lucide-react';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  onOpenXRay: (movie: Movie) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlay,
  onMoreInfo,
  onOpenXRay,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  return (
    <div className="relative group shrink-0 w-36 xs:w-44 sm:w-52 md:w-60 2xl:w-72 4k:w-96 transition-all duration-300">
      {/* Base Card */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 shadow-md group-hover:shadow-2xl group-hover:shadow-black/60 group-hover:border-zinc-600 transition-all duration-300 group-hover:-translate-y-1">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Top Left Badges */}
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          {movie.isPrime && (
            <span className="flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-sky-600 text-white shadow">
              <Crown className="w-2.5 h-2.5" /> P
            </span>
          )}
          {movie.isNetflixOriginal && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-red-600 text-white shadow">N</span>
          )}
          {movie.isHindiDubbed && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/90 text-black shadow">HI</span>
          )}
        </div>

        {/* Top Right: Quality Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-black/70 border border-zinc-700/60 text-zinc-200">
            {movie.videoQuality}
          </span>
        </div>

        {/* Bottom Info (always visible) */}
        <div className="absolute bottom-2 left-2 right-2 z-10 group-hover:opacity-0 transition-opacity duration-200">
          <h4 className="font-bold text-white text-xs sm:text-sm truncate drop-shadow-md">
            {movie.title}
          </h4>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-0.5">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-2.5 h-2.5 fill-amber-400" /> {movie.imdbRating}
            </span>
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/80 to-black/50 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-all duration-250 flex flex-col justify-between z-20">
          {/* Top: Title & Info */}
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <h5 className="font-bold text-white text-xs sm:text-sm leading-tight line-clamp-2">
                {movie.title}
              </h5>
              {movie.hindiTitle && (
                <p className="text-[10px] text-red-400 truncate mt-0.5">{movie.hindiTitle}</p>
              )}
            </div>
          </div>

          {/* Middle: Meta */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-emerald-400 font-bold">98% Match</span>
              <span className="px-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-200">{movie.rating}</span>
              <span className="text-zinc-400">{movie.releaseYear}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {movie.genres.slice(0, 2).map((g) => (
                <span key={g} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400">
                  {g}
                </span>
              ))}
              {movie.audioTracks[0] && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/25 truncate max-w-[100px]">
                  {movie.audioTracks[0].split(' ')[0]}
                </span>
              )}
            </div>
          </div>

          {/* Bottom: Action Buttons */}
          <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-zinc-700/60">
            <div className="flex items-center gap-1.5">
              <button
                id={`play-btn-${movie.id}`}
                onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all hover:scale-110 shadow-lg shadow-red-900/40"
                title="Play"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
              <button
                id={`watchlist-btn-${movie.id}`}
                onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie); }}
                className={`p-2 rounded-lg border transition-all hover:scale-110 ${
                  isInWatchlist
                    ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700'
                }`}
                title={isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              >
                {isInWatchlist ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
              <button
                id={`xray-btn-${movie.id}`}
                onClick={(e) => { e.stopPropagation(); onOpenXRay(movie); }}
                className="p-2 rounded-lg bg-sky-950/70 border border-sky-600/50 text-sky-300 hover:text-sky-100 transition-all hover:scale-110"
                title="X-Ray"
              >
                <Crown className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              id={`info-btn-${movie.id}`}
              onClick={(e) => { e.stopPropagation(); onMoreInfo(movie); }}
              className="p-2 rounded-lg bg-zinc-700/70 hover:bg-zinc-600 text-zinc-200 hover:text-white border border-zinc-600/50 transition-all"
              title="Details"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
