import React from "react";
import ReactImageMagnify from "react-image-magnify";
import bed from '../../images/bed.jpg'

export const MagnifyImg = ({images}) => {

 console.log(images,'itemImg')

  return (
    <div>
    <div className="perimeter">
            <div className="image">
         
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: false,
                    src: images,
                    sizes:
                    "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
                    width:500,
                    height:400,
                    borderReadius:'25px',
                  },
                  largeImage: {
                    isFluidWidth:true,
                    alt: "",
                    src: images,
                    width: 1200,
                    height: 1800
                  },
                  shouldUsePositiveSpaceLens: true,
                }}
              />
            </div>
         
          </div>
    </div>
  )
}





