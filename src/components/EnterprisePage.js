import React from 'react';
import { Link } from 'react-router-dom';

function EnterprisePage() {
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
            <Link to="/password-protected"> 
              <img alt="prev" src="img/next.jpg" width="150px" /> 
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
          <img src="img/headers/cloud_logo.png" alt="Enterprise Header Image"/>
          <h2> Lead Product Designer </h2> 
          <p> Designed a mission-critical internal product that helps Google NetOps teams colloborate and track complex operational processess globally. </p> 
          <p> Led comprehensive user research initiatives with 3 teams and 7 product managers across 4 global timezones. Conducted stakeholder interviews, discovery workshops, and usability testing sessions to drive data-driven design decisions. </p> 
          <p> Delivered innovative 0 to 1 product design solutions from concept through implementation, creating both low and high-fidelity prototypes while maintaining strict adherence to Material Design system guidelines. Successfully facilitated seamless project coordination between design, engineering, and business stakeholders throughout the entire product development lifecycle, resulting in enhanced operational efficiency and improved user experience across complex enterprise workflows. </p> 
        </div>

        <div className="container-fluid project-info">
          <div className="row hideme">
            <div className="proj-section-left col-xs-12 col-md-6">
              <h2> The Challenge </h2>
              <p> As a solo designer, it was vital to the project's success that I remained organized and decisive. End users of the application were scattered throughout the world. Planning and conducting a he evaluation, for example, is a lot more difficult when you have to schedule with folks from Manila, Frankfurt, London, and Sunnyvale. Scheduling meetings across 4 timezones, communicating design research findings and executing remote design workshops were all challenges I faced and overcame during this project. </p>
            </div>
            <img src="img/enterprise/world.svg" className="img-responsive col-xs-12 col-md-6" alt="research study" />
          </div>

          <div className="row hideme">
            <img src="img/enterprise/card-sorting.svg" className="img-responsive col-xs-12 col-md-7" alt="research study" />
            <div className="proj-section-right col-xs-12 col-md-5">
              <h2> Remote Workshops </h2>
              <p>  Because of the global nature of our project and budget constraints, I adapted our design workshops so that they could be done virtually. While this is the standard now, this was pre-COVID before remote collaboration was the defacto. We didn't have budget in the project to fly people around the world but needed everyone get together to build a single platform across geographic locations. By organizing remote design workshops across 4 different timezones, 3 different teams, and 7 program managers- I was able to drive stategy alignment and gain valuable insights with minimal business travel costs. Card sorting exercises were done in google slides or MURAL. Heuristic evalutions were done over screenshare, and think alouds were conducted Google Hangouts. </p>
            </div>
          </div>

          <div className="row hideme">
            <div className="proj-section-left col-xs-12 col-md-8">
              <h2> Less Flashy More Functional </h2>
              <p> I learned a lot about how enterprise application design is different than consumer design. The biggest lesson being that your end users have to use your product whether they like it or not. Period. They have to do their job. Because of this, there is more emphasis put on being able to complete tasks efficiently and accurately rather than the visual design. This learning impacted the way I prioritized design bugs for engineers to fix. User experience fixes were higher priority fixes compared to asethetics or branding. </p>
            </div>
            <img src="img/enterprise/phones.svg" className="img-responsive col-xs-12 col-md-4" alt="research study" />
          </div>

          <div className="row hideme">
            <img src="img/enterprise/transparency.svg" className="img-responsive col-xs-12 col-md-5" alt="research study" />
            <div className="proj-section-right col-xs-12 col-md-7">
              <h2> Transparency is Key </h2>
              <p>  I originally designed each portal to be different for each end user group. I realized that while they do have different roles and responsibilities, the user groups in enterprise tend to be very cross-functional and need to talk to one another. I took this learning from the initial design, the strong desire for more transparency and consistency, and  worked on a redesign while we were still rolling out new features. The second iteration focused on making the portals for the different groups look more alike, but highlighting relevant information for each group specifically. Via the remote testing workshop methods I mentioned earlier, I was able to present the redesign to stakeholders along with the user research data which indicated the redesign improved task completiion times compared to the original. The thoroughness of my pitch allowed for the work to be added to the build roadmap immediately. </p>
            </div>
          </div>

          <div className="row hideme">
            <div className="proj-section-right col-xs-12 col-md-12">
              <h2>  Sharpening my Instinct for "Customize for Standardize?" </h2>
              <p>  If you want to automate a process, it means you have to standardize it - in this case it meant making a process flow and the user experience the same across 3 different teams. One standardization effort ask from business stakeholders was to have a table filtered by default. Through workshops, however, I discovered that because each worker logging in has their own personal process of filtering tickets- the default filtered list was actually a major pain point because they would have to reset filters first, and then apply their own personal custom settings that worked best for them. To accommodate the user needs for customization and satisfy the business needs of some sort of standardization, I designed and proposed a 'saved filter' widget. The feature was well recieved by both business stakeholders and end users. Working on this product for over a year helped me gain an intuition for deciding when to customize and when to standardize. I learned to ask the right questions in workshops related to standardize veruss customize for features going forward, such as ticket UI design and timer design. By working this into the ideation and research phase, I was able to mitigate technical debt for the team and reduce roadmap pivots.  </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default EnterprisePage;