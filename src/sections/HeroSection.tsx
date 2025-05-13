import { motion } from 'framer-motion'
import { staggerChild, staggerWrapper } from '../animations'
import HeadshotImg from '../assets/img/david-a-george-design-headshot.webp'
import FloatingCodeSnippets from '../components/FloatingCodeSnippets'

const HeroSection = () => (
    <motion.section
        variants={staggerChild}
        initial="closed"
        animate="open"
        className="relative pt-40"
    >
        <FloatingCodeSnippets />
        <motion.div
            className="relative z-10 flex w-full flex-wrap items-center justify-between"
            variants={staggerWrapper}
        >
            <div className="gap-0 lg:gap-4">
                <h2 className="mb-6 bg-linear-90 from-blue-200 to-blue-300 bg-clip-text text-4xl leading-snug font-bold text-transparent sm:leading-tight md:text-5xl">
                    <motion.span variants={staggerChild}>
                        Hi, I&apos;m David:
                    </motion.span>
                    <br />
                    <motion.span variants={staggerChild}>
                        A front-end developer,
                    </motion.span>
                    <br />
                    <motion.span variants={staggerChild}>
                        design engineer,
                    </motion.span>
                    <br />
                    <motion.span variants={staggerChild}>
                        &amp; product designer
                    </motion.span>
                </h2>
                <motion.h4
                    className="mb-12 max-w-xl px-0 text-2xl leading-snug"
                    variants={staggerChild}
                >
                    I help companies design and build intuitive digital products
                    with a profit-driven approach.
                </motion.h4>
                <motion.a
                    href="mailto:dav.a.george@gmail.com"
                    variants={staggerChild}
                >
                    <button className="cursor-pointer rounded-2xl bg-linear-90 from-green-200 to-green-300 px-6 py-4 transition-shadow duration-150 ease-linear hover:underline hover:shadow">
                        Let&apos;s chat
                    </button>
                </motion.a>
            </div>
            <div className="mx-auto mt-4 flex w-full justify-center md:w-auto lg:mt-0">
                <div className="mt-5 max-w-[22rem] px-6 sm:mt-4 lg:mt-0">
                    <motion.img
                        src={HeadshotImg}
                        className="h-auto max-w-full"
                        alt="David A George - product designer headshot"
                        width={304}
                        height={340}
                        variants={staggerChild}
                    />
                </div>
            </div>
        </motion.div>
    </motion.section>
)

export default HeroSection
