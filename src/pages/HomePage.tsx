import { ArrowRight } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import projects from '../content/projects.json'
import criticalImages from '../content/critical-images.json'
import mortgagePreview from '../assets/img/case-studies/loan-app--no-bg.webp'

const workPaths = [
    {
        title: 'Product engineering',
        description: 'Research, design, and delivery.',
        href: '#work',
    },
    {
        title: 'Design systems',
        description: 'Tokens, components, and theming.',
        href: '/design-systems/',
    },
    {
        title: 'Interactions',
        description: 'Try the gifting animation.',
        href: '/work/fringe-gifting/',
    },
]

const selectedWork = [
    {
        slug: 'creative-studio',
        title: 'Creative Studio',
        description: 'Create and revise ads with AI.',
        image: '/img/portfolio/creative-studio-preview-1200.webp',
        srcSet: '/img/portfolio/creative-studio-preview-600.webp 600w, /img/portfolio/creative-studio-preview-1200.webp 1200w',
        width: 1200,
        height: 667,
        imageFit: 'object-contain',
        cta: 'Read the case study',
    },
    {
        slug: 'mortgage-application',
        title: 'Redesigning a $1.2B fintech pipeline',
        description: 'From product design to a shipped loan application.',
        image: mortgagePreview,
        srcSet: undefined,
        width: 1046,
        height: 1132,
        imageFit: 'object-cover',
        cta: 'Read the case study',
    },
    {
        slug: 'fringe-gifting',
        title: 'Gifting interaction',
        description: 'Making digital gifts feel real.',
        image: '/img/portfolio/gifting-preview-900.webp',
        srcSet: '/img/portfolio/gifting-preview-450.webp 450w, /img/portfolio/gifting-preview-900.webp 900w',
        width: 900,
        height: 600,
        imageFit: 'object-cover',
        cta: 'Try the demo',
    },
]

export default function HomePage() {
    const secondary = projects.filter(
        ({ slug }) => !selectedWork.some((work) => work.slug === slug)
    )

    return (
        <>
            <div className="mx-auto max-w-360 px-page-gutter">
                <SiteNav cover />
            </div>
            <main id="main">
                <section
                    className="relative isolate"
                    aria-labelledby="home-title"
                >
                    {/* Keep the original artwork at every viewport size. The
                        CSS mask fades all four edges without editing the asset. */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 -z-1 w-full opacity-60 md:w-[64%] md:opacity-100">
                        <img
                            className="size-full home-hero-artwork object-cover object-right"
                            src={criticalImages.home.src}
                            srcSet={criticalImages.home.srcSet}
                            sizes={criticalImages.home.sizes}
                            alt=""
                            fetchPriority="high"
                        />
                    </div>
                    <div className="mx-auto flex max-w-360 items-center px-page-gutter pt-8 pb-12 md:min-h-108 md:py-14 lg:min-h-116">
                        <div className="md:max-w-[54%]">
                            <h1
                                id="home-title"
                                className="mt-0 mb-6 text-[clamp(3.75rem,8vw,7rem)] leading-[.88] font-extrabold tracking-[-.085em] text-[#938cff]"
                            >
                                David A.
                                <br />
                                George
                            </h1>
                            <p className="m-0 text-[clamp(1.125rem,1.8vw,1.75rem)] leading-tight font-semibold tracking-[-.035em]">
                                Senior Product & Design Engineer
                            </p>
                            <p className="mt-2 mb-0 max-w-112 text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-muted">
                                I design and build products people love, the
                                systems behind them, and the details people
                                interact with.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-360 px-page-gutter">
                    <nav
                        className="grid border-y border-solid border-rule md:grid-cols-3 md:gap-x-10"
                        aria-label="Explore my work"
                    >
                        {workPaths.map(({ title, description, href }) => (
                            <a
                                key={href}
                                href={href}
                                className="group flex min-h-11 items-center justify-between gap-3 border-b border-solid border-rule py-5 no-underline last:border-b-0 md:justify-start md:border-b-0 md:py-9"
                            >
                                <span>
                                    <span className="block text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-bold tracking-[-.035em]">
                                        {title}
                                    </span>
                                    <span className="mt-1.5 block text-sm leading-snug text-muted">
                                        {description}
                                    </span>
                                </span>
                                <ArrowRight
                                    className="size-5 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </a>
                        ))}
                    </nav>
                </div>

                <section
                    id="work"
                    className="mx-auto max-w-360 scroll-mt-8 px-page-gutter pt-14 md:pt-20"
                    aria-labelledby="selected-work-title"
                >
                    <h2
                        id="selected-work-title"
                        className="mt-0 mb-7 text-xl font-semibold tracking-[-.025em]"
                    >
                        Selected work
                    </h2>
                    <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
                        {selectedWork.map((work) => (
                            <a
                                key={work.slug}
                                className={`group grid grid-rows-[auto_auto_auto] no-underline lg:row-span-3 lg:grid-rows-subgrid ${work.slug === 'creative-studio' ? 'gap-4 lg:gap-6' : 'gap-6'}`}
                                href={`/work/${work.slug}/`}
                                aria-labelledby={`${work.slug}-preview-title`}
                            >
                                <div>
                                    <h3
                                        id={`${work.slug}-preview-title`}
                                        className="m-0 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-bold tracking-[-.035em]"
                                    >
                                        {work.title}
                                    </h3>
                                    <p className="mt-2 mb-0 text-base text-muted">
                                        {work.description}
                                    </p>
                                </div>
                                <img
                                    className={`h-auto w-full rounded-xl ${work.imageFit} ${work.slug === 'creative-studio' ? 'aspect-auto lg:aspect-3/2' : 'aspect-3/2'}`}
                                    src={work.image}
                                    srcSet={work.srcSet}
                                    sizes="(max-width: 64rem) 90vw, (max-width: 90rem) 30vw, 27rem"
                                    width={work.width}
                                    height={work.height}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span
                                    className={`inline-flex min-h-11 w-fit items-center gap-3 self-start font-semibold ${work.slug === 'fringe-gifting' ? 'rounded-full bg-violet px-5 py-2.5 text-[#171421] group-hover:bg-[#c5c1ff]' : 'text-violet'}`}
                                >
                                    {work.cta}
                                    <ArrowRight
                                        className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                                        aria-hidden="true"
                                    />
                                </span>
                            </a>
                        ))}
                    </div>

                    <h2 className="mt-16 mb-2 text-xl font-semibold tracking-[-.025em] md:mt-24">
                        More product engineering
                    </h2>
                    <div className="grid gap-x-12 md:grid-cols-2">
                        {secondary.map(({ slug, name, focus }) => (
                            <a
                                key={slug}
                                className="block min-h-11 border-b border-solid border-rule py-6 no-underline hover:border-violet"
                                href={`/work/${slug}/`}
                            >
                                <span className="block text-[clamp(1.375rem,2vw,1.75rem)] leading-tight font-bold tracking-[-.035em]">
                                    {name}
                                </span>
                                <span className="mt-2 block text-sm leading-relaxed text-muted">
                                    {focus}
                                </span>
                            </a>
                        ))}
                    </div>
                </section>
                <section
                    id="capabilities"
                    aria-labelledby="design-systems-capability"
                    className="mx-auto grid max-w-360 gap-8 px-page-gutter py-[clamp(3.75rem,9vw,7.5rem)] md:grid-cols-[minmax(15rem,.7fr)_minmax(0,1.3fr)]"
                >
                    <div>
                        <p className="m-0 text-sm font-semibold text-violet">
                            What I do
                        </p>
                        <h2
                            id="design-systems-capability"
                            className="mt-3 mb-0 text-section-title leading-none tracking-[-.05em]"
                        >
                            Design Systems &amp; Component Libraries
                        </h2>
                    </div>
                    <div className="border-t border-solid border-rule pt-5">
                        <p className="m-0 max-w-3xl text-[clamp(1.125rem,2vw,1.5rem)] leading-snug">
                            I build reusable UI systems that make both products
                            and engineering teams faster: design tokens,
                            theming, accessible components, interaction
                            patterns, Storybook documentation, and
                            production-ready component APIs.
                        </p>
                        <dl className="mt-7 mb-0 grid gap-4 text-sm md:grid-cols-2">
                            <div className="border-t border-solid border-rule/70 pt-3">
                                <dt className="font-semibold text-violet">
                                    Fringe
                                </dt>
                                <dd className="mt-1 ml-0 text-muted">
                                    ~40% faster development, better
                                    Figma/production parity.
                                </dd>
                            </div>
                            <div className="border-t border-solid border-rule/70 pt-3">
                                <dt className="font-semibold text-violet">
                                    Clarvos
                                </dt>
                                <dd className="mt-1 ml-0 text-muted">
                                    Scalable rebrand system + living Storybook
                                    documentation.
                                </dd>
                            </div>
                            <div className="border-t border-solid border-rule/70 pt-3">
                                <dt className="font-semibold text-violet">
                                    CapCenter
                                </dt>
                                <dd className="mt-1 ml-0 text-muted">
                                    Three generations of shared component
                                    libraries and a unified design direction
                                    across the digital experience.
                                </dd>
                            </div>
                            <div className="border-t border-solid border-rule/70 pt-3">
                                <dt className="font-semibold text-violet">
                                    Dito
                                </dt>
                                <dd className="mt-1 ml-0 text-muted">
                                    Design systems and component libraries for
                                    each project, including the award-winning
                                    San Joaquin Matching Engine.
                                </dd>
                            </div>
                        </dl>
                        <a
                            className="mt-7 inline-flex min-h-11 items-center font-semibold text-violet"
                            href="/design-systems/"
                        >
                            See the design-systems work →
                        </a>
                    </div>
                </section>
            </main>
        </>
    )
}
