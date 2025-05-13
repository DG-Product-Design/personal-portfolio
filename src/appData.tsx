import ComboImg from './components/ComboImg'
import {
    AdobeSVG,
    AngularSVG,
    AppsScriptSVG,
    AzureSVG,
    BootstrapSVG,
    FigmaSVG,
    FramerMotionSVG,
    GcpSVG,
    GitlabSVG,
    HubspotSVG,
    JavascriptSVG,
    KubernetesSVG,
    MaterialSVG,
    NetlifySVG,
    NpmSVG,
    ReactSVG,
    SketchSVG,
    SlackSVG,
    StorybookSVG,
    StyledComponentsSVG,
    TailwindSVG,
    TypescriptSVG,
    ViteSVG,
} from './assets/logos/svgs'
import HomeSearchImg from './assets/img/homesearch-collage.webp'
import SjcImg from './assets/img/sjc-matching-engine.webp'
import LcaDesktop from './assets/img/lca/capabilities-table-wrapper.webp'
import LcaMobile from './assets/img/lca/list-view.webp'
import UxUiImg from './assets/img/ux-ui--no-bg.webp'
import ComponentLibraryImg from './assets/img/component-library--no-bg.webp'
import LoanAppImg from './assets/img/loan-app-collage--no-bg.webp'
import FringeMarketplaceImg from './assets/img/fringe-marketplace.png'
import GithubSVG from './assets/logos/GithubSVG'
import TopshotImg from './assets/img/topshot.jpg'
import CustomerIoImg from './assets/logos/customerIo.png'
import StudentImg from './assets/img/manifesto/student.webp'
import TrophyImg from './assets/img/manifesto/trophy.webp'
import ChartImg from './assets/img/manifesto/chart.webp'
import ShapesImg from './assets/img/manifesto/shapes.webp'
import GlobeImg from './assets/img/manifesto/globe.webp'
import PencilRideImg from './assets/img/manifesto/pencil-ride.webp'

import ErinImg from './assets/img/recs/erin.jpg'
import MelissaImg from './assets/img/recs/melissa.jpg'
import AndyImg from './assets/img/recs/andy.jpg'
import ThoImg from './assets/img/recs/tho.jpg'

export const workCardData = [
    // Fringe Marketplace
    {
        body: (
            <>
                I led front-end architecture and established design system
                standards for a mid- to late-stage startup. I architected a
                comprehensive component library, reducing development time by
                ~40%, while spearheading platform-wide accessibility
                improvements, achieving ADA level AA compliance. 92% unit
                testing coverage was maintained via Jest, React Testing Library,
                and Vitest. Deployed via Github CI/CD and Netlify.
                <br />
                <br />
                I led the engineering effort to ensure parity between Figma
                designs and our component library in Storybook, designed and
                implemented a theming system, and introduced application-wide
                animations using Framer Motion for React. Performance
                improvements included enhancing core web vitals, improving
                Lighthouse scores by 35%, and reducing bundle size by
                approximately 20%.
                <br />
                <br />I successfully managed migrations from JavaScript to
                TypeScript, Create React App to Vite, and React 16 through
                versions 17 and 18.
            </>
        ),
        color: 'blue' as const,
        headline: 'Fringe Marketplace',
        img: FringeMarketplaceImg,
        imgAltText: 'Screenshots of Fringe Marketplace.',
        logos: [
            <img
                src={ReactSVG}
                alt="React logo"
                key="react"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={ViteSVG}
                alt="Vite logo"
                key="vite"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={FramerMotionSVG}
                alt="Framer Motion logo"
                key="framer"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="tsx"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={StyledComponentsSVG}
                alt="Styled Components logo"
                key="styled"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={StorybookSVG}
                alt="Storybook logo"
                key="storybook"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <GithubSVG
                key="github"
                className="h-6 w-auto"
            />,
            <img
                src={NetlifySVG}
                alt="Netlify logo"
                key="netlify"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
    },
    // PROPERTY SEARCH
    {
        body: (
            <>
                I designed and built a Zillow and Redfin replacement tool for
                prospective Real Estate clients to find homes, view photos, and
                schedule tours. Upon implementation, tour leads increased by
                over 200% for the business.
                <br />
                <br />
                Designed in Figma, written in React with Bootstrap and
                Typescript, then deployed via Azure CI/CD and Kubernetes
                clusters. ADA level AA compliant design.
            </>
        ),
        button: {
            className: 'text-decoration-none',
            href: 'https://capcenter.com/homes/',
            text: 'View live site',
        },
        color: 'nickel' as const,
        headline: 'Real Estate Property Search',
        img: HomeSearchImg,
        imgAltText:
            'Screenshots of lead-gen tool for prospective Real Estate clients.',
        logos: [
            <img
                src={ReactSVG}
                alt="React logo"
                key="react"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={BootstrapSVG}
                alt="Bootstrap logo"
                key="bootstrap"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="tsx"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={StorybookSVG}
                alt="Storybook logo"
                key="storybook"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={AzureSVG}
                alt="Azure logo"
                key="azure"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={KubernetesSVG}
                alt="Kubernetes logo"
                key="k8s"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
    },
    // SJC MATCHING ENGINE
    {
        rightAlign: true,
        bannerContent: (
            <>
                <i className="fas fa-award mb-2 text-center text-2xl text-yellow-500 filter-[drop-shadow(0_0_10px_rgba(255,215,0,0.5))] md:mb-4 md:text-3xl xl:text-5xl" />
                <p className="mb-4 text-center text-xs leading-[1.25] md:text-base xl:text-lg">
                    State of California Innovation Award
                </p>
            </>
        ),
        body: (
            <>
                I designed and built a tool for social workers in California to
                match foster parents with children ready for adoption based on
                numerous weighted criteria. Won the 2017 Innovation Award from
                California County Information Services Directors Association
                (CCISDA).
                <br />
                <br />
                Designed in Adobe XD, written in Angular with Material Design
                and Javascript (which we migrated to Typescript), then deployed
                on Google Cloud Platform and Google App Engine with Gitlab
                CI/CD. Section 508 compliant design.
            </>
        ),
        button: {
            className: 'text-decoration-none',
            href: 'https://www.youtube.com/watch?v=V3bQb4yMH3k',
            text: 'Watch video by Google',
        },
        color: 'rose' as const,
        headline: 'Weighted-Algorithm Matching Engine',
        img: SjcImg,
        imgAltText: 'Screenshots of weighted Matching Engine.',
        logos: [
            <img
                src={AdobeSVG}
                alt="Adobe logo"
                key="adobe"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={AngularSVG}
                alt="Angular logo"
                key="angular"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={MaterialSVG}
                alt="Material logo"
                key="material"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={JavascriptSVG}
                alt="Javascript logo"
                key="js"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="tsx"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={GcpSVG}
                alt="GCP logo"
                key="gcp"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={GitlabSVG}
                alt="Gitlab logo"
                key="gitlab"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
    },
    // LOAN APP
    {
        altImage: (
            <div className="alt-image__wrapper">
                <img
                    src={LoanAppImg}
                    alt="Loan application"
                    aria-label="Screenshots of Mortgage loan and refinance application."
                    width={1200}
                    height={900}
                    loading="lazy"
                />
            </div>
        ),
        body: (
            <>
                I redesigned the business's primary revenue source - the Loan
                Application. Grew loan volume 500% to $1.2B and grew NPS 2+
                points. This design is still actively facilitating loan
                applications today.
                <br />
                <br />
                Designed in Figma and Sketch, written in React with Bootstrap
                and Typescript with Storybook for documentation, then deployed
                via Azure CI/CD.
            </>
        ),
        className: 'xl:items-stretch py-0',
        color: 'yellow' as const,
        headline: 'Fintech Mortgage Loan Application',
        imgAltText: 'Screenshots of Mortgage loan and refinance application.',
        imgWrapperClass: 'w-auto h-full',
        logos: [
            <img
                src={ReactSVG}
                alt="React logo"
                key="react"
                className="h-6 w-auto"
            />,
            <img
                src={BootstrapSVG}
                alt="Bootstrap logo"
                key="bootstrap"
                className="h-6 w-auto"
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="typescript"
                className="h-6 w-auto"
            />,
            <img
                src={StorybookSVG}
                alt="Storybook logo"
                key="storybook"
                className="h-6 w-auto"
            />,
            <img
                src={AzureSVG}
                alt="Azure logo"
                key="azure"
                className="h-6 w-auto"
            />,
            <img
                src={KubernetesSVG}
                alt="Kubernetes logo"
                key="k8s"
                className="h-6 w-auto"
            />,
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
            />,
            <img
                src={SketchSVG}
                alt="Sketch logo"
                key="sketch"
                className="h-6 w-auto"
            />,
        ],
        textWrapperClass: 'xl:pt-14 pb-12',
    },
    // NBA TOPSHOT
    {
        rightAlign: true,
        body: (
            <>
                I was a technical marketing consultant with Dapper Labs for the
                NBA Top Shot crypto/NFT project. Worked with the data
                engineering team to sync data between their DBs and various
                marketing automation tools, like customer.io and HubSpot.
                <br />
                <br />
                Implemented data normalization for personalizing emails at scale
                for 2M+ users. Grew and improved platform onboarding through
                creative campaigns and A/B testing. Built internal communication
                tools with Slack API and Google Apps Script.
            </>
        ),
        color: 'purple' as const,
        headline: (
            <span className="flex items-baseline gap-2 leading-normal xl:flex-wrap xl:leading-tight">
                <p>NBA Top Shot</p>{' '}
                <p className="text-lg whitespace-nowrap">with Dapper</p>
            </span>
        ),
        img: TopshotImg,
        imgAltText: 'Screenshots of NBA Top Shot.',
        logos: [
            <img
                src={CustomerIoImg}
                alt="customer.io logo"
                key="customerIo"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={HubspotSVG}
                alt="Hubspot logo"
                key="hubspot"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={AppsScriptSVG}
                alt="Google Apps Script logo"
                key="appsScript"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={SlackSVG}
                alt="Slack logo"
                key="slack"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
    },
    // COMPONENT LIBRARY
    {
        altImage: (
            <div className="alt-image__wrapper">
                <img
                    src={ComponentLibraryImg}
                    alt="Component library"
                    aria-label="Screenshots of component library."
                    width={1200}
                    height={900}
                    loading="lazy"
                />
            </div>
        ),
        body: (
            <>
                I designed and built a UI component library that utilizes a
                custom Storybook implementation for component documentation and
                testing. Components are designed in Figma, built in React using
                Typescript and Tailwind, then published as a public NPM package
                for distribution, and released to Github.
                <br />
                <br />
                I've built similar (but larger) component libraries to this one,
                which are currently in use distributing proprietary design
                systems across various ecosystems, including websites, apps, and
                digital tools.
            </>
        ),
        button: {
            className: 'no-underline',
            href: 'https://github.com/DG-Product-Design/component-library',
            text: 'View project on Github',
        },
        className: 'xl:items-stretch py-0',
        color: 'blue' as const,
        headline: (
            <>
                <span className="lh-0">UI Component Library</span>
                <br />
                <span className="text-xl">
                    React + Tailwind + Storybook + NPM
                </span>
            </>
        ),
        imgAltText: 'Screenshots of UI component library.',
        imgWrapperClass: 'w-auto h-full',
        logos: [
            <img
                src={ReactSVG}
                alt="React logo"
                key="react"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={TailwindSVG}
                alt="Tailwind logo"
                key="tw"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="typescript"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={StorybookSVG}
                alt="Storybook logo"
                key="storybook"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={NpmSVG}
                alt="NPM logo"
                key="npm"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <GithubSVG
                key="github"
                className="h-6 w-auto"
            />,
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
        secondaryButton: {
            className: 'no-underline',
            href: 'https://www.npmjs.com/package/@j33p1n/component-library',
            text: 'View NPM package',
        },
        textWrapperClass: 'xl:pt-14 pb-12',
    },
    // ASSIGNER APP
    {
        rightAlign: true,
        altImage: (
            <ComboImg
                img1={LcaMobile}
                img1AltText="Mobile screenshot of fintech internal client assigner management tool."
                img2={LcaDesktop}
                img2AltText="Desktop screenshot of fintech internal client assigner management tool."
            />
        ),
        body: (
            <>
                I designed an internal management tool to automatically match
                clients with consultants based on geolocation, skills and
                qualifications, and availability. Upon implementation, each
                manager in the program successfully saved over 30 min per day,
                or 125 hours per year.
                <br />
                <br />
                Designed in Figma, written in React with Bootstrap and
                Typescript, then deployed via Azure CI/CD.
            </>
        ),
        color: 'rose' as const,
        headline: 'Client Assigner Management Tool',
        imgAltText: 'Screenshots of client assigner management tool.',
        logos: [
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
            />,
            <img
                src={ReactSVG}
                alt="React logo"
                key="react"
                className="h-6 w-auto"
            />,
            <img
                src={BootstrapSVG}
                alt="Bootstrap logo"
                key="bootstrap"
                className="h-6 w-auto"
            />,
            <img
                src={TypescriptSVG}
                alt="Typescript logo"
                key="typescript"
                className="h-6 w-auto"
            />,
            <img
                src={AzureSVG}
                alt="Azure logo"
                key="azure"
                className="h-6 w-auto"
            />,
        ],
    },
    // UX/UI DESIGN
    {
        body: (
            <>
                <p className="mb-4">
                    From style guides and wireframes to production-ready
                    designs, I have years of experience both building
                    proprietary design systems and working within pre-existing
                    design systems. My product designs are typically initiated
                    in Figma or Sketch and iterated upon until they're ready for
                    interactive feedback (big believer in naming layers!).
                </p>
                <p>
                    Depending on the client needs, the prototyping is then done
                    within Figma/Sketch or on the web with HTML, CSS, and
                    minimal Javascript.
                </p>
            </>
        ),
        color: 'yellow' as const,
        headline: (
            <>
                <span className="lh-0">UX &amp; UI Design</span>
                <br />
                <span className="text-xl">Figma / Sketch / XD</span>
            </>
        ),
        img: UxUiImg,
        imgAltText: 'Screenshots of design work in Figma and Sketch.',
        logos: [
            <img
                src={FigmaSVG}
                alt="Figma logo"
                key="figma"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={SketchSVG}
                alt="Sketch logo"
                key="sketch"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
            <img
                src={AdobeSVG}
                alt="Adobe logo"
                key="adobe"
                className="h-6 w-auto"
                width={24}
                height={24}
            />,
        ],
    },
]

export const quoteData = [
    {
        img: ErinImg,
        name: 'Erin',
        quote: "David is so passionate and knowledgeable about UI/UX, and he brings so much fun energy to a team! Working with him was a joy - he's collaborative, communicative, and always has insightful contributions to any conversation. He works quickly, efficiently, and with great attention to detail - he's a huge asset to any team!",
    },
    {
        img: MelissaImg,
        name: 'Melissa',
        quote: 'David is such an incredible engineer. His design talent is second to none and due to his skills, experience, humor and kindness, he is the absolute best kind of coworker. While we were on the same team I was grateful every day for getting to work with him because his skillset was so complimentary to mine; I learned so much from him. I highly, highly recommend working with David to any company that is lucky enough to garner his interest.',
    },
    {
        img: ThoImg,
        name: 'Tho',
        quote: "I had the pleasure of working with David when I was the tech lead and he one of the team's React developers. Anytime I had a question on how to do anything, David was there and always glad to help. He's sharp, reliable, and has a great instinct for building clean, user friendly interfaces. What stood out most was how effortlessly he tackled complex problems and always found a way to keep things moving forward, even under pressure. He was also a great team player, easy to work with, always willing to help, and someone you could count on. Any team would be lucky to have him!",
    },
    {
        img: AndyImg,
        name: 'Andy',
        quote: 'David has long been a strategic go-to for me. When I feel I am slipping a little from "the edge", David is on a very short list of people who I will buy a lunch to get me back to the front of that line. David has great energy, a strong network of young entrepreneurs and professionals, and can envision plans for ideas to fresh, state of the culture, outcomes. He has accomplished a great deal in his early career, I am looking forward to see what he accomplishes over the next couple of decades.',
    },
]

export const manifestoData = [
    {
        img: GlobeImg,
        imgAlt: 'Globe',
        title: 'Think big (picture)',
        body: (
            <>
                Design sustainably and for extensibility. Creating design
                systems and standardizing them across the design and development
                environments makes it possible to maintain{' '}
                <span className="whitespace-nowrap">
                    &quot;pixel-perfect&quot;
                </span>{' '}
                consistency and ensures an easy handoff from design to dev.
            </>
        ),
    },
    {
        img: TrophyImg,
        imgAlt: 'Trophy',
        title: 'Learn from the masters',
        body: 'Benchmarking against the industry is foundational to establishing a realistic product goal and for understanding where we currently are. Find out why the top players are successful and compare against our own strategy. Then fill in the gaps with our own style and story.',
    },
    {
        img: ShapesImg,
        imgAlt: '3D simple shapes',
        title: 'Simple is sophisticated',
        body: (
            <>
                <em>
                    "I apologize for the length of this letter, for I lacked the
                    time to make it shorter."
                </em>{' '}
                Truly one of my favorite quotes. The simplification process is
                often more difficult than maintaining complexity. But it's worth
                it - our users, clients, and teammates will thank us.
            </>
        ),
    },
    {
        img: StudentImg,
        imgAlt: 'Student reading book',
        title: 'Be a student of everything',
        body: 'Every day is an opportunity to learn from the world around us. Studying behavioral trends, technological changes, and industry leaders helps sustain a steady flow of inspiration. Always consider that the best products feel natural, which requires design to be cognizant of elements and experiences outside of digital devices.',
    },
    {
        img: ChartImg,
        imgAlt: '3D pie chart',
        title: 'Do your (market) research',
        body: "Successful products solve a problem or provide an experience effectively and efficiently - for the user and the business. Start by understanding our (or our client's) business model then seek to understand its users. This ensures that products aren't simply beautiful, but are usable and profitable at the core.",
    },
    {
        img: PencilRideImg,
        imgAlt: '3D woman riding pencil',
        title: 'Trust more than yourself',
        body: "Own our work, but be open to feedback. And for the sake of our own mental health, don't take it personally. I'm continually humbled by user behavior - expect the unexpected. Trust the user-testing process and remember, going alone might be fast, but going together is what lasts.",
    },
]
