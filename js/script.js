/**
 * Quantus - Quantum-Secure Encrypted Money
 * Vanilla JavaScript (100% Framework-Free)
 * Fully Responsive & Offline Resilient
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAsciiHeroWave();
  initTicker();
  initScrollAnimations();
  initEcosystemVisuals();
  initNewsletter();
  initNavigation();
  initLanguageSwitcher();
  initToastSystem();
});

/* ==========================================================================
   Terminal Loader
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  const terminal = document.getElementById('terminal');
  if (!loader || !terminal) return;

  const lines = [
    { text: 'INIT QUANTUS POST-QUANTUM KERNEL...', class: '' },
    { text: '[OK] ML-DSA / DILITHIUM-5 SIGNATURE ENGINE LOADED', class: 'ok' },
    { text: '[OK] RECURSIVE STARK ZK VERIFIER: ACTIVE', class: 'ok' },
    { text: '[OK] P2P SEED LIST: 247 ACTIVE MINERS CONNECTED', class: 'ok' },
    { text: '[OK] BLOCKCHAIN STATE VERIFIED // SUPPLY CAP: 21,000,000 QTC', class: 'ac' },
    { text: 'SYS_STATUS: OPTIMAL <span class="blink"></span>', class: '' }
  ];

  let currentLine = 0;
  function showNextLine() {
    if (currentLine < lines.length) {
      const lineData = lines[currentLine];
      const p = document.createElement('div');
      p.className = `tl on ${lineData.class}`;
      p.innerHTML = lineData.text;
      terminal.appendChild(p);
      currentLine++;
      setTimeout(showNextLine, 100);
    } else {
      setTimeout(() => {
        loader.classList.add('out');
      }, 300);
    }
  }

  showNextLine();
}

/* ==========================================================================
   Interactive ASCII Quantum Wave Simulation (Responsive for Mobile & Desktop)
   ========================================================================== */
function initAsciiHeroWave() {
  const container = document.getElementById('ascii-hero');
  const freqVal = document.getElementById('fval');
  if (!container) return;

  let modeM = 3;
  let modeN = 2;
  let time = 0;

  // Character density palette from sparse to dense
  const charset = [' ', ' ', '.', '.', ',', ':', ';', '+', 'x', '|', '#'];

  function updateDimensions() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const charW = w <= 480 ? 6.5 : w <= 768 ? 7.5 : 9.5;
    const charH = w <= 480 ? 12 : w <= 768 ? 14 : 16;
    const cols = Math.floor(w / charW);
    const rows = Math.floor(h / charH);
    return { cols: Math.max(26, cols), rows: Math.max(14, rows) };
  }

  let { cols, rows } = updateDimensions();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const dims = updateDimensions();
      cols = dims.cols;
      rows = dims.rows;
    }, 150);
  });

  // Mouse move shifts the quantum wave frequency mode (m, n)
  window.addEventListener('mousemove', (e) => {
    const xPct = e.clientX / window.innerWidth;
    const yPct = e.clientY / window.innerHeight;
    const newM = Math.min(6, Math.max(1, Math.floor(xPct * 5) + 1));
    const newN = Math.min(5, Math.max(1, Math.floor(yPct * 4) + 1));

    if (newM !== modeM || newN !== modeN) {
      modeM = newM;
      modeN = newN;
      if (freqVal) {
        freqVal.textContent = `${modeM},${modeN}`;
      }
    }
  });

  function renderWave() {
    let output = '';
    const aspect = cols / rows;

    for (let r = 0; r < rows; r++) {
      let line = '';
      const v = (r / rows - 0.5) * 2;

      for (let c = 0; c < cols; c++) {
        const u = (c / cols - 0.5) * 2 * aspect;
        const dist = Math.sqrt(u * u + v * v);
        const theta = Math.atan2(v, u);

        // Quantum cylindrical wave harmonics
        const wRadial = Math.cos(modeM * Math.PI * 2.4 * dist - time * 2.2);
        const wAngular = Math.cos(modeN * theta + time * 1.4);
        const combined = wRadial * 0.7 + wAngular * 0.3;

        // Radial falloff towards edges
        const falloff = Math.max(0, 1 - dist * 0.65);
        const intensity = (combined * 0.5 + 0.5) * falloff;

        const charIdx = Math.floor(intensity * (charset.length - 1));
        line += charset[Math.max(0, Math.min(charset.length - 1, charIdx))];
      }
      output += line + '\n';
    }

    container.textContent = output;
    time += 0.035;
    requestAnimationFrame(renderWave);
  }

  requestAnimationFrame(renderWave);
}

/* ==========================================================================
   Live Ticker & Blockchain Stats
   ========================================================================== */
function initTicker() {
  const liveBlock = document.getElementById('live-block-height');
  if (!liveBlock) return;

  let currentBlock = 160413;

  setInterval(() => {
    currentBlock += 1;
    liveBlock.textContent = currentBlock.toLocaleString();
  }, 12000);
}

/* ==========================================================================
   Scroll-Triggered Animations (Enhanced: Content is pre-rendered in HTML)
   ========================================================================== */
function initScrollAnimations() {
  const solDivider = document.getElementById('sol-divider');
  const twContent = document.getElementById('tw-content');
  const twText = document.getElementById('typewriter-text');
  const twCursor = document.getElementById('tw-cursor');
  const solEyebrow = document.querySelector('.sol-tw-eyebrow');
  const pillars = document.getElementById('pillars');

  if (solDivider && twText && twContent) {
    const typewriterQuote =
      'Quantus is quantum secure, private, scalable money. It uses NIST-approved post-quantum cryptography, ZK for scaling, and PoW mining. Maximally fair tokenomics modeled after Bitcoin.';

    let hasStartedTypewriter = false;

    if ('IntersectionObserver' in window) {
      const solObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasStartedTypewriter) {
            hasStartedTypewriter = true;
            solDivider.classList.add('expanded');
            if (solEyebrow) solEyebrow.classList.add('visible');

            // Clear pre-rendered text to animate
            twContent.textContent = '';
            let charIdx = 0;
            function typeNextChar() {
              if (charIdx < typewriterQuote.length) {
                twContent.textContent += typewriterQuote[charIdx];
                charIdx++;
                setTimeout(typeNextChar, 14);
              } else {
                if (twCursor) twCursor.classList.add('hidden');
              }
            }

            setTimeout(typeNextChar, 300);
            solObserver.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      solObserver.observe(solDivider);
    }
  }
}

/* ==========================================================================
   Ecosystem Visual Diagrams (SVG Lattice & Network Graph)
   ========================================================================== */
function initEcosystemVisuals() {
  const latticeSvg = document.getElementById('lattice-svg');
  if (latticeSvg && latticeSvg.children.length === 0) {
    const ns = 'http://www.w3.org/2000/svg';
    const rows = 4;
    const cols = 5;
    const startX = 16;
    const startY = 14;
    const gapX = 32;
    const gapY = 28;
    const nodes = [];

    // Grid lines
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * gapX;
        const y = startY + r * gapY;
        nodes.push({ x, y });

        // Horizontal connections
        if (c < cols - 1) {
          const line = document.createElementNS(ns, 'line');
          line.setAttribute('x1', x.toString());
          line.setAttribute('y1', y.toString());
          line.setAttribute('x2', (x + gapX).toString());
          line.setAttribute('y2', y.toString());
          line.setAttribute('stroke', 'rgba(232, 230, 224, 0.12)');
          line.setAttribute('stroke-width', '0.75');
          latticeSvg.appendChild(line);
        }

        // Vertical connections
        if (r < rows - 1) {
          const line = document.createElementNS(ns, 'line');
          line.setAttribute('x1', x.toString());
          line.setAttribute('y1', y.toString());
          line.setAttribute('x2', x.toString());
          line.setAttribute('y2', (y + gapY).toString());
          line.setAttribute('stroke', 'rgba(232, 230, 224, 0.12)');
          line.setAttribute('stroke-width', '0.75');
          latticeSvg.appendChild(line);
        }

        // Diagonal lattice connections
        if (c < cols - 1 && r < rows - 1 && (c + r) % 2 === 0) {
          const line = document.createElementNS(ns, 'line');
          line.setAttribute('x1', x.toString());
          line.setAttribute('y1', y.toString());
          line.setAttribute('x2', (x + gapX).toString());
          line.setAttribute('y2', (y + gapY).toString());
          line.setAttribute('stroke', 'rgba(232, 230, 224, 0.08)');
          line.setAttribute('stroke-width', '0.5');
          line.setAttribute('stroke-dasharray', '2,3');
          latticeSvg.appendChild(line);
        }
      }
    }

    // Special accent orange quantum nodes
    const accents = [
      [48, 42],
      [112, 70],
      [80, 98]
    ];
    accents.forEach(([ax, ay]) => {
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', ax.toString());
      circle.setAttribute('cy', ay.toString());
      circle.setAttribute('r', '3.5');
      circle.setAttribute('stroke', '#FF6B35');
      circle.setAttribute('stroke-width', '1.2');
      circle.setAttribute('fill', 'rgba(255, 107, 53, 0.3)');
      latticeSvg.appendChild(circle);
    });

    // Standard lattice nodes
    nodes.forEach(({ x, y }) => {
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', 'rgba(232, 230, 224, 0.35)');
      circle.classList.add('lattice-node');
      latticeSvg.appendChild(circle);
    });

    const wpCard = latticeSvg.closest('.eco-card');
    if (wpCard) {
      wpCard.addEventListener('mouseenter', () => {
        latticeSvg.querySelectorAll('.lattice-node').forEach((n) => n.classList.add('pulsing'));
      });
      wpCard.addEventListener('mouseleave', () => {
        latticeSvg.querySelectorAll('.lattice-node').forEach((n) => n.classList.remove('pulsing'));
      });
    }
  }

  // Network Center Pulsing animation
  const netCentre = document.getElementById('net-centre');
  if (netCentre) {
    let opacity = 0.3;
    let step = 0.012;
    function animateNetworkCenter() {
      opacity += step;
      if (opacity >= 0.95) {
        opacity = 0.95;
        step = -0.012;
      } else if (opacity <= 0.25) {
        opacity = 0.25;
        step = 0.012;
      }
      netCentre.setAttribute('opacity', opacity.toString());
      requestAnimationFrame(animateNetworkCenter);
    }
    requestAnimationFrame(animateNetworkCenter);
  }
}

/* ==========================================================================
   Newsletter Form Validation & Success State
   ========================================================================== */
function initNewsletter() {
  const submitBtn = document.getElementById('nl-submit');
  const firstName = document.getElementById('nl-firstname');
  const lastName = document.getElementById('nl-lastname');
  const email = document.getElementById('nl-email');
  const errorMsg = document.getElementById('nl-error');
  const formWrap = document.getElementById('newsletter-form-wrap');
  const successWrap = document.getElementById('newsletter-success');

  if (!submitBtn || !email) return;

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  submitBtn.addEventListener('click', () => {
    let hasError = false;

    if (!firstName.value.trim()) {
      firstName.classList.add('error');
      hasError = true;
    } else {
      firstName.classList.remove('error');
    }

    if (!lastName.value.trim()) {
      lastName.classList.add('error');
      hasError = true;
    } else {
      lastName.classList.remove('error');
    }

    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      email.classList.add('error');
      hasError = true;
    } else {
      email.classList.remove('error');
    }

    if (hasError) {
      if (errorMsg) errorMsg.classList.add('visible');
    } else {
      if (errorMsg) errorMsg.classList.remove('visible');
      if (formWrap) formWrap.style.display = 'none';
      if (successWrap) successWrap.classList.add('visible');

      if (window.toast) {
        window.toast.success('Successfully subscribed to Quantus Alpha Alert!');
      }
    }
  });

  [firstName, lastName, email].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        if (errorMsg) errorMsg.classList.remove('visible');
      });
    }
  });
}

/* ==========================================================================
   Navbar & Mobile Menu (Responsive with Header & Close Button)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileClose = document.getElementById('mobile-nav-close');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  function closeMobile() {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMobile() {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMobile();
      } else {
        openMobile();
      }
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobile);
    }

    document.querySelectorAll('.mobile-nav-link, .btn-wallet-mobile').forEach((link) => {
      link.addEventListener('click', closeMobile);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobile();
      }
    });
  }
}

/* ==========================================================================
   Language Switcher Dropdown
   ========================================================================== */
function initLanguageSwitcher() {
  const switcherBtn = document.getElementById('language-switcher');
  const listbox = document.getElementById('language-switcher-listbox');
  if (!switcherBtn || !listbox) return;

  switcherBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    listbox.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!switcherBtn.contains(e.target) && !listbox.contains(e.target)) {
      listbox.classList.remove('open');
    }
  });

  listbox.querySelectorAll('.language-option').forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      listbox.querySelectorAll('.language-option').forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      const langText = opt.querySelector('span:last-child')?.textContent || 'English';
      const langFlag = opt.querySelector('span:first-child')?.textContent || '🇺🇸';
      const flagEl = switcherBtn.querySelector('span:first-child');
      const textEl = switcherBtn.querySelector('span:nth-child(2)');
      if (flagEl) flagEl.textContent = langFlag;
      if (textEl) textEl.textContent = langText;
      listbox.classList.remove('open');

      if (window.toast) {
        window.toast.info(`Language set to ${langText}`);
      }
    });
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function initToastSystem() {
  class ToastManager {
    constructor() {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-stack';
        document.body.appendChild(container);
      }
      this.container = container;
    }

    show(message, type = 'info', duration = 3500) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type} toast-hidden`;

      toast.innerHTML = `
        <div class="toast-rail"></div>
        <div class="toast-main">
          <span>${message}</span>
        </div>
        <div class="toast-close">✕</div>
      `;

      this.container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('toast-hidden');
      });

      const dismiss = () => {
        toast.classList.add('toast-hidden');
        setTimeout(() => toast.remove(), 350);
      };

      toast.querySelector('.toast-close').addEventListener('click', dismiss);
      setTimeout(dismiss, duration);
    }

    success(msg, duration) {
      this.show(msg, 'success', duration);
    }

    error(msg, duration) {
      this.show(msg, 'error', duration);
    }

    info(msg, duration) {
      this.show(msg, 'info', duration);
    }
  }

  window.toast = new ToastManager();
}
