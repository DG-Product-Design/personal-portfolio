import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useId } from 'react'
import type { CSSProperties } from 'react'
import giftCard from '../assets/img/case-studies/gifting/gift-card-clean.png'
import type { GiftRevealVariant } from './giftRevealOptions'

type Point = readonly [number, number]
type CurveSegment = { control1: Point; control2: Point; end: Point }
type Boundary = { start: Point; segments: CurveSegment[] }
type MeshConfig = {
    amplitude: number
    columns: number[]
    density: number
    rows: number[]
    stagger: number
}
type Piece = {
    centerX: number
    delay: number
    duration: number
    origin: string
    path: string
    rotateX: string
    rotateY: string
    rotateZ: string
    x: string
    y: string
}

const meshByVariant: Record<GiftRevealVariant, MeshConfig> = {
    seam: {
        amplitude: 34,
        columns: [0, 244, 526, 800],
        density: 9,
        rows: [0, 174, 358, 549],
        stagger: 135,
    },
    corners: {
        amplitude: 48,
        columns: [0, 286, 554, 800],
        density: 11,
        rows: [0, 204, 367, 549],
        stagger: 510,
    },
    cascade: {
        amplitude: 20,
        columns: [0, 191, 402, 611, 800],
        density: 13,
        rows: [0, 132, 276, 414, 549],
        stagger: 510,
    },
}

const seededNoise = (seed: number, index: number) => {
    const value = Math.sin(seed * 91.731 + index * 47.293) * 43758.5453
    return (value - Math.floor(value)) * 2 - 1
}

const makeStraightBoundary = (start: Point, end: Point): Boundary => ({
    start,
    segments: [{ control1: start, control2: end, end }],
})

const makeCurvedBoundary = (points: Point[]): Boundary => ({
    start: points[0],
    segments: points.slice(0, -1).map((current, index) => {
        const previous = points[index - 1] ?? current
        const next = points[index + 1]
        const afterNext = points[index + 2] ?? next

        return {
            control1: [
                current[0] + (next[0] - previous[0]) / 6,
                current[1] + (next[1] - previous[1]) / 6,
            ],
            control2: [
                next[0] - (afterNext[0] - current[0]) / 6,
                next[1] - (afterNext[1] - current[1]) / 6,
            ],
            end: next,
        }
    }),
})

const makeOrganicBoundary = (
    start: Point,
    end: Point,
    amplitude: number,
    density: number,
    seed: number
) => {
    const horizontal = Math.abs(end[0] - start[0]) > Math.abs(end[1] - start[1])
    const points: Point[] = Array.from({ length: density + 1 }, (_, index) => {
        const progress = index / density
        if (index === 0) return start
        if (index === density) return end

        const edgeTaper = Math.sin(progress * Math.PI)
        const largeTear =
            Math.sin(progress * Math.PI * 3 + seed * 0.73) * amplitude * 0.42
        const smallTear = seededNoise(seed, index) * amplitude * 0.78
        const offset = (largeTear + smallTear) * edgeTaper
        const alongJitter =
            seededNoise(seed + 17, index) *
            (horizontal ? end[0] - start[0] : end[1] - start[1]) *
            0.018

        if (horizontal) {
            return [
                start[0] + (end[0] - start[0]) * progress + alongJitter,
                start[1] + offset,
            ]
        }

        return [
            start[0] + offset,
            start[1] + (end[1] - start[1]) * progress + alongJitter,
        ]
    })

    return makeCurvedBoundary(points)
}

const point = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`

const forwardCommands = (boundary: Boundary) =>
    boundary.segments
        .map(
            ({ control1, control2, end }) =>
                `C ${point(control1)} ${point(control2)} ${point(end)}`
        )
        .join(' ')

const reverseCommands = (boundary: Boundary) =>
    [...boundary.segments]
        .reverse()
        .map((segment, reverseIndex) => {
            const originalIndex = boundary.segments.length - 1 - reverseIndex
            const end =
                originalIndex === 0
                    ? boundary.start
                    : boundary.segments[originalIndex - 1].end
            return `C ${point(segment.control2)} ${point(segment.control1)} ${point(end)}`
        })
        .join(' ')

const createPiecePath = (
    top: Boundary,
    right: Boundary,
    bottom: Boundary,
    left: Boundary
) =>
    `M ${point(top.start)} ${forwardCommands(top)} ${forwardCommands(right)} ${reverseCommands(bottom)} ${reverseCommands(left)} Z`

const directionalPeel = {
    duration: 560,
    origin: '0% 100%',
    rotateX: '24deg',
    rotateY: '-32deg',
    rotateZ: '-6deg',
    x: '-20%',
    y: '18%',
} as const

const handTornPeel = {
    duration: 285,
    origin: '0% 100%',
    rotateX: '0deg',
    rotateY: '-24deg',
    rotateZ: '-5deg',
    x: '-24%',
    y: '54%',
} as const

const createPieces = (
    config: MeshConfig,
    peel: Omit<Piece, 'centerX' | 'delay' | 'path'> = directionalPeel,
    continuousWave = false
): Piece[] => {
    const columnCount = config.columns.length - 1

    const horizontalEdges = config.rows.map((y, row) =>
        config.columns.slice(0, -1).map((x, column) => {
            const start: Point = [x, y]
            const end: Point = [config.columns[column + 1], y]
            return row === 0 || row === config.rows.length - 1
                ? makeStraightBoundary(start, end)
                : makeOrganicBoundary(
                      start,
                      end,
                      config.amplitude,
                      config.density,
                      row * 31 + column * 7 + 3
                  )
        })
    )

    const verticalEdges = config.rows.slice(0, -1).map((y, row) =>
        config.columns.map((x, column) => {
            const start: Point = [x, y]
            const end: Point = [x, config.rows[row + 1]]
            return column === 0 || column === columnCount
                ? makeStraightBoundary(start, end)
                : makeOrganicBoundary(
                      start,
                      end,
                      config.amplitude,
                      config.density,
                      column * 43 + row * 11 + 5
                  )
        })
    )

    const waveRanks = new Map<string, number>()
    if (continuousWave) {
        const positions = config.rows.slice(0, -1).flatMap((_, row) =>
            config.columns.slice(0, -1).map((__, column) => ({
                column,
                diagonalOrder: row + (columnCount - 1 - column),
                row,
            }))
        )
        positions
            .sort((a, b) => a.diagonalOrder - b.diagonalOrder || a.row - b.row)
            .forEach(({ column, row }, rank) =>
                waveRanks.set(`${row}-${column}`, rank)
            )
    }

    return config.rows.slice(0, -1).flatMap((_, row) =>
        config.columns.slice(0, -1).map((__, column) => {
            const diagonalOrder = row + (columnCount - 1 - column)
            const delay = continuousWave
                ? (waveRanks.get(`${row}-${column}`) ?? 0) *
                  (config.stagger / 2)
                : diagonalOrder * config.stagger

            return {
                centerX:
                    (config.columns[column] + config.columns[column + 1]) / 2,
                delay,
                ...peel,
                path: createPiecePath(
                    horizontalEdges[row][column],
                    verticalEdges[row][column + 1],
                    horizontalEdges[row + 1][column],
                    verticalEdges[row][column]
                ),
            }
        })
    )
}

const horizontalTearY = (
    x: number,
    baseY: number,
    amplitude: number,
    seed: number
) => {
    const taper = Math.sin((x / 800) * Math.PI)
    return (
        baseY +
        taper *
            amplitude *
            (Math.sin(x / 54 + seed * 0.83) * 0.48 +
                Math.sin(x / 23 + seed * 1.37) * 0.31 +
                Math.sin(x / 10.5 + seed * 0.41) * 0.14)
    )
}

const makeHorizontalTearBoundary = (
    startX: number,
    endX: number,
    baseY: number,
    amplitude: number,
    seed: number
): Boundary => {
    if (baseY === 0 || baseY === 549) {
        return makeStraightBoundary([startX, baseY], [endX, baseY])
    }

    const segmentCount = Math.max(1, Math.ceil((endX - startX) / 34))
    const points: Point[] = Array.from(
        { length: segmentCount + 1 },
        (_, index) => {
            const x = startX + ((endX - startX) * index) / segmentCount
            return [x, horizontalTearY(x, baseY, amplitude, seed)]
        }
    )

    return makeCurvedBoundary(points)
}

const createStaggeredPieces = (): Piece[] => {
    const rowDefinitions = [
        {
            top: [0, 246, 536, 800],
            bottom: [0, 208, 516, 800],
        },
        {
            top: [0, 164, 372, 612, 800],
            bottom: [0, 196, 418, 652, 800],
        },
        {
            top: [0, 292, 566, 800],
            bottom: [0, 258, 592, 800],
        },
    ]
    const rows = [0, 188, 374, 549]
    const seamSeeds = [0, 17, 29, 0]
    const seamAmplitudes = [0, 34, 29, 0]

    const stagedPieces = rowDefinitions.flatMap((definition, row) => {
        const verticalEdges = definition.top.map((topX, edge) => {
            const bottomX = definition.bottom[edge]
            const start: Point = [
                topX,
                horizontalTearY(
                    topX,
                    rows[row],
                    seamAmplitudes[row],
                    seamSeeds[row]
                ),
            ]
            const end: Point = [
                bottomX,
                horizontalTearY(
                    bottomX,
                    rows[row + 1],
                    seamAmplitudes[row + 1],
                    seamSeeds[row + 1]
                ),
            ]

            return edge === 0 || edge === definition.top.length - 1
                ? makeStraightBoundary(start, end)
                : makeOrganicBoundary(start, end, 23, 8, row * 37 + edge * 13)
        })

        return definition.top.slice(0, -1).map((topX, column) => {
            const topEndX = definition.top[column + 1]
            const bottomX = definition.bottom[column]
            const bottomEndX = definition.bottom[column + 1]
            const diagonalLevel = row + (definition.top.length - 2 - column)

            return {
                centerX: (topX + topEndX + bottomX + bottomEndX) / 4,
                delay: diagonalLevel * 510,
                ...directionalPeel,
                path: createPiecePath(
                    makeHorizontalTearBoundary(
                        topX,
                        topEndX,
                        rows[row],
                        seamAmplitudes[row],
                        seamSeeds[row]
                    ),
                    verticalEdges[column + 1],
                    makeHorizontalTearBoundary(
                        bottomX,
                        bottomEndX,
                        rows[row + 1],
                        seamAmplitudes[row + 1],
                        seamSeeds[row + 1]
                    ),
                    verticalEdges[column]
                ),
            }
        })
    })

    return stagedPieces
}

const piecesByVariant: Record<GiftRevealVariant, Piece[]> = {
    seam: createPieces(meshByVariant.seam, handTornPeel, true),
    corners: createStaggeredPieces(),
    cascade: createPieces(meshByVariant.cascade),
}

type PieceStyle = CSSProperties & {
    '--piece-delay': string
    '--piece-duration': string
    '--piece-rotate-x': string
    '--piece-rotate-y': string
    '--piece-rotate-z': string
    '--piece-x': string
    '--piece-y': string
}

const TEAR_START_DELAY_MS = 1000

function HandTornPiece({
    index,
    piece,
    wrapperPatternId,
}: {
    index: number
    piece: Piece
    wrapperPatternId: string
}) {
    const controls = useAnimationControls()

    useEffect(() => {
        const totalDuration = piece.duration / 1000
        const variation = (index % 3) - 1
        const delay = (piece.delay + TEAR_START_DELAY_MS) / 1000
        const rotateYDirection = piece.centerX < 400 ? -1 : 1

        const run = async () => {
            await controls.start({
                x: -2,
                y: 2,
                rotateX: 0,
                rotateY: 0,
                rotateZ: -1 + variation * 0.25,
                transition: {
                    type: 'spring',
                    duration: totalDuration * 0.28,
                    bounce: 0.04,
                    delay,
                },
            })
            await controls.start({
                x: -18,
                y: 20,
                rotateX: 10,
                rotateY: 12 * rotateYDirection,
                rotateZ: -4 + variation * 0.6,
                filter: 'drop-shadow(0.3rem 0.55rem 0.45rem #4b001c55)',
                transition: {
                    type: 'spring',
                    duration: totalDuration * 0.22,
                    bounce: 0.12,
                },
            })
            await controls.start({
                x: -68 + variation * 5,
                y: 118 + Math.abs(variation) * 12,
                rotateX: 28,
                rotateY: 32 * rotateYDirection,
                rotateZ: -12 + variation * 2.5,
                opacity: 0,
                filter: 'drop-shadow(0 1.5rem 1.25rem #16002466)',
                transition: {
                    default: {
                        type: 'spring',
                        duration: totalDuration * 0.5,
                        bounce: 0.06,
                    },
                    opacity: {
                        duration: totalDuration * 0.32,
                        delay: totalDuration * 0.18,
                        ease: [0.55, 0.05, 0.9, 0.35],
                    },
                },
            })
        }

        void run()
        return () => controls.stop()
    }, [controls, index, piece.centerX, piece.delay, piece.duration])

    return (
        <motion.g
            initial={{
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                opacity: 1,
                filter: 'drop-shadow(0 0 0 transparent)',
            }}
            animate={controls}
            className="will-change-[transform,opacity,filter] [transform-box:fill-box] motion-reduce:hidden"
            style={{
                transformOrigin: piece.origin,
                transformPerspective: 1120,
            }}
        >
            <path
                d={piece.path}
                fill={`url(#${wrapperPatternId})`}
                stroke={`url(#${wrapperPatternId})`}
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
        </motion.g>
    )
}

export default function GiftWrapReveal({
    variant,
}: {
    variant: GiftRevealVariant
}) {
    const reactId = useId()
    const id = reactId.replace(/:/g, '')
    const wrapperArtworkClipId = `${id}-wrapper-artwork-clip`
    const wrapperPatternId = `${id}-wrapper-pattern`
    const pieces = piecesByVariant[variant]

    return (
        <svg
            className="pointer-events-none absolute inset-0 z-3 size-full [transform:scale(1.01)] overflow-visible [perspective:70rem] motion-reduce:hidden"
            viewBox="0 0 800 549"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <clipPath
                    id={wrapperArtworkClipId}
                    clipPathUnits="userSpaceOnUse"
                >
                    <rect
                        x="2"
                        y="2"
                        width="804"
                        height="553"
                        rx="40"
                        ry="40"
                    />
                    <rect
                        x="151"
                        y="2"
                        width="68"
                        height="553"
                    />
                </clipPath>
                <pattern
                    id={wrapperPatternId}
                    x="-4"
                    y="-4"
                    width="808"
                    height="557"
                    patternUnits="userSpaceOnUse"
                >
                    <image
                        href={giftCard}
                        x="-4"
                        y="-4"
                        width="816"
                        height="565"
                        preserveAspectRatio="none"
                        clipPath={`url(#${wrapperArtworkClipId})`}
                    />
                </pattern>
                {pieces.map((piece, index) => (
                    <clipPath
                        key={`${id}-clip-${index}`}
                        id={`${id}-clip-${index}`}
                        clipPathUnits="userSpaceOnUse"
                    >
                        <path d={piece.path} />
                    </clipPath>
                ))}
            </defs>
            {pieces.map((piece, index) => {
                const clipPathId = `${id}-clip-${index}`

                return variant === 'seam' ? (
                    <HandTornPiece
                        key={`${variant}-${index}`}
                        index={index}
                        piece={piece}
                        wrapperPatternId={wrapperPatternId}
                    />
                ) : (
                    <g
                        key={`${variant}-${index}`}
                        clipPath={`url(#${clipPathId})`}
                        className="animate-[gift-wrapper-peel_var(--piece-duration)_cubic-bezier(.55,.05,.9,.35)_var(--piece-delay)_both] will-change-[transform,opacity,filter] [transform-box:fill-box]"
                        style={
                            {
                                '--piece-delay': `${piece.delay + TEAR_START_DELAY_MS}ms`,
                                '--piece-duration': `${piece.duration}ms`,
                                '--piece-rotate-x': piece.rotateX,
                                '--piece-rotate-y': piece.rotateY,
                                '--piece-rotate-z': piece.rotateZ,
                                '--piece-x': piece.x,
                                '--piece-y': piece.y,
                                transformOrigin: piece.origin,
                            } as PieceStyle
                        }
                    >
                        <image
                            href={giftCard}
                            x="-10"
                            y="-10"
                            width="820"
                            height="569"
                            preserveAspectRatio="none"
                        />
                    </g>
                )
            })}
        </svg>
    )
}
