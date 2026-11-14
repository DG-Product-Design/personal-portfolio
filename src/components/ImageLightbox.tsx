import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ImageFade from './ImageFade'

type ImageLightboxProps = {
    alt: string
    fullSrc: string
    height: number
    loading?: 'eager' | 'lazy'
    src: string
    title: string
    width: number
}

export default function ImageLightbox({
    alt,
    fullSrc,
    height,
    loading = 'lazy',
    src,
    title,
    width,
}: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const openerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const opener = openerRef.current
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeButtonRef.current?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false)
            if (event.key !== 'Tab') return
            event.preventDefault()
            closeButtonRef.current?.focus()
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
            opener?.focus()
        }
    }, [isOpen])

    return (
        <>
            <button
                ref={openerRef}
                className="group relative block w-full cursor-zoom-in rounded-lg bg-transparent p-0 text-left focus-visible:outline-offset-4"
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open ${title} at full resolution`}
                onClick={() => setIsOpen(true)}
            >
                <ImageFade
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={loading}
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid place-items-center rounded-lg opacity-0 backdrop-blur-[3px] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                >
                    <span className="grid size-14 scale-95 place-items-center rounded-full border border-solid border-violet/70 bg-[#121212e8] text-violet shadow-[0_1rem_2.5rem_#0008] transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none">
                        <Search className="size-6" />
                    </span>
                </span>
            </button>

            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-100 grid bg-[#080609f5] backdrop-blur-md"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title}, full-resolution image`}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setIsOpen(false)
                            }
                        }}
                    >
                        <button
                            ref={closeButtonRef}
                            className="fixed top-4 right-4 z-2 grid size-12 place-items-center rounded-full border border-solid border-rule bg-[#121212] text-ink shadow-[0_.75rem_2rem_#0009] hover:text-violet [&>svg]:size-5"
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            <X aria-hidden="true" />
                            <span className="sr-only">
                                Close full-size image
                            </span>
                        </button>
                        <div className="pointer-events-none grid min-h-0 place-items-center overflow-auto p-6 pt-20 pb-18">
                            <img
                                className="max-h-[calc(100vh-8rem)] max-w-[calc(100vw-3rem)] object-contain shadow-[0_2rem_6rem_#000b]"
                                src={fullSrc}
                                alt={alt}
                                width={width}
                                height={height}
                            />
                        </div>
                        <p className="pointer-events-none fixed bottom-5 left-1/2 m-0 max-w-[calc(100vw-3rem)] -translate-x-1/2 text-center text-sm text-muted">
                            {title}
                        </p>
                    </div>,
                    document.body
                )}
        </>
    )
}
