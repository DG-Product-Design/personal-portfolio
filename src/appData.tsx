import React from 'react';
import ComboImg from './components/ComboImg/ComboImg';
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
} from './img/svgLogos';
import HomeSearchImg from './img/homesearch-collage.png';
import SjcImg from './img/sjc-matching-engine.jpg';
import LcaDesktop from './img/lca/capabilities-table-wrapper.jpg';
import LcaMobile from './img/lca/list-view.png';
import UxUiImg from './img/ux-ui--no-bg.jpg';
import TopshotImg from './img/topshot.jpg';
import CustomerIoImg from './img/customerIo.png';
import StudentImg from './img/manifesto/student.png';
import TrophyImg from './img/manifesto/trophy.png';
import ChartImg from './img/manifesto/chart.png';
import ShapesImg from './img/manifesto/shapes.png';
import GlobeImg from './img/manifesto/globe.png';
import PencilRideImg from './img/manifesto/pencil-ride.png';

export const workCardData = [
	// PROPERTY SEARCH
	{
		body:
			<>
				I designed and built a lead-gen tool for prospective Real Estate clients to find homes to purchase and schedule tours. Upon implementation, tour leads increased by over 3x.
				<br />
				<br />
				Designed in Figma, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD and Kubernetes clusters. ADA level AA compliant design.
			</>,
		button: {
			className: 'text-decoration-none',
			href: 'https://capcenter.com/homes/',
			text: 'View live site',
		},
		color: 'blue' as const,
		headline:
			<>
				Real Estate
				<br />
				Property Search
			</>,
		img: HomeSearchImg,
		imgAltText: 'Screenshots of lead-gen tool for prospective Real Estate clients.',
		logos: [
			<FigmaSVG key='figma' />,
			<ReactSVG key='react' />,
			<BootstrapSVG key='bootstrap' />,
			<TypescriptSVG key='tsx'/>,
			<AzureSVG key='azure' />,
			<KubernetesSVG key='k8s' />
		]
	},
	// SJC MATCHING ENGINE
	{
		rightAlign: true,
		bannerContent:
			<>
				<i className='banner__icon fas fa-award w-50 fs-1 text-center mb-3' />
				<p className="lh-sm text-center">CCISDA Innovation Award, 2017</p>
			</>,
		body:
			<>
				I designed and built a tool for social workers in California to match foster parents with children ready for adoption based on numerous weighted criteria. Won the 2017 Innovation Award from California County Information Services Directors Association (CCISDA).
				<br  />
				<br  />
				Designed in Adobe XD, written in Angular with Material Design and Javascript (which we migrated to Typescript), then deployed on Google Cloud Platform and Google App Engine with Gitlab CI/CD. Section 508 compliant design.
			</>,
		button: {
			className: 'text-decoration-none',
			href: 'https://www.youtube.com/watch?v=V3bQb4yMH3k',
			text: 'Watch video by Google',
		},
		color: 'rose' as const,
		headline:
			<>
				Weighted Algorithm<br />Matching Engine
			</>,
		img: SjcImg,
		imgAltText: 'Screenshots of weighted Matching Engine.',
		logos: [
			<AdobeSVG key='adobe'/>,
			<AngularSVG key='angular' />,
			<MaterialSVG key='material' />,
			<JavascriptSVG key='js' />,
			<TypescriptSVG key='tsx'/>,
			<GcpSVG key='gcp' />,
			<GitlabSVG key='gitlab' />
		]
	},
	// LOAN APP
	{
		altImage:
			<div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
				<div className="work-card__loan-app-image--alt" aria-label='Screenshots of Mortgage loan and refinance application.' />
			</div>
		,
		body:
			<>
				I redesigned the business&apos; primary revenue source - the Loan Application. Improved NPS 2+ points and facilitated 500% growth in intake volume. This design is still actively facilitating loan applications today.
				<br />
				<br />
				Designed in Sketch, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD.
			</>,
		className: 'align-items-stretch py-0',
		color: 'yellow' as const,
		headline: 'Fintech Mortgage Loan Application',
		imgWrapperClass: 'col-12 col-xl',
		logos: [
			<SketchSVG  key='sketch'/>,
			<ReactSVG key='react' />,
			<BootstrapSVG key='bootstrap' />,
			<TypescriptSVG key='tsx'/>,
			<AzureSVG key='azure' />,
			<KubernetesSVG key='k8s' />
		],
		textWrapperClass: 'work-card__text--padding-top pb-5'
	},
	// NBA TOPSHOT
	{
		rightAlign: true,
		body:
			<>
				I was a technical marketing consultant with Dapper Labs for the NBA Top Shot crypto/NFT project. 
				Worked with the data engineering team to sync data between their DBs and various marketing automation tools, like customer.io and HubSpot.
				<br />
				<br />
				Implemented data normalization for personalizing emails at scale for 2M+ users. Grew and improved platform onboarding through creative campaigns and A/B testing. Built internal communication tools with Slack API and Google Apps Script.
			</>,
		color: 'purple' as const,
		headline:
			<>
				<span className='lh-0'>NBA Top Shot</span>
				<br  />
				<span className='fs-5'>with Dapper</span>
			</>,
		img: TopshotImg,
		logos: [
			<img src={CustomerIoImg} alt='customer.io logo' key='customerIo' style={{ height: '1.5rem', width: 'auto' }} />,
			<HubspotSVG key='hubspot' />,
			<AppsScriptSVG key='appsScript' />,
			<SlackSVG key='slack' />,
		]
	},
	// COMPONENT LIBRARY
	{
		altImage:
			<div className="work-card__loan-app-image-wrapper--alt d-flex align-items-stretch h-100">
				<div className="work-card__component-library-image" aria-label='Screenshots of component library.' />
			</div>,
		body:
			<>
				A UI component library that utilizes Storybook for component documentation and testing. Components are designed in Figma, built in React using Typescript and Tailwind, then published as a public NPM package for distribution and released to Github. 
				<br  />
				<br  />
				I&apos;ve built similar (but larger) component libraries to this one, which are currently in use distributing design systems across various application ecosystems, including websites, apps, and digital tools.
			</>,
		button: {
			className: 'no-underline',
			href: 'https://github.com/DG-Product-Design/component-library',
			text: 'View project on Github',
		},
		className: 'align-items-stretch py-0',
		color: 'blue' as const,
		headline:
			<>
				<span className='lh-0'>UI Component Library</span>
				<br  />
				<span className='fs-5'>React + Tailwind + Storybook + NPM</span>
			</>,
		imgWrapperClass: 'col-12 col-xl ps-0 ps-xl-4',
		logos: [
			<FigmaSVG key='figma' />,
			<ReactSVG key='react' />,
			<TailwindSVG key='tw' />,
			<TypescriptSVG key='tsx'/>,
			<NpmSVG key='npm' />,
			<GithubSVG key='github' />
		],
		secondaryButton: {
			className: 'no-underline',
			href: 'https://www.npmjs.com/package/@j33p1n/component-library',
			text: 'View NPM package',
		},
		textWrapperClass: 'work-card__text--padding-top pb-5'
	},
	// ASSIGNER APP
	{
		rightAlign: true,
		altImage:
			<ComboImg
				img1={LcaMobile}
				img1AltText="Mobile screenshot of fintech internal client assigner management tool."
				img2={LcaDesktop}
				img2AltText="Desktop screenshot of fintech internal client assigner management tool."
			/>,
		body:
			<>
				I designed an internal management tool to automatically match clients with consultants based on geolocation, skills and qualifications, and availability. Upon implementation, each manager in the program successfully saved over 30 min per day, or 125 hours per year.
				<br />
				<br />
				Designed in Figma, written in React with Bootstrap and Typescript, then deployed on Azure with CI/CD.
			</>,
		className: 'layout--alt-left',
		color: 'rose' as const,
		headline: 'Client Assigner Management Tool',
		logos: [
			<FigmaSVG key='figma' />,
			<ReactSVG key='react' />,
			<BootstrapSVG key='bootstrap' />,
			<TypescriptSVG key='tsx'/>,
			<AzureSVG key='azure' />,
		]
	},
	// UX/UI DESIGN
	{
		body:
			<>
				From style guides and wireframes to production-ready designs, I have years of experience building and working within pre-existing design systems. My product designs are typically initiated in Figma or Sketch and iterated upon until they&apos;re ready for interactive feedback (big believer in naming layers!).
				<br  />
				<br  />
				Depending on the client needs, the protyping is then done within Figma/Sketch or on the web with HTML, CSS, and minimal Javascript.
			</>,
		color: 'yellow' as const,
		headline:
			<>
				<span className='lh-0'>UX &amp; UI Design</span>
				<br  />
				<span className='fs-5'>Figma / Sketch / XD</span>
			</>,
		img: UxUiImg,
		imgAltText: 'Screenshots of design work in Figma and Sketch.',
		logos: [
			<FigmaSVG key='figma' />,
			<SketchSVG  key='sketch' />,
			<AdobeSVG key='adobe' />
		]
	}
];


export const manifestoData = [
    {
        img: GlobeImg,
        imgAlt: 'Globe',
        title: 'Think big (picture)',
        body:
            <>
                Design sustainably and for extensibility. Creating design systems and standardizing them across the design and development environments makes it possible to maintain <span className="whitespace-nowrap">&quot;pixel-perfect&quot;</span> consistency and ensures an easy handoff from design to dev.
            </>
    },
	{
		img: TrophyImg,
		imgAlt: 'Trophy',
		title: 'Learn from the masters',
		body: 'Benchmarking against the industry is foundational to establishing a realistic product goal and for understanding where we currently are. Find out why the top players are successful and compare against our own strategy. Then fill in the gaps with our own style and story.'
	},
	{
		img: ShapesImg,
		imgAlt: '3D simple shapes',
		title: 'Simple is sophisticated',
		body:
			<>
				<em>&quot;I apologize for the length of this letter, for I lacked the time to make it shorter.&quot;</em>&nbsp; Truly one of my favorite quotes. The simplification process is often more difficult than maintaining complexity. But it&apos;s worth it - our users, clients, and teammates will thank us.
			</>
	},
	{
		img: StudentImg,
		imgAlt: 'Student reading book',
		title: 'Be a student of everything',
		body: 'Every day is an opportunity to learn from the world around us. Studying behavioral trends, technological changes, and industry leaders helps sustain a steady flow of inspiration. Always consider that the best products feel natural, which requires design to be cognizant of elements and experiences outside of digital devices.'
	},
	{
		img: ChartImg,
		imgAlt: '3D pie chart',
		title: 'Do your (market) research',
		body: 'Successful products solve a problem or provide an experience effectively and efficiently - for the user and the business. Start by understanding our (or our client&apos;s) business model then seek to understand its users. This ensures that products aren&apos;t simply beautiful, but are usable and profitable at the core.'
	},
	{
		img: PencilRideImg,
		imgAlt: '3D woman riding pencil',
		title: 'Trust more than yourself',
		body: 'Own our work, but be open to feedback. And for the sake of our own mental health, don&apos;t take it personally. I&apos;m continually humbled by user behavior - expect the unexpected. Trust the user-testing process and remember, going alone might be fast, but going together is what lasts.'
	}
]
