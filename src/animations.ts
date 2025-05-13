export const staggerWrapper = {
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
}

export const staggerChild = {
    closed: {
        visibility: 'hidden' as const,
        pointerEvents: 'none' as const,
        opacity: 0,
        y: 50,
        transition: {
            y: { stiffness: 1000 },
        },
    },
    open: {
        visibility: 'visible' as const,
        pointerEvents: 'auto' as const,
        opacity: 1,
        y: 0,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
}

export const scaleInVariants = {
    closed: {
        scale: 0.3,
        opacity: 0,
        transition: {
            scale: { duration: 0.3 },
            opacity: { duration: 0.1 },
            ease: 'easeOut',
        },
    },
    open: {
        scale: 1,
        opacity: 1,
        transition: {
            scale: { duration: 0.3 },
            opacity: { duration: 0.1 },
            ease: 'easeOut',
        },
    },
}

export const navMotionVariants = {
    closed: {
        y: -50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
    open: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 1,
            y: { stiffness: 1000, velocity: -100 },
        },
    },
}

// Section-level cascading animation variants
export const sectionVariants = {
    about: {
        closed: {
            opacity: 0,
            y: 30,
            transition: {
                duration: 0.4,
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.9,
                staggerChildren: 0.07,
                delayChildren: 0.15,
            },
        },
    },
    work: {
        closed: {
            opacity: 0,
            y: 30,
            transition: { duration: 0.4 },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 1.3,
            },
        },
    },
    manifesto: {
        closed: {
            opacity: 0,
            y: 30,
            transition: { duration: 0.4 },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 1.7,
            },
        },
    },
}
