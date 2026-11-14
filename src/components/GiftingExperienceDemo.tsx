import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { ArrowRight, Gift, RotateCcw, ShoppingBag, X } from 'lucide-react'
import doorDashLogo from '../assets/img/case-studies/gifting/doordash-logo.png'
import GiftWrapReveal from './GiftWrapReveal'
import giftCard from '../assets/img/case-studies/gifting/gift-card-clean.webp'

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

const burstRotations = [
    'rotate-[0deg]',
    'rotate-[30deg]',
    'rotate-[60deg]',
    'rotate-[90deg]',
    'rotate-[120deg]',
    'rotate-[150deg]',
    'rotate-[180deg]',
    'rotate-[210deg]',
    'rotate-[240deg]',
    'rotate-[270deg]',
    'rotate-[300deg]',
    'rotate-[330deg]',
]

const GIFT_NOTIFICATION_DURATION_MS = 3000
// The final piece finishes at 1,000 + 8 × 67.5 + 500 = 2,040 ms.
const GIFT_REVEAL_DELAY_MS = 2150
const DEMO_START_DELAY_MS = 1000

const cardFaceClass =
    'absolute inset-0 flex flex-col justify-center rounded-[clamp(1.25rem,4vw,2rem)] p-[clamp(1.6rem,5vw,3.25rem)] shadow-[0_2.25rem_5rem_#1a002b80] [backface-visibility:hidden]'
const primaryButtonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#5b1598] px-4.5 py-2.5 text-[clamp(.75rem,2vw,.95rem)] font-extrabold text-white hover:bg-[#26003f] focus-visible:outline-[#32104e] [&>svg]:size-4'
const scriptTitleClass =
    "m-0 font-['Georgia','Times_New_Roman',serif] text-[clamp(1.85rem,5vw,3.5rem)] leading-none tracking-[-.045em] text-[#5b2082] italic"

function RedemptionCheckmark({ reduceMotion }: { reduceMotion: boolean }) {
    return (
        <motion.span
            className="grid size-full place-items-center rounded-full bg-[#2a9d75] text-white"
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: reduceMotion ? 1 : [0.8, 1.08, 1], opacity: 1 }}
            transition={{
                scale: {
                    duration: reduceMotion ? 0 : 0.36,
                    delay: reduceMotion ? 0 : 0.1,
                    times: [0, 0.65, 1],
                    ease: 'easeOut',
                },
                opacity: { duration: reduceMotion ? 0 : 0.12 },
            }}
        >
            <svg
                className="w-[55%]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <motion.path
                    d="m5 12 4 4L19 6"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.28,
                        delay: reduceMotion ? 0 : 0.24,
                        ease: 'easeOut',
                    }}
                />
            </svg>
        </motion.span>
    )
}

export default function GiftingExperienceDemo() {
    const [stage, setStage] = useState<DemoStage>('idle')
    const [artworkStatus, setArtworkStatus] = useState<
        'loading' | 'ready' | 'failed'
    >('loading')
    const [celebrationReady, setCelebrationReady] = useState(false)
    const [frameSize, setFrameSize] = useState({ height: 0, width: 0 })
    const [reduceMotion, setReduceMotion] = useState(false)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const giftButtonRef = useRef<HTMLButtonElement>(null)
    const hasInteractedRef = useRef(false)
    const notificationButtonRef = useRef<HTMLButtonElement>(null)
    const startButtonRef = useRef<HTMLButtonElement>(null)
    const hasDialog = ['celebration', 'reveal', 'redeemed'].includes(stage)
    const marketplaceIsHidden = stage === 'idle' || hasDialog
    const isRedeemed = stage === 'redeemed'
    const giftIsUnread = stage === 'notifying' || stage === 'ready'
    const closeIsAvailable = stage !== 'celebration' || celebrationReady
    const artworkIsLoading = artworkStatus === 'loading' && !reduceMotion

    useEffect(() => {
        let cancelled = false
        const image = new Image()
        image.src = giftCard

        // Fetching alone is insufficient so we wait for decoding before allowing
        // the first reveal to mount its SVG pattern and start its timeline.
        void image.decode().then(
            () => {
                if (!cancelled) setArtworkStatus('ready')
            },
            () => {
                if (!cancelled) setArtworkStatus('failed')
            }
        )

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (stage !== 'starting') return
        const timeout = window.setTimeout(
            () => setStage('notifying'),
            DEMO_START_DELAY_MS
        )
        return () => window.clearTimeout(timeout)
    }, [stage])

    useEffect(() => {
        if (stage !== 'notifying') return
        const timeout = window.setTimeout(
            () => setStage('ready'),
            GIFT_NOTIFICATION_DURATION_MS
        )
        return () => window.clearTimeout(timeout)
    }, [stage])

    useEffect(() => {
        if (stage !== 'celebration') {
            setCelebrationReady(false)
            return
        }
        if (reduceMotion || artworkStatus === 'failed') {
            setCelebrationReady(true)
            return
        }

        const timeout = window.setTimeout(
            () => setCelebrationReady(true),
            GIFT_REVEAL_DELAY_MS
        )
        return () => window.clearTimeout(timeout)
    }, [artworkStatus, reduceMotion, stage])

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
        if (stage === 'notifying') {
            notificationButtonRef.current?.focus()
            return
        }
        if (stage === 'ready') {
            giftButtonRef.current?.focus()
            return
        }
        if (hasDialog) {
            dialogRef.current?.focus()
            return
        }
        if (stage === 'idle' && hasInteractedRef.current) {
            startButtonRef.current?.focus()
        }
    }, [hasDialog, stage])

    useEffect(() => {
        if (!hasDialog) return

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

            const activeElement = document.activeElement as HTMLElement
            const firstElement = focusable[0]
            const lastElement = focusable.at(-1)
            const focusIsInside = dialogRef.current.contains(activeElement)

            if (!focusIsInside) {
                event.preventDefault()
                ;(event.shiftKey ? lastElement : firstElement)?.focus()
                return
            }
            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault()
                lastElement?.focus()
                return
            }
            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault()
                firstElement?.focus()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [hasDialog])

    const restart = () => {
        hasInteractedRef.current = true
        setStage('idle')
    }
    const closeGift = () => setStage('ready')
    const openGift = () => {
        hasInteractedRef.current = true
        setStage('celebration')
    }
    const startDemo = () => {
        if (artworkIsLoading) return
        hasInteractedRef.current = true
        setStage('starting')
    }

    return (
        <section
            className="text-[#32104e]"
            aria-label="Interactive demonstration of the Fringe gifting experience"
        >
            <div
                ref={frameRef}
                className="relative isolate min-h-[clamp(32rem,70vw,48rem)] overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-solid border-rule/75 bg-[#19002c] shadow-[0_1.8rem_5rem_#0006]"
            >
                <div
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,#a538bd55,transparent_26%),linear-gradient(140deg,#19002c,#35045e_62%,#22003d)] p-[clamp(1rem,3vw,2.25rem)] text-white transition-[filter] duration-500 ease-out motion-reduce:transition-none ${marketplaceIsHidden ? 'blur-[7px]' : ''}`}
                    aria-hidden={marketplaceIsHidden}
                    inert={marketplaceIsHidden ? true : undefined}
                >
                    <header className="relative z-1 mx-auto flex min-h-13 max-w-248 items-center justify-between rounded-full bg-[#47117a] px-[clamp(1rem,3vw,2rem)] text-[clamp(.72rem,1.4vw,.9rem)] shadow-[0_.85rem_1.8rem_#11001f66] compact:pr-11">
                        <span className="flex items-center gap-2 font-extrabold tracking-[-.02em] uppercase">
                            <span
                                className="grid size-6 place-items-center rounded-sm bg-white font-black text-[#47117a]"
                                aria-hidden="true"
                            >
                                F
                            </span>{' '}
                            Fringe
                        </span>
                        <div className="flex items-center gap-[clamp(.65rem,2.5vw,1.5rem)] font-bold">
                            <span className="flex items-center gap-1.5">
                                <ShoppingBag
                                    aria-hidden="true"
                                    className="size-4"
                                />{' '}
                                2,262 pts
                            </span>
                            <span className="flex items-center compact:hidden">
                                David George
                            </span>
                            <button
                                ref={giftButtonRef}
                                className="relative -my-1.5 -mr-3 -ml-1.5 grid size-11 place-items-center rounded-full bg-transparent text-white hover:bg-white/10 disabled:cursor-default [&>svg]:size-4.5"
                                type="button"
                                aria-label={
                                    giftIsUnread
                                        ? 'Open new gift, 1 unread'
                                        : 'Open new gift'
                                }
                                disabled={
                                    stage === 'idle' || stage === 'starting'
                                }
                                onClick={openGift}
                            >
                                <Gift
                                    aria-hidden="true"
                                    className={
                                        stage === 'notifying'
                                            ? 'animate-gift-icon motion-reduce:animate-none'
                                            : undefined
                                    }
                                />
                                {giftIsUnread && (
                                    <span className="absolute top-0.75 right-0.75 z-3 grid size-3.5 place-items-center rounded-full border border-solid border-[#47117a] bg-[#df1838] text-[.5rem] leading-none font-black text-white">
                                        1
                                    </span>
                                )}
                                <span
                                    className="pointer-events-none absolute inset-1/2"
                                    aria-hidden="true"
                                >
                                    {burstRotations.map((rotation) => (
                                        <i
                                            key={rotation}
                                            className={`absolute top-[-.2rem] -left-px ${rotation}`}
                                        >
                                            <span
                                                className={`block h-[.4rem] w-0.5 origin-[50%_.2rem] rounded-full bg-[#ffd21c] opacity-0 ${stage === 'notifying' ? 'animate-gift-starburst motion-reduce:animate-none' : ''}`}
                                            />
                                        </i>
                                    ))}
                                </span>
                                {stage === 'ready' && (
                                    <div
                                        className="pointer-events-none absolute top-[calc(100%+.2rem)] left-1/2 z-4 flex h-14 w-28 -translate-x-1/2 animate-gift-tooltip flex-col items-center justify-center gap-1.25 rounded-lg border border-solid border-[#d9b8ff55] bg-[#1e082def] px-2 text-center leading-none text-white shadow-[0_.5rem_1rem_#10001f55] before:absolute before:bottom-full before:left-1/2 before:size-0 before:-translate-x-1/2 before:border-x-[.4rem] before:border-b-[.4rem] before:border-x-transparent before:border-b-[#1e082def] before:content-[''] motion-reduce:animate-none"
                                        aria-hidden="true"
                                    >
                                        <strong className="text-[.6875rem] font-bold whitespace-nowrap">
                                            Click gift icon
                                        </strong>
                                        <small className="text-[.5rem] leading-tight font-extrabold tracking-[.08em] text-[#cba9ed] uppercase">
                                            (this message is for demo only)
                                        </small>
                                    </div>
                                )}
                            </button>
                        </div>
                    </header>
                    <div className="mx-auto grid min-h-[clamp(25rem,56vw,39rem)] max-w-272 grid-cols-[.75fr_1.25fr] items-center gap-[clamp(2rem,6vw,7rem)] p-[clamp(2rem,6vw,5rem)] compact:grid-cols-[.9fr_1.1fr] compact:gap-5 compact:px-4">
                        <div>
                            <p className="mt-0 mb-3 text-[.8rem] font-bold text-[#d7a8ff]">
                                Featured benefit
                            </p>
                            <p className="mt-0 mb-6 max-w-[9ch] text-[clamp(2.25rem,5vw,4.5rem)] leading-[.9] font-extrabold tracking-[-.065em]">
                                Find something that feels like you
                            </p>
                            <span className="inline-block rounded-full bg-[#2cc1d6] px-4.5 py-3 text-[.8rem] font-extrabold text-[#241039]">
                                Explore benefits
                            </span>
                        </div>
                        <div className="grid -rotate-3 transform-gpu grid-cols-3 gap-3 [backface-visibility:hidden] compact:grid-cols-2">
                            <span className="relative min-h-[clamp(10rem,20vw,15.75rem)] transform-gpu overflow-hidden rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[#3d0d70] bg-clip-padding shadow-[0_1.5rem_3rem_#0e001c80] [backface-visibility:hidden]">
                                <span className="absolute inset-0 bg-[linear-gradient(145deg,#dd5f8d,#ffaf58)] [clip-path:polygon(0_0,100%_0,100%_52%,0_calc(100%_-_1.25rem))]" />
                            </span>
                            <span className="relative min-h-[clamp(10rem,20vw,15.75rem)] translate-y-8 transform-gpu overflow-hidden rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[#3d0d70] bg-clip-padding shadow-[0_1.5rem_3rem_#0e001c80] [backface-visibility:hidden]">
                                <span className="absolute inset-0 bg-[linear-gradient(145deg,#3bbed1,#70d79f)] [clip-path:polygon(0_0,100%_0,100%_52%,0_calc(100%_-_1.25rem))]" />
                            </span>
                            <span className="relative min-h-[clamp(10rem,20vw,15.75rem)] transform-gpu overflow-hidden rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[#3d0d70] bg-clip-padding shadow-[0_1.5rem_3rem_#0e001c80] [backface-visibility:hidden] compact:hidden">
                                <span className="absolute inset-0 bg-[linear-gradient(145deg,#f2ce49,#f36c51)] [clip-path:polygon(0_0,100%_0,100%_52%,0_calc(100%_-_1.25rem))]" />
                            </span>
                        </div>
                    </div>
                </div>

                {stage === 'notifying' && (
                    <button
                        ref={notificationButtonRef}
                        className="absolute top-[clamp(5.25rem,10vw,7.25rem)] right-[clamp(1rem,4vw,3rem)] z-3 grid min-h-20 w-[min(22rem,calc(100%-2rem))] animate-[gift-notification-lifecycle_var(--gift-notification-duration)_cubic-bezier(0.16,1,0.3,1)_both] grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl border border-solid border-white/35 bg-[#f3eaff] px-4 py-3.5 text-left text-[#3b1261] shadow-[0_1.25rem_3rem_#0c001a99] hover:-translate-y-0.5 focus-visible:outline-[#32104e] motion-reduce:animate-none [&>svg]:size-4.5"
                        type="button"
                        onClick={openGift}
                        style={
                            {
                                '--gift-notification-duration': `${GIFT_NOTIFICATION_DURATION_MS}ms`,
                            } as CSSProperties
                        }
                    >
                        <span className="grid size-11 place-items-center rounded-full bg-[#5b1598] text-white [&>svg]:size-5.5">
                            <Gift aria-hidden="true" />
                        </span>
                        <span>
                            <strong className="block">
                                You have a new gift!
                            </strong>
                            <small className="mt-0.75 block text-[#76558d]">
                                From Morgan · View gift
                            </small>
                        </span>
                        <ArrowRight aria-hidden="true" />
                    </button>
                )}

                {stage === 'idle' && (
                    <div className="absolute inset-0 z-10 grid place-items-center bg-[#05050682] backdrop-blur-2xl">
                        <button
                            ref={startButtonRef}
                            className="min-h-13 rounded-full border border-solid border-white/35 bg-white/7 px-5.5 py-3 font-extrabold text-white shadow-[0_1rem_2.5rem_#0008] transition-[color,background,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#28133b] motion-reduce:transition-none"
                            type="button"
                            onClick={startDemo}
                            disabled={artworkIsLoading}
                            aria-busy={artworkIsLoading}
                        >
                            {artworkIsLoading
                                ? 'Preparing your gift…'
                                : 'Start interactive demo'}
                        </button>
                    </div>
                )}

                {hasDialog && (
                    <div className="absolute inset-0 z-4 grid animate-gift-overlay place-items-center bg-[#76509acc] p-[clamp(1rem,4vw,3rem)] [perspective:70rem] motion-reduce:animate-none">
                        {stage === 'celebration' &&
                            !reduceMotion &&
                            frameSize.width > 0 && (
                                <ReactConfetti
                                    className="pointer-events-none absolute! inset-0! z-5! motion-reduce:hidden"
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
                                    numberOfPieces={
                                        frameSize.width <= 720 ? 80 : 320
                                    }
                                    recycle={false}
                                    tweenDuration={120}
                                />
                            )}
                        <motion.div
                            ref={dialogRef}
                            className="relative z-2 aspect-[35.5/24] w-[min(35.5rem,94%)] outline-none [perspective:70rem] compact:aspect-auto compact:min-h-88 compact:w-full"
                            initial={reduceMotion ? false : { y: -220 }}
                            animate={{ y: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 9000,
                                damping: 700,
                                mass: 35,
                            }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={
                                stage === 'celebration'
                                    ? 'gift-demo-congratulations-title'
                                    : isRedeemed
                                      ? 'gift-demo-redeemed-title'
                                      : 'gift-demo-reveal-title'
                            }
                            tabIndex={-1}
                        >
                            <button
                                ref={closeButtonRef}
                                className={`absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-[#f2eafd] text-[#58227a] transition-opacity duration-200 focus-visible:outline-[#32104e] motion-reduce:transition-none [&>svg]:size-4.5 ${closeIsAvailable ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                                type="button"
                                onClick={closeGift}
                                aria-hidden={!closeIsAvailable}
                                tabIndex={closeIsAvailable ? 0 : -1}
                            >
                                <X aria-hidden="true" />
                                <span className="sr-only">Close gift</span>
                            </button>
                            <div
                                className={`absolute inset-0 transition-transform duration-850 ease-[cubic-bezier(.65,0,.35,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${stage === 'reveal' || stage === 'redeemed' ? '[transform:rotateY(180deg)]' : ''}`}
                            >
                                <div
                                    className={`${cardFaceClass} overflow-visible bg-white bg-[radial-gradient(circle_at_24%_12%,#4dcdd7_0_4px,transparent_5px),radial-gradient(circle_at_79%_24%,#ffd21c_0_5px,transparent_6px),radial-gradient(circle_at_86%_76%,#ff3655_0_4px,transparent_5px),radial-gradient(circle_at_45%_85%,#5632b5_0_4px,transparent_5px)]`}
                                    aria-hidden={stage !== 'celebration'}
                                    inert={
                                        stage !== 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    {artworkStatus === 'ready' &&
                                        !reduceMotion && <GiftWrapReveal />}
                                    <div
                                        className={`animate-gift-congratulations opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 ${celebrationReady ? '' : 'pointer-events-none'}`}
                                    >
                                        <p
                                            className={scriptTitleClass}
                                            id="gift-demo-congratulations-title"
                                        >
                                            Congratulations!
                                        </p>
                                        <p className="mt-3 leading-normal">
                                            You received a gift from{' '}
                                            <strong>Morgan</strong>.
                                        </p>
                                        <p className="my-[clamp(.75rem,3vw,1.5rem)] text-[clamp(.75rem,2vw,1rem)] leading-snug text-[#725886] italic">
                                            "Thanks for everything you do. Our
                                            team is so grateful to have you.
                                            Enjoy something on me!"
                                        </p>
                                        <button
                                            className={`${primaryButtonClass} mt-2`}
                                            type="button"
                                            tabIndex={celebrationReady ? 0 : -1}
                                            onClick={() => setStage('reveal')}
                                        >
                                            View your gift
                                            <ArrowRight aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`${cardFaceClass} [transform:rotateY(180deg)] overflow-hidden bg-white`}
                                    aria-hidden={stage === 'celebration'}
                                    inert={
                                        stage === 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    <div className="grid items-center">
                                        <motion.div
                                            className="[grid-area:1/1]"
                                            initial={false}
                                            animate={{
                                                opacity: isRedeemed ? 0 : 1,
                                                y:
                                                    isRedeemed && !reduceMotion
                                                        ? -10
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: reduceMotion
                                                    ? 0
                                                    : 0.2,
                                                ease: 'easeInOut',
                                            }}
                                            aria-hidden={stage !== 'reveal'}
                                            inert={
                                                stage !== 'reveal'
                                                    ? true
                                                    : undefined
                                            }
                                        >
                                            <p
                                                className={scriptTitleClass}
                                                id="gift-demo-reveal-title"
                                            >
                                                Enjoy your gift!
                                            </p>
                                            <div className="my-8 flex items-center gap-4 rounded-2xl bg-[#f8f3fb] p-[clamp(.75rem,2vw,1.1rem)]">
                                                <img
                                                    className="size-[clamp(3rem,8vw,4.5rem)] shrink-0 rounded-2xl object-contain"
                                                    src={doorDashLogo}
                                                    alt=""
                                                    width="1500"
                                                    height="1500"
                                                />
                                                <p className="m-0">
                                                    <strong className="block">
                                                        6 months of DashPass
                                                    </strong>
                                                    <small className="mt-0.75 block text-[#765f86]">
                                                        From DoorDash
                                                    </small>
                                                </p>
                                            </div>
                                            <div className="w-full">
                                                <button
                                                    className={`${primaryButtonClass} mx-auto flex!`}
                                                    type="button"
                                                    onClick={() =>
                                                        setStage('redeemed')
                                                    }
                                                >
                                                    Redeem this gift
                                                    <ArrowRight aria-hidden="true" />
                                                </button>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="text-center [grid-area:1/1]"
                                            initial={false}
                                            animate={{
                                                opacity: isRedeemed ? 1 : 0,
                                                y:
                                                    isRedeemed || reduceMotion
                                                        ? 0
                                                        : 12,
                                            }}
                                            transition={{
                                                duration: reduceMotion
                                                    ? 0
                                                    : 0.32,
                                                delay:
                                                    isRedeemed && !reduceMotion
                                                        ? 0.08
                                                        : 0,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            aria-hidden={!isRedeemed}
                                            inert={
                                                !isRedeemed ? true : undefined
                                            }
                                        >
                                            <div className="mx-auto mb-4 size-[clamp(3rem,8vw,4.5rem)]">
                                                {isRedeemed && (
                                                    <RedemptionCheckmark
                                                        reduceMotion={
                                                            reduceMotion
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <p
                                                className={scriptTitleClass}
                                                id="gift-demo-redeemed-title"
                                            >
                                                Gift redeemed!
                                            </p>
                                            <p className="my-3 leading-normal">
                                                The redemption details are on
                                                their way to your inbox.
                                            </p>
                                            <button
                                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f2eafd] px-4.5 py-2.5 text-[clamp(.75rem,2vw,.95rem)] font-extrabold text-[#5b1598] focus-visible:outline-[#32104e]"
                                                type="button"
                                                onClick={restart}
                                            >
                                                Replay interaction
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
            <div className="flex min-h-15 items-center justify-between gap-4 text-[.85rem] text-muted compact:items-start">
                <p
                    className="m-0 compact:max-w-[70%]"
                    aria-live="polite"
                >
                    {stage === 'idle' && artworkIsLoading
                        ? 'Preparing your gift.'
                        : stageAnnouncement[stage]}
                </p>
                <button
                    className="inline-flex min-h-11 items-center gap-2 bg-transparent font-bold text-violet disabled:cursor-default disabled:opacity-40 [&>svg]:size-4"
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
