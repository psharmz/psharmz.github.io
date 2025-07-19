import React from 'react';

function HomePage() {
  return (
    <body className="one-pager">
      <div className="container">
        <div className="row blurb">
          <div className="col-sm-4">
            <img alt="icon" src="img/p.svg" width="100%" />
          </div>
          <div className="col-sm-8 about">
            <div className="about"> 
              Hiya, I'm Parul Sharma and I believe empathy can solve as many problems as engineering can. I am currently designing AI and education experiences at Microsoft. In a previous life I was a consultant working with Fortune 500 clients at Accenture and a front-end engineer for an AI startup in Berlin. I like to stay curious and always keep learning. Ask me about my time in Scotland or how sailing lessons are going.
              <div className="links">
                <span className="link linkedin">
                  <a href="work.html" target="_blank" rel="noopener noreferrer">
                    <img alt="work" src="img/work.jpg" width="200px" />
                  </a>
                </span>
                <span className="link email">
                  <a href="mailto:p.sharma9793@gmail.com?Subject=Let's work together" target="_top">  
                    <img alt="email" src="img/email.jpg" width="150px" /> 
                  </a>     
                </span>
                <span className="link resume">
                  <a href="parul_resume.pdf" target="_blank" rel="noopener noreferrer">
                    <img alt="resume" src="img/resume.jpg" width="150px" />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default HomePage;