import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';

interface CustomIconProps extends SvgIconProps {
  fillColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const FavoriteIcon = ({ fillColor, borderColor, size = 'medium', ...props }: CustomIconProps) => {
  const theme = useTheme();

  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const iconSize = sizeMap[size];

  return (
    <SvgIcon {...props} sx={{ fontSize: iconSize }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1423_1367)'>
          <path
            d='M6.68846 2.18086C7.22492 1.05072 8.77492 1.05072 9.31138 2.18086L10.2385 4.13404C10.4515 4.58282 10.8633 4.89388 11.3397 4.96584L13.4128 5.27905C14.6124 5.46027 15.0913 6.99295 14.2233 7.87264L12.7232 9.39298C12.3785 9.74231 12.2212 10.2456 12.3026 10.7389L12.6567 12.8856C12.8616 14.1278 11.6077 15.075 10.5347 14.4885L8.68047 13.475C8.25442 13.2421 7.74542 13.2421 7.31937 13.475L5.46509 14.4885C4.39218 15.075 3.1382 14.1278 3.34311 12.8856L3.69724 10.7389C3.77861 10.2456 3.62133 9.74231 3.27664 9.39298L1.7765 7.87264C0.908496 6.99295 1.38747 5.46027 2.58703 5.27905L4.66017 4.96584C5.13651 4.89388 5.5483 4.58282 5.76132 4.13404L6.68846 2.18086Z'
            fill={fillColor ? fillColor : 'none'}
            stroke={fillColor ? fillColor : (borderColor ?? theme.palette.primary.main)}
            strokeWidth='2'
            strokeLinejoin='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_1423_1367'>
            <rect width={iconSize} height={iconSize} fill='white' />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default FavoriteIcon;
