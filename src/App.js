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

  const quotes = [
    {
      text: "I'm happy to recommend Parul for any product design role! She brings a rare combination of courage, creativity, and user-centered thinking to every project she touches.",
      highlights: ["rare combination", "courage", "creativity", "user-centered thinking"],
      author: "Paul Ray, Director of Product Design - Education, Microsoft"
    },
    {
      text: "I worked with Parul at Microsoft in Education product design. Parul has been a great teammate and contributed to a variety new feature and product areas. These include working in a space to define AI and Copilot scenarios and use for educational purpose inside the classroom. She has great capabilities to look across horizontal spaces and make logical connections that reduce and simplify the user experience. She is highly flexible and willing to pick up small things and help make the team be better.",
      highlights: [],
      author: "Jon Esterly, Principal Product Designer for Education at Microsoft"
    },
    {
      text: "I worked with Parul during her project in Google NetOps. Parul has a passion for UI development in application design, and has proposed creative solutions to improve the user interface to support complex processes. We worked together across multiple workstreams (10+) for various circuit deliveries and field operations. She has received strong feedback from my partner teams during her time on the project.",
      highlights: ["UI development", "creative solutions", "complex processes", "multiple workstreams (10+)"],
      author: "Eddie Dinh, Google Cloud"
    },
    {
      text: "Her concern for the customer and overall experience was truly evident in every design decision. Parul was also a driving force in fostering team culture by creating spaces for collaboration. She started a Teams channel for our team that encouraged quick, constructive design feedback. She also organized a coworking opportunity that she hosted each week offering a flexible, low-pressure way for teammates to connect while working. Her efforts to build engagement and community made a real difference in strengthening the team as a whole.",
      highlights: ["concern for the customer", "driving force", "team culture", "constructive design feedback", "engagement", "community"],
      author: "Joshua McGlinn, Principal Design Lead at Microsoft"
    },
    {
      text: "Her instinct for inclusive design, proactive collaboration, and thoughtful questioning consistently elevates team outcomes, as seen in her impactful work on Career Coach, Speaker Progress, and Learning Accelerators. She demonstrates maturity and conviction, while her positive, curious attitude fosters a supportive and innovative team environment. Parul is exactly the kind of designer who not only delivers strong solutions but also helps shape a stronger design culture.",
      highlights: ["inclusive design", "proactive collaboration", "elevates team outcomes"],
      author: "Paul Ray, Director of Product Design - Education, Microsoft"
    }
  ];


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
        `<strong style="font-weight: 700; color: var(--color-accent);">${highlight}</strong>`
      );
    });

    return result;
  };





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
                  <img alt="icon" src="img/p.svg" width="100%" />
                </div>
              </div>
              <div className="col-sm-8 about">
                <div className="about-content" style={{
                  transform: `translateY(${scrollY * 0.2}px)`,
                  opacity: Math.max(0.2, 1 - scrollY * 0.0015)
                }}>
                  <div className="text-content">
                    <p className="hero-blurb"><strong className="accent">I design AI-native products and build them.</strong> Staff-level designer with 5 years at Microsoft shipping to <strong className="accent">300M+ users</strong> across AI, EdTech, and Windows — and <strong className="accent">I write the code too.</strong> Currently a Fellow at Rooted Futures Lab and Regenerative Intelligence, two highly selective programs at the intersection of technology and regenerative systems. Open to the right full-time role and freelance projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="work-section">
        <div className="work-header">
          {scrollY > 300 && (
            <button onClick={() => navigate('/#work')} className="back-to-top">
              <img
                alt="profile"
                src="img/p.svg"
                width="60px"
                className="profile-logo"
              />
            </button>
          )}
        </div>
        
        <div className="page-content">
          <div className="projects-grid">

            {/* TEAMS — largest card */}
            <div
              className="project-card"
              style={{ gridColumn: '1 / 9', gridRow: '1 / 14', animationDelay: '0.1s' }}
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

            {/* RASA — small upper right */}
            <div
              className="project-card"
              style={{ gridColumn: '9 / 13', gridRow: '1 / 8', animationDelay: '0.25s' }}
              {...cardHover}
            >
              <img src="img/icons/projects/rasa.png" className="card-img-top" alt="rasa" />
              <div className="card-body">
                <h2 className="card-title">Rasa</h2>
                <p className="card-text">Designer + engineer · Conversational AI · ML dev ops</p>
                <a href="rasa.html" className="stretched-link"></a>
              </div>
            </div>

            {/* TESTIMONIAL — Paul Ray #1, lower right of Teams */}
            <div
              className="mosaic-testimonial scroll-reveal"
              style={{ gridColumn: '9 / 13', gridRow: '8 / 14' }}
            >
              <div className="quote-text-wrapper">
                <p className="quote-text" dangerouslySetInnerHTML={{ __html: `"${renderHighlightedText(quotes[0].text, quotes[0].highlights)}"` }} />
              </div>
              <p className="quote-author">— {quotes[0].author}</p>
            </div>

            {/* TESTIMONIAL — Paul Ray #2, narrow + tall */}
            <div
              className="mosaic-testimonial scroll-reveal"
              style={{ gridColumn: '1 / 5', gridRow: '14 / 24' }}
            >
              <div className="quote-text-wrapper">
                <p className="quote-text" dangerouslySetInnerHTML={{ __html: `"${renderHighlightedText(quotes[4].text, quotes[4].highlights)}"` }} />
              </div>
              <p className="quote-author">— {quotes[4].author}</p>
            </div>

            {/* GOOGLE — right top */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '5 / 13', gridRow: '14 / 20' }}
              {...cardHover}
              onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.opacity = '0.8';
                setTimeout(() => navigate('/enterprise'), 150);
              }}
            >
              <img src="https://i.pinimg.com/originals/b7/41/21/b741215d216b11b8ff17f27f4bff2a9d.gif" className="card-img-top" alt="google" />
              <div className="card-body">
                <h2 className="card-title">Google</h2>
                <p className="card-text">Solo end-to-end · Enterprise · 10+ workstreams across 4 timezones</p>
              </div>
            </div>

            {/* COPILOT — right middle */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '5 / 13', gridRow: '20 / 26' }}
              {...cardHover}
            >
              <img src="img/icons/projects/copilot.png?v=2" className="card-img-top" alt="copilot" />
              <div className="card-body">
                <h2 className="card-title">Windows Copilot</h2>
                <p className="card-text">AI at Windows scale · Student & educator experiences</p>
                <a href="password_protected_page.html" className="stretched-link"></a>
              </div>
            </div>

            {/* ACCENTURE — left, below Paul Ray, same width */}
            <div
              className="project-card scroll-reveal"
              style={{ gridColumn: '1 / 5', gridRow: '24 / 32' }}
              {...cardHover}
            >
              <img src="img/icons/projects/haley.png?v=2" className="card-img-top" alt="accenture" />
              <div className="card-body">
                <h2 className="card-title">Accenture</h2>
                <p className="card-text">0→1 mobile health · Patient-centered · Research to delivery</p>
                <a href="healthcare.html" className="stretched-link"></a>
              </div>
            </div>

            {/* TESTIMONIAL — Eddie Dinh */}
            <div
              className="mosaic-testimonial scroll-reveal"
              style={{ gridColumn: '5 / 13', gridRow: '26 / 32' }}
            >
              <div className="quote-text-wrapper">
                <p className="quote-text" dangerouslySetInnerHTML={{ __html: `"${renderHighlightedText(quotes[2].text, quotes[2].highlights)}"` }} />
              </div>
              <p className="quote-author">— {quotes[2].author}</p>
            </div>

            {/* TESTIMONIAL — Joshua McGlinn */}
            <div
              className="mosaic-testimonial scroll-reveal"
              style={{ gridColumn: '1 / 13', gridRow: '32 / 37' }}
            >
              <div className="quote-text-wrapper">
                <p className="quote-text" dangerouslySetInnerHTML={{ __html: `"${renderHighlightedText(quotes[3].text, quotes[3].highlights)}"` }} />
              </div>
              <p className="quote-author">— {quotes[3].author}</p>
            </div>

            {/* TESTIMONIAL — Jon Esterly (hidden) */}
            <div
              className="mosaic-testimonial scroll-reveal"
              style={{ gridColumn: '9 / 13', gridRow: '37 / 45', display: 'none' }}
            >
              <div className="quote-text-wrapper">
                <p className="quote-text" dangerouslySetInnerHTML={{ __html: `"${renderHighlightedText(quotes[1].text, quotes[1].highlights)}"` }} />
              </div>
              <p className="quote-author">— {quotes[1].author}</p>
            </div>

          </div>
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
        <span className="link email-link">
          <a href="mailto:p.sharma9793@gmail.com?Subject=Let's work together" target="_top">
            <img alt="email" src="img/email.jpg" width="105px" />
          </a>
        </span>
        <span className="link resume">
          <a href="parul_resume.pdf" target="_blank">
            <img alt="resume" src="img/resume.jpg" width="150px" />
          </a>
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