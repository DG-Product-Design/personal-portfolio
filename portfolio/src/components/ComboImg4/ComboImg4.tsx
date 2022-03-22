import React from 'react';
import './ComboImg4.scss';

const ComboImg4 = (props: {
  img1: string,
  img1AltText: string,
  img2: string,
  img2AltText: string,
  img3: string,
  img3AltText: string,
  img4: string,
  img4AltText: string,
}) => {
  return (
    <div className="combo-img__wrapper combo-img__wrapper--4 d-flex justify-content-center align-items-center">
      <div className="combo-img__shadow-wrapper justify-content-between w-100">
        <img src={ props.img1 } className="combo-img__img combo-img__img--1" alt={ props.img1AltText }/>
        <img src={ props.img2 } className="combo-img__img combo-img__img--2" alt={ props.img2AltText } />
        <img src={ props.img3 } className="combo-img__img combo-img__img--3" alt={ props.img3AltText } />
        <img src={ props.img4 } className="combo-img__img combo-img__img--4" alt={ props.img4AltText } />
      </div>
    </div>
  )
}

export default ComboImg4;