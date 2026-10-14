// Moves the highlight on .btn buttons (css/buttons.css) to follow the pointer.
// One delegated listener; nothing runs while the pointer is still or off a button.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('pointermove', function (e) {
    var btn = e.target.closest && e.target.closest('.btn');
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    btn.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  }, { passive: true });
})();
