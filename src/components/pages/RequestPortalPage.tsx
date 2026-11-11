import React, { useState } from 'react';
import { Send, AlertTriangle, Film, CheckCircle2, Clock, Check, Sparkles } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useToast } from '../ui/useToast';

interface RequestPortalPageProps {
  movies: Movie[];
}

interface CommunityRequest {
  id: string;
  title: string;
  year: string;
  type: string;
  requestedBy: string;
  timeAgo: string;
  status: 'Completed' | 'In Progress' | 'Under Review';
}

export const RequestPortalPage: React.FC<RequestPortalPageProps> = ({ movies }) => {
  const { showToast } = useToast();

  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('2024');
  const [dubType, setDubType] = useState('Hindi Dubbed [5.1 Clean]');
  const [qualityPref, setQualityPref] = useState('4K UHD (HEVC 10-bit)');

  const [brokenMovieId, setBrokenMovieId] = useState(movies[0]?.id || '');
  const [brokenServer, setBrokenServer] = useState('Server 1: SuperStream');
  const [issueDetail, setIssueDetail] = useState('Audio is out of sync in second half');

  const [communityRequests, setCommunityRequests] = useState<CommunityRequest[]>([
    {
      id: 'req-1',
      title: 'Kalki 2898 AD (Hindi Dubbed)',
      year: '2024',
      type: 'Hindi Dubbed 5.1 Theatrical',
      requestedBy: 'Bilal Khan',
      timeAgo: '2 hours ago',
      status: 'Completed',
    },
    {
      id: 'req-2',
      title: 'Stree 2: Sarkate Ka Aatank',
      year: '2024',
      type: '4K Ultra HD Atmos',
      requestedBy: 'Rohit Verma',
      timeAgo: '5 hours ago',
      status: 'Completed',
    },
    {
      id: 'req-3',
      title: 'Devara: Part 1 (NTR Jr)',
      year: '2024',
      type: 'Telugu Original + Hindi Dubbed',
      requestedBy: 'Arjun R.',
      timeAgo: '1 day ago',
      status: 'In Progress',
    },
    {
      id: 'req-4',
      title: 'Gladiator II (Dual Audio)',
      year: '2024',
      type: 'IMAX Dual Audio [Hindi+Eng]',
      requestedBy: 'Hamza',
      timeAgo: '2 days ago',
      status: 'Under Review',
    },
  ]);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieTitle.trim()) {
      showToast('Please enter the movie or series title', 'warning');
      return;
    }

    const newReq: CommunityRequest = {
      id: `req-${communityRequests.length + 1}`,
      title: movieTitle.trim(),
      year: movieYear,
      type: `${dubType} (${qualityPref})`,
      requestedBy: 'You',
      timeAgo: 'Just now',
      status: 'In Progress',
    };

    setCommunityRequests([newReq, ...communityRequests]);
    showToast(`Request for "${movieTitle}" submitted! Our encoders will upload it within 24 hours.`, 'success');
    setMovieTitle('');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const movieObj = movies.find((m) => m.id === brokenMovieId);
    showToast(`Issue reported for ${movieObj?.title || 'Selected Title'} on ${brokenServer}. Team notified!`, 'success');
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-zinc-900 to-amber-950 border border-red-500/40 p-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Community Portal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading leading-tight">
            Request Titles & Report Streaming Servers
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Can’t find a specific Bollywood movie or South Hindi Dubbed release? Submit a request below or report any buffering or audio lag. Our community encoders resolve requests in under 24 hours.
          </p>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Request A Movie Form */}
        <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Film className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-white font-heading">
              Request a Movie or Hindi Dubbed Title
            </h3>
          </div>

          <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">
                Movie or Web Series Name *
              </label>
              <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="e.g. Kalki 2898 AD, Stree 2, KGF 3"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl p-3 focus:outline-none focus:border-red-500 placeholder-zinc-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Release Year</label>
                <select
                  value={movieYear}
                  onChange={(e) => setMovieYear(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-red-500"
                >
                  {['2025', '2024', '2023', '2022', 'Classic'].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Required Audio Dub</label>
                <select
                  value={dubType}
                  onChange={(e) => setDubType(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-red-500"
                >
                  <option value="Hindi Dubbed [5.1 Clean]">Hindi Dubbed Clean 5.1</option>
                  <option value="Dual Audio [Hindi + English]">Dual Audio [Hindi+Eng]</option>
                  <option value="Original Hindi">Original Hindi</option>
                  <option value="Multi-Audio [Tamil/Telugu/Hindi]">Multi-Audio Theatrical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Preferred Quality</label>
              <select
                value={qualityPref}
                onChange={(e) => setQualityPref(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-red-500"
              >
                <option value="4K UHD (HEVC 10-bit)">4K UHD 10-bit HEVC (Fastest CDN)</option>
                <option value="1080p FHD">1080p Full HD (~2.4 GB)</option>
                <option value="720p HD">720p Compact Fast (~950 MB)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/70 transition-all hover:scale-102 cursor-pointer mt-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Movie Request</span>
            </button>
          </form>
        </div>

        {/* Report Broken Link Form */}
        <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white font-heading">
              Report Broken Link or Buffering Server
            </h3>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Affected Movie / Show</label>
              <select
                value={brokenMovieId}
                onChange={(e) => setBrokenMovieId(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              >
                {movies.map((m) => (
                  <option key={m.id} value={m.id}>{m.title} ({m.releaseYear})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Streaming Server</label>
              <select
                value={brokenServer}
                onChange={(e) => setBrokenServer(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="Server 1: SuperStream">Server 1: SuperStream 4K</option>
                <option value="Server 2: VidCloud">Server 2: VidCloud CDN</option>
                <option value="Server 3: HindStream">Server 3: HindStream Dual</option>
                <option value="Server 4: FastCloud Backup">Server 4: FastCloud Backup</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Describe Issue</label>
              <textarea
                value={issueDetail}
                onChange={(e) => setIssueDetail(e.target.value)}
                rows={3}
                placeholder="e.g. Audio out of sync, video buffering at 45m, broken download mirror..."
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl p-3 focus:outline-none focus:border-amber-500 placeholder-zinc-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/70 transition-all hover:scale-102 cursor-pointer mt-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Report Server Issue</span>
            </button>
          </form>
        </div>
      </div>

      {/* Community Requests Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500" /> Recent Community Requests & Status
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">Average Resolution: 12 Hours</span>
        </div>

        <div className="divide-y divide-zinc-800/60 bg-zinc-900/80 rounded-2xl border border-zinc-800 overflow-hidden">
          {communityRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{req.title}</h4>
                  <span className="text-xs text-zinc-500">({req.year})</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-zinc-300 font-medium">{req.type}</span>
                  <span>•</span>
                  <span>By {req.requestedBy}</span>
                  <span>•</span>
                  <span className="text-zinc-500">{req.timeAgo}</span>
                </div>
              </div>

              <div className="shrink-0">
                {req.status === 'Completed' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available Now
                  </span>
                )}
                {req.status === 'In Progress' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> In Encoding
                  </span>
                )}
                {req.status === 'Under Review' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold">
                    Under Review
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
