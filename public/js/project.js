/* ── ScrollReveal — project page animations ── */
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal({
    distance:  '32px',
    duration:  1200,
    easing:    'cubic-bezier(0.16, 1, 0.3, 1)',
    opacity:   0,
    reset:     false,
  });

  /* Section headings slide up */
  ScrollReveal().reveal('.project-info h2, .project-info h3', {
    origin:   'bottom',
    distance: '24px',
    duration: 1000,
    interval: 150,
  });

  /* Body copy fades in slightly after headings */
  ScrollReveal().reveal('.project-info p', {
    origin:   'bottom',
    distance: '16px',
    duration: 1000,
    delay:    100,
    interval: 80,
  });

  /* Images rise up more dramatically */
  ScrollReveal().reveal('.project-info img', {
    origin:   'bottom',
    distance: '40px',
    duration: 1200,
    delay:    150,
    interval: 160,
  });
}


/* ── Mobile hamburger nav ──────────────────────────────────────
   On phones the work/email/resume nav becomes a top-right hamburger
   that opens a full-page white takeover with the links stacked. The
   overlay reuses the existing .top-nav links so behaviour is identical.
   CSS lives in css/project.css; everything here only shows on mobile. */
(function () {
  function buildMobileNav() {
    var topNav = document.querySelector('.top-nav');
    var navLinks = topNav ? topNav.querySelector('.nav-links') : null;
    if (!navLinks) return;                                    // no nav on this page
    if (document.querySelector('.mobile-nav-toggle')) return; // already built

    var toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    var linksClone = navLinks.cloneNode(true);
    overlay.appendChild(linksClone);

    function close() {
      overlay.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('mobile-nav-open');
    }
    function open() {
      overlay.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('mobile-nav-open');
    }

    toggle.addEventListener('click', function () {
      overlay.classList.contains('is-open') ? close() : open();
    });
    linksClone.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);                     // close after a selection
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();                      // tap backdrop to close
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    document.body.appendChild(toggle);
    document.body.appendChild(overlay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMobileNav);
  } else {
    buildMobileNav();
  }
})();
