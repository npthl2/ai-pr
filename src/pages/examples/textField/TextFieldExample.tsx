import { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@components/TextField';
import {
  ComponentTitle,
  TextFieldExampleContainer,
  TextFieldWrapper,
} from './TextFieldExample.styled';

const TextFieldExample = () => {
  const [values, setValues] = useState<Record<string, string>>({
    small: '',
    medium: '',
    inactive: '',
    active: '',
    error: '',
    disabled: '',
    withPrefix: '',
    withSuffix: '',
    withValue: '테스트',
    withValueAndPrefix: '테스트',
    withValueAndSuffix: '테스트',
    withLabel: '',
    withLabelAndPrefix: '',
    withLabelAndSuffix: '',
    withLabelAndActive: '',
    withLabelAndError: '',
    withLabelAndDisabled: '',
  });

  const handleChange = (id: string) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <TextFieldExampleContainer>
      <Typography variant='h4' gutterBottom>
        TextField 컴포넌트 예시
      </Typography>

      <Grid container spacing={4}>
        {/* 크기 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>크기 (Size)</ComponentTitle>
          <TextFieldWrapper>
            <TextField
              value={values.small}
              onChange={handleChange('small')}
              size='small'
              helperText='작은 크기 (small)'
            />
            <TextField
              value={values.medium}
              onChange={handleChange('medium')}
              size='medium'
              helperText='중간 크기 (medium)'
            />
          </TextFieldWrapper>
        </Grid>

        {/* 상태 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>상태 (State)</ComponentTitle>
          <TextFieldWrapper>
            <TextField
              value={values.inactive}
              onChange={handleChange('inactive')}
              state='inactive'
              helperText='기본 상태 (inactive)'
            />
            <TextField
              value={values.active}
              onChange={handleChange('active')}
              state='active'
              helperText='활성화 상태 (active)'
            />
            <TextField
              value={values.error}
              onChange={handleChange('error')}
              state='error'
              helperText='에러 상태 (error)'
            />
            <TextField
              value={values.disabled}
              onChange={handleChange('disabled')}
              disabled
              helperText='비활성화 상태 (disabled)'
            />
          </TextFieldWrapper>
        </Grid>

        {/* 접두사 및 접미사 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>접두사 및 접미사 (Prefix & Suffix)</ComponentTitle>
          <TextFieldWrapper>
            <TextField
              value={values.withPrefix}
              onChange={handleChange('withPrefix')}
              prefix='$'
              helperText='접두사 (Prefix)'
            />
            <TextField
              value={values.withSuffix}
              onChange={handleChange('withSuffix')}
              suffix='.com'
              helperText='접미사 (Suffix)'
            />
          </TextFieldWrapper>
        </Grid>

        {/* 크기 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>Value 있는 경우</ComponentTitle>
          <TextFieldWrapper>
            <TextField
              value={values.withValue}
              onChange={handleChange('withValue')}
              helperText='값이 있는 경우'
            />
            <TextField
              value={values.withValueAndPrefix}
              onChange={handleChange('withValueAndPrefix')}
              prefix='$'
              helperText='값이 있는 경우 (접두사 포함)'
            />
            <TextField
              value={values.withValueAndSuffix}
              onChange={handleChange('withValueAndSuffix')}
              suffix='.com'
              helperText='값이 있는 경우 (접미사 포함)'
            />
          </TextFieldWrapper>
        </Grid>

        {/* 라벨 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>라벨 (Label)</ComponentTitle>
          <TextFieldWrapper>
            <TextField
              value={values.withLabel}
              onChange={handleChange('withLabel')}
              label='라벨'
              helperText='라벨이 있는 경우'
            />
            <TextField
              value={values.withLabelAndPrefix}
              onChange={handleChange('withLabelAndPrefix')}
              label='라벨'
              prefix='$'
              helperText='라벨이 있는 경우 (접두사 포함)'
            />
            <TextField
              value={values.withLabelAndSuffix}
              onChange={handleChange('withLabelAndSuffix')}
              label='라벨'
              suffix='.com'
              helperText='라벨이 있는 경우 (접미사 포함)'
            />
          </TextFieldWrapper>
          <TextFieldWrapper sx={{ marginTop: '15px' }}>
            <TextField
              value={values.withLabelAndActive}
              onChange={handleChange('withLabelAndActive')}
              label='라벨'
              state='active'
              helperText='라벨이 있는 경우 (활성화 상태)'
            />
            <TextField
              value={values.withLabelAndError}
              onChange={handleChange('withLabelAndError')}
              label='라벨'
              state='error'
              helperText='라벨이 있는 경우 (에러 상태)'
            />
            <TextField
              value={values.withLabelAndDisabled}
              onChange={handleChange('withLabelAndDisabled')}
              label='라벨'
              disabled
              helperText='라벨이 있는 경우 (비활성화 상태)'
            />
          </TextFieldWrapper>
        </Grid>
      </Grid>
    </TextFieldExampleContainer>
  );
};

export default TextFieldExample;
