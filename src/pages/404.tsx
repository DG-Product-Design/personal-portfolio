import { ArrowLeft } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import Headshot from '../components/Headshot'

export default function Error404Page() {
    return (
        <div className="relative isolate">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 -z-1 hidden w-1/2 mask-l-from-55% mask-l-to-100% bg-cover bg-right opacity-20 md:block md:bg-[url('/img/portfolio/midnight-800.webp')]"
            />
            <div className="mx-auto flex min-h-svh max-w-310 flex-col px-page-gutter">
                <SiteNav />
                <main
                    id="main"
                    className="mx-auto grid w-full max-w-3xl flex-1 grid-cols-1 place-content-center place-items-center gap-10 py-12 text-center md:grid-cols-2 md:gap-16"
                >
                    <div>
                        <h1 className="m-0 text-6xl leading-none font-extrabold tracking-tighter text-violet md:text-8xl">
                            404
                            <span className="mt-3 block text-3xl tracking-tight text-ink md:text-5xl">
                                Page not found.
                            </span>
                        </h1>
                        <p className="mt-5 mb-6 max-w-prose text-muted">
                            Bad page. Sick glasses.
                        </p>
                        <a
                            href="/#work"
                            className="inline-flex min-h-11 items-center gap-2 font-semibold"
                        >
                            <ArrowLeft
                                aria-hidden="true"
                                className="size-4"
                            />
                            Back to selected work
                        </a>
                    </div>
                    <Headshot>
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 270 270"
                            shapeRendering="crispEdges"
                            className="pointer-events-none absolute inset-0 size-full"
                        >
                            <g className="motion-safe:animate-sunglasses-drop">
                                <path
                                    fill="#121212"
                                    d="M85 98H202V102H192V113H188V117H184V121H156V117H152V113H148V106H142V113H138V117H134V121H106V117H102V113H98V103H85Z"
                                />
                                <path
                                    fill="#f7f2eb"
                                    d="M108 104h4v4h-4z M112 108h4v4h-4z M116 112h4v4h-4z M158 104h4v4h-4z M162 108h4v4h-4z M166 112h4v4h-4z"
                                />
                            </g>
                        </svg>
                    </Headshot>
                </main>
            </div>
        </div>
    )
}
