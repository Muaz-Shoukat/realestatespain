import React from 'react'

const PropertyDetail = () => {
  return (
    <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={60}
        totalSlides={images.length}
        className="relative"
      >
        {images.length > 1 && (
          <>
            <ButtonBack className="absolute z-10 top-[50%] left-[12px] cursor-pointer">
              <img
                className="w-8 bg-white rounded-2xl"
                src={BackArrow}
                alt="back"
              />
            </ButtonBack>
            <ButtonNext className="absolute z-10 top-[50%] right-[12px] cursor-pointer">
              <img
                className="w-8 bg-white rounded-2xl p-[1px]"
                src={NextArrow}
                alt="back"
              />
            </ButtonNext>
          </>
        )}

        <Slider>
          {images.map((img, index) => {
            return (
              <Slide key={index} index={index}>
               
              </Slide>
            );
          })}
        </Slider>
      </CarouselProvider>
  )
}

export default PropertyDetail