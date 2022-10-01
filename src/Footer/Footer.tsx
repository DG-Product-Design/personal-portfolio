import React, { ReactElement } from 'react';
import classNames from 'classnames';
import './Footer.scss';


const LinkedInSVG = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{width: '100%'}} className="footer-btn footer-btn--linked-in">
			<path
				d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
				fill="#002f70"
			/>
		</svg>
	);
};

const SocialButton = (props: {
  href: string,
  icon: ReactElement,
  className?: string,
}) => {
	return (
		<a href={props.href} className="footer__social-button-wrapper" rel="noopener noreferrer" target="_blank">
			<button aria-label="Click to see David A. George's LinkedIn profile" className={classNames(props.className && props.className, 'dg-btn bg-transparent')}>
				{props.icon}
			</button>
		</a>
	);
};

const Footer = () => {
	return (
		<div className="footer w-100 bg-gradient-blue-100 px-2 px-lg-5">
			<div className="container-lg d-flex align-items-center px-0 pt-5 pb-2">
				<div className="w-100 d-flex justify-content-start">
					<p className="small mb-0">
						&copy;2022 David A. George -&nbsp;
						<span className="whitespace-nowrap">Designer &amp; Builder &lt;/&gt;</span>
						&nbsp; &nbsp;
						<small className="whitespace-nowrap">v{process.env.REACT_APP_VERSION}</small>
					</p>
				</div>
				<div className="w-auto d-flex justify-content-end">
					<SocialButton
						className='footer__social-button'
						href="https://www.linkedin.com/in/davidageorgemarketing/"
						icon={<LinkedInSVG />}
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;