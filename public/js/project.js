/* ── ScrollReveal — project page animations ── */
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
