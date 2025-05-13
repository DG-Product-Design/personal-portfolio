import ManifestoSection from '../sections/ManifestoSection'
import HeroSection from '../sections/HeroSection'
import WorkSection from '../sections/WorkSection'
import BgPattern from '../assets/img/bg-pattern.svg'
import QuoteSection from '../sections/QuoteSection'

const HomePage = () => (
    <div
        id="homepage"
        className="bg-attachment-scroll mt-[-4.5rem] w-full bg-size-[auto_800px] bg-position-[50%_0%] bg-repeat-x px-4 pt-8 lg:px-5"
        style={{ backgroundImage: `url(${BgPattern})` }}
    >
        <div className="mx-auto flex max-w-5xl flex-col gap-24 xl:max-w-7xl">
            <HeroSection />
            <WorkSection />
            <QuoteSection />
            <ManifestoSection />
        </div>
    </div>
)

export default HomePage
