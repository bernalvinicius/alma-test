'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  StyledContainer,
  StyledBox,
  StyledTitle,
  StyledSubtitle,
  StyledButton,
} from './thankyou';

const ThankYou: React.FC = () => {
  const router = useRouter();

  return (
    <StyledContainer maxWidth="md">
      <StyledBox>
        <Image
          src="/icon-magnifier.png"
          width={50}
          height={80}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </StyledBox>
      <StyledTitle variant="h2">thank you</StyledTitle>
      <StyledSubtitle variant="h6">
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </StyledSubtitle>
      <Box>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
        >
          go back to homepage
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default ThankYou;
