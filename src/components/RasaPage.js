import React from 'react';
import { Link } from 'react-router-dom';

function RasaPage() {
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
            <Link to="/teams"> 
              <img alt="next" src="img/next.jpg" width="150px" /> 
            </Link>
          </li>
          <li> 
            <Link to="/healthcare"> 
              <img alt="prev" src="img/prev.jpg" width="150px" /> 
            </Link>
          </li>
        </ul>
      </div>

      <div className="page-content">
        <div className="prj-header">
          <img src="img/headers/rasa_logo.png" width="20%" height="20%" alt="rasa header Image"/>
          <h2> Front-End Engineer </h2>
          <p> Rasa aims to empower non-engineers to train chatbots by correcting their mistakes and reviewing their accuracy. As a solo "ux minded" front-end engineer, I built a react web app to do this. Working on the UX in this project cemented my interest and inspired me to make the career pivot from engineer to designer. </p> 
        </div>

        <div className="container-fluid project-info">
          <div className="row">
            <h2 className="col-xs-12"> Impact </h2>
            <p className="col-xs-12"> My work was pivotal for Rasa in making the switch from a professional services company to a product company. The product proved to cut down chatbot training time and increase collobaration between product managers and engineers. Since the first version of the application, Rasa now has enterprise subscriptions for the product and customers from indsutry verticals like insurances, banking, telecom and healthcare.  </p>
          </div>

          <div className="row">
            <div className="row hideme">
              <img src="img/rasa/rasa.gif" className="img-responsive col-xs-12 col-md-7" alt="research study" />
              <div className="proj-section-right col-xs-12 col-md-5">
                <h2> Background </h2>
                <p>  The final product vision was to build a tool that allows ease of collobaration between machine learning engineers and product owners or project managers while building a chatbot. While machine learning engineers build the technicial back-end of a chatbot, a non-technical person such as a project manager would be tasked with gathering the business requirements and then testing the bot to make sure the acceptance criteria is met. </p>
              </div>
            </div>

            <div className="row">
              <h2 className="col-xs-12"> Workshops </h2>
              <p className="col-xs-12"> I flew to Berlin and led design workshops with engineers, product managers, and end users to gain a familiarity of who we were building for. Another key outcome of these workshops was having people of different backgrounds and roles talk to one another and gain understanding for how they view this new and green field of machine learning, chatbots, and AI. </p>
              <img src="img/rasa/workshop.png" className="img-responsive col-xs-12 col-md-6" alt="workshop 1" />
              <img src="img/rasa/workshop2.png" className="img-responsive col-xs-12 col-md-6" alt="workshop 2" />
              
              <h2 className="col-xs-12"> Identifying Pain Points </h2>
              <p className="col-xs-12"> Everyone was excited and had a lot of feelings and ideas to share during the workshop, so much so that we ran out of time. We did a follow up where we identitied the current user journey of making a chatbot, from the perspective of an engineer as well as a product manager. </p>
              <img src="img/painpoints.svg" className="img-responsive col-xs-12" alt="pain points" />

              <h2 className="col-xs-12"> Reccomended User Journey </h2>
              <p className="col-xs-12"> I then converted these painpoints into opportunites of where the web application Rasa X could fill the gaps. I presented my reccomendations to key stakeholders and included engineers to understand feasibility of the new approach.  </p>
              <img src="img/rasa/user_journey.png" className="img-responsive col-xs-12" alt="user journey" />

              <h2 className="col-xs-12"> Wireframes </h2>
              <p className="col-xs-12"> Once we decided on a user journey and process flow, it was rounds and round of low fidelity wireframing. Design reviews were conducted with head of engineering, business, and end users. </p>
              <img src="img/rasa/art_board.png" className="img-responsive col-xs-12" alt="art board" />
              <img src="img/rasa/wireframe.png" className="img-responsive col-xs-12" alt="wireframes" />

              <h2 className="col-xs-12"> Screenshots of the App </h2>
              <p className="col-xs-12"> Due to my innumerable design and development responsibilities and pressure to meet tight deadlines, I did not create any hi-fidelity mockups at Rasa. I did the discovery phase of understanding the user, low fidelity wireframing, and then went straight to coding. Here are some screenshots of the final build. </p>
              <img src="img/rasa/rasa_platform2.png" className="img-responsive col-xs-12 col-md-6" alt="rasa platform 2" />
              <img src="img/rasa/rasa_platform3.png" className="img-responsive col-xs-12 col-md-6" alt="rasa platform 3" />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RasaPage;