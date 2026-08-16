// storage.js — Local persistence layer for NEWSer
const Storage = (() => {
  const PREFIX = 'newser_';
  const get = (key) => {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)); } catch { return null; }
  };
  const set = (key, val) => {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch {}
  };
  const remove = (key) => localStorage.removeItem(PREFIX + key);

  return {
    // User
    getUser: () => get('user') || {},
    setUser: (u) => set('user', u),
    isLoggedIn: () => !!get('user')?.phone,
    setOnboarded: (v) => set('onboarded', v),
    isOnboarded: () => !!get('onboarded'),

    // Interests
    getInterests: () => get('interests') || [],
    setInterests: (i) => set('interests', i),

    // Saved
    getSaved: () => get('saved') || [],
    toggleSave: (id) => {
      let s = get('saved') || [];
      if (s.includes(id)) s = s.filter(x => x !== id);
      else s.push(id);
      set('saved', s);
      return s.includes(id);
    },
    isSaved: (id) => (get('saved') || []).includes(id),

    // Liked
    getLiked: () => get('liked') || [],
    toggleLike: (id) => {
      let s = get('liked') || [];
      if (s.includes(id)) s = s.filter(x => x !== id);
      else s.push(id);
      set('liked', s);
      return s.includes(id);
    },
    isLiked: (id) => (get('liked') || []).includes(id),

    // Following creators
    getFollowing: () => get('following') || [],
    toggleFollow: (id) => {
      let s = get('following') || [];
      if (s.includes(id)) s = s.filter(x => x !== id);
      else s.push(id);
      set('following', s);
      return s.includes(id);
    },
    isFollowing: (id) => (get('following') || []).includes(id),

    // Reading history
    getHistory: () => get('history') || [],
    addHistory: (cat) => {
      let h = get('history') || [];
      h.push({ category: cat, time: Date.now() });
      if (h.length > 200) h = h.slice(-200);
      set('history', h);
    },

    // Muted topics
    getMuted: () => get('muted') || [],
    toggleMute: (topic) => {
      let s = get('muted') || [];
      if (s.includes(topic)) s = s.filter(x => x !== topic);
      else s.push(topic);
      set('muted', s);
    },

    // Submitted posts
    getPosts: () => get('posts') || [],
    addPost: (p) => { let ps = get('posts') || []; ps.unshift(p); set('posts', ps); },

    // Notifications
    getNotifications: () => get('notifications'),
    setNotifications: (n) => set('notifications', n),

    // Reports
    getReports: () => get('reports') || [],
    addReport: (r) => { let rs = get('reports') || []; rs.push(r); set('reports', rs); },

    // Recent searches
    getSearches: () => get('searches') || [],
    addSearch: (q) => {
      let s = get('searches') || [];
      s = s.filter(x => x !== q);
      s.unshift(q);
      if (s.length > 10) s = s.slice(0, 10);
      set('searches', s);
    },
    clearSearches: () => set('searches', []),

    // Signal mode
    getSignalMode: () => !!get('signal_mode'),
    setSignalMode: (v) => set('signal_mode', v),

    // Theme
    getTheme: () => get('theme') || 'dark',
    setTheme: (t) => set('theme', t),

    // Clear all
    clearAll: () => {
      Object.keys(localStorage).filter(k => k.startsWith(PREFIX)).forEach(k => localStorage.removeItem(k));
    }
  };
})();
