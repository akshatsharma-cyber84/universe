// notifications.js — Notifications system for NEWSer
const NotificationsModule = (() => {
  const defaults = [
    { id: 'notif1', type: 'trending', title: 'AI is trending', body: 'GPT-5 and AI regulation dominate today\'s feed.', time: '5 min ago', read: false, icon: '🔥' },
    { id: 'notif2', type: 'creator', title: 'New post from @TechWithAman', body: 'Why GPT-5 Changes Everything — read now.', time: '2 hrs ago', read: false, icon: '✍️' },
    { id: 'notif3', type: 'update', title: 'Saved story updated', body: 'The superconductor story has a new development.', time: '4 hrs ago', read: false, icon: '🔔' },
    { id: 'notif4', type: 'discover', title: 'New creator to discover', body: '@ScienceWithRiya is gaining traction in Science.', time: '6 hrs ago', read: true, icon: '⭐' },
    { id: 'notif5', type: 'milestone', title: 'Welcome to NEWSer!', body: 'Know what matters. In seconds.', time: '1 day ago', read: true, icon: '🎉' }
  ];

  function getAll() {
    let n = Storage.getNotifications();
    if (!n) { n = defaults; Storage.setNotifications(n); }
    return n;
  }

  function getUnreadCount() {
    return getAll().filter(n => !n.read).length;
  }

  function markRead(id) {
    const n = getAll();
    const item = n.find(x => x.id === id);
    if (item) item.read = true;
    Storage.setNotifications(n);
  }

  function markAllRead() {
    const n = getAll().map(x => ({ ...x, read: true }));
    Storage.setNotifications(n);
  }

  function addNotification(notif) {
    const n = getAll();
    n.unshift({ ...notif, id: 'notif_' + Date.now(), read: false });
    Storage.setNotifications(n);
  }

  return { getAll, getUnreadCount, markRead, markAllRead, addNotification };
})();
