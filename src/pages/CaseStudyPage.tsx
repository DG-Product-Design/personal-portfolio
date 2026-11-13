import { ArrowLeft, Award, ExternalLink } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import CaseVisual, { ProjectScreenshot } from '../components/CaseVisual'
import ProjectTechnologies from '../components/ProjectTechnologies'
import projects from '../content/projects.json'

type LiveWork = {
    label: string
    note: string | null
    url: string
}

type DesignSystemContributionData = {
    paragraphs: string[]
    bullets: string[]
}

function BackToWork() {
    return (
        <a
            className="inline-flex min-h-11 items-center gap-2 text-violet underline underline-offset-4"
            href="/#work"
        >
            <ArrowLeft
                aria-hidden="true"
                className="size-4"
            />
            Back to selected work
        </a>
    )
}

export default function CaseStudyPage({
    project,
    next,
}: {
    project: (typeof projects)[number]
    next: (typeof projects)[number]
}) {
    const liveWork = project.liveWork as LiveWork | null
    const designSystemContribution =
        project.designSystemContribution as DesignSystemContributionData | null

    return (
        <div className="mx-auto max-w-310 px-page-gutter pb-12.5">
            <SiteNav />
            <main id="main">
                <header className="pt-4 pb-7">
                    <BackToWork />
                    <p className="font-medium text-muted">{project.name}</p>
                    <h1 className="mt-3 mb-5 text-case-title text-balance text-violet">
                        {project.title}
                    </h1>
                    <div className="grid grid-cols-[minmax(0,1fr)_clamp(11rem,22%,15rem)] items-start gap-x-8 gap-y-5 compact:grid-cols-1">
                        <div className="min-w-0">
                            <p className="m-0 max-w-prose text-case-lede leading-snug text-muted">
                                {project.intro}
                            </p>
                            <dl className="mt-6 mb-0 flex flex-wrap gap-x-9 gap-y-4.5 border-y border-solid border-rule py-4.5">
                                {project.facts.map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className={
                                            label === 'Scope'
                                                ? 'basis-full border-t border-solid border-rule pt-4'
                                                : undefined
                                        }
                                    >
                                        <dt className="text-sm text-muted">
                                            {label}
                                        </dt>
                                        <dd
                                            className={`mx-0 mt-1 mb-0 ${label === 'Scope' ? 'max-w-4xl leading-snug text-muted' : ''}`}
                                        >
                                            {label === 'Recognition' ? (
                                                <span className="inline-flex items-center gap-2 rounded-full border border-solid border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-sm font-semibold text-amber-200">
                                                    <Award
                                                        aria-hidden="true"
                                                        className="size-5 shrink-0"
                                                    />
                                                    {value}
                                                </span>
                                            ) : (
                                                value
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            {liveWork && (
                                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-1">
                                    <a
                                        className="inline-flex min-h-11 items-center gap-2 font-semibold text-violet"
                                        href={liveWork.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {liveWork.label}
                                        <span className="sr-only">
                                            {' '}
                                            (opens in a new tab)
                                        </span>
                                        <ExternalLink
                                            aria-hidden="true"
                                            className="size-4"
                                        />
                                    </a>
                                    {liveWork.note && (
                                        <div className="m-0 ml-auto flex max-w-128 min-w-68 flex-1 items-center gap-1">
                                            <span className="text-5xl">[</span>
                                            <p className="text-sm leading-snug text-muted">
                                                {liveWork.note}
                                            </p>
                                            <span className="text-5xl">]</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <ProjectScreenshot slug={project.slug} />
                        </div>
                        <ProjectTechnologies slug={project.slug} />
                    </div>
                </header>
                <div className="mt-10 mb-20 flex flex-col gap-10">
                    {project.keyDecisions?.length > 0 && (
                        <HighlightBox
                            slug={project.slug}
                            title="Key decisions"
                            items={project.keyDecisions}
                        />
                    )}
                    {project.keyTakeaways?.length > 0 && (
                        <HighlightBox
                            slug={project.slug}
                            title="Key takeaways"
                            items={project.keyTakeaways}
                        />
                    )}
                    {designSystemContribution && (
                        <DesignSystemContribution
                            slug={project.slug}
                            paragraphs={designSystemContribution.paragraphs}
                            bullets={designSystemContribution.bullets}
                        />
                    )}
                </div>
                <CaseVisual
                    slug={project.slug}
                    steps={project.steps}
                />
                <article className="my-10 grid grid-cols-2 gap-x-10.5 gap-y-6 compact:grid-cols-1">
                    {project.sections.map(({ title, body }) => (
                        <section key={title}>
                            <h2 className="mt-0 mb-2 text-[clamp(1.4375rem,3vw,2.125rem)] leading-tight tracking-[-.04em]">
                                {title}
                            </h2>
                            <p className="m-0 leading-snug text-muted">
                                {body}
                            </p>
                        </section>
                    ))}
                </article>
                {project.slug === 'san-joaquin-matching-engine' && (
                    <section
                        aria-labelledby="matching-engine-video"
                        className="mb-10 max-w-3xl pt-10"
                    >
                        <h2
                            id="matching-engine-video"
                            className="mt-0 mb-3 text-2xl tracking-tight text-violet"
                        >
                            See what others say about the Matching Engine
                        </h2>
                        <iframe
                            className="block aspect-video w-full rounded-lg bg-black"
                            src="https://www.youtube.com/embed/KXZbU77iWpY?start=63&playsinline=1&origin=https%3A%2F%2Fdavidageorge.me"
                            title="San Joaquin Matching Engine video"
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                        <a
                            className="mt-3 inline-block text-sm text-violet"
                            href="https://www.youtube.com/watch?v=KXZbU77iWpY&t=63s"
                        >
                            Watch on YouTube
                        </a>
                    </section>
                )}
                <nav
                    className="flex flex-wrap items-center justify-between gap-4 border-t border-solid border-rule pt-5.5"
                    aria-label="Case study navigation"
                >
                    <BackToWork />
                    <a href={`/work/${next.slug}/`}>Next: {next.name}</a>
                </nav>
            </main>
        </div>
    )
}

const HighlightBox = ({
    slug,
    title,
    items,
}: {
    slug: string
    title: string
    items: string[]
}) => (
    <section
        aria-labelledby={`${slug}-key-decisions`}
        className="rounded-xl border border-solid border-rule bg-white/3 px-6 py-5 compact:px-5"
    >
        <h2
            id={`${slug}-key-decisions`}
            className="mt-0 mb-6 text-[clamp(1.4375rem,3vw,2.125rem)] leading-tight tracking-[-.04em]"
        >
            {title}
        </h2>
        <ol className="m-0 list-none p-0 text-muted">
            {items.map((item, index) => (
                <li
                    key={item}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 border-t border-solid border-rule/70 py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                    <span
                        aria-hidden="true"
                        className="font-semibold text-violet"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="max-w-4xl leading-snug">{item}</span>
                </li>
            ))}
        </ol>
    </section>
)

const DesignSystemContribution = ({
    slug,
    paragraphs,
    bullets,
}: {
    slug: string
    paragraphs: string[]
    bullets: string[]
}) => (
    <section
        aria-labelledby={`${slug}-design-system-contribution`}
        className="grid gap-6 border-y border-solid border-rule py-6 md:grid-cols-[minmax(13rem,.55fr)_minmax(0,1.45fr)]"
    >
        <h2
            id={`${slug}-design-system-contribution`}
            className="m-0 text-[clamp(1.4375rem,3vw,2.125rem)] leading-tight tracking-[-.04em]"
        >
            Design system contribution
        </h2>
        <div>
            {paragraphs.map((paragraph) => (
                <p
                    key={paragraph}
                    className="mt-0 mb-4 max-w-3xl leading-snug text-muted last:mb-0"
                >
                    {paragraph}
                </p>
            ))}
            {bullets.length > 0 && (
                <ul className="m-0 grid gap-3 pl-5 text-muted">
                    {bullets.map((item) => (
                        <li
                            key={item}
                            className="max-w-3xl pl-1 leading-snug marker:text-violet"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </section>
)
