import { Box } from '@mui/material';
import { useState } from 'react';
import NewSignupWidget from './NewSignupWidget';

const NewSignupWidgetContainer = () => {
  const [width, setWidth] = useState('100%');

  return (
    <Box
      sx={{
        width: width,
        transition: 'width 0.3s ease',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          marginBottom: '16px',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
        }}
      >
        <button
          onClick={() => setWidth('100%')}
          style={{
            padding: '8px 16px',
            border: '1px solid #E5E8EB',
            borderRadius: '4px',
            backgroundColor: width === '100%' ? '#272E35' : 'white',
            color: width === '100%' ? 'white' : '#868F99',
            cursor: 'pointer',
          }}
        >
          100%
        </button>
        <button
          onClick={() => setWidth('75%')}
          style={{
            padding: '8px 16px',
            border: '1px solid #E5E8EB',
            borderRadius: '4px',
            backgroundColor: width === '75%' ? '#272E35' : 'white',
            color: width === '75%' ? 'white' : '#868F99',
            cursor: 'pointer',
          }}
        >
          75%
        </button>
        <button
          onClick={() => setWidth('50%')}
          style={{
            padding: '8px 16px',
            border: '1px solid #E5E8EB',
            borderRadius: '4px',
            backgroundColor: width === '50%' ? '#272E35' : 'white',
            color: width === '50%' ? 'white' : '#868F99',
            cursor: 'pointer',
          }}
        >
          50%
        </button>
      </Box>
      <NewSignupWidget />
    </Box>
  );
};

export default NewSignupWidgetContainer;
