/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from 'react'
import ReactConfetti from 'react-confetti'
import {
    ArrowRight,
    Check,
    Gift,
    RotateCcw,
    ShoppingBag,
    X,
} from 'lucide-react'
import giftCard from '../assets/img/case-studies/gifting/gift-card.png'

type DemoStage =
    | 'idle'
    | 'starting'
    | 'notifying'
    | 'ready'
    | 'celebration'
    | 'reveal'
    | 'redeemed'

const stageAnnouncement: Record<DemoStage, string> = {
    idle: 'Interactive demo ready to start.',
    starting: 'Interactive demo started.',
    notifying: 'A new gift notification appeared.',
    ready: 'The notification closed. The gift icon is still available.',
    celebration: 'Gift opened. Congratulations from the sender.',
    reveal: 'Gift revealed: six months of DashPass.',
    redeemed: 'The gift has been redeemed.',
}

export default function GiftingExperienceDemo() {
    const [stage, setStage] = useState<DemoStage>('idle')
    const [frameSize, setFrameSize] = useState({ height: 0, width: 0 })
    const [reduceMotion, setReduceMotion] = useState(false)
    const dialogRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const hasDialog = ['celebration', 'reveal', 'redeemed'].includes(stage)
    const marketplaceIsHidden = stage === 'idle' || hasDialog

    useEffect(() => {
        if (stage !== 'starting') return
        const timeout = window.setTimeout(() => setStage('notifying'), 1000)
        return () => window.clearTimeout(timeout)
    }, [stage])

    useEffect(() => {
        if (stage !== 'notifying') return
        const timeout = window.setTimeout(() => setStage('ready'), 3000)
        return () => window.clearTimeout(timeout)
    }, [stage])

    useEffect(() => {
        const frame = frameRef.current
        if (!frame) return

        const updateSize = () => {
            const { height, width } = frame.getBoundingClientRect()
            setFrameSize({ height, width })
        }
        const observer = new ResizeObserver(updateSize)
        observer.observe(frame)
        updateSize()
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => setReduceMotion(query.matches)
        query.addEventListener('change', updatePreference)
        updatePreference()
        return () => query.removeEventListener('change', updatePreference)
    }, [])

    useEffect(() => {
        if (!hasDialog) return

        dialogRef.current?.focus()
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setStage('ready')
                return
            }
            if (event.key !== 'Tab' || !dialogRef.current) return

            const focusable = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
                )
            ).filter((element) => !element.closest('[inert]'))
            if (focusable.length === 0) return

            const currentIndex = focusable.indexOf(
                document.activeElement as HTMLElement
            )
            const nextIndex = event.shiftKey
                ? (currentIndex - 1 + focusable.length) % focusable.length
                : (currentIndex + 1) % focusable.length
            event.preventDefault()
            focusable[nextIndex]?.focus()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [hasDialog, stage])

    const restart = () => setStage('idle')
    const closeGift = () => setStage('ready')
    const openGift = () => setStage('celebration')

    return (
        <section
            className="gift-demo"
            aria-label="Interactive demonstration of the Fringe gifting experience"
        >
            <div
                ref={frameRef}
                className="gift-demo__frame"
            >
                <div
                    className="gift-demo__marketplace"
                    aria-hidden={marketplaceIsHidden}
                    inert={marketplaceIsHidden ? true : undefined}
                >
                    <header className="gift-demo__product-nav">
                        <span className="gift-demo__brand">
                            <span aria-hidden="true">F</span> Fringe
                        </span>
                        <div className="gift-demo__account">
                            <span>
                                <ShoppingBag aria-hidden="true" /> 2,262 pts
                            </span>
                            <span>David George</span>
                            <button
                                className={`gift-demo__gift-trigger ${stage === 'notifying' ? 'gift-demo__gift-trigger--burst' : ''}`}
                                type="button"
                                aria-label={
                                    stage === 'notifying' || stage === 'ready'
                                        ? 'Open new gift, 1 unread'
                                        : 'Open new gift'
                                }
                                disabled={
                                    stage === 'idle' || stage === 'starting'
                                }
                                onClick={openGift}
                            >
                                <Gift aria-hidden="true" />
                                {(stage === 'notifying' ||
                                    stage === 'ready') && (
                                    <span className="gift-demo__gift-count">
                                        1
                                    </span>
                                )}
                                <span
                                    className="gift-demo__starburst"
                                    aria-hidden="true"
                                >
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <i key={index} />
                                    ))}
                                </span>
                                {stage === 'ready' && (
                                    <div
                                        className="gift-demo__gift-tooltip"
                                        aria-hidden="true"
                                    >
                                        <strong>Click gift icon</strong>
                                        <small>(demo only)</small>
                                    </div>
                                )}
                            </button>
                        </div>
                    </header>
                    <div className="gift-demo__marketplace-content">
                        <div>
                            <p className="gift-demo__kicker">
                                Featured benefit
                            </p>
                            <p className="gift-demo__marketplace-title">
                                Find something that feels like you
                            </p>
                            <span className="gift-demo__fake-button">
                                Explore benefits
                            </span>
                        </div>
                        <div className="gift-demo__tiles">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>

                {stage === 'notifying' && (
                    <button
                        className="gift-demo__notification"
                        type="button"
                        onClick={openGift}
                    >
                        <span className="gift-demo__notification-icon">
                            <Gift aria-hidden="true" />
                        </span>
                        <span>
                            <strong>You have a new gift!</strong>
                            <small>From Morgan · View gift</small>
                        </span>
                        <ArrowRight aria-hidden="true" />
                    </button>
                )}

                {stage === 'idle' && (
                    <div className="gift-demo__start-overlay">
                        <button
                            type="button"
                            onClick={() => setStage('starting')}
                        >
                            Start interactive demo
                        </button>
                    </div>
                )}

                {hasDialog && (
                    <div className="gift-demo__overlay">
                        {stage === 'celebration' &&
                            !reduceMotion &&
                            frameSize.width > 0 && (
                                <ReactConfetti
                                    className="gift-demo__confetti-canvas"
                                    width={frameSize.width}
                                    height={frameSize.height}
                                    colors={[
                                        '#ffd21c',
                                        '#ff274b',
                                        '#34ced4',
                                        '#5632b5',
                                    ]}
                                    confettiSource={{
                                        x: frameSize.width / 2,
                                        y: Math.min(
                                            130,
                                            frameSize.height * 0.18
                                        ),
                                        w: 1,
                                        h: 1,
                                    }}
                                    gravity={0.12}
                                    initialVelocityX={11}
                                    initialVelocityY={18}
                                    numberOfPieces={320}
                                    recycle={false}
                                    tweenDuration={120}
                                />
                            )}
                        <div
                            ref={dialogRef}
                            className={`gift-demo__card ${stage === 'reveal' || stage === 'redeemed' ? 'gift-demo__card--flipped' : ''}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={
                                stage === 'celebration'
                                    ? 'gift-demo-congratulations-title'
                                    : 'gift-demo-reveal-title'
                            }
                            tabIndex={-1}
                        >
                            <div className="gift-demo__card-inner">
                                <div
                                    className="gift-demo__card-face gift-demo__card-front"
                                    aria-hidden={stage !== 'celebration'}
                                    inert={
                                        stage !== 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    {stage === 'celebration' && (
                                        <button
                                            className="gift-demo__close"
                                            type="button"
                                            onClick={closeGift}
                                        >
                                            <X aria-hidden="true" />
                                            <span className="sr-only">
                                                Close gift
                                            </span>
                                        </button>
                                    )}
                                    <img
                                        className="gift-demo__gift-card-cover"
                                        src={giftCard}
                                        alt=""
                                        width="800"
                                        height="549"
                                    />
                                    <div className="gift-demo__congratulations">
                                        <p
                                            className="gift-demo__script-title"
                                            id="gift-demo-congratulations-title"
                                        >
                                            Congratulations!
                                        </p>
                                        <p>
                                            You received a gift from{' '}
                                            <strong>Morgan</strong>.
                                        </p>
                                        <blockquote>
                                            Thanks for everything you do. Enjoy
                                            something on me!
                                        </blockquote>
                                        <button
                                            className="gift-demo__primary-button"
                                            type="button"
                                            onClick={() => setStage('reveal')}
                                        >
                                            View your gift
                                            <ArrowRight aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="gift-demo__card-face gift-demo__card-back"
                                    aria-hidden={stage === 'celebration'}
                                    inert={
                                        stage === 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    <button
                                        className="gift-demo__close"
                                        type="button"
                                        onClick={closeGift}
                                    >
                                        <X aria-hidden="true" />
                                        <span className="sr-only">
                                            Close gift
                                        </span>
                                    </button>
                                    {stage === 'redeemed' ? (
                                        <div className="gift-demo__redeemed">
                                            <span>
                                                <Check aria-hidden="true" />
                                            </span>
                                            <p
                                                className="gift-demo__script-title"
                                                id="gift-demo-reveal-title"
                                            >
                                                Gift redeemed!
                                            </p>
                                            <p>
                                                The redemption details are on
                                                their way to your inbox.
                                            </p>
                                            <button
                                                className="gift-demo__secondary-button"
                                                type="button"
                                                onClick={restart}
                                            >
                                                Replay interaction
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="gift-demo__reveal">
                                            <p
                                                className="gift-demo__script-title"
                                                id="gift-demo-reveal-title"
                                            >
                                                Enjoy your gift!
                                            </p>
                                            <div className="gift-demo__reward">
                                                <span aria-hidden="true">
                                                    D
                                                </span>
                                                <p>
                                                    <strong>
                                                        6 months of DashPass
                                                    </strong>
                                                    <small>From DoorDash</small>
                                                </p>
                                            </div>
                                            <p>
                                                Let&apos;s get your gift to your
                                                inbox.
                                            </p>
                                            <button
                                                className="gift-demo__primary-button"
                                                type="button"
                                                onClick={() =>
                                                    setStage('redeemed')
                                                }
                                            >
                                                Redeem this gift
                                                <ArrowRight aria-hidden="true" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="gift-demo__controls">
                <p aria-live="polite">{stageAnnouncement[stage]}</p>
                <button
                    type="button"
                    onClick={restart}
                    disabled={stage === 'idle'}
                >
                    <RotateCcw aria-hidden="true" />
                    Replay
                </button>
            </div>
        </section>
    )
}
