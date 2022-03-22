import React from 'react';
import classNames from 'classnames';
import WorkCard from '../../components/WorkCard/WorkCard';
import ComboImg from '../../components/ComboImg/ComboImg';
import ComboImg3 from '../../components/ComboImg3/ComboImg3';
import ComboImg4 from '../../components/ComboImg4/ComboImg4';

import './Homepage.scss';


interface HeroSectionProps {
  wrapperClass?: string
}


//// IMAGES
const headshotImg = require('../../img/david-a-george-design-headshot.png');

// PROPERTY SEARCH
const psHomeSearchImg = require('../../img/homeSearch/homesearch-collage.png');

// LOAN APP
const formCurrentAddressImg = require('../../img/loanApp/form/form-current-address.png');
const formEmploymentInfoImg = require('../../img/loanApp/form/form-employment-info.png');
const formLiabilitiesSelectImg = require('../../img/loanApp/form/form-liabilities-select.png');
const formLoanSubmitImg = require('../../img/loanApp/form/form-submit-app.png');

// SJC ICAN
const sjcImg1 = require('../../img/sjc/matching-engine-results-and-score.png');
const sjcImg2 = require('../../img/sjc/matched-profile-with-highlighted-matches.png');

// LCA
const lcaDesktop = require('../../img/lca/capabilities-table-wrapper.png');
const lcaMobile = require('../../img/lca/list-view.png');

const HeroSection = (props: HeroSectionProps) => {
  return (
    <div className={classNames(props.wrapperClass && props.wrapperClass, "hero-section d-flex flex-wrap align-items-center w-100")}>
      <div className="col-12 col-md-5 col-lg-8 pr-0 pr-lg-4">
        <h2 className="hero-section__headline text--gradient fw-bold lh-sm mb-4">
          Hi, I'm David:
          <br />
          A product designer
          <br />
          &amp; developer
        </h2>
        <h4 className="max-w-xs lh-base mb-5 px-0">
          I help companies design intuitive digital products with a profit-driven approach.
        </h4>
        <a href="mailto:dav.a.george@gmail.com">
          <button className="dg-btn dg-btn--white bg-gradient-green-200 px-4 py-3">Let's chat</button>
        </a>
      </div>
      <div className="col-12 col-md-7 col-lg-4 d-flex justify-content-center mt-4 mt-lg-0">
        <div className="hero-section__headshot-wrapper px-4 px-md-3 mt-5 mt-sm-4 mt-lg-0">
          <img src={headshotImg} className="img-fluid" alt="David A George - product designer headshot" />
        </div>
      </div>
    </div>
  )
}

const HomePage = (props: any) => {

  return (
    <div id="homepage" className="w-100 px-2 px-lg-5">
      <div className="container-lg">
        <HeroSection wrapperClass='w-100'/>

        <h4 id="work" className="w-100 fs-2 mb-4">Work</h4>

        <WorkCard
          color="blue"
          headline={
            <React.Fragment>
              Real Estate
              <br />
              Property Search
            </React.Fragment>
          }
          body='Designed and built a lead-gen tool for prospective Real Estate clients to find homes to purchase and schedule tours. Increased tour leads by 3x.'
          button={
            <a href="https://capcenter.com/homes/" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
              <button className="dg-btn dg-btn--white" onClick={() => {}}>
                See live tool
              </button>
            </a>
          }
          img={psHomeSearchImg}
        />

        <WorkCard
          rightAlign
          color="rose"
          altImage={
            <ComboImg
              img1={sjcImg1}
              img1AltText="ICAN Matching Engine - comparing results"
              img2={sjcImg2}
              img2AltText="ICAN Matching Engine - reviewing score details"
            />
          }
          headline={
            <React.Fragment>
              Weighted Algorithm<br />Matching Engine
            </React.Fragment>
          }
          body='Designed and built a tool for social workers in California to match foster parents and children for adoption based on numerous weighted criteria.'
          bannerContent={
            <React.Fragment>
              <i className='banner__icon fas fa-award w-50 fs-1 text-center mb-3' />
              <p className="lh-sm text-center">CCISDA Innovation Award, 2017</p>
            </React.Fragment>
          }
          button={
            <a href="https://www.youtube.com/watch?v=V3bQb4yMH3k" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
              <button className="dg-btn dg-btn--white" onClick={() => {}}>
                Watch video by Google
              </button>
            </a>
          }
        />

        <WorkCard
          color="yellow"
          altImage={ 
            <ComboImg4 
              img1={formCurrentAddressImg}
              img1AltText="Loan Application screen - why are you refinancing?"
              img2={formLiabilitiesSelectImg}
              img2AltText="Loan Application screen - where in the process are you?"
              img3={formEmploymentInfoImg}
              img3AltText="Loan Application screen - employment info"
              img4={formLoanSubmitImg}
              img4AltText="Loan Application screen - submit loan"
            />
          }
          headline='Fintech Mortgage Loan Application'
          body='Redesigned the product responsible for the company&apos;s primary source of revenue - the Loan Application. Improved NPS and facilitated 500% growth in intake volume.'
          button={
            <button className="dg-btn dg-btn--white" onClick={() => {}}>
              Details in-development
            </button>
          }
        />
        
        <WorkCard
          rightAlign
          color="nickel"
          className="layout--alt-left"
          altImage={ 
            <ComboImg
              img1={lcaMobile}
              img1AltText="Fintech Client Assignment and Management - desktop"
              img2={lcaDesktop}
              img2AltText="Fintech Client Assignment and Management - desktop"
            />
          }
          headline='Client Assigner &amp; Management Tool'
          body='Designed an internal management tool to automatically match clients with consultants based on geolocation, skills and qualifications, and availability. Successfully saved each manager in the program over 30 min per day or 125 hours per year.'
          button={
            <button className="dg-btn dg-btn--white" onClick={() => {}}>
              Details in-development
            </button>
          }
        />
      </div>
    </div>
  )
}

export default HomePage;