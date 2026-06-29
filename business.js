/* ===================================================
   APNA INFLUENCER — BUSINESS APP LOGIC
   =================================================== */

// ─────────────────────────────────────────────────────
// MOCK DATA — CREATORS
// ─────────────────────────────────────────────────────
const CREATORS = [
  {
    handle: '@aman_clicks',
    niche: 'Food & Lifestyle',
    followers: '14.2K', followersNum: 14200,
    engagement: '5.4%',
    views: '9.8K',      viewsNum: 9800,
    distance: 0.8,
    minPrice: 1500,
    link: 'https://instagram.com'
  },
  {
    handle: '@sneha_bites',
    niche: 'Food & Beverage',
    followers: '28.0K', followersNum: 28000,
    engagement: '4.1%',
    views: '18.5K',     viewsNum: 18500,
    distance: 1.4,
    minPrice: 3000,
    link: 'https://instagram.com'
  },
  {
    handle: '@delhi_unexplored',
    niche: 'Travel',
    followers: '8.5K',  followersNum: 8500,
    engagement: '6.8%',
    views: '5.2K',      viewsNum: 5200,
    distance: 2.3,
    minPrice: 800,
    link: 'https://instagram.com'
  },
  {
    handle: '@fitness_with_raj',
    niche: 'Fitness',
    followers: '42.1K', followersNum: 42100,
    engagement: '3.2%',
    views: '29.0K',     viewsNum: 29000,
    distance: 3.1,
    minPrice: 4500,
    link: 'https://instagram.com'
  }
];

// ─────────────────────────────────────────────────────
// MOCK DATA — PROJECTS (business side)
// ─────────────────────────────────────────────────────
const BIZ_PROJECTS = [
  {
    id: 'bp1',
    creatorHandle: '@aman_clicks',
    creatorColor: '#f97316',
    offerType: 'Reel',
    price: 2000,
    status: 'in_progress',
    deadline: '2026-07-05',
    chatId: 'bc1',
    briefNote: 'Feature our cold brew launch. Café vibe, 30-45 sec reel, natural lighting preferred.'
  },
  {
    id: 'bp2',
    creatorHandle: '@sneha_bites',
    creatorColor: '#ec4899',
    offerType: 'Feed Post',
    price: 3000,
    status: 'delivered',
    deadline: '2026-06-27',
    chatId: 'bc2',
    deliveredDate: '2026-06-26'
  },
  {
    id: 'bp3',
    creatorHandle: '@delhi_unexplored',
    creatorColor: '#6366f1',
    offerType: 'Stories',
    price: 800,
    status: 'brief_sent',
    deadline: '2026-07-12',
    chatId: 'bc3',
    briefNote: 'Promote our monsoon menu. 3-slide Stories with swipe-up link to our menu page.'
  }
];

// ─────────────────────────────────────────────────────
// MOCK DATA — CHATS (business side)
// ─────────────────────────────────────────────────────
const BIZ_CHATS = [
  {
    id: 'bc1',
    creatorHandle: '@aman_clicks',
    creatorInitial: 'A',
    creatorColor: '#f97316',
    offerType: 'Reel',
    offerPrice: 2000,
    unread: false,
    messages: [
      { from: 'me',      text: "Hey! We'd love a Reel for our cold brew launch. Budget ₹2,000 — does that work?", time: '10:30 AM' },
      { from: 'creator', text: "Hi! I love cold brew! Happy to do it. Can I visit the café on Friday?", time: '10:45 AM' },
      { from: 'me',      text: "Friday works perfectly! Come at 4 PM and we'll have everything set up.", time: '11:00 AM' },
      { from: 'creator', text: "Confirmed for Friday 4 PM. I'll send the reel draft by Sunday.", time: '11:10 AM' }
    ]
  },
  {
    id: 'bc2',
    creatorHandle: '@sneha_bites',
    creatorInitial: 'S',
    creatorColor: '#ec4899',
    offerType: 'Feed Post',
    offerPrice: 3000,
    unread: true,
    messages: [
      { from: 'me',      text: "Hi Sneha! We're launching our summer menu and would love a Feed Post.", time: 'Yesterday' },
      { from: 'creator', text: "Sounds amazing! I visited and the food was incredible. Sending the post draft now.", time: 'Yesterday' },
      { from: 'me',      text: "We're reviewing it — looks great so far!", time: 'Yesterday' },
      { from: 'creator', text: "The post is live! Already getting great comments. Hope it drives footfall!", time: '2 hrs ago' }
    ]
  },
  {
    id: 'bc3',
    creatorHandle: '@delhi_unexplored',
    creatorInitial: 'D',
    creatorColor: '#6366f1',
    offerType: 'Stories',
    offerPrice: 800,
    unread: true,
    messages: [
      { from: 'me',      text: "Hi! Sent you a brief for Stories around our monsoon menu. Please check!", time: '3 hrs ago' }
    ]
  }
];

// ─────────────────────────────────────────────────────
// STATUS MAP (business projects)
// ─────────────────────────────────────────────────────
const BIZ_STATUS_MAP = {
  brief_sent:  { label: 'Brief Sent',   cls: 'status-brief',      icon: 'fa-paper-plane' },
  in_progress: { label: 'In Progress',  cls: 'status-active',     icon: 'fa-rotate' },
  delivered:   { label: 'Review',       cls: 'status-near-deadline', icon: 'fa-eye' },
  approved:    { label: 'Approved',     cls: 'status-delivered',  icon: 'fa-circle-check' },
  completed:   { label: 'Completed',    cls: 'status-completed',  icon: 'fa-trophy' }
};

// ─────────────────────────────────────────────────────
// FILTERS
// ─────────────────────────────────────────────────────
const FILTERS = [
  { id: 'distance', label: 'Nearest First',     icon: 'fa-location-dot',      intro: 'Creators near you, closest first.' },
  { id: 'reach',    label: 'Best Reach',         icon: 'fa-chart-simple',      intro: 'Creators sorted by highest reach.' },
  { id: 'price',    label: 'Price: Low to High', icon: 'fa-indian-rupee-sign', intro: 'Creators sorted by lowest package price.' }
];

// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
let currentFilter  = 'distance';
let currentBizTab  = 'discover';
let activeBizChat  = null;
let bizProjects    = [];
let bizChats       = [];

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bizProjects = JSON.parse(JSON.stringify(BIZ_PROJECTS));
  bizChats    = JSON.parse(JSON.stringify(BIZ_CHATS));
  bizTab('discover');
});

// ─────────────────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────────────────
function bizTab(tab) {
  currentBizTab = tab;
  ['discover', 'projects', 'messages', 'account'].forEach(t => {
    document.getElementById(`biz-nav-${t}`)?.classList.toggle('active', t === tab);
  });
  updateBizBadges();
  const content = document.getElementById('biz-tab-content');
  switch (tab) {
    case 'discover':  content.innerHTML = renderBizDiscover();  break;
    case 'projects':  content.innerHTML = renderBizProjects();  break;
    case 'messages':  content.innerHTML = renderBizMessages();  break;
    case 'account':   content.innerHTML = renderBizAccount();   break;
  }
}

function updateBizBadges() {
  const unreadCount = bizChats.filter(c => c.unread).length;
  const badge = document.getElementById('badge-messages');
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  const actionCount = bizProjects.filter(p => p.status === 'delivered').length;
  const projBadge = document.getElementById('badge-projects');
  if (projBadge) {
    if (actionCount > 0) {
      projBadge.textContent = actionCount;
      projBadge.classList.remove('hidden');
    } else {
      projBadge.classList.add('hidden');
    }
  }
}

// ─────────────────────────────────────────────────────
// DISCOVER TAB
// ─────────────────────────────────────────────────────
function setFilter(id) {
  currentFilter = id;
  bizTab('discover');
}

function renderBizDiscover() {
  let sorted = [...CREATORS];
  if (currentFilter === 'distance') sorted.sort((a, b) => a.distance - b.distance);
  else if (currentFilter === 'reach') sorted.sort((a, b) => b.viewsNum - a.viewsNum);
  else if (currentFilter === 'price') sorted.sort((a, b) => a.minPrice - b.minPrice);

  const intro = FILTERS.find(f => f.id === currentFilter)?.intro || '';
  const filterBar = FILTERS.map(f => `
    <button class="filter-chip${f.id === currentFilter ? ' filter-chip-active' : ''}" onclick="setFilter('${f.id}')">
      <i class="fa-solid ${f.icon}"></i> ${f.label}
    </button>`).join('');

  const cards = sorted.map(c => `
    <div class="feed-card">
      <div class="card-top">
        <div class="creator-identity">
          <h4>${c.handle}</h4>
          <span><i class="fa-brands fa-instagram"></i> ${c.niche}</span>
        </div>
        <span class="distance-tag"><i class="fa-solid fa-location-dot"></i> ${c.distance} km</span>
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
        <div class="metric-box${currentFilter === 'price' ? ' metric-highlight' : ''}">
          <label>Starting at</label>
          <p>₹${c.minPrice.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <a href="${c.link}" target="_blank" rel="noopener" class="btn-instagram">
        <i class="fa-brands fa-instagram"></i> View Profile
      </a>
    </div>`).join('');

  return `
    <p class="dashboard-intro">${intro}</p>
    <div class="filter-bar">${filterBar}</div>
    <div class="feed-list">${cards}</div>`;
}

// ─────────────────────────────────────────────────────
// PROJECTS TAB
// ─────────────────────────────────────────────────────
function renderBizProjects() {
  const typeIcon = { Reel: 'fa-circle-play', 'Feed Post': 'fa-image', Stories: 'fa-layer-group' };
  const typeCls  = { Reel: 'pkg-icon-reel',  'Feed Post': 'pkg-icon-post', Stories: 'pkg-icon-stories' };

  if (!bizProjects.length) return `
    <div class="empty-state">
      <i class="fa-solid fa-briefcase"></i>
      <p>No active projects</p>
      <small>Book a creator from Discover to start a campaign</small>
    </div>`;

  // Group: needs action first (delivered = needs review), then in_progress, brief_sent, completed
  const ORDER = ['delivered', 'in_progress', 'brief_sent', 'approved', 'completed'];
  const sorted = [...bizProjects].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status));

  const cards = sorted.map(p => {
    const st   = BIZ_STATUS_MAP[p.status] || BIZ_STATUS_MAP.brief_sent;
    const due  = p.deadline ? new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : null;
    const ico  = typeIcon[p.offerType] || 'fa-circle-play';
    const cls  = typeCls[p.offerType]  || 'pkg-icon-reel';

    const briefSnippet = p.briefNote ? `
      <div class="biz-brief-snippet">
        <i class="fa-solid fa-file-lines"></i>
        <p>${p.briefNote.length > 75 ? p.briefNote.slice(0, 75) + '...' : p.briefNote}</p>
      </div>` : '';

    const deliveredDate = p.deliveredDate
      ? new Date(p.deliveredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      : null;

    const deadlineBadge = p.status === 'delivered'
      ? `<span class="deadline-badge badge-soon"><i class="fa-solid fa-eye"></i> Awaiting your review</span>`
      : p.status === 'completed' && deliveredDate
        ? `<span class="deadline-badge badge-done"><i class="fa-solid fa-check"></i> Done ${deliveredDate}</span>`
        : due
          ? `<span class="deadline-badge badge-normal"><i class="fa-regular fa-calendar"></i> Due ${due}</span>`
          : '';

    const actions = buildBizProjectActions(p);

    return `
      <div class="biz-project-card biz-card-${p.status}">
        <div class="biz-proj-top">
          <div class="project-biz">
            <div class="biz-avatar" style="background:${p.creatorColor};color:#fff;">${p.creatorHandle[1].toUpperCase()}</div>
            <div>
              <p class="biz-name">${p.creatorHandle}</p>
              <p class="biz-city">Instagram Creator</p>
            </div>
          </div>
          <span class="status-chip ${st.cls}">
            <i class="fa-solid ${st.icon}"></i> ${st.label}
          </span>
        </div>
        <div class="project-details">
          <span class="project-offer-type">
            <span class="pkg-icon-wrap ${cls}" style="width:22px;height:22px;border-radius:5px;display:inline-flex;">
              <i class="fa-solid ${ico}" style="font-size:10px;"></i>
            </span>
            ${p.offerType}
          </span>
          <span class="project-price">₹${p.price.toLocaleString('en-IN')}</span>
          ${deadlineBadge}
        </div>
        ${briefSnippet}
        <div class="project-actions">${actions}</div>
      </div>`;
  }).join('');

  return `
    <div class="biz-section-header">
      <span>Active Campaigns</span>
      <span class="biz-section-count">${bizProjects.filter(p => !['completed'].includes(p.status)).length} active</span>
    </div>
    <div class="feed-list">${cards}</div>`;
}

function buildBizProjectActions(p) {
  const msgBtn = `<button class="act-btn act-msg" onclick="openBizChat('${p.chatId}')"><i class="fa-solid fa-message"></i> Message</button>`;
  if (p.status === 'brief_sent') {
    return msgBtn;
  } else if (p.status === 'in_progress') {
    return msgBtn;
  } else if (p.status === 'delivered') {
    return msgBtn +
      `<button class="act-btn act-brief-accept" onclick="bizApproveContent('${p.id}')"><i class="fa-solid fa-circle-check"></i> Approve Content</button>`;
  } else if (p.status === 'approved') {
    return msgBtn +
      `<button class="act-btn act-complete" onclick="bizMarkCompleted('${p.id}')"><i class="fa-solid fa-trophy"></i> Mark Completed</button>`;
  } else if (p.status === 'completed') {
    return `<button class="act-btn act-msg" onclick="openBizChat('${p.chatId}')"><i class="fa-solid fa-rotate-left"></i> Book Again</button>`;
  }
  return msgBtn;
}

function bizApproveContent(id) {
  const p = bizProjects.find(x => x.id === id);
  if (!p) return;
  p.status = 'approved';
  bizTab('projects');
  showBizToast('Content approved! Let the creator know.');
}

function bizMarkCompleted(id) {
  const p = bizProjects.find(x => x.id === id);
  if (!p) return;
  p.status = 'completed';
  bizTab('projects');
  showBizToast('Campaign completed!');
}

// ─────────────────────────────────────────────────────
// MESSAGES TAB
// ─────────────────────────────────────────────────────
function renderBizMessages() {
  if (!bizChats.length) return `
    <div class="empty-state">
      <i class="fa-solid fa-message"></i>
      <p>No conversations yet</p>
      <small>Messages with creators will appear here once you connect</small>
    </div>`;

  const offerIcon = { Reel: 'fa-circle-play', 'Feed Post': 'fa-image', Stories: 'fa-layer-group' };

  const items = bizChats.map(c => {
    const last    = c.messages[c.messages.length - 1];
    const preview = last.text.length > 52 ? last.text.slice(0, 52) + '…' : last.text;
    return `
      <div class="chat-list-item${c.unread ? ' chat-unread' : ''}" onclick="openBizChat('${c.id}')">
        <div class="chat-avatar" style="background:${c.creatorColor}">${c.creatorInitial}</div>
        <div class="chat-list-content">
          <div class="chat-list-top">
            <p class="chat-biz-name">${c.creatorHandle}</p>
            <span class="chat-time">${last.time}</span>
          </div>
          <span class="chat-offer-tag">
            <i class="fa-solid ${offerIcon[c.offerType] || 'fa-tag'}"></i>
            ${c.offerType} · ₹${c.offerPrice.toLocaleString('en-IN')}
          </span>
          <p class="chat-preview${c.unread ? ' chat-preview-unread' : ''}">${last.from === 'me' ? 'You: ' : ''}${preview}</p>
        </div>
        ${c.unread ? '<div class="unread-dot"></div>' : ''}
      </div>`;
  }).join('');

  return `<div class="tab-section chat-list">${items}</div>`;
}

// ─────────────────────────────────────────────────────
// ACCOUNT TAB
// ─────────────────────────────────────────────────────
function renderBizAccount() {
  const totalSpend = bizProjects
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.price, 0);
  const activeCount = bizProjects.filter(p => !['completed'].includes(p.status)).length;

  return `
    <div class="biz-account-card">
      <div class="biz-account-top">
        <div class="biz-account-avatar">C</div>
        <div>
          <p class="biz-account-name">Chai Wala Café</p>
          <p class="biz-account-meta"><i class="fa-solid fa-location-dot"></i> Delhi · Café &amp; Restaurant</p>
        </div>
      </div>
      <div class="biz-stats-row">
        <div class="biz-stat">
          <p>${bizProjects.length}</p>
          <span>Total Campaigns</span>
        </div>
        <div class="biz-stat">
          <p>${activeCount}</p>
          <span>Active Now</span>
        </div>
        <div class="biz-stat">
          <p>${totalSpend > 0 ? '₹' + totalSpend.toLocaleString('en-IN') : '—'}</p>
          <span>Total Spent</span>
        </div>
      </div>
    </div>

    <div class="biz-section-header" style="margin-top:20px;">
      <span>Business Details</span>
    </div>
    <div class="biz-detail-card">
      <div class="biz-detail-row"><span>Business Name</span><strong>Chai Wala Café</strong></div>
      <div class="biz-detail-row"><span>Category</span><strong>Café &amp; Restaurant</strong></div>
      <div class="biz-detail-row"><span>City</span><strong>Delhi</strong></div>
      <div class="biz-detail-row"><span>Instagram</span><strong>@chaiwala.official</strong></div>
    </div>

    <div class="profile-actions" style="margin-top:16px;">
      <button class="act-btn act-delete" style="flex:1" onclick="bizLogOut()">
        <i class="fa-solid fa-right-from-bracket"></i> Log Out
      </button>
    </div>`;
}

function bizLogOut() {
  if (!confirm('Log out of the business account?')) return;
  window.location.href = 'index.html';
}

// ─────────────────────────────────────────────────────
// CHAT DETAIL
// ─────────────────────────────────────────────────────
function openBizChat(chatId) {
  activeBizChat = bizChats.find(c => c.id === chatId);
  if (!activeBizChat) return;
  activeBizChat.unread = false;
  updateBizBadges();

  const c = activeBizChat;
  document.getElementById('biz-chat-header-info').innerHTML = `
    <div class="chat-avatar sm" style="background:${c.creatorColor}">${c.creatorInitial}</div>
    <p>${c.creatorHandle}</p>`;
  document.getElementById('biz-chat-offer-banner').innerHTML = `
    <i class="fa-solid fa-tag"></i>
    Re: <strong>${c.offerType}</strong> · ₹${c.offerPrice.toLocaleString('en-IN')}`;

  rebuildBizChatMessages();
  document.getElementById('biz-chat-input').value = '';
  document.getElementById('bv-dash').classList.add('hidden');
  document.getElementById('bv-chat').classList.remove('hidden');
  window.scrollTo(0, 0);
}

function closeBizChat() {
  document.getElementById('bv-chat').classList.add('hidden');
  document.getElementById('bv-dash').classList.remove('hidden');
  bizTab(currentBizTab);
}

function rebuildBizChatMessages() {
  const c   = activeBizChat;
  const box = document.getElementById('biz-chat-messages');
  box.innerHTML = c.messages.map(m => `
    <div class="msg-bubble ${m.from === 'me' ? 'msg-me' : 'msg-them'}">
      <p>${m.text}</p>
      <span class="msg-time">${m.time}</span>
    </div>`).join('');
  setTimeout(() => { box.scrollTop = box.scrollHeight; }, 30);
}

function handleBizChatEnter(e) { if (e.key === 'Enter') sendBizMessage(); }

function sendBizMessage() {
  if (!activeBizChat) return;
  const input = document.getElementById('biz-chat-input');
  const text  = (input.value || '').trim();
  if (!text) return;
  const now  = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  activeBizChat.messages.push({ from: 'me', text, time });
  input.value = '';
  rebuildBizChatMessages();
}

// ─────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────
let _bizToastTimer;
function showBizToast(msg) {
  const el = document.getElementById('biz-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(_bizToastTimer);
  _bizToastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
