import React from 'react';
import WorkCard from '../components/WorkCard/WorkCard';
import ComboImg from '../components/ComboImg/ComboImg';

//// IMAGES

// PROPERTY SEARCH
const psHomeSearchImg = require('../img/homesearch-collage.png');

// SJC ICAN
const sjcImg = require('../img/sjc/sjc-matching-engine.png');

// LCA
const lcaDesktop = require('../img/lca/capabilities-table-wrapper.png');
const lcaMobile = require('../img/lca/list-view.png');





const WorkSection = () => {
  return (
    <React.Fragment>
      <h4 id="work" className="homepage__section-header w-100 fs-2 mb-4">Work</h4>
      
			<WorkCard
        color="blue"
        headline={
          <React.Fragment>
            Real Estate
            <br />
            Property Search
          </React.Fragment>
        }
        body='I designed and built a lead-gen tool for prospective Real Estate clients to find homes to purchase and schedule tours. Increased tour leads by 3x.'
        button={
          <a href="https://capcenter.com/homes/" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
            <button className="dg-btn dg-btn--white mb-0 mb-lg-5">
              See live tool
            </button>
          </a>
        }
        img={psHomeSearchImg}
				/>
  
      <WorkCard
        rightAlign
        color="rose"
        headline={
					<React.Fragment>
            Weighted Algorithm<br />Matching Engine
          </React.Fragment>
        }
        body='I designed and built a tool for social workers in California to match foster parents and children for adoption based on numerous weighted criteria. Won the 2017 Innovation Award from California County Information Services Directors Association (CCISDA).'
        bannerContent={
					<React.Fragment>
            <i className='banner__icon fas fa-award w-50 fs-1 text-center mb-3' />
            <p className="lh-sm text-center">CCISDA Innovation Award, 2017</p>
          </React.Fragment>
        }
        button={
					<a href="https://www.youtube.com/watch?v=V3bQb4yMH3k" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
            <button className="dg-btn dg-btn--white mb-5">
              Watch video by Google
            </button>
          </a>
        }
				img={sjcImg}
      />

      <WorkCard
        className="align-items-stretch py-0"
        color="yellow"
        altImage={
          <div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
            <div className="work-card__loan-app-image--alt" />
          </div>
        }
        imgWrapperClass="col-12 col-lg"
        headline='Fintech Mortgage Loan Application'
        body='I redesigned the product responsible for the company&apos;s primary source of revenue - the Loan Application. Improved NPS 2+ points and facilitated 500% growth in intake volume.'
        textWrapperClass="work-card__text--padding-top pb-5"
        button={
          <button className="dg-btn dg-btn--white mb-0 mb-lg-5">
            More Soon
          </button>
        }
      />

			<WorkCard
        rightAlign
        color="purple"
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
        body='I designed an internal management tool to automatically match clients with consultants based on geolocation, skills and qualifications, and availability. Successfully saved each manager in the program over 30 min per day or 125 hours per year.'
        button={
          <button className="dg-btn dg-btn--white mb-5">
            Details in-development
          </button>
        }
      />

			<WorkCard
        className="align-items-stretch py-0"
        color="blue"
        altImage={
          <div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
            <div className="work-card__component-library-image" />
          </div>
        }
        imgWrapperClass="col-12 col-lg ps-0 ps-lg-4"
        headline={
					<React.Fragment>
						<span className='lh-0'>UI Component Library</span>
						<br  />
						<span className='fs-5'>React + Storybook + NPM</span>
					</React.Fragment>
				}
        body='I created a UI component library that utilizes Storybook for component documentation and testing. Components are built in React using Typescript and Tailwind. The components are then published as a public NPM package for distribution.'
        textWrapperClass="work-card__text--padding-top pb-5"
        button={
					<a href='https://github.com/DG-Product-Design/component-library' target='_blank' rel='noopener noreferrer' className='no-underline'>
						<button className='dg-btn dg-btn--white no-underline'>
							View project on Github
						</button>
					</a>
        }
				secondaryButton={
					<div className='my-3'>
						<a href='https://www.npmjs.com/package/@j33p1n/component-library' target='_blank' rel='noopener noreferrer' className='no-underline'>
							<button className='dg-btn dg-btn--white no-underline'>
								View NPM package
							</button>
						</a>
					</div>
				}
      />
    </React.Fragment>
  )
}

export default WorkSection;