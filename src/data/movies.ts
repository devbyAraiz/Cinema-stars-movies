import { Movie } from '../types/movie';

// High-reliability public domain MP4 streams for authentic player testing
const SAMPLE_STREAM_1 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const SAMPLE_STREAM_2 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
const SAMPLE_STREAM_3 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
const SAMPLE_STREAM_4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';

export const MOVIES: Movie[] = [
  {
    id: 'jawan-2023',
    title: 'Jawan',
    hindiTitle: 'जवान',
    synopsis: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society, backed by a band of courageous women fighters.',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    rating: 'U/A 16+',
    imdbRating: 8.1,
    duration: '2h 49m',
    releaseYear: 2023,
    genres: ['Action', 'Thriller', 'Drama'],
    category: 'bollywood',
    audioTracks: ['Hindi (Clean 5.1 Original)', 'Tamil Dubbed', 'Telugu Dubbed', 'Dual Audio [Hindi+Eng]'],
    subtitles: ['English [CC]', 'Hindi', 'Arabic', 'Urdu'],
    videoQuality: '4K UHD',
    tags: ['#1 in Pakistan Today', 'Blockbuster', 'Atlee Action', 'Dolby Atmos'],
    isTopTen: 1,
    isHindiDubbed: false,
    director: 'Atlee Kumar',
    cast: [
      { name: 'Shah Rukh Khan', role: 'Vikram Rathore / Azad', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Nayanthara', role: 'Narmada Rai', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Vijay Sethupathi', role: 'Kalee Gaikwad', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Deepika Padukone', role: 'Aishwarya (Special Appearance)', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream (Fastest 4K)', quality: '4K HDR', speed: '16ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_3 },
      { id: 'srv-2', name: 'Server 2: VidCloud CDN (1080p)', quality: '1080p FHD', speed: '28ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_1 },
      { id: 'srv-3', name: 'Server 3: HindStream Dual Audio', quality: '1080p Multi', speed: '22ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_2 },
      { id: 'srv-4', name: 'Server 4: FastCloud Backup', quality: '720p HD', speed: '41ms', status: 'Backup', embedUrl: '', videoUrl: SAMPLE_STREAM_4 }
    ],
    downloadLinks: [
      { quality: '4K HDR', size: '6.8 GB', format: 'MKV HEVC 10-bit', url: '#' },
      { quality: '1080p', size: '2.4 GB', format: 'MP4 x264', url: '#' },
      { quality: '720p', size: '1.1 GB', format: 'MP4 Fast', url: '#' },
      { quality: '480p', size: '480 MB', format: 'Mobile 3GP/MP4', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_3,
    videoStreamUrl: SAMPLE_STREAM_3,
    trivia: [
      'Shah Rukh Khan plays a dual role as father and son.',
      'Marked director Atlee Kumar’s debut in Hindi cinema.',
      'Achieved historic record opening day collections worldwide.'
    ],
    soundtracks: [
      { title: 'Zinda Banda', artist: 'Anirudh Ravichander' },
      { title: 'Chaleya', artist: 'Arijit Singh, Shilpa Rao' },
      { title: 'Not Ramaiya Vastavaiya', artist: 'Vishal Dadlani' }
    ]
  },
  {
    id: 'oppenheimer-2023',
    title: 'Oppenheimer',
    hindiTitle: 'ओपेनहाइमर (हिंदी डब)',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 8.9,
    duration: '3h 00m',
    releaseYear: 2023,
    genres: ['Biography', 'Drama', 'History', 'Thriller'],
    category: 'hollywood',
    audioTracks: ['Hindi Dubbed (HQ Clean 5.1)', 'English [Original Dolby Atmos]', 'Dual Audio [Hindi + Eng]'],
    subtitles: ['English [CC]', 'Hindi Dubbed Sub', 'Urdu', 'Spanish'],
    videoQuality: '4K UHD',
    tags: ['Oscar Winner', 'Hindi Dubbed', 'Christopher Nolan', 'IMAX Enhanced'],
    isTopTen: 2,
    isHindiDubbed: true,
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream (4K IMAX)', quality: '4K UHD', speed: '14ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_1 },
      { id: 'srv-2', name: 'Server 2: VidCloud Hindi Dubbed', quality: '1080p FHD', speed: '25ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_2 }
    ],
    downloadLinks: [
      { quality: '4K HDR', size: '7.9 GB', format: 'MKV 10-bit Dolby Vision', url: '#' },
      { quality: '1080p', size: '2.8 GB', format: 'Dual Audio x264', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_1,
    videoStreamUrl: SAMPLE_STREAM_1,
    trivia: [
      'Filmed with large-format IMAX cameras and real practical pyrotechnic effects.',
      'Won 7 Academy Awards including Best Picture, Director, and Actor.'
    ],
    soundtracks: [
      { title: 'Can You Hear The Music', artist: 'Ludwig Göransson' },
      { title: 'Oppenheimer', artist: 'Ludwig Göransson' }
    ]
  },
  {
    id: 'mirzapur-s3',
    title: 'Mirzapur: Season 3',
    hindiTitle: 'मिर्जापुर सीजन 3',
    synopsis: 'With Akhandanand Tripathi recovering in secrecy and Guddu Pandit claiming the throne of Purvanchal, new rivalries ignite across the badlands.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 8.5,
    duration: '3 Seasons • 10 Episodes',
    releaseYear: 2024,
    genres: ['Crime', 'Action', 'Drama', 'Thriller'],
    category: 'prime-original',
    audioTracks: ['Hindi (Original Atmos)', 'English Dubbed', 'Tamil', 'Telugu'],
    subtitles: ['English', 'Hindi', 'Arabic'],
    videoQuality: '4K UHD',
    tags: ['Amazon Original', 'Prime Exclusive', 'Trending #1 Series', 'Uncensored'],
    isTopTen: 3,
    isPrime: true,
    isHindiDubbed: false,
    director: 'Gurmmeet Singh & Anand Iyer',
    cast: [
      { name: 'Pankaj Tripathi', role: 'Kaleen Bhaiya', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Ali Fazal', role: 'Guddu Pandit', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Shweta Tripathi', role: 'Golu Gupta', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: Prime Video CDN', quality: '4K UHD', speed: '12ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_2 },
      { id: 'srv-2', name: 'Server 2: HindStream Fast', quality: '1080p FHD', speed: '21ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_3 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '1.2 GB / ep', format: 'MKV 5.1', url: '#' },
      { quality: '720p', size: '550 MB / ep', format: 'MP4 Web-DL', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_2,
    videoStreamUrl: SAMPLE_STREAM_2,
    seasons: [
      {
        seasonNumber: 3,
        title: 'Season 3: The War for Purvanchal',
        episodes: [
          { id: 'mzp-3-1', epNumber: 1, title: 'Episode 1: Tetar Ke Do Aage Tetar', duration: '56m', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80', description: 'Guddu takes absolute control over the carpet business while Sharad Shukla consolidates his alliance.' },
          { id: 'mzp-3-2', epNumber: 2, title: 'Episode 2: Gaddi Aur Ghoda', duration: '52m', thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', description: 'New political pressures in Lucknow force a crackdown on lawless territories.' },
          { id: 'mzp-3-3', epNumber: 3, title: 'Episode 3: Shauk-e-Hukumat', duration: '59m', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', description: 'Kaleen Bhaiya re-emerges with an unexpected proclamation that rattles the cartel.' }
        ]
      }
    ],
    trivia: [
      'Pankaj Tripathi improvised several of Kaleen Bhaiya’s most famous stoic pauses and neck gestures.',
      'Mirzapur remains Amazon Prime Video’s most streamed Indian show.'
    ],
    soundtracks: [
      { title: 'Mirzapur Theme Title', artist: 'John Stewart Eduri' },
      { title: 'Varanda', artist: 'Anand Bhaskar Collective' }
    ]
  },
  {
    id: 'salaar-2024',
    title: 'Salaar: Part 1 - Ceasefire',
    hindiTitle: 'सालार: पार्ट 1 (हिंदी डब)',
    synopsis: 'A gang leader makes a promise to a dying friend and takes on other criminal gangs in the dystopian fortified city-state of Khansaar.',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 7.8,
    duration: '2h 55m',
    releaseYear: 2024,
    genres: ['Action', 'Crime', 'Drama'],
    category: 'south-hindi',
    audioTracks: ['Hindi Dubbed (Original Theatrical Mix)', 'Telugu [Original 5.1]', 'Tamil Dubbed', 'Kannada'],
    subtitles: ['English [CC]', 'Hindi', 'Arabic'],
    videoQuality: '4K UHD',
    tags: ['South Blockbuster', 'Hindi Dubbed', 'Prabhas', 'KGF Universe Style'],
    isTopTen: 4,
    isHindiDubbed: true,
    director: 'Prashanth Neel',
    cast: [
      { name: 'Prabhas', role: 'Deva / Salaar', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Prithviraj Sukumaran', role: 'Varadharaja Mannaar', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Shruti Haasan', role: 'Aadhya', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream 4K Hindi', quality: '4K UHD', speed: '19ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_4 },
      { id: 'srv-2', name: 'Server 2: HindStream Dual Audio', quality: '1080p FHD', speed: '24ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_1 }
    ],
    downloadLinks: [
      { quality: '4K HDR', size: '5.9 GB', format: 'MKV Hindi 5.1', url: '#' },
      { quality: '1080p', size: '2.1 GB', format: 'Dual Audio', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_4,
    videoStreamUrl: SAMPLE_STREAM_4,
    trivia: [
      'Directed by Prashanth Neel, who also directed K.G.F Chapters 1 and 2.',
      'Grossed over 700 Crores worldwide at the box office.'
    ]
  },
  {
    id: 'the-boys-s4',
    title: 'The Boys: Season 4',
    hindiTitle: 'द बॉयज़ सीजन 4 (हिंदी डब)',
    synopsis: 'Victoria Neuman is closer than ever to the Oval Office and under the muscled thumb of Homelander, who is consolidating his supreme power.',
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 8.7,
    duration: '4 Seasons • 8 Episodes',
    releaseYear: 2024,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    category: 'prime-original',
    audioTracks: ['Hindi Dubbed [5.1 Clean]', 'English [Original Dolby Atmos]', 'Dual Audio [Hindi+Eng]'],
    subtitles: ['English [CC]', 'Hindi', 'Spanish', 'French'],
    videoQuality: '4K UHD',
    tags: ['Prime Exclusive', 'X-Ray Available', 'Hindi Dubbed', 'Top 10 Global'],
    isTopTen: 5,
    isPrime: true,
    isHindiDubbed: true,
    director: 'Eric Kripke',
    cast: [
      { name: 'Karl Urban', role: 'Billy Butcher', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Antony Starr', role: 'Homelander', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Jack Quaid', role: 'Hughie Campbell', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: Prime Video CDN', quality: '4K HDR', speed: '11ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_1 },
      { id: 'srv-2', name: 'Server 2: VidCloud Dual Audio', quality: '1080p FHD', speed: '22ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_3 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '1.4 GB / ep', format: 'MKV Dual Audio', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_1,
    videoStreamUrl: SAMPLE_STREAM_1,
    seasons: [
      {
        seasonNumber: 4,
        title: 'Season 4: Reckoning',
        episodes: [
          { id: 'tb-4-1', epNumber: 1, title: 'Department of Dirty Tricks', duration: '58m', thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', description: 'Butcher races against his ticking clock to find a virus capable of leveling supes.' }
        ]
      }
    ],
    trivia: [
      'Antony Starr learned subtle micro-facial ticks to convey Homelander’s mental deterioration.',
      'The series features Prime Video’s most advanced X-Ray cast tracking.'
    ]
  },
  {
    id: 'animal-2023',
    title: 'Animal',
    hindiTitle: 'एनिमल',
    synopsis: 'A son undergoes a remarkable transformation as the bond with his estranged father begins to fracture, spiraling into a brutal saga of vengeance.',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 7.2,
    duration: '3h 24m',
    releaseYear: 2023,
    genres: ['Action', 'Crime', 'Drama'],
    category: 'bollywood',
    audioTracks: ['Hindi [Original 5.1]', 'Telugu Dubbed', 'Tamil Dubbed'],
    subtitles: ['English [CC]', 'Hindi', 'Urdu'],
    videoQuality: '4K UHD',
    tags: ['Blockbuster', 'Ranbir Kapoor', 'Uncut Extended Edition', 'Trending'],
    isTopTen: 6,
    director: 'Sandeep Reddy Vanga',
    cast: [
      { name: 'Ranbir Kapoor', role: 'Ranvijay Singh', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Anil Kapoor', role: 'Balbir Singh', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Bobby Deol', role: 'Abrar Haque', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream 4K', quality: '4K UHD', speed: '17ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_2 }
    ],
    downloadLinks: [
      { quality: '4K HDR', size: '7.4 GB', format: 'MKV Extended Uncut', url: '#' },
      { quality: '1080p', size: '2.6 GB', format: 'MP4 x264', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_2,
    videoStreamUrl: SAMPLE_STREAM_2,
    soundtracks: [
      { title: 'Arjan Vailly', artist: 'Bhupinder Babbal' },
      { title: 'Satranga', artist: 'Arijit Singh' },
      { title: 'Jamal Kudu', artist: 'Harshavardhan Rameshwar' }
    ]
  },
  {
    id: 'panchayat-s3',
    title: 'Panchayat: Season 3',
    hindiTitle: 'पंचायत सीजन 3',
    synopsis: 'Abhishek Tripathi navigates village politics, local romance, and fierce rural rivalries in Phulera as election season heats up.',
    backdropUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    rating: 'U/A 13+',
    imdbRating: 9.0,
    duration: '3 Seasons • 8 Episodes',
    releaseYear: 2024,
    genres: ['Comedy', 'Drama'],
    category: 'prime-original',
    audioTracks: ['Hindi [Original]', 'English Subtitles'],
    subtitles: ['English', 'Hindi'],
    videoQuality: '1080p FHD',
    tags: ['Prime Video Hit', 'Highest Rated TVF Series', 'Family Comedy'],
    isTopTen: 7,
    isPrime: true,
    director: 'Deepak Kumar Mishra',
    cast: [
      { name: 'Jitendra Kumar', role: 'Sachiv Ji (Abhishek)', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Raghubir Yadav', role: 'Pradhan Ji', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Neena Gupta', role: 'Manju Devi', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: Prime Video Super CDN', quality: '1080p FHD', speed: '12ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_3 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '850 MB / ep', format: 'MP4 1080p', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_3,
    videoStreamUrl: SAMPLE_STREAM_3
  },
  {
    id: 'stranger-things-s4',
    title: 'Stranger Things',
    hindiTitle: 'स्ट्रेंजर थिंग्स (हिंदी डब)',
    synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    rating: '16+',
    imdbRating: 8.7,
    duration: '4 Seasons • 34 Episodes',
    releaseYear: 2022,
    genres: ['Sci-Fi', 'Horror', 'Drama', 'Fantasy'],
    category: 'netflix-original',
    audioTracks: ['Hindi Dubbed [Clean 5.1]', 'English [Original Atmos]', 'Dual Audio [Hindi+Eng]'],
    subtitles: ['English [CC]', 'Hindi', 'Urdu', 'Arabic'],
    videoQuality: '4K UHD',
    tags: ['Netflix Original', 'Global Phenomenon', 'Hindi Dubbed', 'Dolby Vision'],
    isTopTen: 8,
    isNetflixOriginal: true,
    isHindiDubbed: true,
    director: 'The Duffer Brothers',
    cast: [
      { name: 'Millie Bobby Brown', role: 'Eleven', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'David Harbour', role: 'Jim Hopper', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Finn Wolfhard', role: 'Mike Wheeler', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream 4K', quality: '4K UHD', speed: '14ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_4 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '1.5 GB / ep', format: 'MKV Dual Audio', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_4,
    videoStreamUrl: SAMPLE_STREAM_4
  },
  {
    id: 'pushpa-2',
    title: 'Pushpa 2: The Rule',
    hindiTitle: 'पुष्पा 2: द रूल (हिंदी डब)',
    synopsis: 'The clash between Pushpa Raj and Bhanwar Singh Shekhawat escalates into an all-out warfare across state borders and global red sandalwood syndicates.',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 8.6,
    duration: '3h 10m',
    releaseYear: 2024,
    genres: ['Action', 'Thriller', 'Crime'],
    category: 'south-hindi',
    audioTracks: ['Hindi Dubbed [Official Theatrical]', 'Telugu [Original]', 'Tamil', 'Malayalam'],
    subtitles: ['English', 'Hindi', 'Urdu'],
    videoQuality: '4K UHD',
    tags: ['Allu Arjun Fever', 'South Hindi Dubbed', '4K HDR', 'Top 10'],
    isTopTen: 9,
    isHindiDubbed: true,
    director: 'Sukumar',
    cast: [
      { name: 'Allu Arjun', role: 'Pushpa Raj', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Fahadh Faasil', role: 'Bhanwar Singh Shekhawat', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Rashmika Mandanna', role: 'Srivalli', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream 4K Hindi', quality: '4K UHD', speed: '15ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_1 }
    ],
    downloadLinks: [
      { quality: '4K HDR', size: '7.2 GB', format: 'MKV Hindi 5.1', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_1,
    videoStreamUrl: SAMPLE_STREAM_1
  },
  {
    id: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    hindiTitle: 'डेडपूल और वूल्वरिन (हिंदी डब)',
    synopsis: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary behind him. But when an existential threat arises, he must suit up with Wolverine.',
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80',
    rating: '18+',
    imdbRating: 8.0,
    duration: '2h 08m',
    releaseYear: 2024,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    category: 'hollywood',
    audioTracks: ['Hindi Dubbed [Clean Audio]', 'English [Original Dolby Atmos]', 'Dual Audio [Hindi+Eng]'],
    subtitles: ['English [CC]', 'Hindi', 'Spanish'],
    videoQuality: '4K UHD',
    tags: ['Marvel MCU', 'Hindi Dubbed', 'Superhit', 'Dual Audio'],
    isTopTen: 10,
    isHindiDubbed: true,
    director: 'Shawn Levy',
    cast: [
      { name: 'Ryan Reynolds', role: 'Wade Wilson / Deadpool', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Hugh Jackman', role: 'Logan / Wolverine', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream 4K Hindi', quality: '4K UHD', speed: '16ms', status: 'Ultra HD', embedUrl: '', videoUrl: SAMPLE_STREAM_2 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '2.4 GB', format: 'Dual Audio x264', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_2,
    videoStreamUrl: SAMPLE_STREAM_2
  },
  {
    id: 'dunki-2023',
    title: 'Dunki',
    hindiTitle: 'डंकी',
    synopsis: 'Four friends from a village in Punjab share a common dream: to go to England. Their journey takes them through dangerous and hilarious undocumented routes.',
    backdropUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    rating: 'U/A 13+',
    imdbRating: 7.0,
    duration: '2h 41m',
    releaseYear: 2023,
    genres: ['Comedy', 'Drama'],
    category: 'bollywood',
    audioTracks: ['Hindi [Original 5.1]', 'English Subtitles'],
    subtitles: ['English', 'Hindi', 'Urdu'],
    videoQuality: '1080p FHD',
    tags: ['Rajkumar Hirani', 'Shah Rukh Khan', 'Heartwarming Drama'],
    director: 'Rajkumar Hirani',
    cast: [
      { name: 'Shah Rukh Khan', role: 'Hardayal "Hardy" Singh', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Taapsee Pannu', role: 'Manu', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Vicky Kaushal', role: 'Sukhi', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream', quality: '1080p FHD', speed: '20ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_3 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '2.1 GB', format: 'MP4 1080p', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_3,
    videoStreamUrl: SAMPLE_STREAM_3
  },
  {
    id: 'carry-on-jatta-3',
    title: 'Carry on Jatta 3',
    hindiTitle: 'कैरी ऑन जट्टा 3 (पंजाबी & हिंदी)',
    synopsis: 'Advocate Dhillon’s son falls in love with a girl whose uncle is an enemy of Dhillon. Endless confusion and comedy ensue.',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    rating: 'U',
    imdbRating: 7.4,
    duration: '2h 18m',
    releaseYear: 2023,
    genres: ['Comedy', 'Romance'],
    category: 'punjabi',
    audioTracks: ['Punjabi [Original]', 'Hindi Dubbed [HQ]'],
    subtitles: ['English', 'Hindi'],
    videoQuality: '1080p FHD',
    tags: ['Punjabi Blockbuster', 'All-Time Record Breaker', 'Family Comedy'],
    director: 'Smeep Kang',
    cast: [
      { name: 'Gippy Grewal', role: 'Jass', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sonam Bajwa', role: 'Meet', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Binnu Dhillon', role: 'Goldy', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    servers: [
      { id: 'srv-1', name: 'Server 1: SuperStream Punjabi', quality: '1080p FHD', speed: '24ms', status: 'Online', embedUrl: '', videoUrl: SAMPLE_STREAM_4 }
    ],
    downloadLinks: [
      { quality: '1080p', size: '1.9 GB', format: 'MP4 Punjabi+Hindi', url: '#' }
    ],
    trailerUrl: SAMPLE_STREAM_4,
    videoStreamUrl: SAMPLE_STREAM_4
  }
];
