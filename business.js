/* ===================================================
   APNA INFLUENCER — BUSINESS APP LOGIC
   =================================================== */

const CREATORS = [
  { handle: '@aman_clicks',      followers: '14.2K', engagement: '5.4%', views: '9.8K',  distance: 0.8, link: 'https://instagram.com' },
  { handle: '@sneha_bites',      followers: '28.0K', engagement: '4.1%', views: '18.5K', distance: 1.4, link: 'https://instagram.com' },
  { handle: '@delhi_unexplored', followers: '8.5K',  engagement: '6.8%', views: '5.2K',  distance: 2.3, link: 'https://instagram.com' },
  { handle: '@fitness_with_raj', followers: '42.1K', engagement: '3.2%', views: '29.0K', distance: 3.1, link: 'https://instagram.com' }
];

document.addEventListener('DOMContentLoaded', renderFeed);

function renderFeed() {
  const feed   = document.getElementById('influencer-feed-list');
  const sorted = [...CREATORS].sort((a, b) => a.distance - b.distance);

  feed.innerHTML = sorted.map(c => `
    <div class="feed-card">
      <div class="card-top">
        <div class="creator-identity">
          <h4>${c.handle}</h4>
          <span><i class="fa-brands fa-instagram"></i> Instagram Creator</span>
        </div>
        <span class="distance-tag">${c.distance} km away</span>
      </div>
      <div class="metrics-grid">
        <div class="metric-box">
          <label>Followers</label>
          <p>${c.followers}</p>
        </div>
        <div class="metric-box">
          <label>Engagement</label>
          <p>${c.engagement}</p>
        </div>
        <div class="metric-box">
          <label>Avg Views</label>
          <p>${c.views}</p>
        </div>
      </div>
      <a href="${c.link}" target="_blank" rel="noopener" class="btn-instagram">
        <i class="fa-brands fa-instagram"></i> View Instagram Profile
      </a>
    </div>
  `).join('');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
