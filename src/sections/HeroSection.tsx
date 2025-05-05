import React from 'react';
import classNames from 'classnames';


interface HeroSectionProps {
  wrapperClass?: string,
}

const headshotImg = require('../img/david-a-george-design-headshot.png');

const HeroSection = (props: HeroSectionProps) => {
	return (
		<div className={classNames(props.wrapperClass && props.wrapperClass, 'hero-section d-flex flex-wrap align-items-center w-100')}>
			<div className="col-12 col-md-5 col-lg-8 pr-0 pr-lg-4">
				<h2 className="hero-section__headline text-gradient text-gradient--blue fw-bold lh-sm mb-4">
					Hi, I&apos;m David:
					<br />
					A front-end/design engineer
					<br />
					&amp; product designer
				</h2>
				<h4 className="max-w-xs lh-base mb-5 px-0">
					I help companies design and build intuitive digital products with a profit-driven approach.
				</h4>
				<a href="mailto:dav.a.george@gmail.com">
					<button className="dg-btn dg-btn--white bg-gradient-green-200 px-4 py-3">Let&apos;s chat</button>
				</a>
			</div>
			<div className="col-12 col-md-7 col-lg-4 d-flex justify-content-center mt-4 mt-lg-0">
				<div className="hero-section__headshot-wrapper px-4 px-md-3 mt-5 mt-sm-4 mt-lg-0">
					<img src={headshotImg} className="img-fluid" alt="David A George - product designer headshot" />
				</div>
			</div>
		</div>
	);
};

export default HeroSection;