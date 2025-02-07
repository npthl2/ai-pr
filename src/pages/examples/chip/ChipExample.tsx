import { Stack, Typography } from '@mui/material';
import { ChipExampleContainer } from './ChipExample.styled';
import { Chip } from '@/components/Chip';

const ChipExample = () => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the click icon.');
  };

  return (
    <ChipExampleContainer>
      <Typography variant='h2' gutterBottom>
        Chip 컴포넌트 예시
      </Typography>
      <Typography variant='subtitle1'>default</Typography>
      <Stack spacing={1}>
        <Stack direction='row' spacing={1}>
          <Chip label='Chip' onClick={handleClick} />
          <Chip label='primary' color='primary' onClick={handleClick} />
          <Chip label='secondary' color='secondary' onClick={handleClick} />
        </Stack>
      </Stack>
      <Typography variant='subtitle1'>default removeable</Typography>
      <Stack spacing={1}>
        <Stack direction='row' spacing={1}>
          <Chip label='Chip' onDelete={handleDelete} />
          <Chip label='primary' color='primary' onClick={handleClick} onDelete={handleDelete} />
          <Chip label='secondary' color='secondary' onClick={handleClick} onDelete={handleDelete} />
        </Stack>
      </Stack>
      <Typography variant='subtitle1'>outlined</Typography>
      <Stack spacing={1}>
        <Stack direction='row' spacing={1}>
          <Chip label='Chip' variant='outlined' onClick={handleClick} />
          <Chip label='primary' color='primary' variant='outlined' onClick={handleClick} />
          <Chip label='secondary' color='secondary' variant='outlined' onClick={handleClick} />
        </Stack>
      </Stack>
      <Typography variant='subtitle1'>outlined removeable</Typography>
      <Stack spacing={1}>
        <Stack direction='row' spacing={1}>
          <Chip label='Chip' variant='outlined' onDelete={handleDelete} />
          <Chip
            label='primary'
            color='primary'
            variant='outlined'
            onClick={handleClick}
            onDelete={handleDelete}
          />
          <Chip
            label='secondary'
            color='secondary'
            variant='outlined'
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </Stack>
      </Stack>
    </ChipExampleContainer>
  );
};
export default ChipExample;
