import React, { ReactElement } from 'react';
import classNames from 'classnames';

import './Manifesto.scss';


interface ManifestoProps {
  img: string,
  imgAlt: string,
  imgClass?: string,
  title: string,
  body: string | ReactElement,
}

const Manifesto = ({
	img,
	imgAlt,
	imgClass,
	title,
	body
}: ManifestoProps) => {
	return (
		<div className="col-12 col-sm-6 col-lg-4 px-3 mb-4">
			<div className="manifesto__image-wrapper mb-4">
				<img src={img} className={classNames(imgClass, 'manifesto__image mx-auto')} alt={imgAlt} tabIndex={-1} />
			</div>
			<h4 className="text-primary fw-bold mb-3">{title}</h4>
			<p className="manifesto__body">{body}</p>
		</div>
	);
};

export default Manifesto;