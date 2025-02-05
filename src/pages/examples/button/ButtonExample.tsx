import { Box, Typography } from '@mui/material';
import Button from '@/components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonExampleContainer } from './ButtonExample.styled';

const ButtonExample = () => {
  return (
    <ButtonExampleContainer>
      <Typography variant='h2' gutterBottom>
        Button 컴포넌트 예시
      </Typography>

      <Box>
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
        <Box>
          <Typography variant='subtitle1'>Icon Button</Typography>
          <Box>
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              contained primary large size32
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='large'
              iconSize={32}
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              contained primary large
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='large'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              contained primary medium
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              contained primary small
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='small'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              contained primary small disabled
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='small'
              disabled
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          </Box>
          <Box>
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              outlined primary large
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              size='large'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              outlined primary medium
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              size='medium'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              outlined primary small
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
            <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
              outlined primary small disabled
            </Typography>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              disabled
              iconComponent={<DeleteIcon />}
              style={{ marginRight: 8, marginBottom: 8 }}
            />

            <Box>
              <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
                text primary large
              </Typography>
              <Button
                variant='text'
                color='primary'
                size='large'
                iconComponent={<DeleteIcon />}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
              <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
                text primary medium
              </Typography>
              <Button
                variant='text'
                color='primary'
                size='medium'
                iconComponent={<DeleteIcon />}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
              <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
                text primary small
              </Typography>
              <Button
                variant='text'
                color='primary'
                size='small'
                iconComponent={<DeleteIcon />}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
              <Typography variant='caption' style={{ marginRight: 8, marginBottom: 8 }}>
                text primary small disabled
              </Typography>
              <Button
                variant='text'
                color='primary'
                size='small'
                disabled
                iconComponent={<DeleteIcon />}
                style={{ marginRight: 8, marginBottom: 8 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ButtonExampleContainer>
  );
};

export default ButtonExample;
