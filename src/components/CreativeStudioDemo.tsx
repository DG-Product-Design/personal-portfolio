import {
    ArrowDown,
    ArrowUp,
    Check,
    Globe,
    Image,
    Monitor,
    Moon,
    Paperclip,
    Plus,
    RotateCw,
    Sun,
    Telescope,
} from 'lucide-react'
import { MessageScroller } from '@shadcn/react/message-scroller'
import { useEffect, useId, useState } from 'react'
import CreativeUpdateStatus from './CreativeUpdateStatus'
import {
    studioLayout,
    studioChatLayout,
    studioArtworkLayout,
    studioCaptionLayout,
    studioCaption,
    studioHint,
} from './creativeStudioLayout'
import criticalImages from '../content/critical-images.json'
import duskPoster from '../assets/img/chat-demo/get-outside-v2.jpg'
import duskPortrait from '../assets/img/chat-demo/get-outside-dusk-portrait.jpg'
import scenicRoutePoster from '../assets/img/chat-demo/take-the-scenic-route-dusk-feed.jpg'
import outsideFourFive from '../assets/img/chat-demo/ad-get-outside-4x5.jpg'
import outsideNineSixteen from '../assets/img/chat-demo/ad-get-outside-9x16.jpg'
import scenicFourFive from '../assets/img/chat-demo/ad-scenic-route-4x5.jpg'
import scenicNineSixteen from '../assets/img/chat-demo/ad-scenic-route-9x16.jpg'

const scenicRoute = {
    src: scenicRoutePoster,
    alt: 'Take the Scenic Route poster with cream lettering over purple mountains and an orange sunset.',
    width: 1287,
    height: 1222,
}

const duskCreative = {
    src: duskPortrait,
    alt: 'Get Outside poster with cream lettering over a purple and coral mountain landscape.',
    width: 1034,
    height: 1521,
}

const feedRatios = ['1:1', '4:5', '9:16'] as const
type FeedRatio = (typeof feedRatios)[number]
const ratioQuestionIndex = 1
const ratioEditIndex = ratioQuestionIndex + 1
const firstFeedRevision = ratioEditIndex + 1

const portraitFeedArtwork = {
    '4:5': {
        original: outsideFourFive,
        revised: scenicFourFive,
        width: 1080,
        height: 1350,
    },
    '9:16': {
        original: outsideNineSixteen,
        revised: scenicNineSixteen,
        width: 1080,
        height: 1920,
    },
}

const revisions = [
    {
        ...criticalImages.creativeStudio,
        alt: 'Get Outside poster with cream lettering over a green mountain landscape.',
    },
    duskCreative,
    duskCreative,
    {
        src: duskPoster,
        alt: 'Get Outside poster with cream lettering over purple mountains and an orange sunset.',
        width: 1287,
        height: 1222,
    },
    scenicRoute,
    { ...scenicRoute, showLogo: true },
]

const edits = [
    {
        prompt: 'Try a dusk palette. Keep the “Get Outside” headline and the portrait layout.',
        action: 'Updated the campaign palette',
        detail: 'Switched from daylight greens to dusk purples and coral. The portrait layout and headline carried over.',
        reply: 'Here’s the dusk version. I kept the portrait layout, cream “Get Outside” lettering, and mountain motif.',
    },
    {
        prompt: 'Reframe this for the Instagram feed. Keep the dusk palette and “Get Outside.”',
        reply: 'Which aspect ratio should I target for the feed: 1:1, 4:5, or 9:16?',
    },
    {
        prompt: 'Use {ratio}.',
        action: 'Reframed for Instagram',
        detail: 'Set the canvas to {ratio} and kept the dusk palette and “Get Outside” headline.',
        reply: 'Here’s the {ratio} version. It keeps the dusk palette, cream headline, and mountain motif.',
    },
    {
        prompt: 'Change the headline to “Take the Scenic Route.” Keep the artwork as is.',
        action: 'Updated the headline',
        detail: 'Replaced “Get Outside” with “Take the Scenic Route.” The artwork and feed framing carried over.',
        reply: '“Take the Scenic Route” is in. I kept the cream lettering style, dusk palette, and feed framing.',
    },
    {
        prompt: 'Add my brand logo near the bottom, centered horizontally.',
        action: 'Placed the brand logo',
        detail: 'Centered the Trailbound mark above the bottom edge of the ad. The headline and artwork carried over.',
        reply: 'I centered the Trailbound logo just above the bottom edge, using the same cream color as the headline.',
    },
]

const themeOptions = [
    { value: 'system', label: 'System', icon: Monitor },
    {
        value: 'light',
        label: 'Light',
        icon: Sun,
    },
    {
        value: 'dark',
        label: 'Dark',
        icon: Moon,
    },
] as const

const composerActions = [
    {
        label: 'Add Photos & Files',
        icon: Paperclip,
        notice: 'File attachments are unavailable in this scripted demo.',
    },
    {
        label: 'Create Image',
        icon: Image,
        notice: 'Use the arrow button to send the next sample image edit.',
    },
    {
        label: 'Deep Research',
        icon: Telescope,
        notice: 'Deep Research is unavailable in this scripted demo.',
    },
    {
        label: 'Web Search',
        icon: Globe,
        notice: 'Web Search is unavailable in this scripted demo.',
    },
] as const

type DemoTheme = (typeof themeOptions)[number]['value']

function getRevisionArtwork(index: number, ratio: FeedRatio | null) {
    const creative = revisions[index]
    const previewRatio = index >= firstFeedRevision ? ratio : null
    const artwork =
        previewRatio && previewRatio !== '1:1'
            ? portraitFeedArtwork[previewRatio]
            : null

    return {
        ...creative,
        previewRatio,
        src: artwork
            ? index === firstFeedRevision
                ? artwork.original
                : artwork.revised
            : creative.src,
        width: artwork?.width ?? creative.width,
        height: artwork?.height ?? creative.height,
    }
}

export default function CreativeStudioDemo() {
    const [theme, setTheme] = useState<DemoTheme>('system')
    const [toolNotice, setToolNotice] = useState('')
    const [feedRatio, setFeedRatio] = useState<FeedRatio | null>(null)
    const themeGroup = useId()
    const [sent, setSent] = useState(0)
    const [streamed, setStreamed] = useState<number | null>(null)
    const [replay, setReplay] = useState(0)
    const isStreaming = streamed !== null
    const creative = getRevisionArtwork(
        streamed === 0 ? sent - 1 : sent,
        feedRatio
    )
    const { previewRatio } = creative
    const pendingArtwork =
        streamed === 0 ? getRevisionArtwork(sent, feedRatio).src : null
    const waitingForRatio = sent === ratioEditIndex && !feedRatio
    const replyLength = edits[sent - 1]?.reply.replace(
        '{ratio}',
        feedRatio ?? ''
    ).length
    const nextEdit = edits[sent]
    const showSendIcon = isStreaming || Boolean(nextEdit)

    function restartDemo() {
        setSent(0)
        setStreamed(null)
        setFeedRatio(null)
        setToolNotice('')
        setReplay((current) => current + 1)
    }

    useEffect(() => {
        if (streamed === null || replyLength === undefined) return
        let cancelled = false
        let artworkReady = Promise.resolve()
        if (pendingArtwork && pendingArtwork !== creative.src) {
            const image = new window.Image()
            image.src = pendingArtwork
            artworkReady = image.decode().catch(() => {
                // Let the rendered image handle a failed preload.
            })
        }
        const timer = window.setTimeout(
            () => {
                void artworkReady.then(() => {
                    if (cancelled) return
                    const next = streamed + 4
                    setStreamed(next >= replyLength ? null : next)
                })
            },
            streamed === 0 ? 3400 : 45
        )

        return () => {
            cancelled = true
            window.clearTimeout(timer)
        }
    }, [creative.src, pendingArtwork, replyLength, streamed])

    return (
        <figure
            data-studio-theme={theme}
            className={studioLayout}
        >
            <div className="col-span-full flex items-center justify-end gap-2 text-sm text-neutral-600 dark:text-neutral-400 compact:order-first">
                <span id={themeGroup}>Theme</span>
                <div
                    role="radiogroup"
                    aria-labelledby={themeGroup}
                    className="inline-flex rounded-lg border border-solid border-black/15 bg-white p-0.5 dark:border-white/15 dark:bg-neutral-900"
                >
                    {themeOptions.map(({ value, label, icon: Icon }) => (
                        <label
                            key={value}
                            className="group relative cursor-pointer"
                        >
                            <input
                                className="peer sr-only"
                                type="radio"
                                name={themeGroup}
                                value={value}
                                checked={theme === value}
                                onChange={() => setTheme(value)}
                                aria-label={label}
                            />
                            <span className="grid size-9 place-items-center rounded-md group-hover:text-neutral-900 peer-checked:bg-neutral-200 peer-checked:text-neutral-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet dark:group-hover:text-neutral-50 dark:peer-checked:bg-neutral-700 dark:peer-checked:text-neutral-50">
                                <Icon
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </span>
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-neutral-50 opacity-0 transition-opacity duration-0 group-hover:opacity-100 group-hover:delay-250 peer-focus-visible:opacity-100 peer-focus-visible:delay-250 dark:bg-neutral-100 dark:text-neutral-900"
                            >
                                {label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
            <div className={studioChatLayout}>
                <div className="flex items-center justify-between gap-3 border-b border-solid border-black/10 px-5 py-3 dark:border-white/10">
                    <strong>Conversational Ad Editor</strong>
                    <button
                        type="button"
                        aria-label="Restart"
                        onClick={restartDemo}
                        className="group relative grid size-9 shrink-0 place-items-center rounded-full border border-solid border-black/15 bg-transparent hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                    >
                        <RotateCw
                            aria-hidden="true"
                            className="size-4"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 rounded-md bg-neutral-900 px-2 py-1 text-xs whitespace-nowrap text-neutral-50 opacity-0 transition-opacity duration-0 group-hover:opacity-100 group-hover:delay-250 group-focus-visible:opacity-100 group-focus-visible:delay-250 dark:bg-neutral-100 dark:text-neutral-900"
                        >
                            Restart
                        </span>
                    </button>
                </div>
                <MessageScroller.Provider
                    key={replay}
                    autoScroll
                    defaultScrollPosition="start"
                >
                    <MessageScroller.Root className="relative h-72">
                        <MessageScroller.Viewport
                            aria-label="Creative editing conversation"
                            className="size-full scroll-fade-b overflow-y-auto overscroll-contain [--scroll-fade-b-size:1.25rem] data-pending-scroll:invisible"
                        >
                            <MessageScroller.Content className="flex min-h-full flex-col gap-3 p-5">
                                <MessageScroller.Item messageId="welcome">
                                    <p className="m-0 mt-1 text-sm text-neutral-900 dark:text-neutral-50">
                                        Your trail campaign has a first draft.
                                        What would you like to change?
                                    </p>
                                </MessageScroller.Item>
                                {edits.slice(0, sent).map((edit, index) => {
                                    const progress =
                                        index === sent - 1 ? streamed : null
                                    const reply = edit.reply.replace(
                                        '{ratio}',
                                        feedRatio ?? ''
                                    )

                                    return (
                                        <MessageScroller.Item
                                            key={edit.prompt}
                                            messageId={`edit-${index}`}
                                            scrollAnchor
                                            className="flex shrink-0 flex-col gap-3 pt-2"
                                        >
                                            <p className="m-0 max-w-[90%] self-end rounded-xl rounded-br-sm bg-neutral-100 px-3.5 py-2.5 text-sm text-neutral-900 motion-safe:animate-chat-message-in dark:bg-neutral-800 dark:text-neutral-50">
                                                <span className="sr-only">
                                                    You.{' '}
                                                </span>
                                                {edit.prompt.replace(
                                                    '{ratio}',
                                                    feedRatio ?? ''
                                                )}
                                            </p>
                                            <div>
                                                {progress === 0 ? (
                                                    <CreativeUpdateStatus />
                                                ) : (
                                                    <>
                                                        {edit.action && (
                                                            <details className="my-2 border-l border-solid border-black/10 pl-3 text-sm text-neutral-600 dark:border-white/10 dark:text-neutral-400">
                                                                <summary className="flex min-h-11 cursor-pointer items-center gap-2">
                                                                    <Check
                                                                        aria-hidden="true"
                                                                        className="size-4 shrink-0 text-neutral-900 dark:text-neutral-50"
                                                                    />
                                                                    {
                                                                        edit.action
                                                                    }
                                                                </summary>
                                                                <p className="m-0 pb-2">
                                                                    {edit.detail?.replace(
                                                                        '{ratio}',
                                                                        feedRatio ??
                                                                            ''
                                                                    )}
                                                                </p>
                                                            </details>
                                                        )}
                                                        <p
                                                            aria-hidden={
                                                                progress !==
                                                                null
                                                            }
                                                            className="m-0 text-sm text-neutral-900 dark:text-neutral-50"
                                                        >
                                                            {progress === null
                                                                ? reply
                                                                : reply.slice(
                                                                      0,
                                                                      progress
                                                                  )}
                                                        </p>
                                                        {progress === null && (
                                                            <span
                                                                role="status"
                                                                className="sr-only"
                                                            >
                                                                {reply}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </MessageScroller.Item>
                                    )
                                })}
                            </MessageScroller.Content>
                        </MessageScroller.Viewport>
                        <MessageScroller.Button
                            aria-label="Scroll to latest"
                            behavior={
                                window.matchMedia(
                                    '(prefers-reduced-motion: reduce)'
                                ).matches
                                    ? 'instant'
                                    : 'smooth'
                            }
                            className="absolute bottom-2 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-solid border-black/10 bg-white text-neutral-900 data-[active=false]:pointer-events-none data-[active=false]:translate-y-2 data-[active=false]:opacity-0 motion-safe:transition-[translate,opacity] dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-50"
                        >
                            <ArrowDown
                                aria-hidden="true"
                                className="size-4"
                            />
                        </MessageScroller.Button>
                    </MessageScroller.Root>
                </MessageScroller.Provider>
                <form
                    aria-label="Ad edit composer"
                    className="mx-5 mb-5 rounded-2xl bg-neutral-100 p-3 dark:bg-neutral-800"
                    onSubmit={(event) => {
                        event.preventDefault()
                        if (isStreaming || waitingForRatio) return
                        if (!nextEdit) {
                            restartDemo()
                            return
                        }
                        setToolNotice('')
                        setStreamed(sent === ratioQuestionIndex ? 1 : 0)
                        setSent((current) => current + 1)
                    }}
                >
                    {waitingForRatio && !isStreaming ? (
                        <>
                            <p className="m-0 text-sm text-neutral-900 dark:text-neutral-50">
                                Choose an aspect ratio below.
                            </p>
                            <div
                                role="group"
                                aria-label="Instagram aspect ratio"
                                className="mt-2 flex flex-wrap gap-2"
                            >
                                {feedRatios.map((ratio) => (
                                    <button
                                        key={ratio}
                                        type="button"
                                        className="h-6 w-12 rounded-full border border-solid border-black/15 bg-white px-3 text-sm hover:bg-black/5 dark:border-white/15 dark:bg-neutral-700 dark:hover:bg-white/10"
                                        onClick={() => {
                                            setFeedRatio(ratio)
                                            setToolNotice('')
                                            setStreamed(0)
                                            setSent((current) => current + 1)
                                        }}
                                    >
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <textarea
                            aria-label="Suggested ad edit"
                            className="block min-h-16 w-full resize-none bg-transparent font-[inherit] text-sm text-neutral-900 dark:text-neutral-50"
                            rows={3}
                            readOnly
                            value={
                                isStreaming
                                    ? ''
                                    : (nextEdit?.prompt ??
                                      'The revised ad is ready.')
                            }
                        />
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                        <details
                            className="relative"
                            onBlur={(event) => {
                                if (
                                    !event.currentTarget.contains(
                                        event.relatedTarget
                                    )
                                ) {
                                    event.currentTarget.open = false
                                }
                            }}
                            onKeyDown={(event) => {
                                if (
                                    event.key !== 'Escape' ||
                                    !event.currentTarget.open
                                )
                                    return
                                event.preventDefault()
                                event.currentTarget.open = false
                                event.currentTarget
                                    .querySelector('summary')
                                    ?.focus()
                            }}
                        >
                            <summary
                                aria-label="Composer tools"
                                className="grid size-8 cursor-pointer list-none place-items-center rounded-full border border-solid border-black/15 text-neutral-900 hover:bg-black/5 dark:border-white/15 dark:text-neutral-50 dark:hover:bg-white/10 [&::-webkit-details-marker]:hidden"
                            >
                                <Plus
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            </summary>
                            <div className="absolute bottom-full left-0 z-10 mb-1 w-max max-w-[calc(100vw-5rem)] rounded-2xl border border-solid border-black/15 bg-white p-1 text-neutral-900 shadow-lg dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-50">
                                {composerActions.map(
                                    ({ label, icon: Icon, notice }, index) => (
                                        <div
                                            key={label}
                                            className={
                                                index === 0
                                                    ? 'mb-1 border-b border-solid border-black/10 pb-1 dark:border-white/10'
                                                    : undefined
                                            }
                                        >
                                            <button
                                                type="button"
                                                className="flex min-h-8 w-full items-center gap-2 rounded-lg bg-transparent px-2 text-left text-sm hover:bg-neutral-100 focus-visible:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:bg-neutral-800"
                                                onClick={(event) => {
                                                    const menu =
                                                        event.currentTarget.closest(
                                                            'details'
                                                        )
                                                    if (menu) {
                                                        menu.open = false
                                                        menu
                                                            .querySelector(
                                                                'summary'
                                                            )
                                                            ?.focus()
                                                    }
                                                    setToolNotice(notice)
                                                }}
                                            >
                                                <Icon
                                                    aria-hidden="true"
                                                    className="size-4 shrink-0"
                                                />
                                                {label}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </details>
                        <button
                            type="submit"
                            aria-disabled={isStreaming || waitingForRatio}
                            aria-label={
                                isStreaming
                                    ? 'Sending'
                                    : nextEdit
                                      ? 'Send'
                                      : undefined
                            }
                            className={`inline-grid min-h-8 place-items-center rounded-full bg-violet-500 text-sm font-bold text-white aria-disabled:cursor-not-allowed aria-disabled:opacity-60 ${showSendIcon ? 'size-8' : 'px-4'}`}
                        >
                            {showSendIcon ? (
                                <ArrowUp
                                    aria-hidden="true"
                                    className="size-4"
                                />
                            ) : (
                                'Replay demo'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div className={studioArtworkLayout}>
                <div
                    className={`relative w-full overflow-hidden rounded-lg shadow-[0_1rem_2.5rem_#0006] ${previewRatio === '9:16' ? 'max-w-[82%]' : ''}`}
                    style={
                        previewRatio
                            ? { aspectRatio: previewRatio.replace(':', ' / ') }
                            : undefined
                    }
                >
                    <img
                        className={
                            previewRatio
                                ? 'absolute inset-0 size-full object-cover'
                                : 'h-auto w-full'
                        }
                        src={creative.src}
                        alt={creative.alt}
                        width={creative.width}
                        height={creative.height}
                    />
                    {streamed === 0 && (
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-10 bg-black/15"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent motion-safe:animate-artwork-shimmer motion-reduce:hidden" />
                        </div>
                    )}
                    {'showLogo' in creative && (
                        <svg
                            role="img"
                            aria-label="Trailbound logo"
                            className="absolute bottom-[7%] left-1/2 w-[36%] -translate-x-1/2 text-[#f7e8c9]"
                            viewBox="0 0 144 26"
                        >
                            <path
                                d="m1 22 10-16 6 9 4-5 8 12H1Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinejoin="round"
                            />
                            <text
                                x="37"
                                y="20"
                                fill="currentColor"
                                fontSize="16"
                                fontWeight="800"
                                letterSpacing="1"
                                textLength="103"
                                lengthAdjust="spacingAndGlyphs"
                            >
                                TRAILBOUND
                            </text>
                        </svg>
                    )}
                </div>
            </div>
            <figcaption className={studioCaptionLayout}>
                {studioCaption}{' '}
                <span role="status">{toolNotice || studioHint}</span>
            </figcaption>
        </figure>
    )
}
