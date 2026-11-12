import ImageFade from './ImageFade'

type ImageProps = {
    src: string
    alt: string
    width: number
    height: number
}

export default function PanningImage(props: ImageProps) {
    return (
        <ImageFade
            {...props}
            bgClass="bg-transparent"
            className="[container-type:size] max-h-[min(65svh,40rem)] w-full overflow-clip rounded-lg motion-reduce:max-h-none"
            imageClassName="motion-safe:animate-image-pan"
        />
    )
}
