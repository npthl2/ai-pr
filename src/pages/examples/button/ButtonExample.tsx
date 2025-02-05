import { Box, Typography } from '@mui/material';
import Button from '@/components/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonExample = () => {
  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Button 컴포넌트 예시
      </Typography>

      <Box>
        <Typography variant='h6'>Button Variants</Typography>
        <Box>
          <Typography variant='subtitle1'>Contained Buttons</Typography>
          <Box>
            <Button
              variant='contained'
              color='primary'
              size='small'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary Small
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary Medium
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary Large
            </Button>

            <Button
              variant='contained'
              color='primary'
              size='medium'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary Disabled
            </Button>
            <Button
              variant='contained'
              color='grey'
              size='medium'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Grey Disabled
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant='subtitle1'>Outlined Buttons</Typography>
          <Box>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Primary Small
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='medium'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Primary Medium
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='large'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Primary Large
            </Button>
            <Button
              variant='outlined'
              color='primary'
              size='medium'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Primary Disabled
            </Button>
          </Box>
          <Box>
            <Button
              variant='outlined'
              color='grey'
              size='small'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Grey Small
            </Button>
            <Button
              variant='outlined'
              color='grey'
              size='medium'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Grey Medium
            </Button>
            <Button
              variant='outlined'
              color='grey'
              size='large'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Grey Large
            </Button>

            <Button
              variant='outlined'
              color='grey'
              size='medium'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Outlined Grey Disabled
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant='subtitle1'>Text Buttons</Typography>
          <Box>
            <Button
              variant='text'
              color='primary'
              size='small'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Text Primary Small
            </Button>
            <Button
              variant='text'
              color='primary'
              size='medium'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Text Primary Medium
            </Button>
            <Button
              variant='text'
              color='primary'
              size='large'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Text Primary Large
            </Button>

            <Button
              variant='text'
              color='primary'
              size='medium'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Text Primary Disabled
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant='subtitle1'>Buttons with Icons</Typography>
          <Box>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              iconPosition='left'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary with Left Icon
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              iconPosition='right'
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary with Right Icon
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              iconPosition='left'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary with Left Icon Disabled
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              iconPosition='right'
              disabled
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              Contained Primary with Right Icon Disabled
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ButtonExample;
