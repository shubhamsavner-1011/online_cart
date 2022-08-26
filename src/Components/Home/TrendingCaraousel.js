import React from "react";
import { render } from "react-dom";
import CarouselSlider from "react-carousel-slider";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let data = [
  {
    imgSrc:"https://dummyjson.com/image/i/products/1/thumbnail.jpg",
   
  },
  {
    imgSrc:
      "https://dummyjson.com/image/i/products/5/thumbnail.jpg",
  },
  {
    imgSrc:
      "https://dummyjson.com/image/i/products/7/thumbnail.jpg",
  },
  {
    imgSrc:
      "https://dummyjson.com/image/i/products/9/thumbnail.jpg",
  },
  {
    imgSrc:
      "https://dummyjson.com/image/i/products/13/thumbnail.webp",
  }
];

let sliderBoxStyle = {
  height: "350px",
  width:'100%',
  background: "transparent",
  border: "1px solid #e1e4e8"
};

let itemsStyle = {
  height: "80%",
  padding: "0px",
  background: "transparent",
  border: "1px solid #e1e4e8",
  borderRadius: "2px"
};

let buttonSetting = {
  placeOn: "middle-outside",
  style: {
    left: {
      color: "#929393",
      background: "transparent",
      border: "1px solid #e1e4e8",
      borderRadius: "50%"
    },
    right: {
      color: "#929393",
      background: "transparent",
      border: "1px solid #e1e4e8",
      borderRadius: "50%"
    }
  }
};

let dotsSetting = {
  placeOn: "top",
  style: {
    dotSize: "5px",
    currDotColor: "rgba(155, 108, 27, 0.5)",
    marginTop: "0px"
  }
};

let customSlideCpnts = data.map((item, index) => (
  <Link to={"/page" + index} key={index}>
    <img src={item.imgSrc} />
  </Link>
));
export const TrendingCaraousel = () => {
  return (
    <div style={{ width: "100%", margin: '20px auto', position: "relative" }}>
      <CarouselSlider
        slideCpnts={customSlideCpnts}
        manner={{ circular: true}}
        sliderBoxStyle={sliderBoxStyle}
        dotsSetting={dotsSetting}
        buttonSetting={buttonSetting}
        itemsStyle={itemsStyle}
      />
    </div>

  )
  }


