import { ReactElement } from 'react';
import classNames from 'classnames';

import './WorkCard.css';

interface WorkCardProps {
  color: 'blue' | 'rose' | 'yellow' | 'purple' | 'green' | 'nickel',
  img?: string,
  headline: ReactElement | string,
  body: string | ReactElement,
  button?: {
	className?: string,
	href: string,
	text: string,
  };
  secondaryButton?: {
	className?: string,
	href: string,
	text: string,
  };
  rightAlign?: boolean,
  altImage?: ReactElement,
  imgAltText: string,
  bannerContent? : ReactElement,
  className?: string,
  imgWrapperClass?: string,
  imgClass?: string,
  textWrapperClass?: string,
	logos?: Array<ReactElement>
}

const Banner = ({
	bannerContent,
	rightAlign
}: { bannerContent: ReactElement, rightAlign?: boolean }) => (
	<div className={classNames(
		rightAlign && 'left-auto right-[1rem] sm:right-[3rem] top-[-3px]',
		'filter-[drop-shadow(0_10px_10px_rgba(82,33,0,0.2))] w-[7rem] sm:w-[10rem] absolute left-[3rem] flex items-center flex-wrap justify-center px-4 sm:px-0'
	)}>
		<div className="bg-apricot text-blue-800 text-center py-4" style={{clipPath: 'polygon(100% 0,100% 78%,50% 100%,0 78%,0 0)'}}>
			<div className="px-4 pb-2">
				{bannerContent}
			</div>
		</div>
	</div>
);

const WorkCard = ({
	color,
	img,
	headline,
	body,
	button,
	secondaryButton,
	rightAlign,
	altImage,
	imgAltText,
	bannerContent,
	className,
	imgWrapperClass,
	imgClass,
	textWrapperClass,
	logos
}: WorkCardProps) => (
	<div 
		className={classNames(
			className && className,
			rightAlign && 'right-align',
			bannerContent && 'xl:pt-14',
			color === 'blue' && 'bg-gradient-blue',
			color === 'rose' && 'bg-gradient-rose',
			color === 'yellow' && 'bg-gradient-yellow',
			color === 'purple' && 'bg-gradient-purple',
			color === 'green' && 'bg-gradient-green',
			color === 'nickel' && 'bg-gradient-nickel',
			'relative rounded-2xl text-white flex flex-wrap items-center px-4 sm:px-8 md:px-12 py-12 md:py-20'
		)}
	>
		
		{bannerContent && (
			<Banner bannerContent={bannerContent} rightAlign={rightAlign}/>
		)}

		<div className={classNames('flex flex-wrap xl:flex-nowrap items-center gap-8 sm:gap-12', bannerContent && 'items-start mt-0 xl:mt-36')}>
			{/* Text */}
			<div 
				className={classNames(
					textWrapperClass && textWrapperClass,
					'w-full xl:w-1/3 order-last',
					rightAlign ? 'xl:order-last' : 'xl:order-first'
				)}
			>
				<h4 className="w-full text-shadow-[0_0_6px_rgba(0,0,0,0.2)] text-white font-bold text-2xl md:text-4xl mt-5 xl:mt-0">{ headline }</h4>
				<div className='bg-[rgba(62,62,62,0.38)] flex justify-center w-full items-center gap-3 rounded-full my-4 py-2 px-4 max-w-fit'>
					{logos?.map((logo: ReactElement, index: number) => (
						<div key={logo.key + '-' + index} className='work-card__img--tooling-logo'>
							{ logo }
						</div>
					))}
				</div>
				<div className='text-shadow-[0_0_6px_rgba(0,0,0,0.2)] mt-6'>{ body }</div>
				{(button || secondaryButton) && (
					<div className="flex flex-wrap items-center gap-3 mt-8">
						{ button && (
							<a href={button.href} rel="noopener noreferrer" target="_blank" className={classNames(button.className)}>
								<button className="ml-1 bg-white text-blue-800 text-sm sm:text-base rounded-2xl px-6 py-4 cursor-pointer outline-white hover:text-blue-600 hover:underline hover:shadow-sm hover:outline-1 hover:outline-offset-2 transition-all duration-150 ease-out">
									{button.text}
								</button>
							</a>
						) }
						{ secondaryButton && (
							<a href={secondaryButton.href} rel="noopener noreferrer" target="_blank" className={classNames(secondaryButton.className)}>
								<button className="ml-1 bg-white text-blue-800 text-sm sm:text-base rounded-2xl px-6 py-4 cursor-pointer outline-white hover:text-blue-600 hover:underline hover:shadow-sm hover:outline-1 hover:outline-offset-2 transition-all duration-150 ease-out">
									{secondaryButton.text}
								</button>
							</a>
						) }
					</div>
				) }
			</div>

			{/* Image */}
			<div 
				className={classNames(
					imgWrapperClass || 'w-full',
					'xl:w-2/3 order-first',
					rightAlign ? 'xl:order-first' : 'xl:order-last'
				)}
			>
				{altImage || (
					<img 
						src={img} 
						alt={imgAltText} 
						className={classNames(imgClass && imgClass, 'rounded-2xl w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]')} 
						width={1200}
						height={800}
						loading="lazy"
					/>
				)}
			</div>
		</div>
	</div>
);

export default WorkCard;