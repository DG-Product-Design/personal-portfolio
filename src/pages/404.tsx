import SiteNav from '../components/SiteNav'

export default function Error404Page() {
    return (
        <div className="mx-auto max-w-310 px-page-gutter pb-12.5">
            <SiteNav />
            <main
                id="main"
                className="max-w-prose pt-[clamp(1.875rem,6vw,4.375rem)] pb-7"
            >
                <h1 className="mt-3 mb-5 text-case-title text-balance text-violet">
                    Page not found
                </h1>
                <p className="text-muted">
                    <a href="/">Return to the portfolio</a>
                </p>
            </main>
        </div>
    )
}
