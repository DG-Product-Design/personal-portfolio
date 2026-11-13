import { ChevronDown } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import projects from '../content/projects.json'
import criticalImages from '../content/critical-images.json'

export default function HomePage() {
    const [featured, ...secondary] = projects
    const projectLink =
        'block min-h-11 border-b border-solid border-[#e8ded5] pb-2.75 font-extrabold leading-[1.04] tracking-[-.042em] no-underline hover:border-current'

    return (
        <>
            <div className="relative isolate grid min-h-svh grid-rows-[auto_1fr] px-[clamp(1.375rem,3.7vw,4.25rem)] pb-[clamp(5rem,8vh,6.5rem)] before:absolute before:inset-0 before:-z-1 before:bg-cover-shade compact:pb-20 compact:before:bg-cover-shade-mobile cover-medium:before:bg-cover-shade-medium">
                <img
                    className="absolute inset-0 -z-2 size-full object-cover compact:top-auto compact:h-[40svh] compact:object-[68%_bottom]"
                    {...criticalImages.home}
                    alt=""
                    fetchPriority="high"
                />
                <SiteNav cover />
                <main
                    className="flex w-cover-content flex-col justify-end gap-[clamp(1.1875rem,4.3vh,3.6875rem)] pt-[clamp(0rem,2vh,1.375rem)] compact:w-full compact:justify-start compact:gap-7.5 compact:pt-6"
                    id="main"
                >
                    <div className="-mt-12 compact:mt-0">
                        <h1 className="mt-0 mb-6 text-[clamp(3rem,min(11.3vw,18svh),11.375rem)] leading-[.82] font-extrabold tracking-[-.085em] whitespace-nowrap text-[#938cff] motion-safe:headline-shimmer motion-safe:pb-[.24em] compact:text-[clamp(3.375rem,15vw,6.625rem)]">
                            David A.
                            <br />
                            George
                        </h1>
                        <p className="m-0 -mt-6 text-[clamp(1.25rem,2vw,1.875rem)] leading-cover-subtitle tracking-[-.045em]">
                            Senior Product Engineer
                        </p>
                        <p className="m-0 mt-1 text-[clamp(1rem,1.5vw,1.625rem)] tracking-[-.045em]">
                            From user insight to production systems.
                        </p>
                    </div>
                    <nav
                        id="work"
                        className="mt-8 grid gap-[clamp(0.625rem,2.3vh,1.5rem)] compact:mt-4"
                        aria-label="Selected case studies"
                    >
                        <a
                            className={`${projectLink} text-[clamp(1.625rem,4.7vw,4.25rem)] compact:text-[clamp(1.625rem,7vw,2.75rem)]`}
                            href={`/work/${featured.slug}/`}
                        >
                            <span className="block">
                                {featured.name} / DSP / Adtech
                            </span>
                            <span className="mt-2 block text-[clamp(.75rem,1.1vw,1rem)] font-medium tracking-normal text-muted">
                                Focus: {featured.focus}
                            </span>
                        </a>
                        <div className="grid grid-cols-[1fr_.8fr] items-end gap-x-[clamp(0.875rem,3vw,3rem)] gap-y-[clamp(0.5625rem,1.8vh,1.125rem)]">
                            {secondary.map(({ slug, name, focus }) => (
                                <a
                                    key={slug}
                                    className={`${projectLink} text-[clamp(1rem,1.9vw,1.8125rem)] compact:text-[clamp(1rem,4vw,1.5625rem)]`}
                                    href={`/work/${slug}/`}
                                >
                                    <span className="block">{name}</span>
                                    <span className="mt-1.5 block text-[clamp(.6875rem,.95vw,.875rem)] leading-snug font-medium tracking-normal text-muted">
                                        Focus: {focus}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </nav>
                </main>
                <a
                    className="absolute bottom-3 left-1/2 z-2 inline-flex min-h-11 -translate-x-1/2 items-center text-sm font-semibold text-ink/75 no-underline hover:text-violet"
                    href="#capabilities"
                    aria-label="More: design systems and component libraries"
                >
                    <span className="flex flex-col items-center motion-safe:animate-more-float motion-safe:will-change-transform">
                        [ More ]
                        <ChevronDown
                            aria-hidden="true"
                            className="mt-0.5 size-5"
                        />
                    </span>
                </a>
            </div>
            <section
                id="capabilities"
                aria-labelledby="design-systems-capability"
                className="mx-auto grid max-w-310 gap-8 px-page-gutter py-[clamp(3.75rem,9vw,7.5rem)] md:grid-cols-[minmax(15rem,.7fr)_minmax(0,1.3fr)]"
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
                        I build reusable UI systems that make both products and
                        engineering teams faster: design tokens, theming,
                        accessible components, interaction patterns, Storybook
                        documentation, and production-ready component APIs.
                    </p>
                    <dl className="mt-7 mb-0 grid gap-4 text-sm md:grid-cols-2">
                        <div className="border-t border-solid border-rule/70 pt-3">
                            <dt className="font-semibold text-violet">
                                Fringe
                            </dt>
                            <dd className="mt-1 ml-0 text-muted">
                                ~40% faster development, better Figma/production
                                parity.
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
                                Three generations of shared component libraries
                                and a unified design direction across the
                                digital experience.
                            </dd>
                        </div>
                        <div className="border-t border-solid border-rule/70 pt-3">
                            <dt className="font-semibold text-violet">Dito</dt>
                            <dd className="mt-1 ml-0 text-muted">
                                Design systems and component libraries for each
                                project, including the award-winning San Joaquin
                                Matching Engine.
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
        </>
    )
}
