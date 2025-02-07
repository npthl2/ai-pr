import { Box, TextField, Typography } from '@mui/material';
import { AutocompleteContainer } from './Autocomplete.styled';
import top100Films from './AutocompleteSampleData';
import Autocomplete from '@/components/Autocomplete';
import { Chip } from '@/components/Chip';

const AutocompleteExample = () => {
  return (
    <AutocompleteContainer>
      <Typography variant='h2' gutterBottom>
        Autocomplete 컴포넌트 예시
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        <Typography variant='caption' gutterBottom>
          Autocomplete 컴포넌트 예시
        </Typography>
        <Autocomplete
          //   disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} placeholder='Option' />}
        />
        <Typography variant='caption' gutterBottom>
          Autocomplete 컴포넌트 예시 multiple
        </Typography>
        <Autocomplete
          multiple
          size='small'
          id='tags-standard'
          sx={{ width: 600 }}
          options={top100Films}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
          defaultValue={[top100Films[13]]}
          renderInput={(params) => <TextField {...params} placeholder='Value' />}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip key={key} label={option.label} {...tagProps} />;
            })
          }
        />
      </Box>
    </AutocompleteContainer>
  );
};

export default AutocompleteExample;
