import React, { useState } from 'react';
import { Tv, Play, Star, Bookmark, Check, Download, Layers } from 'lucide-react';
import { Movie } from '../../types/movie';

interface WebSeriesPageProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  watchlist: string[];
  onToggleWatchlist: (movie: Movie) => void;
}

export const WebSeriesPage: React.FC<WebSeriesPageProps> = ({
  movies,
  onPlay,
  onMoreInfo,
  watchlist,
  onToggleWatchlist,
}) => {
  const seriesList = movies.filter(
    (m) => (m.seasons && m.seasons.length > 0) || m.category === 'prime-original' || m.category === 'netflix-original'
  );

  const [selectedSeries, setSelectedSeries] = useState<Movie>(seriesList[0] || movies[0]);
  const [selectedSeasonNum, setSelectedSeasonNum] = useState<number>(1);

  const currentSeason =
    selectedSeries.seasons?.find((s) => s.seasonNumber === selectedSeasonNum) ||
    selectedSeries.seasons?.[0];

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-zinc-900 to-indigo-950 border border-purple-500/40 p-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" /> Web Series & TV Shows
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
            Binge-Worthy Indian & International Series
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Mirzapur, The Boys, Panchayat, Stranger Things, and sacred crime sagas. Multi-season episode navigation with all seasons and high-speed multi-server streaming.
          </p>
        </div>
      </div>

      {/* Featured Show Navigator */}
      <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <img
              src={selectedSeries.posterUrl}
              alt={selectedSeries.title}
              className="w-16 h-24 rounded-xl object-cover shadow-lg border border-zinc-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white uppercase">
                  ACTIVE SERIES
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> {selectedSeries.imdbRating}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                {selectedSeries.title}
              </h2>
              {selectedSeries.hindiTitle && (
                <p className="text-xs text-purple-400 font-medium">{selectedSeries.hindiTitle}</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlay(selectedSeries)}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-950/60 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume S{selectedSeasonNum}:E1</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(selectedSeries)}
              className={`p-2.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                watchlist.includes(selectedSeries.id)
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
              }`}
            >
              {watchlist.includes(selectedSeries.id) ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{watchlist.includes(selectedSeries.id) ? 'Saved' : 'Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Season Selector */}
        {selectedSeries.seasons && selectedSeries.seasons.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Season Episodes ({currentSeason?.episodes.length || 0})
              </h3>
              <div className="flex items-center gap-2">
                {selectedSeries.seasons.map((s) => (
                  <button
                    key={s.seasonNumber}
                    onClick={() => setSelectedSeasonNum(s.seasonNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedSeasonNum === s.seasonNumber
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    Season {s.seasonNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Episode List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSeason?.episodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onPlay(selectedSeries)}
                  className="group rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-purple-500/80 transition-all p-3 cursor-pointer space-y-3"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900">
                    <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-zinc-200">
                      {ep.duration}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors truncate">
                      {ep.epNumber}. {ep.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {ep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Series Collection Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-heading">
          All Available Web Series & Shows ({seriesList.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {seriesList.map((series) => {
            const isSelected = selectedSeries.id === series.id;
            return (
              <div
                key={series.id}
                onClick={() => {
                  setSelectedSeries(series);
                  setSelectedSeasonNum(series.seasons?.[0]?.seasonNumber || 1);
                }}
                className={`group rounded-2xl overflow-hidden bg-zinc-900 border transition-all cursor-pointer p-3 space-y-3 ${
                  isSelected
                    ? 'border-purple-500 shadow-xl shadow-purple-950/40 ring-2 ring-purple-500/50'
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-zinc-950">
                  <img src={series.backdropUrl} alt={series.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                    {series.duration}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-purple-400 truncate">
                    {series.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mt-1">
                    <span>{series.releaseYear}</span>
                    <span className="text-amber-400 font-bold">★ {series.imdbRating}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-1 border-t border-zinc-800">
                  <button
                    onClick={(e) => { e.stopPropagation(); onPlay(series); }}
                    className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-white" /> Play
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onMoreInfo(series); }}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Series Details"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
