export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  quality: string;
  resolution: string;
  supportedDevices: string[];
  simultaneousScreens: number;
  badge?: string;
  popular?: boolean;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is CineStream Prime?',
    answer: 'CineStream Prime is an all-in-one cinematic entertainment platform combining the vast Hollywood and international catalog of Netflix, the exclusive Originals and Channels of Amazon Prime Video, and the extensive South Indian, Bollywood, and Hindi Dubbed collection of HindiLinks4u with high-speed multi-server streaming.'
  },
  {
    id: 'faq-2',
    question: 'Are movies available in Hindi Dubbed and Dual Audio?',
    answer: 'Yes! Almost our entire Hollywood, South Indian, and anime catalog is provided with high-definition Hindi Dubbed audio (Clean 5.1 Stereo) as well as Original Dual Audio with multilingual subtitles.'
  },
  {
    id: 'faq-3',
    question: 'How does the Multi-Server streaming player work?',
    answer: 'Every movie and series episode is routed through 4 distributed ultra-fast CDN streaming servers (SuperStream, VidCloud, HindStream, and FastCDN). If one server is slow or experiencing buffering in your region, switch to another server with a single click without losing your playback timestamp.'
  },
  {
    id: 'faq-4',
    question: 'Can I download movies for offline viewing?',
    answer: 'Yes, CineStream Prime supports direct 1-click downloads in 480p, 720p, 1080p FHD, and 4K UHD with compressed file sizes for high-speed offline enjoyment.'
  },
  {
    id: 'faq-5',
    question: 'What devices can I stream on?',
    answer: 'Watch anywhere, anytime on an unlimited number of devices. Sign in with your CineStream account to watch instantly on web browsers, Smart TVs, Android/iOS smartphones, tablets, PlayStation, and Xbox consoles.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'mobile',
    name: 'Mobile Special',
    price: 'Rs 250',
    period: '/ month',
    quality: 'Good (480p SD)',
    resolution: '480p',
    supportedDevices: ['Mobile phone', 'Tablet'],
    simultaneousScreens: 1
  },
  {
    id: 'basic',
    name: 'Basic Stream',
    price: 'Rs 450',
    period: '/ month',
    quality: 'High (720p HD)',
    resolution: '720p',
    supportedDevices: ['Phone', 'Tablet', 'Laptop', 'TV'],
    simultaneousScreens: 1
  },
  {
    id: 'standard',
    name: 'Standard HD',
    price: 'Rs 800',
    period: '/ month',
    quality: 'Great (1080p FHD)',
    resolution: '1080p',
    supportedDevices: ['Phone', 'Tablet', 'Laptop', 'TV'],
    simultaneousScreens: 2,
    popular: true,
    badge: 'MOST POPULAR'
  },
  {
    id: 'premium',
    name: 'Premium 4K + HDR',
    price: 'Rs 1,100',
    period: '/ month',
    quality: 'Best (4K UHD + Dolby Atmos)',
    resolution: '4K Ultra HD + HDR10',
    supportedDevices: ['Phone', 'Tablet', 'Laptop', 'TV', 'PlayStation'],
    simultaneousScreens: 4,
    badge: 'ULTIMATE'
  }
];
