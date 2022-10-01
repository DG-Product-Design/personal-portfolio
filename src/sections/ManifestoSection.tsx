import React from 'react';
import Manifesto from '../components/Manifesto/Manifesto';

const studentImg = require('../img/manifesto/student.png');
const trophyImg = require('../img/manifesto/trophy.png');
const chartImg = require('../img/manifesto/chart.png');
const shapesImg = require('../img/manifesto/shapes.png');
const globeImg = require('../img/manifesto/globe.png');
const pencilRideImg = require('../img/manifesto/pencil-ride.png');

const ManifestoSection = () => {
	return (
		<React.Fragment>
			<h4 id="manifesto" className="homepage__section-header w-100 fs-2 mb-4">Manifesto</h4>
			<div className="homepage__manifesto-section row w-100">
				<Manifesto
					img={globeImg}
					imgAlt="Globe"
					title="Think big (picture)"
					body={
						<React.Fragment>
							Design sustainably and for extensibility. Creating design systems and standardizing them across the design and development environments makes it possible to maintain <span className="whitespace-nowrap">&quot;pixel-perfect&quot;</span> consistency and ensures an easy handoff from design to dev.
						</React.Fragment>
					}
				/>
				<Manifesto
					img={trophyImg}
					imgAlt="trophy"
					title="Learn from the masters"
					body="Benchmarking against the industry is foundational to establishing a realistic product goal and for understanding where we currently are. Find out why the top players are successful and compare against our own strategy. Then fill in the gaps with our own style and story."
				/>
				<Manifesto
					img={shapesImg}
					imgAlt="3D simple shapes"
					title="Simple is sophisticated"
					body={
						<React.Fragment>
							<em>&quot;I apologize for the length of this letter, for I lacked the time to make it shorter.&quot;</em>&nbsp; Truly one of my favorite quotes. The simplification process is often more difficult than maintaining complexity. But it&apos;s worth it - our users, clients, and teammates will thank us.
						</React.Fragment>
					}
				/>
				<Manifesto
					img={studentImg}
					imgAlt="Student reading book"
					title="Be a student of everything"
					body="Every day is an opportunity to learn from the world around us. Studying behavioral trends, technological changes, and industry leaders helps sustain a steady flow of inspiration. Always consider that the best products feel natural, which requires design to be cognizant of elements and experiences outside of digital devices."
				/>
				<Manifesto
					img={chartImg}
					imgAlt="3D pie chart"
					title="Do your (market) research"
					body="Successful products solve a problem or provide an experience effectively and efficiently - for the user and the business. Start by understanding our (or our client's) business model then seek to understand its users. This ensures that products aren't simply beautiful, but are usable and profitable at the core."
				/>
				<Manifesto
					img={pencilRideImg}
					imgAlt="3D woman riding pencil"
					title="Trust more than yourself"
					body="Own our work, but be open to feedback. And for the sake of our own mental health, don't take it personally. I'm continually humbled by user behavior - expect the unexpected. Trust the user-testing process and remember, going alone might be fast, but going together is what lasts."
				/>
			</div>
		</React.Fragment>
	);
};

export default ManifestoSection;