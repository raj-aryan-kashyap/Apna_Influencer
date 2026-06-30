/* ===================================================
   APNA INFLUENCER — INFLUENCER APP LOGIC
   =================================================== */

// ─────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────
const S = {
  slide: 0,
  tab: 'offers',
  profile: null,
  draft: {},
  offers: [],
  projects: [],
  chats: [],
  activeChat: null,
  returnTab: 'messages'
};

// ─────────────────────────────────────────────────────
// ONBOARDING SLIDES
// ─────────────────────────────────────────────────────
const SLIDES = [
  {
    icon: 'fa-store',
    title: 'Local brands need you',
    desc: 'Cafes, boutiques, studios, and shops in your city are actively looking for creators like you.'
  },
  {
    icon: 'fa-indian-rupee-sign',
    title: 'Set your own rates',
    desc: 'List Reels, Stories, or Feed Posts at prices you decide. No middleman, no hidden cuts.'
  },
  {
    icon: 'fa-handshake',
    title: 'Build real partnerships',
    desc: 'Go beyond one-off posts. Become the trusted face of brands you actually believe in.'
  }
];

// ─────────────────────────────────────────────────────
// ANIMAL AVATARS — 16 combos, vibrant backgrounds
// ─────────────────────────────────────────────────────
const AVATARS = [
  { icon: 'fa-cat',       bg: '#FF6B6B' },
  { icon: 'fa-dog',       bg: '#FF8E53' },
  { icon: 'fa-frog',      bg: '#2ECC71' },
  { icon: 'fa-fish',      bg: '#3498DB' },
  { icon: 'fa-crow',      bg: '#9B59B6' },
  { icon: 'fa-dove',      bg: '#1ABC9C' },
  { icon: 'fa-dragon',    bg: '#E74C3C' },
  { icon: 'fa-hippo',     bg: '#F39C12' },
  { icon: 'fa-horse',     bg: '#16A085' },
  { icon: 'fa-otter',     bg: '#8E44AD' },
  { icon: 'fa-spider',    bg: '#2C3E50' },
  { icon: 'fa-kiwi-bird', bg: '#D35400' },
  { icon: 'fa-worm',      bg: '#27AE60' },
  { icon: 'fa-shrimp',    bg: '#C0392B' },
  { icon: 'fa-paw',       bg: '#7D3C98' },
  { icon: 'fa-feather',   bg: '#148F77' }
];

let currentAvatarIdx = 0;
let offersSubTab     = 'my-offers';
let oppNiche         = null;
let oppNichePicker   = false;
let activeBidBriefId = null;

// ─────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────
const MOCK_PROJECTS = [
  {
    id: 'p1',
    bizName: 'Chai Wala Café',
    bizCity: 'Delhi',
    bizColor: '#f97316',
    offerType: 'Reel',
    price: 2000,
    status: 'active',
    deadline: '2026-06-25',
    chatId: 'c1',
    startDate: '2026-06-20'
  },
  {
    id: 'p2',
    bizName: 'Studio Glow',
    bizCity: 'Delhi',
    bizColor: '#ec4899',
    offerType: 'Stories',
    price: 1200,
    status: 'active',
    deadline: '2026-06-30',
    chatId: 'c3',
    startDate: '2026-06-26'
  },
  {
    id: 'p3',
    bizName: 'Zara Boutique',
    bizCity: 'Delhi',
    bizColor: '#8b5cf6',
    offerType: 'Feed Post',
    price: 1500,
    status: 'negotiating',
    deadline: null,
    chatId: 'c2'
  },
  {
    id: 'p4',
    bizName: 'The Plant Store',
    bizCity: 'Gurugram',
    bizColor: '#10b981',
    offerType: 'Reel',
    price: 2500,
    status: 'brief_received',
    deadline: '2026-07-10',
    chatId: 'c4',
    briefNote: 'Feature our new monsoon plant collection in a 30-60 sec reel. Show the plants in a home setting.'
  },
  {
    id: 'p5',
    bizName: "Kiran's Kitchen",
    bizCity: 'Delhi',
    bizColor: '#f59e0b',
    offerType: 'Stories',
    price: 800,
    status: 'delivered',
    deadline: '2026-06-27',
    chatId: 'c5',
    deliveredDate: '2026-06-26'
  }
];

const MOCK_CHATS = [
  {
    id: 'c1',
    bizName: 'Chai Wala Café',
    bizInitial: 'C',
    bizColor: '#f97316',
    offerType: 'Reel',
    offerPrice: 2000,
    messages: [
      { from: 'biz', text: "Hey! We came across your profile and love your content 🙌 Are you available for a Reel collaboration this week?", time: '10:30 AM' },
      { from: 'me',  text: "Hi! Thanks so much! Yes, I'm available. What product or service would you like me to feature?", time: '10:45 AM' },
      { from: 'biz', text: "We just launched a new cold brew range! We'd love a Reel featuring our café vibe and drinks. Budget ₹2,000 as per your package.", time: '11:00 AM' },
      { from: 'me',  text: "That sounds amazing — I love cold brew ☕ I can shoot this Friday. Shall I come around 4 PM?", time: '11:15 AM' },
      { from: 'biz', text: "Friday 4 PM works perfectly! We'll have everything set up for you 🎉", time: '11:20 AM' }
    ]
  },
  {
    id: 'c2',
    bizName: 'Zara Boutique',
    bizInitial: 'Z',
    bizColor: '#8b5cf6',
    offerType: 'Feed Post',
    offerPrice: 1500,
    messages: [
      { from: 'biz', text: "Hello! We're launching our summer collection next week and would love a Feed Post featuring our new pieces.", time: 'Yesterday' },
      { from: 'me',  text: "Hi Zara Boutique! That sounds wonderful. I'll need to visit the store — when can I come in?", time: 'Yesterday' },
      { from: 'biz', text: "Any time this weekend works! We'll set up a mini shoot area with good lighting for you.", time: 'Yesterday' },
      { from: 'me',  text: "Perfect! I'll come Saturday morning. The post will be live by Sunday evening. Can you share your brand kit?", time: 'Yesterday' },
      { from: 'biz', text: "Sending the brand kit now! Looking forward to it 🌸", time: '2 hrs ago' }
    ]
  },
  {
    id: 'c3',
    bizName: 'Studio Glow',
    bizInitial: 'S',
    bizColor: '#ec4899',
    offerType: 'Stories',
    offerPrice: 1200,
    messages: [
      { from: 'biz', text: "Hi! We're a wellness studio in Delhi — we love your vibe and would like you to create Stories for our new skincare launch.", time: '2 days ago' },
      { from: 'me',  text: "Sounds amazing! I'll need to visit your studio for the shoot. What dates work?", time: '2 days ago' },
      { from: 'biz', text: "This Wednesday or Thursday works. We'll also include a complimentary facial for you!", time: '1 day ago' },
      { from: 'me',  text: "Thursday works perfectly. I'll be there by 2 PM. Just finalising the content plan now.", time: '1 day ago' }
    ]
  },
  {
    id: 'c4',
    bizName: 'The Plant Store',
    bizInitial: 'T',
    bizColor: '#10b981',
    offerType: 'Reel',
    offerPrice: 2500,
    messages: [
      { from: 'biz', text: "Hey! We've sent over a brief for the monsoon plant collection Reel. Please check and let us know if you're on board!", time: '3 hrs ago' },
      { from: 'me',  text: "Saw the brief — sounds like a beautiful concept. I'll review the details and get back to you shortly.", time: '1 hr ago' }
    ]
  },
  {
    id: 'c5',
    bizName: "Kiran's Kitchen",
    bizInitial: 'K',
    bizColor: '#f59e0b',
    offerType: 'Stories',
    offerPrice: 800,
    messages: [
      { from: 'biz', text: "Hi! We booked your Stories package for our home-style lunch menu. Looking forward to the collab!", time: '5 days ago' },
      { from: 'me',  text: "Hi! So excited for this. I visited and loved the food. The Stories are ready — sending them over now.", time: '3 days ago' },
      { from: 'biz', text: "These are absolutely stunning! We posted them and the response has been incredible. Thank you so much!", time: '2 days ago' },
      { from: 'me',  text: "That's wonderful to hear! Happy to work together again anytime.", time: '2 days ago' }
    ]
  }
];

const STATUS_MAP = {
  live:           { label: 'New Request',    cls: 'status-live-req',      icon: 'fa-bell' },
  negotiating:    { label: 'Negotiating',    cls: 'status-negotiating',   icon: 'fa-comments' },
  brief_received: { label: 'Brief Received', cls: 'status-brief',         icon: 'fa-file-lines' },
  active:         { label: 'In Progress',    cls: 'status-active',        icon: 'fa-rotate' },
  near_deadline:  { label: 'Due Soon',       cls: 'status-near-deadline', icon: 'fa-hourglass-half' },
  delayed:        { label: 'Delayed',        cls: 'status-delayed',       icon: 'fa-triangle-exclamation' },
  delivered:      { label: 'Delivered',      cls: 'status-delivered',     icon: 'fa-paper-plane' },
  completed:      { label: 'Completed',      cls: 'status-completed',     icon: 'fa-circle-check' },
  cancelled:      { label: 'Cancelled',      cls: 'status-cancelled',     icon: 'fa-ban' },
  archived:       { label: 'Archived',       cls: 'status-archived-proj', icon: 'fa-box-archive' }
};

// ─────────────────────────────────────────────────────
// DEADLINE ENGINE — computes _ds (display status) overlay
// ─────────────────────────────────────────────────────
function autoUpdateProjectStatuses() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  S.projects.forEach(p => {
    if (p.deadline && (p.status === 'active' || p.status === 'near_deadline' || p.status === 'delayed')) {
      const due = new Date(p.deadline);
      due.setHours(0, 0, 0, 0);
      const diff = Math.ceil((due - today) / 86400000);
      if (diff < 0) {
        p._ds = 'delayed';
        p._daysOverdue = -diff;
        p._daysUntil   = null;
      } else if (diff <= 1) {
        p._ds = 'near_deadline';
        p._daysUntil   = diff;
        p._daysOverdue = null;
      } else {
        p._ds = 'active';
        p._daysUntil   = diff;
        p._daysOverdue = null;
      }
    } else {
      p._ds = p.status;
      p._daysUntil   = null;
      p._daysOverdue = null;
    }
  });
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  S.projects = JSON.parse(JSON.stringify(MOCK_PROJECTS));
  S.chats    = JSON.parse(JSON.stringify(MOCK_CHATS));
  autoUpdateProjectStatuses();

  // Notes char counter
  const notesEl = document.getElementById('f-notes');
  if (notesEl) notesEl.addEventListener('input', updateNoteCount);

  // Pre-pick a random animal (used silently if user skips photo upload)
  currentAvatarIdx = Math.floor(Math.random() * AVATARS.length);

  // Check returning user
  const savedProfile = localStorage.getItem('inf_profile');
  if (savedProfile) {
    try {
      S.profile = JSON.parse(savedProfile);
      S.offers  = JSON.parse(localStorage.getItem('inf_offers') || '[]');
      seedMockBriefs();
      ensureOfferAnalytics();
      oppNiche = S.profile?.niche || null;
      launchDashboard();
      return;
    } catch (e) { /* corrupted — start fresh */ }
  }

  seedMockBriefs();
  renderSlide();
  showView('v-slides');
});

function updateNoteCount() {
  const el      = document.getElementById('f-notes');
  const counter = document.getElementById('notes-count');
  if (el && counter) counter.textContent = `${el.value.length} / 200`;
}

// ─────────────────────────────────────────────────────
// AVATAR SYSTEM
// ─────────────────────────────────────────────────────

/** Handle photo file upload — shows preview in the thumb circle */
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    S.draft.photo = e.target.result;
    const thumb = document.getElementById('photo-thumb');
    if (thumb) {
      thumb.style.background = '#f3f4f6';
      thumb.style.border = 'none';
      thumb.innerHTML = `<img src="${S.draft.photo}" alt="Profile photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    }
    document.getElementById('btn-remove-photo')?.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

/** Remove uploaded photo, revert thumb to placeholder */
function removePhoto() {
  S.draft.photo = null;
  const thumb = document.getElementById('photo-thumb');
  if (thumb) {
    thumb.style.background = '';
    thumb.style.border = '';
    thumb.innerHTML = `<i class="fa-solid fa-user"></i>`;
  }
  document.getElementById('btn-remove-photo')?.classList.add('hidden');
  const input = document.getElementById('photo-upload');
  if (input) input.value = '';
}

/**
 * Apply the influencer's avatar to a DOM element.
 * Works for both animal-icon avatars and uploaded photos.
 * @param {HTMLElement} el
 * @param {Object} profile  — must have avatarType + avatarData
 * @param {string} iconSize — CSS font-size for the animal icon
 */
function applyAvatar(el, profile, iconSize) {
  if (!el || !profile) return;
  if (profile.avatarType === 'photo') {
    el.style.background = '#f3f4f6';
    el.innerHTML = `<img src="${profile.avatarData}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;">`;
  } else if (profile.avatarType === 'animal') {
    el.style.background = profile.avatarData.bg;
    el.innerHTML = `<i class="fa-solid ${profile.avatarData.icon}" style="font-size:${iconSize || '20px'};color:#fff;"></i>`;
  } else {
    el.style.background = 'linear-gradient(135deg,#6366f1,#4f46e5)';
    el.textContent = (profile.name || '?')[0].toUpperCase();
  }
}

/**
 * Returns inner HTML for an avatar element used inside JS-generated strings.
 * Cannot use applyAvatar() there since we have no live DOM element.
 */
function avatarInnerHtml(profile, iconSize) {
  if (!profile) return '';
  if (profile.avatarType === 'photo') {
    return `<img src="${profile.avatarData}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;">`;
  } else if (profile.avatarType === 'animal') {
    return `<i class="fa-solid ${profile.avatarData.icon}" style="font-size:${iconSize || '20px'};color:#fff;"></i>`;
  }
  return (profile.name || '?')[0].toUpperCase();
}

function avatarBg(profile) {
  if (!profile) return 'linear-gradient(135deg,#6366f1,#4f46e5)';
  if (profile.avatarType === 'photo')  return '#f3f4f6';
  if (profile.avatarType === 'animal') return profile.avatarData.bg;
  return 'linear-gradient(135deg,#6366f1,#4f46e5)';
}

// ─────────────────────────────────────────────────────
// VIEW MANAGEMENT
// ─────────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

// ─────────────────────────────────────────────────────
// ONBOARDING SLIDES
// ─────────────────────────────────────────────────────
function renderSlide() {
  const sl = SLIDES[S.slide];

  document.getElementById('slide-content').innerHTML = `
    <div class="slide-inner">
      <div class="slide-icon-wrap">
        <i class="fa-solid ${sl.icon}"></i>
      </div>
      <h2>${sl.title}</h2>
      <p>${sl.desc}</p>
    </div>
  `;

  document.getElementById('slide-dots').innerHTML =
    SLIDES.map((_, i) => `<div class="dot ${i === S.slide ? 'active' : ''}"></div>`).join('');

  const btn = document.getElementById('btn-slide-next');
  if (btn) btn.textContent = S.slide === SLIDES.length - 1 ? 'Get Started' : 'Next';
}

function nextSlide() {
  if (S.slide < SLIDES.length - 1) { S.slide++; renderSlide(); }
  else skipToSetup();
}

function skipToSetup() {
  showView('v-step1');
}

// ─────────────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────────────
function setErr(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}
function clearErrs(ids) { ids.forEach(id => setErr(id, '')); }

function runValidation(rules) {
  let hasError = false;
  for (const [id, msg] of Object.entries(rules)) {
    setErr(id, msg || '');
    if (msg) hasError = true;
  }
  return hasError;
}

const V = {
  name(v) {
    if (!v || v.trim().length < 2) return 'Enter your full name (at least 2 characters)';
    if (v.trim().length > 50)       return 'Name is too long (max 50 characters)';
    return null;
  },
  handle(v) {
    if (!v || !v.trim()) return 'Enter your Instagram handle';
    return null;
  },
  url(v, handle) {
    if (!v || !v.trim())
      return 'Paste your Instagram profile link — e.g. https://instagram.com/yourname';
    const clean = v.trim().replace(/^https?:\/\//i,'').replace(/^www\./i,'');
    if (!/^instagram\.com\/[a-zA-Z0-9._]{1,30}\/?$/.test(clean))
      return "That doesn't look right. It should be: https://instagram.com/yourname";
    if (handle) {
      const h = handle.trim().replace('@','').toLowerCase();
      const u = clean.replace(/^instagram\.com\//i,'').replace(/\/$/,'').toLowerCase();
      if (h && u && h !== u)
        return "The link doesn't match your handle — make sure they're the same account.";
    }
    return null;
  },
  city(v)  { return (!v || v.trim().length < 2) ? "Enter the city you're based in" : null; },
  niche(v) { return !v ? 'Select the type of content you create' : null; },
  followers(v) {
    const n = parseInt(v);
    if (v === '' || isNaN(n)) return 'Enter your follower count';
    if (n < 100)       return 'Minimum follower count is 100';
    if (n > 100000000) return "That number seems too high — double-check it";
    return null;
  },
  engagement(v) {
    const n = parseFloat(v);
    if (v === '' || isNaN(n)) return 'Enter your engagement rate, e.g. 4.2';
    if (n < 0.1 || n > 100)   return 'Engagement rate must be between 0.1% and 100%';
    return null;
  },
  nonNeg(v, label) {
    const n = parseInt(v);
    if (v === '' || isNaN(n)) return `Enter your ${label}`;
    if (n < 0) return `${label} can't be negative`;
    return null;
  },
  price(v, label) {
    const n = parseInt(v);
    if (!v || isNaN(n) || n < 1) return `Enter a price for ${label} (minimum ₹1)`;
    return null;
  },
  delivery(v) {
    const n = parseInt(v);
    if (!v || isNaN(n)) return 'Enter your delivery time in days';
    if (n < 1 || n > 90) return 'Delivery time must be between 1 and 90 days';
    return null;
  }
};

// ─────────────────────────────────────────────────────
// QR CODE — CAMERA SCANNER + IMAGE UPLOAD
// ─────────────────────────────────────────────────────

let _qrCtx        = null;
let _qrStream     = null;
let _qrAnimFrame  = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('qr-upload-global')?.addEventListener('change', (e) => {
    if (_qrCtx) processQRFile(e, _qrCtx.urlId, _qrCtx.handleId, _qrCtx.hintId);
  });
});

// ── Live camera scan ──
function openQRCamera(urlId, handleId, hintId) {
  _qrCtx = { urlId, handleId, hintId };

  if (!navigator.mediaDevices?.getUserMedia) {
    showToast('Camera not supported. Use Upload QR Code instead.');
    return;
  }

  document.getElementById('qr-camera-modal').classList.remove('hidden');

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    .then(stream => {
      _qrStream = stream;
      const video = document.getElementById('qr-video');
      video.srcObject = stream;
      video.play().then(() => requestAnimationFrame(scanQRFrame));
    })
    .catch(() => {
      closeQRCamera();
      showToast('Camera access denied. Use Upload QR Code instead.');
    });
}

function scanQRFrame() {
  const video  = document.getElementById('qr-video');
  const canvas = document.getElementById('qr-canvas');
  if (!video || !canvas || !_qrStream) return;

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (typeof jsQR !== 'undefined') {
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
      if (code?.data) {
        closeQRCamera();
        document.getElementById(_qrCtx.urlId).value = code.data;
        autoFetchHandle(_qrCtx.urlId, _qrCtx.handleId, _qrCtx.hintId);
        showToast('QR code scanned!');
        return;
      }
    }
  }
  _qrAnimFrame = requestAnimationFrame(scanQRFrame);
}

function closeQRCamera() {
  if (_qrStream) { _qrStream.getTracks().forEach(t => t.stop()); _qrStream = null; }
  if (_qrAnimFrame) { cancelAnimationFrame(_qrAnimFrame); _qrAnimFrame = null; }
  document.getElementById('qr-camera-modal')?.classList.add('hidden');
}

// ── Upload QR image ──
function triggerQRScan(urlId, handleId, hintId) {
  _qrCtx = { urlId, handleId, hintId };
  const input = document.getElementById('qr-upload-global');
  if (input) { input.value = ''; input.click(); }
}

function processQRFile(event, urlId, handleId, hintId) {
  const file = event.target.files[0];
  if (!file) return;
  if (typeof jsQR === 'undefined') { showToast('QR library loading, try again in a moment'); return; }

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const result = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });
    if (result?.data) {
      document.getElementById(urlId).value = result.data;
      autoFetchHandle(urlId, handleId, hintId);
      showToast('QR code read successfully!');
    } else {
      showToast('Could not read QR code. Try a clearer image.');
    }
    URL.revokeObjectURL(img.src);
  };
  img.onerror = () => showToast('Could not load image. Try a different file.');
  img.src = URL.createObjectURL(file);
}

// ─────────────────────────────────────────────────────
// INSTAGRAM HANDLE AUTO-FETCH FROM URL
// ─────────────────────────────────────────────────────
function autoFetchHandle(urlId, handleId, hintId) {
  const url   = (document.getElementById(urlId)?.value || '').trim();
  const match = url.match(/instagram\.com\/([a-zA-Z0-9._]{1,30})\/?/i);
  const hintEl = document.getElementById(hintId);
  if (match) {
    const handleEl = document.getElementById(handleId);
    if (handleEl) handleEl.value = match[1];
    if (hintEl) hintEl.classList.remove('hidden');
  } else {
    if (hintEl) hintEl.classList.add('hidden');
  }
}

function clearAutoFetchHint(hintId) {
  document.getElementById(hintId)?.classList.add('hidden');
}

// ─────────────────────────────────────────────────────
// NICHE PICKER (custom dropdown with FA icons)
// ─────────────────────────────────────────────────────
function toggleNichePicker() {
  const dd    = document.getElementById('niche-dropdown');
  const arrow = document.getElementById('niche-arrow');
  if (!dd) return;
  const opening = dd.classList.contains('hidden');
  dd.classList.toggle('hidden', !opening);
  if (arrow) arrow.style.transform = opening ? 'rotate(180deg)' : '';
  if (opening) {
    // Scroll so the full dropdown is visible
    setTimeout(() => dd.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

function pickNiche(value, icon, label) {
  document.getElementById('f-niche').value = value;
  const display = document.getElementById('niche-display');
  if (display) display.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${label}</span>`;
  document.getElementById('niche-dropdown')?.classList.add('hidden');
  const arrow = document.getElementById('niche-arrow');
  if (arrow) arrow.style.transform = '';
  setErr('err-niche', '');
}

// Close niche pickers when clicking outside
document.addEventListener('click', (e) => {
  [
    { picker: 'niche-picker',      dropdown: 'niche-dropdown',      arrow: 'niche-arrow' },
    { picker: 'edit-niche-picker', dropdown: 'edit-niche-dropdown', arrow: 'edit-niche-arrow' }
  ].forEach(({ picker, dropdown, arrow }) => {
    const el = document.getElementById(picker);
    if (el && !el.contains(e.target)) {
      document.getElementById(dropdown)?.classList.add('hidden');
      const ar = document.getElementById(arrow);
      if (ar) ar.style.transform = '';
    }
  });
});

// ─────────────────────────────────────────────────────
// STEP 1 — IDENTITY
// ─────────────────────────────────────────────────────
function goToStep2() {
  const name   = document.getElementById('f-name').value;
  const handle = document.getElementById('f-handle').value;
  const url    = document.getElementById('f-url').value;
  const city   = document.getElementById('f-city').value;
  const niche  = document.getElementById('f-niche').value;

  const hasError = runValidation({
    'err-name':   V.name(name),
    'err-handle': V.handle(handle),
    'err-url':    V.url(url, handle),
    'err-city':   V.city(city),
    'err-niche':  V.niche(niche)
  });
  if (hasError) return;

  // Save identity
  S.draft.name   = name.trim();
  S.draft.handle = handle.trim();
  S.draft.url    = url.trim();
  S.draft.city   = city.trim();
  S.draft.niche  = niche;

  // Assign avatar: uploaded photo wins, otherwise silently pick a random animal
  if (S.draft.photo) {
    S.draft.avatarType = 'photo';
    S.draft.avatarData = S.draft.photo;
  } else {
    // Pick a fresh random animal each time they hit Continue (not pre-picked on load)
    currentAvatarIdx = Math.floor(Math.random() * AVATARS.length);
    S.draft.avatarType = 'animal';
    S.draft.avatarData = AVATARS[currentAvatarIdx];
  }

  showView('v-step2');
}

// ─────────────────────────────────────────────────────
// STEP 2 — METRICS
// ─────────────────────────────────────────────────────
function goToPackages() {
  const followers  = document.getElementById('f-followers').value;
  const engagement = document.getElementById('f-engagement').value;
  const reelViews  = document.getElementById('f-reel-views').value;
  const postViews  = document.getElementById('f-post-views').value;
  const storyViews = document.getElementById('f-story-views').value;
  const likes      = document.getElementById('f-likes').value;
  const comments   = document.getElementById('f-comments').value;

  const hasError = runValidation({
    'err-followers':   V.followers(followers),
    'err-engagement':  V.engagement(engagement),
    'err-reel-views':  V.nonNeg(reelViews,  'average Reel views'),
    'err-post-views':  V.nonNeg(postViews,  'average Post views'),
    'err-story-views': V.nonNeg(storyViews, 'average Story views'),
    'err-likes':       V.nonNeg(likes,    'average likes per post'),
    'err-comments':    V.nonNeg(comments, 'average comments per post')
  });
  if (hasError) return;

  S.draft.followers  = parseInt(followers);
  S.draft.engagement = parseFloat(engagement);
  S.draft.reelViews  = parseInt(reelViews);
  S.draft.postViews  = parseInt(postViews);
  S.draft.storyViews = parseInt(storyViews);
  S.draft.likes      = parseInt(likes);
  S.draft.comments   = parseInt(comments);

  // Optional pinned content
  S.draft.pinnedContent = {
    reel:  (document.getElementById('f-pin-reel')?.value  || '').trim(),
    post:  (document.getElementById('f-pin-post')?.value  || '').trim(),
    story: (document.getElementById('f-pin-story')?.value || '').trim()
  };

  showView('v-packages');
}

// ─────────────────────────────────────────────────────
// PACKAGE BUILDER
// ─────────────────────────────────────────────────────
function togglePackage(type) {
  const checkbox = document.getElementById(`tog-${type}`);
  const body     = document.getElementById(`body-${type}`);
  const card     = document.getElementById(`pkg-${type}`);
  const isOn     = checkbox.checked;

  body.classList.toggle('hidden', !isOn);
  card.classList.toggle('pkg-active', isOn);
  if (!isOn) setErr(`err-${type}`, '');
}

function goToPreview() {
  clearErrs(['err-reel','err-post','err-stories','err-delivery','err-pkg-global']);

  const reelOn    = document.getElementById('tog-reel').checked;
  const postOn    = document.getElementById('tog-post').checked;
  const storiesOn = document.getElementById('tog-stories').checked;

  if (!reelOn && !postOn && !storiesOn) {
    setErr('err-pkg-global', 'Add at least one package — Reel, Feed Post, or Stories');
    return;
  }

  const reelPrice = document.getElementById('price-reel').value;
  const postPrice = document.getElementById('price-post').value;
  const storPrice = document.getElementById('price-stories').value;
  const delivery  = document.getElementById('f-delivery').value;
  const notes     = document.getElementById('f-notes').value;

  const errors = { 'err-delivery': V.delivery(delivery) };
  if (reelOn)    errors['err-reel']    = V.price(reelPrice, 'Reel');
  if (postOn)    errors['err-post']    = V.price(postPrice, 'Feed Post');
  if (storiesOn) errors['err-stories'] = V.price(storPrice, 'Stories');

  if (runValidation(errors)) return;

  S.draft.reel     = { on: reelOn,    price: reelOn    ? parseInt(reelPrice) : null };
  S.draft.post     = { on: postOn,    price: postOn    ? parseInt(postPrice) : null };
  S.draft.stories  = { on: storiesOn, price: storiesOn ? parseInt(storPrice) : null };
  S.draft.delivery = parseInt(delivery);
  S.draft.notes    = notes.trim();

  renderOfferPreviewCard();
  showView('v-preview');
}

function renderOfferPreviewCard() {
  const d   = S.draft;
  const fmt = n => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;

  const pkgs = [];
  if (d.reel    && d.reel.on)    pkgs.push({ icon: 'fa-circle-play', label: 'Reel',      price: d.reel.price,    cls: 'pkg-icon-reel' });
  if (d.post    && d.post.on)    pkgs.push({ icon: 'fa-image',       label: 'Feed Post',  price: d.post.price,    cls: 'pkg-icon-post' });
  if (d.stories && d.stories.on) pkgs.push({ icon: 'fa-layer-group', label: 'Stories',    price: d.stories.price, cls: 'pkg-icon-stories' });

  const pkgRows = pkgs.map(p => `
    <div class="prev-pkg-row">
      <span class="prev-pkg-label">
        <span class="pkg-icon-wrap ${p.cls}" style="width:24px;height:24px;border-radius:6px;">
          <i class="fa-solid ${p.icon}" style="font-size:11px;"></i>
        </span>
        ${p.label}
      </span>
      <span class="pkg-price-tag">₹${p.price.toLocaleString('en-IN')}</span>
    </div>
  `).join('');

  // Build avatar HTML inline (JS-generated string context)
  const avBg    = avatarBg(d);
  const avInner = avatarInnerHtml(d, '22px');

  document.getElementById('offer-preview-card').innerHTML = `
    <div class="offer-preview-card">
      <div class="prev-top">
        <div class="prev-avatar" style="background:${avBg};">${avInner}</div>
        <div>
          <p class="prev-handle">${d.handle || '@yourhandle'}</p>
          <p class="prev-meta">${d.city || 'City'} · ${d.niche || 'Niche'}</p>
        </div>
      </div>
      <div class="prev-stats">
        <div class="prev-stat"><p>${fmt(d.followers || 0)}</p><span>Followers</span></div>
        <div class="prev-stat"><p>${(d.engagement || 0)}%</p><span>Engagement</span></div>
        <div class="prev-stat"><p>${fmt(d.reelViews || 0)}</p><span>Reel Views</span></div>
      </div>
      <div class="prev-divider"></div>
      <p class="prev-section-label">Packages</p>
      ${pkgRows}
      <div class="prev-divider"></div>
      <div class="prev-footer">
        <span><i class="fa-regular fa-clock"></i> Delivery in ${d.delivery} day${d.delivery > 1 ? 's' : ''}</span>
        ${d.notes ? `<p class="prev-notes">${d.notes}</p>` : ''}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// GO LIVE — handles first-time onboarding AND dashboard "new offer"
// ─────────────────────────────────────────────────────
function goLive() {
  const d = S.draft;

  // First-time: build profile
  if (!S.profile) {
    S.profile = {
      name:          d.name,
      handle:        d.handle,
      url:           d.url,
      city:          d.city,
      niche:         d.niche,
      followers:     d.followers,
      engagement:    d.engagement,
      reelViews:     d.reelViews  || 0,
      postViews:     d.postViews  || 0,
      storyViews:    d.storyViews || 0,
      likes:         d.likes,
      comments:      d.comments,
      pinnedContent: d.pinnedContent || { reel: '', post: '', story: '' },
      avatarType:    d.avatarType,
      avatarData:    d.avatarData
    };
  }

  // Add offer
  S.offers.push({
    id:        'o' + Date.now(),
    reel:      d.reel    ? { ...d.reel }    : { on: false, price: null },
    post:      d.post    ? { ...d.post }    : { on: false, price: null },
    stories:   d.stories ? { ...d.stories } : { on: false, price: null },
    delivery:  d.delivery,
    notes:     d.notes,
    status:    'live',
    createdAt: new Date().toISOString()
  });

  saveState();
  ensureOfferAnalytics();
  if (!oppNiche && S.profile?.niche) oppNiche = S.profile.niche;
  launchDashboard();
  showToast(S.profile.name ? '🚀 You\'re live! Businesses can now find you.' : 'New offer is live!');
}

function saveState() {
  try {
    localStorage.setItem('inf_profile', JSON.stringify(S.profile));
    localStorage.setItem('inf_offers',  JSON.stringify(S.offers));
  } catch (e) { /* storage unavailable */ }
}

// ─────────────────────────────────────────────────────
// SHARED BRIEF / BID STORAGE (mirrors business.js)
// ─────────────────────────────────────────────────────
const COMMUNITY_AVG_BUDGET = { 'Reel': 2200, 'Feed Post': 1500, 'Stories': 1000, 'Mixed': 1800 };

const MOCK_BRIEFS_SEED = [
  { id:'brief_s1', bizId:'external', bizName:'Studio Glow', bizCategory:'Beauty & Wellness',
    bizIcon:'fa-spa', bizColor:'#ec4899', bizCity:'Delhi', bizLogo:null,
    contentType:'Reel', quantity:2, daysToDeliver:10,
    description:'Looking for a beauty creator to showcase our new skin-care range. Reels should be educational and aspirational, 45–60 seconds each.',
    suggestedBudget:2200, budget:4000, niche:'Beauty & Skincare',
    postedAt:'2026-06-29', expiresAt:'2026-07-13', status:'open' },
  { id:'brief_s2', bizId:'external', bizName:'The Plant Store', bizCategory:'Home & Decor',
    bizIcon:'fa-house', bizColor:'#10b981', bizCity:'Gurugram', bizLogo:null,
    contentType:'Stories', quantity:5, daysToDeliver:7,
    description:'Need 5 story posts showcasing our monsoon plant collection. Creative and homey vibe — show plants in real-life home settings.',
    suggestedBudget:1000, budget:2500, niche:'Home & Decor',
    postedAt:'2026-06-28', expiresAt:'2026-07-12', status:'open' },
  { id:'brief_s3', bizId:'external', bizName:'FitZone Gym', bizCategory:'Fitness & Gym',
    bizIcon:'fa-dumbbell', bizColor:'#6366f1', bizCity:'Delhi', bizLogo:null,
    contentType:'Reel', quantity:3, daysToDeliver:14,
    description:'Promote our new membership drive with energetic workout reels. Show our equipment, classes, and the vibe. Must-include: gym tour and workout demo.',
    suggestedBudget:2200, budget:6000, niche:'Fitness & Health',
    postedAt:'2026-06-27', expiresAt:'2026-07-11', status:'open' },
  { id:'brief_s4', bizId:'external', bizName:'Zara Boutique', bizCategory:'Clothing & Fashion',
    bizIcon:'fa-shirt', bizColor:'#8b5cf6', bizCity:'Delhi', bizLogo:null,
    contentType:'Feed Post', quantity:4, daysToDeliver:21,
    description:'Showcase our new seasonal collection in 4 curated feed posts. Aesthetic, editorial feel. Each post should highlight a different outfit category.',
    suggestedBudget:1500, budget:5000, niche:'Fashion & Lifestyle',
    postedAt:'2026-06-26', expiresAt:'2026-07-10', status:'open' }
];

function getBriefs() { try { return JSON.parse(localStorage.getItem('apna_briefs'))||[]; } catch(e){return[];} }
function saveBriefs(b) { try { localStorage.setItem('apna_briefs', JSON.stringify(b)); } catch(e){} }
function getBids()   { try { return JSON.parse(localStorage.getItem('apna_bids'))||[]; } catch(e){return[];} }
function saveBids(b) { try { localStorage.setItem('apna_bids',   JSON.stringify(b)); } catch(e){} }
function seedMockBriefs() {
  if (localStorage.getItem('apna_briefs_seeded')) return;
  saveBriefs(MOCK_BRIEFS_SEED);
  localStorage.setItem('apna_briefs_seeded','1');
}

function ensureOfferAnalytics() {
  let changed = false;
  S.offers.forEach(o => {
    if(o.impressions == null) {
      const h = seedHash(o.id);
      o.impressions = 30 + (h % 170);
      o.contacts    = Math.max(1, Math.floor(o.impressions * (0.04 + ((h>>8)%10)*0.005)));
      changed = true;
    }
  });
  if(changed) saveState();
}

function seedHash(str) {
  let h = 5381;
  for(let i=0;i<str.length;i++) h = ((h<<5)+h+str.charCodeAt(i))&0xffffffff;
  return Math.abs(h);
}

// ─────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────
function launchDashboard() {
  if (!S.profile) return;
  const p = S.profile;

  // Apply avatar to header circle
  const dashAv = document.getElementById('dash-avatar');
  if (dashAv) {
    dashAv.style.width  = '42px';
    dashAv.style.height = '42px';
    applyAvatar(dashAv, p, '20px');
  }

  document.getElementById('dash-handle').textContent = p.handle;
  document.getElementById('dash-meta').textContent   = `${p.city} · ${p.niche}`;

  showView('v-dash');
  switchTab('offers');
}

function updateStats() {
  document.getElementById('stat-offers').textContent   = S.offers.filter(o => o.status === 'live').length;
  document.getElementById('stat-projects').textContent = S.projects.length;
  document.getElementById('stat-messages').textContent = S.chats.length;
}

function switchTab(tab) {
  S.tab = tab;
  ['offers','projects','messages','profile'].forEach(t => {
    const btn = document.getElementById(`nav-${t}`);
    if (!btn) return;
    btn.classList.toggle('active', t === tab);
    if (t === tab) {
      btn.classList.remove('nav-bounce');
      void btn.offsetWidth; // reflow to restart animation
      btn.classList.add('nav-bounce');
    }
  });
  updateStats();

  const content = document.getElementById('tab-content');
  switch (tab) {
    case 'offers':   content.innerHTML = renderOffersTab();   break;
    case 'projects': content.innerHTML = renderProjectsTab(); break;
    case 'messages': content.innerHTML = renderMsgsTab();     break;
    case 'profile':  content.innerHTML = renderProfileTab();  break;
  }
}

// ─────────────────────────────────────────────────────
// OFFERS TAB — sub-tabs: My Offers | Opportunities
// ─────────────────────────────────────────────────────
function renderOffersTab() {
  const openBriefs = getBriefs().filter(b => b.status === 'open');
  const today = new Date(); today.setHours(0,0,0,0);
  const oppCount = openBriefs.filter(b => new Date(b.expiresAt) >= today).length;

  const subTabs = `
    <div class="offers-sub-tabs">
      <button class="offers-sub-tab${offersSubTab==='my-offers'?' offers-sub-tab-active':''}"
              onclick="setOffersSubTab('my-offers')">My Offers</button>
      <button class="offers-sub-tab${offersSubTab==='opportunities'?' offers-sub-tab-active':''}"
              onclick="setOffersSubTab('opportunities')">
        Opportunities${oppCount>0?` <span class="opp-count-badge">${oppCount}</span>`:''}
      </button>
    </div>`;

  if (offersSubTab === 'opportunities') return subTabs + renderOpportunities();
  return subTabs + renderMyOffers();
}

function renderMyOffers() {
  const live     = S.offers.filter(o => o.status === 'live');
  const archived = S.offers.filter(o => o.status === 'archived');

  const typeIcon = { reel: 'fa-circle-play', post: 'fa-image', stories: 'fa-layer-group' };
  const typeCls  = { reel: 'pkg-icon-reel',  post: 'pkg-icon-post', stories: 'pkg-icon-stories' };

  const buildCards = (list) => list.map(o => {
    const pkgRows = ['reel','post','stories']
      .filter(t => o[t] && o[t].on)
      .map(t => `
        <div class="offer-pkg-row">
          <span class="offer-pkg-label">
            <span class="pkg-icon-wrap ${typeCls[t]}" style="width:22px;height:22px;border-radius:5px;">
              <i class="fa-solid ${typeIcon[t]}" style="font-size:10px;"></i>
            </span>
            ${t === 'reel' ? 'Reel' : t === 'post' ? 'Feed Post' : 'Stories'}
          </span>
          <strong>₹${o[t].price.toLocaleString('en-IN')}</strong>
        </div>
      `).join('');

    const isLive = o.status === 'live';
    const ctr = o.impressions > 0 ? ((o.contacts/o.impressions)*100).toFixed(1) : '0.0';
    const analyticsRow = isLive ? `
      <div class="offer-analytics-row">
        <span class="analytics-chip"><i class="fa-solid fa-eye"></i> ${o.impressions ?? 0}</span>
        <span class="analytics-chip analytics-ctr"><i class="fa-solid fa-arrow-pointer"></i> ${ctr}%</span>
        <span class="analytics-chip"><i class="fa-solid fa-envelope-open-text"></i> ${o.contacts ?? 0}</span>
        <span class="analytics-label">Last 30 days</span>
      </div>` : '';

    return `
      <div class="offer-card ${!isLive ? 'card-archived' : ''}">
        <div class="offer-card-top">
          <p class="offer-date">Created ${fmtDate(o.createdAt)}</p>
          <span class="status-chip ${isLive ? 'status-live' : 'status-archived'}">
            ${isLive ? '● Live' : '○ Archived'}
          </span>
        </div>
        <div class="offer-pkgs">${pkgRows}</div>
        <div class="offer-footer">
          <span class="offer-delivery">
            <i class="fa-regular fa-clock"></i> ${o.delivery} day${o.delivery > 1 ? 's' : ''} delivery
          </span>
          ${o.notes ? `<p class="offer-notes">${o.notes}</p>` : ''}
        </div>
        ${analyticsRow}
        <div class="offer-actions">
          ${isLive
            ? `<button class="act-btn act-archive" onclick="archiveOffer('${o.id}')"><i class="fa-solid fa-box-archive"></i> Archive</button>`
            : `<button class="act-btn act-restore" onclick="restoreOffer('${o.id}')"><i class="fa-solid fa-rotate-left"></i> Restore</button>`
          }
          <button class="act-btn act-delete" onclick="deleteOffer('${o.id}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
  }).join('');

  const emptyState = `
    <div class="empty-state">
      <i class="fa-solid fa-tag"></i>
      <p>No live offers yet</p>
      <small>Create your first offer so businesses can discover and book you</small>
    </div>
  `;

  return `
    <div class="tab-section">
      <div class="section-header">
        <h3>Live Offers</h3>
        <button class="btn-add-offer" onclick="startNewOffer()">+ New Offer</button>
      </div>
      ${live.length ? buildCards(live) : emptyState}
      ${archived.length ? `
        <div class="section-header" style="margin-top:20px;"><h3>Archived</h3></div>
        ${buildCards(archived)}
      ` : ''}
    </div>
  `;
}

function renderOpportunities() {
  const today = new Date(); today.setHours(0,0,0,0);
  const myBids = getBids().filter(b => b.creatorHandle === (S.profile?.handle||''));
  const allBriefs = getBriefs().filter(b => b.status === 'open');

  const niches    = ['Food & Beverage','Fashion & Lifestyle','Fitness & Health','Travel','Beauty & Skincare','Tech & Gadgets','Home & Decor','Entertainment','Other'];
  const nicheLbl  = oppNiche || 'All Niches';
  const chevRot   = oppNichePicker ? 'rotate(180deg)' : 'rotate(0deg)';
  const nicheChip = `
    <button class="filter-chip filter-chip-niche${oppNiche?' filter-chip-niche-active':''}"
            style="min-width:196px;justify-content:space-between;"
            onclick="toggleOppNichePicker()">
      <i class="fa-solid fa-tag"></i>
      ${nicheLbl}
      <i class="fa-solid fa-chevron-down" style="transition:transform 0.2s;transform:${chevRot};margin-left:2px;"></i>
    </button>`;
  const nichePickerRow = oppNichePicker ? `
    <div class="niche-filter-row" style="margin-bottom:16px;">
      <button class="niche-filter-opt${!oppNiche?' niche-filter-opt-active':''}" onclick="setOppNiche(null)">All Niches</button>
      ${niches.map(n=>`<button class="niche-filter-opt${oppNiche===n?' niche-filter-opt-active':''}" onclick="setOppNiche('${n.replace(/'/g,"\\'")}'">${n}</button>`).join('')}
    </div>` : '';

  let filtered = oppNiche ? allBriefs.filter(b => b.niche === oppNiche) : allBriefs;
  filtered.sort((a,b) => {
    const aExp = new Date(a.expiresAt) < today;
    const bExp = new Date(b.expiresAt) < today;
    if(aExp !== bExp) return aExp ? 1 : -1;
    return b.budget - a.budget;
  });

  if(!filtered.length) return `
    <div class="tab-section">
      <div style="display:flex;gap:8px;margin-bottom:16px;">${nicheChip}</div>
      ${nichePickerRow}
      <div class="empty-state">
        <i class="fa-solid fa-bullhorn"></i>
        <p>No requirements yet</p>
        <small>${oppNiche ? 'No briefs in this niche — try All Niches' : 'Businesses haven\'t posted any requirements yet'}</small>
      </div>
    </div>`;

  const cards = filtered.map(brief => {
    const myBid    = myBids.find(b => b.briefId === brief.id);
    const isExpired = new Date(brief.expiresAt) < today;
    const daysLeft  = Math.ceil((new Date(brief.expiresAt) - today) / 86400000);
    const typeIco   = {Reel:'fa-circle-play','Feed Post':'fa-image',Stories:'fa-layer-group',Mixed:'fa-shuffle'}[brief.contentType]||'fa-circle-play';
    const typeCl    = {Reel:'pkg-icon-reel','Feed Post':'pkg-icon-post',Stories:'pkg-icon-stories',Mixed:'pkg-icon-reel'}[brief.contentType]||'pkg-icon-reel';
    const logoHtml  = brief.bizLogo
      ? `<img src="${brief.bizLogo}" style="width:100%;height:100%;object-fit:cover;border-radius:9px;">`
      : `<i class="fa-solid ${brief.bizIcon}" style="font-size:14px;color:${brief.bizColor};"></i>`;
    const logoStyle = brief.bizLogo ? 'background:#f3f4f6;' : `background:${brief.bizColor}20;`;

    const deadlineChip = isExpired
      ? `<span class="brief-expired-badge">Expired</span>`
      : daysLeft <= 2
        ? `<span class="deadline-badge badge-today"><i class="fa-solid fa-hourglass-half"></i> ${daysLeft}d left</span>`
        : `<span class="deadline-badge badge-normal"><i class="fa-regular fa-calendar"></i> ${daysLeft}d left</span>`;

    const showBidForm = activeBidBriefId === brief.id;

    const bidFormHtml = showBidForm ? `
      <div class="bid-form-expand">
        <div class="bid-amount-wrap">
          <span class="bid-rupee">₹</span>
          <input type="number" id="bid-amount-${brief.id}" class="form-input"
                 style="border-left:none;border-radius:0 var(--radius-sm) var(--radius-sm) 0;"
                 placeholder="${brief.budget}" value="${brief.budget}" min="100">
        </div>
        <textarea id="bid-note-${brief.id}" class="form-input form-textarea"
                  placeholder="Tell them why you're a great fit... (optional)"
                  rows="2" maxlength="200"
                  style="margin-top:8px;font-size:13px;resize:none;"></textarea>
        <div class="bid-form-actions">
          <button class="btn-primary" style="flex:1;padding:11px;" onclick="submitBid('${brief.id}')">
            <i class="fa-solid fa-paper-plane"></i> Submit Bid
          </button>
          <button class="act-btn" style="flex:0 0 auto;" onclick="closeBidForm()">Cancel</button>
        </div>
      </div>` : '';

    const bidButtonHtml = myBid
      ? `<div class="bid-sent-badge"><i class="fa-solid fa-check-circle"></i> Bid Sent · ₹${myBid.amount.toLocaleString('en-IN')}<span class="bid-sent-status">${myBid.status}</span></div>`
      : isExpired
        ? `<button class="btn-instagram" style="opacity:0.45;cursor:not-allowed;" disabled>Expired</button>`
        : showBidForm ? '' : `
          <button class="btn-primary btn-block" onclick="openBidForm('${brief.id}')">
            <i class="fa-solid fa-hand-holding-dollar"></i> Submit Bid
          </button>`;

    return `
      <div class="opp-brief-card${isExpired?' opp-brief-expired':''}">
        <div class="opp-biz-row">
          <div class="opp-biz-icon" style="${logoStyle}">${logoHtml}</div>
          <div class="opp-biz-info">
            <p class="opp-biz-name">${brief.bizName}</p>
            <p class="opp-biz-meta">${brief.bizCategory} · ${brief.bizCity}</p>
          </div>
          ${deadlineChip}
        </div>
        <div class="opp-content-row">
          <span class="pkg-icon-wrap ${typeCl}" style="width:28px;height:28px;border-radius:7px;flex-shrink:0;">
            <i class="fa-solid ${typeIco}" style="font-size:11px;"></i>
          </span>
          <p class="opp-content-label">${brief.quantity} × ${brief.contentType}</p>
          <span class="opp-duration"><i class="fa-regular fa-clock"></i> ${brief.daysToDeliver} days</span>
        </div>
        <p class="opp-desc">${brief.description.length > 100 ? brief.description.slice(0,100)+'…' : brief.description}</p>
        <div class="opp-footer-row">
          <span class="opp-budget"><i class="fa-solid fa-indian-rupee-sign"></i> ${brief.budget.toLocaleString('en-IN')}</span>
          <span class="opp-niche-tag">${brief.niche || brief.bizCategory}</span>
        </div>
        ${bidButtonHtml}
        ${bidFormHtml}
      </div>`;
  }).join('');

  return `
    <div class="tab-section">
      <div style="display:flex;gap:8px;margin-bottom:0;">${nicheChip}</div>
      ${nichePickerRow}
      <div style="display:flex;flex-direction:column;gap:14px;">${cards}</div>
    </div>`;
}

function setOffersSubTab(tab) { offersSubTab = tab; activeBidBriefId = null; switchTab('offers'); }
function toggleOppNichePicker() { oppNichePicker = !oppNichePicker; switchTab('offers'); }
function setOppNiche(niche) { oppNiche = niche; oppNichePicker = false; switchTab('offers'); }
function openBidForm(briefId) { activeBidBriefId = briefId; switchTab('offers'); }
function closeBidForm() { activeBidBriefId = null; switchTab('offers'); }

function submitBid(briefId) {
  const amountEl = document.getElementById('bid-amount-' + briefId);
  const noteEl   = document.getElementById('bid-note-'   + briefId);
  if(!amountEl) return;
  const amount = parseInt(amountEl.value) || 0;
  if(amount < 100) { showToast('Minimum bid is ₹100'); return; }
  const note = noteEl?.value.trim() || '';
  const bid = {
    id:             'bid_' + Date.now(),
    briefId:        briefId,
    creatorHandle:  S.profile?.handle || '@creator',
    creatorNiche:   S.profile?.niche  || '',
    creatorCity:    S.profile?.city   || '',
    amount:         amount,
    note:           note,
    submittedAt:    new Date().toISOString().split('T')[0],
    status:         'pending'
  };
  const bids = getBids();
  bids.push(bid);
  saveBids(bids);
  activeBidBriefId = null;
  switchTab('offers');
  showToast('Bid submitted! ₹' + amount.toLocaleString('en-IN'));
}

function archiveOffer(id) {
  const o = S.offers.find(x => x.id === id);
  if (!o) return;
  o.status = 'archived';
  saveState(); switchTab('offers'); showToast('Offer archived');
}
function restoreOffer(id) {
  const o = S.offers.find(x => x.id === id);
  if (!o) return;
  o.status = 'live';
  saveState(); switchTab('offers'); showToast('Offer is live again');
}
function deleteOffer(id) {
  if (!confirm('Delete this offer permanently? This cannot be undone.')) return;
  S.offers = S.offers.filter(x => x.id !== id);
  saveState(); switchTab('offers'); showToast('Offer deleted');
}

function startNewOffer() {
  ['reel','post','stories'].forEach(t => {
    const tog   = document.getElementById(`tog-${t}`);
    const body  = document.getElementById(`body-${t}`);
    const card  = document.getElementById(`pkg-${t}`);
    const price = document.getElementById(`price-${t}`);
    if (tog)   tog.checked = false;
    if (body)  body.classList.add('hidden');
    if (card)  card.classList.remove('pkg-active');
    if (price) price.value = '';
  });
  const deliv = document.getElementById('f-delivery');
  const notes = document.getElementById('f-notes');
  const count = document.getElementById('notes-count');
  if (deliv) deliv.value = '';
  if (notes) notes.value = '';
  if (count) count.textContent = '0 / 200';
  clearErrs(['err-reel','err-post','err-stories','err-delivery','err-pkg-global']);

  // When going back from packages in "add offer" mode, return to dashboard
  const backBtn = document.getElementById('pkg-back-btn');
  if (backBtn) backBtn.onclick = () => { showView('v-dash'); switchTab('offers'); };

  showView('v-packages');
}

// ─────────────────────────────────────────────────────
// PROJECTS TAB
// ─────────────────────────────────────────────────────
function renderProjectsTab() {
  autoUpdateProjectStatuses();

  const typeIcon = { Reel: 'fa-circle-play', 'Feed Post': 'fa-image', Stories: 'fa-layer-group' };
  const typeCls  = { Reel: 'pkg-icon-reel',  'Feed Post': 'pkg-icon-post', Stories: 'pkg-icon-stories' };

  const SECTIONS = [
    { key: 'delayed',        label: 'Delayed',        icon: 'fa-triangle-exclamation', urgent: true },
    { key: 'near_deadline',  label: 'Due Soon',        icon: 'fa-hourglass-half',       urgent: true },
    { key: 'active',         label: 'In Progress',    icon: 'fa-rotate',               urgent: false },
    { key: 'brief_received', label: 'Brief Received', icon: 'fa-file-lines',           urgent: false },
    { key: 'negotiating',    label: 'Negotiating',    icon: 'fa-comments',             urgent: false },
    { key: 'live',           label: 'New Requests',   icon: 'fa-bell',                 urgent: false },
    { key: 'delivered',      label: 'Delivered',      icon: 'fa-paper-plane',          urgent: false },
    { key: 'completed',      label: 'Completed',      icon: 'fa-circle-check',         urgent: false }
  ];
  const CLOSED_KEYS = ['cancelled', 'archived'];

  const mainProjects   = S.projects.filter(p => !CLOSED_KEYS.includes(p._ds));
  const closedProjects = S.projects.filter(p =>  CLOSED_KEYS.includes(p._ds));

  if (!mainProjects.length && !closedProjects.length) return `
    <div class="tab-section">
      <div class="empty-state">
        <i class="fa-solid fa-briefcase"></i>
        <p>No active projects yet</p>
        <small>When businesses book your offers, they will show up here</small>
      </div>
    </div>`;

  let html = '<div class="tab-section">';

  SECTIONS.forEach(sec => {
    const items = mainProjects.filter(p => p._ds === sec.key);
    if (!items.length) return;
    html += `
      <div class="proj-section-header${sec.urgent ? ' proj-section-urgent' : ''}">
        <i class="fa-solid ${sec.icon}"></i> ${sec.label}
        <span class="proj-section-count">${items.length}</span>
      </div>`;
    items.forEach(p => { html += renderProjectCard(p, typeIcon, typeCls); });
  });

  if (closedProjects.length) {
    html += `
      <button class="proj-collapse-btn" onclick="toggleCollapsedProjects(this)">
        <i class="fa-solid fa-chevron-right proj-collapse-arrow"></i>
        Archived &amp; Cancelled (${closedProjects.length})
      </button>
      <div class="proj-collapsed-section hidden">`;
    closedProjects.forEach(p => { html += renderProjectCard(p, typeIcon, typeCls); });
    html += `</div>`;
  }

  html += '</div>';
  return html;
}

function renderProjectCard(p, typeIcon, typeCls) {
  const ds  = p._ds || p.status;
  const st  = STATUS_MAP[ds] || STATUS_MAP.active;

  const CARD_CLS = {
    delayed:       'card-delayed',
    near_deadline: 'card-near-deadline',
    active:        'card-active',
    brief_received:'card-brief',
    negotiating:   'card-negotiating',
    live:          'card-live-req',
    delivered:     'card-delivered',
    completed:     'card-completed',
    cancelled:     'card-closed',
    archived:      'card-closed'
  };
  const cardCls = CARD_CLS[ds] || '';

  // Deadline / delivery badge
  let deadlineBadge = '';
  if (p.deadline) {
    const due = new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    if (ds === 'delayed') {
      deadlineBadge = `<span class="deadline-badge badge-overdue"><i class="fa-solid fa-clock"></i> ${p._daysOverdue}d overdue</span>`;
    } else if (ds === 'near_deadline') {
      deadlineBadge = p._daysUntil === 0
        ? `<span class="deadline-badge badge-today"><i class="fa-solid fa-circle-exclamation"></i> Due today</span>`
        : `<span class="deadline-badge badge-soon"><i class="fa-solid fa-hourglass-half"></i> Due tomorrow</span>`;
    } else if (ds === 'active' || ds === 'brief_received') {
      deadlineBadge = `<span class="deadline-badge badge-normal"><i class="fa-regular fa-calendar"></i> Due ${due}</span>`;
    } else if (ds === 'delivered') {
      const dDate = p.deliveredDate
        ? new Date(p.deliveredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
        : due;
      deadlineBadge = `<span class="deadline-badge badge-done"><i class="fa-solid fa-check"></i> Delivered ${dDate}</span>`;
    }
  }

  const briefHtml = (ds === 'brief_received' && p.briefNote) ? `
    <div class="brief-snippet">
      <i class="fa-solid fa-file-lines"></i>
      <p>${p.briefNote.length > 80 ? p.briefNote.slice(0, 80) + '...' : p.briefNote}</p>
    </div>` : '';

  const offerCls  = typeCls[p.offerType]  || 'pkg-icon-reel';
  const offerIcon = typeIcon[p.offerType] || 'fa-circle-play';
  const bizBg     = p.bizColor || '#6366f1';

  return `
    <div class="project-card ${cardCls}">
      <div class="project-top">
        <div class="project-biz">
          <div class="biz-avatar" style="background:${bizBg};color:#fff;">${p.bizName[0]}</div>
          <div>
            <p class="biz-name">${p.bizName}</p>
            <p class="biz-city"><i class="fa-solid fa-location-dot"></i> ${p.bizCity}</p>
          </div>
        </div>
        <span class="status-chip ${st.cls}">
          <i class="fa-solid ${st.icon}"></i> ${st.label}
        </span>
      </div>
      <div class="project-details">
        <span class="project-offer-type">
          <span class="pkg-icon-wrap ${offerCls}" style="width:22px;height:22px;border-radius:5px;display:inline-flex;">
            <i class="fa-solid ${offerIcon}" style="font-size:10px;"></i>
          </span>
          ${p.offerType}
        </span>
        <span class="project-price">₹${p.price.toLocaleString('en-IN')}</span>
        ${deadlineBadge}
      </div>
      ${briefHtml}
      <div class="project-actions">
        ${buildProjectActions(p, ds)}
      </div>
    </div>
  `;
}

function buildProjectActions(p, ds) {
  const msgBtn = `<button class="act-btn act-msg" onclick="openChat('${p.chatId}','projects')"><i class="fa-solid fa-message"></i> Message</button>`;
  switch (ds) {
    case 'live':
      return msgBtn + `<button class="act-btn act-accept" onclick="acceptProject('${p.id}')"><i class="fa-solid fa-check"></i> Accept</button>`;
    case 'negotiating':
      return msgBtn;
    case 'brief_received':
      return msgBtn + `<button class="act-btn act-brief-accept" onclick="acceptBrief('${p.id}')"><i class="fa-solid fa-file-check"></i> Accept Brief</button>`;
    case 'active':
    case 'near_deadline':
    case 'delayed':
      return msgBtn + `<button class="act-btn act-deliver" onclick="markDelivered('${p.id}')"><i class="fa-solid fa-paper-plane"></i> Mark Delivered</button>`;
    case 'delivered':
      return msgBtn + `<button class="act-btn act-complete" onclick="markCompleted('${p.id}')"><i class="fa-solid fa-circle-check"></i> Mark Completed</button>`;
    case 'completed':
      return msgBtn + `<button class="act-btn act-archive" onclick="archiveProject('${p.id}')"><i class="fa-solid fa-box-archive"></i> Archive</button>`;
    case 'cancelled':
    case 'archived':
      return `<button class="act-btn act-delete" onclick="deleteProject('${p.id}')"><i class="fa-solid fa-trash"></i> Remove</button>`;
    default:
      return msgBtn;
  }
}

function markDelivered(id) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'delivered';
  p.deliveredDate = new Date().toISOString().split('T')[0];
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Marked as delivered!');
}

function acceptProject(id) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'negotiating';
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Accepted! Start the conversation.');
}

function acceptBrief(id) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'active';
  p.startDate = new Date().toISOString().split('T')[0];
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Brief accepted. Time to create!');
}

function markCompleted(id) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'completed';
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Project completed!');
}

function cancelProject(id) {
  if (!confirm('Cancel this project?')) return;
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'cancelled';
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Project cancelled');
}

function archiveProject(id) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = 'archived';
  autoUpdateProjectStatuses();
  switchTab('projects');
  showToast('Project archived');
}

function deleteProject(id) {
  if (!confirm('Remove this project permanently?')) return;
  S.projects = S.projects.filter(x => x.id !== id);
  switchTab('projects');
  showToast('Project removed');
}

function updateProjectStatus(id, status) {
  const p = S.projects.find(x => x.id === id);
  if (!p) return;
  p.status = status;
  autoUpdateProjectStatuses();
  switchTab('projects');
}

function toggleCollapsedProjects(btn) {
  const section = btn.nextElementSibling;
  if (!section) return;
  const isHidden = section.classList.contains('hidden');
  section.classList.toggle('hidden', !isHidden);
  const arrow = btn.querySelector('.proj-collapse-arrow');
  if (arrow) arrow.style.transform = isHidden ? 'rotate(90deg)' : '';
}

// ─────────────────────────────────────────────────────
// MESSAGES TAB
// ─────────────────────────────────────────────────────
function renderMsgsTab() {
  if (!S.chats.length) return `
    <div class="tab-section">
      <div class="empty-state">
        <i class="fa-solid fa-message"></i>
        <p>No messages yet</p>
        <small>Businesses will reach out here when they're interested in your offers</small>
      </div>
    </div>`;

  const offerIcon = { Reel: 'fa-circle-play', 'Feed Post': 'fa-image', Stories: 'fa-layer-group' };

  const items = S.chats.map(c => {
    const last    = c.messages[c.messages.length - 1];
    const preview = last.text.length > 55 ? last.text.slice(0,55) + '…' : last.text;
    return `
      <div class="chat-list-item" onclick="openChat('${c.id}','messages')">
        <div class="chat-avatar" style="background:${c.bizColor}">${c.bizInitial}</div>
        <div class="chat-list-content">
          <div class="chat-list-top">
            <p class="chat-biz-name">${c.bizName}</p>
            <span class="chat-time">${last.time}</span>
          </div>
          <span class="chat-offer-tag">
            <i class="fa-solid ${offerIcon[c.offerType] || 'fa-tag'}"></i>
            ${c.offerType} · ₹${c.offerPrice.toLocaleString('en-IN')}
          </span>
          <p class="chat-preview">${last.from === 'me' ? 'You: ' : ''}${preview}</p>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="tab-section chat-list">${items}</div>`;
}

// ─────────────────────────────────────────────────────
// CHAT DETAIL
// ─────────────────────────────────────────────────────
function openChat(chatId, fromTab) {
  S.activeChat = S.chats.find(c => c.id === chatId);
  S.returnTab  = fromTab || 'messages';
  if (!S.activeChat) return;

  const c = S.activeChat;
  document.getElementById('chat-header-info').innerHTML = `
    <div class="chat-avatar sm" style="background:${c.bizColor}">${c.bizInitial}</div>
    <p>${c.bizName}</p>
  `;
  document.getElementById('chat-offer-banner').innerHTML = `
    <i class="fa-solid fa-tag"></i>
    Re: <strong>${c.offerType}</strong> · ₹${c.offerPrice.toLocaleString('en-IN')}
  `;

  rebuildChatMessages();
  document.getElementById('chat-input').value = '';
  showView('v-chat');
}

function backFromChat() {
  showView('v-dash');
  switchTab(S.returnTab || 'messages');
}

function rebuildChatMessages() {
  const c   = S.activeChat;
  const box = document.getElementById('chat-messages');
  box.innerHTML = c.messages.map(m => `
    <div class="msg-bubble ${m.from === 'me' ? 'msg-me' : 'msg-them'}">
      <p>${m.text}</p>
      <span class="msg-time">${m.time}</span>
    </div>
  `).join('');
  setTimeout(() => { box.scrollTop = box.scrollHeight; }, 30);
}

function handleChatEnter(e) { if (e.key === 'Enter') sendMessage(); }

function sendMessage() {
  if (!S.activeChat) return;
  const input = document.getElementById('chat-input');
  const text  = (input.value || '').trim();
  if (!text) return;
  const now  = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });
  S.activeChat.messages.push({ from: 'me', text, time });
  input.value = '';
  rebuildChatMessages();
}

// ─────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────
function renderProfileTab() {
  if (!S.profile) return '';
  const p   = S.profile;
  const fmt = n => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n;

  const avBg    = avatarBg(p);
  const avInner = avatarInnerHtml(p, '28px');

  const pc = p.pinnedContent || {};
  const hasPinned = pc.reel || pc.post || pc.story;
  const pinnedHtml = hasPinned ? `
    <div class="profile-section">
      <p class="profile-section-label"><i class="fa-solid fa-thumbtack"></i> Pinned Showcase</p>
      <div class="pinned-links">
        ${pc.reel  ? `<a href="${pc.reel}"  target="_blank" rel="noopener" class="pinned-link"><span class="pkg-icon-wrap pkg-icon-reel"   style="width:26px;height:26px;border-radius:6px;flex-shrink:0;"><i class="fa-solid fa-circle-play" style="font-size:11px;"></i></span> Best Reel</a>`            : ''}
        ${pc.post  ? `<a href="${pc.post}"  target="_blank" rel="noopener" class="pinned-link"><span class="pkg-icon-wrap pkg-icon-post"    style="width:26px;height:26px;border-radius:6px;flex-shrink:0;"><i class="fa-solid fa-image"       style="font-size:11px;"></i></span> Best Feed Post</a>`       : ''}
        ${pc.story ? `<a href="${pc.story}" target="_blank" rel="noopener" class="pinned-link"><span class="pkg-icon-wrap pkg-icon-stories" style="width:26px;height:26px;border-radius:6px;flex-shrink:0;"><i class="fa-solid fa-layer-group" style="font-size:11px;"></i></span> Best Story / Highlight</a>` : ''}
      </div>
    </div>
  ` : '';

  return `
    <div class="tab-section">
      <div class="profile-card">
        <div class="profile-card-top">
          <div class="profile-avatar-lg" style="background:${avBg};">${avInner}</div>
          <div style="flex:1;min-width:0;">
            <p class="profile-name">${p.name}</p>
            <p class="profile-handle-lg">${p.handle}</p>
            <p class="profile-location">
              <i class="fa-solid fa-location-dot"></i> ${p.city} · ${p.niche}
            </p>
          </div>
          <button class="btn-edit-pencil" onclick="openEditProfile()" title="Edit profile">
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>

        <div class="profile-stats-grid">
          <div class="ps-item"><p>${fmt(p.followers)}</p><span>Followers</span></div>
          <div class="ps-item"><p>${p.engagement}%</p><span>Engagement</span></div>
          <div class="ps-item"><p>${fmt(p.likes)}</p><span>Avg Likes</span></div>
          <div class="ps-item"><p>${fmt(p.comments || 0)}</p><span>Avg Comments</span></div>
        </div>

        <div class="profile-section">
          <p class="profile-section-label"><i class="fa-solid fa-chart-bar"></i> Reach</p>
          <div class="reach-grid">
            <div class="reach-item">
              <span class="pkg-icon-wrap pkg-icon-reel" style="width:28px;height:28px;border-radius:7px;"><i class="fa-solid fa-circle-play" style="font-size:12px;"></i></span>
              <div><p class="reach-num">${fmt(p.reelViews || 0)}</p><span class="reach-label">Reel Views</span></div>
            </div>
            <div class="reach-item">
              <span class="pkg-icon-wrap pkg-icon-post" style="width:28px;height:28px;border-radius:7px;"><i class="fa-solid fa-image" style="font-size:12px;"></i></span>
              <div><p class="reach-num">${fmt(p.postViews || 0)}</p><span class="reach-label">Post Views</span></div>
            </div>
            <div class="reach-item">
              <span class="pkg-icon-wrap pkg-icon-stories" style="width:28px;height:28px;border-radius:7px;"><i class="fa-solid fa-layer-group" style="font-size:12px;"></i></span>
              <div><p class="reach-num">${fmt(p.storyViews || 0)}</p><span class="reach-label">Story Views</span></div>
            </div>
          </div>
        </div>

        ${pinnedHtml}

        <div class="profile-section">
          <a href="${p.url}" target="_blank" rel="noopener" class="btn-instagram">
            <i class="fa-brands fa-instagram"></i> View Instagram Profile
          </a>
        </div>
      </div>
      <div class="profile-actions">
        <button class="act-btn act-delete" style="flex:1" onclick="logOut()">
          <i class="fa-solid fa-right-from-bracket"></i> Log Out
        </button>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// EDIT PROFILE
// ─────────────────────────────────────────────────────
const NICHE_MAP = {
  'Food & Beverage':    { icon: 'fa-utensils', label: 'Food & Bev' },
  'Fashion & Lifestyle':{ icon: 'fa-shirt',    label: 'Fashion' },
  'Fitness & Health':   { icon: 'fa-dumbbell', label: 'Fitness' },
  'Travel':             { icon: 'fa-plane',    label: 'Travel' },
  'Beauty & Skincare':  { icon: 'fa-spa',      label: 'Beauty' },
  'Tech & Gadgets':     { icon: 'fa-microchip',label: 'Tech' },
  'Home & Decor':       { icon: 'fa-house',    label: 'Home' },
  'Entertainment':      { icon: 'fa-film',     label: 'Entertainment' },
  'Other':              { icon: 'fa-star',     label: 'Other' }
};

function openEditProfile() {
  const p = S.profile;
  if (!p) return;

  // Step 1 fields
  document.getElementById('edit-name').value   = p.name || '';
  document.getElementById('edit-handle').value = (p.handle || '').replace('@', '');
  document.getElementById('edit-url').value    = p.url || '';
  document.getElementById('edit-city').value   = p.city || '';

  // Niche picker
  document.getElementById('edit-niche').value = p.niche || '';
  const ni = NICHE_MAP[p.niche];
  const nd = document.getElementById('edit-niche-display');
  if (nd && ni) nd.innerHTML = `<i class="fa-solid ${ni.icon}"></i> <span>${ni.label}</span>`;

  // Photo thumb — show current avatar
  const thumb = document.getElementById('edit-photo-thumb');
  if (thumb) {
    if (p.avatarType === 'photo') {
      thumb.style.background = '#f3f4f6';
      thumb.style.border = 'none';
      thumb.innerHTML = `<img src="${p.avatarData}" alt="Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
      document.getElementById('edit-btn-remove-photo')?.classList.remove('hidden');
    } else {
      thumb.style.background = p.avatarData?.bg || 'var(--primary)';
      thumb.style.border = '';
      thumb.innerHTML = `<i class="fa-solid ${p.avatarData?.icon || 'fa-user'}" style="font-size:22px;color:#fff;"></i>`;
      document.getElementById('edit-btn-remove-photo')?.classList.add('hidden');
    }
  }

  // Step 2 fields
  document.getElementById('edit-followers').value  = p.followers  || '';
  document.getElementById('edit-engagement').value = p.engagement || '';
  document.getElementById('edit-reel-views').value  = p.reelViews  || '';
  document.getElementById('edit-post-views').value  = p.postViews  || '';
  document.getElementById('edit-story-views').value = p.storyViews || '';
  document.getElementById('edit-likes').value      = p.likes    || '';
  document.getElementById('edit-comments').value   = p.comments || '';

  // Pinned content
  const pc = p.pinnedContent || {};
  document.getElementById('edit-pin-reel').value  = pc.reel  || '';
  document.getElementById('edit-pin-post').value  = pc.post  || '';
  document.getElementById('edit-pin-story').value = pc.story || '';

  // Clear all errors
  ['edit-err-name','edit-err-handle','edit-err-url','edit-err-city','edit-err-niche',
   'edit-err-followers','edit-err-engagement',
   'edit-err-reel-views','edit-err-post-views','edit-err-story-views',
   'edit-err-likes','edit-err-comments']
    .forEach(id => setErr(id, ''));

  // Reset photo draft
  S.editDraft = { newPhoto: null };

  // Always start on step 1
  document.getElementById('edit-panel-1')?.classList.remove('hidden');
  document.getElementById('edit-panel-2')?.classList.add('hidden');

  showView('v-edit');
}

function cancelEdit() {
  showView('v-dash');
  switchTab('profile');
}

// ── Edit photo upload ──
function handleEditPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('Please select an image file'); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    S.editDraft.newPhoto = e.target.result;
    const thumb = document.getElementById('edit-photo-thumb');
    if (thumb) {
      thumb.style.background = '#f3f4f6';
      thumb.style.border = 'none';
      thumb.innerHTML = `<img src="${S.editDraft.newPhoto}" alt="Photo" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    }
    document.getElementById('edit-btn-remove-photo')?.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function removeEditPhoto() {
  S.editDraft.newPhoto = null;
  S.editDraft.removePhoto = true;
  const p     = S.profile;
  const thumb = document.getElementById('edit-photo-thumb');
  if (thumb) {
    // Revert to their animal avatar (keep same animal, don't pick new one)
    if (p.avatarType === 'animal') {
      thumb.style.background = p.avatarData?.bg || 'var(--primary)';
      thumb.style.border = '';
      thumb.innerHTML = `<i class="fa-solid ${p.avatarData?.icon || 'fa-user'}" style="font-size:22px;color:#fff;"></i>`;
    } else {
      thumb.style.background = '';
      thumb.style.border = '';
      thumb.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
  }
  document.getElementById('edit-btn-remove-photo')?.classList.add('hidden');
  const input = document.getElementById('edit-photo-upload');
  if (input) input.value = '';
}

// ── Edit niche picker ──
function toggleEditNichePicker() {
  const dd    = document.getElementById('edit-niche-dropdown');
  const arrow = document.getElementById('edit-niche-arrow');
  if (!dd) return;
  const opening = dd.classList.contains('hidden');
  dd.classList.toggle('hidden', !opening);
  if (arrow) arrow.style.transform = opening ? 'rotate(180deg)' : '';
  if (opening) {
    setTimeout(() => dd.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}

function pickEditNiche(value, icon, label) {
  document.getElementById('edit-niche').value = value;
  const display = document.getElementById('edit-niche-display');
  if (display) display.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${label}</span>`;
  document.getElementById('edit-niche-dropdown')?.classList.add('hidden');
  const arrow = document.getElementById('edit-niche-arrow');
  if (arrow) arrow.style.transform = '';
  setErr('edit-err-niche', '');
}

// ── Step navigation ──
function editGoToStep2() {
  const name   = document.getElementById('edit-name').value;
  const handle = document.getElementById('edit-handle').value;
  const url    = document.getElementById('edit-url').value;
  const city   = document.getElementById('edit-city').value;
  const niche  = document.getElementById('edit-niche').value;

  const hasError = runValidation({
    'edit-err-name':   V.name(name),
    'edit-err-handle': V.handle(handle),
    'edit-err-url':    V.url(url, handle),
    'edit-err-city':   V.city(city),
    'edit-err-niche':  V.niche(niche)
  });
  if (hasError) return;

  document.getElementById('edit-panel-1')?.classList.add('hidden');
  document.getElementById('edit-panel-2')?.classList.remove('hidden');
  window.scrollTo(0, 0);
}

function editGoToStep1() {
  document.getElementById('edit-panel-2')?.classList.add('hidden');
  document.getElementById('edit-panel-1')?.classList.remove('hidden');
  window.scrollTo(0, 0);
}

function saveEditProfile() {
  const followers  = document.getElementById('edit-followers').value;
  const engagement = document.getElementById('edit-engagement').value;
  const reelViews  = document.getElementById('edit-reel-views').value;
  const postViews  = document.getElementById('edit-post-views').value;
  const storyViews = document.getElementById('edit-story-views').value;
  const likes      = document.getElementById('edit-likes').value;
  const comments   = document.getElementById('edit-comments').value;

  const hasError = runValidation({
    'edit-err-followers':   V.followers(followers),
    'edit-err-engagement':  V.engagement(engagement),
    'edit-err-reel-views':  V.nonNeg(reelViews,  'average Reel views'),
    'edit-err-post-views':  V.nonNeg(postViews,  'average Post views'),
    'edit-err-story-views': V.nonNeg(storyViews, 'average Story views'),
    'edit-err-likes':       V.nonNeg(likes,    'average likes per post'),
    'edit-err-comments':    V.nonNeg(comments, 'average comments per post')
  });
  if (hasError) return;

  const p      = S.profile;
  const name   = document.getElementById('edit-name').value.trim();
  const handle = document.getElementById('edit-handle').value.trim();

  p.name       = name;
  p.handle     = handle;
  p.url        = document.getElementById('edit-url').value.trim();
  p.city       = document.getElementById('edit-city').value.trim();
  p.niche      = document.getElementById('edit-niche').value;
  p.followers  = parseInt(followers);
  p.engagement = parseFloat(engagement);
  p.reelViews  = parseInt(reelViews);
  p.postViews  = parseInt(postViews);
  p.storyViews = parseInt(storyViews);
  p.likes      = parseInt(likes);
  p.comments   = parseInt(comments);
  p.pinnedContent = {
    reel:  (document.getElementById('edit-pin-reel')?.value  || '').trim(),
    post:  (document.getElementById('edit-pin-post')?.value  || '').trim(),
    story: (document.getElementById('edit-pin-story')?.value || '').trim()
  };

  // Update avatar if photo was changed/removed
  if (S.editDraft.newPhoto) {
    p.avatarType = 'photo';
    p.avatarData = S.editDraft.newPhoto;
  } else if (S.editDraft.removePhoto && p.avatarType === 'photo') {
    // Revert to the profile's existing animal (already stored), or pick new random
    if (!p._animalBackup) {
      p.avatarType = 'animal';
      p.avatarData = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    } else {
      p.avatarType = 'animal';
      p.avatarData = p._animalBackup;
    }
  }

  saveState();

  // Refresh dashboard header avatar
  const dashAv = document.getElementById('dash-avatar');
  if (dashAv) applyAvatar(dashAv, p, '20px');
  document.getElementById('dash-handle').textContent = p.handle;
  document.getElementById('dash-meta').textContent   = `${p.city} · ${p.niche}`;

  showView('v-dash');
  switchTab('profile');
  showToast('Profile updated!');
}

function logOut() {
  if (!confirm('Log out? Your profile data will be cleared from this device.')) return;
  localStorage.removeItem('inf_profile');
  localStorage.removeItem('inf_offers');
  window.location.href = 'index.html';
}

// ─────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day:'numeric', month:'short' });
}

let _toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.add('hidden'), 3000);
}

// ─────────────────────────────────────────────────────
// SERVICE WORKER
// ─────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.warn('SW registration failed:', err));
  });
}
