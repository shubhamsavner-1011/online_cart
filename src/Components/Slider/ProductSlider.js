import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import poster from '../../images/discount.jpg';
import sale from '../../images/sale.jpg'
import Slider from "react-slick";

const images = [
 
  {
    photo:sale
  },
  {
    photo:poster
  },
];

export const ProductSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: true,
    slickPrevious: true,
    swipe: true
  };
        return (
            <>
    
          <Slider {...settings}>
          {images.map((step) => (
            <div key={step.label}>
              <img
                src={step.photo}
                alt={step.label}
               className='sliderImg'
              />
            </div>
          ))}
        </Slider>
          </>
        );
    }

