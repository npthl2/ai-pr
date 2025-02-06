import {
  AutocompleteProps as MuiAutocompleteProps,
  Autocomplete as MuiAutocomplete,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type AutocompleteProps<T> = MuiAutocompleteProps<T, boolean, boolean, boolean>;
export const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { size = 'small', renderTags, ...restProps } = props;

  const outlinedRenderTags = (
    value: T[],
    getTagProps: (params: { index: number }) => any,
    ownerState: any,
  ) =>
    renderTags
      ? renderTags(
          value,
          ({ index }) => ({
            ...getTagProps({ index }),
            variant: 'outlined',
          }),
          ownerState,
        )
      : undefined;

  return (
    <MuiAutocomplete
      popupIcon={<KeyboardArrowDownIcon />}
      size={size}
      renderTags={outlinedRenderTags}
      {...restProps}
    ></MuiAutocomplete>
  );
};
export default Autocomplete;
