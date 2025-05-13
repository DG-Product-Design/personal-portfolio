const ComboImg = ({
    img1,
    img1AltText,
    img2,
    img2AltText,
}: {
    img1: string
    img1AltText: string
    img2: string
    img2AltText: string
}) => {
    const comboImgClassnames = 'block h-full w-full rounded-sm max-h-[35rem]'
    return (
        <div className="relative flex items-center justify-center rounded-2xl bg-white p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <div className="relative flex max-h-[560px] w-full items-end justify-between overflow-hidden px-4 py-2">
                <img
                    src={img1}
                    className={`${comboImgClassnames} absolute top-4 right-0 bottom-0 z-2 h-auto w-full max-w-1/3 p-6 pr-0`}
                    alt={img1AltText}
                    width={400}
                    height={800}
                    loading="lazy"
                />
                <img
                    src={img2}
                    className={`${comboImgClassnames} relative top-0 z-1 h-auto max-w-4/5 pl-0 text-right`}
                    alt={img2AltText}
                    width={800}
                    height={560}
                    loading="lazy"
                />
            </div>
        </div>
    )
}

export default ComboImg
