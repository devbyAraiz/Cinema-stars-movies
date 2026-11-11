import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Crown, Film, Sparkles, Bookmark, Tv, Layers, Menu, X, ChevronDown, Check, Home, Download, Send } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  watchlistCount: number;
  viewMode: 'app' | 'landing';
  setViewMode: (mode: 'app' | 'landing') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  watchlistCount,
  viewMode,
  setViewMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  interface NavLinkItem {
    id: string;
    label: string;
    icon: any;
    highlight?: boolean;
  }

  const primaryNavLinks: NavLinkItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bollywood', label: 'Bollywood', icon: Sparkles },
    { id: 'south-hindi', label: 'South Dubbed', icon: Layers },
    { id: 'hollywood', label: 'Hollywood', icon: Tv },
    { id: 'series', label: 'Series', icon: Film },
    { id: 'hindilinks', label: '⚡ HindiLinks', icon: Sparkles, highlight: true },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { id: 'channels', label: 'Channels', icon: Crown },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'request', label: 'Request', icon: Send },
    { id: 'watchlist', label: `My List${watchlistCount > 0 ? ` (${watchlistCount})` : ''}`, icon: Bookmark },
  ];

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-2 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="cinestream-container flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => { setActiveTab('home'); setViewMode('app'); }}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-950/60 group-hover:shadow-red-600/40 transition-all group-hover:scale-105">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0b0c10] animate-pulse" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-heading">
                CINE<span className="text-red-500">STREAM</span>
                <span className="text-[9px] sm:text-[10px] font-bold ml-1 px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 align-middle">
                  PRIME
                </span>
              </span>
              <span className="hidden sm:block text-[8px] sm:text-[9px] text-zinc-400 tracking-widest uppercase font-medium mt-0.5">
                Netflix · Prime · HindiLinks
              </span>
            </div>
          </button>

          {/* Desktop Nav for XL / 2XL / 4K */}
          {viewMode === 'app' && (
            <nav className="hidden lg:flex items-center gap-0.5 ml-1 xl:ml-3">
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                        : link.highlight
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.id !== 'hindilinks' && <Icon className="w-3.5 h-3.5" />}
                    <span>{link.label}</span>
                  </button>
                );
              })}

              {/* Secondary links on 2XL+ screens, or More dropdown on LG/XL */}
              <div className="hidden 2xl:flex items-center gap-0.5">
                {secondaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 'More' dropdown on LG & XL screens */}
              <div className="relative 2xl:hidden" ref={moreRef}>
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1 text-zinc-400 hover:text-white hover:bg-white/5 ${
                    secondaryNavLinks.some((l) => l.id === activeTab) ? 'text-red-400 bg-white/5' : ''
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
                </button>

                {showMoreMenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-zinc-900/98 border border-zinc-700/80 shadow-2xl p-1 z-50 text-xs">
                    {secondaryNavLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeTab === link.id;
                      return (
                        <button
                          key={link.id}
                          onClick={() => { setActiveTab(link.id); setShowMoreMenu(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors ${
                            isActive ? 'bg-red-600 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{link.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-1 text-xs gap-1">
            <button
              onClick={() => setViewMode('app')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'app'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Stream
            </button>
            <button
              onClick={() => setViewMode('landing')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === 'landing'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Landing
            </button>
          </div>

          {/* Search Button */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-700/50 hover:border-zinc-500 text-zinc-400 hover:text-white text-xs transition-all hover:bg-zinc-800 group"
            title="Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
            <span className="hidden lg:inline text-zinc-500 group-hover:text-zinc-300">Search...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-zinc-800 rounded border border-zinc-700 text-zinc-500">
              Ctrl K
            </kbd>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              id="nav-notif-btn"
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
              className="relative p-2 rounded-xl bg-zinc-900/80 border border-zinc-700/50 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-zinc-900" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-zinc-900/98 border border-zinc-700/70 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 font-bold">2 New</span>
                </div>
                <div className="divide-y divide-zinc-800/50">
                  {[
                    { dot: 'bg-red-500', title: 'Mirzapur Season 3 Available', sub: 'Stream in 4K UHD with Dolby Atmos audio.', time: '10 mins ago' },
                    { dot: 'bg-sky-400', title: 'Deadpool & Wolverine Dubbed', sub: 'HQ Hindi Dubbed audio server updated.', time: '1 hour ago' },
                    { dot: 'bg-emerald-500', title: 'New South Blockbusters Added', sub: 'Kalki 2898 AD, Salaar 2 now streaming.', time: '3 hours ago' },
                  ].map((n, i) => (
                    <div key={i} className="p-4 flex items-start gap-3 hover:bg-zinc-800/30 transition-colors cursor-pointer">
                      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-xs font-semibold text-zinc-100">{n.title}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{n.sub}</p>
                        <span className="text-[10px] text-zinc-500 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              id="nav-profile-btn"
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-white/5 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-xl object-cover border-2 border-red-500/60 shadow-lg"
              />
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 hidden sm:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-zinc-900/98 border border-zinc-700/70 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 text-xs">
                <div className="p-4 border-b border-zinc-800">
                  <p className="font-bold text-white">Abubakar</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Check className="w-3 h-3" /> Premium 4K VIP Member
                  </p>
                </div>
                <div className="p-2 space-y-0.5">
                  <button
                    onClick={() => { setActiveTab('watchlist'); setViewMode('app'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 text-zinc-200 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2"><Bookmark className="w-3.5 h-3.5" /> My Watchlist</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{watchlistCount}</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('downloads'); setViewMode('app'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 text-zinc-200 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" /> Cloud Downloads Hub
                  </button>
                  <button
                    onClick={() => { setActiveTab('request'); setViewMode('app'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 text-zinc-200 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-red-400" /> Request Movie / Report
                  </button>
                  <button
                    onClick={() => { setActiveTab('hindilinks'); setViewMode('app'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-500/8 text-amber-400 flex items-center gap-2 transition-colors"
                  >
                    ⚡ HindiLinks VIP Matrix
                  </button>
                  <button
                    onClick={() => { setViewMode(viewMode === 'app' ? 'landing' : 'app'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 text-zinc-300 transition-colors"
                  >
                    Switch to {viewMode === 'app' ? 'Landing Page' : 'Streaming Portal'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-zinc-300 hover:text-white transition-all"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800/60 bg-zinc-950/98 backdrop-blur-2xl px-4 py-4 space-y-1.5 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-68px)] overflow-y-auto pb-10 shadow-2xl">
          {viewMode === 'app' && allNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                    : link.highlight
                    ? 'text-amber-400 hover:bg-amber-500/10'
                    : 'text-zinc-300 hover:bg-zinc-800/60'
                }`}
              >
                {link.id !== 'hindilinks' && <Icon className="w-4 h-4 shrink-0" />}
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="flex gap-2 pt-3 border-t border-zinc-800/80 mt-2">
            <button
              onClick={() => { setViewMode('app'); setIsMobileMenuOpen(false); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'app' ? 'bg-red-600 text-white shadow' : 'bg-zinc-800 text-zinc-300'}`}
            >
              Stream Portal
            </button>
            <button
              onClick={() => { setViewMode('landing'); setIsMobileMenuOpen(false); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${viewMode === 'landing' ? 'bg-red-600 text-white shadow' : 'bg-zinc-800 text-zinc-300'}`}
            >
              Landing Page
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
