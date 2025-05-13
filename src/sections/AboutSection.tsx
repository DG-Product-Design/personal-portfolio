import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'
import {
    scaleInVariants,
    sectionVariants,
    staggerChild,
    staggerWrapper,
} from '../animations'
import PieChartSVG from '../assets/svg/PieChartSVG'

const THRESHOLD = 15

const AboutSection = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { amount: 0.25, once: true })

    // 3D perspective effect
    const pieWrapper = document.querySelector<HTMLDivElement>('.pie-wrapper')
    function handleHover(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY, currentTarget } = e
        const { clientWidth, clientHeight } = currentTarget
        const offsetLeft = currentTarget.getBoundingClientRect().left
        const offsetTop = currentTarget.getBoundingClientRect().top

        const horizontal = (clientX - offsetLeft) / clientWidth
        const vertical = (clientY - offsetTop) / clientHeight
        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2)
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2)

        if (pieWrapper) {
            pieWrapper.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`
        }
    }

    function resetStyles(e: React.MouseEvent<HTMLDivElement>) {
        if (pieWrapper) {
            pieWrapper.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`
        }
    }

    return (
        <motion.section
            ref={sectionRef}
            variants={sectionVariants.about}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
            className="flex flex-col gap-6"
        >
            <motion.h2
                id="about"
                className="mb-8 w-full text-3xl"
                variants={staggerChild}
            >
                About
            </motion.h2>
            <motion.div
                className="mx-auto mb-18 flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-6 md:flex-nowrap md:gap-x-24"
                variants={staggerWrapper}
            >
                <motion.div
                    className="order-2 flex w-full flex-col gap-2 md:order-1 md:w-auto"
                    variants={staggerWrapper}
                >
                    <motion.h3
                        className="mb-4 text-2xl font-bold"
                        variants={staggerChild}
                    >
                        Part coder
                    </motion.h3>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Front-end engineering
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Rapid prototyping
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        HTML / CSS / Tailwind / SASS
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        JavaScript / TypeScript
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        React / Angular / Vue
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Component libraries / Storybook
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Jira / Github / Gitlab
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Swearing at my computer
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Moar coffee
                    </motion.p>
                </motion.div>
                <PieWrapper
                    variants={scaleInVariants}
                    className="pie-wrapper order-1 flex flex-col gap-2 md:order-2"
                    onMouseMove={handleHover}
                    onMouseLeave={resetStyles}
                >
                    <StyledPieChartSVG
                        className="h-auto w-full max-w-sm"
                        coderFill="var(--color-indigo-500)"
                        designerFill="var(--color-green-400)"
                        designerTextColor="var(--color-slate-600)"
                    />
                </PieWrapper>
                <motion.div
                    className="order-2 flex w-full flex-col gap-2 text-right md:w-auto md:text-left"
                    variants={staggerWrapper}
                >
                    <motion.h3
                        className="mb-4 text-2xl font-bold"
                        variants={staggerChild}
                    >
                        Part designer
                    </motion.h3>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        UX design
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        UI design
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Design Systems
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Interaction design
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        User research
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        User testing
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Figma / Sketch / Adobe XD
                    </motion.p>
                    <motion.p
                        className="text-lg"
                        variants={staggerChild}
                    >
                        Lottie / Framer
                    </motion.p>
                </motion.div>
            </motion.div>
            <motion.div
                className="flex flex-col gap-6"
                variants={staggerWrapper}
            >
                <motion.p
                    className="text-lg"
                    variants={staggerChild}
                >
                    With over a decade in the tech trenches, I've been juggling
                    code and creativity since 2012. I'm a frontend developer,
                    design engineer, and product designer with a passion for
                    creating beautiful, functional, and accessible web
                    applications. With extensive experience in React,
                    TypeScript, and modern web technologies, I bring designs to
                    life with attention to detail and a focus on user
                    experience. I've also dabbled in the NFT world with NBA Top
                    Shot, helping personalize experiences for their 2M+ users.
                </motion.p>
                <motion.p
                    className="text-lg"
                    variants={staggerChild}
                >
                    My background in both design and development allows me to
                    bridge the gap between creative vision and technical
                    implementation. Every pixel matters. I'm committed to
                    writing clean, maintainable code that scales with your
                    business needs.
                </motion.p>
                <motion.p
                    className="text-lg"
                    variants={staggerChild}
                >
                    When I'm not coding or designing, you can find me exploring
                    our country's beautiful rivers from the helm of a raft or
                    whitewater kayak, avoiding the prickly cacti on the trails
                    of Arizona's Sonoran Desert, or enjoying family time with my
                    wife and precocious 2-year-old daughter.
                </motion.p>
            </motion.div>
        </motion.section>
    )
}

export default AboutSection

const StyledPieChartSVG = styled(PieChartSVG)`
    transform-style: preserve-3d;
`

const PieWrapper = styled(motion.div)`
    transition: transform 0.1s ease;
    transform-style: preserve-3d;
    will-change: transform;
    backface-visibility: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        bottom: -3.6rem;
        height: 2rem;
        width: 60%;
        background-color: var(--color-slate-500);
        opacity: 0.33;
        filter: blur(7px);
        border-radius: 50%;
    }

    :hover {
        ${StyledPieChartSVG} {
            transform: translateZ(3rem);
        }
    }
`
