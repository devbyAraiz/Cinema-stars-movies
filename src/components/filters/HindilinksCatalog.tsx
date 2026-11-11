import React, { useState } from 'react';
import { Sparkles, Filter, Play, Download, Star, CheckCircle2, RotateCcw, Server } from 'lucide-react';
import { Movie } from '../../types/movie';

interface HindilinksCatalogProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const HindilinksCatalog: React.FC<HindilinksCatalogProps> = ({
  movies,
  onPlay,
  onMoreInfo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [selectedAudio, setSelectedAudio] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'bollywood', label: 'Bollywood Hindi' },
    { id: 'south-hindi', label: 'South Hindi Dubbed' },
    { id: 'hollywood', label: 'Hollywood Dual Audio' },
    { id: 'web-series', label: 'Web Series' },
    { id: 'punjabi', label: 'Punjabi Movies' },
  ];

  const years = ['all', '2024', '2023', '2022'];
  const qualities = ['all', '4K UHD', '1080p FHD'];
  const audios = ['all', 'Hindi Dubbed', 'Dual Audio', 'Original'];
  const genres = ['all', 'Action', 'Thriller', 'Crime', 'Comedy', 'Sci-Fi', 'Drama'];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedQuality('all');
    setSelectedAudio('all');
    setSelectedGenre('all');
  };

  const filteredMovies = movies.filter((m) => {
    const matchCategory =
      selectedCategory === 'all' ||
      m.category === selectedCategory ||
      (selectedCategory === 'web-series' && (m.seasons?.length ?? 0) > 0);

    const matchYear = selectedYear === 'all' || m.releaseYear.toString() === selectedYear;

    const matchQuality = selectedQuality === 'all' || m.videoQuality === selectedQuality;

    const matchAudio =
      selectedAudio === 'all' ||
      (selectedAudio === 'Hindi Dubbed' && m.isHindiDubbed) ||
      (selectedAudio === 'Dual Audio' && m.audioTracks.some((a) => a.toLowerCase().includes('dual'))) ||
      (selectedAudio === 'Original' && !m.isHindiDubbed);

    const matchGenre = selectedGenre === 'all' || m.genres.includes(selectedGenre);

    return matchCategory && matchYear && matchQuality && matchAudio && matchGenre;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-950/80 via-zinc-900 to-red-950/70 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> HindiLinks4u Power Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Bollywood, South Dubbed & Dual Audio Catalog
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
              Filter through uncensored Hindi dubbed releases, multi-server 4K streams, and direct 1-click cloud downloads.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 shrink-0">
            <Server className="w-5 h-5 text-emerald-400" />
            <div className="text-xs">
              <span className="font-bold text-white block">4 Streaming Servers Online</span>
              <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> CDN Buffering: 0% Lag
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Control Board */}
      <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Granular Catalog Filters</h4>
            <span className="text-xs text-zinc-400">({filteredMovies.length} titles matched)</span>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset Filters
          </button>
        </div>

        {/* Category Pills */}
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase block mb-1.5">
            Category / Industry
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Row Selectors: Year, Audio, Quality, Genre */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Release Year */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Release Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-2 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="all">All Release Years</option>
              {years.filter((y) => y !== 'all').map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Audio Dub */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Audio Dub</label>
            <select
              value={selectedAudio}
              onChange={(e) => setSelectedAudio(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-2 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="all">All Audio Tracks</option>
              {audios.filter((a) => a !== 'all').map((audio) => (
                <option key={audio} value={audio}>{audio}</option>
              ))}
            </select>
          </div>

          {/* Video Resolution */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Resolution</label>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-2 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="all">All Resolutions</option>
              {qualities.filter((q) => q !== 'all').map((quality) => (
                <option key={quality} value={quality}>{quality}</option>
              ))}
            </select>
          </div>

          {/* Genre */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase block mb-1">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-xl p-2 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="all">All Genres</option>
              {genres.filter((g) => g !== 'all').map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filtered Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
              <img
                src={movie.backdropUrl}
                alt={movie.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Status Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {movie.isHindiDubbed ? (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500 text-black shadow font-heading">
                    HINDI DUBBED
                  </span>
                ) : (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-600 text-white shadow font-heading">
                    HINDI ORIGINAL
                  </span>
                )}
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-900/90 text-zinc-200 border border-zinc-700">
                  {movie.videoQuality}
                </span>
              </div>

              {/* Rating Stamp */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-white">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {movie.imdbRating}
                </span>
                <span className="text-zinc-300 text-[11px]">{movie.duration} • {movie.releaseYear}</span>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                </div>
                {movie.hindiTitle && (
                  <p className="text-xs text-red-400 font-medium">{movie.hindiTitle}</p>
                )}

                <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>

              {/* Audio & Server Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-[11px]">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Audio:</span>
                  <span className="font-semibold text-zinc-200 truncate max-w-[170px]">
                    {movie.audioTracks[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Servers:</span>
                  <span className="text-emerald-400 font-medium">4 Active (SuperStream, VidCloud)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onPlay(movie)}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-102 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Stream Player</span>
                </button>
                <button
                  onClick={() => onMoreInfo(movie)}
                  className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Downloads</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
