// creators.js — Demo creator data for NEWSer
const CreatorsData = [
  {
    id: 'c1', name: 'Aman Verma', username: '@TechWithAman', avatar: '🧑‍💻',
    categories: ['Technology','AI'], followers: 12400, posts: 127, accuracy: 96,
    verifiedPosts: 118, corrections: 4, reputation: 94, verified: true,
    level: 'Verified Creator', bio: 'Breaking down complex tech in simple words.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp1', headline:'Why GPT-5 Changes Everything', summary:'A deep dive into the new reasoning capabilities and what they mean for developers.', category:'AI', time:'2 hrs ago', likes:342 },
      { id:'cp2', headline:'Apple Glass vs Meta Orion: Full Comparison', summary:'Comparing specs, design philosophy, and ecosystem integration of both AR devices.', category:'Technology', time:'1 day ago', likes:521 }
    ]
  },
  {
    id: 'c2', name: 'Riya Sharma', username: '@ScienceWithRiya', avatar: '👩‍🔬',
    categories: ['Science','Space'], followers: 2800, posts: 89, accuracy: 98,
    verifiedPosts: 87, corrections: 1, reputation: 97, verified: true,
    level: 'Verified Creator', bio: 'Explaining complex science simply.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp3', headline:'Room Temperature Superconductors Explained', summary:'What the MIT breakthrough actually means and why previous claims failed.', category:'Science', time:'5 hrs ago', likes:890 },
      { id:'cp4', headline:'ISRO\'s Reusable Rocket: A Technical Deep Dive', summary:'How India\'s RLV compares to SpaceX Falcon 9 in design and cost efficiency.', category:'Space', time:'2 days ago', likes:445 }
    ]
  },
  {
    id: 'c3', name: 'Karthik Nair', username: '@StartupKarthik', avatar: '🚀',
    categories: ['Startups','Business'], followers: 8900, posts: 156, accuracy: 91,
    verifiedPosts: 140, corrections: 8, reputation: 88, verified: true,
    level: 'Trusted Contributor', bio: 'Tracking India\'s startup revolution.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp5', headline:'Inside CarbonZero\'s $50/ton Breakthrough', summary:'I visited the Bangalore lab and spoke with the founders about their carbon capture tech.', category:'Startups', time:'12 hrs ago', likes:267 },
      { id:'cp6', headline:'Tata\'s Chip Ambitions: What It Really Takes', summary:'Building a semiconductor fab is harder than it sounds. Here\'s the reality.', category:'Business', time:'1 day ago', likes:389 }
    ]
  },
  {
    id: 'c4', name: 'Priya Desai', username: '@FinanceWithPriya', avatar: '📊',
    categories: ['Finance','Business'], followers: 15600, posts: 203, accuracy: 94,
    verifiedPosts: 190, corrections: 6, reputation: 92, verified: true,
    level: 'Featured Creator', bio: 'Making finance accessible for everyone.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp7', headline:'Sensex at 90K: Should You Invest Now?', summary:'Analysis of market valuations, sector performance, and what retail investors should consider.', category:'Finance', time:'1 day ago', likes:1203 },
      { id:'cp8', headline:'Digital Rupee: Everything You Need to Know', summary:'How e₹ works, where to use it, and how it compares to UPI.', category:'Finance', time:'2 days ago', likes:876 }
    ]
  },
  {
    id: 'c5', name: 'Arjun Mehta', username: '@GamingArjun', avatar: '🎮',
    categories: ['Gaming','Entertainment'], followers: 22100, posts: 312, accuracy: 89,
    verifiedPosts: 275, corrections: 12, reputation: 85, verified: true,
    level: 'Verified Creator', bio: 'Your guide to gaming news and reviews.',
    featured: false, rising: false,
    recentPosts: [
      { id:'cp9', headline:'GTA VI: Everything We Know So Far', summary:'Release date, map size, gameplay features, and what to expect from Rockstar.', category:'Gaming', time:'5 hrs ago', likes:2340 },
      { id:'cp10', headline:'Switch 2 First Impressions After One Week', summary:'Is Nintendo\'s new console worth the upgrade? My honest take.', category:'Gaming', time:'3 days ago', likes:1567 }
    ]
  },
  {
    id: 'c6', name: 'Neha Gupta', username: '@WorldWithNeha', avatar: '🌍',
    categories: ['World','India'], followers: 6700, posts: 178, accuracy: 95,
    verifiedPosts: 168, corrections: 5, reputation: 93, verified: true,
    level: 'Trusted Contributor', bio: 'Global stories that matter to India.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp11', headline:'UN Climate Deal: India\'s Win and Worries', summary:'Breaking down what the new climate agreement means specifically for India.', category:'World', time:'9 hrs ago', likes:456 },
      { id:'cp12', headline:'Why Global Population Decline Matters for India', summary:'India is now the world\'s most populous country. Here\'s what the demographic shift means.', category:'World', time:'1 day ago', likes:323 }
    ]
  },
  {
    id: 'c7', name: 'Vikram Singh', username: '@SpaceVikram', avatar: '🛸',
    categories: ['Space','Science'], followers: 4200, posts: 95, accuracy: 97,
    verifiedPosts: 92, corrections: 2, reputation: 96, verified: false,
    level: 'Trusted Contributor', bio: 'Space exploration updates and analysis.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp13', headline:'Starship Refueling: Why It\'s a Game Changer', summary:'Orbital refueling unlocks destinations far beyond the Moon. Here\'s how it works.', category:'Space', time:'4 hrs ago', likes:567 },
      { id:'cp14', headline:'The Race to Mars: Updated Timeline', summary:'Comparing NASA, SpaceX, and China\'s Mars mission plans as of 2026.', category:'Space', time:'3 days ago', likes:445 }
    ]
  },
  {
    id: 'c8', name: 'Ananya Iyer', username: '@AIAnanya', avatar: '🤖',
    categories: ['AI','Technology'], followers: 9800, posts: 143, accuracy: 93,
    verifiedPosts: 132, corrections: 7, reputation: 90, verified: true,
    level: 'Verified Creator', bio: 'AI research explained for humans.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp15', headline:'EU AI Act: What Developers Must Know', summary:'Practical guide to compliance for AI developers building products used in Europe.', category:'AI', time:'6 hrs ago', likes:678 },
      { id:'cp16', headline:'AI in Healthcare: Hope vs Hype', summary:'Separating genuine breakthroughs from overpromised AI medical solutions.', category:'AI', time:'2 days ago', likes:901 }
    ]
  },
  {
    id: 'c9', name: 'Rahul Kapoor', username: '@SportsRahul', avatar: '🏏',
    categories: ['Sports'], followers: 31200, posts: 428, accuracy: 90,
    verifiedPosts: 385, corrections: 15, reputation: 86, verified: true,
    level: 'Featured Creator', bio: 'Cricket, football, and everything sports.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp17', headline:'India\'s Australia Triumph: The Turning Points', summary:'Three moments that defined India\'s historic 3-1 series win Down Under.', category:'Sports', time:'3 hrs ago', likes:3456 },
      { id:'cp18', headline:'IPL 2026: Team-by-Team Preview', summary:'Analyzing squads, key players, and title contenders for the upcoming season.', category:'Sports', time:'1 day ago', likes:2890 }
    ]
  },
  {
    id: 'c10', name: 'Meera Joshi', username: '@EduMeera', avatar: '📚',
    categories: ['Education'], followers: 5400, posts: 112, accuracy: 96,
    verifiedPosts: 107, corrections: 3, reputation: 95, verified: false,
    level: 'Trusted Contributor', bio: 'Education policy and career guidance.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp19', headline:'NEP 2020 Five Years Later: A Report Card', summary:'What worked, what didn\'t, and what still needs to change in India\'s education system.', category:'Education', time:'10 hrs ago', likes:234 },
      { id:'cp20', headline:'Best Free Online Courses in 2026', summary:'Curated list of high-quality free courses from MIT, Stanford, and IITs.', category:'Education', time:'2 days ago', likes:567 }
    ]
  },
  {
    id: 'c11', name: 'Dev Patel', username: '@ClimateWithDev', avatar: '🌱',
    categories: ['Science','World'], followers: 3100, posts: 67, accuracy: 94,
    verifiedPosts: 63, corrections: 2, reputation: 93, verified: false,
    level: 'Contributor', bio: 'Climate science and sustainability.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp21', headline:'India at 200 GW Solar: Behind the Numbers', summary:'How India achieved its solar target three years early and what\'s next.', category:'Science', time:'20 hrs ago', likes:189 }
    ]
  },
  {
    id: 'c12', name: 'Simran Kaur', username: '@HealthSimran', avatar: '🩺',
    categories: ['Science','India'], followers: 7600, posts: 134, accuracy: 97,
    verifiedPosts: 130, corrections: 2, reputation: 96, verified: true,
    level: 'Verified Creator', bio: 'Health news and medical breakthroughs.',
    featured: false, rising: false,
    recentPosts: [
      { id:'cp22', headline:'Digital Health ID: Privacy and Promise', summary:'What India\'s new health ID means for your medical data and healthcare access.', category:'India', time:'7 hrs ago', likes:345 }
    ]
  },
  {
    id: 'c13', name: 'Aditya Rao', username: '@CryptoAditya', avatar: '💰',
    categories: ['Finance','Technology'], followers: 11300, posts: 189, accuracy: 85,
    verifiedPosts: 158, corrections: 18, reputation: 80, verified: true,
    level: 'Verified Creator', bio: 'Crypto, DeFi, and digital finance.',
    featured: false, rising: false,
    recentPosts: [
      { id:'cp23', headline:'Digital Rupee vs Crypto: Key Differences', summary:'Understanding what makes RBI\'s e₹ fundamentally different from Bitcoin and stablecoins.', category:'Finance', time:'11 hrs ago', likes:456 }
    ]
  },
  {
    id: 'c14', name: 'Zara Khan', username: '@CultureZara', avatar: '🎬',
    categories: ['Entertainment'], followers: 18900, posts: 267, accuracy: 88,
    verifiedPosts: 234, corrections: 14, reputation: 84, verified: true,
    level: 'Featured Creator', bio: 'Films, music, and pop culture.',
    featured: true, rising: false,
    recentPosts: [
      { id:'cp24', headline:'AI Films at Cannes: The Full Story', summary:'Inside the premiere, the protests, and what it means for Indian cinema.', category:'Entertainment', time:'3 days ago', likes:789 }
    ]
  },
  {
    id: 'c15', name: 'Ishaan Malik', username: '@LocalIshaan', avatar: '📍',
    categories: ['India'], followers: 1900, posts: 45, accuracy: 92,
    verifiedPosts: 41, corrections: 3, reputation: 89, verified: false,
    level: 'Contributor', bio: 'Hyperlocal news from metros to small towns.',
    featured: false, rising: true,
    recentPosts: [
      { id:'cp25', headline:'Chennai\'s Driverless Metro: A Rider\'s Experience', summary:'I rode the new autonomous Line 3 on launch day. Here\'s what it\'s like.', category:'India', time:'2 days ago', likes:123 }
    ]
  }
];
