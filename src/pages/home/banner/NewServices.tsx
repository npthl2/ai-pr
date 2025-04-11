import { Box, Typography } from '@mui/material';
import { TitleWrapper, TitleBox } from '../Home.styled';
import { NewServicesContainer } from './NewSerivces.styled';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slideImages = [
  '/images/netflix-choice-premium.png',
  '/images/tving-choice-premium.png',
  '/images/additional-service-my-pet.png',
];

const NewServices = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <NewServicesContainer>
      <TitleWrapper>
        <TitleBox>
          <Typography variant='h2'>새로나온 요금제/부가서비스</Typography>
        </TitleBox>
      </TitleWrapper>
      <Box
        sx={{
          width: '398px',
          height: '309px',
          overflow: 'hidden',
          position: 'relative',
          '& .slick-list, & .slick-track': {
            height: '100%',
          },
        }}
        data-testid='new-services-slider'
      >
        <Slider ref={sliderRef} {...settings}>
          {slideImages.map((imageSrc, index) => (
            <Box key={index} sx={{ outline: 'none' }}>
              <img
                src={imageSrc}
                alt={`서비스 이미지 ${index + 1}`}
                style={{
                  width: '100%',
                  height: '309px',
                  objectFit: 'contain',
                }}
                data-testid={`new-services-slider-image-${index}`}
              />
            </Box>
          ))}
        </Slider>

        <Box
          sx={{
            position: 'absolute',
            top: '28px',
            right: '25px',
            display: 'flex',
            gap: '8px',
          }}
        >
          {slideImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              sx={(theme) => ({
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor:
                  activeSlide === index ? theme.palette.primary.main : theme.palette.grey[300],
                cursor: 'pointer',
              })}
              data-testid={`new-services-slider-dot-${index}`}
            />
          ))}
        </Box>
      </Box>
    </NewServicesContainer>
  );
};

export default NewServices;
