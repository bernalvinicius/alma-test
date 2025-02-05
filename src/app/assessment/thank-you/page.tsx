'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const ThankYou = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', maxWidth: '500px' }}>
      <Box sx={{ margin: '50px 0' }}>
        <Image
          src="/icon-magnifier.png"
          width={50}
          height={80}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </Box>
      <Typography
        variant="h2"
        sx={{
          color: '#000',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '32px',
          textTransform: 'capitalize',
        }}
      >
        thank you
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: '#000',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '24px',
        }}
      >
        Your information was submitted to our team of immigration attorneys.
        Expect and email from hello@tryalma.ai.
      </Typography>
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
          sx={{ mt: 4, backgroundColor: '#000', width: '300px' }}
          onClick={() => router.push('/')}
        >
          go back to homepage
        </Button>
      </Box>
    </Container>
  );
};

export default ThankYou;
