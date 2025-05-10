import Manifesto from '../components/Manifesto';
import { manifestoData } from '../appData';

const ManifestoSection = () => (
	<div>
		<h4 id="manifesto" className="text-2xl mb-4 w-full">Manifesto</h4>
		<div className="w-full gap-x-8 gap-y-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
	</div>
);

export default ManifestoSection;