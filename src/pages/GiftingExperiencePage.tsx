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
                            Receiving points or a product should feel like
                            receiving a gift, not like another account
                            transaction. The experience needed to attract
                            attention without interrupting the rest of the
                            marketplace, then reward the user for opening it.
                        </p>
                    </section>
                    <section>
                        <h2 className="mt-0 mb-3 text-2xl tracking-[-.04em]">
                            The interaction
                        </h2>
                        <p className="m-0 text-muted">
                            A small navigation notification started the flow.
                            Opening it expanded into a full celebration with
                            confetti and a personal note. The gift-card form
                            then flipped to reveal the reward and carry the user
                            into redemption.
                        </p>
                    </section>
                    <section>
                        <h2 className="mt-0 mb-3 text-2xl tracking-[-.04em]">
                            The outcome
                        </h2>
                        <p className="m-0 text-muted">
                            The interaction received positive feedback in user
                            testing and established a pattern for gifting and
                            point-transfer moments elsewhere in the platform.
                            Motion clarified each state change while giving the
                            exchange the emotional weight it was missing.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    )
}
