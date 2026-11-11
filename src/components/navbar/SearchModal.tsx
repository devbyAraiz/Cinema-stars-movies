import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play, Info, Star, Film } from 'lucide-react';
import { Movie } from '../../types/movie';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
  onPlayMovie,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setQuery('');
    setSelectedGenre('all');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  const genres = ['all', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Crime', 'Thriller'];

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery =
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      (movie.hindiTitle && movie.hindiTitle.toLowerCase().includes(query.toLowerCase())) ||
      movie.director.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast.some((c) => c.name.toLowerCase().includes(query.toLowerCase())) ||
      movie.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()));

    const matchesGenre = selectedGenre === 'all' || movie.genres.includes(selectedGenre);

    return matchesQuery && matchesGenre;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950/70">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, Hindi name, actor (SRK, Prabhas, Nolan), or genre..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Genre Pills */}
        <div className="px-4 py-2 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-zinc-500 shrink-0 font-medium">Filter:</span>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-3 divide-y divide-zinc-800/60">
          {filteredMovies.length === 0 ? (
            <div className="py-12 text-center">
              <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-300 font-semibold text-base">No movies found matching "{query}"</p>
              <p className="text-zinc-500 text-xs mt-1">Try searching for Jawan, Oppenheimer, Mirzapur, or Animal.</p>
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 group hover:bg-white/[0.02] p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-14 h-20 rounded-lg object-cover shadow-md shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm md:text-base group-hover:text-red-400 transition-colors">
                        {movie.title}
                      </h4>
                      {movie.hindiTitle && (
                        <span className="text-xs text-zinc-400">({movie.hindiTitle})</span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-400">
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {movie.imdbRating}
                      </span>
                      <span>•</span>
                      <span>{movie.releaseYear}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-300">
                        {movie.videoQuality}
                      </span>
                      {movie.isHindiDubbed && (
                        <span className="px-1.5 py-0.2 rounded bg-red-950/70 border border-red-500/40 text-[10px] text-red-300 font-medium">
                          Hindi Dubbed
                        </span>
                      )}
                      {movie.isPrime && (
                        <span className="px-1.5 py-0.2 rounded bg-sky-950/70 border border-sky-500/40 text-[10px] text-sky-300 font-medium">
                          Prime
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 line-clamp-1 mt-1 max-w-md">
                      Starring: {movie.cast.map((c) => c.name).slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onPlayMovie(movie);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-red-900/30 transition-all hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span className="hidden sm:inline">Play</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectMovie(movie);
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Movie Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
