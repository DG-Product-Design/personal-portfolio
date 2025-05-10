import ManifestoSection from '../sections/ManifestoSection';
import HeroSection from '../sections/HeroSection';
import WorkSection from '../sections/WorkSection';
import BgPattern from '../assets/img/bg-pattern.svg';

const HomePage = () => (
	<div id="homepage" className="bg-position-[50%_0%] bg-size-[auto_800px] bg-repeat-x bg-attachment-scroll w-full mt-[-4.5rem] pt-[12.5rem] px-4 lg:px-5" style={{ backgroundImage: `url(${BgPattern})` }}>
		<div className="flex flex-col gap-24 max-w-5xl xl:max-w-7xl mx-auto">
			<HeroSection />
			<WorkSection />
			<ManifestoSection />
		</div>
	</div>
);

export default HomePage;