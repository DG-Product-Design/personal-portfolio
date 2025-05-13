import { motion } from 'framer-motion'
import { workCardData } from '../appData'
import { staggerChild, sectionVariants } from '../animations'
import WorkCard from '../components/WorkCard/WorkCard'

const WorkSection = () => (
    <motion.div
        variants={sectionVariants.work}
        initial="closed"
        animate="open"
    >
        <motion.h4
            id="work"
            className="mb-6 w-100 text-3xl"
            variants={staggerChild}
        >
            Work
        </motion.h4>
        <div className="flex flex-col gap-12 lg:gap-24">
            {workCardData.map((card, index) => (
                <WorkCard
                    key={index}
                    {...card}
                />
            ))}
        </div>
    </motion.div>
)

export default WorkSection
