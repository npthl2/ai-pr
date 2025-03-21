import {
  AutocompleteProps as MuiAutocompleteProps,
  Autocomplete as MuiAutocomplete,
  ChipProps,
  AutocompleteOwnerState,
  Chip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface TagProps extends Partial<ChipProps> {
  key: number;
  className: string;
  disabled: boolean;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

export type AutocompleteProps<T> = Omit<
  MuiAutocompleteProps<T, boolean, boolean, boolean>,
  'renderTags'
> & {
  renderTags?: (
    value: T[],
    getTagProps: (tagProps: { index: number }) => TagProps,
    ownerState: AutocompleteOwnerState<T, boolean, boolean, boolean>,
  ) => React.ReactNode;
};

export const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { size = 'small', renderTags, ...restProps } = props;

  const outlinedRenderTags = (
    value: T[],
    getTagProps: (params: { index: number }) => TagProps,
    ownerState: AutocompleteOwnerState<T, boolean, boolean, boolean>,
  ) =>
    renderTags
      ? renderTags(
          value,
          ({ index }) => ({
            ...getTagProps({ index }),
            variant: 'outlined',
            size: 'small',
          }),
          ownerState,
        )
      : value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={index}
            variant='outlined'
            size='small'
            label={option as string}
          />
        ));

  return (
    <MuiAutocomplete
      popupIcon={<KeyboardArrowDownIcon />}
      size={size}
      renderTags={outlinedRenderTags}
      {...restProps}
    />
  );
};

export default Autocomplete;
