import React from 'react';

function MobileFooter() {
  return (
    <nav className="top-nav">
      <div className="nav-links">
        <span className="link work-link">
          <a href="/">
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

export default MobileFooter;