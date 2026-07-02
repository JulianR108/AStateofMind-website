/* ==========================================================
   A STATE OF MIND — SHARED NAV + FOOTER + BEHAVIORS
   ========================================================== */

const NAV_HTML = `
<nav class="main-nav" id="main-nav">
  <a href="index.html" class="nav-logo">
    <img src="images/logo-no-words.png" alt="A State of Mind logo" class="nav-logo-img">
    <span class="nav-logo-text">
      A State of Mind
      <span class="nav-logo-sub">Therapy &amp; Counseling</span>
    </span>
  </a>
  <ul class="nav-links" id="nav-links">
    <li class="nav-item has-dropdown">
      <a href="about.html">About</a>
      <ul class="dropdown">
        <li><a href="about.html">About Julian</a></li>
        <li><a href="rates-location.html">Rates &amp; Location</a></li>
        <li><a href="credentials.html">Credentials Explanation</a></li>
        <li><a href="faqs.html">FAQ's</a></li>
      </ul>
    </li>
    <li class="nav-item has-dropdown">
      <a href="psychedelic-therapy.html">Psychedelic Therapy</a>
      <ul class="dropdown">
        <li><a href="psychedelic-therapy.html">Psychedelic Therapy</a></li>
        <li><a href="ketamine.html">Ketamine</a></li>
        <li><a href="psilocybin.html">Psilocybin</a></li>
        <li><a href="mdma.html">MDMA</a></li>
      </ul>
    </li>
    <li class="nav-item has-dropdown">
      <a href="trauma.html">Specialties</a>
      <ul class="dropdown">
        <li><a href="trauma.html">Trauma</a></li>
        <li><a href="ifs.html">IFS</a></li>
        <li><a href="relationships.html">Relationships</a></li>
        <li><a href="somatic.html">Somatic</a></li>
        <li><a href="life-transitions.html">Life Transitions</a></li>
      </ul>
    </li>
    <li class="nav-item has-dropdown">
      <a href="meditation-training.html">Meditation</a>
      <ul class="dropdown">
        <li><a href="meditation-training.html">Meditation Training</a></li>
        <li><a href="meditation-backstory.html">Julian's Meditation Backstory</a></li>
      </ul>
    </li>
    <li class="nav-item has-dropdown">
      <a href="podcast.html">Podcast &amp; Store</a>
      <ul class="dropdown">
        <li><a href="podcast.html">A State of Mind Podcast</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="store.html">Store</a></li>
      </ul>
    </li>
    <li class="nav-item">
      <a href="contact.html">Contact</a>
    </li>
  </ul>
  <a href="tel:3034166116" class="nav-phone">(303) 416-6116</a>
  <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu">☰</button>
</nav>
`;

const POPUP_HTML = `
<div class="newsletter-popup" id="newsletter-popup" aria-hidden="true">
  <div class="newsletter-popup-backdrop" id="popup-backdrop"></div>
  <div class="newsletter-popup-card">
    <button class="newsletter-popup-close" id="popup-close" aria-label="Close">&times;</button>
    <div class="newsletter-popup-image">
      <img src="images/julian-sailor-blazer.jpg" alt="Julian Royce, MA LPC with Sailor Moon">
    </div>
    <div class="newsletter-popup-body">
      <p class="newsletter-popup-eyebrow">Stay in Touch</p>
      <h3>Start your Journey to <em>Health, Happiness &amp; Meaning</em></h3>
      <p class="newsletter-popup-sub">Occasional essays, reflections, and updates — straight to your inbox.</p>
      <form class="newsletter-popup-form" id="newsletter-form" onsubmit="event.preventDefault(); handleNewsletterSignup();">
        <input type="email" id="newsletter-email" name="email" placeholder="Your email address" required>
        <button type="submit" class="btn btn-primary">Subscribe</button>
      </form>
      <p class="newsletter-popup-note">No spam, ever. Unsubscribe anytime.</p>
    </div>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="images/logo-with-words.png" alt="A State of Mind Counseling" class="footer-logo-img">
      <p>Depth-oriented therapy for healing, clarity, and a life lived fully. Serving clients in Boulder and across Colorado via telehealth.</p>
      <address>
        1111 Spruce Street, Suite 402<br>
        Boulder, CO 80302<br><br>
        <a href="tel:3034166116" class="footer-phone">(303) 416-6116</a>
      </address>
    </div>
    <div class="footer-col">
      <h4>About</h4>
      <ul>
        <li><a href="about.html">About Julian</a></li>
        <li><a href="rates-location.html">Rates &amp; Location</a></li>
        <li><a href="credentials.html">Credentials</a></li>
        <li><a href="faqs.html">FAQs</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="trauma.html">Trauma Therapy</a></li>
        <li><a href="relationships.html">Relationships</a></li>
        <li><a href="psychedelic-therapy.html">Psychedelic Therapy</a></li>
        <li><a href="meditation-training.html">Meditation</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="podcast.html">Podcast</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="store.html">Store</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2024 Julian Royce, MA LPC · License #76277</p>
    <div>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms &amp; Conditions</a>
    </div>
  </div>
</footer>
`;

// Inject nav and footer
document.addEventListener('DOMContentLoaded', () => {
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');
  if (navMount) navMount.innerHTML = NAV_HTML;
  if (footerMount) footerMount.innerHTML = FOOTER_HTML;

  // Inject popup — only on home page & only if not dismissed this session
  if (window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('/')) {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('newsletterPopupDismissed'); } catch(e) {}
    if (!dismissed) {
      const popupMount = document.createElement('div');
      popupMount.innerHTML = POPUP_HTML;
      document.body.appendChild(popupMount);

      // Show popup after 8 seconds
      setTimeout(() => {
        const popup = document.getElementById('newsletter-popup');
        if (popup) popup.classList.add('visible');
      }, 8000);

      // Close handlers
      const closePopup = () => {
        const popup = document.getElementById('newsletter-popup');
        if (popup) {
          popup.classList.remove('visible');
          try { sessionStorage.setItem('newsletterPopupDismissed', '1'); } catch(e) {}
        }
      };
      setTimeout(() => {
        const closeBtn = document.getElementById('popup-close');
        const backdrop = document.getElementById('popup-backdrop');
        if (closeBtn) closeBtn.addEventListener('click', closePopup);
        if (backdrop) backdrop.addEventListener('click', closePopup);
      }, 100);
    }
  }

  // Newsletter signup handler (global so inline onsubmit can call it)
  window.handleNewsletterSignup = function() {
    const email = document.getElementById('newsletter-email').value;
    const form = document.getElementById('newsletter-form');
    if (form) {
      form.innerHTML = '<p style="color: var(--sage-dark); font-family: var(--font-serif); font-size: 1.2rem; font-style: italic; text-align: center; padding: 1rem 0;">Thank you! We will be in touch soon.</p>';
    }
    try { sessionStorage.setItem('newsletterPopupDismissed', '1'); } catch(e) {}
    setTimeout(() => {
      const popup = document.getElementById('newsletter-popup');
      if (popup) popup.classList.remove('visible');
    }, 2500);
  };

  // Sticky nav shadow
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Mobile toggle
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Mobile dropdown toggle
    links.querySelectorAll('.nav-item.has-dropdown > a').forEach(a => {
      a.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // Highlight current page in nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.style.color = 'var(--sage-dark)';
      a.style.fontWeight = '500';
    }
  });

  // Scroll-triggered fade-ins
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    observer.observe(el);
  });
});
