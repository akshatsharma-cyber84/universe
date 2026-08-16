// verification.js — Verification system for NEWSer
const Verification = (() => {
  const statusConfig = {
    verified: { label: 'Verified', icon: '✓', cls: 'v-verified', desc: 'Information corroborated by multiple sources' },
    developing: { label: 'Developing', icon: '◐', cls: 'v-developing', desc: 'Story is still evolving' },
    unconfirmed: { label: 'Needs Confirmation', icon: '⚠', cls: 'v-unconfirmed', desc: 'Insufficient confirmation from sources' }
  };

  const creatorLevels = {
    'Reader': { icon: '👤', color: '#888' },
    'Contributor': { icon: '✍️', color: '#6bb7e0' },
    'Trusted Contributor': { icon: '⭐', color: '#f0c040' },
    'Verified Creator': { icon: '🔵', color: '#4a9eff' },
    'Featured Creator': { icon: '💎', color: '#a855f7' }
  };

  function getStatusBadge(status) {
    const cfg = statusConfig[status] || statusConfig.unconfirmed;
    return `<span class="verification-badge ${cfg.cls}" title="${cfg.desc}"><span class="v-icon">${cfg.icon}</span> ${cfg.label}</span>`;
  }

  function getCreatorBadge(level, verified) {
    const lvl = creatorLevels[level] || creatorLevels['Reader'];
    let html = '';
    if (verified) html += '<span class="creator-verified-badge" title="Verified Creator — Identity confirmed">🔵</span>';
    return html;
  }

  function getReputationColor(score) {
    if (score >= 95) return '#22c55e';
    if (score >= 90) return '#4ade80';
    if (score >= 85) return '#facc15';
    if (score >= 80) return '#fb923c';
    return '#ef4444';
  }

  return { getStatusBadge, getCreatorBadge, getReputationColor, statusConfig, creatorLevels };
})();
