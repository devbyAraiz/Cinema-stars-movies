import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Server,
  Download,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Subtitles,
  Gauge
} from 'lucide-react';
import { Movie } from '../../types/movie';
import { useToast } from '../ui/useToast';

interface StreamingPlayerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const StreamingPlayerModal: React.FC<StreamingPlayerModalProps> = ({
  movie,
  onClose,
}) => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(movie?.audioTracks[0] || 'Hindi (Clean 5.1)');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English [CC]');
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const [prevMovieId, setPrevMovieId] = useState<string | undefined>(movie?.id);
  if (movie && movie.id !== prevMovieId) {
    setPrevMovieId(movie.id);
    setSelectedServerIndex(0);
    setSelectedAudio(movie.audioTracks[0] || 'Hindi (Clean 5.1)');
    setIsPlaying(true);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, togglePlay]);

  if (!movie) return null;

  const currentServer = movie.servers[selectedServerIndex] || movie.servers[0];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
    showToast(`Playback speed set to ${speed}x`, 'info');
  };

  const handleServerSwitch = (index: number) => {
    setSelectedServerIndex(index);
    showToast(`Switched stream to ${movie.servers[index].name}`, 'success');
  };

  const handleAudioSwitch = (audio: string) => {
    setSelectedAudio(audio);
    showToast(`Audio track switched to: ${audio}`, 'info');
  };

  const handleDownload = (quality: string) => {
    showToast(`Starting high-speed download for ${movie.title} [${quality}]`, 'success');
  };

  const handleReportIssue = () => {
    showToast(`Thank you! Issue on ${currentServer.name} reported to our CDN engineers.`, 'warning');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerContainerRef.current) {
      playerContainerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="font-bold text-white text-sm sm:text-base truncate font-heading">
              Now Streaming: {movie.title}
            </h3>
            {movie.hindiTitle && (
              <span className="text-xs text-red-400 font-medium hidden sm:inline">
                ({movie.hindiTitle})
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase ml-2 hidden md:inline">
              {currentServer.quality}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReportIssue}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-medium border border-amber-500/30 cursor-pointer"
              title="Report buffering or broken stream"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Server</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div
          ref={playerContainerRef}
          className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group select-none"
        >
          <video
            ref={videoRef}
            src={currentServer.videoUrl}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Subtitle Display Simulation */}
          {selectedSubtitle !== 'Off' && (
            <div className="absolute bottom-16 inset-x-0 text-center pointer-events-none px-4">
              <span className="inline-block px-3 py-1 rounded bg-black/80 text-yellow-300 text-sm md:text-base font-semibold backdrop-blur-xs shadow-lg">
                [{selectedSubtitle}] — English & Hindi Multi-Subtitles Active
              </span>
            </div>
          )}

          {/* Player Controls Overlay Bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 sm:p-4 transition-opacity duration-300 space-y-2 opacity-95 group-hover:opacity-100">
            {/* Timeline Scrubbing Bar */}
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-2 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white shadow transition-transform hover:scale-110 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                {/* Volume Controls */}
                <div className="flex items-center gap-1.5 group/vol">
                  <button onClick={toggleMute} className="p-1 text-zinc-300 hover:text-white">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Time Display */}
                <span className="text-[11px] sm:text-xs text-zinc-400 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Speed Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{playbackSpeed}x</span>
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-700 rounded-xl p-1 shadow-2xl z-30 text-xs">
                      {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSpeedChange(s)}
                          className={`w-full text-left px-3 py-1 rounded hover:bg-white/10 ${
                            playbackSpeed === s ? 'text-red-400 font-bold' : 'text-zinc-200'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subtitle Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
                    className="p-1.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs"
                    title="Subtitles"
                  >
                    <Subtitles className="w-4 h-4" />
                  </button>
                  {showSubtitlesMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-zinc-900 border border-zinc-700 rounded-xl p-1 shadow-2xl z-30 text-xs min-w-[130px]">
                      {['Off', 'English [CC]', 'Hindi Dubbed Sub', 'Urdu', 'Arabic'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            setSelectedSubtitle(sub);
                            setShowSubtitlesMenu(false);
                            showToast(`Subtitles: ${sub}`, 'info');
                          }}
                          className={`w-full text-left px-3 py-1 rounded hover:bg-white/10 ${
                            selectedSubtitle === sub ? 'text-red-400 font-bold' : 'text-zinc-200'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hindilinks4u Multi-Server Switching & Audio Panel */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 space-y-4">
          {/* Server Selector Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5" /> Select Streaming Server (Hindilinks4u Fast Switcher)
              </span>
              <span className="text-[11px] text-zinc-400">
                If buffering or audio lag occurs, switch servers below:
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {movie.servers.map((server, index) => {
                const isActive = selectedServerIndex === index;
                return (
                  <button
                    key={server.id}
                    onClick={() => handleServerSwitch(index)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-950/80 border-red-500 shadow-lg shadow-red-950/50 ring-1 ring-red-500'
                        : 'bg-zinc-800/70 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white line-clamp-1">
                        {server.name.split(':')[0]}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono">
                        {server.speed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                      <span>{server.quality}</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> {server.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Language Switcher & Direct Download Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
            {/* Audio Track Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-red-500" /> Audio Track Language
              </label>
              <div className="flex flex-wrap gap-2">
                {movie.audioTracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => handleAudioSwitch(track)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedAudio === track
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct 1-Click Download Buttons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1.5 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-emerald-400" /> Direct Cloud Download Links
              </label>
              <div className="flex flex-wrap gap-2">
                {movie.downloadLinks.map((dl) => (
                  <button
                    key={dl.quality}
                    onClick={() => handleDownload(dl.quality)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-emerald-950 hover:border-emerald-500 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-emerald-400" />
                    <span>{dl.quality}</span>
                    <span className="text-zinc-500 text-[10px]">({dl.size})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
