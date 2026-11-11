import { lazy, Suspense, useEffect, useState } from 'react'
import {
    studioLayout,
    studioChatLayout,
    studioArtworkLayout,
    studioCaptionLayout,
    studioCaption,
    studioHint,
} from './creativeStudioLayout'
import PanningImage from './PanningImage'
import mortgage from '../assets/img/case-studies/loan-app-collage--no-bg.webp'
import propertySearch from '../assets/img/case-studies/homesearch-collage.webp'
import topShot from '../assets/img/case-studies/topshot.jpg'
import fringe from '../assets/img/case-studies/fringe-marketplace.png'
import adpThrive from '../assets/img/case-studies/adp-thrive-product.png'
import matchingEngine from '../assets/img/case-studies/sjc-matching-engine.webp'
import lcaDesktop from '../assets/img/case-studies/lca/capabilities-table-wrapper.webp'
import lcaMobile from '../assets/img/case-studies/lca/list-view.webp'

const CreativeStudioDemo = lazy(() => import('./CreativeStudioDemo'))

function CreativeStudioSkeleton({ loading = false }: { loading?: boolean }) {
    return (
        <div
            data-studio-theme="system"
            className={studioLayout}
        >
            <span
                role={loading ? 'status' : undefined}
                className="sr-only"
            >
                {loading
                    ? 'Loading the conversational ad editor…'
                    : 'The conversational ad editor demo requires JavaScript.'}
            </span>
            <div
                aria-hidden="true"
                className="col-span-full h-10.5 w-40 justify-self-end rounded-lg bg-neutral-200 motion-safe:animate-pulse dark:bg-neutral-800"
            />
            <div
                aria-hidden="true"
                className={studioChatLayout + ' flex flex-col'}
            >
                <div className="flex flex-1 flex-col gap-5 p-5 motion-safe:animate-pulse">
                    <div className="h-5 w-3/5 rounded bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-10 w-4/5 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                    <div className="mt-auto h-24 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
                </div>
            </div>
            <div
                aria-hidden="true"
                className={studioArtworkLayout}
            >
                <div className="aspect-[1044/1507] w-full rounded-lg bg-neutral-200 motion-safe:animate-pulse dark:bg-neutral-800" />
            </div>
            <p
                aria-hidden="true"
                className={studioCaptionLayout + ' invisible'}
            >
                {studioCaption} {studioHint}
            </p>
        </div>
    )
}

const screenshots: Partial<
    Record<string, { src: string; alt: string; width: number; height: number }>
> = {
    'adp-thrive': {
        src: adpThrive,
        alt: 'ADP Thrive product page with discounted DoorDash gift cards and a shopping cart',
        width: 1204,
        height: 1262,
    },
    'nba-top-shot': {
        src: topShot,
        alt: 'NBA Top Shot product screens',
        width: 1200,
        height: 894,
    },
    'fringe-discovery': {
        src: fringe,
        alt: 'Screens from the Fringe benefits marketplace',
        width: 1920,
        height: 1320,
    },
    'real-estate-property-search': {
        src: propertySearch,
        alt: 'Screens from CapCenter’s home search and property listings',
        width: 1920,
        height: 1320,
    },
    'san-joaquin-matching-engine': {
        src: matchingEngine,
        alt: 'San Joaquin Matching Engine screens showing ranked family matches and profile details',
        width: 1920,
        height: 1320,
    },
}

export function ProjectScreenshot({ slug }: { slug: string }) {
    if (slug === 'capcenter-lca') {
        return (
            <div className="mt-5 grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] items-end gap-3">
                <img
                    className="h-auto w-full rounded-lg"
                    src={lcaDesktop}
                    alt="Desktop view of consultant qualifications and availability"
                    width={1200}
                    height={999}
                />
                <img
                    className="h-auto w-full rounded-lg"
                    src={lcaMobile}
                    alt="Mobile list of loan consultants and their availability"
                    width={500}
                    height={982}
                />
            </div>
        )
    }

    if (slug === 'mortgage-application') {
        return (
            <div className="mt-5">
                <PanningImage
                    src={mortgage}
                    alt="Screens from the CapCenter loan application"
                    width={1538}
                    height={4003}
                />
            </div>
        )
    }

    const screenshot = screenshots[slug]
    if (!screenshot) return null

    return (
        <img
            {...screenshot}
            className="mt-5 h-auto w-full rounded-lg"
        />
    )
}

type Step = { label?: string; title: string; description: string }

export default function CaseVisual({
    slug,
    steps,
}: {
    slug: string
    steps: Step[]
}) {
    const [canLoadDemo, setCanLoadDemo] = useState(false)

    useEffect(() => setCanLoadDemo(true), [])

    if (slug === 'creative-studio') {
        if (!canLoadDemo) return <CreativeStudioSkeleton />

        return (
            <Suspense fallback={<CreativeStudioSkeleton loading />}>
                <CreativeStudioDemo />
            </Suspense>
        )
    }
    return (
        <div className="grid gap-5.5">
            {steps.length > 0 && (
                <ol className="m-0 grid list-none grid-cols-3 gap-4.5 p-0 compact:grid-cols-1">
                    {steps.map((step) => (
                        <li
                            key={step.title}
                            className="border-t-2 border-solid border-violet py-3.5"
                        >
                            {step.label && (
                                <span className="mb-1.25 block text-sm text-muted">
                                    {step.label}
                                </span>
                            )}
                            <strong className="block">{step.title}</strong>
                            {step.description && (
                                <p className="mt-1.75 mb-0 leading-snug text-muted">
                                    {step.description}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
