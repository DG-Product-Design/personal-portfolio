import SiteNav from '../components/SiteNav'
import projects from '../content/projects.json'
import criticalImages from '../content/critical-images.json'

export default function HomePage() {
    const [featured, ...secondary] = projects
    const projectLink =
        'block min-h-11 border-b border-solid border-[#e8ded5] pb-2.75 font-extrabold leading-[1.04] tracking-[-.042em] no-underline hover:border-current'

    return (
        <div className="relative isolate grid min-h-svh grid-rows-[auto_1fr] px-[clamp(1.375rem,3.7vw,4.25rem)] pb-[clamp(1.5625rem,4vh,3.75rem)] before:absolute before:inset-0 before:-z-1 before:bg-cover-shade compact:pb-[clamp(14.375rem,44svh,25rem)] compact:before:bg-cover-shade-mobile">
            <img
                className="absolute inset-0 -z-2 size-full object-cover compact:top-auto compact:h-[55svh] compact:object-[68%_bottom]"
                {...criticalImages.home}
                alt=""
                fetchPriority="high"
            />
            <SiteNav cover />
            <main
                className="flex w-[min(48%,45.625rem)] flex-col justify-end gap-[clamp(1.1875rem,4.3vh,3.6875rem)] pt-[clamp(0rem,2vh,1.375rem)] compact:w-full compact:justify-center compact:gap-7.5 compact:pt-6"
                id="main"
            >
                <div className="-mt-12">
                    <h1 className="mt-0 mb-6 text-[clamp(3rem,min(11.3vw,18svh),11.375rem)] leading-[.82] font-extrabold tracking-[-.085em] whitespace-nowrap text-[#938cff] motion-safe:headline-shimmer motion-safe:pb-[.24em] compact:text-[clamp(3.375rem,15vw,6.625rem)]">
                        David A.
                        <br />
                        George
                    </h1>
                    <p className="m-0 -mt-4 text-[clamp(1.25rem,2vw,1.875rem)] leading-cover-subtitle tracking-[-.045em]">
                        Software engineer, product &amp; UX
                    </p>
                </div>
                <nav
                    id="work"
                    className="mt-8 grid gap-[clamp(0.625rem,2.3vh,1.5rem)]"
                    aria-label="Selected case studies"
                >
                    <a
                        className={`${projectLink} text-[clamp(1.625rem,4.7vw,4.25rem)] compact:text-[clamp(1.625rem,7vw,2.75rem)]`}
                        href={`/work/${featured.slug}/`}
                    >
                        {featured.name} / Clarvos
                    </a>
                    <div className="grid grid-cols-[1fr_.8fr] items-end gap-x-[clamp(0.875rem,3vw,3rem)] gap-y-[clamp(0.5625rem,1.8vh,1.125rem)]">
                        {secondary.map(({ slug, name }) => (
                            <a
                                key={slug}
                                className={`${projectLink} text-[clamp(0.875rem,1.9vw,1.8125rem)] compact:text-[clamp(1rem,4vw,1.5625rem)]`}
                                href={`/work/${slug}/`}
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </nav>
            </main>
        </div>
    )
}
