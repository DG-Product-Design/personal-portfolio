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
import doorDashLogo from '../assets/img/case-studies/gifting/doordash-logo.png'
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

const cardFaceClass =
    'absolute inset-0 flex flex-col justify-center overflow-hidden rounded-[clamp(1.25rem,4vw,2rem)] bg-white p-[clamp(1.6rem,5vw,3.25rem)] shadow-[0_2.25rem_5rem_#1a002b80] [backface-visibility:hidden]'
const primaryButtonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#5b1598] px-4.5 py-2.5 text-[clamp(.75rem,2vw,.95rem)] font-extrabold text-white hover:bg-[#26003f] [&>svg]:size-4'
const scriptTitleClass =
    "m-0 font-['Georgia','Times_New_Roman',serif] text-[clamp(1.85rem,5vw,3.5rem)] leading-none tracking-[-.045em] text-[#5b2082] italic"

export default function GiftingExperienceDemo() {
    const [stage, setStage] = useState<DemoStage>('idle')
    const [frameSize, setFrameSize] = useState({ height: 0, width: 0 })
    const [reduceMotion, setReduceMotion] = useState(false)
    const dialogRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<HTMLDivElement>(null)
    const hasDialog = ['celebration', 'reveal', 'redeemed'].includes(stage)
    const marketplaceIsHidden = stage === 'idle' || hasDialog
    const giftIsUnread = stage === 'notifying' || stage === 'ready'

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
                        <div className="grid -rotate-3 grid-cols-3 gap-3 compact:grid-cols-2">
                            <span className="min-h-[clamp(13rem,25vw,22rem)] rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[linear-gradient(180deg,transparent_52%,#160023_52%),linear-gradient(145deg,#dd5f8d,#ffaf58_47%,#3d0d70_48%)] shadow-[0_1.5rem_3rem_#0e001c80]" />
                            <span className="min-h-[clamp(13rem,25vw,22rem)] translate-y-8 rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[linear-gradient(180deg,transparent_52%,#160023_52%),linear-gradient(145deg,#3bbed1,#70d79f_47%,#3d0d70_48%)] shadow-[0_1.5rem_3rem_#0e001c80]" />
                            <span className="min-h-[clamp(13rem,25vw,22rem)] rounded-[clamp(.75rem,2vw,1.5rem)] border-[.45rem] border-solid border-white/13 bg-[linear-gradient(180deg,transparent_52%,#160023_52%),linear-gradient(145deg,#f2ce49,#f36c51_47%,#3d0d70_48%)] shadow-[0_1.5rem_3rem_#0e001c80] compact:hidden" />
                        </div>
                    </div>
                </div>

                {stage === 'notifying' && (
                    <button
                        className="absolute top-[clamp(5.25rem,10vw,7.25rem)] right-[clamp(1rem,4vw,3rem)] z-3 grid min-h-20 w-[min(22rem,calc(100%-2rem))] animate-gift-notification grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl border border-solid border-white/35 bg-[#f3eaff] px-4 py-3.5 text-left text-[#3b1261] shadow-[0_1.25rem_3rem_#0c001a99] hover:-translate-y-0.5 motion-reduce:animate-none [&>svg]:size-4.5"
                        type="button"
                        onClick={openGift}
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
                            className="min-h-13 rounded-full border border-solid border-white/35 bg-white/7 px-5.5 py-3 font-extrabold text-white shadow-[0_1rem_2.5rem_#0008] transition-[color,background,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#28133b] motion-reduce:transition-none"
                            type="button"
                            onClick={() => setStage('starting')}
                        >
                            Start interactive demo
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
                                    numberOfPieces={320}
                                    recycle={false}
                                    tweenDuration={120}
                                />
                            )}
                        <div
                            ref={dialogRef}
                            className="relative z-2 aspect-[35.5/24] w-[min(35.5rem,94%)] animate-gift-card outline-none [perspective:70rem] motion-reduce:animate-none compact:aspect-auto compact:min-h-88 compact:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={
                                stage === 'celebration'
                                    ? 'gift-demo-congratulations-title'
                                    : 'gift-demo-reveal-title'
                            }
                            tabIndex={-1}
                        >
                            <div
                                className={`absolute inset-0 transition-transform duration-850 ease-[cubic-bezier(.65,0,.35,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${stage === 'reveal' || stage === 'redeemed' ? '[transform:rotateY(180deg)]' : ''}`}
                            >
                                <div
                                    className={`${cardFaceClass} bg-[radial-gradient(circle_at_17%_20%,#4dcdd7_0_4px,transparent_5px),radial-gradient(circle_at_79%_24%,#ffd21c_0_5px,transparent_6px),radial-gradient(circle_at_86%_76%,#ff3655_0_4px,transparent_5px),radial-gradient(circle_at_25%_83%,#5632b5_0_4px,transparent_5px)]`}
                                    aria-hidden={stage !== 'celebration'}
                                    inert={
                                        stage !== 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    {stage === 'celebration' && (
                                        <button
                                            className="absolute top-4 right-4 z-4 grid size-11 place-items-center rounded-full bg-[#f2eafd] text-[#58227a] [&>svg]:size-4.5"
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
                                        className="pointer-events-none absolute inset-[-1%] z-3 size-[102%] max-w-none animate-gift-cover object-cover motion-reduce:animate-none"
                                        src={giftCard}
                                        alt=""
                                        width="800"
                                        height="549"
                                    />
                                    <div className="animate-gift-congratulations opacity-0 motion-reduce:animate-none motion-reduce:opacity-100">
                                        <p
                                            className={scriptTitleClass}
                                            id="gift-demo-congratulations-title"
                                        >
                                            Congratulations!
                                        </p>
                                        <p className="my-3 leading-normal">
                                            You received a gift from{' '}
                                            <strong>Morgan</strong>.
                                        </p>
                                        <blockquote className="my-[clamp(.75rem,3vw,1.5rem)] border-l-3 border-solid border-[#e0c9ee] py-3 pr-0 pl-4 text-[clamp(.75rem,2vw,1rem)] leading-snug text-[#725886]">
                                            Thanks for everything you do. Enjoy
                                            something on me!
                                        </blockquote>
                                        <button
                                            className={primaryButtonClass}
                                            type="button"
                                            onClick={() => setStage('reveal')}
                                        >
                                            View your gift
                                            <ArrowRight aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className={`${cardFaceClass} [transform:rotateY(180deg)]`}
                                    aria-hidden={stage === 'celebration'}
                                    inert={
                                        stage === 'celebration'
                                            ? true
                                            : undefined
                                    }
                                >
                                    <button
                                        className="absolute top-4 right-4 z-4 grid size-11 place-items-center rounded-full bg-[#f2eafd] text-[#58227a] [&>svg]:size-4.5"
                                        type="button"
                                        onClick={closeGift}
                                    >
                                        <X aria-hidden="true" />
                                        <span className="sr-only">
                                            Close gift
                                        </span>
                                    </button>
                                    {stage === 'redeemed' ? (
                                        <div className="animate-gift-content text-center motion-reduce:animate-none">
                                            <span className="mx-auto mb-4 grid size-[clamp(3rem,8vw,4.5rem)] place-items-center rounded-full bg-[#2a9d75] text-white [&>svg]:w-[55%]">
                                                <Check aria-hidden="true" />
                                            </span>
                                            <p
                                                className={scriptTitleClass}
                                                id="gift-demo-reveal-title"
                                            >
                                                Gift redeemed!
                                            </p>
                                            <p className="my-3 leading-normal">
                                                The redemption details are on
                                                their way to your inbox.
                                            </p>
                                            <button
                                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f2eafd] px-4.5 py-2.5 text-[clamp(.75rem,2vw,.95rem)] font-extrabold text-[#5b1598]"
                                                type="button"
                                                onClick={restart}
                                            >
                                                Replay interaction
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="animate-gift-content motion-reduce:animate-none">
                                            <p
                                                className={scriptTitleClass}
                                                id="gift-demo-reveal-title"
                                            >
                                                Enjoy your gift!
                                            </p>
                                            <div className="my-[clamp(.8rem,3vw,1.5rem)] flex items-center gap-4 rounded-2xl bg-[#f8f3fb] p-[clamp(.75rem,2vw,1.1rem)]">
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
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex min-h-15 items-center justify-between gap-4 text-[.85rem] text-muted compact:items-start">
                <p
                    className="m-0 compact:max-w-[70%]"
                    aria-live="polite"
                >
                    {stageAnnouncement[stage]}
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
