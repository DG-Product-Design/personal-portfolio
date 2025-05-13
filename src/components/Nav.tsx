import { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import GithubSVG from '../assets/logos/GithubSVG'
import { navMotionVariants, staggerChild } from '../animations'

function scrollIntoView(id: string) {
    const yOffset = -78
    const target = document.getElementById(id)
    const scrollContainer = document.getElementById('app')
    const y = target
        ? target.getBoundingClientRect().top + window.pageYOffset + yOffset
        : 72
    scrollContainer?.scrollTo({ top: y, behavior: 'smooth' })
}

const Nav = () => {
    const [rootElement, setRootElement] = useState<HTMLElement | null>()
    const [transparentBg, setTransparentBg] = useState(true)
    const [screenBelowSm, setScreenBelowSm] = useState(false)
    const PDF = window.location.origin + '/download/David-A-George-Resume.pdf'
    const navlinkClasses =
        'text-blue-800 transition-all duration-150 ease-out cursor-pointer hover:text-blue-500 hover:underline focus:text-blue-500 focus:underline'

    function handleWindowSize() {
        const windowWidth = window.innerWidth
        setScreenBelowSm(windowWidth < 576)
    }

    useEffect(() => {
        handleWindowSize()
        window.addEventListener('resize', handleWindowSize, { passive: true })
        return () => window.removeEventListener('resize', handleWindowSize)
    })

    useLayoutEffect(() => {
        getDistance()
    })

    useEffect(() => {
        setRootElement(document.getElementById('app'))
    }, [])

    function getDistance() {
        if (rootElement) {
            if (rootElement.scrollTop < 63) {
                setTransparentBg(true)
            } else setTransparentBg(false)
        }
    }

    useEffect(() => {
        if (rootElement) {
            rootElement.addEventListener('scroll', getDistance, {
                passive: true,
            })
            return () => rootElement.removeEventListener('scroll', getDistance)
        }
    })

    return (
        <motion.nav
            role="navigation"
            className={classNames(
                transparentBg ? 'bg-transparent' : 'bg-white shadow-sm',
                'sticky top-0 z-20 w-full px-2 py-4 transition-all duration-250 ease-out lg:px-5'
            )}
            variants={navMotionVariants}
            initial="closed"
            animate="open"
        >
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between xl:max-w-7xl">
                <motion.h1
                    role="link"
                    className="mb-0 cursor-pointer bg-linear-90 from-blue-200 to-blue-300 bg-clip-text text-2xl font-bold text-transparent transition-colors duration-150 ease-out hover:from-green-200 hover:to-green-300 focus:from-green-200 focus:to-green-300"
                    onClick={() => scrollIntoView('homepage')}
                    tabIndex={0}
                    aria-label="Click to scroll to top of homepage"
                    variants={staggerChild}
                >
                    {screenBelowSm ? 'DG.' : 'David A. George'}
                </motion.h1>
                <div className="flex items-center gap-3">
                    <motion.a
                        role="link"
                        tabIndex={0}
                        className={navlinkClasses}
                        onClick={() => scrollIntoView('work')}
                        variants={staggerChild}
                    >
                        Work
                    </motion.a>
                    <motion.a
                        href={PDF}
                        className={navlinkClasses}
                        rel="noopener noreferrer"
                        target="_blank"
                        download
                        variants={staggerChild}
                    >
                        Resume
                    </motion.a>
                    <motion.a
                        href="https://github.com/DG-Product-Design/"
                        className={navlinkClasses}
                        rel="noopener noreferrer"
                        target="_blank"
                        variants={staggerChild}
                    >
                        {screenBelowSm ? (
                            <div className="px-1">
                                <GithubSVG
                                    currentColor
                                    className="h-5 w-5"
                                />
                            </div>
                        ) : (
                            'GitHub'
                        )}
                    </motion.a>
                    <motion.a
                        href="mailto:dav.a.george@gmail.com"
                        variants={staggerChild}
                    >
                        <button className="cursor-pointer rounded-xl bg-linear-90 from-green-200 to-green-300 px-2 py-1 transition-shadow duration-150 ease-linear hover:underline hover:shadow sm:rounded-2xl sm:px-4 sm:py-2">
                            Let&apos;s chat
                        </button>
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    )
}

export default Nav
