import { SnackbarProvider as NotistackProvider } from 'notistack';

import {
  StyledErrorContent,
  StyledSnackbarContainer,
  StyledSuccessContent,
} from './SnackbarProvider.styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, red } from '@mui/material/colors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  return (
    <StyledSnackbarContainer>
      <NotistackProvider
        Components={{
          success: StyledSuccessContent,
          error: StyledErrorContent,
        }}
        iconVariant={{
          success: (
            <CheckCircleOutlineIcon
              fontSize='small'
              sx={{ marginRight: '8px', color: `${green[500]}` }}
            />
          ),
          error: (
            <ErrorOutlineIcon fontSize='small' sx={{ marginRight: '8px', color: `${red[500]}` }} />
          ),
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}
        autoHideDuration={3000}
      >
        {children}
      </NotistackProvider>
    </StyledSnackbarContainer>
  );
};
