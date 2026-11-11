import { ChannelHub } from '../types/movie';

export const CHANNELS: ChannelHub[] = [
  {
    id: 'prime-originals',
    name: 'Prime Originals',
    tagline: 'Amazon Original series & blockbuster films',
    logo: '👑',
    badge: 'INCLUDED WITH PRIME',
    bgGradient: 'from-sky-900/60 to-blue-950/80'
  },
  {
    id: 'netflix-specials',
    name: 'Netflix Picks',
    tagline: 'Only on Netflix & Global Phenomenons',
    logo: '🔴',
    badge: 'N ORIGINAL',
    bgGradient: 'from-red-950/60 to-black/80'
  },
  {
    id: 'hindilinks-vault',
    name: 'HindiLinks Vault',
    tagline: 'Bollywood & South Hindi Dubbed Uncut',
    logo: '⚡',
    badge: 'FREE ULTRA STREAM',
    bgGradient: 'from-amber-950/60 to-orange-950/80'
  },
  {
    id: 'lionsgate',
    name: 'Lionsgate Play',
    tagline: 'Hollywood action, drama and suspense',
    logo: '🦁',
    badge: 'CHANNEL ADD-ON',
    bgGradient: 'from-zinc-900 to-amber-950/40'
  },
  {
    id: 'discovery-plus',
    name: 'Discovery+',
    tagline: 'Real-life entertainment & nature wonders',
    logo: '🌍',
    badge: 'SUBSCRIBE',
    bgGradient: 'from-teal-950/60 to-emerald-950/70'
  },
  {
    id: 'anime-hub',
    name: 'Anime Prime',
    tagline: 'Hindi & English dubbed Japanese anime',
    logo: '⛩️',
    badge: 'TOP TRENDING',
    bgGradient: 'from-purple-950/60 to-indigo-950/80'
  }
];
