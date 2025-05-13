import { motion } from 'framer-motion'
import { staggerChild, staggerWrapper } from '../../animations'
import QuotationMarkIcon from '../../assets/svg/QuotationMarkSVG'

import './Quote.css'

interface QuoteProps {
    name: string
    quote: string
    img: string
}

const Quote = ({ name, quote, img }: QuoteProps) => (
    <motion.div
        className="quote-container relative flex max-w-full flex-col md:max-w-3/4"
        variants={staggerWrapper}
    >
        <motion.div
            className="quotation-mark__wrapper absolute -top-16 z-0 mb-4"
            variants={staggerChild}
        >
            <QuotationMarkIcon className="quotation-mark h-18 w-18 text-blue-600" />
        </motion.div>
        <motion.p
            className="z-2 text-xl leading-relaxed italic"
            variants={staggerChild}
        >
            {quote}
        </motion.p>
        <motion.div
            className="quote-author"
            variants={staggerChild}
        >
            <div className="mt-2 flex w-fit items-center gap-x-2">
                <p className="text-lg">-</p>
                <img
                    src={img}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <p className="text-lg">{name}</p>
            </div>
        </motion.div>
    </motion.div>
)

export default Quote
