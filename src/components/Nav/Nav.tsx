import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { GithubSVG } from '../../img/svgLogos';
import './Nav.scss';


function scrollIntoView(id: string) {
	const yOffset = -78; 
	const target = document.getElementById(id);
	const scrollContainer = document.getElementById('app');
	const y = target ? target.getBoundingClientRect().top + window.pageYOffset + yOffset : 72;
	scrollContainer?.scrollTo({top: y, behavior: 'smooth'});
}

const Nav = () => {
	const [rootElement, setRootElement] = useState<HTMLElement | null>();
	const [transparentBg, setTransparentBg] = useState(true);
	const [screenBelowSm, setScreenBelowSm] = useState(false);
	const PDF = process.env.PUBLIC_URL + '/download/David-A-George-Resume.pdf';

	function handleWindowSize() {
		const windowWidth = window.innerWidth;
		setScreenBelowSm(windowWidth < 576);
	}

	useEffect(() => {
		handleWindowSize();
		window.addEventListener('resize', handleWindowSize, { passive: true });
		return () => window.removeEventListener('resize', handleWindowSize);
	});

	useEffect(() => {
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
		<nav role="navigation" className={classNames(transparentBg ? 'nav--transparent' : 'nav--solid', 'w-100 px-2 px-lg-5 py-3')}>
			<div className="d-flex w-100 container-lg align-items-center justify-content-between">
				<h1 role="link" className="nav__headline link link-blue-300 fs-4 mb-0" onClick={() => scrollIntoView('homepage')} tabIndex={0}>
					{ screenBelowSm ? 'DG.' : 'David A. George' }
				</h1>
				<div className='d-flex align-items-center'>
					<span role="link" tabIndex={0} className="nav__nav-link link ms-2 ms-sm-3" onClick={() => scrollIntoView('work')}>Work</span>
					<a href={PDF} className="nav__nav-link link ms-2 ms-sm-3" rel='noopener noreferrer' target="_blank" download>Resume</a>
					<a href='https://github.com/DG-Product-Design/' className="nav__nav-link link ms-2 ms-sm-3" rel='noopener noreferrer' target="_blank">
						{ screenBelowSm 
							? (
								<div className='nav__github-svg px-1'>
									<GithubSVG currentColor />
								</div>
							)
							: 'GitHub'
						}
					</a>
					<a href="mailto:dav.a.george@gmail.com" className="ms-2 ms-sm-3">
						<button className="dg-btn bg-gradient-green-200 py-2 px-3">
							Let&apos;s chat
						</button>
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Nav;