type ImageProps = {
    src: string
    alt: string
    width: number
    height: number
}

export default function PanningImage(props: ImageProps) {
    return (
        <div
            className="[container-type:size] max-h-[min(65svh,40rem)] w-full overflow-clip rounded-lg motion-reduce:max-h-none"
            style={{ aspectRatio: `${props.width} / ${props.height}` }}
        >
            <img
                {...props}
                className="h-auto w-full motion-safe:animate-image-pan"
            />
        </div>
    )
}
