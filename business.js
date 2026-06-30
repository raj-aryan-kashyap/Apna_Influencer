/* ===================================================
   APNA INFLUENCER — BUSINESS APP LOGIC
   =================================================== */

// ─────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────
const BIZ_CATEGORIES = [
  { value: 'Café & Restaurant',  icon: 'fa-utensils',        label: 'Café & Food',   color: '#f97316' },
  { value: 'Clothing & Fashion', icon: 'fa-shirt',           label: 'Fashion',        color: '#8b5cf6' },
  { value: 'Beauty & Wellness',  icon: 'fa-spa',             label: 'Beauty',         color: '#ec4899' },
  { value: 'Fitness & Gym',      icon: 'fa-dumbbell',        label: 'Fitness',        color: '#10b981' },
  { value: 'Grocery & Retail',   icon: 'fa-basket-shopping', label: 'Grocery',        color: '#16a34a' },
  { value: 'Electronics',        icon: 'fa-microchip',       label: 'Electronics',    color: '#3b82f6' },
  { value: 'Home & Decor',       icon: 'fa-house',           label: 'Home & Decor',   color: '#f59e0b' },
  { value: 'Education',          icon: 'fa-graduation-cap',  label: 'Education',      color: '#6366f1' },
  { value: 'Healthcare',         icon: 'fa-heart-pulse',     label: 'Healthcare',     color: '#14b8a6' },
  { value: 'Other',              icon: 'fa-store',           label: 'Other',          color: '#6b7280' }
];

// ─────────────────────────────────────────────────────
// MOCK DATA — CREATORS (Discover)
// ─────────────────────────────────────────────────────
const CREATORS = [
  { handle: '@aman_clicks',      niche: 'Food & Beverage',     followers: '14.2K', followersNum: 14200, engagement: '5.4%', views: '9.8K',  viewsNum: 9800,  distance: 0.8, minPrice: 1500, link: 'https://instagram.com' },
  { handle: '@sneha_bites',      niche: 'Food & Beverage',     followers: '28.0K', followersNum: 28000, engagement: '4.1%', views: '18.5K', viewsNum: 18500, distance: 1.4, minPrice: 3000, link: 'https://instagram.com' },
  { handle: '@delhi_unexplored', niche: 'Travel',              followers: '8.5K',  followersNum: 8500,  engagement: '6.8%', views: '5.2K',  viewsNum: 5200,  distance: 2.3, minPrice: 800,  link: 'https://instagram.com' },
  { handle: '@fitness_with_raj', niche: 'Fitness & Health',    followers: '42.1K', followersNum: 42100, engagement: '3.2%', views: '29.0K', viewsNum: 29000, distance: 3.1, minPrice: 4500, link: 'https://instagram.com' },
  { handle: '@priya_glows',      niche: 'Beauty & Skincare',   followers: '19.3K', followersNum: 19300, engagement: '6.1%', views: '12.4K', viewsNum: 12400, distance: 1.9, minPrice: 2200, link: 'https://instagram.com' },
  { handle: '@gaurav_tech',      niche: 'Tech & Gadgets',      followers: '31.0K', followersNum: 31000, engagement: '3.8%', views: '22.1K', viewsNum: 22100, distance: 4.2, minPrice: 3500, link: 'https://instagram.com' },
  { handle: '@meera_interiors',  niche: 'Home & Decor',        followers: '11.5K', followersNum: 11500, engagement: '5.9%', views: '7.8K',  viewsNum: 7800,  distance: 2.7, minPrice: 1800, link: 'https://instagram.com' },
  { handle: '@rohan_style',      niche: 'Fashion & Lifestyle', followers: '24.6K', followersNum: 24600, engagement: '4.5%', views: '16.0K', viewsNum: 16000, distance: 3.5, minPrice: 2800, link: 'https://instagram.com' },
  { handle: '@neha_entertains',  niche: 'Entertainment',       followers: '38.2K', followersNum: 38200, engagement: '5.2%', views: '27.5K', viewsNum: 27500, distance: 5.0, minPrice: 4000, link: 'https://instagram.com' }
];

// ─────────────────────────────────────────────────────
// MOCK DATA — PROJECTS (business side)
// ─────────────────────────────────────────────────────
const BIZ_PROJECTS_SEED = [
  { id: 'bp1', creatorHandle: '@aman_clicks',      creatorColor: '#f97316', offerType: 'Reel',      price: 2000, status: 'in_progress', deadline: '2026-07-05', chatId: 'bc1', briefNote: 'Feature our cold brew launch. Café vibe, 30-45 sec reel, natural lighting preferred.' },
  { id: 'bp2', creatorHandle: '@sneha_bites',      creatorColor: '#ec4899', offerType: 'Feed Post', price: 3000, status: 'delivered',    deadline: '2026-06-27', chatId: 'bc2', deliveredDate: '2026-06-26' },
  { id: 'bp3', creatorHandle: '@delhi_unexplored', creatorColor: '#6366f1', offerType: 'Stories',   price: 800,  status: 'brief_sent',   deadline: '2026-07-12', chatId: 'bc3', briefNote: 'Promote our monsoon menu. 3-slide Stories with swipe-up link to our menu page.' }
];

// ─────────────────────────────────────────────────────
// MOCK DATA — CHATS (business side)
// ─────────────────────────────────────────────────────
const BIZ_CHATS_SEED = [
  {
    id: 'bc1', creatorHandle: '@aman_clicks', creatorInitial: 'A', creatorColor: '#f97316',
    offerType: 'Reel', offerPrice: 2000, unread: false,
    messages: [
      { from: 'me',      text: "Hi! We'd love a Reel for our cold brew launch. Budget ₹2,000 — does that work?", time: '10:30 AM' },
      { from: 'creator', text: "Love cold brew! I'm in. Can I come by on Friday?", time: '10:45 AM' },
      { from: 'me',      text: "Friday works! Come at 4 PM and everything will be ready.", time: '11:00 AM' },
      { from: 'creator', text: "Friday 4 PM confirmed. I'll send you the reel draft by Sunday.", time: '11:10 AM' }
    ]
  },
  {
    id: 'bc2', creatorHandle: '@sneha_bites', creatorInitial: 'S', creatorColor: '#ec4899',
    offerType: 'Feed Post', offerPrice: 3000, unread: true,
    messages: [
      { from: 'me',      text: "Hi Sneha! We're launching our summer menu and need a Feed Post.", time: 'Yesterday' },
      { from: 'creator', text: "Visited the place — the food was incredible. Sending the post draft now!", time: 'Yesterday' },
      { from: 'creator', text: "The post is live! Already seeing great engagement. Hope it brings in footfall.", time: '2 hrs ago' }
    ]
  },
  {
    id: 'bc3', creatorHandle: '@delhi_unexplored', creatorInitial: 'D', creatorColor: '#6366f1',
    offerType: 'Stories', offerPrice: 800, unread: true,
    messages: [
      { from: 'me', text: "Hi! Sent you a brief for Stories around our monsoon menu. Please check and confirm.", time: '3 hrs ago' }
    ]
  }
];

const BIZ_STATUS_MAP = {
  brief_sent:  { label: 'Brief Sent',   cls: 'status-brief',         icon: 'fa-paper-plane' },
  in_progress: { label: 'In Progress',  cls: 'status-active',        icon: 'fa-rotate' },
  delivered:   { label: 'Needs Review', cls: 'status-near-deadline', icon: 'fa-eye' },
  approved:    { label: 'Approved',     cls: 'status-delivered',     icon: 'fa-circle-check' },
  completed:   { label: 'Completed',    cls: 'status-completed',     icon: 'fa-trophy' }
};

// Canonical niche list — mirrors influencer profile creation options
const ALL_NICHES = [
  'Food & Beverage',
  'Fashion & Lifestyle',
  'Fitness & Health',
  'Travel',
  'Beauty & Skincare',
  'Tech & Gadgets',
  'Home & Decor',
  'Entertainment',
  'Other'
];

// Maps business category → closest creator niche
const BIZ_TO_NICHE = {
  'Café & Restaurant':  'Food & Beverage',
  'Clothing & Fashion': 'Fashion & Lifestyle',
  'Beauty & Wellness':  'Beauty & Skincare',
  'Fitness & Gym':      'Fitness & Health',
  'Grocery & Retail':   'Food & Beverage',
  'Electronics':        'Tech & Gadgets',
  'Home & Decor':       'Home & Decor',
  'Education':          null,
  'Healthcare':         'Fitness & Health',
  'Other':              null
};

function defaultNicheForBiz(biz) {
  return BIZ_TO_NICHE[biz?.category] || null;
}

const FILTERS = [
  { id: 'distance', label: 'Nearest First',     icon: 'fa-location-dot',      intro: 'Creators near you, closest first.' },
  { id: 'reach',    label: 'Best Reach',         icon: 'fa-chart-simple',      intro: 'Creators sorted by highest reach.' },
  { id: 'price',    label: 'Price: Low to High', icon: 'fa-indian-rupee-sign', intro: 'Creators sorted by lowest package price.' }
];

// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
let BIZ_AUTH     = null;   // persisted account object
let signupDraft  = {};
let currentFilter      = 'distance';
let currentBizTab      = 'discover';
let currentNiche       = null;   // null = All Niches
let nichePickerOpen    = false;
let activeBizChat  = null;
let bizProjects    = [];
let bizChats       = [];

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildAllCatDropdowns();

  // Outside-click closes category pickers
  document.addEventListener('click', (e) => {
    ['s3', 'ab', 'eb'].forEach(pfx => {
      const picker = document.getElementById(`${pfx}-cat-picker`);
      if (picker && !picker.contains(e.target)) {
        document.getElementById(`${pfx}-cat-dropdown`)?.classList.add('hidden');
        const ar = document.getElementById(`${pfx}-cat-arrow`);
        if (ar) ar.style.transform = '';
      }
    });
  });

  bizProjects = JSON.parse(JSON.stringify(BIZ_PROJECTS_SEED));
  bizChats    = JSON.parse(JSON.stringify(BIZ_CHATS_SEED));

  const saved = localStorage.getItem('biz_auth');
  if (saved) {
    try {
      BIZ_AUTH = JSON.parse(saved);
      loadDashboard();
      return;
    } catch(e) { /* corrupted — start fresh */ }
  }
  renderBizSlide();
  showBizView('bv-slides');
});

// ─────────────────────────────────────────────────────
// ONBOARDING SLIDES
// ─────────────────────────────────────────────────────
const BIZ_SLIDES = [
  { icon: 'fa-magnifying-glass', title: 'Find creators your customers follow', desc: 'Local cafés, boutiques, gyms and studios near you can now book creators who already influence your exact audience.' },
  { icon: 'fa-rocket',           title: 'Launch campaigns in minutes',          desc: 'Send a brief, agree on terms, track delivery. No agencies, no middlemen, no hidden cuts.' },
  { icon: 'fa-chart-line',       title: 'Track every campaign end to end',      desc: 'From brief to delivery in one place. See who delivered, when, and exactly what you paid for.' }
];
let bizSlide = 0;

function renderBizSlide() {
  const sl = BIZ_SLIDES[bizSlide];
  document.getElementById('biz-slide-content').innerHTML = `
    <div class="biz-slide-inner">
      <div class="biz-slide-icon-wrap"><i class="fa-solid ${sl.icon}"></i></div>
      <h2>${sl.title}</h2>
      <p>${sl.desc}</p>
    </div>`;
  document.getElementById('biz-slide-dots').innerHTML =
    BIZ_SLIDES.map((_, i) => `<div class="dot ${i === bizSlide ? 'active biz-dot-active' : ''}"></div>`).join('');
  const btn = document.getElementById('btn-biz-slide-next');
  if (btn) btn.textContent = bizSlide === BIZ_SLIDES.length - 1 ? 'Get Started' : 'Next';
}

function nextBizSlide() {
  if (bizSlide < BIZ_SLIDES.length - 1) { bizSlide++; renderBizSlide(); }
  else skipBizSlides();
}

function skipBizSlides() {
  showBizView('bv-welcome');
}

function buildAllCatDropdowns() {
  ['s3', 'ab', 'eb'].forEach(pfx => {
    const dd = document.getElementById(`${pfx}-cat-dropdown`);
    if (!dd) return;
    dd.innerHTML = BIZ_CATEGORIES.map(c => `
      <button type="button" class="niche-opt"
              onclick="pickCategory('${pfx}', '${c.value}', '${c.icon}', '${c.label}', '${c.color}')">
        <span class="niche-opt-icon" style="background:${c.color}20;color:${c.color};">
          <i class="fa-solid ${c.icon}"></i>
        </span>
        ${c.value}
      </button>`).join('');
  });
}

// ─────────────────────────────────────────────────────
// VIEW MANAGEMENT
// ─────────────────────────────────────────────────────
function showBizView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); window.scrollTo(0, 0); }
}

// ─────────────────────────────────────────────────────
// CATEGORY PICKER
// ─────────────────────────────────────────────────────
function toggleCatPicker(pfx) {
  const dd    = document.getElementById(`${pfx}-cat-dropdown`);
  const arrow = document.getElementById(`${pfx}-cat-arrow`);
  if (!dd) return;
  const opening = dd.classList.contains('hidden');
  dd.classList.toggle('hidden', !opening);
  if (arrow) arrow.style.transform = opening ? 'rotate(180deg)' : '';
  if (opening) setTimeout(() => dd.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function pickCategory(pfx, value, icon, label, color) {
  document.getElementById(`${pfx}-category`).value = value;
  document.getElementById(`${pfx}-caticon`).value  = icon;
  const display = document.getElementById(`${pfx}-cat-display`);
  if (display) display.innerHTML = `
    <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:${color}20;border-radius:5px;">
      <i class="fa-solid ${icon}" style="font-size:11px;color:${color};"></i>
    </span>
    <span>${value}</span>`;
  document.getElementById(`${pfx}-cat-dropdown`)?.classList.add('hidden');
  const arrow = document.getElementById(`${pfx}-cat-arrow`);
  if (arrow) arrow.style.transform = '';
  setFieldErr(`${pfx}-err-cat`, '');
}

// ─────────────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────────────
function setFieldErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}

function validateFullName(v) {
  if (!v || v.trim().length < 2) return 'Enter your full name (at least 2 characters)';
  if (v.trim().length > 60)       return 'Name is too long';
  return null;
}
function validateUsername(v) {
  if (!v || v.length < 3)          return 'Username must be at least 3 characters';
  if (v.length > 20)               return 'Username can be at most 20 characters';
  if (!/^[a-z0-9_]+$/.test(v))    return 'Only lowercase letters, numbers, and _ allowed';
  return null;
}
function validatePassword(v) {
  if (!v || v.length < 8)          return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(v))            return 'Include at least one uppercase letter';
  if (!/[^A-Za-z0-9]/.test(v))    return 'Include at least one symbol (!@#$...)';
  return null;
}
function validateBizName(v) {
  if (!v || v.trim().length < 2)   return 'Enter your business name (at least 2 characters)';
  return null;
}
function validateCity(v) {
  if (!v || v.trim().length < 2)   return 'Enter the city your business is in';
  return null;
}

// ─────────────────────────────────────────────────────
// PASSWORD STRENGTH
// ─────────────────────────────────────────────────────
function togglePwdVis(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  const icon = btn.querySelector('i, svg');
  if (icon) icon.className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
}

function checkPasswordStrength(val) {
  const wrap = document.getElementById('pwd-strength-wrap');
  if (wrap && val.length > 0) wrap.classList.remove('hidden');
  else if (wrap)               wrap.classList.add('hidden');

  const cLen   = val.length >= 8;
  const cUpper = /[A-Z]/.test(val);
  const cNum   = /[0-9]/.test(val);
  const cSym   = /[^A-Za-z0-9]/.test(val);
  const score  = [cLen, cUpper, cNum, cSym].filter(Boolean).length;

  const STRENGTH = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const COLORS   = ['', '#ef4444', '#f97316', '#eab308', '#10b981'];

  const fill  = document.getElementById('pwd-strength-fill');
  const label = document.getElementById('pwd-strength-label');
  if (fill)  { fill.style.width = `${(score / 4) * 100}%`; fill.style.background = COLORS[score]; }
  if (label) { label.textContent = STRENGTH[score]; label.style.color = COLORS[score]; }

  setCriterion('crit-len',   cLen);
  setCriterion('crit-upper', cUpper);
  setCriterion('crit-num',   cNum);
  setCriterion('crit-sym',   cSym);
}

function setCriterion(id, met) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('criterion-met', met);
  const icon = el.querySelector('i, svg');
  if (icon) icon.className = met ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle';
}

// ─────────────────────────────────────────────────────
// SIGNUP FLOW
// ─────────────────────────────────────────────────────
function signupGoS2() {
  const name     = document.getElementById('s1-name').value.trim();
  const username = document.getElementById('s1-username').value.trim();
  const eN  = validateFullName(name);
  const eU  = validateUsername(username);
  setFieldErr('s1-err-name',     eN);
  setFieldErr('s1-err-username', eU);
  if (eN || eU) return;
  signupDraft.personalName = name;
  signupDraft.username     = username;
  showBizView('bv-s2');
}

function signupGoS3() {
  const pwd     = document.getElementById('s2-password').value;
  const confirm = document.getElementById('s2-confirm').value;
  const eP = validatePassword(pwd);
  setFieldErr('s2-err-pwd', eP);
  if (eP) return;
  if (pwd !== confirm) { setFieldErr('s2-err-confirm', "Passwords don't match"); return; }
  setFieldErr('s2-err-confirm', '');
  signupDraft.password = pwd;
  showBizView('bv-s3');
}

function signupFinish() {
  const bizname  = document.getElementById('s3-bizname').value.trim();
  const category = document.getElementById('s3-category').value;
  const caticon  = document.getElementById('s3-caticon').value;
  const city     = document.getElementById('s3-city').value.trim();
  const eB = validateBizName(bizname);
  const eC = !category ? 'Select a category for your business' : null;
  const eCi = validateCity(city);
  setFieldErr('s3-err-bizname', eB);
  setFieldErr('s3-err-cat',     eC);
  setFieldErr('s3-err-city',    eCi);
  if (eB || eC || eCi) return;

  const catData = BIZ_CATEGORIES.find(c => c.value === category) || BIZ_CATEGORIES[9];

  BIZ_AUTH = {
    username:     signupDraft.username,
    personalName: signupDraft.personalName,
    password:     signupDraft.password,
    businesses: [{
      id:       'biz_' + Date.now(),
      name:     bizname,
      category: category,
      icon:     caticon || catData.icon,
      color:    catData.color,
      city:     city
    }],
    activeBizId: null
  };
  BIZ_AUTH.activeBizId = BIZ_AUTH.businesses[0].id;

  saveBizAuth();
  loadDashboard();
  showBizToast('Account created! Welcome to Apna Influencer.');
}

// ─────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────
function doLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  setFieldErr('login-err-user',   '');
  setFieldErr('login-err-pwd',    '');
  setFieldErr('login-err-global', '');

  if (!username) { setFieldErr('login-err-user', 'Enter your username'); return; }
  if (!password) { setFieldErr('login-err-pwd',  'Enter your password'); return; }

  const saved = localStorage.getItem('biz_auth');
  if (!saved) { setFieldErr('login-err-global', 'No account found. Please create one first.'); return; }

  let account;
  try { account = JSON.parse(saved); } catch(e) { setFieldErr('login-err-global', 'Something went wrong. Please try again.'); return; }

  if (account.username !== username) { setFieldErr('login-err-user', 'Username not found'); return; }
  if (account.password !== password) { setFieldErr('login-err-pwd',  'Incorrect password'); return; }

  BIZ_AUTH = account;
  loadDashboard();
}

// ─────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────
function loadDashboard() {
  const a   = BIZ_AUTH;
  const biz = a.businesses.find(b => b.id === a.activeBizId) || a.businesses[0];
  if (!a.activeBizId) { a.activeBizId = biz.id; saveBizAuth(); }

  // Personal header
  const avatar = document.getElementById('personal-avatar');
  if (avatar) applyPersonalAvatar(avatar, a);
  document.getElementById('personal-name-display').textContent    = a.personalName;
  document.getElementById('personal-username-display').textContent = '@' + a.username;

  // Business HUD
  updateBizHud(biz);

  // Default niche filter to match active business category
  currentNiche = defaultNicheForBiz(biz);
  nichePickerOpen = false;

  showBizView('bv-dash');
  bizTab('discover');
}

function updateBizHud(biz) {
  if (!biz) return;
  document.getElementById('biz-hud-name').textContent = biz.name;
  document.getElementById('biz-hud-city').textContent = biz.city;
  const iconEl = document.getElementById('biz-hud-icon');
  if (iconEl) {
    if (biz.logo) {
      iconEl.style.background = '#f3f4f6';
      iconEl.style.color      = '';
      iconEl.innerHTML = `<img src="${biz.logo}" alt="${biz.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
    } else {
      iconEl.style.background = (biz.color || '#6366f1') + '20';
      iconEl.style.color      = biz.color || '#6366f1';
      iconEl.innerHTML = `<i class="fa-solid ${biz.icon || 'fa-store'}"></i>`;
    }
  }
}

function saveBizAuth() {
  try { localStorage.setItem('biz_auth', JSON.stringify(BIZ_AUTH)); } catch(e) {}
}

// ─────────────────────────────────────────────────────
// BUSINESS SWITCHER
// ─────────────────────────────────────────────────────
function openSwitcher() {
  const a    = BIZ_AUTH;
  const list = document.getElementById('switcher-list');
  list.innerHTML = a.businesses.map(biz => {
    const isActive = biz.id === a.activeBizId;
    return `
      <div class="switcher-biz-item${isActive ? ' switcher-active' : ''}" onclick="switchBiz('${biz.id}')">
        <div class="switcher-biz-icon" style="background:${biz.color}20;color:${biz.color};">
          <i class="fa-solid ${biz.icon}"></i>
        </div>
        <div class="switcher-biz-info">
          <p>${biz.name}</p>
          <span>${biz.category} · ${biz.city}</span>
        </div>
        ${isActive ? '<i class="fa-solid fa-circle-check switcher-check"></i>' : ''}
      </div>`;
  }).join('');
  document.getElementById('biz-switcher-overlay').classList.remove('hidden');
}

function closeSwitcher() {
  document.getElementById('biz-switcher-overlay').classList.add('hidden');
}

function closeSwitcherOnOverlay(e) {
  if (e.target === document.getElementById('biz-switcher-overlay')) closeSwitcher();
}

function switchBiz(id) {
  BIZ_AUTH.activeBizId = id;
  saveBizAuth();
  const biz = BIZ_AUTH.businesses.find(b => b.id === id);
  updateBizHud(biz);
  currentNiche = defaultNicheForBiz(biz);
  nichePickerOpen = false;
  closeSwitcher();
  if (currentBizTab === 'discover') bizTab('discover');
  showBizToast('Switched to ' + biz.name);
}

// ─────────────────────────────────────────────────────
// ADD BUSINESS
// ─────────────────────────────────────────────────────
function openAddBiz() {
  closeSwitcher();
  // Reset add-biz form
  ['ab-bizname', 'ab-city'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['ab-category', 'ab-caticon'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['ab-err-bizname', 'ab-err-cat', 'ab-err-city'].forEach(id => setFieldErr(id, ''));
  const display = document.getElementById('ab-cat-display');
  if (display) display.innerHTML = `<i class="fa-solid fa-store"></i><span class="niche-placeholder">Select category</span>`;
  showBizView('bv-add-biz');
}

function closeAddBiz() {
  showBizView('bv-dash');
  bizTab(currentBizTab);
}

function saveAddBiz() {
  const bizname  = document.getElementById('ab-bizname').value.trim();
  const category = document.getElementById('ab-category').value;
  const caticon  = document.getElementById('ab-caticon').value;
  const city     = document.getElementById('ab-city').value.trim();
  const eB  = validateBizName(bizname);
  const eC  = !category ? 'Select a category for your business' : null;
  const eCi = validateCity(city);
  setFieldErr('ab-err-bizname', eB);
  setFieldErr('ab-err-cat',     eC);
  setFieldErr('ab-err-city',    eCi);
  if (eB || eC || eCi) return;

  const catData = BIZ_CATEGORIES.find(c => c.value === category) || BIZ_CATEGORIES[9];
  const newBiz = {
    id:       'biz_' + Date.now(),
    name:     bizname,
    category: category,
    icon:     caticon || catData.icon,
    color:    catData.color,
    city:     city
  };
  BIZ_AUTH.businesses.push(newBiz);
  BIZ_AUTH.activeBizId = newBiz.id;
  saveBizAuth();
  updateBizHud(newBiz);
  showBizView('bv-dash');
  bizTab('account');
  showBizToast(newBiz.name + ' added!');
}

// ─────────────────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────────────────
function bizTab(tab) {
  currentBizTab = tab;
  ['discover', 'projects', 'messages', 'account'].forEach(t => {
    const btn = document.getElementById(`biz-nav-${t}`);
    if (!btn) return;
    btn.classList.toggle('active', t === tab);
    if (t === tab) {
      btn.classList.remove('nav-bounce');
      void btn.offsetWidth; // reflow to restart animation
      btn.classList.add('nav-bounce');
    }
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
  const unread = bizChats.filter(c => c.unread).length;
  const badge  = document.getElementById('badge-messages');
  if (badge) {
    badge.textContent = unread;
    badge.classList.toggle('hidden', unread === 0);
  }
  const needsReview = bizProjects.filter(p => p.status === 'delivered').length;
  const projBadge   = document.getElementById('badge-projects');
  if (projBadge) {
    projBadge.textContent = needsReview;
    projBadge.classList.toggle('hidden', needsReview === 0);
  }
}

// ─────────────────────────────────────────────────────
// DISCOVER TAB
// ─────────────────────────────────────────────────────
function setFilter(id) { currentFilter = id; bizTab('discover'); }

function renderBizDiscover() {
  // 1 — Filter by niche (null = all)
  let filtered = currentNiche
    ? CREATORS.filter(c => c.niche === currentNiche)
    : [...CREATORS];

  // 2 — Sort
  if      (currentFilter === 'distance') filtered.sort((a, b) => a.distance - b.distance);
  else if (currentFilter === 'reach')    filtered.sort((a, b) => b.viewsNum - a.viewsNum);
  else if (currentFilter === 'price')    filtered.sort((a, b) => a.minPrice - b.minPrice);

  const niches   = ALL_NICHES;
  const nicheLbl = currentNiche || 'All Niches';
  const nicheChevron = nichePickerOpen ? 'rotate(180deg)' : 'rotate(0deg)';

  // Niche chip (orange accent — it's a filter, not a sort)
  const nicheChip = `
    <button class="filter-chip filter-chip-niche${currentNiche ? ' filter-chip-niche-active' : ''}"
            onclick="toggleNichePicker()">
      <i class="fa-solid fa-tag"></i>
      ${nicheLbl}
      <i class="fa-solid fa-chevron-down" style="transition:transform 0.2s;transform:${nicheChevron};margin-left:2px;"></i>
    </button>`;

  // Sort chips
  const sortChips = FILTERS.map(f => `
    <button class="filter-chip${f.id === currentFilter ? ' filter-chip-active' : ''}" onclick="setFilter('${f.id}')">
      <i class="fa-solid ${f.icon}"></i> ${f.label}
    </button>`).join('');

  // Inline niche picker row
  const nicheRow = nichePickerOpen ? `
    <div class="niche-filter-row">
      <button class="niche-filter-opt${!currentNiche ? ' niche-filter-opt-active' : ''}"
              onclick="setNiche(null)">All Niches</button>
      ${niches.map(n => `
        <button class="niche-filter-opt${currentNiche === n ? ' niche-filter-opt-active' : ''}"
                onclick="setNiche('${n}')">${n}</button>`).join('')}
    </div>` : '';

  const emptyState = filtered.length === 0 ? `
    <div class="empty-state">
      <i class="fa-solid fa-magnifying-glass"></i>
      <p>No creators found</p>
      <small>Try a different niche or remove the filter</small>
    </div>` : '';

  const cards = filtered.map(c => `
    <div class="feed-card">
      <div class="card-top">
        <div class="creator-identity">
          <h4>${c.handle}</h4>
          <span><i class="fa-brands fa-instagram"></i> ${c.niche}</span>
        </div>
        <span class="distance-tag"><i class="fa-solid fa-location-dot"></i> ${c.distance} km</span>
      </div>
      <div class="metrics-grid">
        <div class="metric-box"><label>Followers</label><p>${c.followers}</p></div>
        <div class="metric-box"><label>Engagement</label><p>${c.engagement}</p></div>
        <div class="metric-box"><label>Avg Views</label><p>${c.views}</p></div>
        <div class="metric-box${currentFilter === 'price' ? ' metric-highlight' : ''}">
          <label>Starting at</label><p>₹${c.minPrice.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <a href="${c.link}" target="_blank" rel="noopener" class="btn-instagram">
        <i class="fa-brands fa-instagram"></i> View Profile
      </a>
    </div>`).join('');

  return `
    <div class="filter-bar">${nicheChip}${sortChips}</div>
    ${nicheRow}
    <div class="feed-list">${emptyState}${cards}</div>`;
}

function toggleNichePicker() {
  nichePickerOpen = !nichePickerOpen;
  bizTab('discover');
}

function setNiche(niche) {
  currentNiche = niche;
  nichePickerOpen = false;
  bizTab('discover');
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

  const ORDER = ['delivered', 'in_progress', 'brief_sent', 'approved', 'completed'];
  const sorted = [...bizProjects].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status));

  const cards = sorted.map(p => {
    const st  = BIZ_STATUS_MAP[p.status] || BIZ_STATUS_MAP.brief_sent;
    const due = p.deadline ? new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : null;
    const ico = typeIcon[p.offerType] || 'fa-circle-play';
    const cls = typeCls[p.offerType]  || 'pkg-icon-reel';

    const dDate   = p.deliveredDate
      ? new Date(p.deliveredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : null;
    const badge   = p.status === 'delivered'
      ? `<span class="deadline-badge badge-soon"><i class="fa-solid fa-eye"></i> Needs your review</span>`
      : p.status === 'completed' && dDate
        ? `<span class="deadline-badge badge-done"><i class="fa-solid fa-check"></i> Done ${dDate}</span>`
        : due
          ? `<span class="deadline-badge badge-normal"><i class="fa-regular fa-calendar"></i> Due ${due}</span>`
          : '';

    const briefHtml = p.briefNote ? `
      <div class="biz-brief-snippet">
        <i class="fa-solid fa-file-lines"></i>
        <p>${p.briefNote.length > 75 ? p.briefNote.slice(0, 75) + '...' : p.briefNote}</p>
      </div>` : '';

    return `
      <div class="biz-project-card biz-card-${p.status}">
        <div class="biz-proj-top">
          <div class="project-biz">
            <div class="biz-avatar" style="background:${p.creatorColor};color:#fff;">${p.creatorHandle[1].toUpperCase()}</div>
            <div><p class="biz-name">${p.creatorHandle}</p><p class="biz-city">Instagram Creator</p></div>
          </div>
          <span class="status-chip ${st.cls}"><i class="fa-solid ${st.icon}"></i> ${st.label}</span>
        </div>
        <div class="project-details">
          <span class="project-offer-type">
            <span class="pkg-icon-wrap ${cls}" style="width:22px;height:22px;border-radius:5px;display:inline-flex;">
              <i class="fa-solid ${ico}" style="font-size:10px;"></i>
            </span>
            ${p.offerType}
          </span>
          <span class="project-price">₹${p.price.toLocaleString('en-IN')}</span>
          ${badge}
        </div>
        ${briefHtml}
        <div class="project-actions">${buildBizProjectActions(p)}</div>
      </div>`;
  }).join('');

  const active = bizProjects.filter(p => p.status !== 'completed').length;
  return `
    <div class="biz-section-header">
      <span>Active Campaigns</span>
      <span class="biz-section-count">${active} active</span>
    </div>
    <div class="feed-list">${cards}</div>`;
}

function buildBizProjectActions(p) {
  const msgBtn = `<button class="act-btn act-msg" onclick="openBizChat('${p.chatId}')"><i class="fa-solid fa-message"></i> Message</button>`;
  if      (p.status === 'brief_sent')  return msgBtn;
  else if (p.status === 'in_progress') return msgBtn;
  else if (p.status === 'delivered')   return msgBtn + `<button class="act-btn act-brief-accept" onclick="bizApproveContent('${p.id}')"><i class="fa-solid fa-circle-check"></i> Approve</button>`;
  else if (p.status === 'approved')    return msgBtn + `<button class="act-btn act-complete" onclick="bizMarkCompleted('${p.id}')"><i class="fa-solid fa-trophy"></i> Mark Completed</button>`;
  else if (p.status === 'completed')   return `<button class="act-btn act-msg" onclick="openBizChat('${p.chatId}')"><i class="fa-solid fa-rotate-left"></i> Book Again</button>`;
  return msgBtn;
}

function bizApproveContent(id) {
  const p = bizProjects.find(x => x.id === id);
  if (p) { p.status = 'approved'; bizTab('projects'); showBizToast('Content approved!'); }
}
function bizMarkCompleted(id) {
  const p = bizProjects.find(x => x.id === id);
  if (p) { p.status = 'completed'; bizTab('projects'); showBizToast('Campaign completed!'); }
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
      <div class="chat-list-item" onclick="openBizChat('${c.id}')">
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
  const a          = BIZ_AUTH;
  const activeBiz  = a.businesses.find(b => b.id === a.activeBizId) || a.businesses[0];
  const totalSpend = bizProjects.filter(p => p.status === 'completed').reduce((s, p) => s + p.price, 0);
  const activeCount = bizProjects.filter(p => p.status !== 'completed').length;

  const bizList = a.businesses.map(biz => {
    const isActive = biz.id === a.activeBizId;
    const logoHtml = biz.logo
      ? `<img src="${biz.logo}" alt="${biz.name}" style="width:100%;height:100%;object-fit:cover;border-radius:11px;">`
      : `<i class="fa-solid ${biz.icon}"></i>`;
    const logoStyle = biz.logo ? 'background:#f3f4f6;' : `background:${biz.color}20;color:${biz.color};`;
    return `
      <div class="acct-biz-item${isActive ? ' acct-biz-active' : ''}" onclick="${isActive ? '' : `switchBiz('${biz.id}')`}">
        <div class="acct-biz-icon" style="${logoStyle}">${logoHtml}</div>
        <div class="acct-biz-info">
          <p>${biz.name}</p>
          <span>${biz.category} · ${biz.city}</span>
        </div>
        ${isActive ? '<span class="acct-biz-badge">Active</span>' : ''}
        <button class="acct-biz-edit-btn" onclick="event.stopPropagation();openEditBiz('${biz.id}')">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>`;
  }).join('');

  const avatarStyle = a.personalAvatar ? 'background:#f3f4f6;padding:0;overflow:hidden;' : '';
  const avatarInner = a.personalAvatar
    ? `<img src="${a.personalAvatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;">`
    : a.personalName[0].toUpperCase();

  return `
    <div class="acct-personal-card">
      <div class="acct-personal-top">
        <div class="acct-personal-avatar acct-avatar-tappable" style="${avatarStyle}"
             onclick="openEditProfile()">${avatarInner}</div>
        <div style="flex:1;">
          <p class="acct-personal-name">${a.personalName}</p>
          <p class="acct-personal-username">@${a.username}</p>
        </div>
        <button class="acct-edit-profile-btn" onclick="openEditProfile()" title="Edit profile">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
      <div class="biz-stats-row">
        <div class="biz-stat"><p>${bizProjects.length}</p><span>Campaigns</span></div>
        <div class="biz-stat"><p>${activeCount}</p><span>Active</span></div>
        <div class="biz-stat"><p>${totalSpend > 0 ? '₹' + totalSpend.toLocaleString('en-IN') : '—'}</p><span>Spent</span></div>
      </div>
    </div>

    <div class="biz-section-header" style="margin-top:22px;">
      <span>My Businesses</span>
      <button class="acct-add-biz-btn" onclick="openAddBiz()"><i class="fa-solid fa-plus"></i> Add</button>
    </div>
    <div class="acct-biz-list">${bizList}</div>

    <div class="profile-actions" style="margin-top:20px;">
      <button class="act-btn act-delete" style="flex:1" onclick="bizLogOut()">
        <i class="fa-solid fa-right-from-bracket"></i> Log Out
      </button>
    </div>`;
}

// ─────────────────────────────────────────────────────
// AVATAR HELPERS
// ─────────────────────────────────────────────────────
function applyPersonalAvatar(el, auth) {
  if (auth.personalAvatar) {
    el.style.background = '#f3f4f6';
    el.style.padding    = '0';
    el.style.overflow   = 'hidden';
    el.innerHTML = `<img src="${auth.personalAvatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;">`;
  } else {
    el.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
    el.style.padding    = '';
    el.style.overflow   = '';
    el.textContent = auth.personalName[0].toUpperCase();
  }
}

// ─────────────────────────────────────────────────────
// EDIT PERSONAL PROFILE
// ─────────────────────────────────────────────────────
function openEditProfile() {
  const a = BIZ_AUTH;
  document.getElementById('ep-name').value     = a.personalName;
  document.getElementById('ep-username').value = a.username;
  setFieldErr('ep-err-name', '');
  setFieldErr('ep-err-username', '');

  // Show saved avatar or initial
  const preview = document.getElementById('ep-avatar-preview');
  if (a.personalAvatar) {
    preview.style.background = '#f3f4f6';
    preview.style.fontSize   = '0';
    preview.innerHTML = `<img src="${a.personalAvatar}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    document.getElementById('ep-remove-photo').classList.remove('hidden');
  } else {
    preview.style.background = '';
    preview.style.fontSize   = '';
    preview.innerHTML = a.personalName[0].toUpperCase();
    document.getElementById('ep-remove-photo').classList.add('hidden');
  }
  document.getElementById('ep-photo-input').value = '';
  showBizView('bv-edit-profile');
}

function handlePersonalPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    BIZ_AUTH.personalAvatar = ev.target.result;
    const preview = document.getElementById('ep-avatar-preview');
    preview.style.background = '#f3f4f6';
    preview.style.fontSize   = '0';
    preview.innerHTML = `<img src="${ev.target.result}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    document.getElementById('ep-remove-photo').classList.remove('hidden');
    saveBizAuth();
    // Update header avatar live
    const headerAvatar = document.getElementById('personal-avatar');
    if (headerAvatar) applyPersonalAvatar(headerAvatar, BIZ_AUTH);
  };
  reader.readAsDataURL(file);
}

function removePersonalPhoto() {
  BIZ_AUTH.personalAvatar = null;
  saveBizAuth();
  const preview = document.getElementById('ep-avatar-preview');
  preview.style.background = '';
  preview.style.fontSize   = '';
  preview.innerHTML = BIZ_AUTH.personalName[0].toUpperCase();
  document.getElementById('ep-remove-photo').classList.add('hidden');
  document.getElementById('ep-photo-input').value = '';
  const headerAvatar = document.getElementById('personal-avatar');
  if (headerAvatar) applyPersonalAvatar(headerAvatar, BIZ_AUTH);
}

function saveEditProfile() {
  const name     = document.getElementById('ep-name').value.trim();
  const username = document.getElementById('ep-username').value.trim().replace(/^@/, '');
  const eN = !name     ? 'Name is required' : null;
  const eU = !username ? 'Username is required'
           : !/^[a-z0-9_]{3,20}$/.test(username) ? '3–20 lowercase letters, numbers or _' : null;
  setFieldErr('ep-err-name',     eN);
  setFieldErr('ep-err-username', eU);
  if (eN || eU) return;

  BIZ_AUTH.personalName = name;
  BIZ_AUTH.username     = username;
  saveBizAuth();

  // Refresh header
  document.getElementById('personal-name-display').textContent    = name;
  document.getElementById('personal-username-display').textContent = '@' + username;
  const headerAvatar = document.getElementById('personal-avatar');
  if (headerAvatar) applyPersonalAvatar(headerAvatar, BIZ_AUTH);

  showBizView('bv-dash');
  bizTab('account');
  showBizToast('Profile updated!');
}

// ─────────────────────────────────────────────────────
// EDIT BUSINESS
// ─────────────────────────────────────────────────────
function openEditBiz(bizId) {
  const biz = BIZ_AUTH.businesses.find(b => b.id === bizId);
  if (!biz) return;

  document.getElementById('eb-biz-id').value = bizId;
  document.getElementById('eb-name').value   = biz.name;
  document.getElementById('eb-city').value   = biz.city;
  setFieldErr('eb-err-name', '');
  setFieldErr('eb-err-city', '');
  setFieldErr('eb-err-cat',  '');

  // Pre-fill category
  document.getElementById('eb-category').value = biz.category;
  document.getElementById('eb-caticon').value   = biz.icon;
  const catData = BIZ_CATEGORIES.find(c => c.value === biz.category);
  const color   = catData ? catData.color : biz.color;
  const ebDisplay = document.getElementById('eb-cat-display');
  if (ebDisplay && catData) {
    ebDisplay.innerHTML = `
      <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:${color}20;border-radius:5px;">
        <i class="fa-solid ${biz.icon}" style="font-size:11px;color:${color};"></i>
      </span>
      <span>${biz.category}</span>`;
  }

  // Logo preview
  const logoPreview = document.getElementById('eb-logo-preview');
  const logoIcon    = document.getElementById('eb-logo-icon');
  if (biz.logo) {
    logoPreview.style.background = '#f3f4f6';
    logoPreview.innerHTML = `<img src="${biz.logo}" alt="${biz.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    document.getElementById('eb-remove-photo').classList.remove('hidden');
  } else {
    logoPreview.style.background = color + '20';
    logoPreview.style.color      = color;
    logoPreview.innerHTML = `<i class="fa-solid ${biz.icon}" id="eb-logo-icon"></i>`;
    document.getElementById('eb-remove-photo').classList.add('hidden');
  }
  document.getElementById('eb-photo-input').value = '';

  // Hide delete btn if only one business
  const delBtn = document.getElementById('eb-delete-btn');
  if (delBtn) delBtn.style.display = BIZ_AUTH.businesses.length > 1 ? '' : 'none';

  showBizView('bv-edit-biz');
}

function handleBizLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const bizId = document.getElementById('eb-biz-id').value;
    const biz = BIZ_AUTH.businesses.find(b => b.id === bizId);
    if (biz) { biz.logo = ev.target.result; saveBizAuth(); }
    const logoPreview = document.getElementById('eb-logo-preview');
    logoPreview.style.background = '#f3f4f6';
    logoPreview.style.color      = '';
    logoPreview.innerHTML = `<img src="${ev.target.result}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    document.getElementById('eb-remove-photo').classList.remove('hidden');
    if (biz && biz.id === BIZ_AUTH.activeBizId) updateBizHud(biz);
  };
  reader.readAsDataURL(file);
}

function removeBizLogo() {
  const bizId = document.getElementById('eb-biz-id').value;
  const biz = BIZ_AUTH.businesses.find(b => b.id === bizId);
  if (biz) { biz.logo = null; saveBizAuth(); }
  const catData = BIZ_CATEGORIES.find(c => c.value === biz?.category);
  const color   = catData ? catData.color : (biz?.color || '#6366f1');
  const icon    = biz?.icon || 'fa-store';
  const logoPreview = document.getElementById('eb-logo-preview');
  logoPreview.style.background = color + '20';
  logoPreview.style.color      = color;
  logoPreview.innerHTML = `<i class="fa-solid ${icon}" id="eb-logo-icon"></i>`;
  document.getElementById('eb-remove-photo').classList.add('hidden');
  document.getElementById('eb-photo-input').value = '';
  if (biz && biz.id === BIZ_AUTH.activeBizId) updateBizHud(biz);
}

function saveEditBiz() {
  const bizId    = document.getElementById('eb-biz-id').value;
  const name     = document.getElementById('eb-name').value.trim();
  const city     = document.getElementById('eb-city').value.trim();
  const category = document.getElementById('eb-category').value;
  const caticon  = document.getElementById('eb-caticon').value;
  const eN = validateBizName(name);
  const eC = !category ? 'Select a category' : null;
  const eCi = validateCity(city);
  setFieldErr('eb-err-name', eN);
  setFieldErr('eb-err-cat',  eC);
  setFieldErr('eb-err-city', eCi);
  if (eN || eC || eCi) return;

  const biz = BIZ_AUTH.businesses.find(b => b.id === bizId);
  if (!biz) return;
  const catData = BIZ_CATEGORIES.find(c => c.value === category) || BIZ_CATEGORIES[9];
  biz.name     = name;
  biz.city     = city;
  biz.category = category;
  biz.icon     = caticon || catData.icon;
  biz.color    = catData.color;
  saveBizAuth();

  if (biz.id === BIZ_AUTH.activeBizId) updateBizHud(biz);
  showBizView('bv-dash');
  bizTab('account');
  showBizToast('Business updated!');
}

function deleteThisBiz() {
  const bizId = document.getElementById('eb-biz-id').value;
  const biz   = BIZ_AUTH.businesses.find(b => b.id === bizId);
  if (!biz || BIZ_AUTH.businesses.length <= 1) return;
  if (!confirm(`Delete "${biz.name}"? This cannot be undone.`)) return;
  BIZ_AUTH.businesses = BIZ_AUTH.businesses.filter(b => b.id !== bizId);
  if (BIZ_AUTH.activeBizId === bizId) {
    BIZ_AUTH.activeBizId = BIZ_AUTH.businesses[0].id;
    updateBizHud(BIZ_AUTH.businesses[0]);
  }
  saveBizAuth();
  showBizView('bv-dash');
  bizTab('account');
  showBizToast(biz.name + ' deleted');
}

function bizLogOut() {
  if (!confirm('Log out? Your account will be cleared from this device.')) return;
  localStorage.removeItem('biz_auth');
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
  const box = document.getElementById('biz-chat-messages');
  box.innerHTML = activeBizChat.messages.map(m => `
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
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
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
