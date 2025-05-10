const ComboImg = ({
	img1,
	img1AltText,
	img2,
	img2AltText,
}: {
	img1: string,
	img1AltText: string,
	img2: string
	img2AltText: string,
}) => {
	const comboImgClassnames = 'block h-full w-full rounded-sm max-h-[35rem]';
	return (
		<div className="rounded-2xl bg-white p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative flex justify-center items-center">
			<div className="flex relative overflow-hidden max-h-[560px] py-2 px-4 w-full justify-between items-end">
				<img src={img1} className={`${comboImgClassnames} absolute w-full max-w-1/3 h-auto z-2 bottom-0 right-0 top-4 p-6 pr-0`} alt={img1AltText} />
				<img src={img2} className={`${comboImgClassnames} relative top-0 z-1 text-right pl-0 max-w-4/5 h-auto`} alt={img2AltText} />
			</div>
		</div>
	);
};

export default ComboImg;