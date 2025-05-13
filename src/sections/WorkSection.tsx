import { motion } from 'framer-motion'
import { workCardData } from '../appData'
import { staggerChild, sectionVariants } from '../animations'
import WorkCard from '../components/WorkCard/WorkCard'

const WorkSection = () => (
    <motion.section
        variants={sectionVariants.work}
        initial="closed"
        animate="open"
    >
        <motion.h2
            id="work"
            className="mb-6 w-full text-3xl"
            variants={staggerChild}
        >
            Work
        </motion.h2>
        <div className="flex flex-col gap-12 lg:gap-24">
            {workCardData.map((item, index) => (
                <WorkCard
                    key={index}
                    {...item}
                />
            ))}
        </div>
    </motion.section>
)

export default WorkSection
