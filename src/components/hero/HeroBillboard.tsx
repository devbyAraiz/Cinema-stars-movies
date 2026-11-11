import React, { useState, useRef } from 'react';
import { Play, Info, Volume2, VolumeX, Plus, Check, Star, Sparkles, Crown, ChevronDown } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useToast } from '../ui/useToast';

interface HeroBillboardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  onOpenXRay: (movie: Movie) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  movie,
  onPlay,
  onMoreInfo,
  onOpenXRay,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { showToast } = useToast();

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      showToast(
        videoRef.current.muted ? 'Audio muted' : 'Audio on',
        'info'
      );
    }
  };

  return (
    <div className="relative w-full h-[88vh] min-h-[600px] max-h-[900px] overflow-hidden bg-black select-none">
      {/* Background Video / Backdrop Image */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={movie.trailerUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onCanPlay={() => setIsVideoReady(true)}
          poster={movie.backdropUrl}
          className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Fallback poster */}
        {!isVideoReady && (
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute inset-x-0 bottom-0 h-52 bottom-fade" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 cinestream-container h-full flex flex-col justify-end pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-2xl 2xl:max-w-4xl space-y-3 sm:space-y-5">

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {movie.isTopTen && (
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-red-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-xl shadow-red-950/70">
                <span className="text-sm sm:text-base leading-none">🔥</span>
                <span className="font-heading">#{movie.isTopTen} in Pakistan Today</span>
              </div>
            )}
            {movie.isPrime && (
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-500/40 text-[10px] sm:text-xs font-bold">
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
                <span>PRIME</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[10px] sm:text-xs font-semibold">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span>IMDb {movie.imdbRating}</span>
            </div>
            <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-200 text-[10px] sm:text-xs font-bold">
              {movie.videoQuality}
            </div>
            <div className="hidden sm:block px-2 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs">
              Dolby Atmos
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl font-heading">
              {movie.title}
            </h1>
            {movie.hindiTitle && (
              <p className="text-base sm:text-xl md:text-2xl font-semibold text-red-400/90 mt-1 sm:mt-2 drop-shadow-md">
                {movie.hindiTitle}
              </p>
            )}
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-300">
            {movie.audioTracks[0] && (
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-red-950/70 border border-red-500/40 text-red-300 text-[10px] sm:text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-red-400" />
                {movie.audioTracks[0]}
              </span>
            )}
            <span className="text-zinc-400">{movie.duration}</span>
            <span className="text-zinc-600">•</span>
            <span>{movie.releaseYear}</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">{movie.genres.slice(0, 3).join(' · ')}</span>
          </div>

          {/* Synopsis */}
          <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl 2xl:max-w-2xl">
            {movie.synopsis}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            <button
              id="hero-play-btn"
              onClick={() => onPlay(movie)}
              className="px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm md:text-base flex items-center gap-2 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black group-hover:scale-110 transition-transform" />
              <span>Watch Now</span>
            </button>

            <button
              id="hero-info-btn"
              onClick={() => onMoreInfo(movie)}
              className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-zinc-700/70 hover:bg-zinc-600/80 text-white font-semibold text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2 backdrop-blur-md border border-zinc-600/50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-200" />
              <span>More Info</span>
            </button>

            <button
              id="hero-watchlist-btn"
              onClick={() => onToggleWatchlist(movie)}
              className={`p-2.5 sm:p-3.5 rounded-xl border backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                isInWatchlist
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                  : 'bg-zinc-800/70 border-zinc-600/60 text-zinc-200 hover:text-white hover:bg-zinc-700/70'
              }`}
              title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
            >
              {isInWatchlist ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <button
              id="hero-xray-btn"
              onClick={() => onOpenXRay(movie)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/70 border border-sky-500/30 text-sky-200 text-xs sm:text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
              title="X-Ray Cast & Trivia"
            >
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
              <span>X-Ray</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Controls: Audio + Rating */}
      <div className="absolute right-4 sm:right-8 bottom-24 md:bottom-28 z-20 flex flex-col items-center gap-3">
        <button
          onClick={toggleAudio}
          className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-zinc-400" /> : <Volume2 className="w-5 h-5 text-red-400" />}
        </button>
        <div className="px-3 py-1.5 bg-zinc-900/80 border-l-4 border-red-600 text-zinc-200 text-xs font-bold tracking-wider backdrop-blur-md">
          {movie.rating}
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce opacity-40">
        <ChevronDown className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};
