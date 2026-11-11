import React, { useState } from 'react';
import { X, Crown, Music, Users, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Movie } from '../../types/movie';

interface XRayDrawerProps {
  movie: Movie | null;
  onClose: () => void;
}

export const XRayDrawer: React.FC<XRayDrawerProps> = ({ movie, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cast' | 'music' | 'trivia'>('cast');

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm font-heading flex items-center gap-1.5">
                  Prime Video X-Ray <span className="text-[10px] text-sky-400 font-normal">Live Scene</span>
                </h3>
                <p className="text-[11px] text-zinc-400 truncate max-w-[240px]">
                  {movie.title}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 border-b border-zinc-800 bg-zinc-900/60 text-xs">
            <button
              onClick={() => setActiveTab('cast')}
              className={`py-2.5 font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'cast'
                  ? 'border-sky-500 text-sky-400 bg-sky-950/20'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Cast & Crew</span>
            </button>

            <button
              onClick={() => setActiveTab('music')}
              className={`py-2.5 font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'music'
                  ? 'border-sky-500 text-sky-400 bg-sky-950/20'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Music</span>
            </button>

            <button
              onClick={() => setActiveTab('trivia')}
              className={`py-2.5 font-bold flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'trivia'
                  ? 'border-sky-500 text-sky-400 bg-sky-950/20'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Trivia</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'cast' && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Cast in Current Title
                </div>
                {movie.cast.map((actor) => (
                  <div
                    key={actor.name}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-sky-500/50 transition-all"
                  >
                    <img
                      src={actor.avatarUrl}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        {actor.name}
                      </h4>
                      <p className="text-xs text-sky-400 truncate">as {actor.role}</p>
                    </div>
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(actor.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-zinc-400 hover:text-white"
                      title="View Biography"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'music' && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Featured Songs & Score
                </div>
                {movie.soundtracks && movie.soundtracks.length > 0 ? (
                  movie.soundtracks.map((track, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
                          <Music className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-xs">{track.title}</h5>
                          <p className="text-[11px] text-zinc-400">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        Official Track
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    Original cinematic soundtrack composed for theatrical release.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trivia' && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Behind The Scenes & Trivia
                </div>
                {movie.trivia && movie.trivia.length > 0 ? (
                  movie.trivia.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5" /> Did you know?
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{fact}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    Trivia records and easter eggs being synchronized for this title.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
