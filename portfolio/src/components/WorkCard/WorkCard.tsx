import React, { ReactFragment } from 'react';
import classNames from 'classnames';

import './WorkCard.scss';

interface WorkCardProps {
  color?: 'blue' | 'rose' | 'yellow' | 'nickel',
  img?: string,
  headline: ReactFragment | string,
  body: string | ReactFragment,
  button?: object;
  rightAlign?: boolean,
  altImage?: any,
  imgAltText?: string,
  bannerContent? : any,
  className?: string,
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
    <div className={classNames(
      props.className && props.className,
      props.rightAlign && 'right-align',
      props.bannerContent && 'portfolio__work-card--with-banner',
      props.color === 'blue' && 'bg-gradient-blue--angle',
      props.color === 'rose' && 'bg-gradient-rose',
      props.color === 'yellow' && 'bg-gradient-yellow',
      props.color === 'nickel' && 'bg-gradient-nickel',
      "portfolio__work-card d-flex flex-wrap align-items-center px-3 px-md-5"
    )}>
      
      {props.bannerContent && (
        <Banner bannerContent={props.bannerContent} rightAlign={props.rightAlign}/>
      )}

      {!props.rightAlign ? (
        <React.Fragment>
          <div className={classNames(props.bannerContent && "mt-lg-5 pt-lg-5 pt-xl-0", "work-card__text-wrapper col-12 col-lg-4 order-1 order-lg-0 mt-5 mt-lg-0")}>
            <h4 className={classNames(props.bannerContent && "work-card__headline--shrink-width", "work-card__headline mb-4")}>{ props.headline }</h4>
            <p className="max-w-xs mb-5">{ props.body }</p>
            { props.button && (
              <div className="text-center text-lg-start mb-0 mb-lg-5">
                { props.button }
              </div>
            )}
          </div>
          <div className="work-card__img-wrapper col-12 col-lg-8 order-0 order-lg-1 ps-0 ps-lg-4">
            {props.altImage ? (
              props.altImage
            ) : (
              <img src={ props.img } alt="property search application UI" className="work-card__img w-100"/>
            )}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="work-card__img-wrapper col-12 col-lg-8 order-1 order-lg-0 pe-0 pe-lg-4">
            {props.altImage ? (
              props.altImage
            ) : (
              <img src={ props.img } alt={ props.imgAltText } className="work-card__img w-100"/>
            )}
          </div>
          <div className={classNames(props.bannerContent && "mt-lg-5 pt-lg-5 pt-xl-0", "work-card__text-wrapper col-12 col-lg-4 order-0 order-lg-1 ps-0 ps-lg-4 mt-5 mt-lg-0")}>
            <h4 className={classNames(props.bannerContent && "work-card__headline--shrink-width", "work-card__headline mb-4")}>{ props.headline }</h4>
            <p className="max-w-xs mb-5">{ props.body }</p>
            { props.button && (
              <div className="text-center text-lg-start mb-5">
                { props.button }
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default WorkCard;