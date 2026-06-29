// --- APPLICATION STATE MANAGEMENT ---
let appState = {
  currentRole: null, // 'business' or 'influencer'
  currentSlideIndex: 0,
  influencerDataList: [
    { handle: '@aman_clicks', followers: '14.2K', engagement: '5.4%', views: '9.8K', distance: 0.8, link: 'https://instagram.com' },
    { handle: '@sneha_bites', followers: '28.0K', engagement: '4.1%', views: '18.5K', distance: 1.4, link: 'https://instagram.com' },
    { handle: '@delhi_unexplored', followers: '8.5K', engagement: '6.8%', views: '5.2K', distance: 2.3, link: 'https://instagram.com' },
    { handle: '@fitness_with_raj', followers: '42.1K', engagement: '3.2%', views: '29.0K', distance: 3.1, link: 'https://instagram.com' }
  ],
  onboardingSlides: {
    business: [
      { icon: 'fa-shop', title: 'Discover Local Creators', desc: 'Find social media influencers right around your shop setup. Filter by real distance.' },
      { icon: 'fa-chart-pie', title: 'Check Real Metrics', desc: 'No vanity metrics. Analyze verified weekly views and actual post engagement levels immediately.' },
      { icon: 'fa-bolt', title: 'Boost Foot Traffic', desc: 'Invite nearby creators to review your products or services and watch your neighborhood reach surge.' }
    ],
    influencer: [
      { icon: 'fa-bullseye', title: 'Support Neighborhood Outlets', desc: 'Discover cafes, boutiques, and services next door looking for content creators.' },
      { icon: 'fa-wallet', title: 'Earn From Local Collaborations', desc: 'Monetize your niche following by helping businesses drive trackable foot traffic.' },
      { icon: 'fa-handshake', title: 'Build Long-Term Deals', desc: 'Become the official face of local brands and establish steady monthly retainers.' }
    ]
  }
};

// --- NAVIGATION FLOW CONTROL ---
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.remove('hidden');
  }
}

// --- DYNAMIC ONBOARDING SLIDER ---
function initiateOnboarding(role) {
  appState.currentRole = role;
  appState.currentSlideIndex = 0;
  
  renderSlides();
  navigateTo('view-onboarding');
}

function renderSlides() {
  const wrapper = document.getElementById('slider-content');
  const dotsContainer = document.getElementById('slider-dots');
  const slides = appState.onboardingSlides[appState.currentRole];
  
  // Render current active slide node
  const activeSlide = slides[appState.currentSlideIndex];
  wrapper.innerHTML = `
    <div class="slide-node">
      <i class="fa-solid ${activeSlide.icon}"></i>
      <h2>${activeSlide.title}</h2>
      <p>${activeSlide.desc}</p>
    </div>
  `;
  
  // Update pagination indicators
  dotsContainer.innerHTML = slides.map((_, index) => `
    <div class="dot ${index === appState.currentSlideIndex ? 'active' : ''}"></div>
  `).join('');
  
  // Dynamic action label behavior
  const nextBtn = document.getElementById('btn-next-slide');
  if (appState.currentSlideIndex === slides.length - 1) {
    nextBtn.innerHTML = `Let's Start <i class="fa-solid fa-check"></i>`;
  } else {
    nextBtn.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
  }
}

function advanceSlide() {
  const slides = appState.onboardingSlides[appState.currentRole];
  
  if (appState.currentSlideIndex < slides.length - 1) {
    appState.currentSlideIndex++;
    renderSlides();
  } else {
    // Process target path destination based on profile type
    if (appState.currentRole === 'business') {
      renderBusinessDashboard();
      navigateTo('view-business-dashboard');
    } else {
      navigateTo('view-influencer-form');
    }
  }
}

// --- INFLUENCER DATA SUBMISSION HANDLING ---
function handleInfluencerSubmit(event) {
  event.preventDefault();
  
  const handle = document.getElementById('inf-handle').value.trim();
  const rawFollowers = parseFloat(document.getElementById('inf-followers').value);
  const engagement = parseFloat(document.getElementById('inf-engagement').value).toFixed(1) + '%';
  const rawViews = parseFloat(document.getElementById('inf-views').value);
  
  // Format numeric parameters cleanly for UX presentation
  const formatNum = num => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;

  // Append registered entry to feed runtime array
  const newProfile = {
    handle: handle.startsWith('@') ? handle : '@' + handle,
    followers: formatNum(rawFollowers),
    engagement: engagement,
    views: formatNum(rawViews),
    distance: 0.1, // Registered user is considered local/immediate proximity
    link: 'https://instagram.com'
  };
  
  // Prepend user profile so it shows first on testing feed views
  appState.influencerDataList.unshift(newProfile);
  
  // Reset form and showcase dashboard simulation
  document.getElementById('influencer-metrics-form').reset();
  renderBusinessDashboard();
  navigateTo('view-business-dashboard');
}

// --- BUSINESS FEED INJECTION ---
function renderBusinessDashboard() {
  const feed = document.getElementById('influencer-feed-list');
  
  // Ensure listing array remains strictly sorted by short distance parameters
  const sortedList = [...appState.influencerDataList].sort((a, b) => a.distance - b.distance);
  
  feed.innerHTML = sortedList.map(item => `
    <div class="feed-card">
      <div class="card-top">
        <div class="creator-identity">
          <h4>${item.handle}</h4>
          <span><i class="fa-brands fa-instagram"></i> Instagram Creator</span>
        </div>
        <span class="distance-tag">${item.distance} km away</span>
      </div>
      <div class="metrics-grid">
        <div class="metric-box">
          <label>Followers</label>
          <p>${item.followers}</p>
        </div>
        <div class="metric-box">
          <label>Engagement</label>
          <p>${item.engagement}</p>
        </div>
        <div class="metric-box">
          <label>Avg Views</label>
          <p>${item.views}</p>
        </div>
      </div>
      <a href="${item.link}" target="_blank" class="btn-instagram">
        <i class="fa-brands fa-instagram"></i> View Instagram Profile
      </a>
    </div>
  `).join('');
}

// --- PWA NATIVE ENHANCEMENT INSTALLATION LOGIC ---
let deferredPrompt;
const pwaPrompt = document.getElementById('pwa-prompt');
const btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent default installation prompts on compatible browsers
  e.preventDefault();
  deferredPrompt = e;
  // Make prompt visible layout wide
  if (pwaPrompt) pwaPrompt.classList.remove('hidden');
});

if (btnInstall) {
  btnInstall.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User installation decision outcome state: ${outcome}`);
    deferredPrompt = null;
    if (pwaPrompt) pwaPrompt.classList.add('hidden');
  });
}

// Automatically hide notification if app context is initialized in standalone mode
window.addEventListener('appinstalled', () => {
  if (pwaPrompt) pwaPrompt.classList.add('hidden');
  deferredPrompt = null;
});

// --- SERVICE WORKER PRODUCTION REGISTRATION HOOK ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('ServiceWorker pipeline active and registered:', reg.scope))
      .catch(err => console.error('ServiceWorker pipeline registration failure:', err));
  });
}