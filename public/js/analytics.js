// Analytics (Google Analytics 4) with consent. Add your Measurement ID below
// (GA4 → Admin → Data streams → "G-XXXXXXXXXX"). While it is empty this file does
// nothing: no network calls, no banner.
//
// - Consent Mode: storage is denied until the visitor accepts the small banner.
// - Honors Do Not Track / Global Privacy Control (never loads, no banner).
// - Events: case_study_click, gate_view, gate_success, gate_fail, cta_click,
//   scroll_depth. Page views come from GA itself. window.track(name, params).
(function () {
  var GA_ID = ''; // e.g. 'G-ABCDEF1234'
  var KEY = 'analyticsConsent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.track = function () {};

  if (!GA_ID) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === 'declined') return;

  gtag('consent', 'default', {
    analytics_storage: stored === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
  });
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  window.track = function (name, params) { gtag('event', name, params || {}); };

  function banner() {
    ['/css/fonts.css', '/css/buttons.css'].forEach(function (href) {
      if (!document.querySelector('link[href$="' + href.split('/').pop() + '"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
      }
    });
    var b = document.createElement('div');
    b.className = 'consent';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Analytics consent');
    b.innerHTML =
      '<p class="type-caption">I use privacy-respecting analytics to see which work gets read. OK?</p>' +
      '<div class="consent__actions">' +
      '<button type="button" class="btn type-button" data-consent="granted">Accept</button>' +
      '<button type="button" class="btn btn--quiet type-button" data-consent="declined">No thanks</button>' +
      '</div>';
    b.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!v) return;
      try { localStorage.setItem(KEY, v); } catch (err) {}
      if (v === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });
      b.remove();
    });
    document.body.appendChild(b);
  }
  if (!stored) document.addEventListener('DOMContentLoaded', banner);

  // Clicks: case studies and calls to action, by href / role.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var label = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 60);
    var m = href.match(/(?:next=)?([A-Za-z0-9_-]+)\.html/);
    if (m && /^(teams|rasa|enterprise|horizontal-design|windows|murals|portfolio-home|portfolio)$/.test(m[1])) {
      window.track('case_study_click', { project: m[1], link_text: label, from: location.pathname });
    } else if (/linkedin\.com|mailto:|\.pdf$|rfl-studyhall|wonderschool/.test(href) || a.classList.contains('btn')) {
      window.track('cta_click', { link_url: href.slice(0, 120), link_text: label, from: location.pathname });
    } else if (/#cv|#words/.test(href)) {
      window.track('nav_click', { target: href });
    }
  });

  // Scroll depth on every page: 25 / 50 / 75 / 100.
  var marks = [25, 50, 75, 100], hit = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h <= 0) return;
    var p = Math.round((scrollY / h) * 100);
    marks.forEach(function (m) {
      if (p >= m && !hit[m]) { hit[m] = 1; window.track('scroll_depth', { percent: m, page: location.pathname }); }
    });
  }, { passive: true });
})();
