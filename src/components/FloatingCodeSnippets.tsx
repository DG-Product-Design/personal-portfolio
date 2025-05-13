import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const codeElements = [
    // HTML/JSX
    '<div>ine intervention needed</div>',
    '<span>dex funds are a good investment</span>',
    '<p>lease send help; code is alive</p>',
    '<p>robably works in production</p>',
    '<h1>dden bugs everywhere</h1>',
    '<b>roken code; hope it works</b>',
    '<a>void using this in production</a>',
    '<header>ache approaching critical levels</header>',
    '<footer>rints in sand made by dragging programmer to vacation</footer>',
    '<img>inary search for where I left my coffee</img>',
    '<bug>s fixed = 99; bugs created = 100;</bug>',
    '<sleep>404 Not Found</sleep>',

    // React
    'useState<Coffee>(["espresso", "latte", "more espresso"])',
    'useEffect(() => { !rum && refill(); }, [johnnyDeps])',
    'useContext(SituationIsTotallyClear)',
    'useRef(initely => needMoreCoffee())',
    'React.lazy(() => import("./MotivateSelf"))',
    'React.lazy(() => import("./StackOverflowSolutions"))',
    'React.memo(ry === failing)',

    // JS
    'function sleep() { return new Promise(never => {}) }',
    'catch(errors) { // Pretend I handled them }',
    'try { code } catch(bugs) { blame(previousDev) }',
    'Array.prototype.coffee = function() { return "refill" }',
    'if(tired && stressed) { coffee++ } else { /* unreachable code */ }',
    '// It works on my machine ¯\\_(ツ)_/¯',
    'git commit -m "Magic. Do not touch."',
    'Boolean(seenOutside) === false',
    'const happiness = new Promise(/* pending */)',

    // CSS
    'display: none; /* my social skills */',
    'position: absolute; /* confidence in this code */',
    'overflow: hidden; /* debugging skills */',
    'z-index: 9999; /* desperation level */',
    'margin-of-error: 100%;',
    'className="enhance enhance-again"',
    'flex: 1 1 auto; /* flexibility in deadlines */',

    // TypeScript
    'type Coffee = "empty" | "refill" | "inject-directly"',
    'interface Developer extends Human, CoffeeMachine {}',
    'as unknown as WillNeverTrulyKnow',
    'any: the pathway to production bugs',

    // General
    'while(coding) { drinkCoffee() }',
    '// TODO: replace this hack before anyone notices',
    '/* Here be dragons */',
    "// this.code = 'violence'; // If it doesn't work, use more.",
    'error instanceof Error ? blame(colleague) : takeCredit()',
    'npm install --save anxiety stress impostor-syndrome',
    'function amIAwake() { return Math.random() > 0.5 }',
    'const motivation = null; // Initialize as empty',
    'fixBug(true) // Sets bug to invisible',

    // Short bits
    '=>() => ¯\\_(ツ)_/¯',
    'undefined is not undefined',
    'null && void && emptyInside',
    '!false === true // surprisingly',
    '2B || !2B',
    '"0" == 0 ? "JS makes sense" : "Never happens"',
    'new Date().getDay() === 5 ? "🎉" : "😢"',
]

// Random color classes for the snippets
const colorClasses = [
    'text-blue-300',
    'text-green-300',
    'text-violet-300',
    'text-yellow-300',
    'text-pink-300',
    'text-cyan-300',
    'text-red-300',
    'text-orange-300',
    'text-purple-300',
    'text-gray-300',
    'text-teal-300',
    'text-lime-300',
    'text-indigo-300',
]

interface SnippetProps {
    id: number
    left: string
    duration: number
    delay: number
    size: string
    depth: number
    xMovement: number
    element: string
    color: string
}

const FloatingCodeSnippets = () => {
    const [snippets, setSnippets] = useState<SnippetProps[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            if (snippets.length < 15) {
                // Create depth layers (1-3, where 3 is closest to viewer)
                const depth = Math.floor(Math.random() * 3) + 1

                // Size varies by depth (smaller for farther snippets)
                const sizeMap = {
                    1: 'text-xs',
                    2: 'text-sm',
                    3: 'text-base',
                }

                // Speed varies by depth (slower for farther snippets)
                const durationMultiplier = {
                    1: 1.5,
                    2: 1.2,
                    3: 1,
                }

                const xMovement = (Math.random() - 0.5) * 5 // -2.5% to +2.5% horizontal drift
                const baseSpeed = Math.random() * 10 + 10

                const element =
                    codeElements[
                        Math.floor(Math.random() * codeElements.length)
                    ]
                const color =
                    colorClasses[
                        Math.floor(Math.random() * colorClasses.length)
                    ]

                const newSnippet = {
                    id: Date.now(),
                    left: `${Math.random() * 90 + 5}%`,
                    duration:
                        baseSpeed * durationMultiplier[depth as 1 | 2 | 3],
                    delay: Math.random() * 0.8,
                    size: sizeMap[depth as 1 | 2 | 3],
                    depth,
                    xMovement,
                    element,
                    color,
                }

                setSnippets((prev) => [...prev, newSnippet])

                // Remove after animation completes
                setTimeout(
                    () => {
                        setSnippets((prev) =>
                            prev.filter(
                                (snippet) => snippet.id !== newSnippet.id
                            )
                        )
                    },
                    (newSnippet.duration + newSnippet.delay) * 1000
                )
            }
        }, 800)

        return () => clearInterval(interval)
    }, [snippets.length])

    return (
        <div className="pointer-events-none absolute inset-0 -mx-10 overflow-hidden">
            <AnimatePresence>
                {snippets.map((snippet) => {
                    // Opacity varies by depth
                    const opacityMap = {
                        1: 0.2,
                        2: 0.4,
                        3: 0.6,
                    }

                    return (
                        <motion.div
                            key={snippet.id}
                            className={`absolute ${snippet.color} ${snippet.size} font-mono`}
                            style={{
                                opacity: 0,
                                filter: `blur(${snippet.depth === 1 ? '1px' : '0px'})`,
                            }}
                            initial={{
                                opacity: 0,
                                bottom: '-5%',
                                left: snippet.left,
                            }}
                            animate={{
                                opacity: [
                                    0,
                                    opacityMap[snippet.depth as 1 | 2 | 3],
                                    0,
                                ],
                                bottom: '105%',
                                left: `calc(${snippet.left} + ${snippet.xMovement}%)`,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: snippet.duration,
                                delay: snippet.delay,
                                ease: 'linear',
                            }}
                        >
                            {snippet.element}
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}

export default FloatingCodeSnippets
