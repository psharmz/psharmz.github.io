import React from 'react';
import { Link } from 'react-router-dom';

function WorkPage() {
  return (
    <body style={{backgroundColor: '#ececec'}}>
      <div className="fixed-header">
        <ul className="col-xs-6">
          <li>
            <a href="/"> 
              <img alt="icon" src="img/ps.svg" width="50px" /> 
            </a>
          </li>
        </ul>
      </div>

      <div className="page-content">
        <div id="work-section" className="section container-fluid projects">
          <div className="card-deck">

            <div className="card">
              <img src="img/icons/projects/teams.png" className="card-img-top" alt="teams" />
              <div className="card-body">
                <h2 className="card-title"> Microsoft Teams </h2>
                <p className="card-text"> Designed for Teams, specifically a suite of globally shipped Learning Accelerators which included products like Career Coach and Speaker Progress for millions of teachers and students. </p>
                <a href="teams.html" className="stretched-link"></a>
              </div>
              <div className="card-footer">
                <small className="text-muted"> Product Designer </small>
              </div>
            </div>

            <div className="card">
              <img src="img/icons/projects/g.jpg" className="card-img-top" alt="enterprise" />
              <div className="card-body">
                <h2 className="card-title"> Google </h2>
                <p className="card-text"> Designed an enterprise web application used across 4 timezones and 10+ workstreams. As a solo designer I covered research, visual design, interaction design, strategy, and design QA </p>
                <a href="enterprise.html" className="stretched-link"></a>
              </div>
              <div className="card-footer">
                <small className="text-muted"> Lead Product Designer </small>
              </div>
            </div>

            <div className="card">
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

            <div className="card">
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

            <div className="card">
              <img src="img/icons/projects/rasa.png" className="card-img-top" alt="enterprise" />
              <div className="card-body">
                <h2 className="card-title"> Rasa </h2>
                <p className="card-text"> Led design and development of a chatbot creation tool. Developed using ReactJS and Redux </p>
                <a href="teams.html" className="stretched-link"></a>
              </div>
              <div className="card-footer">
                <small className="text-muted"> UI Developer </small>
              </div>
            </div>

          </div>

          <div className="space"></div>

        </div>
      </div>
    </body>
  );
}

export default WorkPage;