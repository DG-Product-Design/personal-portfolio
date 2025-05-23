import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Manifesto from '../components/Manifesto'
import { manifestoData } from '../appData'
import { staggerChild, staggerWrapper } from '../animations'

const ManifestoSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.25, once: true })

    return (
        <motion.section
            ref={ref}
            variants={staggerWrapper}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
        >
            <motion.h2
                id="manifesto"
                className="mb-6 w-full text-3xl"
                variants={staggerChild}
            >
                Manifesto
            </motion.h2>
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {manifestoData.map((item, index) => (
                    <Manifesto
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </motion.section>
    )
}

export default ManifestoSection
