// app.js — Main application controller for NEWSer
const App = (() => {
  let currentView = 'splash';
  let currentCategory = 'For You';
  let currentStoryIndex = 0;
  let currentStories = [];
  let touchStartY = 0;
  let touchStartX = 0;
  let resendTimer = null;
  let resendSeconds = 30;

  // ====== INITIALIZATION ======
  function init() {
    showSplash();
  }

  // ====== SPLASH SCREEN ======
  function showSplash() {
    const splash = document.getElementById('splash');
    splash.classList.add('active');
    setTimeout(() => {
      splash.classList.add('animate');
    }, 100);
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.classList.remove('active', 'animate', 'fade-out');
        if (Storage.isLoggedIn() && Storage.isOnboarded()) {
          showMain();
        } else if (Storage.isLoggedIn()) {
          showOnboarding();
        } else {
          showLogin();
        }
      }, 500);
    }, 2400);
  }

  // ====== LOGIN ======
  function showLogin() {
    currentView = 'login';
    hideAll();
    document.getElementById('login-screen').classList.add('active');
    const phoneInput = document.getElementById('login-phone');
    if (phoneInput) phoneInput.focus();
  }

  function handleLoginSubmit() {
    const nameInput = document.getElementById('login-name');
    const phoneInput = document.getElementById('login-phone');
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim().replace(/\s/g, '');
    const errorEl = document.getElementById('login-error');

    if (!name || name.length < 2) {
      showError(errorEl, 'Please enter your name.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      showError(errorEl, 'Enter a valid 10-digit mobile number.');
      return;
    }

    errorEl.textContent = '';
    const btn = document.getElementById('login-btn');
    btn.classList.add('loading');
    btn.textContent = 'Sending OTP...';

    // Submit to Formspree
    Auth.submitToFormspree({ name, phone }).then(result => {
      if (!result.success) {
        showError(errorEl, result.message);
        btn.classList.remove('loading');
        btn.textContent = 'Continue';
        return;
      }
      // Send OTP
      Auth.sendOTP(phone).then(otpResult => {
        btn.classList.remove('loading');
        btn.textContent = 'Continue';
        if (otpResult.success) {
          Storage.setUser({ name, phone });
          showOTPScreen(phone);
        } else {
          showError(errorEl, otpResult.message);
        }
      });
    });
  }

  // ====== OTP SCREEN ======
  function showOTPScreen(phone) {
    currentView = 'otp';
    hideAll();
    document.getElementById('otp-screen').classList.add('active');
    document.getElementById('otp-phone-display').textContent = '+91 ' + phone.replace(/(\d{5})(\d{5})/, '$1 $2');
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach((inp, i) => {
      inp.value = '';
      inp.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
        if (i === inputs.length - 1 && e.target.value.length === 1) {
          // Auto-verify
          const otp = Array.from(inputs).map(x => x.value).join('');
          if (otp.length === 4) handleOTPVerify();
        }
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
          inputs[i - 1].focus();
        }
      });
      inp.addEventListener('paste', (e) => {
        e.preventDefault();
        const data = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        for (let j = 0; j < Math.min(data.length, 4); j++) {
          inputs[j].value = data[j];
        }
        if (data.length >= 4) handleOTPVerify();
      });
    });
    inputs[0].focus();
    startResendTimer();
  }

  function startResendTimer() {
    resendSeconds = 30;
    const el = document.getElementById('resend-timer');
    const btn = document.getElementById('resend-btn');
    btn.style.display = 'none';
    el.style.display = 'block';
    el.textContent = `Resend OTP in ${resendSeconds}s`;
    clearInterval(resendTimer);
    resendTimer = setInterval(() => {
      resendSeconds--;
      el.textContent = `Resend OTP in ${resendSeconds}s`;
      if (resendSeconds <= 0) {
        clearInterval(resendTimer);
        el.style.display = 'none';
        btn.style.display = 'inline-block';
      }
    }, 1000);
  }

  function handleResendOTP() {
    const user = Storage.getUser();
    Auth.resendOTP(user.phone).then(() => {
      startResendTimer();
    });
  }

  function handleOTPVerify() {
    const inputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(inputs).map(x => x.value).join('');
    const errorEl = document.getElementById('otp-error');

    if (otp.length !== 4) {
      showError(errorEl, 'Please enter the 4-digit OTP.');
      return;
    }

    const user = Storage.getUser();
    const btn = document.getElementById('verify-btn');
    btn.classList.add('loading');
    btn.textContent = 'Verifying...';

    Auth.verifyOTP(user.phone, otp).then(result => {
      btn.classList.remove('loading');
      btn.textContent = 'Verify';
      if (result.success) {
        errorEl.textContent = '';
        if (Storage.isOnboarded()) {
          showMain();
        } else {
          showOnboarding();
        }
      } else {
        showError(errorEl, result.message);
        inputs.forEach(i => i.value = '');
        inputs[0].focus();
      }
    });
  }

  // ====== ONBOARDING ======
  function showOnboarding() {
    currentView = 'onboarding';
    hideAll();
    document.getElementById('onboarding-screen').classList.add('active');
  }

  function handleBuildFeed() {
    const selected = document.querySelectorAll('.interest-chip.selected');
    if (selected.length === 0) {
      document.getElementById('onboard-error').textContent = 'Select at least one interest.';
      return;
    }
    const interests = Array.from(selected).map(el => el.dataset.interest);
    Storage.setInterests(interests);
    Storage.setOnboarded(true);
    // Update Formspree with interests
    const user = Storage.getUser();
    Auth.submitToFormspree({ ...user, interests });
    showMain();
  }

  // ====== MAIN APP ======
  function showMain() {
    currentView = 'home';
    hideAll();
    document.getElementById('main-app').classList.add('active');
    updateUserDisplay();
    updateNotificationBadge();
    navigateTo('home');
  }

  function hideAll() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  }

  function showError(el, msg) {
    el.textContent = msg;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
  }

  function updateUserDisplay() {
    const user = Storage.getUser();
    document.querySelectorAll('.user-display-name').forEach(el => {
      el.textContent = user.name || 'User';
    });
  }

  function updateNotificationBadge() {
    const count = NotificationsModule.getUnreadCount();
    const badges = document.querySelectorAll('.notif-badge');
    badges.forEach(b => {
      if (count > 0) { b.textContent = count; b.style.display = 'flex'; }
      else b.style.display = 'none';
    });
  }

  // ====== NAVIGATION ======
  function navigateTo(view) {
    currentView = view;
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const panel = document.getElementById('view-' + view);
    if (panel) panel.classList.add('active');

    document.querySelectorAll(`.nav-item[data-view="${view}"]`).forEach(n => n.classList.add('active'));

    switch (view) {
      case 'home': renderHome(); break;
      case 'discover': renderDiscover(); break;
      case 'create': renderCreate(); break;
      case 'saved': renderSaved(); break;
      case 'profile': renderProfile(); break;
      case 'trending': renderTrending(); break;
      case 'notifications': renderNotifications(); break;
      case 'search': renderSearch(); break;
    }
    // scroll to top
    if (panel) panel.scrollTop = 0;
  }

  // ====== HOME VIEW ======
  function renderHome() {
    renderCategoryTabs();
    loadCategoryFeed(currentCategory);
  }

  function renderCategoryTabs() {
    const cats = ['For You', 'Latest', 'India', 'World', 'Tech', 'AI', 'Science', 'Business', 'Sports', 'Gaming', 'Space', 'Education', 'Finance', 'Startups', 'Entertainment'];
    const tabsEl = document.getElementById('category-tabs');
    tabsEl.innerHTML = cats.map(c => {
      const catMap = { 'Tech': 'Technology' };
      const active = (c === currentCategory) ? 'active' : '';
      return `<button class="cat-tab ${active}" data-cat="${c}" onclick="App.switchCategory('${c}')">${c}</button>`;
    }).join('');
  }

  function switchCategory(cat) {
    currentCategory = cat;
    renderCategoryTabs();
    loadCategoryFeed(cat);
  }

  function loadCategoryFeed(cat) {
    const catMap = { 'Tech': 'Technology' };
    const mappedCat = catMap[cat] || cat;
    const feedEl = document.getElementById('feed-container');

    if (cat === 'Creators') {
      renderCreatorsFeed(feedEl);
      return;
    }

    currentStories = Feed.getByCategory(mappedCat);
    currentStoryIndex = 0;

    if (currentStories.length === 0) {
      feedEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📰</div><p>No stories in this category yet.</p></div>`;
      return;
    }

    renderFeedCards(feedEl);
  }

  function renderFeedCards(container) {
    let html = '';

    // Signal mode banner
    if (Storage.getSignalMode()) {
      html += `<div class="signal-banner"><span>⚡</span> Signal Mode — Showing important stories only <button onclick="App.toggleSignalMode()" class="signal-off-btn">Turn Off</button></div>`;
    }

    // Creator spotlight on home
    const homePromos = PromotionEngine.getHome();
    if (homePromos.length > 0 && currentCategory === 'For You') {
      const p = homePromos[0];
      html += `<div class="creator-card-mini" onclick="App.showCreatorProfile('${p.creatorId}')">
        <div class="ccm-left"><span class="ccm-avatar">${p.avatar}</span><div><strong>${p.name}</strong><span class="ccm-user">${p.username}</span></div></div>
        <span class="promo-badge">${p.badge}</span>
      </div>`;
    }

    currentStories.forEach((story, i) => {
      html += renderNewsCard(story, i);
    });

    container.innerHTML = html;
    // Track reading
    if (currentStories.length > 0) {
      Storage.addHistory(currentStories[0].category);
    }
  }

  function renderNewsCard(story, index) {
    const catColors = {
      'AI': '#818cf8', 'Technology': '#06b6d4', 'Science': '#a855f7', 'Business': '#22c55e',
      'Sports': '#f97316', 'Gaming': '#ec4899', 'World': '#3b82f6', 'India': '#f59e0b',
      'Education': '#eab308', 'Space': '#8b5cf6', 'Finance': '#10b981', 'Startups': '#f43f5e',
      'Entertainment': '#d946ef'
    };
    const color = catColors[story.category] || '#6b7280';
    const saved = Storage.isSaved(story.id);
    const liked = Storage.isLiked(story.id);

    return `<article class="news-card" data-id="${story.id}" data-index="${index}">
      <div class="nc-header">
        <span class="nc-category" style="color:${color}">${story.category}</span>
        <span class="nc-time">${story.time}</span>
      </div>
      <h2 class="nc-headline" onclick="App.openStory('${story.id}')">${story.headline}</h2>
      <p class="nc-summary">${story.summary}</p>
      <div class="nc-info-section">
        <div class="nc-info-block">
          <span class="nc-info-label">What happened?</span>
          <p>${story.whatHappened}</p>
        </div>
        <div class="nc-info-block">
          <span class="nc-info-label">Why it matters?</span>
          <p>${story.whyItMatters}</p>
        </div>
      </div>
      <div class="nc-meta">
        ${Verification.getStatusBadge(story.verification)}
        <span class="nc-sources" onclick="App.showSources('${story.id}')">📄 ${story.sourceCount} sources</span>
      </div>
      <div class="nc-actions">
        <button class="nc-action ${liked ? 'active' : ''}" onclick="App.toggleLike('${story.id}', this)" title="Like"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${liked ? '#ef4444' : 'none'}" stroke="${liked ? '#ef4444' : '#888'}" stroke-width="2"/></svg></button>
        <button class="nc-action ${saved ? 'active' : ''}" onclick="App.toggleSave('${story.id}', this)" title="Save"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="${saved ? '#3b82f6' : 'none'}" stroke="${saved ? '#3b82f6' : '#888'}" stroke-width="2"/></svg></button>
        <button class="nc-action" onclick="App.shareStory('${story.id}')" title="Share"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="#888"/></svg></button>
        <button class="nc-action" onclick="App.showExplain('${story.id}')" title="Explain"><svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="none" stroke="#888" stroke-width="2"/><path d="M12 16v-1m0-3a2.5 2.5 0 10-2.5 2.5" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16.5" r=".5" fill="#888"/></svg></button>
        <button class="nc-action" onclick="App.notInterested('${story.id}', this)" title="Not Interested"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" fill="none" stroke="#888" stroke-width="1.5"/></svg></button>
      </div>
    </article>`;
  }

  // ====== STORY DETAIL ======
  function openStory(id) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    Storage.addHistory(story.category);
    const modal = document.getElementById('story-modal');
    const catColors = {
      'AI': '#818cf8', 'Technology': '#06b6d4', 'Science': '#a855f7', 'Business': '#22c55e',
      'Sports': '#f97316', 'Gaming': '#ec4899', 'World': '#3b82f6', 'India': '#f59e0b',
      'Education': '#eab308', 'Space': '#8b5cf6', 'Finance': '#10b981', 'Startups': '#f43f5e',
      'Entertainment': '#d946ef'
    };
    const color = catColors[story.category] || '#6b7280';
    const saved = Storage.isSaved(id);
    const liked = Storage.isLiked(id);

    let timelineHtml = '';
    if (story.timeline) {
      timelineHtml = `<div class="story-timeline"><h3>📍 Timeline</h3><div class="timeline-list">`;
      story.timeline.forEach(t => {
        timelineHtml += `<div class="tl-item"><span class="tl-time">${t.time}</span><span class="tl-text">${t.text}</span></div>`;
      });
      timelineHtml += `</div></div>`;
    }

    let perspHtml = '';
    if (story.perspectives) {
      perspHtml = `<div class="story-perspectives">
        <h3>🔍 Multiple Perspectives</h3>
        <div class="persp-block"><span class="persp-label">What we know</span><p>${story.perspectives.known}</p></div>
        <div class="persp-block"><span class="persp-label">What different sources report</span><p>${story.perspectives.different}</p></div>
        <div class="persp-block"><span class="persp-label">What remains uncertain</span><p>${story.perspectives.uncertain}</p></div>
      </div>`;
    }

    // Related creators
    const relatedCreators = CreatorsData.filter(c => c.categories.includes(story.category)).slice(0, 3);
    let relatedHtml = '';
    if (relatedCreators.length > 0) {
      relatedHtml = `<div class="related-creators"><h3>✍️ Related Creators</h3>${relatedCreators.map(c => `
        <div class="rc-item" onclick="App.showCreatorProfile('${c.id}')">
          <span class="rc-avatar">${c.avatar}</span>
          <div class="rc-info"><strong>${c.name}</strong><span>${c.username}</span></div>
          ${c.verified ? '<span class="creator-verified-badge">🔵</span>' : ''}
        </div>
      `).join('')}</div>`;
    }

    // Related stories
    const relatedStories = NewsData.filter(s => s.category === story.category && s.id !== id).slice(0, 3);
    let relStoriesHtml = '';
    if (relatedStories.length > 0) {
      relStoriesHtml = `<div class="related-stories"><h3>📰 Related Stories</h3>${relatedStories.map(s => `
        <div class="rs-item" onclick="App.openStory('${s.id}')"><span class="rs-cat" style="color:${catColors[s.category] || '#888'}">${s.category}</span><p>${s.headline}</p><span class="rs-time">${s.time}</span></div>
      `).join('')}</div>`;
    }

    modal.innerHTML = `<div class="story-detail">
      <button class="sd-close" onclick="App.closeStory()">✕</button>
      <div class="sd-header">
        <span class="nc-category" style="color:${color}">${story.category}</span>
        <span class="nc-time">${story.time}</span>
      </div>
      <h1 class="sd-headline">${story.headline}</h1>
      <p class="sd-summary">${story.summary}</p>
      <div class="nc-meta">${Verification.getStatusBadge(story.verification)}<span class="nc-sources" onclick="App.showSources('${story.id}')">📄 ${story.sourceCount} sources</span></div>
      <div class="sd-section"><h3>What happened?</h3><p>${story.whatHappened}</p></div>
      <div class="sd-section"><h3>Why it matters?</h3><p>${story.whyItMatters}</p></div>
      ${timelineHtml}
      ${perspHtml}
      <div class="sd-sources"><h3>📄 Sources</h3>${story.sources.map(s => `<div class="source-item">✓ ${s}</div>`).join('')}<p class="source-count">${story.sourceCount} sources reviewed</p></div>
      ${relatedHtml}
      ${relStoriesHtml}
      <div class="sd-actions">
        <button class="sd-action-btn ${saved ? 'active' : ''}" onclick="App.toggleSave('${id}', this)"><span>🔖</span> ${saved ? 'Saved' : 'Save'}</button>
        <button class="sd-action-btn" onclick="App.shareStory('${id}')"><span>↗</span> Share</button>
        <button class="sd-action-btn" onclick="App.showExplain('${id}')"><span>💡</span> Explain</button>
        <button class="sd-action-btn" onclick="App.showSources('${id}')"><span>📄</span> Sources</button>
        <button class="sd-action-btn" onclick="App.reportContent('${id}','story')"><span>🚩</span> Report</button>
      </div>
    </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeStory() {
    document.getElementById('story-modal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ====== ACTIONS ======
  function toggleLike(id, btn) {
    const isLiked = Storage.toggleLike(id);
    if (btn) {
      btn.classList.toggle('active', isLiked);
      const svg = btn.querySelector('path');
      if (svg) {
        svg.setAttribute('fill', isLiked ? '#ef4444' : 'none');
        svg.setAttribute('stroke', isLiked ? '#ef4444' : '#888');
      }
    }
    pulseAnimation(btn);
  }

  function toggleSave(id, btn) {
    const isSaved = Storage.toggleSave(id);
    if (btn) {
      btn.classList.toggle('active', isSaved);
      const svg = btn.querySelector('path');
      if (svg) {
        svg.setAttribute('fill', isSaved ? '#3b82f6' : 'none');
        svg.setAttribute('stroke', isSaved ? '#3b82f6' : '#888');
      }
    }
    pulseAnimation(btn);
  }

  function shareStory(id) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    if (navigator.share) {
      navigator.share({ title: story.headline, text: story.summary, url: window.location.href });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(story.headline + ' — ' + story.summary).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(() => showToast('Could not copy link'));
    }
  }

  function notInterested(id, btn) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    const card = btn.closest('.news-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-100%)';
      setTimeout(() => card.style.display = 'none', 300);
    }
    showToast('Got it. We\'ll show less like this.');
  }

  function pulseAnimation(el) {
    if (!el) return;
    el.style.transform = 'scale(1.3)';
    setTimeout(() => el.style.transform = '', 200);
  }

  // ====== EXPLAIN ======
  function showExplain(id) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    const modal = document.getElementById('explain-modal');
    modal.innerHTML = `<div class="explain-panel">
      <button class="sd-close" onclick="App.closeExplain()">✕</button>
      <h2>💡 Explain</h2>
      <p class="explain-headline">${story.headline}</p>
      <div class="explain-options">
        <button class="explain-opt" onclick="App.getExplanation('${id}','simple')">Explain simply</button>
        <button class="explain-opt" onclick="App.getExplanation('${id}','detail')">Explain in detail</button>
        <button class="explain-opt" onclick="App.getExplanation('${id}','why')">Why does this matter?</button>
        <button class="explain-opt" onclick="App.getExplanation('${id}','teen')">Explain like I'm 15</button>
        <button class="explain-opt" onclick="App.getExplanation('${id}','background')">Give me the background</button>
      </div>
      <div id="explain-result"></div>
    </div>`;
    modal.classList.add('active');
  }

  function getExplanation(id, type) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    const resultEl = document.getElementById('explain-result');
    resultEl.innerHTML = '<div class="explain-loading"><div class="typing-dots"><span></span><span></span><span></span></div></div>';

    // Demo explanations — in production, connect to AI API
    const explanations = {
      simple: `In simple terms: ${story.whatHappened} This is important because ${story.whyItMatters.toLowerCase()}`,
      detail: `Here's a detailed breakdown:\n\n${story.whatHappened}\n\nThe broader context: ${story.whyItMatters}\n\nThis story has been ${story.verification === 'verified' ? 'verified by ' + story.sourceCount + ' independent sources' : 'reported but is still developing'}.${story.perspectives ? '\n\nWhat we know for sure: ' + story.perspectives.known + '\n\nWhat remains uncertain: ' + story.perspectives.uncertain : ''}`,
      why: `Why this matters to you:\n\n${story.whyItMatters}\n\n${story.perspectives ? 'Different perspectives: ' + story.perspectives.different : ''}`,
      teen: `Think of it this way: ${story.whatHappened.split('.')[0]}. Basically, ${story.summary.split('.')[0].toLowerCase()}. This is a big deal because ${story.whyItMatters.split('.')[0].toLowerCase()}.`,
      background: `Background: This story is about ${story.category.toLowerCase()}. ${story.whatHappened}\n\nThe key context: ${story.whyItMatters}\n\n${story.perspectives ? 'Here\'s what experts say: ' + story.perspectives.known + ' However, ' + story.perspectives.uncertain : ''}`
    };

    setTimeout(() => {
      const text = explanations[type] || explanations.simple;
      resultEl.innerHTML = `<div class="explain-answer"><p>${text.replace(/\n/g, '<br>')}</p><p class="explain-note">💡 This explanation is AI-generated for demonstration. In production, this connects to an AI service for real-time explanations.</p></div>`;
    }, 1200);
  }

  function closeExplain() {
    document.getElementById('explain-modal').classList.remove('active');
  }

  // ====== SOURCES ======
  function showSources(id) {
    const story = NewsData.find(s => s.id === id);
    if (!story) return;
    const modal = document.getElementById('sources-modal');
    modal.innerHTML = `<div class="sources-panel">
      <button class="sd-close" onclick="App.closeSources()">✕</button>
      <h2>📄 Sources</h2>
      <p class="sp-headline">${story.headline}</p>
      <div class="sp-list">${story.sources.map(s => `<div class="sp-item"><span class="sp-check">✓</span><span>${s}</span></div>`).join('')}</div>
      <p class="sp-count">${story.sourceCount} sources reviewed</p>
      <div class="sp-note">
        <p>ℹ️ Source transparency is core to NEWSer. Every story shows where information comes from.</p>
        <p><strong>Information verification</strong> (✓ Verified) means the specific claims have been corroborated by appropriate sources.</p>
        <p><strong>Creator verification</strong> (🔵) means the creator's identity has been confirmed. These are separate systems.</p>
      </div>
    </div>`;
    modal.classList.add('active');
  }

  function closeSources() {
    document.getElementById('sources-modal').classList.remove('active');
  }

  // ====== REPORT ======
  function reportContent(id, type) {
    const modal = document.getElementById('report-modal');
    const reasons = ['False information', 'Misleading headline', 'Spam', 'Plagiarism', 'Harassment', 'Copyright concern', 'Other'];
    modal.innerHTML = `<div class="report-panel">
      <button class="sd-close" onclick="App.closeReport()">✕</button>
      <h2>🚩 Report</h2>
      <p>Why are you reporting this?</p>
      <div class="report-reasons">${reasons.map(r => `<button class="report-reason" onclick="App.submitReport('${id}','${type}','${r}')">${r}</button>`).join('')}</div>
    </div>`;
    modal.classList.add('active');
  }

  function submitReport(id, type, reason) {
    Storage.addReport({ id, type, reason, time: Date.now() });
    closeReport();
    showToast('Thank you for reporting. We\'ll review this.');
  }

  function closeReport() {
    document.getElementById('report-modal').classList.remove('active');
  }

  // ====== SIGNAL MODE ======
  function toggleSignalMode() {
    const current = Storage.getSignalMode();
    Storage.setSignalMode(!current);
    if (currentView === 'home') renderHome();
    showToast(current ? 'Explore Mode activated' : 'Signal Mode activated — showing important stories only');
  }

  // ====== DISCOVER ======
  function renderDiscover() {
    const panel = document.getElementById('view-discover');
    const spotlight = PromotionEngine.getSpotlight();
    const rising = PromotionEngine.getRising();
    const featured = CreatorsData.filter(c => c.featured);
    const trusted = [...CreatorsData].sort((a, b) => b.reputation - a.reputation).slice(0, 5);
    const techCreators = CreatorsData.filter(c => c.categories.includes('Technology') || c.categories.includes('AI'));
    const scienceCreators = CreatorsData.filter(c => c.categories.includes('Science') || c.categories.includes('Space'));
    const newVoices = CreatorsData.filter(c => c.followers < 5000);

    let html = `<div class="discover-header"><h1>Discover</h1></div>`;

    // Spotlight
    if (spotlight) {
      const creator = CreatorsData.find(c => c.id === spotlight.creatorId);
      html += `<div class="spotlight-card">
        <span class="spotlight-label">✨ Creator Spotlight</span>
        <p class="spotlight-intro">Meet today's rising voice.</p>
        <div class="spotlight-avatar">${spotlight.avatar}</div>
        <h2>${spotlight.name}</h2>
        <p class="spotlight-user">${spotlight.username}</p>
        <p class="spotlight-followers">${creator ? (creator.followers / 1000).toFixed(1) + 'K followers' : ''}</p>
        <p class="spotlight-cats">${spotlight.category}</p>
        <p class="spotlight-desc">"${spotlight.description}"</p>
        <div class="spotlight-actions">
          <button class="btn-follow ${Storage.isFollowing(spotlight.creatorId) ? 'following' : ''}" onclick="App.toggleFollowCreator('${spotlight.creatorId}', this)">${Storage.isFollowing(spotlight.creatorId) ? 'Following' : 'Follow'}</button>
          <button class="btn-view-profile" onclick="App.showCreatorProfile('${spotlight.creatorId}')">View Profile</button>
        </div>
      </div>`;
    }

    // Trending Creators
    html += renderCreatorSection('🔥 Trending Creators', featured);

    // Rising Creators
    if (rising.length > 0) {
      html += `<div class="discover-section"><h2>🚀 Rising Creators</h2><div class="creator-scroll">`;
      rising.forEach(p => {
        const creator = CreatorsData.find(c => c.id === p.creatorId);
        html += `<div class="creator-chip" onclick="App.showCreatorProfile('${p.creatorId}')">
          <span class="cc-avatar">${p.avatar}</span>
          <strong>${p.name}</strong>
          <span class="cc-badge">${p.badge}</span>
          <span class="cc-cat">${p.category}</span>
        </div>`;
      });
      html += `</div></div>`;
    }

    html += renderCreatorSection('⭐ Most Trusted', trusted);
    html += renderCreatorSection('💻 Tech Creators', techCreators);
    html += renderCreatorSection('🔬 Science Creators', scienceCreators);
    html += renderCreatorSection('🌱 New Voices', newVoices);

    panel.innerHTML = html;
  }

  function renderCreatorSection(title, creators) {
    if (!creators || creators.length === 0) return '';
    let html = `<div class="discover-section"><h2>${title}</h2><div class="creator-scroll">`;
    creators.forEach(c => {
      html += `<div class="creator-card" onclick="App.showCreatorProfile('${c.id}')">
        <div class="cc-top"><span class="cc-avatar-lg">${c.avatar}</span>${c.verified ? '<span class="creator-verified-badge">🔵</span>' : ''}</div>
        <strong>${c.name}</strong>
        <span class="cc-user">${c.username}</span>
        <span class="cc-followers">${formatNum(c.followers)} followers</span>
        <button class="btn-follow-sm ${Storage.isFollowing(c.id) ? 'following' : ''}" onclick="event.stopPropagation(); App.toggleFollowCreator('${c.id}', this)">${Storage.isFollowing(c.id) ? 'Following' : 'Follow'}</button>
      </div>`;
    });
    html += `</div></div>`;
    return html;
  }

  // ====== CREATOR PROFILE ======
  function showCreatorProfile(id) {
    const creator = CreatorsData.find(c => c.id === id);
    if (!creator) return;
    const modal = document.getElementById('creator-modal');
    const repColor = Verification.getReputationColor(creator.reputation);
    const isFollowing = Storage.isFollowing(id);

    let postsHtml = '';
    if (creator.recentPosts && creator.recentPosts.length > 0) {
      postsHtml = `<div class="cp-posts"><h3>Recent Posts</h3>`;
      creator.recentPosts.forEach(p => {
        postsHtml += `<div class="cp-post-card">
          <span class="cp-post-cat">${p.category}</span>
          <h4>${p.headline}</h4>
          <p>${p.summary}</p>
          <div class="cp-post-meta"><span>${p.time}</span><span>❤️ ${p.likes}</span></div>
        </div>`;
      });
      postsHtml += `</div>`;
    }

    modal.innerHTML = `<div class="creator-profile">
      <button class="sd-close" onclick="App.closeCreatorProfile()">✕</button>
      <div class="cp-header">
        <span class="cp-avatar">${creator.avatar}</span>
        <h1>${creator.name} ${creator.verified ? '<span class="creator-verified-badge">🔵</span>' : ''}</h1>
        <p class="cp-username">${creator.username}</p>
        <p class="cp-level">${creator.level}</p>
        <p class="cp-cats">${creator.categories.join(' • ')}</p>
        <p class="cp-bio">${creator.bio}</p>
      </div>
      <div class="cp-stats">
        <div class="cp-stat"><strong>${formatNum(creator.followers)}</strong><span>Followers</span></div>
        <div class="cp-stat"><strong>${creator.posts}</strong><span>Posts</span></div>
        <div class="cp-stat"><strong>${creator.accuracy}%</strong><span>Accuracy</span></div>
      </div>
      <button class="btn-follow-lg ${isFollowing ? 'following' : ''}" onclick="App.toggleFollowCreator('${id}', this)">${isFollowing ? 'Following' : 'Follow'}</button>

      <div class="cp-reputation">
        <h3>NEWSer Reputation</h3>
        <div class="rep-score" style="color:${repColor}"><span class="rep-num">${creator.reputation}</span><span class="rep-label">/ 100</span></div>
        <div class="rep-details">
          <div class="rep-item"><span>✅ Verified posts</span><strong>${creator.verifiedPosts}</strong></div>
          <div class="rep-item"><span>🔄 Corrections</span><strong>${creator.corrections}</strong></div>
          <div class="rep-item"><span>📊 Accuracy</span><strong>${creator.accuracy}%</strong></div>
        </div>
        <p class="rep-note">Reputation reflects source quality, accuracy, corrections, consistency, and reader feedback. It is not an absolute truth score.</p>
      </div>
      ${postsHtml}
      <button class="btn-report" onclick="App.reportContent('${id}','creator')">🚩 Report Creator</button>
    </div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCreatorProfile() {
    document.getElementById('creator-modal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleFollowCreator(id, btn) {
    const isFollowing = Storage.toggleFollow(id);
    if (btn) {
      btn.classList.toggle('following', isFollowing);
      btn.textContent = isFollowing ? 'Following' : 'Follow';
    }
    pulseAnimation(btn);
    if (isFollowing) {
      const creator = CreatorsData.find(c => c.id === id);
      if (creator) {
        NotificationsModule.addNotification({ type: 'creator', title: `You're following ${creator.name}`, body: `You'll see posts from ${creator.username} in your feed.`, time: 'Just now', icon: '✅' });
        updateNotificationBadge();
      }
    }
  }

  // ====== CREATE POST ======
  function renderCreate() {
    const panel = document.getElementById('view-create');
    const user = Storage.getUser();
    const userPosts = Storage.getPosts();
    const cats = ['AI', 'Technology', 'Science', 'Business', 'Startups', 'World', 'India', 'Sports', 'Gaming', 'Entertainment', 'Space', 'Education', 'Finance'];

    let existingPosts = '';
    if (userPosts.length > 0) {
      existingPosts = `<div class="my-posts"><h3>Your Submissions</h3>${userPosts.map(p => `
        <div class="my-post-card"><span class="mp-status ${p.status}">${p.status === 'review' ? '🔍 Under Review' : '✅ Approved'}</span><h4>${p.headline}</h4><p>${p.summary}</p><span class="mp-time">${new Date(p.timestamp).toLocaleDateString()}</span></div>
      `).join('')}</div>`;
    }

    panel.innerHTML = `<div class="create-view">
      <h1>Create</h1>
      <p class="create-subtitle">Share information with the NEWSer community</p>
      <form id="create-form" onsubmit="event.preventDefault(); App.submitPost();">
        <div class="form-group"><label>Headline</label><input type="text" id="post-headline" placeholder="Write a clear, accurate headline" maxlength="120" required></div>
        <div class="form-group"><label>Summary</label><textarea id="post-summary" placeholder="Summarize the story in 40-80 words" rows="3" required></textarea></div>
        <div class="form-group"><label>Category</label><select id="post-category" required><option value="">Select category</option>${cats.map(c => `<option value="${c}">${c}</option>`).join('')}</select></div>
        <div class="form-group"><label>Source URL</label><input type="url" id="post-source" placeholder="https://..." ></div>
        <div class="form-group"><label>Article Body</label><textarea id="post-body" placeholder="Full article content..." rows="6"></textarea></div>
        <div class="form-group"><label>Tags</label><input type="text" id="post-tags" placeholder="Comma-separated tags"></div>
        <button type="submit" class="btn-submit-post">Submit for Review</button>
      </form>
      ${existingPosts}
    </div>`;
  }

  function submitPost() {
    const headline = document.getElementById('post-headline').value.trim();
    const summary = document.getElementById('post-summary').value.trim();
    const category = document.getElementById('post-category').value;
    const source = document.getElementById('post-source').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const tags = document.getElementById('post-tags').value.trim();

    if (!headline || !summary || !category) {
      showToast('Please fill in headline, summary, and category.');
      return;
    }

    const post = {
      id: 'up_' + Date.now(),
      headline, summary, category, source, body,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      status: 'review',
      timestamp: Date.now(),
      author: Storage.getUser().name
    };

    Storage.addPost(post);
    NotificationsModule.addNotification({ type: 'post', title: 'Post submitted', body: `"${headline}" is under review.`, time: 'Just now', icon: '📝' });
    updateNotificationBadge();
    showToast('Post submitted for review!');
    renderCreate();
  }

  // ====== SAVED ======
  function renderSaved() {
    const panel = document.getElementById('view-saved');
    const savedIds = Storage.getSaved();
    const savedStories = NewsData.filter(s => savedIds.includes(s.id));

    let html = `<div class="saved-view"><h1>Saved</h1>`;

    if (savedStories.length === 0) {
      html += `<div class="empty-state"><div class="empty-icon">🔖</div><h3>Nothing saved yet</h3><p>Save stories and creator posts to read later.</p></div>`;
    } else {
      html += `<div class="saved-list">`;
      savedStories.forEach(s => {
        html += `<div class="saved-card" onclick="App.openStory('${s.id}')">
          <div class="sc-header"><span class="nc-category" style="color:${getCatColor(s.category)}">${s.category}</span><span class="nc-time">${s.time}</span></div>
          <h3>${s.headline}</h3>
          <p>${s.summary.substring(0, 100)}...</p>
          <button class="sc-remove" onclick="event.stopPropagation(); App.removeSaved('${s.id}')">Remove</button>
        </div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    panel.innerHTML = html;
  }

  function removeSaved(id) {
    Storage.toggleSave(id);
    renderSaved();
    showToast('Removed from saved.');
  }

  // ====== PROFILE ======
  function renderProfile() {
    const panel = document.getElementById('view-profile');
    const user = Storage.getUser();
    const stats = Profile.getStats();
    const level = Profile.getLevel();
    const interests = Storage.getInterests();

    panel.innerHTML = `<div class="profile-view">
      <div class="pv-header">
        <div class="pv-avatar">${(user.name || 'U')[0].toUpperCase()}</div>
        <h1 class="user-display-name">${user.name || 'User'}</h1>
        <p class="pv-phone">+91 ${user.phone || ''}</p>
        <p class="pv-level">${level}</p>
        <button class="btn-edit-profile" onclick="App.showEditProfile()">Edit Profile</button>
      </div>
      <div class="pv-stats">
        <div class="pv-stat" onclick="App.navigateTo('saved')"><strong>${stats.saved}</strong><span>Saved</span></div>
        <div class="pv-stat"><strong>${stats.following}</strong><span>Following</span></div>
        <div class="pv-stat"><strong>${stats.liked}</strong><span>Liked</span></div>
        <div class="pv-stat"><strong>${stats.posts}</strong><span>Posts</span></div>
      </div>

      <div class="pv-section">
        <h3>Your Interests</h3>
        <div class="pv-interests">${interests.map(i => `<span class="pv-interest-tag">${i}</span>`).join('') || '<p>No interests selected.</p>'}</div>
        <button class="btn-edit-interests" onclick="App.showEditInterests()">Edit Interests</button>
      </div>

      <div class="pv-section">
        <h3>⚡ Feed Mode</h3>
        <div class="pv-toggle-row">
          <span>Signal Mode</span>
          <label class="toggle-switch">
            <input type="checkbox" ${Storage.getSignalMode() ? 'checked' : ''} onchange="App.toggleSignalMode()">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <p class="pv-hint">Show only important stories when enabled.</p>
      </div>

      <div class="pv-section pv-settings">
        <button class="pv-setting-btn" onclick="App.showDashboard()">📊 Creator Dashboard</button>
        <button class="pv-setting-btn" onclick="App.showAbout()">ℹ️ About NEWSer</button>
        <button class="pv-setting-btn logout" onclick="App.handleLogout()">🚪 Log Out</button>
      </div>

      <div class="pv-ak" onclick="window.open('https://akshatsharma-cyber84.github.io/AK_world/','_blank','noopener,noreferrer')">
        <div class="ak-icon-wrap"><span class="ak-icon">AK</span></div>
        <div><strong>Made by AK Industries</strong><p>Visit AK World →</p></div>
      </div>
    </div>`;
  }

  // ====== EDIT PROFILE ======
  function showEditProfile() {
    const user = Storage.getUser();
    const modal = document.getElementById('edit-modal');
    modal.innerHTML = `<div class="edit-panel">
      <button class="sd-close" onclick="App.closeEdit()">✕</button>
      <h2>Edit Profile</h2>
      <div class="form-group"><label>Name</label><input type="text" id="edit-name" value="${user.name || ''}" placeholder="Your name"></div>
      <div class="edit-actions">
        <button class="btn-save" onclick="App.saveProfile()">Save Changes</button>
        <button class="btn-cancel" onclick="App.closeEdit()">Cancel</button>
      </div>
    </div>`;
    modal.classList.add('active');
  }

  function saveProfile() {
    const name = document.getElementById('edit-name').value.trim();
    if (name.length < 2) {
      showToast('Name must be at least 2 characters.');
      return;
    }
    Profile.updateName(name);
    closeEdit();
    renderProfile();
    showToast('Profile updated!');
  }

  function showEditInterests() {
    const modal = document.getElementById('edit-modal');
    const interests = Storage.getInterests();
    const all = ['AI', 'Technology', 'Science', 'Business', 'Startups', 'World', 'India', 'Sports', 'Gaming', 'Entertainment', 'Space', 'Education', 'Finance'];
    modal.innerHTML = `<div class="edit-panel">
      <button class="sd-close" onclick="App.closeEdit()">✕</button>
      <h2>Edit Interests</h2>
      <div class="interest-grid">${all.map(i => `<button class="interest-chip ${interests.includes(i) ? 'selected' : ''}" data-interest="${i}" onclick="this.classList.toggle('selected')">${i}</button>`).join('')}</div>
      <button class="btn-save" onclick="App.saveInterests()">Save Interests</button>
    </div>`;
    modal.classList.add('active');
  }

  function saveInterests() {
    const selected = document.querySelectorAll('#edit-modal .interest-chip.selected');
    const interests = Array.from(selected).map(el => el.dataset.interest);
    Storage.setInterests(interests);
    closeEdit();
    renderProfile();
    showToast('Interests updated!');
  }

  function closeEdit() {
    document.getElementById('edit-modal').classList.remove('active');
  }

  // ====== CREATOR DASHBOARD ======
  function showDashboard() {
    const modal = document.getElementById('dashboard-modal');
    const posts = Storage.getPosts();
    const user = Storage.getUser();
    const totalViews = posts.length * Math.floor(Math.random() * 500 + 100);
    const totalFollowers = Storage.getFollowing().length;

    let postsChart = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const vals = days.map(() => Math.floor(Math.random() * 80 + 20));
    postsChart = `<div class="dash-chart"><h4>Weekly Views</h4><div class="bar-chart">${days.map((d, i) => `<div class="bar-col"><div class="bar" style="height:${vals[i]}%"></div><span>${d}</span></div>`).join('')}</div></div>`;

    modal.innerHTML = `<div class="dashboard-panel">
      <button class="sd-close" onclick="App.closeDashboard()">✕</button>
      <h2>📊 Creator Dashboard</h2>
      <div class="dash-stats">
        <div class="dash-stat"><strong>${posts.length}</strong><span>Posts</span></div>
        <div class="dash-stat"><strong>${totalViews}</strong><span>Views</span></div>
        <div class="dash-stat"><strong>${totalFollowers}</strong><span>Following</span></div>
      </div>
      ${postsChart}
      <div class="dash-posts"><h3>Your Posts</h3>${posts.length === 0 ? '<p class="empty-hint">No posts yet. Create your first post!</p>' : posts.map(p => `<div class="dash-post"><span class="mp-status ${p.status}">${p.status === 'review' ? '🔍 Under Review' : '✅ Approved'}</span><h4>${p.headline}</h4></div>`).join('')}</div>
    </div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDashboard() {
    document.getElementById('dashboard-modal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ====== ABOUT ======
  function showAbout() {
    const modal = document.getElementById('about-modal');
    modal.innerHTML = `<div class="about-panel">
      <button class="sd-close" onclick="App.closeAbout()">✕</button>
      <div class="about-logo">NEWSer</div>
      <p class="about-tagline">Know what matters. In seconds.</p>
      <div class="about-desc">
        <p>NEWSer is a modern information platform that combines short-form news, personalized feeds, AI explanations, source transparency, and a creator ecosystem.</p>
        <p>Our mission: make information fast, personal, understandable, transparent, and creator-driven.</p>
      </div>
      <div class="about-ak" onclick="window.open('https://akshatsharma-cyber84.github.io/AK_world/','_blank','noopener,noreferrer')">
        <div class="ak-icon-wrap"><span class="ak-icon">AK</span></div>
        <p><strong>Made by AK Industries</strong></p>
      </div>
    </div>`;
    modal.classList.add('active');
  }

  function closeAbout() {
    document.getElementById('about-modal').classList.remove('active');
  }

  // ====== TRENDING ======
  function renderTrending() {
    const panel = document.getElementById('view-trending');
    const trending = Feed.getTrending();
    const developing = Feed.getDeveloping();
    const trendingCreators = [...CreatorsData].sort((a, b) => b.followers - a.followers).slice(0, 5);

    let html = `<div class="trending-view"><h1>🔥 Trending</h1>`;

    // Trending stories
    html += `<div class="trend-section"><h2>Trending Stories</h2>`;
    trending.forEach((s, i) => {
      html += `<div class="trend-item" onclick="App.openStory('${s.id}')">
        <span class="trend-num">${i + 1}</span>
        <div class="trend-info">
          <span class="trend-cat" style="color:${getCatColor(s.category)}">${s.category}</span>
          <h3>${s.headline}</h3>
          <span class="trend-time">${s.time}</span>
        </div>
      </div>`;
    });
    html += `</div>`;

    // Developing
    if (developing.length > 0) {
      html += `<div class="trend-section"><h2>◐ Developing Stories</h2>`;
      developing.forEach(s => {
        html += `<div class="trend-item developing" onclick="App.openStory('${s.id}')">
          <div class="trend-info"><span class="trend-cat" style="color:${getCatColor(s.category)}">${s.category}</span><h3>${s.headline}</h3>${Verification.getStatusBadge('developing')}</div>
        </div>`;
      });
      html += `</div>`;
    }

    // Trending creators
    html += `<div class="trend-section"><h2>Trending Creators</h2>`;
    trendingCreators.forEach(c => {
      html += `<div class="trend-creator" onclick="App.showCreatorProfile('${c.id}')">
        <span class="tc-avatar">${c.avatar}</span>
        <div class="tc-info"><strong>${c.name}</strong>${c.verified ? ' 🔵' : ''}<br><span>${c.username} · ${formatNum(c.followers)} followers</span></div>
        <button class="btn-follow-sm ${Storage.isFollowing(c.id) ? 'following' : ''}" onclick="event.stopPropagation(); App.toggleFollowCreator('${c.id}', this)">${Storage.isFollowing(c.id) ? 'Following' : 'Follow'}</button>
      </div>`;
    });
    html += `</div></div>`;

    panel.innerHTML = html;
  }

  // ====== SEARCH ======
  function renderSearch() {
    const panel = document.getElementById('view-search');
    const recent = Storage.getSearches();
    let html = `<div class="search-view">
      <div class="search-bar-full"><input type="text" id="search-input" placeholder="Search stories, creators, topics..." oninput="App.handleSearch(this.value)" autocomplete="off"><button class="search-clear" onclick="document.getElementById('search-input').value=''; App.renderSearch();">✕</button></div>`;

    if (recent.length > 0) {
      html += `<div class="recent-searches"><div class="rs-header"><h3>Recent</h3><button onclick="Storage.clearSearches(); App.renderSearch();">Clear</button></div>`;
      recent.forEach(q => {
        html += `<button class="recent-q" onclick="document.getElementById('search-input').value='${q}'; App.handleSearch('${q}');">${q}</button>`;
      });
      html += `</div>`;
    }

    html += `<div id="search-results"></div></div>`;
    panel.innerHTML = html;
    setTimeout(() => {
      const inp = document.getElementById('search-input');
      if (inp) inp.focus();
    }, 100);
  }

  function handleSearch(query) {
    if (query.length < 2) {
      document.getElementById('search-results').innerHTML = '';
      return;
    }
    Storage.addSearch(query);
    const results = Feed.search(query);
    let html = '';

    if (results.stories.length > 0) {
      html += `<div class="sr-section"><h3>📰 Stories</h3>`;
      results.stories.forEach(s => {
        html += `<div class="sr-item" onclick="App.openStory('${s.id}')"><span class="sr-cat" style="color:${getCatColor(s.category)}">${s.category}</span><p>${s.headline}</p></div>`;
      });
      html += `</div>`;
    }

    if (results.creators.length > 0) {
      html += `<div class="sr-section"><h3>✍️ Creators</h3>`;
      results.creators.forEach(c => {
        html += `<div class="sr-item" onclick="App.showCreatorProfile('${c.id}')"><span class="sr-avatar">${c.avatar}</span><div><strong>${c.name}</strong>${c.verified ? ' 🔵' : ''}<br><span>${c.username}</span></div></div>`;
      });
      html += `</div>`;
    }

    if (results.stories.length === 0 && results.creators.length === 0) {
      html = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No results</h3><p>Try another topic, creator or story.</p></div>`;
    }

    document.getElementById('search-results').innerHTML = html;
  }

  // ====== NOTIFICATIONS ======
  function renderNotifications() {
    const panel = document.getElementById('view-notifications');
    const notifs = NotificationsModule.getAll();

    let html = `<div class="notif-view"><div class="notif-header"><h1>Notifications</h1><button onclick="NotificationsModule.markAllRead(); App.updateNotificationBadge(); App.renderNotifications();">Mark all read</button></div>`;

    if (notifs.length === 0) {
      html += `<div class="empty-state"><div class="empty-icon">🔔</div><h3>You're all caught up</h3><p>No new notifications.</p></div>`;
    } else {
      notifs.forEach(n => {
        html += `<div class="notif-item ${n.read ? 'read' : ''}" onclick="NotificationsModule.markRead('${n.id}'); App.updateNotificationBadge(); this.classList.add('read');">
          <span class="notif-icon">${n.icon}</span>
          <div class="notif-body"><strong>${n.title}</strong><p>${n.body}</p><span class="notif-time">${n.time}</span></div>
          ${!n.read ? '<span class="notif-dot"></span>' : ''}
        </div>`;
      });
    }

    html += `</div>`;
    panel.innerHTML = html;
  }

  // ====== LOGOUT ======
  function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
      Auth.logout();
    }
  }

  // ====== TOAST ======
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2500);
  }

  // ====== HELPERS ======
  function getCatColor(cat) {
    const colors = {
      'AI': '#818cf8', 'Technology': '#06b6d4', 'Science': '#a855f7', 'Business': '#22c55e',
      'Sports': '#f97316', 'Gaming': '#ec4899', 'World': '#3b82f6', 'India': '#f59e0b',
      'Education': '#eab308', 'Space': '#8b5cf6', 'Finance': '#10b981', 'Startups': '#f43f5e',
      'Entertainment': '#d946ef'
    };
    return colors[cat] || '#6b7280';
  }

  function formatNum(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  function renderCreatorsFeed(container) {
    const creators = CreatorsData;
    let html = `<div class="creators-feed">`;
    creators.forEach(c => {
      if (c.recentPosts) {
        c.recentPosts.forEach(p => {
          html += `<div class="creator-post-card">
            <div class="cpc-header" onclick="App.showCreatorProfile('${c.id}')">
              <span class="cpc-avatar">${c.avatar}</span>
              <div><strong>${c.name}</strong>${c.verified ? ' 🔵' : ''}<br><span class="cpc-user">${c.username} · ${p.time}</span></div>
            </div>
            <h3>${p.headline}</h3>
            <p>${p.summary}</p>
            <div class="cpc-footer"><span class="nc-category" style="color:${getCatColor(p.category)}">${p.category}</span><span>❤️ ${p.likes}</span></div>
          </div>`;
        });
      }
    });
    html += `</div>`;
    container.innerHTML = html;
  }

  // ====== KEYBOARD & SWIPE ======
  function setupSwipe() {
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      if (currentView !== 'home' && currentView !== 'trending') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        scrollToNextCard();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        scrollToPrevCard();
      }
    });
  }

  function scrollToNextCard() {
    const cards = document.querySelectorAll('.news-card');
    if (cards.length === 0) return;
    currentStoryIndex = Math.min(currentStoryIndex + 1, cards.length - 1);
    cards[currentStoryIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (currentStories[currentStoryIndex]) Storage.addHistory(currentStories[currentStoryIndex].category);
  }

  function scrollToPrevCard() {
    const cards = document.querySelectorAll('.news-card');
    if (cards.length === 0) return;
    currentStoryIndex = Math.max(currentStoryIndex - 1, 0);
    cards[currentStoryIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ====== INIT ======
  document.addEventListener('DOMContentLoaded', () => {
    init();
    setupSwipe();
  });

  return {
    navigateTo, switchCategory, openStory, closeStory,
    toggleLike, toggleSave, shareStory, notInterested,
    showExplain, getExplanation, closeExplain,
    showSources, closeSources,
    reportContent, submitReport, closeReport,
    toggleSignalMode,
    showCreatorProfile, closeCreatorProfile, toggleFollowCreator,
    submitPost, removeSaved,
    showEditProfile, saveProfile, showEditInterests, saveInterests, closeEdit,
    showDashboard, closeDashboard, showAbout, closeAbout,
    handleSearch, renderSearch, renderNotifications, updateNotificationBadge,
    handleLoginSubmit, handleOTPVerify, handleResendOTP, handleBuildFeed, handleLogout,
    showToast, renderHome
  };
})();
