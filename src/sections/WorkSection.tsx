import React from 'react';
import WorkCard from '../components/WorkCard/WorkCard';
import ComboImg from '../components/ComboImg/ComboImg';
import {
	AdobeSVG,
	AngularSVG,
	AppsScriptSVG,
	AzureSVG,
	BootstrapSVG,
	FigmaSVG,
	GcpSVG,
	GithubSVG,
	GitlabSVG,
	HubspotSVG,
	JavascriptSVG,
	KubernetesSVG,
	MaterialSVG,
	NpmSVG,
	ReactSVG,
	SketchSVG,
	SlackSVG,
	TailwindSVG,
	TypescriptSVG
} from '../img/svgLogos';


//// IMAGES
const homeSearchImg = require('../img/homesearch-collage.png');
const sjcImg = require('../img/sjc-matching-engine.jpg');
const lcaDesktop = require('../img/lca/capabilities-table-wrapper.jpg');
const lcaMobile = require('../img/lca/list-view.png');
const uxUiImg = require('../img/ux-ui--no-bg.jpg');
const topshotImg = require('../img/topshot.jpg');
const customerIoImg = require('../img/customerIo.png');


const WorkSection = () => {
	return (
		<React.Fragment>
			<h4 id="work" className="homepage__section-header w-100 fs-2 mb-4">Work</h4>
			
			{/* PROPERTY SEARCH */}
			<WorkCard
				color="blue"
				headline={
					<React.Fragment>
						Real Estate
						<br />
						Property Search
					</React.Fragment>
				}
				body={
					<React.Fragment>
						I designed and built a lead-gen tool for prospective Real Estate clients to find homes to purchase and schedule tours. Upon implementation, tour leads increased by over 3x.
						<br />
						<br />
						Designed in Figma, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD and Kubernetes clusters. ADA level AA compliant design.
					</React.Fragment>
				}
				button={
					<a href="https://capcenter.com/homes/" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
						<button className="dg-btn dg-btn--white">
							View live site
						</button>
					</a>
				}
				img={homeSearchImg}
				imgAltText='Screenshots of lead-gen tool for prospective Real Estate clients.'
				logos={[
					<FigmaSVG key='figma' />,
					<ReactSVG key='react' />,
					<BootstrapSVG key='bootstrap' />,
					<TypescriptSVG key='tsx'/>,
					<AzureSVG key='azure' />,
					<KubernetesSVG key='k8s' />
				]}
			/>

			{/* SJC MATCHING ENGINE */}
			<WorkCard
				rightAlign
				color="rose"
				headline={
					<React.Fragment>
						Weighted Algorithm<br />Matching Engine
					</React.Fragment>
				}
				body={
					<React.Fragment>
						I designed and built a tool for social workers in California to match foster parents with children ready for adoption based on numerous weighted criteria. Won the 2017 Innovation Award from California County Information Services Directors Association (CCISDA).
						<br  />
						<br  />
						Designed in Adobe XD, written in Angular with Material Design and Javascript (which we migrated to Typescript), then deployed on Google Cloud Platform and Google App Engine with Gitlab CI/CD.
					</React.Fragment>
				}
				bannerContent={
					<React.Fragment>
						<i className='banner__icon fas fa-award w-50 fs-1 text-center mb-3' />
						<p className="lh-sm text-center">CCISDA Innovation Award, 2017</p>
					</React.Fragment>
				}
				button={
					<a href="https://www.youtube.com/watch?v=V3bQb4yMH3k" rel="noopener noreferrer" target="_blank" className="text-decoration-none">
						<button className="dg-btn dg-btn--white">
							Watch video by Google
						</button>
					</a>
				}
				img={sjcImg}
				imgAltText='Screenshots of weighted Matching Engine.'
				logos={[
					<AdobeSVG key='adobe'/>,
					<AngularSVG key='angular' />,
					<MaterialSVG key='material' />,
					<JavascriptSVG key='js' />,
					<TypescriptSVG key='tsx'/>,
					<GcpSVG key='gcp' />,
					<GitlabSVG key='gitlab' />
				]}
			/>

			{/* LOAN APP */}
			<WorkCard
				className="align-items-stretch py-0"
				color="yellow"
				altImage={
					<div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
						<div className="work-card__loan-app-image--alt" aria-label='Screenshots of Mortgage loan and refinance application.' />
					</div>
				}
				imgWrapperClass="col-12 col-xl"
				headline='Fintech Mortgage Loan Application'
				body={
					<React.Fragment>
						I redesigned the business&apos; primary revenue source - the Loan Application. Improved NPS 2+ points and facilitated 500% growth in intake volume. This design is still actively facilitating loan applications today.
						<br />
						<br />
						Designed in Sketch, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD and Kubernetes clusters.
					</React.Fragment>
				}
				textWrapperClass="work-card__text--padding-top pb-5"
				logos={[
					<SketchSVG  key='sketch'/>,
					<ReactSVG key='react' />,
					<BootstrapSVG key='bootstrap' />,
					<TypescriptSVG key='tsx'/>,
					<AzureSVG key='azure' />,
					<KubernetesSVG key='k8s' />
				]}
			/>

			{/* NBA TOPSHOT */}
			<WorkCard
				rightAlign
				color="purple"
				img={topshotImg}
				headline={
					<React.Fragment>
						<span className='lh-0'>NBA Top Shot</span>
						<br  />
						<span className='fs-5'>with Dapper</span>
					</React.Fragment>
				}
				body={
					<React.Fragment>
						I was a technical marketing consultant with Dapper Labs for the NBA Top Shot crypto/NFT project. 
						Worked with the data engineering team to sync data between their DBs and various marketing automation tools, like customer.io and HubSpot.
						<br />
						<br />
						Implemented data normalization for personalizing emails at scale for 2M+ users. Grew and improved platform onboarding through creative campaigns and A/B testing. Built internal communication tools with Slack API and Google Apps Script.
					</React.Fragment>
				}
				logos={[
					<img src={customerIoImg} alt='customer.io logo' key='customerIo' style={{ height: '1.5rem', width: 'auto' }} />,
					<HubspotSVG key='hubspot' />,
					<AppsScriptSVG key='appsScript' />,
					<SlackSVG key='slack' />,
				]}
			/>

			{/* COMPONENT LIBRARY */}
			<WorkCard
				className="align-items-stretch py-0"
				color="blue"
				altImage={
					<div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
						<div className="work-card__component-library-image" aria-label='Screenshots of component library.' />
					</div>
				}
				imgWrapperClass="col-12 col-xl ps-0 ps-xl-4"
				headline={
					<React.Fragment>
						<span className='lh-0'>UI Component Library</span>
						<br  />
						<span className='fs-5'>React + Storybook + NPM</span>
					</React.Fragment>
				}
				body={
					<React.Fragment>
						A UI component library that utilizes Storybook for component documentation and testing. Components are designed in Figma, built in React using Typescript and Tailwind, then published as a public NPM package for distribution and released to Github. 
						<br  />
						<br  />
						I&apos;ve built similar (but larger) component libraries to this one, which are currently in use distributing design systems across various application ecosystems, including websites, web apps, and digital tools.
					</React.Fragment>
				}
				textWrapperClass="work-card__text--padding-top pb-5"
				button={
					<a href='https://github.com/DG-Product-Design/component-library' target='_blank' rel='noopener noreferrer' className='no-underline'>
						<button className='dg-btn dg-btn--white no-underline'>
							View project on Github
						</button>
					</a>
				}
				secondaryButton={
					<div className='my-3 my-sm-1'>
						<a href='https://www.npmjs.com/package/@j33p1n/component-library' target='_blank' rel='noopener noreferrer' className='no-underline'>
							<button className='dg-btn dg-btn--white no-underline'>
								View NPM package
							</button>
						</a>
					</div>
				}
				logos={[
					<FigmaSVG key='figma' />,
					<ReactSVG key='react' />,
					<TailwindSVG key='tw' />,
					<TypescriptSVG key='tsx'/>,
					<NpmSVG key='npm' />,
					<GithubSVG key='github' />
				]}
			/>
			
			{/* ASSIGNER APP */}
			<WorkCard
				rightAlign
				color="rose"
				className="layout--alt-left"
				altImage={ 
					<ComboImg
						img1={lcaMobile}
						img1AltText="Mobile screenshot of fintech internal client assigner management tool."
						img2={lcaDesktop}
						img2AltText="Desktop screenshot of fintech internal client assigner management tool."
					/>
				}
				headline='Client Assigner &amp; Management Tool'
				body={
					<React.Fragment>
						I designed an internal management tool to automatically match clients with consultants based on geolocation, skills and qualifications, and availability. Upon implementation, each manager in the program successfully saved over 30 min per day, or 125 hours per year.
						<br />
						<br />
						Designed in Figma, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD.
					</React.Fragment>
				}
				logos={[
					<FigmaSVG key='figma' />,
					<ReactSVG key='react' />,
					<BootstrapSVG key='bootstrap' />,
					<TypescriptSVG key='tsx'/>,
					<AzureSVG key='azure' />,
				]}
			/>

			{/* UX/UI DESIGN */}
			<WorkCard
				color="yellow"
				headline={
					<React.Fragment>
						<span className='lh-0'>UX &amp; UI Design</span>
						<br  />
						<span className='fs-5'>Figma / Sketch / XD</span>
					</React.Fragment>
				}
				body={
					<React.Fragment>
						From style guides and wireframes to production-ready designs, I have years of experience building and working within pre-existing design systems. My product designs are typically initiated in Figma or Sketch and iterated upon until they&apos;re ready for interactive feedback (big believer in naming layers!).
						<br  />
						<br  />
						Depending on the client needs, the protyping is then done within Figma/Sketch or on the web with HTML, CSS, and minimal Javascript.
					</React.Fragment>
				}
				img={uxUiImg}
				imgAltText='Screenshots of design work in Figma and Sketch.'
				logos={[
					<FigmaSVG key='figma' />,
					<SketchSVG  key='sketch' />,
					<AdobeSVG key='adobe' />
				]}
			/>

			
		</React.Fragment>
	);
};

export default WorkSection;