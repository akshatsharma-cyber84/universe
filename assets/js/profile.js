// profile.js — Profile management for NEWSer
const Profile = (() => {
  function get() {
    return Storage.getUser();
  }

  function updateName(name) {
    const u = Storage.getUser();
    u.name = name;
    Storage.setUser(u);
    // Update all name displays in the UI
    document.querySelectorAll('.user-display-name').forEach(el => {
      el.textContent = name;
    });
  }

  function getStats() {
    return {
      saved: Storage.getSaved().length,
      following: Storage.getFollowing().length,
      liked: Storage.getLiked().length,
      interests: Storage.getInterests().length,
      posts: Storage.getPosts().length
    };
  }

  function getLevel() {
    const posts = Storage.getPosts().length;
    if (posts >= 20) return 'Trusted Contributor';
    if (posts >= 5) return 'Contributor';
    return 'Reader';
  }

  return { get, updateName, getStats, getLevel };
})();
