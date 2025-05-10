import HeadshotImg from '../assets/img/david-a-george-design-headshot.png';

const HeroSection = () => (
	<div className="flex flex-wrap items-center justify-between w-full">
		<div className="gap-0 lg:gap-4">
			<h2 className="text-transparent bg-linear-90 from-blue-200 to-blue-300 bg-clip-text text-4xl md:text-5xl leading-snug sm:leading-tight font-bold mb-6">
				Hi, I&apos;m David:
				<br />
				A front-end developer,
				<br />
				design engineer,
				<br />
				&amp; product designer
			</h2>
			<h4 className="text-2xl max-w-xl leading-snug mb-12 px-0">
				I help companies design and build intuitive digital products with a profit-driven approach.
			</h4>
			<a href="mailto:dav.a.george@gmail.com">
				<button className="bg-linear-90 from-green-200 to-green-300 rounded-2xl hover:shadow hover:underline transition-shadow duration-150 ease-linear cursor-pointer px-6 py-4">Let&apos;s chat</button>
			</a>
		</div>
		<div className="flex justify-center w-full md:w-auto mx-auto mt-4 lg:mt-0">
			<div className="px-6 mt-5 sm:mt-4 lg:mt-0 max-w-[22rem]">
				<img src={HeadshotImg} className="h-auto max-w-full" alt="David A George - product designer headshot" />
			</div>
		</div>
	</div>
);

export default HeroSection;