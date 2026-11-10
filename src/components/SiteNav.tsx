export default function SiteNav({ cover = false }: { cover?: boolean }) {
    const linkClass = 'inline-flex min-h-11 items-center no-underline'

    return (
        <>
            <a
                className="absolute top-3 left-4 z-5 translate-y-[-160%] bg-[#242226] p-3 focus:translate-y-0"
                href="#main"
            >
                Skip to main content
            </a>
            <header
                className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 ${cover ? 'text-[clamp(0.9375rem,1.8vw,1.5rem)]' : 'border-b border-solid border-rule'}`}
            >
                {!cover && (
                    <a
                        className={`${linkClass} font-extrabold`}
                        href="/"
                    >
                        David A. George
                    </a>
                )}
                <nav
                    className={`ml-auto flex gap-[clamp(1.125rem,3.7vw,3.5rem)] font-bold ${cover ? 'compact:ml-0' : ''}`}
                    aria-label="Main navigation"
                >
                    <a
                        className={linkClass}
                        href={cover ? '#work' : '/#work'}
                    >
                        Work
                    </a>
                    <a
                        className={linkClass}
                        href="/about/"
                    >
                        About
                    </a>
                    <a
                        className={linkClass}
                        href="mailto:dav.a.george@gmail.com"
                    >
                        Contact
                    </a>
                </nav>
            </header>
        </>
    )
}
