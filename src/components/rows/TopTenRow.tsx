import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Check, Info, Star } from 'lucide-react';
import { Movie } from '../../types/movie';

interface TopTenRowProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const TopTenRow: React.FC<TopTenRowProps> = ({
  movies,
  onPlay,
  onMoreInfo,
  watchlist,
  onToggleWatchlist,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const top10 = movies
    .filter((m) => m.isTopTen !== undefined)
    .sort((a, b) => (a.isTopTen || 99) - (b.isTopTen || 99))
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative my-8 cinestream-container group/top">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg sm:text-2xl font-black text-white font-heading tracking-wide">
          Top 10 in Movies & Series Today
        </h3>
        <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-red-600/90 text-white">
          PAKISTAN & GLOBAL
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-8 sm:w-10 h-28 sm:h-32 bg-black/70 hover:bg-black/95 text-white rounded-r-lg flex items-center justify-center opacity-0 group-hover/top:opacity-100 transition-opacity backdrop-blur-sm border-r border-y border-zinc-700/60 shadow-xl cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          ref={rowRef}
          className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-4 px-1 sm:px-2 scroll-smooth"
        >
          {top10.map((movie) => {
            const isInWatchlist = watchlist.includes(movie.id);
            return (
              <div
                key={movie.id}
                className="flex items-center shrink-0 group relative select-none"
              >
                {/* Netflix-style Bold Numeral Typography */}
                <span className="top-10-rank text-[85px] xs:text-[105px] sm:text-[130px] md:text-[160px] 2xl:text-[190px] 4k:text-[230px] font-black leading-none -mr-4 sm:-mr-8 z-0 select-none pointer-events-none">
                  {movie.isTopTen}
                </span>

                {/* Vertical Poster Card */}
                <div className="relative z-10 w-28 xs:w-32 sm:w-40 md:w-48 2xl:w-56 4k:w-72 aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700/80 shadow-2xl group-hover:scale-105 group-hover:border-red-500/80 transition-all duration-300">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />

                  {/* Gradient bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {movie.isHindiDubbed && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-black">
                        HINDI
                      </span>
                    )}
                    {movie.isPrime && (
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-sky-600 text-white">
                        PRIME
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <h5 className="font-bold text-white text-xs truncate">
                      {movie.title}
                    </h5>
                    <div className="flex items-center justify-between text-[10px] text-zinc-300 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-2.5 h-2.5 fill-amber-400" /> {movie.imdbRating}
                      </span>
                      <span>{movie.videoQuality}</span>
                    </div>
                  </div>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center">
                    <button
                      onClick={() => onPlay(movie)}
                      className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      title="Play on SuperStream"
                    >
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onToggleWatchlist(movie)}
                        className={`p-2 rounded-lg border text-xs ${
                          isInWatchlist
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                        }`}
                        title="Watchlist"
                      >
                        {isInWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onMoreInfo(movie)}
                        className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white"
                        title="More Info"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-32 bg-black/70 hover:bg-black/95 text-white rounded-l-lg flex items-center justify-center opacity-0 group-hover/top:opacity-100 transition-opacity backdrop-blur-sm border-l border-y border-zinc-700/60 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
