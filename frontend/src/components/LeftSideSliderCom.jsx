import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LeftSideSliderCom = () => {
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="fixed left-0 top-[6rem] bottom-[15rem] w-[15%] h-auto overflow-y-hidden z-10">
      <Slider {...settings}>
        <div className="p-4 bg-gray-200"><h3>Item 1</h3></div>
        <div className="p-4 bg-gray-300"><h3>Item 2</h3></div>
        <div className="p-4 bg-gray-400"><h3>Item 3</h3></div>
        <div className="p-4 bg-gray-500"><h3>Item 4</h3></div>
        <div className="p-4 bg-gray-600"><h3>Item 5</h3></div>
        <div className="p-4 bg-gray-200"><h3>Item 6</h3></div>
        <div className="p-4 bg-gray-300"><h3>Item 7</h3></div>
        <div className="p-4 bg-gray-400"><h3>Item 8</h3></div>
        <div className="p-4 bg-gray-500"><h3>Item 9</h3></div>
        <div className="p-4 bg-gray-600"><h3>Item 10</h3></div>
      </Slider>
    </div>
  );
};

export default LeftSideSliderCom;
