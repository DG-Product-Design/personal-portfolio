import { ReactNode } from 'react';
import classNames from 'classnames';
import { TailwindAltSVG, ViteSVG } from '../assets/svgLogos/svgs';
import LinkedinSVG from '../assets/svgLogos/LinkedinSVG';

const SocialButton = ({
	href,
	children,
	className,
	ariaLabel,
}: {
	href: string,
	children: ReactNode,
	className?: string,
	ariaLabel: string,
}) => (
	<a href={href} rel="noopener noreferrer" target="_blank">
		<button aria-label={ariaLabel} className={classNames(className)}>
			{children}
		</button>
	</a>
);

const Footer = () => (
	<div className="w-full bg-linear-0 from-blue-100 to-white px-2 lg:px-12">
		<div className="max-w-5xl xl:max-w-7xl mx-auto flex items-center px-0 pt-12 pb-2">
			<div className="w-full flex flex-wrap gap-x-4 gap-y-0 justify-between items-baseline small mb-0">
				<p>&copy;2025 David A. George</p>
				<div className="flex items-baseline">
					<p className="flex items-start whitespace-nowrap">Built with ✌️, ❤️,
						<img src={TailwindAltSVG} alt="React logo" className="inline-block ml-1 mt-1 w-auto h-4" />
						, and
						<img src={ViteSVG} alt="Vite logo" className="inline-block ml-1 mt-1 w-auto h-4" />
					</p>
					<p className="small whitespace-nowrap ml-2">v1.1.0</p>
				</div>
				<SocialButton
					ariaLabel="Click to see David A. George's LinkedIn profile"
					className='w-10 cursor-pointer'
					href="https://www.linkedin.com/in/davidageorge-product-development/"
				>
					<LinkedinSVG className="transition-colors duration-150 ease-out hover:text-blue-500" />
				</SocialButton>
			</div>
		</div>
	</div>
);

export default Footer;