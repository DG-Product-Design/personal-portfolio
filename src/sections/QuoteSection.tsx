import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerChild, staggerWrapper } from '../animations'
import { quoteData } from '../appData'
import Quote from '../components/Quote/Quote'

const QuoteSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        amount: 0.25,
        once: true,
    })

    return (
        <motion.section
            ref={ref}
            variants={staggerWrapper}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
        >
            <motion.h2
                className="mb-16 w-full text-3xl"
                variants={staggerChild}
            >
                Recommendations
            </motion.h2>
            <div className="flex w-full flex-col gap-y-12">
                {quoteData.map((quote, index) => (
                    <Quote
                        key={index}
                        {...quote}
                    />
                ))}
            </div>
        </motion.section>
    )
}

export default QuoteSection
