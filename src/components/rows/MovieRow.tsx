import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  onOpenXRay: (movie: Movie) => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  subtitle,
  movies,
  onPlay,
  onMoreInfo,
  onOpenXRay,
  watchlist,
  onToggleWatchlist,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

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

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative my-6 sm:my-8 cinestream-container group/row">
      {/* Row Header */}
      <div className="flex items-baseline justify-between mb-2.5">
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading tracking-wide group-hover/row:text-red-400 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs text-zinc-400 hidden sm:inline">
              {subtitle}
            </span>
          )}
        </div>
        <span className="text-xs text-red-500 font-semibold cursor-pointer hover:underline flex items-center">
          Explore All &gt;
        </span>
      </div>

      {/* Row Scroll Container */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-24 bg-black/60 hover:bg-black/90 text-white rounded-r-lg flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity backdrop-blur-sm border-r border-y border-zinc-700/60 shadow-xl"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Movies Carousel */}
        <div
          ref={rowRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={onPlay}
              onMoreInfo={onMoreInfo}
              onOpenXRay={onOpenXRay}
              isInWatchlist={watchlist.includes(movie.id)}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-24 bg-black/60 hover:bg-black/90 text-white rounded-l-lg flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity backdrop-blur-sm border-l border-y border-zinc-700/60 shadow-xl"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
