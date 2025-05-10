import { ReactNode } from 'react';
import classNames from 'classnames';

interface ManifestoProps {
  img: string,
  imgAlt: string,
  imgClass?: string,
  title: string,
  body: string | ReactNode,
}

const Manifesto = ({
	img,
	imgAlt,
	imgClass,
	title,
	body
}: ManifestoProps) => (
	<div className="w-full px-4 mb-4 mx-auto">
		<div className="flex max-w-full mb-4">
			<img src={img} className={classNames(imgClass, 'h-40 w-auto mx-auto')} alt={imgAlt} tabIndex={-1} />
		</div>
		<h4 className="text-primary text-xl font-bold mb-3">{title}</h4>
		<p>{body}</p>
	</div>
);

export default Manifesto;