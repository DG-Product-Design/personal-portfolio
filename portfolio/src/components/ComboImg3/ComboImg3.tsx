import React from 'react';
import './ComboImg3.scss';

const ComboImg3 = (props: {
  img1: string,
  img1AltText: string,
  img2: string,
  img2AltText: string,
  img3: string,
  img3AltText: string
}) => {
  return (
    <div className="combo-img__wrapper combo-img__wrapper--3 d-flex justify-content-center align-items-center">
      <div className="combo-img__shadow-wrapper justify-content-between w-100 row px-0">
        <div className="col-12">
          <img src={ props.img1 } className="combo-img__img combo-img__img--1 pb-4" alt={ props.img1AltText }/>
        </div>
        <div className="col-4">
          <img src={ props.img2 } className="combo-img__img combo-img__img--2 pr-2" alt={ props.img2AltText } />
        </div>
        <div className="col-8">
          <img src={ props.img3 } className="combo-img__img combo-img__img--3 pl-2" alt={ props.img3AltText } />
        </div>
      </div>
    </div>
  )
}

export default ComboImg3;