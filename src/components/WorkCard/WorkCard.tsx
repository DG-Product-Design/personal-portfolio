import { ReactElement, useRef } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'

import './WorkCard.css'
import { staggerChild, staggerWrapper } from '../../animations'

interface WorkCardProps {
    color: 'blue' | 'rose' | 'yellow' | 'purple' | 'green' | 'nickel'
    img?: string
    headline: ReactElement | string
    body: string | ReactElement
    button?: {
        className?: string
        href: string
        text: string
    }
    secondaryButton?: {
        className?: string
        href: string
        text: string
    }
    rightAlign?: boolean
    altImage?: ReactElement
    imgAltText: string
    bannerContent?: ReactElement
    className?: string
    imgWrapperClass?: string
    imgClass?: string
    textWrapperClass?: string
    logos?: Array<ReactElement>
}

const Banner = ({
    bannerContent,
    rightAlign,
}: {
    bannerContent: ReactElement
    rightAlign?: boolean
}) => (
    <motion.div
        className={classNames(
            rightAlign && 'top-[-3px] right-[1rem] left-auto sm:right-[3rem]',
            'absolute left-[3rem] flex w-[7rem] flex-wrap items-center justify-center px-4 filter-[drop-shadow(0_10px_10px_rgba(82,33,0,0.2))] sm:w-[10rem] sm:px-0'
        )}
        variants={staggerChild}
    >
        <div
            className="bg-apricot py-4 text-center text-blue-800"
            style={{ clipPath: 'polygon(100% 0,100% 78%,50% 100%,0 78%,0 0)' }}
        >
            <div className="px-4 pb-2">{bannerContent}</div>
        </div>
    </motion.div>
)

const WorkCard = ({
    color,
    img,
    headline,
    body,
    button,
    secondaryButton,
    rightAlign,
    altImage,
    imgAltText,
    bannerContent,
    className,
    imgWrapperClass,
    imgClass,
    textWrapperClass,
    logos,
}: WorkCardProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.33, once: true })

    return (
        <motion.div
            className={classNames(
                className && className,
                rightAlign && 'right-align',
                bannerContent && 'xl:pt-14',
                color === 'blue' && 'bg-gradient-blue',
                color === 'rose' && 'bg-gradient-rose',
                color === 'yellow' && 'bg-gradient-yellow',
                color === 'purple' && 'bg-gradient-purple',
                color === 'green' && 'bg-gradient-green',
                color === 'nickel' && 'bg-gradient-nickel',
                'relative flex flex-wrap items-center rounded-2xl px-4 py-12 text-white sm:px-8 md:px-12 md:py-20'
            )}
            ref={ref}
            animate={isInView ? 'open' : 'closed'}
            initial="closed"
            variants={staggerChild}
        >
            {bannerContent && (
                <Banner
                    bannerContent={bannerContent}
                    rightAlign={rightAlign}
                />
            )}

            <motion.div
                className={classNames(
                    'flex flex-wrap items-center gap-8 sm:gap-12 xl:flex-nowrap',
                    bannerContent && 'mt-0 items-start xl:mt-36'
                )}
                variants={staggerWrapper}
            >
                {/* Text */}
                <div
                    className={classNames(
                        textWrapperClass && textWrapperClass,
                        'order-last w-full xl:w-1/3',
                        rightAlign ? 'xl:order-last' : 'xl:order-first'
                    )}
                >
                    <motion.h4
                        className="mt-5 w-full text-2xl font-bold text-white text-shadow-[0_0_6px_rgba(0,0,0,0.2)] md:text-4xl xl:mt-0"
                        variants={staggerChild}
                    >
                        {headline}
                    </motion.h4>
                    <motion.div
                        className="my-4 flex w-full max-w-fit items-center justify-center gap-3 rounded-full bg-[rgba(62,62,62,0.38)] px-4 py-2"
                        variants={staggerChild}
                    >
                        {logos?.map((logo: ReactElement, index: number) => (
                            <div
                                key={logo.key + '-' + index}
                                className="work-card__img--tooling-logo"
                            >
                                {logo}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="mt-6 text-shadow-[0_0_6px_rgba(0,0,0,0.2)]"
                        variants={staggerChild}
                    >
                        {body}
                    </motion.div>
                    {(button || secondaryButton) && (
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {button && (
                                <motion.a
                                    href={button.href}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className={classNames(button.className)}
                                    variants={staggerChild}
                                >
                                    <button className="ml-1 cursor-pointer rounded-2xl bg-white px-6 py-4 text-sm text-blue-800 outline-white transition-all duration-150 ease-out hover:text-blue-600 hover:underline hover:shadow-sm hover:outline-1 hover:outline-offset-2 sm:text-base">
                                        {button.text}
                                    </button>
                                </motion.a>
                            )}
                            {secondaryButton && (
                                <motion.a
                                    href={secondaryButton.href}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className={classNames(
                                        secondaryButton.className
                                    )}
                                    variants={staggerChild}
                                >
                                    <button className="ml-1 cursor-pointer rounded-2xl bg-white px-6 py-4 text-sm text-blue-800 outline-white transition-all duration-150 ease-out hover:text-blue-600 hover:underline hover:shadow-sm hover:outline-1 hover:outline-offset-2 sm:text-base">
                                        {secondaryButton.text}
                                    </button>
                                </motion.a>
                            )}
                        </div>
                    )}
                </div>

                {/* Image */}
                <motion.div
                    className={classNames(
                        imgWrapperClass || 'w-full',
                        'order-first xl:w-2/3',
                        rightAlign ? 'xl:order-first' : 'xl:order-last'
                    )}
                    variants={staggerChild}
                >
                    {altImage || (
                        <img
                            src={img}
                            alt={imgAltText}
                            className={classNames(
                                imgClass && imgClass,
                                'w-full rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'
                            )}
                            width={1200}
                            height={800}
                            loading="lazy"
                        />
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default WorkCard
