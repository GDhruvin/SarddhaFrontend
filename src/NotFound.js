import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f7fafc', // Tailwind bg-gray-100
});

const NotFound = () => {
  return (
    <CenteredBox>
      <Typography variant="h1" component="h1" style={{ fontSize: '6rem', fontWeight: 'bold', color: '#1a202c' }}>404</Typography>
      <Typography variant="h5" component="p" style={{ marginTop: '1rem', color: '#718096' }}>Page Not Found</Typography>
      <Button variant="contained" color="primary" href="/" style={{ marginTop: '1.5rem' }}>
        Go Home
      </Button>
    </CenteredBox>
  );
};

export default NotFound;
