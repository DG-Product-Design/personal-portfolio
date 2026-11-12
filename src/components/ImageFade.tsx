import { useCallback, useState } from 'react'
import type { ImgHTMLAttributes, SyntheticEvent } from 'react'

type ImageFadeProps = Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'className' | 'height' | 'src' | 'width'
> & {
    className?: string
    bgClass?: string
    height: number
    imageClassName?: string
    src: string
    width: number
}

export default function ImageFade({
    alt,
    className,
    bgClass,
    height,
    imageClassName,
    onError,
    onLoad,
    src,
    width,
    ...imageProps
}: ImageFadeProps) {
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
    const isLoaded = loadedSrc === src
    const imageRef = useCallback(
        (image: HTMLImageElement | null) => {
            if (image?.complete && image.naturalWidth > 0) {
                setLoadedSrc(src)
            }
        },
        [src]
    )

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
        setLoadedSrc(src)
        onLoad?.(event)
    }

    const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
        setLoadedSrc(src)
        onError?.(event)
    }

    return (
        <div
            className={`relative overflow-hidden rounded-lg ${bgClass ?? 'bg-[#242226]'} ${className ?? ''}`}
            style={{ aspectRatio: `${width} / ${height}` }}
        >
            <div
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100 motion-safe:animate-pulse'} ${bgClass ?? 'bg-[#242226]'}`}
            />
            <img
                {...imageProps}
                ref={imageRef}
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={handleError}
                className={`absolute top-0 left-0 h-auto w-full transition-opacity duration-500 ease-out motion-reduce:transition-none ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName ?? ''}`}
            />
        </div>
    )
}
