import React, { ReactFragment } from 'react';
import classNames from 'classnames';

import './WorkCard.scss';

interface WorkCardProps {
  color?: 'blue' | 'rose' | 'yellow' | 'purple',
  img?: string,
  headline: ReactFragment | string,
  body: string | ReactFragment,
  button?: object;
  secondaryButton?: object;
  rightAlign?: boolean,
  altImage?: any,
  imgAltText?: string,
  bannerContent? : any,
  className?: string,
  imgWrapperClass?: string,
  imgClass?: string,
  textWrapperClass?: string,
	logos?: Array<React.ReactElement>
}

const Banner = (props: { bannerContent: any, rightAlign: boolean | undefined }) => {
  return (
    <div className={classNames(
      props.rightAlign && 'right-align',
      "work-card__banner-wrapper"
    )}>
      <div className="work-card__banner py-3">
        <div className="work-card__banner-content px-4 pb-2">
          {props.bannerContent}
        </div>
      </div>
    </div>
  )
}

const WorkCard = (props: WorkCardProps) => {
  return (
    <div 
      className={classNames(
        props.className && props.className,
        props.rightAlign && 'right-align',
        props.bannerContent && 'portfolio__work-card--with-banner',
        props.color === 'blue' && 'bg-gradient-blue--angle',
        props.color === 'rose' && 'bg-gradient-rose',
        props.color === 'yellow' && 'bg-gradient-yellow',
        props.color === 'purple' && 'bg-gradient-purple',
        "portfolio__work-card d-flex flex-wrap align-items-center overflow-hidden px-3 px-md-5"
      )}
    >
      
      {props.bannerContent && (
        <Banner bannerContent={props.bannerContent} rightAlign={props.rightAlign}/>
      )}

      {!props.rightAlign ? (
        <React.Fragment>
          <div 
            className={classNames(
              props.bannerContent && 'mt-lg-5 pt-lg-5 pt-xl-0',
              props.textWrapperClass && props.textWrapperClass,
              'work-card__text-wrapper col-12 col-lg-4 order-1 order-lg-0 mt-5 mt-lg-0'
              )}
            >
            <h4 className={classNames(props.bannerContent && 'work-card__headline--shrink-width', 'work-card__headline')}>{ props.headline }</h4>
						<div className='work-card__logo-wrapper d-flex justify-center w-100 align-items-center gap-3 rounded-pill my-3 py-2 px-4' style={{maxWidth: 'fit-content'}}>
							{props.logos?.map((logo: React.ReactElement, index: number) => {
								return (
									<div key={logo.key + '-' + index} className='work-card__img--tooling-logo'>
										{ logo }
									</div>
								)
							})}
						</div>
            <p className='work-card__body-text max-w-xs'>{ props.body }</p>
						<div className={classNames((props.button || props.secondaryButton) && 'mt-5', 'd-flex flex-wrap align-items-center gap-1')}>
							{ props.button && props.button }
							{ props.secondaryButton && props.secondaryButton }
						</div>
          </div>
          <div className={classNames(props.imgWrapperClass ? props.imgWrapperClass : "col-12 col-lg-8 ps-0 ps-lg-4", "work-card__img-wrapper order-0 order-lg-1")}>
            {props.altImage ? (
              props.altImage
            ) : (
              <img src={ props.img } alt="property search application UI" className={classNames(props.imgClass && props.imgClass, "work-card__img w-100")}/>
            )}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classNames(props.imgWrapperClass ? props.imgWrapperClass : "work-card__img-wrapper order-1 order-lg-0", "col-12 col-lg-8 pe-0 pe-lg-4")}>
            {props.altImage ? (
              props.altImage
            ) : (
              <img src={ props.img } alt={ props.imgAltText } className={classNames(props.imgClass && props.imgClass, "work-card__img w-100")}/>
            )}
          </div>
          <div 
            className={classNames(
              props.bannerContent && "mt-lg-5 pt-lg-5 pt-xl-0",
              props.textWrapperClass && props.textWrapperClass,
              "work-card__text-wrapper col-12 col-lg-4 order-0 order-lg-1 ps-0 ps-lg-4 mt-5 mt-lg-0"
              )}
            >
            <h4 className={classNames(props.bannerContent && 'work-card__headline--shrink-width', 'work-card__headline')}>{ props.headline }</h4>
						<div className='work-card__logo-wrapper d-flex justify-center w-100 align-items-center gap-3 rounded-pill my-3 py-2 px-4' style={{maxWidth: 'fit-content'}}>
							{props.logos?.map((logo: React.ReactElement, index: number) => {
								return (
									<div key={logo.key + '-' + index} className='work-card__img--tooling-logo'>
										{ logo }
									</div>
								)
							})}
						</div>
            <p className='work-card__body-text max-w-xs'>{ props.body }</p>
						<div className={classNames((props.button || props.secondaryButton) && 'mt-5', 'd-flex flex-wrap align-items-center gap-1')}>
							{ props.button && props.button }
							{ props.secondaryButton && props.secondaryButton }
						</div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default WorkCard;