import React, { ReactFragment } from 'react';
import classNames from 'classnames';

import './Manifesto.scss';


interface ManifestoProps {
  img: string,
  imgAlt: string,
  imgClass?: string,
  title: string,
  body: string | ReactFragment,
}

const Manifesto = (props: ManifestoProps) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4 px-3 mb-4">
      <div className="manifesto__image-wrapper mb-4">
        <img src={props.img} className={classNames(props.imgClass, "manifesto__image mx-auto")} alt={props.imgAlt} />
      </div>
      <h4 className="text-primary fw-bold mb-3">
        {props.title}
      </h4>
      <p className="manifesto__body">
        {props.body}
      </p>
    </div>
  )
}

export default Manifesto;