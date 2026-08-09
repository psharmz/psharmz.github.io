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


/* ── Silent looping videos (.cs-video__el) ─────────────────────────────
   Shared by the case studies so each page doesn't hand-roll its own
   observer. The markup carries preload="none", so nothing downloads
   until the figure scrolls into view; playback pauses again on the way
   out so a clip never runs off-screen. See .cs-video in template.css. */
(function () {
  var vids = document.querySelectorAll('.cs-video__el');
  if (!vids.length) return;

  // Muted + playsinline are what let autoplay through, mobile included.
  vids.forEach(function (v) {
    v.muted = true;
    v.defaultMuted = true;
  });

  if (!('IntersectionObserver' in window)) {
    vids.forEach(function (v) { v.preload = 'metadata'; });
    return;
  }

  // Observe the clipping FIGURE, not the video element. A cropped video is
  // scaled well beyond its visible window (.cs-video--crop-x), so a threshold
  // measured against the element itself may never be met and it never plays.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target.matches('.cs-video__el')
        ? e.target
        : e.target.querySelector('.cs-video__el');
      if (!v) return;
      if (e.isIntersecting) {
        if (v.preload !== 'auto') v.preload = 'auto';
        // play() rejects on a backgrounded tab or blocked autoplay; the
        // catch keeps that out of the console.
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { threshold: 0.25 });

  vids.forEach(function (v) { io.observe(v.closest('.cs-video') || v); });
})();
