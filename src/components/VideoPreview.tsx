import { useEffect, useRef, useState } from 'react'
import ImageFade from './ImageFade'

type VideoPreviewProps = {
    src: string
    poster: string
    posterWidth: number
    posterHeight: number
    previewCrop: { x: number; y: number; width: number; height: number }
    title: string
    alt: string
}

export default function VideoPreview({
    src,
    poster,
    posterWidth,
    posterHeight,
    previewCrop,
    title,
    alt,
}: VideoPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [requested, setRequested] = useState(false)
    const [ready, setReady] = useState(false)
    const [failed, setFailed] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(true)
    const loading = requested && !ready && !failed

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => {
            setReducedMotion(preference.matches)
            if (preference.matches) videoRef.current?.pause()
        }
        update()
        preference.addEventListener('change', update)
        return () => preference.removeEventListener('change', update)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setRequested(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )
        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden rounded-lg bg-[#171228]"
            aria-label={title}
            aria-busy={loading}
        >
            <div
                aria-hidden={ready}
                className={`transition-opacity duration-300 motion-reduce:transition-none ${ready ? 'opacity-0' : 'opacity-100'}`}
            >
                <ImageFade
                    src={poster}
                    alt={alt}
                    width={previewCrop.width}
                    height={previewCrop.height}
                    loading="lazy"
                    style={{
                        width: `${(posterWidth / previewCrop.width) * 100}%`,
                        height: `${(posterHeight / previewCrop.height) * 100}%`,
                        maxWidth: 'none',
                        left: `${(-previewCrop.x / previewCrop.width) * 100}%`,
                        top: `${(-previewCrop.y / previewCrop.height) * 100}%`,
                    }}
                />
            </div>
            <video
                ref={videoRef}
                src={requested ? src : undefined}
                aria-label={title}
                aria-hidden={!ready}
                tabIndex={ready ? 0 : -1}
                className={`absolute inset-0 size-full object-contain transition-opacity duration-300 motion-reduce:transition-none ${ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                preload="auto"
                muted
                loop
                playsInline
                controls
                autoPlay={!reducedMotion}
                onCanPlay={() => setReady(true)}
                onError={() => {
                    setReady(false)
                    setFailed(true)
                }}
            />
            {loading && (
                <div
                    role="status"
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[#171228] to-transparent pt-4"
                >
                    <span className="mb-1 block px-2 text-left text-[10px] leading-none text-ink motion-safe:animate-video-loading-label">
                        Loading...
                    </span>
                    <div className="h-0.5 overflow-hidden bg-violet/20">
                        <div className="h-full w-1/3 bg-violet motion-safe:animate-video-loading-bar" />
                    </div>
                </div>
            )}
            {failed && (
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-[#171228f2] px-3 py-2 text-xs text-ink">
                    <span role="status">Video couldn’t load.</span>
                    <button
                        type="button"
                        className="rounded bg-transparent px-2 py-1 text-violet underline"
                        onClick={() => {
                            setFailed(false)
                            videoRef.current?.load()
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}
        </div>
    )
}
