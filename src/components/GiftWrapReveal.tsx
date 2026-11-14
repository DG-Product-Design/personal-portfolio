import { motion } from 'framer-motion'
import { useId } from 'react'
import giftCard from '../assets/img/case-studies/gifting/gift-card-clean.webp'

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

// Define the nine pieces in the SVG's 800 × 549 artwork coordinates. Keeping
// the mesh independent of screen size lets the same tears fit every card size.
const handTornMesh: MeshConfig = {
    amplitude: 34,
    columns: [0, 244, 526, 800],
    density: 9,
    rows: [0, 174, 358, 549],
    stagger: 135,
}

// Repeatable variation keeps the tears organic without changing their shape
// between server rendering, hydration, and replay.
const seededNoise = (seed: number, index: number) => {
    const value = Math.sin(seed * 91.731 + index * 47.293) * 43758.5453
    return (value - Math.floor(value)) * 2 - 1
}

// Outer edges stay straight. Expressing them as cubic segments lets the path
// builders handle the perimeter and torn interior edges in the same way.
const makeStraightBoundary = (start: Point, end: Point): Boundary => ({
    start,
    segments: [{ control1: start, control2: end, end }],
})

// Convert a Catmull–Rom spline through the sampled points into cubic Béziers.
// The neighboring points determine each tangent; the 1/6 factors preserve
// smooth joins, avoiding sharp zigzags along the torn-paper silhouette.
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

// Combine broad bends with smaller irregularities to suggest a hand-torn edge.
// Fixed endpoints let adjacent boundaries meet exactly at the mesh corners.
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

        // Reduce the sideways displacement near each endpoint so the tear
        // blends back into its corner instead of forming a large hook there.
        const edgeTaper = Math.sin(progress * Math.PI)
        const largeTear =
            Math.sin(progress * Math.PI * 3 + seed * 0.73) * amplitude * 0.42
        const smallTear = seededNoise(seed, index) * amplitude * 0.78
        const offset = (largeTear + smallTear) * edgeTaper
        // Vary spacing along the edge as well as across it to avoid an evenly
        // spaced wave pattern.
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

// Two decimals keep SVG path strings compact while retaining subpixel detail
// at the card's rendered size.
const point = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`

// Serialize an edge in its stored direction: left-to-right or top-to-bottom.
const forwardCommands = (boundary: Boundary) =>
    boundary.segments
        .map(
            ({ control1, control2, end }) =>
                `C ${point(control1)} ${point(control2)} ${point(end)}`
        )
        .join(' ')

// Traverse the exact same edge backward, swapping Bézier controls as well as
// segment order. Reusing its geometry prevents mismatched seams between pieces.
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

// Walk clockwise around a piece. Bottom and left edges must run backward to
// close the outline without changing the shared curves.
const createPiecePath = (
    top: Boundary,
    right: Boundary,
    bottom: Boundary,
    left: Boundary
) =>
    `M ${point(top.start)} ${forwardCommands(top)} ${forwardCommands(right)} ${reverseCommands(bottom)} ${reverseCommands(left)} Z`

// A half-second peel leaves enough visible motion before fading on slower
// devices. The lower-left pivot makes each piece lift away like a paper flap.
const handTornPeel = {
    duration: 500,
    origin: '0% 100%',
} as const

// Build every boundary once, then share it between neighboring pieces. The
// assembled wrapper stays continuous even though each piece moves independently.
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

    // Peel from the upper-right toward the lower-left. Ranking individual
    // pieces, including ties on a diagonal, avoids whole rows vanishing at once.
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

// Geometry is static: calculate it once per module load, outside React renders
// and animation frames.
const pieces = createPieces(handTornMesh)

// Let the card's entrance settle before tearing starts. Artwork decoding is
// handled by GiftingExperienceDemo before the demo can start; this is pacing,
// not an image-loading workaround. Keep its reveal-ready timing in sync when
// changing this delay, the stagger, or the peel duration.
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
    // Small, deterministic differences keep the pieces from moving in lockstep;
    // opposite Y rotations make the left and right sides peel outward.
    const variation = (index % 3) - 1
    const rotateYDirection = piece.centerX < 400 ? -1 : 1

    return (
        <motion.g
            initial={{
                // Start fully assembled and opaque throughout each piece's delay.
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                opacity: 1,
            }}
            animate={{
                // One timeline carries the tug, lift, and fall instead of chaining
                // short springs. Only transforms and opacity change since animated
                // drop shadows added rendering cost during the confetti burst.
                x: [0, -2, -18, -68 + variation * 5],
                y: [0, 2, 20, 118 + Math.abs(variation) * 12],
                rotateX: [0, 0, 10, 28],
                rotateY: [0, 0, 12 * rotateYDirection, 32 * rotateYDirection],
                rotateZ: [
                    0,
                    -1 + variation * 0.25,
                    -4 + variation * 0.6,
                    -12 + variation * 2.5,
                ],
                opacity: [1, 1, 1, 0],
            }}
            transition={{
                duration: piece.duration / 1000,
                delay: (piece.delay + TEAR_START_DELAY_MS) / 1000,
                // Spend most of the duration on the visible fall. Linear segments
                // keep movement continuous without settling between keyframes.
                times: [0, 0.16, 0.42, 1],
                ease: 'linear',
                opacity: {
                    // Hold the paper opaque for 65% of the peel so its movement
                    // reads clearly before it fades, rather than simply vanishing.
                    duration: piece.duration / 1000,
                    delay: (piece.delay + TEAR_START_DELAY_MS) / 1000,
                    times: [0, 0.16, 0.65, 1],
                    ease: 'easeIn',
                },
            }}
            className="will-change-[transform,opacity] [transform-box:fill-box] motion-reduce:hidden"
            style={{
                // fill-box makes the pivot relative to this piece, not the entire
                // SVG. Perspective gives the X/Y rotations a modest sense of depth.
                transformOrigin: piece.origin,
                transformPerspective: 1120,
            }}
        >
            <path
                d={piece.path}
                fill={`url(#${wrapperPatternId})`}
                stroke={`url(#${wrapperPatternId})`}
                // Slightly overlap the shared edges to cover seams
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
        </motion.g>
    )
}

export default function GiftWrapReveal() {
    // Scope SVG paint/clip references to this instance and keep IDs consistent
    // across server rendering and hydration.
    const reactId = useId()
    const id = reactId.replace(/:/g, '')
    const wrapperArtworkClipId = `${id}-wrapper-artwork-clip`
    const wrapperPatternId = `${id}-wrapper-pattern`

    // Overscan hides slivers of the white card at mismatched rounded corners;
    // the taller mobile card needs a little more coverage than desktop.
    return (
        <svg
            className="pointer-events-none absolute inset-0 z-3 size-full [transform:scale(1.01)] overflow-visible [perspective:70rem] motion-reduce:hidden compact:[transform:scale(1.02)]"
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
                {/* Use one artwork coordinate system for every piece so the
                    ribbon and texture stay aligned across the assembled mesh. */}
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
