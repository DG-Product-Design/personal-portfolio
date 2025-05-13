import { ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'
import { TailwindAltSVG, ViteSVG } from '../assets/logos/svgs'
import LinkedinSVG from '../assets/logos/LinkedinSVG'
import { staggerChild, staggerWrapper } from '../animations'

const SocialButton = ({
    href,
    children,
    className,
    ariaLabel,
}: {
    href: string
    children: ReactNode
    className?: string
    ariaLabel: string
}) => (
    <motion.a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        variants={staggerChild}
    >
        <button
            aria-label={ariaLabel}
            className={classNames(className)}
        >
            {children}
        </button>
    </motion.a>
)

const Footer = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.33, once: true })

    return (
        <motion.div
            ref={ref}
            variants={staggerWrapper}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
        >
            <div className="w-full bg-linear-0 from-blue-100 to-white">
                <div className="mx-auto flex max-w-5xl items-center px-0 pt-12 pb-2 xl:max-w-7xl">
                    <div className="small mb-0 flex w-full items-end justify-between gap-x-4 gap-y-0">
                        <div className="flex flex-wrap gap-y-0">
                            <motion.p variants={staggerChild}>
                                &copy;2025 David A. George -&nbsp;
                            </motion.p>
                            <div className="flex items-baseline">
                                <motion.p
                                    variants={staggerChild}
                                    className="flex items-start whitespace-nowrap"
                                >
                                    built with ✌️, ❤️,
                                    <img
                                        src={TailwindAltSVG}
                                        alt="React logo"
                                        className="mt-1 ml-1 inline-block h-4 w-auto"
                                    />
                                    , and
                                    <img
                                        src={ViteSVG}
                                        alt="Vite logo"
                                        className="mt-1 ml-1 inline-block h-4 w-auto"
                                    />
                                </motion.p>
                                <motion.p
                                    variants={staggerChild}
                                    className="ml-2 text-xs whitespace-nowrap"
                                >
                                    v1.1.0
                                </motion.p>
                            </div>
                        </div>
                        <SocialButton
                            ariaLabel="Click to see David A. George's LinkedIn profile"
                            className="w-10 cursor-pointer"
                            href="https://www.linkedin.com/in/davidageorge-product-development/"
                        >
                            <LinkedinSVG className="transition-colors duration-150 ease-out hover:text-blue-500" />
                        </SocialButton>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Footer
