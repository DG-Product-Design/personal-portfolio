import { ReactNode } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { staggerChild } from '../animations'

interface ManifestoProps {
    img: string
    imgAlt: string
    imgClass?: string
    title: string
    body: string | ReactNode
}

const Manifesto = ({ img, imgAlt, imgClass, title, body }: ManifestoProps) => (
    <motion.div
        className="w-full"
        variants={staggerChild}
    >
        <div className="mb-4 flex max-w-full">
            <img
                src={img}
                className={classNames(imgClass, 'mx-auto h-40 w-auto')}
                alt={imgAlt}
                tabIndex={-1}
                width={160}
                height={160}
                loading="lazy"
            />
        </div>
        <h4 className="mb-3 text-xl font-bold text-primary">{title}</h4>
        <p>{body}</p>
    </motion.div>
)

export default Manifesto
