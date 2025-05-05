import React from 'react';
import WorkCard from '../components/WorkCard/WorkCard';
import { workCardData } from '../appData';

const WorkSection = () => {
	return (
		<>
			<h4 id="work" className="homepage__section-header w-100 fs-2 mb-4">Work</h4>
			{workCardData.map((card, index) => (
				<WorkCard key={index} {...card} />
			))}
		</>
	);
};

export default WorkSection;