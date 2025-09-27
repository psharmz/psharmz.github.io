import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import MobileFooter from './components/MobileFooter';

function MainPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const quotes = [
    {
      text: "I'm happy to recommend Parul for any product design role! She brings a rare combination of courage, creativity, and user-centered thinking to every project she touches. Her instinct for inclusive design, proactive collaboration, and thoughtful questioning consistently elevates team outcomes, as seen in her impactful work on Career Coach, Speaker Progress, and Learning Accelerators. She demonstrates maturity and conviction, while her positive, curious attitude fosters a supportive and innovative team environment. Parul is exactly the kind of designer who not only delivers strong solutions but also helps shape a stronger design culture.",
      author: "Paul Ray, Director of Product Design - Education, Microsoft"
    },
    {
      text: "I worked with Parul at Microsoft in Education product design. Parul has been a great teammate and contributed to a variety new feature and product areas. These include working in a space to define Ai and Copilot scenarios and use for educational purpose inside the classroom. She has great capabilities to look across horizontal spaces and make logical connections that reduce and simplify the user experience. She is highly flexible and willing to pick up small things and help make the team be better.",
      author: "Jon Esterly, Principal Product Designer for Education at Microsoft"
    },
    {
      text: "I worked with Parul during her project in Google NetOps. Parul has a passion for UI development in application design, and has proposed creative solutions to improve the user interface to support complex processes. We worked together across multiple workstreams (10+) for various circuit deliveries and field operations. She has received strong feedback from my partner teams during her time on the project.",
      author: "Eddie Dinh, Google Cloud"
    },
    {
      text: "Her concern for the customer and overall experience was truly evident in every design decision. Parul was also a driving force in fostering team culture by creating spaces for collaboration. She started a Teams channel for our team that encouraged quick, constructive design feedback. She also organized a coworking opportunity that she hosted each week offering a flexible, low-pressure way for teammates to connect while working. Her efforts to build engagement and community made a real difference in strengthening the team as a whole.",
      author: "Joshua McGlinn, Principal Design Lead at Microsoft"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




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
                    <Typewriter
                      options={{
                        strings: quotes.map(quote => `"${quote.text}"<br><br>-${quote.author}`),
                        autoStart: true,
                        loop: true,
                        delay: 15,
                        deleteSpeed: 10,
                        pauseFor: 3000
                      }}
                    />
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
            <button onClick={() => navigate('/')} className="back-to-top">
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
          <div className="section container-fluid projects">
            <div className="projects-grid">
              <div className="card project-card" style={{ animationDelay: '0.1s' }} onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.opacity = '0.8';
                setTimeout(() => navigate('/teams'), 150);
              }}>
                <img src="img/icons/projects/teams.png" className="card-img-top" alt="teams" />
                <div className="card-body">
                  <h2 className="card-title"> Microsoft Teams </h2>
                  <p className="card-text"> Designed for Teams, specifically a suite of globally shipped Learning Accelerators which included products like Career Coach and Speaker Progress for millions of teachers and students. </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted"> Product Designer </small>
                </div>
              </div>

              <div className="card project-card" style={{ animationDelay: '0.2s' }} onClick={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.opacity = '0.8';
                setTimeout(() => navigate('/enterprise'), 150);
              }}>
                <img src="img/icons/projects/g.jpg" className="card-img-top" alt="enterprise" />
                <div className="card-body">
                  <h2 className="card-title"> Google </h2>
                  <p className="card-text"> Designed an enterprise web application used across 4 timezones and 10+ workstreams. As a solo designer I covered research, visual design, interaction design, strategy, and design QA </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted"> Lead Product Designer </small>
                </div>
              </div>

              <div className="card project-card" style={{ animationDelay: '0.3s' }}>
                <img src="img/icons/projects/copilot.png" className="card-img-top" alt="enterprise" />
                <div className="card-body">
                  <h2 className="card-title"> Windows Copilot </h2>
                  <p className="card-text"> AI features in Windows and tailored experiences for student and teachers in Copilot. </p>
                  <a href="password_protected_page.html" className="stretched-link"></a>
                </div>
                <div className="card-footer">
                  <small className="text-muted"> Designer </small>
                </div>
              </div>

              <div className="card project-card" style={{ animationDelay: '0.4s' }}>
                <img src="img/icons/projects/haley.png" className="card-img-top" alt="enterprise" />
                <div className="card-body">
                  <h2 className="card-title"> Accenture </h2>
                  <p className="card-text"> Mobile healthcare application to track patients' symptoms and recovery </p>
                  <a href="healthcare.html" className="stretched-link"></a>
                </div>
                <div className="card-footer">
                  <small className="text-muted"> Product Designer </small>
                </div>
              </div>

              <div className="card project-card" style={{ animationDelay: '0.5s' }}>
                <img src="img/icons/projects/rasa.png" className="card-img-top" alt="enterprise" />
                <div className="card-body">
                  <h2 className="card-title"> Rasa </h2>
                  <p className="card-text"> Led design and development of a chatbot creation tool. Developed using ReactJS and Redux </p>
                  <a href="rasa.html" className="stretched-link"></a>
                </div>
                <div className="card-footer">
                  <small className="text-muted"> UI Developer </small>
                </div>
              </div>
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
  return (
    <nav className="top-nav">
      <div className="nav-links">
        <span className="link work-link">
          <a href="#work">
            <img alt="work" src="img/work.jpg" width="140px" />
          </a>
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
    <Router>
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