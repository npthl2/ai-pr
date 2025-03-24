import { useState } from 'react';
import { MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Person } from '@mui/icons-material';
import Select from '@components/Select';
import { ComponentTitle, SelectExampleContainer, SelectWrapper } from './SelectExample.styled';

const SelectExample = () => {
  const [values, setValues] = useState<Record<string, string>>({
    smallWithHelper: '',
    small: '',
    mediumWithHelper: '',
    medium: '',
    inactiveWithHelper: '',
    inactive: '',
    activeWithHelper: '',
    active: '',
    errorWithHelper: '',
    error: '',
    disabledWithHelper: '',
    disabled: '',
    withIconHelper: '',
    withIcon: '',
    errorSmallIconWithHelper: '',
    errorSmallIcon: '',
    disabledMediumIconWithHelper: '',
    disabledMediumIcon: '',
  });

  const handleChange = (id: string) => (e: SelectChangeEvent<unknown>) => {
    setValues((prev) => ({
      ...prev,
      [id]: e.target.value as string,
    }));
  };

  const renderEmptyValue = () => '선택해주세요';

  return (
    <SelectExampleContainer>
      <Typography variant='h4' gutterBottom>
        Select 컴포넌트 예시
      </Typography>

      <Grid container spacing={4}>
        {/* 크기 예시 */}
        <Grid size={12}>
          <div>
            <ComponentTitle variant='h6'>크기 (Size)</ComponentTitle>
            <SelectWrapper>
              <Select
                value={values.smallWithHelper}
                onChange={handleChange('smallWithHelper')}
                size='small'
                displayEmpty
                renderValue={renderEmptyValue}
                helperText='작은 크기 (small)'
              >
                <MenuItem value='option1'>옵션 1</MenuItem>
                <MenuItem value='option2'>옵션 2</MenuItem>
              </Select>

              <Select
                value={values.small}
                onChange={handleChange('small')}
                size='small'
                displayEmpty
                renderValue={renderEmptyValue}
              >
                <MenuItem value='option1'>옵션 1</MenuItem>
                <MenuItem value='option2'>옵션 2</MenuItem>
              </Select>

              <Select
                value={values.mediumWithHelper}
                onChange={handleChange('mediumWithHelper')}
                size='medium'
                displayEmpty
                renderValue={renderEmptyValue}
                helperText='중간 크기 (medium)'
              >
                <MenuItem value='option1'>옵션 1</MenuItem>
                <MenuItem value='option2'>옵션 2</MenuItem>
              </Select>

              <Select
                value={values.medium}
                onChange={handleChange('medium')}
                size='medium'
                displayEmpty
                renderValue={renderEmptyValue}
              >
                <MenuItem value='option1'>옵션 1</MenuItem>
                <MenuItem value='option2'>옵션 2</MenuItem>
              </Select>
            </SelectWrapper>
          </div>
        </Grid>

        {/* 상태 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>상태 (State)</ComponentTitle>
          <SelectWrapper>
            <Select
              value={values.inactiveWithHelper}
              onChange={handleChange('inactiveWithHelper')}
              state='inactive'
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='기본 상태 (inactive)'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.inactive}
              onChange={handleChange('inactive')}
              state='inactive'
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.activeWithHelper}
              onChange={handleChange('activeWithHelper')}
              state='active'
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='활성화 상태 (active)'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.active}
              onChange={handleChange('active')}
              state='active'
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.errorWithHelper}
              onChange={handleChange('errorWithHelper')}
              state='error'
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='에러 상태 (error)'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.error}
              onChange={handleChange('error')}
              state='error'
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.disabledWithHelper}
              onChange={handleChange('disabledWithHelper')}
              disabled
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='비활성화 상태 (disabled)'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.disabled}
              onChange={handleChange('disabled')}
              disabled
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>
          </SelectWrapper>
        </Grid>

        {/* 아이콘 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>아이콘 (Prefix)</ComponentTitle>
          <SelectWrapper>
            <Select
              value={values.withIconHelper}
              onChange={handleChange('withIconHelper')}
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='아이콘이 있는 Select'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.withIcon}
              onChange={handleChange('withIcon')}
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>
          </SelectWrapper>
        </Grid>

        {/* 조합 예시 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>조합 예시 (Combinations)</ComponentTitle>
          <SelectWrapper>
            <Select
              value={values.errorSmallIconWithHelper}
              onChange={handleChange('errorSmallIconWithHelper')}
              size='small'
              state='error'
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='에러 + 작은 크기 + 아이콘'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.errorSmallIcon}
              onChange={handleChange('errorSmallIcon')}
              size='small'
              state='error'
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.disabledMediumIconWithHelper}
              onChange={handleChange('disabledMediumIconWithHelper')}
              size='medium'
              disabled
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
              helperText='비활성화 + 중간 크기 + 아이콘'
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>

            <Select
              value={values.disabledMediumIcon}
              onChange={handleChange('disabledMediumIcon')}
              size='medium'
              disabled
              prefix={<Person />}
              displayEmpty
              renderValue={renderEmptyValue}
            >
              <MenuItem value='option1'>옵션 1</MenuItem>
              <MenuItem value='option2'>옵션 2</MenuItem>
            </Select>
          </SelectWrapper>
        </Grid>
      </Grid>
    </SelectExampleContainer>
  );
};

export default SelectExample;
