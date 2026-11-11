import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { SearchModal } from './components/navbar/SearchModal';
import { HeroBillboard } from './components/hero/HeroBillboard';
import { ChannelsHub } from './components/hero/ChannelsHub';
import { MovieRow } from './components/rows/MovieRow';
import { TopTenRow } from './components/rows/TopTenRow';
import { HindilinksCatalog } from './components/filters/HindilinksCatalog';
import { StreamingPlayerModal } from './components/player/StreamingPlayerModal';
import { MovieDetailModal } from './components/modals/MovieDetailModal';
import { XRayDrawer } from './components/modals/XRayDrawer';
import { LandingHero } from './components/landing/LandingHero';
import { FaqAccordion } from './components/landing/FaqAccordion';
import { PlanSelector } from './components/landing/PlanSelector';
import { ToastProvider } from './components/ui/Toast';
import { useToast } from './components/ui/useToast';
import { BollywoodPage } from './components/pages/BollywoodPage';
import { SouthDubbedPage } from './components/pages/SouthDubbedPage';
import { HollywoodPage } from './components/pages/HollywoodPage';
import { WebSeriesPage } from './components/pages/WebSeriesPage';
import { ChannelsPage } from './components/pages/ChannelsPage';
import { DownloadsPage } from './components/pages/DownloadsPage';
import { RequestPortalPage } from './components/pages/RequestPortalPage';
import { MOVIES } from './data/movies';
import { Movie } from './types/movie';
import { Film, Globe } from 'lucide-react';

function AppContent() {
  const [movies] = useState<Movie[]>(MOVIES);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Watchlist state with localStorage persistence
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinestream_watchlist');
      return saved ? JSON.parse(saved) : ['jawan-2023', 'mirzapur-s3'];
    } catch {
      return ['jawan-2023', 'mirzapur-s3'];
    }
  });

  // Modals & Drawers state
  const [activeMovieForPlayer, setActiveMovieForPlayer] = useState<Movie | null>(null);
  const [activeMovieForDetail, setActiveMovieForDetail] = useState<Movie | null>(null);
  const [activeMovieForXRay, setActiveMovieForXRay] = useState<Movie | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('cinestream_watchlist', JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  // Global Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const exists = prev.includes(movie.id);
      if (exists) {
        showToast(`Removed "${movie.title}" from My List`, 'info');
        return prev.filter((id) => id !== movie.id);
      } else {
        showToast(`Added "${movie.title}" to My List`, 'success');
        return [...prev, movie.id];
      }
    });
  };

  const heroMovie = movies[0]; // Jawan

  // Categorized Rows
  const bollywoodMovies = movies.filter((m) => m.category === 'bollywood');
  const southHindiMovies = movies.filter((m) => m.category === 'south-hindi');
  const hollywoodMovies = movies.filter((m) => m.category === 'hollywood');
  const primeMovies = movies.filter((m) => m.isPrime || m.category === 'prime-original');
  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlist.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        {viewMode === 'landing' ? (
          /* Netflix / Prime Public Landing Showcase Mode */
          <div className="space-y-4">
            <LandingHero onGetStarted={() => setViewMode('app')} />
            <TopTenRow
              movies={movies}
              onPlay={(m) => {
                setViewMode('app');
                setActiveMovieForPlayer(m);
              }}
              onMoreInfo={(m) => setActiveMovieForDetail(m)}
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
            <PlanSelector onPlanChosen={() => setViewMode('app')} />
            <FaqAccordion />
          </div>
        ) : (
          /* Full In-App Streaming Portal Mode */
          <div>
            {activeTab === 'home' && (
              <>
                {/* Hero Billboard */}
                <HeroBillboard
                  movie={heroMovie}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  isInWatchlist={watchlist.includes(heroMovie.id)}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Prime Channels Hub */}
                <ChannelsHub
                  onSelectChannel={(chId) => {
                    if (chId === 'hindilinks-vault') setActiveTab('hindilinks');
                    else if (chId === 'prime-originals') setActiveTab('channels');
                    else showToast(`Opening channel partner stream for: ${chId}`, 'info');
                  }}
                />

                {/* Top 10 Today Row */}
                <TopTenRow
                  movies={movies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Trending Bollywood Releases */}
                <MovieRow
                  title="Latest Bollywood & Pakistani Favorites"
                  subtitle="Shah Rukh Khan, Ranbir Kapoor, Atlee Hits in 4K"
                  movies={bollywoodMovies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* South Indian Blockbusters (Hindi Dubbed) */}
                <MovieRow
                  title="South Indian Mega Blockbusters in Hindi Dubbed"
                  subtitle="Pushpa 2, Salaar, K.G.F 2 with Multi-Audio 5.1"
                  movies={southHindiMovies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Amazon Prime Originals & Award Winners */}
                <MovieRow
                  title="Prime Video Exclusives & Originals"
                  subtitle="Mirzapur, The Boys, Panchayat with X-Ray support"
                  movies={primeMovies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Hollywood Hindi Dubbed (Dual Audio) */}
                <MovieRow
                  title="Hollywood Dual Audio (Hindi Dubbed + English Atmos)"
                  subtitle="Oppenheimer, Deadpool & Wolverine, Marvel Blockbusters"
                  movies={hollywoodMovies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Trending Web Series & TV Shows */}
                <MovieRow
                  title="Popular Web Series & Binge Shows"
                  subtitle="Mirzapur, The Boys, Panchayat, Stranger Things"
                  movies={movies.filter((m) => (m.seasons && m.seasons.length > 0) || m.category === 'prime-original' || m.category === 'netflix-original')}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />

                {/* Punjabi & Regional Blockbusters */}
                <MovieRow
                  title="Punjabi & Regional Comedy Blockbusters"
                  subtitle="Carry on Jatta 3, Gippy Grewal, Sonam Bajwa Hits"
                  movies={movies.filter((m) => m.category === 'punjabi')}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                  onOpenXRay={(m) => setActiveMovieForXRay(m)}
                  watchlist={watchlist}
                  onToggleWatchlist={toggleWatchlist}
                />
              </>
            )}

            {/* Dedicated Bollywood & Hindi Tab */}
            {activeTab === 'bollywood' && (
              <BollywoodPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            )}

            {/* Dedicated South Hindi Dubbed Tab */}
            {activeTab === 'south-hindi' && (
              <SouthDubbedPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            )}

            {/* Dedicated Hollywood Dual Audio Tab */}
            {activeTab === 'hollywood' && (
              <HollywoodPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            )}

            {/* Dedicated Web Series & TV Shows Tab */}
            {activeTab === 'series' && (
              <WebSeriesPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            )}

            {/* HindiLinks4u Power Matrix Tab */}
            {activeTab === 'hindilinks' && (
              <div className="pt-20">
                <HindilinksCatalog
                  movies={movies}
                  onPlay={(m) => setActiveMovieForPlayer(m)}
                  onMoreInfo={(m) => setActiveMovieForDetail(m)}
                />
              </div>
            )}

            {/* Prime Channels Tab */}
            {activeTab === 'channels' && (
              <ChannelsPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
              />
            )}

            {/* Cloud Downloads Hub Tab */}
            {activeTab === 'downloads' && (
              <DownloadsPage
                movies={movies}
                onPlay={(m) => setActiveMovieForPlayer(m)}
                onMoreInfo={(m) => setActiveMovieForDetail(m)}
              />
            )}

            {/* Request Movie & Report Server Tab */}
            {activeTab === 'request' && (
              <RequestPortalPage movies={movies} />
            )}

            {/* Watchlist Tab */}
            {activeTab === 'watchlist' && (
              <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white font-heading">
                      My Watchlist ({watchlistMovies.length})
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      Saved titles synchronized across your devices.
                    </p>
                  </div>
                  {watchlistMovies.length > 0 && (
                    <button
                      onClick={() => {
                        setWatchlist([]);
                        showToast('Watchlist cleared', 'info');
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {watchlistMovies.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <Film className="w-16 h-16 text-zinc-600 mx-auto" />
                    <h3 className="text-xl font-bold text-white">Your Watchlist is empty</h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto">
                      Explore our catalog of Bollywood, Prime Video, and Hollywood Hindi Dubbed titles and click the '+' button to bookmark them here.
                    </p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg"
                    >
                      Browse Movies Now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchlistMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className="group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-red-500 transition-all"
                      >
                        <div className="relative aspect-[16/9]">
                          <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <h4 className="font-bold text-white text-sm truncate">
                              {movie.title}
                            </h4>
                            <span className="text-[10px] text-zinc-400">{movie.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setActiveMovieForPlayer(movie)}
                              className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500"
                              title="Play"
                            >
                              <Film className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleWatchlist(movie)}
                              className="p-1.5 rounded-lg bg-zinc-800 text-red-400 hover:bg-zinc-700"
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Interactive Modals & Drawers */}
      {/* 1. Hindilinks4u Multi-Server Video Streaming Player */}
      <StreamingPlayerModal
        movie={activeMovieForPlayer}
        onClose={() => setActiveMovieForPlayer(null)}
      />

      {/* 2. Netflix Rich Movie Details Modal */}
      <MovieDetailModal
        movie={activeMovieForDetail}
        allMovies={movies}
        onClose={() => setActiveMovieForDetail(null)}
        onPlay={(m) => {
          setActiveMovieForDetail(null);
          setActiveMovieForPlayer(m);
        }}
        isInWatchlist={activeMovieForDetail ? watchlist.includes(activeMovieForDetail.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* 3. Amazon Prime Video X-Ray Drawer */}
      <XRayDrawer
        movie={activeMovieForXRay}
        onClose={() => setActiveMovieForXRay(null)}
      />

      {/* 4. Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        movies={movies}
        onSelectMovie={(m: Movie) => setActiveMovieForDetail(m)}
        onPlayMovie={(m: Movie) => setActiveMovieForPlayer(m)}
      />

      {/* Footer Section */}
      <footer className="border-t border-zinc-800/80 bg-[#07080b] py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-white text-base font-heading">
                CineStream Prime
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                v2.4 Pro
              </span>
            </div>

            <div className="flex items-center gap-6 text-zinc-400">
              <span className="hover:text-white cursor-pointer">Help Center</span>
              <span className="hover:text-white cursor-pointer">Terms of Use</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Corporate Information</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-zinc-400 pt-4 border-t border-zinc-900">
            <div>
              <p className="font-semibold text-zinc-300 mb-2">Streaming Engines</p>
              <ul className="space-y-1">
                <li>Server 1: SuperStream 4K</li>
                <li>Server 2: VidCloud CDN</li>
                <li>Server 3: HindStream Multi</li>
                <li>Server 4: FastCloud Backup</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-300 mb-2">Cinema Hubs</p>
              <ul className="space-y-1">
                <li>Bollywood Hindi Dubbed</li>
                <li>South Indian Telugu/Tamil</li>
                <li>Hollywood Dual Audio</li>
                <li>Punjabi Blockbusters</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-300 mb-2">Platform Features</p>
              <ul className="space-y-1">
                <li>Netflix Top 10 Today</li>
                <li>Prime Video X-Ray Scene</li>
                <li>Hindilinks4u Filter Matrix</li>
                <li>Offline 1-Click Downloads</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-zinc-300 mb-2">Supported Devices</p>
              <ul className="space-y-1">
                <li>Smart TVs & Android TV</li>
                <li>PlayStation & Xbox</li>
                <li>Apple iOS & Android Mobile</li>
                <li>Google Chrome & Web Browsers</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900 text-[11px] text-zinc-600">
            <p>© 2026 CineStream Prime. Hybrid clone of Netflix, Prime Video & HindiLinks4u. For demonstration & engineering evaluation.</p>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>English (Pakistan & Global)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
