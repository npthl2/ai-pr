import { useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Radio from '@components/Radio';
import { ComponentTitle, RadioExampleContainer, RadioWrapper } from './RadioExample.styled';

const RadioExample = () => {
  const [values, setValues] = useState<Record<string, string>>({
    withLabel: '',
    withoutLabel: '',
  });

  const handleChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  return (
    <RadioExampleContainer>
      <Typography variant='h4' gutterBottom>
        Radio 컴포넌트 예시
      </Typography>

      <Grid container spacing={4}>
        {/* Label이 있는 경우 */}
        <Grid size={12}>
          <div>
            <ComponentTitle variant='h6'>라벨이 있는 경우 (With Label)</ComponentTitle>
            <RadioWrapper>
              <Radio
                value='option1'
                checked={values.withLabel === 'option1'}
                onChange={handleChange('withLabel')}
                label='기본 상태 (Default)'
              />
              <Radio
                value='option2'
                checked={true}
                onChange={handleChange('withLabel')}
                label='선택된 상태 (Selected)'
              />
              <Radio
                value='option3'
                checked={false}
                onChange={handleChange('withLabel')}
                disabled
                label='비활성화 상태 (Disabled)'
              />
              <Radio
                value='option4'
                checked={true}
                onChange={handleChange('withLabel')}
                disabled
                label='비활성화 선택 상태 (Disabled + Selected)'
              />
            </RadioWrapper>
          </div>
        </Grid>

        {/* Label이 없는 경우 */}
        <Grid size={12}>
          <ComponentTitle variant='h6'>라벨이 없는 경우 (Without Label)</ComponentTitle>
          <RadioWrapper>
            <Radio
              value='option1'
              checked={values.withoutLabel === 'option1'}
              onChange={handleChange('withoutLabel')}
            />
            <Radio value='option2' checked={true} onChange={handleChange('withoutLabel')} />
            <Radio
              value='option3'
              checked={false}
              onChange={handleChange('withoutLabel')}
              disabled
            />
            <Radio
              value='option4'
              checked={true}
              onChange={handleChange('withoutLabel')}
              disabled
            />
          </RadioWrapper>
        </Grid>
      </Grid>
    </RadioExampleContainer>
  );
};

export default RadioExample;
