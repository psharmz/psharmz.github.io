import React from 'react';

function MobileFooter() {
  return (
    <nav className="top-nav mobile-nav">
      <div className="nav-links">
        <span className="link work-link">
          <a href="/">
            <img alt="work" src="img/work.jpg" width="140px" />
          </a>
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

export default MobileFooter;