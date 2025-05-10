import WorkCard from '../components/WorkCard/WorkCard';
import { workCardData } from '../appData';

const WorkSection = () => (
	<div>
		<h4 id="work" className="w-100 text-3xl mb-6">Work</h4>
		<div className="flex flex-col gap-12 lg:gap-24">
			{workCardData.map((card, index) => (
				<WorkCard key={index} {...card} />
			))}
		</div>
	</div>
);

export default WorkSection;