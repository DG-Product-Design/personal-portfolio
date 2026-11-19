/* eslint tailwindcss/no-custom-classname: ["warn", { "whitelist": ["dg-glow-.*"] }] -- Component styles live in GlowBorder.css. */
import {
    useEffect,
    useRef,
    type CSSProperties,
    type HTMLAttributes,
    type RefObject,
} from 'react'
import './GlowBorder.css'

export interface GlowOptions {
    /** Auto follows the input device; orbit previews the touch animation on any device. */
    mode?: 'auto' | 'orbit'
    proximity?: number
    spread?: number
    blur?: number
    idleOpacity?: number
    disabled?: boolean
}

/** Pointer-angle/proximity behavior adapted from marketplace glowStyleHelpers. */
function useGlowStyles(
    ref: RefObject<HTMLElement | null>,
    {
        proximity = 80,
        spread = 90,
        disabled = false,
        mode = 'auto',
    }: GlowOptions = {}
) {
    useEffect(() => {
        const root = ref.current
        if (!root || disabled || mode === 'orbit') return
        const reduced = matchMedia('(prefers-reduced-motion: reduce)'),
            coarse = matchMedia('(hover: none)')
        let frame = 0
        let pointer: { x: number; y: number } | null = null
        const elements = () =>
            Array.from(root.querySelectorAll<HTMLElement>('[data-glow-border]'))
        // Keep the last angle while opacity fades back to idle.
        function deactivate() {
            cancelAnimationFrame(frame)
            frame = 0
            pointer = null
            for (const el of elements()) {
                el.style.removeProperty('--dg-glow-opacity')
            }
        }
        function reset() {
            deactivate()
            for (const el of elements()) {
                el.style.removeProperty('--dg-glow-angle')
            }
        }
        function update() {
            frame = 0
            if (!pointer || reduced.matches || coarse.matches) return
            for (const el of elements()) {
                const b = el.getBoundingClientRect()
                const near =
                    pointer.x >= b.left - proximity &&
                    pointer.x <= b.right + proximity &&
                    pointer.y >= b.top - proximity &&
                    pointer.y <= b.bottom + proximity
                el.style.setProperty(
                    '--dg-glow-opacity',
                    near ? '1' : 'var(--dg-glow-idle)'
                )
                if (near) {
                    const angle =
                        (Math.atan2(
                            pointer.y - (b.top + b.height / 2),
                            pointer.x - (b.left + b.width / 2)
                        ) *
                            180) /
                            Math.PI +
                        90 -
                        spread / 2
                    el.style.setProperty('--dg-glow-angle', `${angle}deg`)
                }
            }
        }

        function move(event: PointerEvent) {
            if (
                event.pointerType === 'touch' ||
                reduced.matches ||
                coarse.matches
            )
                return
            pointer = { x: event.clientX, y: event.clientY }
            if (!frame) frame = requestAnimationFrame(update)
        }

        root.addEventListener('pointermove', move, { passive: true })
        root.addEventListener('pointerleave', deactivate)
        reduced.addEventListener('change', reset)
        coarse.addEventListener('change', reset)

        return () => {
            reset()
            root.removeEventListener('pointermove', move)
            root.removeEventListener('pointerleave', deactivate)
            reduced.removeEventListener('change', reset)
            coarse.removeEventListener('change', reset)
        }
    }, [ref, proximity, spread, disabled, mode])
}

export function GlowGroup({
    mode = 'auto',
    proximity = 80,
    spread = 90,
    blur = 10,
    idleOpacity = 0,
    disabled = false,
    className,
    style,
    ...props
}: HTMLAttributes<HTMLDivElement> & GlowOptions) {
    const ref = useRef<HTMLDivElement>(null)
    useGlowStyles(ref, { proximity, spread, disabled, mode })
    return (
        <div
            {...props}
            ref={ref}
            data-glow-disabled={disabled || undefined}
            data-glow-mode={mode}
            className={`dg-glow-group ${className ?? ''}`}
            style={
                {
                    '--dg-glow-spread': `${spread}deg`,
                    '--dg-glow-blur': `${blur}px`,
                    '--dg-glow-idle': idleOpacity,
                    ...style,
                } as CSSProperties
            }
        />
    )
}

export function GlowBorder({
    className,
    children,
    style,
    radius = 16,
    borderWidth = 1.5,
    ...props
}: HTMLAttributes<HTMLDivElement> & { radius?: number; borderWidth?: number }) {
    return (
        <div
            {...props}
            data-glow-border
            className={`dg-glow-border ${className ?? ''}`}
            style={
                {
                    '--dg-glow-radius': `${radius}px`,
                    '--dg-glow-width': `${borderWidth}px`,
                    ...style,
                } as CSSProperties
            }
        >
            <span
                aria-hidden
                className="dg-glow-halo"
            />
            <div className="dg-glow-content">{children}</div>
        </div>
    )
}
