import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MobileFooter from './components/MobileFooter';
import GrainGradient from './components/GrainGradient';
import WordCard from './components/WordCard';
import SectionHeader from './components/SectionHeader';
import LockIcon from './components/LockIcon';
import { gridQuotes } from './data/testimonials';
import { strengths } from './data/strengths';


// CV timeline. Order = display order. `media` shows to the right on desktop
// (the last row you hovered stays); `cta` is optional.
const cvRoles = [
  {
    date: '2026', company: 'Rooted Futures Lab', title: 'Product Designer and Engineer',
    desc: 'Climate research lab. Designing and building Study Hall, a STEM learning game, in React.',
    media: { type: 'img', src: 'img/now/study-hall-game.png' },
    cta: { label: 'Play the game', href: 'https://rfl-studyhall.github.io', external: true },
  },
  {
    date: '2025', company: 'Wonderschool', title: 'Senior Product Designer',
    desc: 'Simplified enterprise UX for state childcare subsidies and daycare licensing. Redesigned provider onboarding to fix a 40%+ drop-off.',
    media: { type: 'img', src: 'img/now/wonderschool.jpg' },
    cta: { label: 'Learn more', href: 'https://www.wonderschool.com', external: true },
  },
  {
    date: '2020', company: 'Microsoft', title: 'Designer and Prototyper',
    desc: 'Designed AI education products used by millions. Created the Copilot for Education AI framework, adopted across M365 education.',
    media: { type: 'img', src: 'img/msoft/reading-progress.jpg' },
    cta: { label: 'View Case Study', href: 'horizontal-design.html' },
  },
  {
    date: '2018', company: 'Accenture', title: 'Design Strategist & UX Designer',
    desc: 'Consulting for Google and the State of California. Simplified complex CalFresh and CalSAWS workflows for children\u2019s benefits caseworkers.',
    media: { type: 'video', src: 'img/cover_vid.mp4', poster: 'img/posters/cover_vid.jpg' },
    cta: { label: 'View Case Study', href: 'portfolio.html?next=enterprise.html' },
  },
  {
    date: '2017', company: 'Rasa', title: 'Front-End Developer & UX Designer',
    desc: 'Sole designer and front-end engineer at a conversational AI startup. Built agentic experiences and ML ops tools for chatbots, 0\u21921 in React.',
    media: { type: 'img', src: 'img/rasa/workshop.png' },
    cta: { label: 'View Case Study', href: 'portfolio.html?next=rasa.html' },
  },
];

function MainPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  // Index of the CV row last hovered/focused. Deliberately never resets, so the
  // preview stays put when the pointer leaves.
  const [cvActive, setCvActive] = useState(0);
  // False until the first hover/focus, so the section stays black until used.
  const [cvEngaged, setCvEngaged] = useState(false);
  // Which scroll-anchored nav item matches the section in view: 'cv' | 'about' | ''.
  const [navSection, setNavSection] = useState('');
  const navigate = useNavigate();

  // WCAG 2.2.2: looping demo video shouldn't keep moving for people who've asked
  // the OS for reduced motion, so hold those on their poster/first frame.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('video[autoplay]').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }, []);

  // Underline CV / About in the nav while their section is on screen.
  useEffect(() => {
    const targets = [['cv', 'cv'], ['words', 'about']];
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const key = targets.find(([id]) => id === en.target.id)[1];
        if (en.isIntersecting) visible.add(key); else visible.delete(key);
      });
      setNavSection([...visible][0] || '');
    }, { rootMargin: '-40% 0px -40% 0px' });
    targets.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Handle hash navigation on component mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#cv') {
      document.getElementById('cv')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else if (hash === '#work' || hash === '#words' || hash === '#strengths') {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);




  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // rootMargin pulls the trigger line 12% up from the bottom of the viewport, so
    // an element is already settling as it arrives rather than starting once it is
    // plainly visible. Threshold 0 pairs with that — the margin does the work.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible', 'is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    );

    // Stagger siblings within a section. Capped so a long list never leaves the
    // last item hanging long enough to read as broken.
    const STEP = 70;
    const CAP = 420;
    document.querySelectorAll('.words-grid, .strength__row, .projects-grid').forEach((group) => {
      [...group.querySelectorAll('.scroll-reveal')].forEach((el, i) => {
        el.style.setProperty('--delay', `${Math.min(i * STEP, CAP)}ms`);
      });
    });

    document
      .querySelectorAll('.scroll-reveal, .strength')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Differential parallax: each band's media drifts a little slower than its
  // quote card, so the two columns separate in depth as the band passes. The
  // factor is small on purpose — visible drift reads as a bug.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bands = [...document.querySelectorAll('.strength')];
    if (!bands.length) return;

    const MAX = 14; // px of travel at each extreme
    let queued = false;

    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      bands.forEach((band) => {
        const media = band.querySelector('.strength__media');
        if (!media) return;
        const { top, height } = band.getBoundingClientRect();
        if (top > vh || top + height < 0) return; // offscreen — skip the write

        // Normalise over the band's whole pass through the viewport, not over vh:
        // these bands are taller than the viewport, so dividing by vh pinned the
        // result at the clamp for almost the entire scroll and the "drift" was a
        // constant offset. +1 entering from below, 0 centred, -1 leaving the top.
        const centreOffset = top + height / 2 - vh / 2;
        const travel = (vh + height) / 2;
        const progress = Math.max(-1, Math.min(1, centreOffset / travel));
        media.style.setProperty('--band-drift', `${(progress * MAX).toFixed(1)}px`);
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // The strengths embed is laid out at a fixed 495x932, so scale it to fit the
  // box the row gives it (the card sets the height). Never scales up past 1:1.
  useEffect(() => {
    const EMBED_W = 495;
    const EMBED_H = 932;
    // The phone inside the embed's design box, minus its 40/80 shadow padding.
    const PHONE_H = 812;
    const boxes = document.querySelectorAll('.strength__media--embed');
    if (!boxes.length || typeof ResizeObserver === 'undefined') return;

    const fit = (el) => {
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      // The phone stands half as tall as its band. Safe from feedback: the band's
      // height comes from the quote card, and the embed is absolutely positioned,
      // so rescaling it can never change what we just measured.
      const band = el.closest('.strength');
      const bandHeight = band ? band.getBoundingClientRect().height : height;
      const target = bandHeight / 2 / PHONE_H;
      el.style.setProperty(
        '--embed-fit',
        Math.min(1, width / EMBED_W, height / EMBED_H, target).toFixed(4)
      );
    };

    const ro = new ResizeObserver((entries) =>
      entries.forEach((e) =>
        fit(e.target.matches('.strength__media--embed')
          ? e.target
          : e.target.querySelector('.strength__media--embed'))
      )
    );
    boxes.forEach((el) => {
      fit(el);
      ro.observe(el);
      // The band drives the target size, so watch it too.
      if (el.closest('.strength')) ro.observe(el.closest('.strength'));
    });
    return () => ro.disconnect();
  }, []);

  // Anything routed through portfolio.html hits the password gate first, so the
  // button wears a lock — same treatment as "View Portfolio" in the hero.
  const isGated = (href) => /^portfolio\.html(\?|$)/.test(href);






  const cardHover = {
    onMouseEnter: (e) => e.currentTarget.classList.add('is-hovered'),
    onMouseLeave: (e) => e.currentTarget.classList.remove('is-hovered'),
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Longer duration for more dramatic effect
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth parallax effect
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className={`App${cvEngaged ? ` App--cv-${cvActive}` : ''}`}>

      <header className="site-header">
        <a className="skip-link" href="#main">Skip to content</a>
        <nav className="pill-nav intro-stagger intro-delay-1" aria-label="Primary">
          <a className="pill-nav__home" href="/" aria-label="Parul Sharma — home">
            <img className="pill-nav__avatar" src="/img/parul-avatar.jpg" alt="" width="32" height="32" />
          </a>
          <a href="/#cv" aria-current={navSection === 'cv' ? 'location' : undefined} onClick={(e) => { e.preventDefault(); document.getElementById('cv')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.history.replaceState(null, '', '#cv'); }}>CV</a>
          <a href="/portfolio.html">Work</a>
          <a href="/murals.html">Murals</a>
          <a href="#words" aria-current={navSection === 'about' ? 'location' : undefined} onClick={(e) => { e.preventDefault(); document.getElementById('words')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a>
          <a href="https://www.linkedin.com/in/psharmz/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </header>

      <main id="main">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <GrainGradient />
        <div className="hero-body">
          <h1 className="hero-title">
            <span className="type-name intro-stagger intro-delay-2">Parul Sharma</span>
            <span className="type-display intro-stagger intro-delay-3">Designer</span>
            <span className="type-display intro-stagger intro-delay-4">who ships</span>
          </h1>
          <div className="hero-copy">
            <p className="type-statement intro-stagger intro-delay-5">I design and build products that do good, from classrooms to complex enterprise workflows.</p>
            <p className="type-caption intro-stagger intro-delay-6">Designer who codes &nbsp;•&nbsp; 8+ years &nbsp;•&nbsp; Mission-driven</p>
            <div className="hero-clients intro-stagger intro-delay-7">
              <p className="type-statement">I've worked with</p>
              <div className="hero-clients__logos">
                <img className="hero-clients__logo" src="img/logos/microsoft.png" alt="Microsoft" />
                <img className="hero-clients__logo" src="img/logos/google.png" alt="Google" />
                <img className="hero-clients__logo" src="img/logos/accenture.png" alt="Accenture" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV — sits directly under the splash; the nav's CV link jumps here instantly. */}
      <section id="cv" className={`cv-section${cvEngaged ? ` cv-section--${cvActive}` : ''}`} aria-labelledby="cv-heading"
        onMouseLeave={() => { setCvEngaged(false); setCvActive(0); }}
        onBlur={(e) => {
          // Only reset when focus leaves the whole section, so tabbing between
          // rows doesn't flash back to black.
          if (!e.currentTarget.contains(e.relatedTarget)) { setCvEngaged(false); setCvActive(0); }
        }}
      >
        <h2 id="cv-heading" className="sr-only">Career timeline</h2>
        <div className="cv-layout">
          <ol className="cv-list">
            {cvRoles.map((r, i) => (
              <li
                key={r.company}
                className={`cv-item${cvActive === i ? ' cv-item--active' : ''}`}
                tabIndex={0}
                onMouseEnter={() => { setCvActive(i); setCvEngaged(true); }}
                onFocus={() => { setCvActive(i); setCvEngaged(true); }}
              >
                <span className="cv-date type-caption">{r.date}</span>
                <div className="cv-body">
                  <h3 className="cv-role">
                    <span className="type-caption type-caption--strong">{r.company}</span>
                    <span className="type-caption type-caption--role">{r.title}</span>
                  </h3>
                  <p className="type-caption cv-desc">{r.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Currently Working On — a Pine/Sage band that opens with the shared
          .wave-divider edge. */}
      <section className="now-section wave-divider">
        <SectionHeader title="Currently Working On" />
        <div className="now-grid">
          {/* Two destinations now — the write-up and the live prototype — so the
              card can't be one big anchor: an <a> inside an <a> is invalid and
              the parser would split the card in half. The title carries the link
              to the write-up instead, and the prototype gets its own button. */}
          <div className="now-card">
            {/* A screenshot of the game itself, shown whole rather than cropped
                to fill — hence the --screenshot variant, which contains the
                image and fills the letterbox with the game's own background. */}
            <figure className="now-card__media now-card__media--screenshot">
              <img
                src="img/now/study-hall-game.png"
                alt="A Study Hall scenario card: Day 1 at Tech Flow, where a hiring AI is flagging certain resumes, with five responses to choose from"
                loading="lazy"
              />
            </figure>
            <div className="now-card__body">
              <p className="type-caption type-caption--accent now-card__eyebrow">Educational Game Design</p>
              <h3 className="type-name now-card__title">
                <a className="now-card__title-link" href="rooted-futures.html">
                  Rooted Futures Lab Fellowship
                </a>
              </h3>
              <p className="type-statement type-statement--muted now-card__sub">
                Designing a web-based game that teaches young people to think
                critically about environmental justice and technology. The
                challenge: make complex systems-level thinking accessible and
                engaging through game design.
              </p>
              {/* Lives on rfl-studyhall.github.io, not in this repo, so it opens
                  in a new tab rather than navigating away from the portfolio. */}
              <a
                className="btn type-button now-card__cta"
                href="https://rfl-studyhall.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Game Prototype
              </a>
            </div>
          </div>
          <div className="now-card">
            {/* Two clients, one slot: the Wonderschool still fades in over the
                Praio video on a loop (see .now-card__media--duo). */}
            <figure className="now-card__media now-card__media--duo">
              <video
                src="img/now/praio.mp4"
                aria-label="Praio-branded mailer box folding from a flat dieline into a closed box"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <img
                className="now-card__duo-still"
                src="img/now/wonderschool.jpg"
                alt="Wonderschool on a laptop and two phones: the family homepage, the provider licensing sign-up, and the licensing progress dashboard"
                loading="lazy"
              />
            </figure>
            <div className="now-card__body">
              <p className="type-caption type-caption--accent now-card__eyebrow">Client Work</p>
              <h3 className="type-name now-card__title">EdTech and CleanTech</h3>
              <p className="type-statement type-statement--muted now-card__sub">
                Designed institutional workflows for education-focused
                platforms including Wonderschool's provider acquisition funnel.
                Identified user abandonment patterns and simplified complex
                multi-stakeholder experiences through progressive disclosure
                and mobile-first design. Additional clients: Praio and others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A run of work/quote pairs, one tinted band each. No section heading —
          the band titles carry it. Each card links to a case study through the
          password gate. */}
      <section id="strengths" className="strengths-section" aria-labelledby="work-heading">
        <h2 id="work-heading" className="sr-only">Selected work</h2>

        {strengths.map((s, i) => (
          <div className={`strength strength--${s.slug}`} key={s.slug}>
            <div className="strength__head">
              {s.eyebrow && <p className="type-caption type-caption--accent strength__eyebrow">{s.eyebrow}</p>}
              <h3 className="type-display-sm strength__title">{s.title}</h3>
            </div>
            {/* Grid, not flex: the default `stretch` is what keeps the media
                and the card exactly the same height. */}
            <div className="strength__row">
              <figure className={`strength__media${s.embed ? ' strength__media--embed' : ''}${s.fade ? ' strength__media--fade' : ''}`}>
                {s.backdrop && (
                  <img className="strength__backdrop" src={s.backdrop} alt="" aria-hidden="true" />
                )}
                {s.embed && (
                  <iframe src={s.embed} title={s.mediaAlt} loading="lazy" scrolling="no" />
                )}
                {s.video && (
                  <video src={s.video} aria-label={s.mediaAlt} autoPlay muted loop playsInline preload="metadata" />
                )}
                {s.media && <img src={s.media} alt={s.mediaAlt} loading="lazy" />}
                {s.fade && (
                  <>
                    <img className="strength__fade-a" src={s.fade[0]} alt={s.mediaAlt} loading="lazy" />
                    <img className="strength__fade-b" src={s.fade[1]} alt="" aria-hidden="true" loading="lazy" />
                  </>
                )}
              </figure>
              <div className="strength__aside">
                <p className="type-statement strength__summary">{s.summary}</p>
                {s.cta && (
                  <a className="btn type-button strength__cta" href={s.cta.href} aria-label={`${s.cta.label}: ${s.title}`}>
                    {isGated(s.cta.href) && (
                      <LockIcon />
                    )}
                    {s.cta.label}
                  </a>
                )}
                <WordCard quote={s.quote} variant="aside" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        
        <div className="page-content">
          <div className="projects-grid">

            {/* TEAMS — largest card (hidden). Its intro1.mp4 clip now plays in
                the "Designing 0 → 1 Products" band above. Dropping just the video
                isn't an option: .card-body is absolutely positioned over the
                media, so with no media the card is an 812px void and the title
                strip falls outside its own overflow:hidden box. */}
            <div
              className="project-card"
              style={{ gridColumn: '1 / 9', gridRow: '1 / 14', animationDelay: '0.1s', display: 'none' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.opacity = '0.9';
                setTimeout(() => navigate('/teams'), 150);
              }}
            >
              <video className="card-img-top" autoPlay muted loop playsInline src="img/msoft/intro1.mp4" />
              <div className="card-body">
                <h2 className="card-title">Microsoft Teams</h2>
                <p className="card-text">Shipped to millions · Ed-tech AI · K-12 globally</p>
              </div>
            </div>

            {/* RASA — small upper right (hidden) */}
            <div
              className="project-card"
              style={{ gridColumn: '9 / 13', gridRow: '1 / 8', animationDelay: '0.25s', display: 'none' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.opacity = '0.9';
                setTimeout(() => { window.location.href = 'rasa.html'; }, 150);
              }}
            >
              <img src="img/icons/projects/rasa.png" className="card-img-top" alt="rasa" />
              <div className="card-body">
                <h2 className="card-title">Rasa</h2>
                <p className="card-text">Designer + engineer · Conversational AI · ML dev ops</p>
              </div>
            </div>

            {/* GOOGLE — right top (hidden) */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '5 / 13', gridRow: '14 / 20', display: 'none' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.opacity = '0.8';
                setTimeout(() => navigate('/enterprise'), 150);
              }}
            >
              {/* Local copy — the Pinterest hotlink was still being fetched even
                  with the card hidden, since display:none doesn't stop image loads. */}
              <img src="img/enterprise/google-logo.gif" className="card-img-top" alt="google" />
              <div className="card-body">
                <h2 className="card-title">Google</h2>
                <p className="card-text">Solo end-to-end · Enterprise · 10+ workstreams across 4 timezones</p>
              </div>
            </div>

            {/* COPILOT — right middle (hidden; windows.html itself stays) */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '5 / 13', gridRow: '20 / 26', display: 'none' }}
              {...cardHover}
            >
              <img src="img/icons/projects/copilot.png?v=2" className="card-img-top" alt="copilot" />
              <div className="card-body">
                <h2 className="card-title">Windows Copilot</h2>
                <p className="card-text">AI at Windows scale · Student & educator experiences</p>
                <a href="windows.html" className="stretched-link"></a>
              </div>
            </div>

            {/* ACCENTURE — left, below Paul Ray, same width (hidden) */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '1 / 5', gridRow: '24 / 32', display: 'none' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.opacity = '0.9';
                setTimeout(() => { window.location.href = 'healthcare.html'; }, 150);
              }}
            >
              <img src="img/icons/projects/haley.png?v=2" className="card-img-top" alt="accenture" />
              <div className="card-body">
                <h2 className="card-title">Accenture</h2>
                <p className="card-text">0→1 mobile health · Patient-centered · Research to delivery</p>
              </div>
            </div>

            {/* HORIZONTAL DESIGN — Speaker Progress + EDU Insights (hidden) */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '1 / 13', gridRow: '37 / 44', display: 'none' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.opacity = '0.9';
                setTimeout(() => { window.location.href = 'horizontal-design.html'; }, 150);
              }}
            >
              <img src="img/msoft/insights_final_framework.jpg" className="card-img-top" alt="horizontal design" />
              <div className="card-body">
                <h2 className="card-title">Horizontal Design</h2>
                <p className="card-text">Speaker Progress · EDU Insights framework · Scaled across every Learning Accelerator</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Words From Others — testimonial cards, same header treatment as
          "I've Worked With" above. */}
      <section id="words" className="words-section wave-divider">
        <SectionHeader title="Words From Others" />

        <div className="words-grid">
          {gridQuotes.map((q, i) => <WordCard key={i} quote={q} variant="grid" />)}
        </div>
      </section>
      </main>
    </div>
  );
}


// Teams Page Component
function TeamsPage() {
  React.useEffect(() => {
    // Redirect to teams.html in the public directory
    window.location.href = './teams.html';
  }, []);

  return null;
}

// Enterprise Page Component
function EnterprisePage() {
  React.useEffect(() => {
    // Redirect to enterprise.html in the public directory
    window.location.href = './enterprise.html';
  }, []);
  
  return null;
}

// Navigation Component
function Navigation() {
  const handleWorkClick = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="top-nav desktop-nav">
      <div className="nav-links">
        <span className="link work-link">
          <img
            alt="work"
            src="img/work.jpg"
            width="140px"
            onClick={handleWorkClick}
            style={{ cursor: 'pointer' }}
          />
        </span>
        <span className="link murals-link">
          <a href="murals.html" className="nav-label">Murals</a>
        </span>
        <span className="link email-link">
          <a href="mailto:p.sharma9793@gmail.com?Subject=Let's work together" target="_top" className="nav-label">Email</a>
        </span>
        <span className="link resume">
          <a href="parul_resume.pdf" target="_blank" className="nav-label">Resume</a>
        </span>
      </div>
    </nav>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
      </Routes>
      <MobileFooter />
    </Router>
  );
}

export default App;