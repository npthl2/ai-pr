import FavoriteIcon from '@components/FavoriteIcon';
import { RatingContainer, StarIconButton } from './Rating.styled';
import { amber } from '@mui/material/colors';
import { useState } from 'react';
import { useTheme } from '@mui/material';

interface RatingProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

const Rating = ({ value, max, onChange }: RatingProps) => {
  const theme = useTheme();
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <RatingContainer data-testid='component-rating'>
      {Array.from({ length: max }, (_, index) => (
        <StarIconButton
          key={index}
          onClick={(_e: React.MouseEvent) => {
            handleClick(index);
          }}
          onMouseEnter={() => setHoverValue(index + 1)}
          onMouseLeave={() => setHoverValue(0)}
          data-testid={`rating-star-${index + 1}`}
        >
          {value >= index + 1 ? (
            <FavoriteIcon fillColor={amber[600]} />
          ) : (
            <FavoriteIcon
              borderColor={theme.palette.action.active}
              {...(hoverValue >= index + 1 && { fillColor: amber[600], opacity: 0.5 })}
            />
          )}
        </StarIconButton>
      ))}
    </RatingContainer>
  );
};

export default Rating;
