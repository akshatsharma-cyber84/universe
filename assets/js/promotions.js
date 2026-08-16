// promotions.js — Data-driven promotion system for NEWSer
// To add/remove/update promotions, simply edit this data.
// No HTML changes required.

const Promotions = [
  {
    id: 'promo001',
    type: 'creator',
    name: 'Riya Sharma',
    username: '@ScienceWithRiya',
    creatorId: 'c2',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '👩‍🔬',
    description: 'Explaining complex science simply. Rising voice in Science & Space.',
    category: 'Science',
    badge: 'Rising Creator',
    placement: ['spotlight', 'rising', 'discover'],
    active: true,
    priority: 1,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'promo002',
    type: 'creator',
    name: 'Vikram Singh',
    username: '@SpaceVikram',
    creatorId: 'c7',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '🛸',
    description: 'Space exploration updates and in-depth analysis.',
    category: 'Space',
    badge: 'Rising Creator',
    placement: ['rising', 'discover'],
    active: true,
    priority: 2,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'promo003',
    type: 'creator',
    name: 'Neha Gupta',
    username: '@WorldWithNeha',
    creatorId: 'c6',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '🌍',
    description: 'Global stories that matter to India.',
    category: 'World',
    badge: 'New Voice',
    placement: ['rising', 'discover', 'home'],
    active: true,
    priority: 3,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'promo004',
    type: 'creator',
    name: 'Meera Joshi',
    username: '@EduMeera',
    creatorId: 'c10',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '📚',
    description: 'Education policy and career guidance for students.',
    category: 'Education',
    badge: 'Rising Creator',
    placement: ['rising', 'discover'],
    active: true,
    priority: 4,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'promo005',
    type: 'creator',
    name: 'Dev Patel',
    username: '@ClimateWithDev',
    creatorId: 'c11',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '🌱',
    description: 'Climate science and sustainability updates.',
    category: 'Science',
    badge: 'New Voice',
    placement: ['rising', 'discover'],
    active: true,
    priority: 5,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  },
  {
    id: 'promo006',
    type: 'creator',
    name: 'Ishaan Malik',
    username: '@LocalIshaan',
    creatorId: 'c15',
    platform: 'NEWSer',
    profileUrl: '',
    avatar: '📍',
    description: 'Hyperlocal news from metros to small towns.',
    category: 'India',
    badge: 'New Voice',
    placement: ['rising', 'discover'],
    active: true,
    priority: 6,
    startDate: '2026-01-01',
    endDate: '2027-12-31'
  }
];

const PromotionEngine = (() => {
  const isActive = (promo) => {
    if (!promo.active) return false;
    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    return now >= start && now <= end;
  };

  const getByPlacement = (placement) => {
    return Promotions
      .filter(p => isActive(p) && p.placement.includes(placement))
      .sort((a, b) => a.priority - b.priority);
  };

  const getSpotlight = () => {
    const spots = getByPlacement('spotlight');
    return spots.length > 0 ? spots[0] : null;
  };

  const getRising = () => getByPlacement('rising');
  const getDiscover = () => getByPlacement('discover');
  const getHome = () => getByPlacement('home');

  return { isActive, getByPlacement, getSpotlight, getRising, getDiscover, getHome };
})();
