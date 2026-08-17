import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MobileFooter from './components/MobileFooter';

function MainPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Handle hash navigation on component mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#work') {
      setTimeout(() => {
        const element = document.getElementById('work');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // Testimonial cards. `company` picks the grey eyebrow logo; `avatar` is a
  // shared placeholder for now, swap per person as portraits come in.
  const quotes = [
    {
      text: "I'm happy to recommend Parul for any product design role! She brings a rare combination of courage, creativity, and user-centered thinking to every project she touches.",
      highlights: ["rare combination", "courage", "creativity", "user-centered thinking"],
      name: "Paul Ray",
      role: "Director of Product Design, Education at Microsoft",
      company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
      avatar: "img/avatars/paul-ray.jpg"
    },
    {
      text: "I worked with Parul at Microsoft in Education product design. These include working in a space to define AI and Copilot scenarios and use for educational purpose inside the classroom. She has great capabilities to look across horizontal spaces and make logical connections that reduce and simplify the user experience.",
      highlights: ["define AI and Copilot scenarios", "look across horizontal spaces", "reduce and simplify the user experience"],
      name: "Jon Esterly",
      role: "Principal Product Designer, Education at Microsoft",
      company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
      avatar: "img/avatars/jon-esterly.jpg"
    },
    {
      text: "I worked with Parul during her project in Google NetOps. Parul has a passion for UI development in application design, and has proposed creative solutions to improve the user interface to support complex processes. We worked together across multiple workstreams (10+) for various circuit deliveries and field operations. She has received strong feedback from my partner teams during her time on the project.",
      highlights: ["UI development", "creative solutions", "complex processes", "multiple workstreams (10+)"],
      name: "Eddie Dinh",
      role: "Google Cloud",
      company: { name: "Google", logo: "img/logos/google.png" },
      avatar: "img/avatars/eddie-dinh.jpg",
      cta: { label: "View Case Study", href: "portfolio.html?next=enterprise.html" },
      featured: true
    },
    {
      text: "Her concern for the customer and overall experience was truly evident in every design decision. Parul was also a driving force in fostering team culture by creating spaces for collaboration. She started a Teams channel for our team that encouraged quick, constructive design feedback. She also organized a coworking opportunity that she hosted each week offering a flexible, low-pressure way for teammates to connect while working. Her efforts to build engagement and community made a real difference in strengthening the team as a whole.",
      highlights: ["concern for the customer", "driving force", "team culture", "constructive design feedback", "engagement", "community"],
      name: "Joshua McGlinn",
      role: "Principal Design Lead at Microsoft",
      company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
      avatar: "img/avatars/joshua-mcglinn.jpg"
    },
    {
      // Blank line splits the quote into paragraphs — see renderWordCard.
      text: "I've worked with Parul on several machine learning projects, including a longer term one at Rasa. Parul is a joy to work with in terms of energy and mentality, she is interested and able to communicate effectively with participants from customers through management to engineers. Parul has a great understanding not only of UX principles for users, but of how working with ML/AI systems complicates user interactions and what opportunities it gives to improve them.\n\nI would recommend working with Parul to anyone who has the opportunity!",
      highlights: ["several machine learning projects", "communicate effectively", "UX principles", "ML/AI systems"],
      name: "Joey Faulkner",
      role: "Machine Learning Engineer, Rasa",
      company: { name: "Rasa", logo: "img/logos/rasa.png" },
      avatar: "img/avatars/joey-faulkner.jpg",
      cta: { label: "View Case Study", href: "portfolio.html?next=rasa.html" },
      featured: true
    },
    {
      text: "Her instinct for inclusive design, proactive collaboration, and thoughtful questioning consistently elevates team outcomes, as seen in her impactful work on Career Coach, Speaker Progress, and Learning Accelerators. She demonstrates maturity and conviction, while her positive, curious attitude fosters a supportive and innovative team environment. Parul is exactly the kind of designer who not only delivers strong solutions but also helps shape a stronger design culture.",
      highlights: ["inclusive design", "proactive collaboration", "elevates team outcomes", "Career Coach", "design culture"],
      name: "Paul Ray",
      role: "Director of Product Design, Education at Microsoft",
      company: { name: "Microsoft", logo: "img/logos/microsoft.png" },
      avatar: "img/avatars/paul-ray.jpg",
      // Routes through the password gate, which forwards to Career Coach on
      // success (see `next` handling in public/portfolio.html).
      cta: { label: "View Case Study", href: "portfolio.html?next=teams.html" },
      featured: true
    }
  ];

  // "Experiences and Strengths": each row pairs a piece of work with the quote
  // that speaks to it. `featured` marks the quotes claimed here, so they don't
  // also appear in the "Words From Others" grid.
  const byName = (name) => quotes.find((q) => q.name === name && q.featured);

  const strengths = [
    {
      slug: 'zero-to-one',
      title: 'Designing 0 \u2192 1 Products',
      eyebrow: 'LinkedIn Economic Graph API \u00b7 +32% traffic',
      video: 'img/msoft/intro1.mp4',
      mediaAlt: 'Microsoft Teams education product walkthrough',
      quote: byName('Paul Ray')
    },
    {
      slug: 'developers',
      title: 'Designing for Developers',
      media: 'img/msoft/dev-home-machine-config.png',
      mediaAlt: 'Dev Home machine configuration — developer environment setup',
      eyebrow: 'Designer + engineer \u00b7 Conversational AI \u00b7 ML dev ops',
      quote: byName('Joey Faulkner')
    },
    {
      slug: 'enterprise',
      title: 'Complex Technical Spaces in Enterprise',
      // The live CSS phone with the counting timer, shared with the Google
      // case study rather than duplicated.
      embed: 'embeds/field_worker_mobile_stripped.html',
      // Animates behind the phone. White was flattened to a transparent index so
      // it reads on the dark band instead of sitting in a white box.
      backdrop: 'img/enterprise/google-logo.gif',
      mediaAlt: 'Field dispatch mobile app with a running travel timer',
      quote: byName('Eddie Dinh')
    }
  ];

  const gridQuotes = quotes.filter((q) => !q.featured);


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

  const renderHighlightedText = (text, highlights = []) => {
    if (!highlights || highlights.length === 0) {
      return text;
    }

    let result = text;
    highlights.forEach((highlight) => {
      const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(
        new RegExp(escapedHighlight, 'g'),
        `<strong style="font-weight: 700; color: var(--color-text-teal);">${highlight}</strong>`
      );
    });

    return result;
  };

  // Anything routed through portfolio.html hits the password gate first, so the
  // button wears a lock — same treatment as "View Portfolio" in the hero.
  const isGated = (href) => /^portfolio\.html(\?|$)/.test(href);

  // One card shape, used both for the featured quote below "I've Worked With"
  // and for every card in the "Words From Others" grid.
  const renderWordCard = (q, key) => (
    <figure className="word-card scroll-reveal" key={key}>
      {/* Company mark, greyed to match the client logos — not a link. The
          per-brand class is there so a mark whose glyphs don't fill its canvas
          can be optically sized to match the wordmarks. */}
      <img
        className={`word-card__logo word-card__logo--${q.company.name.toLowerCase()}`}
        src={q.company.logo}
        alt={q.company.name}
        aria-hidden="true"
      />
      {/* A blank line in `text` starts a new paragraph. The curly quotes wrap
          the whole quotation, so they open on the first and close on the last. */}
      <blockquote
        className="word-card__quote"
        dangerouslySetInnerHTML={{
          __html: q.text
            .split(/\n\s*\n/)
            .map((para, n, all) =>
              `<p>${n === 0 ? '“' : ''}${renderHighlightedText(para, q.highlights)}${n === all.length - 1 ? '”' : ''}</p>`
            )
            .join('')
        }}
      />
      {q.cta && (
        <a
          className={`word-card__cta${isGated(q.cta.href) ? ' nav-label--lock' : ''}`}
          href={q.cta.href}
        >
          {isGated(q.cta.href) && (
            <span className="lock-icon" role="img" aria-label="Password protected">
              🔒
            </span>
          )}
          {q.cta.label}
        </a>
      )}
      <figcaption className="word-card__person">
        <img className="word-card__avatar" src={q.avatar} alt="" aria-hidden="true" />
        <span className="word-card__meta">
          <span className="word-card__name">{q.name}</span>
          <span className="word-card__role">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );





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
    <div className="App">

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="parallax-bg" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="container">
            <div className="row blurb">
              <div className="col-sm-4">
                <div className="profile-image" style={{
                  transform: `translateY(${scrollY * 0.3}px) scale(${1 - scrollY * 0.0005})`,
                  opacity: Math.max(0.3, 1 - scrollY * 0.001)
                }}>
                  <img alt="Parul Sharma" src="img/parul-avatar.jpg" width="100%" />
                </div>
              </div>
              <div className="col-sm-8 about">
                <div className="about-content" style={{
                  transform: `translateY(${scrollY * 0.2}px)`,
                  opacity: Math.max(0.2, 1 - scrollY * 0.0015)
                }}>
                  <div className="text-content">
                    <h2 className="hero-greeting">hi, i'm parul</h2>
                    <p className="hero-blurb"><strong className="accent">Mission-driven designer and builder for problems I care about.</strong> Shipped for <strong className="accent">300M+ at Microsoft and Accenture</strong>. Former React developer who speaks engineer fluently and understands technical constraints. <strong className="accent">Looking for full-time or freelance work where design moves the needle.</strong></p>
                    <div className="hero-actions">
                      <span className="link murals-link">
                        <a href="murals.html" className="nav-label">Murals</a>
                      </span>
                      <span className="link portfolio-link">
                        <a href="portfolio.html" className="nav-label nav-label--lock">
                          <span className="lock-icon" role="img" aria-label="Password protected">🔒</span>
                          View Portfolio
                        </a>
                      </span>
                      <span className="link linkedin-link">
                        <a
                          href="https://www.linkedin.com/in/psharmz/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-label"
                        >
                          LinkedIn
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="clients-header">
          <span className="clients-dash" />
          <h3 className="clients-heading">I've Worked With</h3>
        </div>
        <div className="clients-logos">
          <img src="img/logos/microsoft.png" alt="Microsoft" className="client-logo" />
          <img src="img/logos/google.png" alt="Google" className="client-logo" />
          <img src="img/logos/accenture.png" alt="Accenture" className="client-logo" />
        </div>
      </section>

      {/* Currently Working On — shares .clients-header / .clients-dash /
          .clients-heading with the band above so the two read as a pair. */}
      <section className="now-section">
        <div className="clients-header">
          <span className="clients-dash" />
          <h3 className="clients-heading">Currently Working On</h3>
        </div>
        <div className="now-grid">
          <a className="now-card now-card--link" href="rooted-futures.html">
            <figure className="now-card__media">
              <img
                src="img/now/rooted-futures.jpg"
                alt="Hands of many skin tones reaching toward a laptop set in a green hillside"
                loading="lazy"
              />
            </figure>
            <div className="now-card__body">
              <p className="now-card__eyebrow">Game Design</p>
              <h4 className="now-card__title">Rooted Futures Lab Fellowship</h4>
              <p className="now-card__sub">
                Designing and developing a web-based game for college students
                to learn about Environmental Justice in Tech (EJIT) principles
              </p>
            </div>
          </a>
          {/* The only card with somewhere to go, so it's the only one that's a
              link. The static page lives in public/, same as the case studies. */}
          <a className="now-card now-card--link" href="regenintel.html">
            {/* A wordmark, not a photo — contained on the card surface rather
                than cropped to fill like the other two. */}
            <figure className="now-card__media now-card__media--mark">
              <img src="img/now/regenintel.png" alt="The Regenerative Fellowship" loading="lazy" />
            </figure>
            <div className="now-card__body">
              <p className="now-card__eyebrow">Research</p>
              <h4 className="now-card__title">RegenIntel Fellowship</h4>
              <p className="now-card__sub">
                Research projects on Himalayan Bioregion and Plastics in Our Food
              </p>
            </div>
          </a>
          <div className="now-card">
            <figure className="now-card__media">
              <video
                src="img/now/praio.mp4"
                aria-label="Praio-branded mailer box folding from a flat dieline into a closed box"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </figure>
            <div className="now-card__body">
              <p className="now-card__eyebrow">Client Work</p>
              <h4 className="now-card__title">Freelance</h4>
              <p className="now-card__sub">
                Clients include Praio, Wonderschool, and others. UI/UX, logo
                design, branding, etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A run of work/quote pairs, one tinted band each. No section heading —
          the band titles carry it. Each card links to a case study through the
          password gate. */}
      <section id="strengths" className="strengths-section">

        {strengths.map((s, i) => (
          <div className={`strength strength--${s.slug}`} key={s.slug}>
            <div className="strength__head">
              {s.eyebrow && <p className="strength__eyebrow">{s.eyebrow}</p>}
              <h4 className="strength__title">{s.title}</h4>
            </div>
            {/* Grid, not flex: the default `stretch` is what keeps the media
                and the card exactly the same height. */}
            <div className="strength__row">
              <figure className={`strength__media${s.embed ? ' strength__media--embed' : ''}`}>
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
              </figure>
              {renderWordCard(s.quote, `strength-${i}`)}
            </div>
          </div>
        ))}
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        <div className="work-header">
          {scrollY > 300 && (
            <button onClick={() => navigate('/#work')} className="back-to-top">
              <img
                alt="profile"
                src="img/p.png"
                width="60px"
                className="profile-logo"
              />
            </button>
          )}
        </div>
        
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
      <section id="words" className="words-section">
        <div className="clients-header">
          <span className="clients-dash" />
          <h3 className="clients-heading">Words From Others</h3>
        </div>

        <div className="words-grid">
          {gridQuotes.map((q, i) => renderWordCard(q, i))}
        </div>
      </section>
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