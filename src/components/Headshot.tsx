import { useId, useRef, type PointerEvent, type ReactNode } from 'react'
import portrait from '../assets/img/david-a-george-headshot.jpg'

export default function Headshot({ children }: { children?: ReactNode }) {
    const clipId = useId()
    const clipStyle = { clipPath: `url("#${clipId}")` }
    const headshotFrame = useRef<HTMLDivElement>(null)

    function tiltHeadshot(event: PointerEvent<HTMLElement>) {
        const frame = headshotFrame.current
        if (
            !frame ||
            event.pointerType !== 'mouse' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return
        }

        const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect()
        const horizontal = (event.clientX - left) / width - 0.5
        const vertical = (event.clientY - top) / height - 0.5
        const tiltRange = 15

        frame.style.transform = `perspective(${width}px) rotateX(${vertical * tiltRange}deg) rotateY(${-horizontal * tiltRange}deg) translateZ(3rem)`
    }

    function resetHeadshot(event: PointerEvent<HTMLElement>) {
        if (headshotFrame.current?.style.transform) {
            headshotFrame.current.style.transform = `perspective(${event.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg) translateZ(0)`
        }
    }

    return (
        <figure
            className="m-0 w-[min(75%,17rem)] justify-self-center md:w-full md:max-w-72"
            onPointerMove={tiltHeadshot}
            onPointerLeave={resetHeadshot}
            onPointerCancel={resetHeadshot}
        >
            <svg
                aria-hidden="true"
                className="absolute size-0"
            >
                <defs>
                    <clipPath
                        id={clipId}
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M .5 0 C .88 0 1 .12 1 .5 S .88 1 .5 1 S 0 .88 0 .5 S .12 0 .5 0 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div
                ref={headshotFrame}
                className="pointer-events-none -rotate-3 drop-shadow-[.5rem_.55rem_0_#363047] motion-safe:transition-transform motion-safe:duration-100 motion-safe:ease-out"
            >
                <div
                    className="bg-violet p-3"
                    style={clipStyle}
                >
                    <div
                        className="relative"
                        style={clipStyle}
                    >
                        <img
                            src={portrait}
                            alt="David A. George"
                            width={540}
                            height={540}
                            className="h-auto w-full"
                        />
                        {children}
                    </div>
                </div>
            </div>
        </figure>
    )
}
