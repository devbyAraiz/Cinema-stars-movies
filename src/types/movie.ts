export type MovieCategory = 
  | 'bollywood'
  | 'hollywood'
  | 'south-hindi'
  | 'web-series'
  | 'punjabi'
  | 'prime-original'
  | 'netflix-original';

export interface CastMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface StreamingServer {
  id: string;
  name: string;
  quality: string;
  speed: string; // e.g. "15ms", "Ultra Fast"
  status: 'Online' | 'Ultra HD' | 'Backup';
  embedUrl: string;
  videoUrl: string; // working sample video stream
}

export interface Episode {
  id: string;
  epNumber: number;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface DownloadLink {
  quality: '480p' | '720p' | '1080p' | '4K HDR';
  size: string;
  format: string;
  url: string;
}

export interface Movie {
  id: string;
  title: string;
  hindiTitle?: string;
  synopsis: string;
  backdropUrl: string;
  posterUrl: string;
  rating: string; // "18+", "16+", "PG-13", "U/A"
  imdbRating: number;
  duration: string;
  releaseYear: number;
  genres: string[];
  category: MovieCategory;
  audioTracks: string[]; // ["Hindi (Clean 5.1)", "English (Original)", "Dual Audio", "Tamil Dubbed"]
  subtitles: string[];
  videoQuality: '4K UHD' | '1080p FHD' | '720p HD';
  tags: string[]; // ["Top 10", "Trending", "Prime Exclusive", "Hindi Dubbed", "Dolby Vision"]
  isTopTen?: number; // 1 to 10
  isPrime?: boolean;
  isNetflixOriginal?: boolean;
  isHindiDubbed?: boolean;
  director: string;
  cast: CastMember[];
  servers: StreamingServer[];
  downloadLinks: DownloadLink[];
  trailerUrl: string;
  videoStreamUrl: string;
  seasons?: Season[];
  trivia?: string[];
  soundtracks?: { title: string; artist: string }[];
}

export interface ChannelHub {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  badge: string;
  bgGradient: string;
}
