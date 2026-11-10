import Headshot from '../components/Headshot'
import SiteNav from '../components/SiteNav'
import Recommendations from '../components/Recommendations'
import skills from '../content/skills.json'

const chapters = [
    {
        title: 'New User Experience Lead',
        body: 'I started as a New User Experience Lead in 2012, working on onboarding and conversion. The goal: ensure every single free trial user becomes a paying customer. I still start by asking what someone came to do and where they get stuck.',
    },
    {
        title: 'Product design + engineering',
        body: 'At Dito, I designed and built experiences for prominent industry leaders like KFC and Northrop Grumman. At CapCenter I designed and built experiences for buying a home. At Fringe I used interviews, usability tests, and experiments to improve how people found products and checked out.',
    },
    {
        title: 'Product + Engineering leadership',
        body: 'At Clarvos I led projects across design, frontend, backend, and AI/ML, while mentoring frontend engineers as they took on full-stack work. I led tech stack migrations and technical discovery, built tools to help us scale, and created a complete feedback loop for error handling, session replays, and bug tracking.',
    },
]

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-310 px-page-gutter pb-12.5">
            <SiteNav />
            <main
                id="main"
                className="pt-[clamp(2.5rem,7vw,6rem)] pb-7"
            >
                <section
                    aria-labelledby="about-title"
                    className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,.62fr)] md:gap-12"
                >
                    <div>
                        <h1
                            id="about-title"
                            className="m-0 text-[clamp(3.25rem,8.5vw,7.75rem)] leading-[.86] font-extrabold tracking-[-.08em] text-violet motion-safe:headline-shimmer"
                        >
                            I’m David.
                        </h1>
                        <p className="mt-6 mb-0 max-w-[30ch] text-about-lede leading-tight tracking-tight">
                            Senior software engineer working across product, UX,
                            and full-stack development.
                        </p>
                        <p className="mt-4 mb-0 max-w-[48ch] text-muted">
                            I’m happiest when I can understand the user problem,
                            help shape the experience, and build it through to
                            production.
                        </p>
                        <ul className="mt-6 mb-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
                            <li>
                                <a href="/download/David-A-George-Resume.pdf">
                                    View résumé (PDF)
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/DG-Product-Design">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="mailto:dav.a.george@gmail.com">
                                    Get in touch
                                </a>
                            </li>
                        </ul>
                    </div>
                    <Headshot />
                </section>
                <section
                    aria-labelledby="career-path"
                    className="mt-[clamp(3.5rem,9vw,7rem)]"
                >
                    <h2
                        id="career-path"
                        className="m-0 text-section-title leading-tight tracking-tight"
                    >
                        How I got here
                    </h2>
                    <ol className="m-0 mt-5 grid list-none gap-5 p-0 md:grid-cols-3 md:gap-7">
                        {chapters.map(({ title, body }, index) => (
                            <li
                                key={title}
                                className="border-t border-solid border-rule pt-4"
                            >
                                <span
                                    aria-hidden="true"
                                    className="text-sm font-semibold text-violet"
                                >
                                    0{index + 1}
                                </span>
                                <h3 className="my-2 text-xl tracking-tight">
                                    {title}
                                </h3>
                                <p className="m-0 max-w-[55ch] text-muted">
                                    {body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>
                <Recommendations className="mt-24" />
                <section
                    aria-labelledby="skills"
                    className="mt-16"
                >
                    <h2
                        id="skills"
                        className="m-0 text-section-title leading-tight tracking-tight"
                    >
                        Skills
                    </h2>
                    <dl className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
                        {skills.map(({ category, skills }) => (
                            <div
                                key={category}
                                className="border-t border-solid border-rule pt-4"
                            >
                                <dt className="font-semibold">{category}</dt>
                                <dd className="mt-1 ml-0 text-muted">
                                    {skills}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </main>
        </div>
    )
}
