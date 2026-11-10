import { lazy, Suspense } from 'react'

const CreativeUpdateAnimation = lazy(() => import('./CreativeUpdateAnimation'))

export default function CreativeUpdateStatus() {
    return (
        <p
            role="status"
            className="m-0 mt-2 flex items-center gap-0 text-sm text-neutral-600 dark:text-neutral-400"
        >
            <Suspense
                fallback={
                    <span
                        aria-hidden="true"
                        className="size-10 shrink-0 motion-reduce:hidden"
                    />
                }
            >
                <CreativeUpdateAnimation />
            </Suspense>
            <span className="shimmer">Updating your creative…</span>
        </p>
    )
}
