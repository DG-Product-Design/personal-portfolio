import React, { ReactElement } from 'react';
import classNames from 'classnames';

import './WorkCard.scss';

interface WorkCardProps {
  color: 'blue' | 'rose' | 'yellow' | 'purple',
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
  imgAltText?: string,
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
}: { bannerContent: ReactElement, rightAlign?: boolean }) => {
	return (
		<div className={classNames(
			rightAlign && 'right-align',
			'work-card__banner-wrapper'
		)}>
			<div className="work-card__banner py-3">
				<div className="work-card__banner-content px-4 pb-2">
					{bannerContent}
				</div>
			</div>
		</div>
	);
};

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
}: WorkCardProps) => {
	return (
		<div 
			className={classNames(
				className && className,
				rightAlign && 'right-align',
				bannerContent && 'portfolio__work-card--with-banner',
				color === 'blue' && 'bg-gradient-blue--angle',
				color === 'rose' && 'bg-gradient-rose',
				color === 'yellow' && 'bg-gradient-yellow',
				color === 'purple' && 'bg-gradient-purple',
				'portfolio__work-card d-flex flex-wrap align-items-center overflow-hidden px-3 px-md-5'
			)}
		>
			
			{bannerContent && (
				<Banner bannerContent={bannerContent} rightAlign={rightAlign}/>
			)}

			{rightAlign ? (
				<>
					<div className={classNames(imgWrapperClass ? imgWrapperClass : 'work-card__img-wrapper', 'col-12 col-xl-8 pe-0 pe-xl-4')}>
						{altImage ? (
							altImage
						) : (
							<img src={ img } alt={ imgAltText } className={classNames(imgClass && imgClass, 'work-card__img w-100')} />
						)}
					</div>
					<div 
						className={classNames(
							bannerContent && 'mt-xl-5 pt-xl-3 pt-xl-0',
							textWrapperClass && textWrapperClass,
							'work-card__text-wrapper col-12 col-xl-4 order-0 order-xl-1 ps-0 ps-xl-4'
						)}
					>
						<h4 className={classNames(bannerContent && 'work-card__headline--shrink-width', 'work-card__headline mt-5 mt-xl-0')}>{ headline }</h4>
						<div className='work-card__logo-wrapper d-flex justify-center w-100 align-items-center gap-3 rounded-pill my-3 py-2 px-4' style={{maxWidth: 'fit-content'}}>
							{logos?.map((logo: ReactElement, index: number) => {
								return (
									<div key={logo.key + '-' + index} className='work-card__img--tooling-logo'>
										{ logo }
									</div>
								);
							})}
						</div>
						<p className='work-card__body-text max-w-xs mb-0'>{ body }</p>
						<div className={classNames((button || secondaryButton) && 'mt-5', 'd-flex flex-wrap align-items-center gap-1')}>
							{ button && (
								<a href={button.href} rel="noopener noreferrer" target="_blank" className={button.className}>
									<button className="dg-btn dg-btn--white">
										{button.text}
									</button>
								</a>
							) }
							{ secondaryButton && (
								<a href={secondaryButton.href} rel="noopener noreferrer" target="_blank" className={classNames(secondaryButton.className && secondaryButton.className, 'my-3 my-sm-1')}>
									<button className="dg-btn dg-btn--white">
										{secondaryButton.text}
									</button>
								</a>
							) }
						</div>
					</div>
				</>
			) : (
				<>
					<div 
						className={classNames(
							bannerContent && 'mt-xl-5 pt-xl-3 pt-xl-0',
							textWrapperClass && textWrapperClass,
							'work-card__text-wrapper col-12 col-xl-4 order-1 order-xl-0'
						)}
					>
						<h4 className={classNames(bannerContent && 'work-card__headline--shrink-width', 'work-card__headline mt-5 mt-xl-0')}>{ headline }</h4>
						<div className='work-card__logo-wrapper d-flex justify-center w-100 align-items-center gap-3 rounded-pill my-3 py-2 px-4' style={{maxWidth: 'fit-content'}}>
							{logos?.map((logo: ReactElement, index: number) => {
								return (
									<div key={logo.key + '-' + index} className='work-card__img--tooling-logo'>
										{ logo }
									</div>
								);
							})}
						</div>
						<p className='work-card__body-text max-w-xs mb-0'>{ body }</p>
						<div className={classNames((button || secondaryButton) && 'mt-5', 'd-flex flex-wrap align-items-center gap-1')}>
							{ button && (
								<a href={button.href} rel="noopener noreferrer" target="_blank">
									<button className="dg-btn dg-btn--white">
										{button.text}
									</button>
								</a>
							) }
							{ secondaryButton && (
								<a href={secondaryButton.href} rel="noopener noreferrer" target="_blank">
									<button className="dg-btn dg-btn--white">
										{secondaryButton.text}
									</button>
								</a>
							) }
						</div>
					</div>
					<div className={classNames(imgWrapperClass ? imgWrapperClass : 'col-12 col-xl-8 ps-0 ps-xl-4', 'work-card__img-wrapper order-0 order-xl-1')}>
						{altImage ? (
							altImage
						) : (
							<img src={ img } alt="property search application UI" className={classNames(imgClass && imgClass, 'work-card__img w-100')} />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default WorkCard;