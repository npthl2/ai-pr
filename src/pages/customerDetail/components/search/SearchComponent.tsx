import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import customerContractService from '@api/services/cusotmerDetailService';
import {
  boxStyles,
  typographyStyles,
  formControlLabelStyles,
  textFieldStyles,
  inputAdornmentStyles,
  inputPropsStyles,
} from './SearchComponent.styles';
import { StyledBox, StyledTypography } from './SearchComponent.styles';

interface SearchComponentProps {
  customerId: string;
  includeCancelled: boolean; // 해지 포함 여부
  onIncludeCancelledChange: (value: boolean) => void;
  onFilteredContractId: (id: string | null) => void;
}

// Create styled components

export const SearchComponent = ({
  customerId,
  includeCancelled,
  onIncludeCancelledChange,
  onFilteredContractId,
}: SearchComponentProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    // 검색어가 없으면 모든 계약 보여줌
    if (!searchValue.trim()) {
      onFilteredContractId(null);
      return;
    }

    // 성공시에는 정상 계약ID, 실패시에는 ''로 처리
    const contractId = await customerContractService
      .getContractIdsByPhonNumberQuery(customerId, searchValue)
      .then((response) => (response.successOrNot === 'Y' ? response.data : ''));

    onFilteredContractId(contractId || ''); // 검색 결과 업데이트
  };

  return (
    <Box sx={boxStyles}>
      <Typography variant='subtitle1' sx={typographyStyles}>
        보유상품
      </Typography>
      <StyledBox>
        <FormControlLabel
          sx={formControlLabelStyles}
          control={
            <Checkbox
              size='small'
              checked={includeCancelled}
              onChange={(e) => onIncludeCancelledChange(e.target.checked)}
              data-testid='include-cancelled-checkbox'
            />
          }
          label={<StyledTypography>해지포함</StyledTypography>}
        />
        <TextField
          size='small'
          sx={textFieldStyles}
          placeholder='전화번호 (11자리 숫자 입력)'
          value={searchValue}
          onChange={(e) => {
            const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
            setSearchValue(onlyNumber);
          }}
          inputProps={{
            maxLength: 11,
            inputMode: 'numeric',
            pattern: '[0-9]*',
            style: { height: '15px' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon
                  onClick={handleSearch}
                  data-testid='search-icon'
                  sx={inputAdornmentStyles}
                />
              </InputAdornment>
            ),
            sx: inputPropsStyles,
          }}
        />
      </StyledBox>
    </Box>
  );
};
