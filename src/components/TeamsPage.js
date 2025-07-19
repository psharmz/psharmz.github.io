import React from 'react';
import { Link } from 'react-router-dom';

function TeamsPage() {
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
            <Link to="/enterprise"> 
              <img alt="next" src="img/next.jpg" width="150px" /> 
            </Link>
          </li>
          <li> 
            <Link to="/rasa"> 
              <img alt="prev" src="img/prev.jpg" width="150px" /> 
            </Link>
          </li>
        </ul>
      </div>

      <div className="page-content">
        <div className="prj-header">
          <img src="img/msoft/microsoft.png" width="20%" height="20%" alt="microsoft header Image"/>
          <br></br>
          <h2> Product Designer </h2>
          <p> From education products like Speaker Coach and Career Coach, to Windows products like Expressive Input Panel and Copilot, I had the opportunity to explore various consumer and enterprise design challenges through both a deep vertical and across horizonal ecosystem lens. I collaborated directly with talented researchers, product managers, and engineers on 0 to 1 products as well as new features for existing products. </p> 
        </div>

        <div className="container-fluid project-info">
          <div className="row">
            <div className="row hideme">
              <video width="100%" autoPlay controls className="img-responsive col-xs-12 col-md-7" alt="product 1" >
                <source src="img/msoft/intro1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="proj-section-right col-xs-12 col-md-5">
                <h2> Career Coach </h2>
                <p> Career Coach empowers higher education students to discover their career path, grow real-world skills, and build their network. The objective was to deliver guidance that was personalized to a students' education, skills, and interests. You can learn more about the product and browse snippets of the UI <a target="_blank" rel="noopener noreferrer" href="https://support.microsoft.com/en-us/topic/career-coach-quick-start-guide-for-students-c419db47-9290-4961-9684-c3f86a9b3708">here</a>. 
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <img src="img/msoft/cc_mobile.png" className="img-responsive col-xs-12 col-md-12" alt="career coach mobile" />
          </div>
          
          <h2 className="col-xs-12"> Speaker Progress </h2>

          <p className="col-xs-12"> Part of the Microsoft Education's suite of <a target="_blank" rel="noopener noreferrer" href="https://www.microsoft.com/en-us/education/learning-tools/learning-accelerators"> Learning Accelerators </a>, Speaker Progress helps students overcome their fear of public speaking and become more confident, captivating, and competent speakers. It can also help educators enhance their teaching methods and outcomes by using a fun and effective tool that supports their students' learning and growth. I was responsible for the educator experience of the product, which included personalization of the student report and seamlessly plugging in the new feature into the existing Assignment and Grades product experiences in Microsoft Teams.
          </p>

          <img src="img/msoft/speaker.gif" className="img-responsive col-xs-12" alt="speaker gif" />

          <img src="img/msoft/speakerstudent.gif" className="img-responsive col-xs-12" alt="speaker student gif" />

          <h2 className="col-xs-12"> Horizontal Efforts for EDU Insights </h2>

          <p className="col-xs-12"> At a company as large as Microsoft, a critical systems design challenge emerges: how does a design pattern scale across multiple products within a cohesive design system? One notable design prompt that I was given that encapsulated this was "Create a progressive disclosure system that guides an educator from a single data card in a learning product to the full history in the Insights app." While we started with Reading Coach first, the goal was to develop a scalable framework that could then be applied to all Learning Accelerators—Speaker, Reading, Math, Search—in a consistent manner through systematic design patterns.  </p>

          <img src="img/msoft/insights.jpg" className="img-responsive col-xs-12" alt="insights" />
        </div>
      </div>
    </body>
  );
}

export default TeamsPage;