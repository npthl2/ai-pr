import { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Checkbox from '@components/Checkbox';
import {
  CheckboxExampleContainer,
  CheckboxWrapper,
  ComponentTitle,
} from './CheckboxExample.styled';

const CheckboxExample = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    default: false,
    checked: true,
    withLabel: false,
    disabled: false,
    checkedDisabled: true,
    indeterminated: false,
  });

  const handleChange = (id: string) => (checked: boolean) => {
    setChecked((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <CheckboxExampleContainer>
      <Typography variant='h4' gutterBottom>
        Checkbox 컴포넌트 예시
      </Typography>

      <Grid container spacing={4}>
        <Grid size={12}>
          <ComponentTitle variant='h6'>기본 (Default)</ComponentTitle>
          <CheckboxWrapper>
            <Checkbox checked={checked.default} onChange={handleChange('default')} />
          </CheckboxWrapper>
        </Grid>

        <Grid size={12}>
          <ComponentTitle variant='h6'>Checked</ComponentTitle>
          <CheckboxWrapper>
            <Checkbox checked={checked.checked} onChange={handleChange('checked')} />
          </CheckboxWrapper>
        </Grid>

        <Grid size={12}>
          <ComponentTitle variant='h6'>Indeterminated</ComponentTitle>
          <CheckboxWrapper>
            <Checkbox
              checked={checked.indeterminated}
              onChange={handleChange('indeterminated')}
              indeterminate
              disabled={false}
            />
          </CheckboxWrapper>
        </Grid>

        <Grid size={12}>
          <ComponentTitle variant='h6'>레이블 (With Label)</ComponentTitle>
          <CheckboxWrapper>
            <Checkbox
              checked={checked.withLabel}
              onChange={handleChange('withLabel')}
              label='옵션 1'
              showLabel
            />
          </CheckboxWrapper>
        </Grid>

        <Grid size={12}>
          <ComponentTitle variant='h6'>비활성화 (Disabled)</ComponentTitle>
          <CheckboxWrapper>
            <Checkbox checked={checked.disabled} onChange={handleChange('disabled')} disabled />
            <Checkbox
              checked={checked.checkedDisabled}
              onChange={handleChange('checkedDisabled')}
              disabled
            />
            <Checkbox
              checked={checked.withLabel}
              onChange={handleChange('withLabel')}
              disabled
              indeterminate
            />
            <Checkbox
              checked={checked.withLabel}
              onChange={handleChange('withLabel')}
              label='옵션 1'
              showLabel
              disabled
            />
          </CheckboxWrapper>
        </Grid>
      </Grid>
    </CheckboxExampleContainer>
  );
};

export default CheckboxExample;
