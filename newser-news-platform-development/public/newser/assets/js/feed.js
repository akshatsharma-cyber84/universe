// feed.js — Personalized feed engine for NEWSer
const Feed = (() => {
  function getPersonalizedFeed() {
    const interests = Storage.getInterests();
    const history = Storage.getHistory();
    const muted = Storage.getMuted();
    const following = Storage.getFollowing();
    const signalMode = Storage.getSignalMode();

    let stories = [...NewsData];

    // Remove muted categories
    stories = stories.filter(s => !muted.includes(s.category));

    // Signal mode: only important
    if (signalMode) {
      stories = stories.filter(s => s.important);
    }

    // Score stories
    stories = stories.map(s => {
      let score = 0;
      if (interests.includes(s.category)) score += 10;
      // Boost categories from history
      const catCount = history.filter(h => h.category === s.category).length;
      score += Math.min(catCount, 20);
      if (s.important) score += 5;
      if (s.verification === 'verified') score += 2;
      s._score = score;
      return s;
    });

    stories.sort((a, b) => b._score - a._score);
    return stories;
  }

  function getByCategory(cat) {
    if (cat === 'For You') return getPersonalizedFeed();
    if (cat === 'Latest') return [...NewsData].reverse();
    if (cat === 'Creators') return []; // handled separately
    return NewsData.filter(s => s.category === cat);
  }

  function getTrending() {
    return [...NewsData].filter(s => s.important).slice(0, 8);
  }

  function getDeveloping() {
    return NewsData.filter(s => s.verification === 'developing');
  }

  function search(query) {
    const q = query.toLowerCase();
    const stories = NewsData.filter(s =>
      s.headline.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
    const creators = CreatorsData.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.username.toLowerCase().includes(q) ||
      c.categories.some(cat => cat.toLowerCase().includes(q))
    );
    return { stories, creators };
  }

  return { getPersonalizedFeed, getByCategory, getTrending, getDeveloping, search };
})();
