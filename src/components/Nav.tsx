import { useEffect, useLayoutEffect, useState } from 'react';
import classNames from 'classnames';
import GithubSVG from '../assets/logos/GithubSVG';

function scrollIntoView(id: string) {
	const yOffset = -78;
	const target = document.getElementById(id);
	const scrollContainer = document.getElementById('app');
	const y = target ? target.getBoundingClientRect().top + window.pageYOffset + yOffset : 72;
	scrollContainer?.scrollTo({ top: y, behavior: 'smooth' });
}

const Nav = () => {
	const [rootElement, setRootElement] = useState<HTMLElement | null>();
	const [transparentBg, setTransparentBg] = useState(true);
	const [screenBelowSm, setScreenBelowSm] = useState(false);
	const PDF = window.location.origin + '/download/David-A-George-Resume.pdf';
	const navlinkClasses = 'text-blue-800 transition-all duration-150 ease-out cursor-pointer hover:text-blue-500 hover:underline focus:text-blue-500 focus:underline';

	function handleWindowSize() {
		const windowWidth = window.innerWidth;
		setScreenBelowSm(windowWidth < 576);
	}

	useEffect(() => {
		handleWindowSize();
		window.addEventListener('resize', handleWindowSize, { passive: true });
		return () => window.removeEventListener('resize', handleWindowSize);
	});

	useLayoutEffect(() => {
		getDistance();
	});

	useEffect(() => {
		setRootElement(document.getElementById('app'));
	}, []);

	function getDistance() {
		if (rootElement) {
			if (rootElement.scrollTop < 63) {
				setTransparentBg(true);
			} else setTransparentBg(false);
		}
	}

	useEffect(() => {
		if (rootElement) {
			rootElement.addEventListener('scroll', getDistance, { passive: true });
			return () => rootElement.removeEventListener('scroll', getDistance);
		}
	});

	return (
		<nav role="navigation" className={classNames(transparentBg ? 'bg-transparent' : 'bg-white shadow-sm', 'sticky top-0 z-10 transition-all duration-250 ease-out w-full px-2 lg:px-5 py-4')}>
			<div className="flex w-full max-w-5xl xl:max-w-7xl items-center justify-between mx-auto">
				<h1 role="link" className="cursor-pointer font-bold transition-colors duration-150 ease-out bg-clip-text text-transparent bg-linear-90 from-blue-200 to-blue-300 text-2xl mb-0 focus:from-green-200 focus:to-green-300 hover:from-green-200 hover:to-green-300" onClick={() => scrollIntoView('homepage')} tabIndex={0}>
					{screenBelowSm ? 'DG.' : 'David A. George'}
				</h1>
				<div className='flex gap-3 items-center'>
					<a role="link" tabIndex={0} className={navlinkClasses} onClick={() => scrollIntoView('work')}>Work</a>
					<a href={PDF} className={navlinkClasses} rel='noopener noreferrer' target="_blank" download>Resume</a>
					<a href='https://github.com/DG-Product-Design/' className={navlinkClasses} rel='noopener noreferrer' target="_blank">
						{screenBelowSm
							? (
								<div className='px-1'>
									<GithubSVG currentColor className="h-5 w-5" />
								</div>
							)
							: 'GitHub'
						}
					</a>
					<a href="mailto:dav.a.george@gmail.com">
						<button className="bg-linear-90 from-green-200 to-green-300 rounded-xl sm:rounded-2xl hover:underline px-2 sm:px-4 py-1 sm:py-2 hover:shadow transition-shadow duration-150 ease-linear cursor-pointer">
							Let&apos;s chat
						</button>
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Nav;