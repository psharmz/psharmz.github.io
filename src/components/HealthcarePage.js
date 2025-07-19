import React from 'react';
import { Link } from 'react-router-dom';

function HealthcarePage() {
  return (
    <body>
      <div className="fixed-header">
        <ul className="col-xs-12 col-md-6">
          <li> 
            <Link to="/"> 
              <img alt="icon" src="img/ps.svg" width="50px" /> 
            </Link>
          </li>
        </ul>

        <ul className="col-xs-12 col-md-6 nav-content">
          <li> 
            <Link to="/rasa"> 
              <img alt="prev" src="img/next.jpg" width="150px" /> 
            </Link>
          </li>
          <li> 
            <Link to="/password-protected"> 
              <img alt="prev" src="img/prev.jpg" width="150px" /> 
            </Link>
          </li>
        </ul>
      </div>

      <div className="page-content">
        <div className="prj-header">
          <img src="img/headers/haley_logo.png" width="15%" height="15%" alt="haley Header Image"/>
          <br></br>
          <h2 className="override"> Lead Designer @ Accenture </h2>
          <p> Haley is a mobile application that aims to bring continuous care to patients who have been discharged from the hospital. Patients enter their symptoms and moods on a regular basis on the app, and Haley in return provides suggestions and advice to the patients. The data collected from monitoring symptoms and moods is also relayed back to the patient's doctor. </p> 
        </div>

        <div className="container-fluid project-info">
          <div className="row">
            <div className="proj-section-left col-xs-12 col-md-6">
              <h2> Background </h2>
              <p> Haley was built as a demo app for Pega World. The overall purpose was to showcase Pega CRM capabilities within the healthcare industry to potential customers at their largest conference of the year in Las Vegas. I led the design phase and led daily standups with our engineering team to ensure the demo app was built on time for the conference. </p>
            </div>
            <img src="img/healthcare/image.png" alt="healthcare" />
          </div>

          <div className="row">
            <div className="proj-section-right col-xs-12 col-md-6">
              <h2> Dot Voting </h2>
              <p> For the ideation phase, I created different visual styles of the app. After pushing pixels, a held a drop-in style design crit at the Accenture office. A sticker dot voting system was used for individuals to vote on their favorite features. </p>
            </div>
            <img src="img/healthcare/dots.png" className="img-responsive col-xs-12 col-md-6" alt="dots" />
          </div>

          <div className="row">
            <img alt="" className="img-responsive col-xs-12 col-md-12" src="img/healthcare/whiteboard1.png" />
            
            <img alt="" className="img-responsive col-xs-12 col-md-6" src="img/healthcare/whiteboard10.png" />
            <img alt="" className="img-responsive col-xs-12 col-md-6" src="img/healthcare/whiteboard11.png" />
          </div>

          <div className="row">
            <h2 className="col-xs-12"> Key Insights </h2>
            <div className="proj-section-right col-xs-12">
              <p> Recording of symptoms got the most feedback. People preferred the random layout versus stacked as the stacked was viewed as a hierarchical. </p> 
              <img src="img/healthcare/symptoms.png" className="img-responsive col-xs-12" alt="symptoms" />

              <p> Severity scaling was viewed positively with the colors indicating severity rather than circle size.  </p> 
              <img src="img/healthcare/symptoms2.png" className="img-responsive col-xs-12" alt="symptoms2" />

              <p>  Filling out health surveys is percieved as stressful and tedious paperwork. The guided onboarding process of one question per screen, with indication of progress at the top helped users feel a sense of completion. </p> 
              <img src="img/healthcare/health_qs.png" className="img-responsive col-xs-12" alt="healthqs" />
            </div>
          </div>

          <div className="row">
            <div className="proj-section-right col-xs-12 col-md-6">
              <h2> Final Outcome </h2>
              <p> A demo app was built and preloaded with sample patients. The app was presented at Pega World and was considered a success- key metric of "success" being new client relationships and sales. A few healthcare companies, who must kept anonymous due to NDA, signed on project contracts, inspired by the demo that was presented. </p>
            </div>
            <img src="img/healthcare/pegaworld.png" className="img-responsive col-xs-12 col-md-6" alt="dots" />
          </div>
        </div>
      </div>
    </body>
  );
}

export default HealthcarePage;