import React from "react";
const AnimatedCat = ({ transfer, width, height, style, stopAnimate }) => {
  const imagesPool = [
    { src: 'images/cat/1.png' },
    { src: 'images/cat/2.png' },
    { src: 'images/cat/3.png' },
    { src: 'images/cat/4.png' },
    { src: 'images/cat/5.png' },
    { src: 'images/cat/6.png' },
    { src: 'images/cat/7.png' },
    { src: 'images/cat/8.png' },
  ];

  const [image, setImage] = React.useState(() => imagesPool[0].src);
  const changeImage = React.useRef(null)

  React.useEffect(() => {
    let index = 1;
    if (stopAnimate.current === 1 || stopAnimate.current) {
      changeImage.current = setInterval(() => {
        if (index > imagesPool.length - 1) index = 0;
        setImage(imagesPool[index].src);
        index++;
      }, 70);
    }
  }, [stopAnimate.current]);


  React.useEffect(() => {
    if (!transfer.timerIsActive && (stopAnimate.current === 0 || !stopAnimate.current)) {
			setImage(imagesPool[0].src);
      clearInterval(changeImage.current);
      return;
    }
  }, [transfer.timerIsActive]);

  return (
    <img
      src={image}
      alt='cat'
      style = {style}
      width={width}
      height={height}
    />
  );
};
 
export default AnimatedCat;