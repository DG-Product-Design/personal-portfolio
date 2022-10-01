import React from 'react';
import ManifestoSection from '../../sections/ManifestoSection';
import HeroSection from '../../sections/HeroSection';
import WorkSection from '../../sections/WorkSection';

import './Homepage.scss';



const HomePage = () => {
	return (
		<div id="homepage" className="w-100 px-2 px-lg-5">
			<div className="container-lg">
				<HeroSection wrapperClass='w-100'/>
				<WorkSection />
				<ManifestoSection />
			</div>
		</div>
	);
};

export default HomePage;