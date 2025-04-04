import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableRow from "@components/Table/TableRow";

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  paddingLeft: 40,
  paddingRight: 40, 
  paddingTop: 16,
  paddingBottom: 24,
}));

export const ServiceSection = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 32,
}));

export const AdditionalServicesSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const ScrollableTableContainer = styled(Box)({
  height: '187px',
  minHeight: '187px',
  maxHeight: '187px',
  overflow: 'auto',
  boxShadow: 'none',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '2px',
  },
});

export const ServiceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  '&:first-of-type': {
    paddingTop: 0
  }
}));

export const TotalPriceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'row',
}));

export const TableRowCustom = styled(TableRow)(() => ({
  height: '33px',
}));

export const Count = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}));