import { ArrowLeft } from 'lucide-react'
import GiftingExperienceDemo from '../components/GiftingExperienceDemo'
import SiteNav from '../components/SiteNav'

export default function GiftingExperiencePage() {
    return (
        <div className="mx-auto max-w-310 px-page-gutter pb-16">
            <SiteNav />
            <main id="main">
                <header className="pt-[clamp(2rem,6vw,5rem)] pb-8">
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
                    <p className="mt-6 mb-0 font-medium text-muted">
                        Fringe Gifting Experience
                    </p>
                    <h1 className="mt-3 mb-5 max-w-5xl text-case-title text-balance text-violet">
                        Making digital gifts feel like real gifts
                    </h1>
                    <p className="m-0 max-w-3xl text-case-lede leading-snug text-muted">
                        A focused interaction system that turned a routine
                        points transfer into a moment of anticipation,
                        celebration, and reveal.
                    </p>
                    <p className="mt-6 mb-0 border-y border-solid border-rule py-4 text-sm text-muted">
                        <strong className="text-ink">Focus:</strong> Interaction
                        design · Motion design · React · User testing
                    </p>
                </header>

                <GiftingExperienceDemo />

                <article className="my-[clamp(3.5rem,8vw,7rem)] grid gap-x-10 gap-y-9 md:grid-cols-3">
                    <section>
                        <h2 className="mt-0 mb-3 text-2xl tracking-[-.04em]">
                            The challenge
                        </h2>
                        <p className="m-0 text-muted">
                            <span className="font-semibold">
                                First challenge:
                            </span>{' '}
                            To encourage platform growth and stickiness, we
                            needed a way to increase the economy around Fringe
                            points. User research showed that gifting is a way
                            for employees to show appreciation and recognize
                            each other, which increases point exchange without
                            requiring employers to invest in more points.
                            <br />
                            <br />
                            <span className="font-semibold">
                                Second challenge:
                            </span>{' '}
                            Receiving points or a product should feel like
                            receiving a gift, not like another account
                            transaction. The experience needed to attract
                            attention without interrupting the rest of the
                            marketplace, then reward the user for opening it. It
                            also needed to be performant on mobile, which
                            required some creativity.
                        </p>
                    </section>
                    <section>
                        <h2 className="mt-0 mb-3 text-2xl tracking-[-.04em]">
                            The interaction
                        </h2>
                        <p className="m-0 text-muted">
                            A small menu animation and a notification started
                            the flow. The animation should feel more fun and
                            exciting than a simple notification ping. Opening it
                            expanded into a full celebration with confetti. A
                            wrapped gift image appears then tears away to reveal
                            a personal note, building anticipation. The note
                            then flipped to reveal the gift and carry the user
                            into redemption. The animation needed to be
                            performant on mobile, which required some
                            creativity.
                        </p>
                    </section>
                    <section>
                        <h2 className="mt-0 mb-3 text-2xl tracking-[-.04em]">
                            The outcome
                        </h2>
                        <p className="m-0 text-muted">
                            User testing was strongly positive, and gifting
                            became a central driver of how Fringe points moved
                            across the platform, successfully driving up the
                            movement of points. Coupled with email notifications
                            for receiving gifts, the feature was successful in
                            increasing the number of daily users coming back to
                            use the platform. The interaction also established a
                            pattern for later gifting and point-transfer
                            experiences.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    )
}
