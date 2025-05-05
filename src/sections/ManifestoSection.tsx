import React from 'react';
import Manifesto from '../components/Manifesto/Manifesto';
import { manifestoData } from '../appData';

const ManifestoSection = () => {
	return (
		<>
			<h4 id="manifesto" className="homepage__section-header w-100 fs-2 mb-4">Manifesto</h4>
			<div className="homepage__manifesto-section row w-100">
				{manifestoData.map((manifesto, index) => (
					<Manifesto
						key={index}
						img={manifesto.img}
						imgAlt={manifesto.imgAlt}
						title={manifesto.title}
						body={manifesto.body}
					/>
				))}
			</div>
		</>
	);
};

export default ManifestoSection;