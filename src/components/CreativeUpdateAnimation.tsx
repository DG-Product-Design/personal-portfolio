import { useEffect, useRef } from 'react'
import lottie from 'lottie-web/build/player/lottie_light'
import cubes from '../assets/animations/3x3-cube-loader.json'

export default function CreativeUpdateAnimation() {
    const animationContainer = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const container = animationContainer.current
        if (!container) return

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        )
        const animation = lottie.loadAnimation({
            container,
            renderer: 'svg',
            loop: true,
            autoplay: !reducedMotion.matches,
            animationData: structuredClone(cubes),
        })

        function updatePlayback() {
            if (reducedMotion.matches) animation.pause()
            else animation.play()
        }

        reducedMotion.addEventListener('change', updatePlayback)
        return () => {
            reducedMotion.removeEventListener('change', updatePlayback)
            animation.destroy()
        }
    }, [])

    return (
        <span
            ref={animationContainer}
            aria-hidden="true"
            className="size-10 shrink-0 motion-reduce:hidden"
        />
    )
}
