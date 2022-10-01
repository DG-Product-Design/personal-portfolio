import React from 'react';
import './ComboImg.scss';

const ComboImg = (props: {
  img1: string,
  img1AltText: string,
  img2: string
  img2AltText: string,
}) => {
	return (
		<div className="combo-img__wrapper combo-img__wrapper--2 d-flex justify-content-center align-items-center">
			<div className="combo-img__shadow-wrapper justify-content-between">
				<img src={ props.img1 } className="combo-img__img combo-img__img--1" alt={ props.img1AltText } />
				<img src={ props.img2 } className="combo-img__img combo-img__img--2" alt={ props.img2AltText } />
			</div>
		</div>
	);
};

export default ComboImg;