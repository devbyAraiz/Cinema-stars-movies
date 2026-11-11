import React, { useState } from 'react';
import { Download, Copy, Play, ArrowDownToLine, HardDrive, Check, Pause } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useToast } from '../ui/useToast';

interface DownloadsPageProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

interface ActiveDownload {
  id: string;
  movieTitle: string;
  quality: string;
  size: string;
  progress: number;
  speed: string;
  isPaused: boolean;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({
  movies,
  onPlay,
}) => {
  const { showToast } = useToast();
  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>([
    {
      id: 'dl-1',
      movieTitle: 'Jawan (2023)',
      quality: '4K HDR [HEVC 10-bit]',
      size: '6.8 GB',
      progress: 68,
      speed: '54.2 MB/s',
      isPaused: false,
    },
    {
      id: 'dl-2',
      movieTitle: 'Oppenheimer',
      quality: '1080p [Dual Audio 5.1]',
      size: '2.8 GB',
      progress: 92,
      speed: '41.0 MB/s',
      isPaused: false,
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleStartDownload = (movie: Movie, quality: string, size: string) => {
    const existing = activeDownloads.find((d) => d.movieTitle.includes(movie.title) && d.quality.includes(quality));
    if (existing) {
      showToast(`Download for ${movie.title} is already active!`, 'info');
      return;
    }
    const newDl: ActiveDownload = {
      id: `${movie.id}-${quality.replace(/\s+/g, '-').toLowerCase()}-${activeDownloads.length + 1}`,
      movieTitle: movie.title,
      quality,
      size,
      progress: 5,
      speed: '48.5 MB/s',
      isPaused: false,
    };
    setActiveDownloads((prev) => [newDl, ...prev]);
    showToast(`Started high-speed download: ${movie.title} [${quality}]`, 'success');
  };

  const handleCopyLink = (urlId: string, title: string) => {
    navigator.clipboard?.writeText(`https://cdn.cinestreamprime.net/download/vip/${urlId}.mkv`);
    setCopiedId(urlId);
    showToast(`High-speed cloud download link copied for ${title}`, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const togglePause = (id: string) => {
    setActiveDownloads((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isPaused: !d.isPaused } : d))
    );
  };

  const removeDownload = (id: string) => {
    setActiveDownloads((prev) => prev.filter((d) => d.id !== id));
    showToast('Download removed from queue', 'info');
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-zinc-900 to-teal-950 border border-emerald-500/40 p-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Download className="w-3.5 h-3.5" /> Moviesmov & HindiLinks Direct Cloud Engine
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
            High-Speed 1-Click Cloud Downloads
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Download your favorite Bollywood releases, South Hindi Dubbed mega blockbusters, and Hollywood 4K Dual Audio with multi-threaded high-speed mirrors and zero ads.
          </p>
        </div>
      </div>

      {/* Live Download Manager Queue */}
      {activeDownloads.length > 0 && (
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Active High-Speed Download Queue ({activeDownloads.length})
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Total CDN Speed: ~95 MB/s</span>
          </div>

          <div className="space-y-3">
            {activeDownloads.map((dl) => (
              <div
                key={dl.id}
                className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{dl.movieTitle}</h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="text-emerald-400 font-medium">{dl.quality}</span>
                      <span>•</span>
                      <span>{dl.size}</span>
                      <span>•</span>
                      <span className="font-mono text-zinc-300">{dl.isPaused ? 'PAUSED' : dl.speed}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Progress:</span>
                    <span className="text-emerald-400 font-bold">{dl.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${dl.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePause(dl.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                    title={dl.isPaused ? 'Resume' : 'Pause'}
                  >
                    {dl.isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => removeDownload(dl.id)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-red-950/80 hover:text-red-400 text-zinc-400 text-xs transition-colors"
                    title="Cancel Download"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Titles Download Catalog */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-heading">
          Available Cloud Downloads (Fast Direct Mirrors)
        </h3>

        <div className="space-y-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-14 h-20 rounded-xl object-cover shrink-0 border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base truncate">{movie.title}</h4>
                    {movie.isHindiDubbed && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-black">
                        HINDI DUBBED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">★ {movie.imdbRating}</span>
                    <span>•</span>
                    <span className="text-zinc-300">{movie.audioTracks[0]}</span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-1">{movie.synopsis}</p>
                </div>
              </div>

              {/* Download Buttons for this title */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
                {movie.downloadLinks.map((dl) => (
                  <div key={dl.quality} className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartDownload(movie, dl.quality, dl.size)}
                      className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-emerald-950 hover:border-emerald-500/60 border border-zinc-700 text-zinc-200 hover:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{dl.quality}</span>
                      <span className="text-zinc-500 text-[10px]">({dl.size})</span>
                    </button>
                    <button
                      onClick={() => handleCopyLink(`${movie.id}-${dl.quality}`, movie.title)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      title="Copy Direct Link"
                    >
                      {copiedId === `${movie.id}-${dl.quality}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => onPlay(movie)}
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all ml-1"
                  title="Stream Directly"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
