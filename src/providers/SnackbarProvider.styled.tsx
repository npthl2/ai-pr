import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';
import { green, red } from '@mui/material/colors';

export const StyledSuccessContent = styled(MaterialDesignContent)({
  '&.notistack-MuiContent-success': {
    width: '340px',
    backgroundColor: green[50],
    minHeight: '48px',
    borderRadius: '4px',
    color: green[900],
    fontSize: '13px',
    fontWeight: 400,
  },
});

export const StyledErrorContent = styled(MaterialDesignContent)({
  '&.notistack-MuiContent-error': {
    backgroundColor: green[50],
    width: '340px',
    minHeight: '48px',
    borderRadius: '4px',
    color: red[900],
    fontSize: '13px',
    fontWeight: 400,
  },
});

export const StyledSnackbarContainer = styled('div')({
  '& .notistack-SnackbarContainer': {
    top: '128px !important',
  },
});
