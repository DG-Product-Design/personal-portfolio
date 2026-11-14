import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useId } from 'react'
import giftCard from '../assets/img/case-studies/gifting/gift-card-clean.png'

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
}

const handTornMesh: MeshConfig = {
    amplitude: 34,
    columns: [0, 244, 526, 800],
    density: 9,
    rows: [0, 174, 358, 549],
    stagger: 135,
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

const handTornPeel = {
    duration: 285,
    origin: '0% 100%',
} as const

const createPieces = (config: MeshConfig): Piece[] => {
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

    return config.rows.slice(0, -1).flatMap((_, row) =>
        config.columns.slice(0, -1).map((__, column) => {
            const delay =
                (waveRanks.get(`${row}-${column}`) ?? 0) * (config.stagger / 2)

            return {
                centerX:
                    (config.columns[column] + config.columns[column + 1]) / 2,
                delay,
                ...handTornPeel,
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

const pieces = createPieces(handTornMesh)

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

export default function GiftWrapReveal() {
    const reactId = useId()
    const id = reactId.replace(/:/g, '')
    const wrapperArtworkClipId = `${id}-wrapper-artwork-clip`
    const wrapperPatternId = `${id}-wrapper-pattern`

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
            {pieces.map((piece, index) => (
                <HandTornPiece
                    key={`hand-torn-${index}`}
                    index={index}
                    piece={piece}
                    wrapperPatternId={wrapperPatternId}
                />
            ))}
        </svg>
    )
}
