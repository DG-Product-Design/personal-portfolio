import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Manifesto from '../components/Manifesto'
import { manifestoData } from '../appData'
import { staggerChild, staggerWrapper } from '../animations'

const ManifestoSection = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.33, once: true })

    return (
        <motion.div
            ref={ref}
            variants={staggerWrapper}
            initial="closed"
            animate={isInView ? 'open' : 'closed'}
        >
            <motion.h4
                id="manifesto"
                className="mb-4 w-full text-2xl"
                variants={staggerChild}
            >
                Manifesto
            </motion.h4>
            <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {manifestoData.map((item, index) => (
                    <Manifesto
                        key={index}
                        img={item.img}
                        imgAlt={item.imgAlt}
                        title={item.title}
                        body={item.body}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default ManifestoSection
